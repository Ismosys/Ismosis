// POST /api/leads — runs a lead search and returns matching businesses.
// Lives server-side so it can call Overpass / Nominatim / Places without CORS
// issues.

import { NextResponse } from 'next/server';
import type { Lead, SearchParams, SearchResult } from '@/lib/leads/types';
import { resolveTerm, resolveTerms } from '@/lib/leads/categories';
import { expandNiche } from '@/lib/leads/expand';
import { geocode } from '@/lib/leads/geocode';
import { searchOverpass, leadHasWebsite } from '@/lib/leads/overpass';
import { searchPlaces, placesConfigured } from '@/lib/leads/places';
import { searchFoursquare, foursquareConfigured } from '@/lib/leads/foursquare';
import { facebookSearchUrl, mapPreviewUrl, cityHint } from '@/lib/leads/links';

const SOURCES = ['osm', 'places', 'foursquare'] as const;

// Cap how many niches a "wide" sweep runs against the key-based sources, since
// each niche is a separate (billed) API call. OSM unions all niches into one
// query, so it isn't capped. 8 covers all current clusters bar the very largest.
const WIDE_QUERY_CAP = 8;

export const runtime = 'nodejs';
export const maxDuration = 120;

type InternalLead = Lead & { _hasWebsite?: boolean };

function clean(lead: InternalLead): Lead {
  const { _hasWebsite, ...rest } = lead;
  return rest;
}

/** De-duplicate merged leads (needed when a wide sweep runs several niche
 *  queries that overlap). Keyed by stable id, by name+rounded-coords, and by
 *  name+address — the last so the same business returned under two ids still
 *  merges even if one copy is missing coordinates. */
function dedupeLeads(leads: InternalLead[]): InternalLead[] {
  const seen = new Set<string>();
  const out: InternalLead[] = [];
  for (const l of leads) {
    const name = (l.name || '').toLowerCase();
    const keys = [l.id];
    if (l.lat != null && l.lon != null) keys.push(`c:${name}|${l.lat.toFixed(4)},${l.lon.toFixed(4)}`);
    if (l.address) keys.push(`a:${name}|${l.address.toLowerCase().replace(/\s+/g, ' ').trim()}`);
    if (keys.some((k) => seen.has(k))) continue;
    keys.forEach((k) => seen.add(k));
    out.push(l);
  }
  return out;
}

/** Run a key-based source across several niches (a wide sweep) and merge. Uses
 *  allSettled so one failing niche (rate limit / plan) doesn't sink the batch;
 *  only throws if every niche failed. */
async function sweep(
  terms: string[],
  run: (term: string) => Promise<{ totalMatched: number; leads: Lead[] }>,
  notes: string[],
): Promise<{ totalMatched: number; leads: InternalLead[] }> {
  const settled = await Promise.allSettled(terms.map((t) => run(t)));
  const ok = settled.filter((s): s is PromiseFulfilledResult<{ totalMatched: number; leads: Lead[] }> => s.status === 'fulfilled');
  if (!ok.length) throw (settled[0] as PromiseRejectedResult).reason;
  if (ok.length < terms.length) {
    notes.push('Some category queries failed (rate limit or plan limit) — results may be partial.');
  }
  const leads = dedupeLeads(ok.flatMap((s) => s.value.leads) as InternalLead[]);
  // Count distinct businesses (deduped), so totalMatched stays consistent with
  // the deduped lead list rather than summing overlapping per-niche counts.
  return { totalMatched: leads.length, leads };
}

export async function POST(req: Request) {
  let params: SearchParams;
  try {
    const body = await req.json();
    params = {
      term: String(body.term ?? '').trim(),
      location: String(body.location ?? '').trim(),
      source: SOURCES.includes(body.source) ? body.source : 'osm',
      limit: Math.min(Math.max(Number(body.limit) || 60, 1), 200),
      onlyNoWebsite: body.onlyNoWebsite !== false,
      onlyWithFacebookPage: Boolean(body.onlyWithFacebookPage),
      wide: body.wide !== false,
    };
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (!params.term || !params.location) {
    return NextResponse.json(
      { error: 'Both a search term and a location are required.' },
      { status: 400 },
    );
  }

  if (params.source === 'places' && !placesConfigured()) {
    return NextResponse.json(
      { error: 'Google Places is not configured. Add GOOGLE_PLACES_API_KEY or use the OpenStreetMap source.' },
      { status: 400 },
    );
  }

  if (params.source === 'foursquare' && !foursquareConfigured()) {
    return NextResponse.json(
      { error: 'Foursquare is not configured. Add FOURSQUARE_API_KEY or use the OpenStreetMap source.' },
      { status: 400 },
    );
  }

  const notes: string[] = [];

  try {
    let leads: InternalLead[] = [];
    let totalMatched = 0;
    let resolvedLocation = params.location;

    // Widen coverage: expand the term to its related-niche cluster.
    const niches = params.wide ? expandNiche(params.term) : [params.term];

    // Honest per-source note about exactly which categories were searched
    // (OSM unions all of them; the key-based sources are capped).
    const wideNote = (searched: string[]) => {
      if (!params.wide || niches.length <= 1) return;
      let msg = `Wide sweep — searched ${searched.length} related categories: ${searched.join(', ')}.`;
      const skipped = niches.filter((n) => !searched.includes(n));
      if (skipped.length) {
        msg += ` Skipped ${skipped.length} (${skipped.join(', ')}) to limit API calls.`;
      }
      notes.push(msg);
    };

    if (params.source === 'osm') {
      const area = await geocode(params.location);
      if (!area) {
        return NextResponse.json(
          { error: `Could not find the location "${params.location}". Try adding a region or country.` },
          { status: 404 },
        );
      }
      resolvedLocation = area.displayName;
      // OSM unions every niche's tag filters into ONE query — no per-niche cost.
      wideNote(niches);
      const query = params.wide ? resolveTerms(niches) : resolveTerm(params.term);
      if (query.postFilter) {
        notes.push(`"${params.term}" isn't a known niche — matched broadly and filtered by name. Try a specific trade (e.g. "plumber", "salon") for tighter results.`);
      }
      const result = await searchOverpass(query, area);
      leads = result.leads as InternalLead[];
      totalMatched = result.totalMatched;
    } else if (params.source === 'foursquare') {
      const used = niches.slice(0, WIDE_QUERY_CAP);
      wideNote(used);
      const result = await sweep(used, (t) => searchFoursquare(t, params.location), notes);
      leads = result.leads;
      totalMatched = result.totalMatched;
      notes.push('Foursquare contact fields (website, phone, email, Facebook) are “rich” attributes — if they come back blank, your Foursquare plan/credits may not include them.');
    } else {
      const used = niches.slice(0, WIDE_QUERY_CAP);
      wideNote(used);
      const result = await sweep(used, (t) => searchPlaces(t, params.location), notes);
      leads = result.leads;
      totalMatched = result.totalMatched;
      notes.push('Google Places never returns email — these leads won’t have one. Use the phone numbers and the Facebook link to reach them.');
    }

    // Core filter: keep only businesses without a website.
    if (params.onlyNoWebsite) {
      leads = leads.filter((l) => !leadHasWebsite(l));
    }
    const noWebsiteCount = leads.length;

    // Compulsory Facebook link for every lead: use the directly listed page when
    // we have one, otherwise generate a Facebook page-search link from the
    // business name + city. Also attach a browser map-preview link.
    const city = cityHint(params.location);
    for (const l of leads) {
      if (!l.facebook) {
        l.facebook = facebookSearchUrl(l.name, city);
        l.facebookType = 'search';
      }
      if (!l.mapUrl) {
        l.mapUrl = mapPreviewUrl(l.lat, l.lon);
      }
    }

    // Optional stricter filter: only businesses with a real, directly listed
    // Facebook page (drop the ones that only got a generated search link).
    if (params.onlyWithFacebookPage) {
      leads = leads.filter((l) => l.facebookType === 'page');
    }

    // Surface the most actionable leads first (real FB page > email > phone) so
    // the best prospects aren't lost past the limit cut-off.
    const score = (l: InternalLead) =>
      (l.facebookType === 'page' ? 4 : 0) + (l.email ? 2 : 0) + (l.phone ? 1 : 0);
    leads.sort((a, b) => score(b) - score(a));

    // Trim to the requested limit (applied AFTER the no-website filter & sort).
    leads = leads.slice(0, params.limit);

    const cleaned = leads.map(clean);
    const withEmail = cleaned.filter((l) => l.email).length;
    const withPhone = cleaned.filter((l) => l.phone).length;
    const withFacebookPage = cleaned.filter((l) => l.facebookType === 'page').length;

    if (withEmail === 0) {
      notes.push('No public emails were listed for this batch — expected for website-less businesses. Use the phone numbers and Facebook/Messenger links to reach them.');
    }
    if (cleaned.length > 0 && withFacebookPage < cleaned.length) {
      notes.push(`${cleaned.length - withFacebookPage} of ${cleaned.length} leads had no Facebook page listed in the map data — those rows link to a Facebook page-search for the business so you can find and message them.`);
    }

    const payload: SearchResult = {
      leads: cleaned,
      meta: {
        source: params.source,
        location: resolvedLocation,
        term: params.term,
        totalMatched,
        noWebsiteCount,
        withEmail,
        withPhone,
        withFacebookPage,
        notes,
      },
    };

    return NextResponse.json(payload);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error.';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

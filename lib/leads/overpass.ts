// Queries the OpenStreetMap Overpass API for businesses inside a bounding box,
// then extracts name / email / phone / address / social and flags whether each
// has a website. This is the only source here that carries public business
// emails (via the `email` / `contact:email` tags), which is why it's the
// default for finding website-less businesses to email.

import type { Lead } from './types';
import type { ResolvedQuery } from './categories';
import type { GeoArea } from './geocode';
import { normaliseFacebook, normaliseInstagram } from './links';

// Public Overpass mirrors, tried in order. Some reject requests without a
// real User-Agent, so we always send one.
const ENDPOINTS = [
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass-api.de/api/interpreter',
  'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
];

// Per-mirror wait. Kept tight so a hung/slow mirror fails over quickly instead
// of blocking the whole request for over a minute.
const PER_ENDPOINT_TIMEOUT = 35000;

const USER_AGENT = 'Ismosis-LeadFinder/1.0 (internal lead research tool)';

// Tag keys that mean "this business already has a website" — used to exclude
// them when the user only wants businesses WITHOUT one.
const WEBSITE_KEYS = ['website', 'contact:website', 'url', 'website:menu', 'contact:url'];

type OsmTags = Record<string, string>;

interface OverpassElement {
  type: 'node' | 'way' | 'relation';
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: OsmTags;
}

function buildQuery(query: ResolvedQuery, area: GeoArea, timeout: number): string {
  const [s, w, n, e] = area.bbox;
  const bbox = `${s},${w},${n},${e}`;

  const clauses = query.filters
    .map((f) => {
      const sel = f.value ? `["${f.key}"="${f.value}"]` : `["${f.key}"]`;
      // Only elements that actually have a name are useful as leads.
      return `  nwr${sel}["name"](${bbox});`;
    })
    .join('\n');

  return `[out:json][timeout:${timeout}];\n(\n${clauses}\n);\nout center tags;`;
}

function hasWebsite(tags: OsmTags): boolean {
  return WEBSITE_KEYS.some((k) => tags[k] && tags[k].trim().length > 0);
}

function pickEmail(tags: OsmTags): string | null {
  const raw = tags['email'] || tags['contact:email'] || null;
  if (!raw) return null;
  // A tag can hold several emails separated by ; — take the first valid one.
  const first = raw.split(/[;,]/)[0].trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(first) ? first : null;
}

function pickPhone(tags: OsmTags): string | null {
  const raw = tags['phone'] || tags['contact:phone'] || tags['contact:mobile'] || null;
  return raw ? raw.split(';')[0].trim() : null;
}

/** A directly listed Facebook page, if the business has one. */
function pickFacebook(tags: OsmTags): string | null {
  const raw = tags['contact:facebook'] || tags['facebook'];
  return raw ? normaliseFacebook(raw) : null;
}

/** Instagram / other social, kept separate from Facebook. */
function pickSocial(tags: OsmTags): string | null {
  const ig = tags['contact:instagram'] || tags['instagram'];
  return ig ? normaliseInstagram(ig) : null;
}

function buildAddress(tags: OsmTags): string | null {
  const parts = [
    [tags['addr:housenumber'], tags['addr:street']].filter(Boolean).join(' '),
    tags['addr:city'] || tags['addr:town'] || tags['addr:village'],
    tags['addr:state'],
    tags['addr:postcode'],
    tags['addr:country'],
  ].filter((p) => p && p.trim().length > 0);
  return parts.length ? parts.join(', ') : null;
}

function categoryOf(tags: OsmTags): string | null {
  for (const key of ['shop', 'craft', 'office', 'amenity', 'leisure', 'tourism']) {
    if (tags[key]) return tags[key].replace(/_/g, ' ');
  }
  return null;
}

function matchesKeywords(tags: OsmTags, keywords: string[]): boolean {
  if (!keywords.length) return true;
  const haystack = [tags['name'], categoryOf(tags)].filter(Boolean).join(' ').toLowerCase();
  return keywords.some((k) => haystack.includes(k));
}

export interface OverpassResult {
  /** All named businesses matched, before the no-website filter */
  totalMatched: number;
  leads: Lead[];
}

export async function searchOverpass(
  query: ResolvedQuery,
  area: GeoArea,
): Promise<OverpassResult> {
  const body = buildQuery(query, area, 60);

  // Race all mirrors at once — free Overpass mirrors vary wildly in load, so
  // the first to return a good response wins and the slower ones are aborted.
  // This keeps latency at the speed of the *fastest* mirror, not the slowest.
  const controllers = ENDPOINTS.map(() => new AbortController());
  const timer = setTimeout(() => controllers.forEach((c) => c.abort()), PER_ENDPOINT_TIMEOUT);

  let res: Response;
  try {
    res = await Promise.any(
      ENDPOINTS.map(async (endpoint, i) => {
        const attempt = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': USER_AGENT,
            Accept: 'application/json',
          },
          body: `data=${encodeURIComponent(body)}`,
          signal: controllers[i].signal,
        });
        if (!attempt.ok) throw new Error(`mirror ${attempt.status}`);
        // Cancel the other in-flight mirrors now that we have a winner.
        controllers.forEach((c, j) => j !== i && c.abort());
        return attempt;
      }),
    );
  } catch {
    throw new Error('Overpass map service is busy right now. Try again in a moment, or use a smaller area / narrower term.');
  } finally {
    clearTimeout(timer);
  }

  const data = (await res.json()) as { elements: OverpassElement[] };

  // De-dup by name+coords: ways and nodes can describe the same shop.
  const seen = new Set<string>();
  const leads: Lead[] = [];
  let totalMatched = 0;

  for (const el of data.elements) {
    const tags = el.tags;
    if (!tags || !tags['name']) continue;
    if (query.postFilter && !matchesKeywords(tags, query.keywords)) continue;

    const dedupeKey = `${tags['name'].toLowerCase()}|${el.lat ?? el.center?.lat}|${el.lon ?? el.center?.lon}`;
    if (seen.has(dedupeKey)) continue;
    seen.add(dedupeKey);

    // Count only distinct businesses (after dedup).
    totalMatched++;

    const email = pickEmail(tags);
    const fb = pickFacebook(tags);
    const lat = el.lat ?? el.center?.lat ?? null;
    const lon = el.lon ?? el.center?.lon ?? null;
    leads.push({
      id: `osm-${el.type}-${el.id}`,
      name: tags['name'],
      email,
      emailSource: email ? 'osm-tag' : null,
      phone: pickPhone(tags),
      address: buildAddress(tags),
      category: categoryOf(tags),
      social: pickSocial(tags),
      // Direct page when listed; the route fills a search link otherwise.
      facebook: fb ?? '',
      facebookType: fb ? 'page' : 'search',
      mapUrl: null,
      lat,
      lon,
      source: 'osm',
      // Stash the website flag on a non-enumerated field via closure below.
      ...(hasWebsite(tags) ? { _hasWebsite: true } : {}),
    } as Lead & { _hasWebsite?: boolean });
  }

  return { totalMatched, leads };
}

/** Exposed so the route can apply the no-website filter consistently. */
export function leadHasWebsite(lead: Lead): boolean {
  return Boolean((lead as Lead & { _hasWebsite?: boolean })._hasWebsite);
}

// Optional Foursquare Places source. The best-fit paid source for this tool:
// unlike Yelp/Google it exposes a `website` field (so the no-website filter
// works), plus `tel`, a Facebook link via `social_media`, and sometimes `email`.
//
// Targets the CURRENT Foursquare Places API (the legacy api.foursquare.com/v3
// host was deprecated 2026-05-15):
//   GET https://places-api.foursquare.com/places/search
//   Authorization: Bearer <service key>      (FOURSQUARE_API_KEY = a Service API key)
//   X-Places-Api-Version: 2025-06-17          (required; only accepted value)
//
// NOTE: the contact/website fields (website, tel, email, social_media) are
// "rich" attributes that may consume Foursquare's paid/credit tier — the free
// tier can return them blank. Not live-tested here (no key available).

import type { Lead } from './types';
import { normaliseFacebook, normaliseInstagram } from './links';

const SEARCH = 'https://places-api.foursquare.com/places/search';
const API_VERSION = '2025-06-17';
const HOST = 'places-api.foursquare.com';
const FIELDS =
  'fsq_place_id,name,latitude,longitude,location,categories,tel,website,email,social_media';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FsqPlace {
  fsq_place_id: string;
  name?: string;
  tel?: string;
  email?: string;
  website?: string;
  latitude?: number;
  longitude?: number;
  location?: {
    formatted_address?: string;
    address?: string;
    locality?: string;
    region?: string;
    postcode?: string;
    country?: string;
  };
  categories?: Array<{ name?: string }>;
  social_media?: { facebook_id?: string; instagram?: string; twitter?: string };
}

export function foursquareConfigured(): boolean {
  return Boolean(process.env.FOURSQUARE_API_KEY);
}

export interface FoursquareResult {
  totalMatched: number;
  leads: Lead[];
}

/** Extract the next-page URL from Foursquare's `link` response header. Handles
 *  both a bare URL and the RFC-8288 `<url>; rel="next"` form, and — critically —
 *  splits only on the `>,` boundary so commas *inside* the URL (e.g. a `near=
 *  Austin, TX` echo) don't sever it. */
function nextLink(header: string | null): string | null {
  if (!header) return null;
  const h = header.trim();
  // Bare URL with no link-params.
  if (/^https?:\/\//i.test(h) && !/;\s*rel=/i.test(h)) return h;
  // RFC-8288: split on comma only when it separates two <...> entries.
  for (const part of h.split(/,\s*(?=<)/)) {
    if (/rel\s*=\s*"?next"?/i.test(part)) {
      return part.match(/<([^>]+)>/)?.[1] ?? null;
    }
  }
  return null;
}

/** Only follow a next-page URL that stays on the authenticated Foursquare host
 *  over HTTPS — never forward the API key to an unexpected origin. */
function isFoursquareUrl(u: string): boolean {
  try {
    const p = new URL(u);
    return p.protocol === 'https:' && p.hostname === HOST;
  } catch {
    return false;
  }
}

function buildAddress(loc: FsqPlace['location']): string | null {
  if (!loc) return null;
  if (loc.formatted_address?.trim()) return loc.formatted_address.trim();
  const parts = [loc.address, loc.locality, loc.region, loc.postcode, loc.country]
    .map((p) => p?.trim())
    .filter((p): p is string => Boolean(p));
  return parts.length ? parts.join(', ') : null;
}

export async function searchFoursquare(term: string, location: string): Promise<FoursquareResult> {
  const key = process.env.FOURSQUARE_API_KEY;
  if (!key) throw new Error('FOURSQUARE_API_KEY is not set.');

  const first = new URL(SEARCH);
  first.searchParams.set('query', term);
  first.searchParams.set('near', location);
  first.searchParams.set('limit', '50');
  first.searchParams.set('fields', FIELDS);

  const leads: Lead[] = [];
  let totalMatched = 0;
  let url: string | null = first.toString();

  // Follow up to 3 pages via the `link` response header cursor.
  for (let page = 0; page < 3 && url; page++) {
    const res: Response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${key}`,
        'X-Places-Api-Version': API_VERSION,
        Accept: 'application/json',
      },
      // Never let a redirect silently forward the API key to another host.
      redirect: 'error',
      signal: AbortSignal.timeout(20000),
    });

    if (!res.ok) {
      // Log the upstream detail server-side; return a generic message so we
      // don't leak Foursquare's raw response (key/quota hints) to callers.
      const detail = await res.text().catch(() => '');
      console.error(`Foursquare API error ${res.status}: ${detail.slice(0, 500)}`);
      throw new Error('Foursquare search failed. Check the FOURSQUARE_API_KEY and plan/credits.');
    }

    const data = (await res.json()) as { results?: FsqPlace[] };
    for (const p of data.results ?? []) {
      const name = p.name?.trim();
      if (!name) continue;

      totalMatched++;
      const email = p.email && EMAIL_RE.test(p.email.trim()) ? p.email.trim() : null;
      const fbId = p.social_media?.facebook_id?.trim();
      const fb = fbId ? normaliseFacebook(`facebook.com/${fbId}`) : null;
      const igRaw = p.social_media?.instagram?.trim();
      const ig = igRaw ? normaliseInstagram(igRaw) : null;

      leads.push({
        id: `fsq-${p.fsq_place_id}`,
        name,
        email,
        emailSource: email ? 'foursquare' : null,
        phone: p.tel?.trim() || null,
        address: buildAddress(p.location),
        category: p.categories?.[0]?.name ?? null,
        social: ig,
        facebook: fb ?? '',
        facebookType: fb ? 'page' : 'search',
        mapUrl: null,
        lat: typeof p.latitude === 'number' ? p.latitude : null,
        lon: typeof p.longitude === 'number' ? p.longitude : null,
        source: 'foursquare',
        // Foursquare tells us the website directly, so the no-website filter works.
        ...(p.website && p.website.trim() ? { _hasWebsite: true } : {}),
      } as Lead & { _hasWebsite?: boolean });
    }

    const next = nextLink(res.headers.get('link'));
    url = next && isFoursquareUrl(next) ? next : null;
  }

  return { totalMatched, leads };
}

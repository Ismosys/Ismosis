// Optional Google Places source. Richer business coverage and reliable phone
// numbers, but Google never returns email, so Places leads have no email.
// Requires GOOGLE_PLACES_API_KEY.
//
// Uses the Places API (New) Text Search + the `websiteUri` field so we can flag
// (and filter out) businesses that already have a website.

import type { Lead } from './types';

const TEXT_SEARCH = 'https://places.googleapis.com/v1/places:searchText';

interface PlaceResult {
  id: string;
  displayName?: { text: string };
  nationalPhoneNumber?: string;
  internationalPhoneNumber?: string;
  formattedAddress?: string;
  websiteUri?: string;
  primaryType?: string;
  googleMapsUri?: string;
  location?: { latitude: number; longitude: number };
}

export interface PlacesResult {
  totalMatched: number;
  leads: Lead[];
}

export function placesConfigured(): boolean {
  return Boolean(process.env.GOOGLE_PLACES_API_KEY);
}

export async function searchPlaces(term: string, location: string): Promise<PlacesResult> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) throw new Error('GOOGLE_PLACES_API_KEY is not set.');

  const leads: Lead[] = [];
  let pageToken: string | undefined;
  let totalMatched = 0;

  // Text Search returns up to 20 results/page, 60 total. Fetch every available
  // page — the no-website filter and the result limit are applied by the caller
  // (route), so we must NOT trim against the raw count here, or we'd starve the
  // website-less results the tool exists to surface.
  for (let page = 0; page < 3; page++) {
    const res = await fetch(TEXT_SEARCH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask':
          'places.id,places.displayName,places.nationalPhoneNumber,places.internationalPhoneNumber,places.formattedAddress,places.websiteUri,places.primaryType,places.googleMapsUri,places.location,nextPageToken',
      },
      body: JSON.stringify({
        textQuery: `${term} in ${location}`,
        ...(pageToken ? { pageToken } : {}),
      }),
      // Don't let a redirect forward the API key to another host.
      redirect: 'error',
      signal: AbortSignal.timeout(20000),
    });

    if (!res.ok) {
      // Log the upstream detail server-side; return a generic message so we
      // don't leak Google's raw response (quota/billing/key hints) to callers.
      const detail = await res.text().catch(() => '');
      console.error(`Places API error ${res.status}: ${detail.slice(0, 500)}`);
      throw new Error('Place search failed. Check the Google Places API key and billing.');
    }

    const data = (await res.json()) as { places?: PlaceResult[]; nextPageToken?: string };
    const places = data.places ?? [];

    for (const p of places) {
      const name = p.displayName?.text?.trim();
      if (!name) continue; // skip unnamed places — no real lead or FB search possible

      totalMatched++;
      leads.push({
        id: `places-${p.id}`,
        name,
        email: null,
        emailSource: null,
        phone: p.nationalPhoneNumber ?? p.internationalPhoneNumber ?? null,
        address: p.formattedAddress ?? null,
        category: p.primaryType ? p.primaryType.replace(/_/g, ' ') : null,
        // Google never lists Facebook, so every Places lead gets a search link
        // (filled by the route). googleMapsUri is kept as the "other" link.
        social: p.googleMapsUri ?? null,
        facebook: '',
        facebookType: 'search',
        mapUrl: null,
        lat: p.location?.latitude ?? null,
        lon: p.location?.longitude ?? null,
        source: 'places',
        ...(p.websiteUri ? { _hasWebsite: true } : {}),
      } as Lead & { _hasWebsite?: boolean });
    }

    if (!data.nextPageToken) break;
    pageToken = data.nextPageToken;
  }

  return { totalMatched, leads };
}

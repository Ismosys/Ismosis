// Builders for the outreach links every lead carries: a Facebook link (always
// present) and a browser map-preview link.

// Schemeless values that already start with a known Facebook / Instagram host.
const FB_HOST = /^(www\.|m\.|web\.|business\.)?(facebook\.com|fb\.(me|com|watch))(\/|$)/i;
const IG_HOST = /^(www\.)?instagram\.com(\/|$)/i;

/** Normalise a raw OSM facebook tag (full URL, schemeless host, or handle) into
 *  a Facebook URL. Handles common OSM forms like "facebook.com/JoesBar" (which
 *  must not become double-domain garbage) while still treating a plain handle —
 *  which may legitimately contain dots, e.g. "cafe.luna" — as a page slug. */
export function normaliseFacebook(raw: string): string | null {
  const v = raw.trim();
  if (!v) return null;
  if (/^https?:\/\//i.test(v)) return v;
  if (FB_HOST.test(v)) return `https://${v.replace(/^\/+/, '')}`;
  return `https://www.facebook.com/${v.replace(/^@/, '').replace(/^\/+/, '')}`;
}

/** Normalise a raw OSM instagram tag into a full profile URL. */
export function normaliseInstagram(raw: string): string | null {
  const v = raw.trim();
  if (!v) return null;
  if (/^https?:\/\//i.test(v)) return v;
  if (IG_HOST.test(v)) return `https://${v.replace(/^\/+/, '')}`;
  return `https://www.instagram.com/${v.replace(/^@/, '').replace(/^\/+/, '')}`;
}

/** Return the URL only if it uses a safe, expected scheme; otherwise null. Used
 *  to keep javascript:/data: schemes out of rendered href attributes. */
export function safeHref(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const proto = new URL(url).protocol;
    return proto === 'http:' || proto === 'https:' || proto === 'mailto:' ? url : null;
  } catch {
    return null;
  }
}

/** A Facebook page-search URL for a business that has no direct page listed.
 *  The user clicks it to find/preview the page and message the owner. */
export function facebookSearchUrl(name: string, cityHint: string): string {
  const q = [name, cityHint].filter(Boolean).join(' ').trim();
  return `https://www.facebook.com/search/pages/?q=${encodeURIComponent(q)}`;
}

/** A browser map-preview link for the business location, when coordinates are
 *  known. Opens OpenStreetMap centred on the pin. */
export function mapPreviewUrl(lat: number | null, lon: number | null): string | null {
  if (lat == null || lon == null || !Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=18/${lat}/${lon}`;
}

/** Reduce a free-text location ("Galway, County Galway, Ireland") to a short
 *  city hint ("Galway") for use in the Facebook search query. */
export function cityHint(location: string): string {
  return location.split(',')[0].trim();
}

// Turns a free-text location ("Austin, Texas") into a bounding box using the
// OpenStreetMap Nominatim geocoder. Nominatim asks callers to send a real
// User-Agent and to keep request rates modest — both handled here.

const USER_AGENT = 'Ismosis-LeadFinder/1.0 (internal lead research tool)';

export interface GeoArea {
  displayName: string;
  /** [south, west, north, east] in degrees */
  bbox: [number, number, number, number];
}

export async function geocode(location: string): Promise<GeoArea | null> {
  const url = new URL('https://nominatim.openstreetmap.org/search');
  url.searchParams.set('q', location);
  url.searchParams.set('format', 'jsonv2');
  url.searchParams.set('limit', '1');
  url.searchParams.set('addressdetails', '0');

  const res = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT, 'Accept-Language': 'en' },
    // Nominatim is occasionally slow; bound the wait.
    signal: AbortSignal.timeout(15000),
  });

  if (!res.ok) {
    throw new Error(`Geocoder returned ${res.status}`);
  }

  const data = (await res.json()) as Array<{
    display_name: string;
    boundingbox: [string, string, string, string];
  }>;

  if (!data.length) return null;

  const [south, north, west, east] = data[0].boundingbox.map(Number);
  return {
    displayName: data[0].display_name,
    bbox: [south, west, north, east],
  };
}

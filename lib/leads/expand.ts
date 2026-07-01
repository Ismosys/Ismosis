// "Widen coverage" niche expansion. One user term is expanded to the sibling
// categories in its cluster so a single search sweeps related business types
// (e.g. "salon" also pulls barber, beauty, nails, spa). The cluster members are
// chosen to line up with the known niches in categories.ts so the OSM path can
// union their tag filters into one query.

const CLUSTERS: string[][] = [
  ['salon', 'hairdresser', 'barber', 'beauty', 'nails', 'spa', 'tattoo'],
  ['restaurant', 'cafe', 'coffee', 'bakery', 'bar', 'pub', 'catering'],
  ['plumber', 'electrician', 'carpenter', 'builder', 'painter', 'roofer', 'hvac', 'locksmith'],
  ['mechanic', 'garage', 'carwash', 'car'],
  ['dentist', 'doctor', 'clinic', 'pharmacy'],
  ['gym', 'fitness'],
  ['pet', 'petgrooming', 'vet', 'veterinary'],
  ['lawyer', 'accountant', 'realestate', 'realtor', 'insurance'],
  ['clothing', 'jewelry', 'florist', 'butcher', 'hardware', 'furniture', 'optician', 'bookshop'],
  ['hotel', 'guesthouse'],
];

// Natural phrasing → a cluster member, so common words still match a cluster.
const SYNONYMS: Record<string, string> = {
  hair: 'hairdresser',
  barbershop: 'barber',
  beautician: 'beauty',
  nail: 'nails',
  eatery: 'restaurant',
  coffeeshop: 'cafe',
  diner: 'restaurant',
  electric: 'electrician',
  plumbing: 'plumber',
  roofing: 'roofer',
  autorepair: 'mechanic',
  automotive: 'mechanic',
  tyre: 'car',
  tire: 'car',
  dental: 'dentist',
  medical: 'clinic',
  physio: 'clinic',
  attorney: 'lawyer',
  solicitor: 'lawyer',
};

/** Expand a search term to its related niche cluster (user's own term first).
 *  Returns just `[term]` when the term doesn't map to a known cluster. */
export function expandNiche(term: string): string[] {
  const raw = term.trim();
  if (!raw) return [];
  const tokens = raw.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);

  const keys = new Set<string>();
  for (const t of tokens) {
    const s = t.endsWith('s') ? t.slice(0, -1) : t;
    keys.add(t);
    keys.add(s);
    if (SYNONYMS[t]) keys.add(SYNONYMS[t]);
    if (SYNONYMS[s]) keys.add(SYNONYMS[s]);
  }

  const cluster = CLUSTERS.find((c) => c.some((m) => keys.has(m)));
  if (!cluster) return [raw];

  // Keep the user's own term first, then the rest of the cluster — skipping any
  // member that equals the term or its singular (so "gyms" doesn't survive
  // alongside "gym", which would waste a capped API slot and inflate the note).
  const lower = raw.toLowerCase();
  const singular = lower.replace(/s$/, '');
  const out = [raw];
  for (const m of cluster) {
    if (m !== lower && m !== singular) out.push(m);
  }
  return out;
}

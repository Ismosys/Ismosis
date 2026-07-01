// Maps a free-text niche ("plumber", "salon", "restaurant") to the OSM tag
// filters that find those businesses. When a term isn't recognised we fall back
// to a broad set of business tags and post-filter by matching the term against
// the business name and category.

interface TagFilter {
  key: string;
  value?: string;
}

// key:value pairs that identify a niche. A term can map to several filters.
const TERM_MAP: Record<string, TagFilter[]> = {
  plumber: [{ key: 'craft', value: 'plumber' }],
  electrician: [{ key: 'craft', value: 'electrician' }],
  carpenter: [{ key: 'craft', value: 'carpenter' }],
  builder: [{ key: 'craft', value: 'builder' }],
  painter: [{ key: 'craft', value: 'painter' }],
  roofer: [{ key: 'craft', value: 'roofer' }],
  hvac: [{ key: 'craft', value: 'hvac' }],
  locksmith: [{ key: 'craft', value: 'locksmith' }],
  restaurant: [{ key: 'amenity', value: 'restaurant' }],
  cafe: [{ key: 'amenity', value: 'cafe' }],
  coffee: [{ key: 'amenity', value: 'cafe' }],
  bar: [{ key: 'amenity', value: 'bar' }],
  pub: [{ key: 'amenity', value: 'pub' }],
  bakery: [{ key: 'shop', value: 'bakery' }],
  salon: [{ key: 'shop', value: 'hairdresser' }, { key: 'shop', value: 'beauty' }],
  hairdresser: [{ key: 'shop', value: 'hairdresser' }],
  barber: [{ key: 'shop', value: 'hairdresser' }],
  beauty: [{ key: 'shop', value: 'beauty' }],
  spa: [{ key: 'leisure', value: 'spa' }],
  nails: [{ key: 'shop', value: 'beauty' }],
  gym: [{ key: 'leisure', value: 'fitness_centre' }],
  fitness: [{ key: 'leisure', value: 'fitness_centre' }],
  dentist: [{ key: 'amenity', value: 'dentist' }],
  doctor: [{ key: 'amenity', value: 'doctors' }],
  clinic: [{ key: 'amenity', value: 'clinic' }],
  pharmacy: [{ key: 'amenity', value: 'pharmacy' }],
  veterinary: [{ key: 'amenity', value: 'veterinary' }],
  vet: [{ key: 'amenity', value: 'veterinary' }],
  florist: [{ key: 'shop', value: 'florist' }],
  butcher: [{ key: 'shop', value: 'butcher' }],
  grocery: [{ key: 'shop', value: 'convenience' }, { key: 'shop', value: 'supermarket' }],
  clothing: [{ key: 'shop', value: 'clothes' }],
  jewelry: [{ key: 'shop', value: 'jewelry' }],
  jeweller: [{ key: 'shop', value: 'jewelry' }],
  optician: [{ key: 'shop', value: 'optician' }],
  hardware: [{ key: 'shop', value: 'hardware' }],
  furniture: [{ key: 'shop', value: 'furniture' }],
  car: [{ key: 'shop', value: 'car_repair' }, { key: 'shop', value: 'car' }],
  mechanic: [{ key: 'shop', value: 'car_repair' }],
  garage: [{ key: 'shop', value: 'car_repair' }],
  carwash: [{ key: 'amenity', value: 'car_wash' }],
  laundry: [{ key: 'shop', value: 'laundry' }],
  drycleaner: [{ key: 'shop', value: 'dry_cleaning' }],
  tattoo: [{ key: 'shop', value: 'tattoo' }],
  photographer: [{ key: 'craft', value: 'photographer' }, { key: 'shop', value: 'photo' }],
  lawyer: [{ key: 'office', value: 'lawyer' }],
  accountant: [{ key: 'office', value: 'accountant' }],
  realestate: [{ key: 'office', value: 'estate_agent' }],
  realtor: [{ key: 'office', value: 'estate_agent' }],
  insurance: [{ key: 'office', value: 'insurance' }],
  travel: [{ key: 'shop', value: 'travel_agency' }],
  hotel: [{ key: 'tourism', value: 'hotel' }],
  guesthouse: [{ key: 'tourism', value: 'guest_house' }],
  childcare: [{ key: 'amenity', value: 'childcare' }],
  school: [{ key: 'amenity', value: 'school' }],
  // Note: "cleaning" has no precise OSM tag — mapping it to office=company
  // returned every company. Left unmapped so it falls back to a broad search
  // narrowed by the "cleaning" keyword against the business name/category.
  catering: [{ key: 'craft', value: 'caterer' }],
  petgrooming: [{ key: 'shop', value: 'pet_grooming' }],
  pet: [{ key: 'shop', value: 'pet' }],
  bookshop: [{ key: 'shop', value: 'books' }],
};

// Broad fallback set: business-bearing tag keys whose values are post-filtered.
const FALLBACK_KEYS = ['shop', 'craft', 'office', 'amenity', 'leisure', 'tourism'];

export interface ResolvedQuery {
  filters: TagFilter[];
  /** When true, results must also match `term` against name/category */
  postFilter: boolean;
  /** Normalised, lower-cased keywords from the term used for post-filtering */
  keywords: string[];
}

export function resolveTerm(term: string): ResolvedQuery {
  const raw = term.toLowerCase().trim();
  const keywords = raw.split(/[^a-z0-9]+/).filter((w) => w.length > 2);

  // Direct match on any keyword (e.g. "best plumber near me" -> plumber).
  for (const word of keywords) {
    const singular = word.endsWith('s') ? word.slice(0, -1) : word;
    const hit = TERM_MAP[word] || TERM_MAP[singular];
    if (hit) {
      return { filters: hit, postFilter: false, keywords };
    }
  }

  // Unknown niche: query broad business tags and post-filter by keyword.
  return {
    filters: FALLBACK_KEYS.map((key) => ({ key })),
    postFilter: true,
    keywords,
  };
}

/** Resolve several niches at once and union them into a single query (used by
 *  the "widen coverage" sweep). If any niche is a known category, we union those
 *  specific tag filters and skip the broad keyword post-filter. If none are
 *  known, we fall back to a broad search filtered by the union of keywords. */
export function resolveTerms(terms: string[]): ResolvedQuery {
  const resolved = terms.map(resolveTerm);
  const keywords = Array.from(new Set(resolved.flatMap((r) => r.keywords)));
  const known = resolved.filter((r) => !r.postFilter);

  if (known.length) {
    const seen = new Set<string>();
    const filters: TagFilter[] = [];
    for (const r of known) {
      for (const f of r.filters) {
        const key = `${f.key}=${f.value ?? ''}`;
        if (!seen.has(key)) {
          seen.add(key);
          filters.push(f);
        }
      }
    }
    return { filters, postFilter: false, keywords };
  }

  return { filters: FALLBACK_KEYS.map((key) => ({ key })), postFilter: true, keywords };
}

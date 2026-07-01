// Shared types for the lead-extraction tool.

export type LeadSource = 'osm' | 'places' | 'foursquare';

/** 'page' = a real Facebook page URL we found. 'search' = a Facebook
 *  page-search link we generated from the business name + location, for when no
 *  direct page is listed. */
export type FacebookType = 'page' | 'search';

export interface Lead {
  /** Business / page name */
  name: string;
  /** Public business email, if one was found (the primary target) */
  email: string | null;
  /** Public phone number, if listed */
  phone: string | null;
  /** Full address as a single line */
  address: string | null;
  /** OSM/Places category (e.g. "hairdresser", "restaurant") */
  category: string | null;
  /** Instagram / other social link, if listed (Facebook is handled separately) */
  social: string | null;
  /** ALWAYS present: a Facebook link for outreach — a direct page when one is
   *  listed, otherwise a Facebook page-search URL for this business + location. */
  facebook: string;
  facebookType: FacebookType;
  /** Link that opens the business location in a browser map preview */
  mapUrl: string | null;
  /** Raw coordinates (kept in JSON exports for power users) */
  lat: number | null;
  lon: number | null;
  /** Where this lead came from */
  source: LeadSource;
  /** Stable id for de-duplication (source + osm/place id) */
  id: string;
  /** Where the email was sourced from, for transparency */
  emailSource?: 'osm-tag' | 'foursquare' | null;
}

export interface SearchParams {
  /** Free-text niche, e.g. "plumbers", "hair salon", "restaurants" */
  term: string;
  /** Free-text location, e.g. "Austin, Texas" or "Lagos, Nigeria" */
  location: string;
  source: LeadSource;
  /** Max number of businesses to return */
  limit: number;
  /** Keep only businesses that have NO website (the core filter) */
  onlyNoWebsite: boolean;
  /** Stricter: keep only businesses that have a real (directly listed) Facebook
   *  page, dropping those that only get a generated search link. Off by default. */
  onlyWithFacebookPage: boolean;
  /** Widen coverage: also search related categories in the term's cluster and
   *  merge/dedupe the results. On by default. */
  wide: boolean;
}

export interface SearchResult {
  leads: Lead[];
  meta: {
    source: LeadSource;
    location: string;
    term: string;
    /** Total businesses matched before the no-website filter */
    totalMatched: number;
    /** Businesses kept after the no-website filter */
    noWebsiteCount: number;
    /** How many of the returned leads have a usable email */
    withEmail: number;
    /** How many have a phone */
    withPhone: number;
    /** How many have a real (directly listed) Facebook page, vs a search link */
    withFacebookPage: number;
    /** Human-readable notes / warnings shown in the UI */
    notes: string[];
  };
}

# Lead Finder

Internal tool for finding local businesses **without a website** and their public
contact details — built to source prospects for Ismosis.

Open it at **`/leads`** while the dev server is running.

## How it works

1. **Enter a search term** (a niche: `plumber`, `hair salon`, `restaurant`) and a
   **location** (`Austin, Texas`, `Galway, Ireland`).
2. **Click Start.** The tool geocodes the location and queries live map data,
   then filters to businesses with no website listed.
3. **Preview** all results in a new browser tab, or **download** them as JSON, CSV,
   Excel, XML, or HTML.

Each lead has: business name, email (when public), phone, address, category, a
**Facebook link** (always present — see below), an Instagram/other link where listed,
and a **map preview** link.

## Facebook link on every lead (compulsory)

Every result carries a Facebook link, so you always have a Messenger route to the owner:

- **`Page ↗`** — a Facebook page the business listed directly in the map data.
- **`Find ↗`** — when no page is listed, a pre-filled Facebook **page search** for the
  business name + city. Click it to find their page and message them.

In practice OpenStreetMap lists a direct Facebook page for only a small share of
businesses, so most leads get a `Find ↗` search link. The optional **"Only ones with a
real Facebook page"** checkbox keeps only the `Page ↗` leads (far fewer, but each is a
confirmed page).

Leads are sorted so the most actionable ones (real Facebook page → email → phone) appear
first, before the result limit is applied.

## Widen coverage (related-category sweep)

The **Widen coverage** checkbox (on by default) expands your search term to its
related-niche cluster and merges the results — e.g. `salon` also sweeps barber,
beauty, nails, spa, tattoo; `plumber` also sweeps electrician, carpenter, roofer,
hvac, etc. Clusters live in `lib/leads/expand.ts`.

- **OpenStreetMap** unions every niche's map tags into a **single** Overpass query,
  so widening costs nothing extra and is the best way to maximise leads from the
  free source. (Trades like `plumber` typically 3–4× the results.)
- **Foursquare / Google Places** run one (billed) query per niche, capped at 6, and
  the results are merged and de-duplicated by id + name/coordinates.

Turn it off for a tight, single-category search.

## Preview in browser

The **Preview in browser** button renders all current results as a standalone HTML page
in a new tab — the same layout as the HTML export, with clickable email, Facebook, and
map links — so you can eyeball the batch before downloading.

## Data sources

| Source | Key needed | Has email? | Notes |
| --- | --- | --- | --- |
| **OpenStreetMap** (default) | No | Yes (partial) | Free. The only *free* source that carries public business emails (`email` / `contact:email` tags). Races several public Overpass mirrors for speed. |
| **Foursquare** | `FOURSQUARE_API_KEY` (a **Service API key**) | Yes (partial) | Best-fit paid source: exposes a `website` field (so the no-website filter works), plus phone, a Facebook link, and sometimes email. Contact/website fields are "rich" attributes that may need a paid Foursquare plan/credits. Targets the current Places API (`places-api.foursquare.com`, `X-Places-Api-Version: 2025-06-17`) — not live-tested, so verify against current Foursquare docs when you add your key. |
| **Google Places** | `GOOGLE_PLACES_API_KEY` | No | Richer coverage + reliable phones, but Google never returns email. |

### Why not Yelp or Nextdoor?

- **Nextdoor** has no public business-data API, is login-gated behind neighborhood-verified accounts, and its ToS prohibits scraping — the same reasons we don't scrape Facebook directly. Not built.
- **Yelp** has an official Fusion API, but it returns no email, exposes no `website` field (so the no-website filter can't apply), and its API Terms of Use restrict using the data to build marketing/outreach lists. Poor fit; not built. Foursquare covers the same ground far better.

To enable the paid sources, add to `.env.local`:

```
FOURSQUARE_API_KEY=your_key_here
GOOGLE_PLACES_API_KEY=your_key_here
```

## About email coverage — read this

Businesses **without a website** are, by definition, the hardest segment to get an
email for: no domain means email-finder tools have nothing to work from, and Google
never exposes email. In practice only a small fraction (~5–15%) of website-less
businesses list a public email anywhere.

**That's expected.** The reliable contact channels for this segment are the **phone
number** and the **Facebook/Messenger link**, both of which the tool returns on every
lead. Treat email as a bonus, not the primary channel.

Facebook/Instagram pages are **never scraped** — doing so violates their terms and gets
you blocked. The Facebook link is either a page the business already listed publicly, or
a Facebook search you run yourself in your browser.

## Files

- `app/leads/page.tsx` — the UI (form, results table, export + preview buttons)
- `app/api/leads/route.ts` — server route that runs the search
- `lib/leads/geocode.ts` — location → bounding box (Nominatim)
- `lib/leads/overpass.ts` — OpenStreetMap business query
- `lib/leads/places.ts` — Google Places source (optional)
- `lib/leads/foursquare.ts` — Foursquare Places source (optional)
- `lib/leads/links.ts` — Facebook / map link builders + href sanitiser
- `lib/leads/categories.ts` — maps a niche term to map tags
- `lib/leads/export.ts` — JSON / CSV / Excel / XML / HTML exporters + browser preview

## Deployment note

This is an **internal** tool. If you deploy the Ismosis site publicly, gate `/leads`
and `/api/leads` behind auth (or don't ship them) so the route isn't open to the
world.

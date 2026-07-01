# UI/UX Elevation — Surgical Polish to "$20k" Standard

Date: 2026-06-25
Status: Approved direction (pending spec review)
Related: `2026-06-25-critical-fixes-design.md` (favicon / OG / 404 trust details live there to avoid duplication)

## Context

The site already has a strong, restrained design system (token-driven color,
fluid display type, single navy accent, coherent "technical drawing" motif,
reduced-motion-aware framer-motion). Audit against the Anointed Coder premium
rulebook found the base is genuinely good. This work is **surgical elevation**,
not a redesign: keep the visual language, add craft where it signals quality.

Scope chosen by owner: **Surgical polish.** No new sections, no type-scale or
layout overhaul, no structural changes.

## Goals

Raise perceived quality and accessibility through five targeted improvements:

1. A complete focus-visible + button-state system.
2. A signature hero moment (the patent figure "drafts itself" on load).
3. Richer, intentional motion (staggered reveals, card press/hover, hero parallax).
4. A typographic micro-craft pass (real en/em dashes, proper punctuation).
5. Deliberate navy-accent rhythm.

## Non-Goals

- Redesigning the hero layout, homepage section order, or any page structure.
- Changing the type scale, spacing scale, color tokens, or fonts.
- Form/back-end behavior (covered by the critical-fixes spec).
- Dark mode (the site is intentionally light-only).

## Design

### 1. Focus-visible + button-state system

The rulebook requires all six interactive states (default / hover / focus /
active / disabled / loading) and visible focus rings; their absence is a top
"looks broken" tell. Today `btn-primary`/`btn-ghost` define only hover, and nav
links / form toggle buttons / the hamburger have no visible focus ring.

- Add a single focus-ring convention applied site-wide via the component classes
  in `app/globals.css`: `focus-visible:outline-none focus-visible:ring-2
  focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:ring-offset-paper`.
  Sharp, on-brand (navy accent), offset so it reads against paper.
- Apply to: `.btn-primary`, `.btn-ghost`, `.btn-link`, `.field-input`,
  `.field-textarea`, the nav `<Link>`s and hamburger `<button>`
  (`components/Navigation.tsx`), and the Project Type / Timeline toggle buttons
  (`components/ContactForm.tsx`).
- Add `active:` press feedback (subtle): `active:translate-y-px` on buttons.
- Add `disabled:` styling to `.btn-primary` (`disabled:opacity-50
  disabled:pointer-events-none`) and a loading affordance — reuses the form's
  `submitting` state from the critical-fixes spec; here we only define the
  styles/markup so a spinner can sit inline.
- One radius rule preserved (zero radius everywhere, including the ring is square
  via default — acceptable; ring inherits no radius).

### 2. Signature hero moment — self-drafting figure

`components/illustrations/HeroAssembly.tsx` is a dense single SVG. Rather than
animate every stroke, convert it to a `motion.svg` with a scoped draw-in:

- Wrap the main housing outline elements (the primary ellipses and vertical
  lines of the drive housing, ~8 key paths) so they animate
  `pathLength: 0 → 1` over ~1.1s with the existing `EASE`.
- The six numbered callouts (number text + leader line + origin dot) fade/scale
  in **staggered** ~90ms apart, *after* the housing outline completes — reading
  as annotations being added to a finished drawing.
- The frame border, scale bar, and `ISMOSIS / 0001` block fade in last.
- `useReducedMotion()` → render the fully-drawn static SVG with no animation
  (current appearance), matching the existing Hero pattern.
- Implementation detail: `HeroAssembly` becomes a `'use client'` component
  accepting an optional `animate` prop (default true) so it can be reused
  statically elsewhere (e.g. OG-style contexts) without motion.
- Performance: animation uses SVG `pathLength`/`opacity`/`transform` only — no
  layout properties, no CLS. The SVG already has fixed `viewBox` dimensions.

### 3. Motion enrichment

- **Staggered reveals.** Add a lightweight stagger capability so grid/list items
  enter in sequence (rulebook `stagger-sequence`, 30–50ms/item). Approach: add a
  parent container variant with `staggerChildren: 0.05` and child variants,
  applied to: Hero trust list (`components/sections/Hero.tsx`), Services grid,
  Portfolio preview grid, Testimonials grid. Implement as a small reusable
  `components/Stagger.tsx` (parent) + existing item reveals, OR extend `Reveal`
  with an `index` delay — chosen approach: a new `Stagger` parent + `StaggerItem`
  to keep `Reveal` unchanged for single elements. Reduced-motion collapses to a
  simple fade with no stagger.
- **Card press/hover.** Portfolio cards (`components/PortfolioGrid.tsx`) and
  Service cards (`components/sections/Services.tsx`): add `transition` +
  `hover:-translate-y-0.5` and a hairline border-color shift to navy/ink on hover
  and `active:translate-y-0` press, transform-only. Subtle (≤2px).
- **Hero figure parallax.** The framed hero figure translates a few px on scroll
  via framer-motion `useScroll`/`useTransform` (small range, e.g. y: 0 → -20),
  disabled under reduced-motion. No effect on layout (transform only).
- All motion stays within rulebook timing (100–500ms; the hero draw is a
  one-time intro at ~1.1s which is acceptable for a hero illustration, and is
  interruptible/skipped under reduced-motion).

### 4. Typographic micro-craft pass

Replace straight hyphens used as ranges/breaks with proper punctuation across
visible copy (components + page strings):

- Ranges → en dash: "5 to 7 days"/"5-7 days" → "5–7 days"; "48 to 72 hours" →
  "48–72 hours"; numeral ranges in pricing/process/contact.
- Compound modifiers correctly hyphenated: "non disclosure" → "non-disclosure",
  "four legged" → "four-legged", "cross sectional" → "cross-sectional",
  "multi stage" → "multi-stage", etc., where they are adjectives.
- Em dash for parenthetical breaks where currently a hyphen/comma is used.
- Apostrophes/quotes: ensure typographic quotes where literal quotes appear
  (testimonials) — or rely on a CSS/`&rsquo;` approach; pragmatically, fix the
  few visible instances in JSX strings.
- Scope limited to user-visible copy in: `lib/portfolio.ts`, section components,
  and page files. This is a copy-edit pass, not a content rewrite.

### 5. Navy-accent rhythm

Use the single accent more deliberately (currently navy appears only on button
hover + text selection):

- Active nav underline (`components/Navigation.tsx`) switches from `bg-ink` to
  `bg-navy` so the current location reads in the accent.
- Eyebrow leader line (`.eyebrow-line::before`) gains an optional accent variant
  used on section eyebrows (a navy hairline) — applied sparingly (hero + one or
  two section headers), not globally.
- Keep restraint: at most a few accent touches per page; navy must still clearly
  mean "active/important," not become decorative.

## Files Touched

- `app/globals.css` — focus-ring convention, button states, accent eyebrow variant.
- `components/illustrations/HeroAssembly.tsx` — self-drafting animation + `animate` prop (`'use client'`).
- `components/sections/Hero.tsx` — wire hero figure parallax + stagger trust list.
- `components/Stagger.tsx` (new) — reusable staggered-reveal parent/item.
- `components/sections/Services.tsx`, `components/sections/PortfolioPreview.tsx`,
  `components/sections/Testimonials.tsx` — staggered item entrance.
- `components/PortfolioGrid.tsx`, `components/sections/Services.tsx` — card hover/press.
- `components/Navigation.tsx` — focus rings, navy active underline.
- `components/ContactForm.tsx` — focus rings on toggle buttons (coordinates with critical-fixes states).
- Copy edits across `lib/portfolio.ts`, section components, page files.

## Accessibility & Performance

- Every interactive element gains a visible `:focus-visible` ring (WCAG 2.4.7);
  rings meet ≥3:1 against paper (navy on white passes).
- All new motion respects `prefers-reduced-motion` (collapses to fades or none).
- Motion uses transform/opacity/pathLength only → no reflow, CLS unaffected
  (build is fully static; no new images).
- No new runtime dependencies; framer-motion is already present.
- Touch targets unchanged (already compliant); no target shrinks.

## Testing / Verification

- `npm run build` passes (type-check + static generation).
- Keyboard pass: Tab through nav, hero CTAs, form fields/toggles, footer — every
  focused element shows a visible navy ring; tab order matches visual order.
- Reduced-motion (OS setting / devtools emulation): hero renders fully drawn
  instantly; reveals are plain fades; no parallax.
- Visual: hero figure draws in then callouts stagger; portfolio/service cards
  lift subtly on hover and depress on click; active nav item underline is navy.
- Copy spot-check: dashes/hyphens render correctly on home, pricing, process,
  contact.
- Screenshot at 375 / 768 / 1280px to confirm no layout shift from the changes.

## Risks / Mitigations

- **Hero draw complexity** — if per-path `pathLength` proves fiddly on the dense
  SVG, fall back to a grouped clip-path wipe reveal (left-to-right) which still
  reads as "drafting" and is simpler. Decide during implementation; either keeps
  the static reduced-motion fallback.
- **Over-animation** — strict caps (≤2px card movement, ≤20px parallax, one hero
  intro) keep it tasteful per `excessive-motion`.

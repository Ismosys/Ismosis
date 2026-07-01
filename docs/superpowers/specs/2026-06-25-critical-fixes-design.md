# Critical Fixes — Lead Capture, WhatsApp, OG Image, Testimonials

Date: 2026-06-25
Status: Approved (pending spec review)

## Problem

The Ismosis site is well-built and the production build passes, but it cannot
function as a business site:

1. **The contact form discards every lead.** `components/ContactForm.tsx`
   handles submit with `setSubmitted(true)` and nothing else — no network
   request, no email, no storage. The uploaded file is also dropped. For a
   quote-driven studio this is the single most important defect.
2. **The WhatsApp link routes nowhere.** `app/contact/page.tsx` and the form use
   `https://wa.me/?text=...` with no phone number.
3. **No social share image.** `app/layout.tsx` declares a `summary_large_image`
   Twitter card and Open Graph tags but no image, so shared links render bare.
4. **Testimonials use fabricated named attributions** (`Daniel Reyes /
   Reyes & Whitfield IP`, etc.) in `components/sections/Testimonials.tsx` — a
   trust and legal risk for a professional services brand.

## Goals

- Real lead delivery to the studio inbox, with no backend and no new runtime
  dependency, keeping the site fully static.
- Working WhatsApp contact link.
- Valid Open Graph / Twitter image wiring.
- Remove false attributions from testimonials.

## Non-Goals

- Server-side API routes, databases, or a CRM integration (a documented future
  upgrade path, not this round).
- A branded sending domain / Resend integration.
- Redesign of any page, new sections, or visual restyling beyond the testimonial
  copy change.
- Producing the OG image asset itself (the owner supplies `og.png`).

## Approach

Three independent, low-risk changes plus one copy change. No new npm packages.

### 1. Contact form → Web3Forms

`components/ContactForm.tsx` becomes a real submitter:

- POST `multipart/form-data` to `https://api.web3forms.com/submit` via `fetch`.
- Payload fields: `access_key`, `name`, `email`, `company`, `phone`,
  `project_type` (from the `type` state), `timeline`, `figures`, `message`,
  the file under `attachment`, a `subject` line
  (e.g. `New quote request — {name}`), a `from_name` of `Ismosis Website`, and a
  `botcheck` honeypot input (hidden; Web3Forms rejects the submission if filled).
- Access key sourced from `process.env.NEXT_PUBLIC_WEB3FORMS_KEY`. A placeholder
  is used until the real key is added to `.env.local` and the host's env config.
- **State machine** replaces the single `submitted` boolean:
  - `idle` → form visible.
  - `submitting` → submit button disabled, shows a spinner / "Sending…", inputs
    not re-submittable.
  - `success` → existing thank-you panel (unchanged copy).
  - `error` → inline error message above the submit button with a retry path and
    the direct email as a fallback. This path does not exist today; without it a
    failed send silently loses the lead.
- **File handling:** keep the upload control. Validate size client-side at a
  ~5 MB cap (Web3Forms attaches the file to the notification email, which is the
  real constraint). If the file exceeds the cap, show a message directing the
  user to email it or share a drive link, and block submission of the oversized
  file. Update the helper text that currently reads "up to 25MB" to reflect the
  real limit and the large-file path.
- If `NEXT_PUBLIC_WEB3FORMS_KEY` is missing at submit time, fall back to the
  `error` state with a clear console warning rather than posting with an empty
  key.

### 2. WhatsApp link

Replace the numberless `wa.me/?text=...` with `wa.me/447782201438?text=...`
(international format, digits only, no `+`) in both `app/contact/page.tsx` and
the contact form if present there. Keep the existing prefilled message text.

### 3. Open Graph / Twitter image

In `app/layout.tsx` `metadata`, add `openGraph.images` and `twitter.images`
pointing at `/og.png` (1200×630, served from `public/og.png`). This change is
metadata wiring only; the owner supplies the image file. Until the file exists
the tags reference a path that 404s, which is harmless but should be resolved by
adding the asset.

### 4. Testimonials reframe

In `components/sections/Testimonials.tsx`, remove the fabricated `name` and `org`
values. Convert each entry to a role-only attribution (e.g.
"Registered Patent Attorney", "Startup Founder", "Mechanical Engineer") with no
invented person or firm name, and adjust the section so it reads as
representative capability statements rather than verified client quotes. Keep the
quote copy, which describes plausible outcomes, but ensure nothing asserts a
specific real client. Heading copy updated if needed to match (e.g. avoid
implying named references).

## Files Touched

- `components/ContactForm.tsx` — real submission, state machine, validation,
  honeypot.
- `app/contact/page.tsx` — WhatsApp number.
- `app/layout.tsx` — OG/Twitter image metadata.
- `components/sections/Testimonials.tsx` — copy/attribution change.
- `.env.local` (new, git-ignored) and `.env.example` (new, committed) — document
  `NEXT_PUBLIC_WEB3FORMS_KEY`.

## Data / Inputs Required From Owner

- Web3Forms access key (free, from web3forms.com) → `.env.local`. Until then a
  placeholder is committed in `.env.example` and the form surfaces the `error`
  state on submit.
- `public/og.png` (1200×630 social card).

## Error Handling

- Network failure or non-OK Web3Forms response → `error` state, lead-recovery
  guidance (direct email shown), form remains filled so the user can retry.
- Oversized file → blocked before submit with guidance.
- Missing access key → `error` state, no silent empty-key POST.
- Honeypot filled → Web3Forms rejects server-side; UI shows generic success to
  avoid signalling the trap to bots.

## Testing / Verification

- `npm run build` passes (type-check + static generation), as it does today.
- Manual: submit with a valid placeholder/real key and confirm a `200` from
  Web3Forms and the success panel; with the key removed, confirm the `error`
  state; attach a >5 MB file and confirm it is blocked; click the WhatsApp link
  and confirm it opens a chat to 447782201438; inspect page `<head>` for the OG
  image tags; load the homepage and confirm no fabricated names remain in the
  testimonials section.

## Future Upgrade Path (out of scope)

If submission volume grows or branded-domain email is wanted, migrate the form
POST target to a Next.js API route using Resend/SendGrid with server-side
validation. The form's field contract stays the same, so this is a localized
change.

import Reveal from '../Reveal';

const TESTIMONIALS = [
  {
    quote:
      'Drawings came back formatted exactly the way our examiner expected. We filed without a single drawing related office action.',
    name: 'Daniel Reyes',
    role: 'Registered Patent Attorney',
    org: 'Reyes & Whitfield IP',
  },
  {
    quote:
      'I sent rough hand sketches and CAD exports. The figures returned were clean, consistent, and ready for our provisional filing.',
    name: 'Priya Anand',
    role: 'Founder',
    org: 'Korva Labs',
  },
  {
    quote:
      'Communication was direct and the revision rounds were thorough. The final sheets matched our specification language line for line.',
    name: 'Marcus Holt',
    role: 'Senior Mechanical Engineer',
    org: 'Northshore Devices',
  },
  {
    quote:
      'We use Ismosis for design patent work on consumer hardware. The seven view sets are reliably accurate and on time.',
    name: 'Erin Kwon',
    role: 'Director of IP Strategy',
    org: 'Field Industrial',
  },
];

export default function Testimonials() {
  return (
    <section className="border-b border-line">
      <div className="container-page py-20 md:py-28">
        <Reveal>
          <div className="eyebrow eyebrow-line">Selected Feedback</div>
          <h2 className="mt-5 font-display font-medium text-display-lg text-ink text-balance max-w-3xl">
            Working with inventors and attorneys who file regularly.
          </h2>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-px bg-line border border-line">
          {TESTIMONIALS.map((t, i) => (
            <Reveal
              key={t.name}
              as="li"
              delay={(i % 2) * 0.06}
              className="bg-paper p-8 md:p-10"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 text-ink-muted"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                aria-hidden="true"
              >
                <path d="M5 11h4v8H3v-6c0-3 1.5-5 4-6M15 11h4v8h-6v-6c0-3 1.5-5 4-6" />
              </svg>
              <p className="mt-5 font-display text-[19px] md:text-[20px] leading-snug text-ink tracking-[-0.01em] text-pretty">
                {t.quote}
              </p>
              <div className="mt-7 pt-5 border-t border-line flex items-baseline justify-between">
                <div>
                  <div className="text-[14px] font-medium text-ink">{t.name}</div>
                  <div className="text-[12.5px] text-ink-muted mt-0.5">{t.role}</div>
                </div>
                <div className="text-[12px] uppercase tracking-eyebrow text-ink-muted">
                  {t.org}
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import FinalCTA from '@/components/sections/FinalCTA';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Patent illustration pricing tiers, starting figure rates, complexity guidance, and rush delivery options.',
};

const TIERS = [
  {
    name: 'Standard Figure',
    starting: '$100',
    unit: 'per figure',
    description:
      'Single-view technical figure prepared from a clear sketch, photograph, or CAD reference with standard reference numbering.',
    inclusions: [
      'One view per figure',
      'Reference numerals and leader lines',
      'Two revision rounds included',
      'PDF and PNG delivery',
    ],
    suited: 'Best for utility filings with straightforward geometry.',
  },
  {
    name: 'Complex Figure',
    starting: '$300',
    unit: 'per figure',
    description:
      'Multi-view assemblies, cross-sections, and figures requiring extensive callouts, surface shading, or hidden-line work.',
    inclusions: [
      'Multi-view or sectional figure',
      'Detailed callouts and reference numbering',
      'Two revision rounds included',
      'PDF, PNG, and editable source files',
    ],
    suited: 'Best for mechanical, medical, and exploded assemblies.',
    featured: true,
  },
  {
    name: 'Design Patent Set',
    starting: '$550',
    unit: 'seven-view set',
    description:
      'Complete seven-view design patent submission with broken lines for unclaimed environment and proper surface treatment.',
    inclusions: [
      'Front, rear, top, bottom, left, right, perspective',
      'Broken line treatment',
      'Surface shading and stippling as required',
      'Filing-ready PDF sheet set',
    ],
    suited: 'Best for ornamental claims on physical products.',
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title={
          <>
            Transparent figure based pricing,
            <br />
            <span className="text-ink-muted">scaled to complexity.</span>
          </>
        }
        description="Pricing is built per figure rather than per project so cost remains predictable as figure count changes. A fixed quote is issued before drafting begins."
      />

      <section className="border-b border-line">
        <div className="container-page py-20 md:py-24">
          <ul className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-l border-line">
            {TIERS.map((t, i) => (
              <Reveal
                key={t.name}
                as="li"
                delay={i * 0.06}
                className={`border-r border-t border-b border-line p-9 md:p-10 flex flex-col ${
                  t.featured ? 'bg-ink text-paper' : 'bg-paper'
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <span
                    className={`font-mono text-[11px] tracking-wider ${
                      t.featured ? 'text-paper/60' : 'text-ink-muted'
                    }`}
                  >
                    0{i + 1}
                  </span>
                  {t.featured && (
                    <span className="text-[10px] uppercase tracking-eyebrow text-paper/70 border border-paper/30 px-2 py-1">
                      Most Common
                    </span>
                  )}
                </div>

                <h3
                  className={`mt-10 font-display text-[22px] font-medium tracking-[-0.01em] ${
                    t.featured ? 'text-paper' : 'text-ink'
                  }`}
                >
                  {t.name}
                </h3>

                <div className="mt-5 flex items-baseline gap-2">
                  <span
                    className={`text-[10px] uppercase tracking-eyebrow ${
                      t.featured ? 'text-paper/60' : 'text-ink-muted'
                    }`}
                  >
                    From
                  </span>
                  <span
                    className={`font-display text-[40px] md:text-[44px] font-medium leading-none tracking-tightest ${
                      t.featured ? 'text-paper' : 'text-ink'
                    }`}
                  >
                    {t.starting}
                  </span>
                  <span
                    className={`text-[12.5px] ${
                      t.featured ? 'text-paper/60' : 'text-ink-muted'
                    }`}
                  >
                    {t.unit}
                  </span>
                </div>

                <p
                  className={`mt-6 text-[14.5px] leading-relaxed text-pretty ${
                    t.featured ? 'text-paper/75' : 'text-ink-muted'
                  }`}
                >
                  {t.description}
                </p>

                <ul className="mt-8 space-y-2.5">
                  {t.inclusions.map((it) => (
                    <li
                      key={it}
                      className={`flex items-start gap-3 text-[13.5px] leading-relaxed ${
                        t.featured ? 'text-paper' : 'text-ink'
                      }`}
                    >
                      <span
                        className={`mt-2 inline-block h-px w-3 shrink-0 ${
                          t.featured ? 'bg-paper' : 'bg-ink'
                        }`}
                      />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>

                <div
                  className={`mt-8 pt-5 text-[12.5px] leading-relaxed ${
                    t.featured ? 'text-paper/60 border-t border-paper/15' : 'text-ink-muted border-t border-line'
                  }`}
                >
                  {t.suited}
                </div>

                <Link
                  href="/contact"
                  className={`mt-8 inline-flex items-center justify-center h-11 px-5 text-[13.5px] font-medium transition-all duration-300 ${
                    t.featured
                      ? 'bg-paper text-ink hover:bg-paper-tint'
                      : 'bg-ink text-paper hover:bg-navy'
                  }`}
                >
                  Request Quote
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-line bg-paper-warm">
        <div className="container-page py-20 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <Reveal className="lg:col-span-5">
              <div className="eyebrow eyebrow-line">Complexity Notes</div>
              <h2 className="mt-5 font-display font-medium text-display-lg text-ink text-balance">
                How complexity is determined.
              </h2>
              <p className="mt-6 text-[15.5px] leading-relaxed text-ink-muted max-w-md text-pretty">
                Each figure is assessed individually before quoting. The intent is to keep
                cost honest rather than smoothed into a flat rate.
              </p>
            </Reveal>

            <ul className="lg:col-span-7 space-y-0 border-t border-line">
              {[
                {
                  k: 'View Count',
                  v: 'Number of orthographic or sectional views needed for a single figure.',
                },
                {
                  k: 'Reference Density',
                  v: 'Volume of callouts, leader lines, and reference numerals across the figure.',
                },
                {
                  k: 'Geometric Detail',
                  v: 'Surface texture, threading, internal mechanisms, and hidden-line work.',
                },
                {
                  k: 'Source Quality',
                  v: 'Whether starting material is finished CAD, hand sketch, or photograph.',
                },
                {
                  k: 'Rush Multiplier',
                  v: '48-hour and 72-hour schedules carry a 1.4× and 1.25× adjustment respectively.',
                },
              ].map((row) => (
                <li
                  key={row.k}
                  className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 py-5 border-b border-line"
                >
                  <span className="md:w-48 text-[12.5px] uppercase tracking-eyebrow text-ink-muted shrink-0">
                    {row.k}
                  </span>
                  <span className="text-[15px] text-ink leading-relaxed text-pretty">
                    {row.v}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}

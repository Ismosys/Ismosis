import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import FinalCTA from '@/components/sections/FinalCTA';
import HeroAssembly from '@/components/illustrations/HeroAssembly';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Ismosis is a patent illustration studio for inventors, engineers, and attorneys preparing USPTO applications.',
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={
          <>
            A patent illustration studio
            <br />
            <span className="text-ink-muted">built around the filing.</span>
          </>
        }
        description="Ismosis works directly with inventors and patent professionals. Every project is treated as a record submission with the same expectations a careful examiner would have."
      />

      <section className="border-b border-line">
        <div className="container-page py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <Reveal className="lg:col-span-7">
              <div className="space-y-6 text-[16px] md:text-[16.5px] leading-[1.7] text-ink-muted text-pretty">
                <p>
                  Ismosis began with a simple observation. Inventors and small firms often
                  submit drawings that are technically correct but formatted in a way that
                  invites office actions. A clean specification deserves clean figures.
                </p>
                <p>
                  The studio prepares utility, design, and software figures with line
                  weight, view structure, and reference numbering matched to the
                  formatting examiners expect. Work is delivered as complete sheet sets
                  rather than isolated images, so the application is ready to be filed
                  rather than reassembled.
                </p>
                <p>
                  Communication is direct. There are no account managers between the
                  inventor and the work. Revisions are part of standard scope. Confidential
                  material is treated as such, and a non disclosure agreement is signed
                  before any disclosure is shared.
                </p>
              </div>

              <div className="mt-12 pt-10 border-t border-line grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { k: 'Focus', v: 'USPTO Filings' },
                  { k: 'Practice', v: 'Utility / Design' },
                  { k: 'Response', v: 'Within 24 Hours' },
                  { k: 'NDA', v: 'Signed on Request' },
                ].map((s) => (
                  <div key={s.k}>
                    <div className="text-[10.5px] uppercase tracking-eyebrow text-ink-muted">
                      {s.k}
                    </div>
                    <div className="mt-2 font-display text-[16px] md:text-[17px] text-ink tracking-[-0.01em]">
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-5">
              <div className="relative border border-line bg-paper-warm aspect-[4/5] tech-corners">
                <div className="absolute inset-0 grid-overlay opacity-50" />
                <HeroAssembly className="absolute inset-0 w-full h-full p-4 text-ink" />
              </div>
              <div className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-eyebrow text-ink-muted">
                <span>FIG. 1</span>
                <span>Reference sheet</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper-warm">
        <div className="container-page py-20 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <Reveal className="lg:col-span-4">
              <div className="eyebrow eyebrow-line">How We Work</div>
              <h2 className="mt-5 font-display font-medium text-display-lg text-ink text-balance">
                Working with inventors and attorneys.
              </h2>
            </Reveal>
            <ul className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-line border border-line">
              {[
                {
                  t: 'For Inventors',
                  d: 'Rough sketches and verbal descriptions are enough to begin. A short call clarifies which features need emphasis before any figure is drafted.',
                },
                {
                  t: 'For Patent Attorneys',
                  d: 'Figures are referenced against the specification language so callout numbers, view labels, and figure references match without manual reconciliation.',
                },
                {
                  t: 'For Engineers',
                  d: 'CAD models are simplified to retain the operative geometry while removing detail that obscures the claimed mechanism. Sectional and exploded views available.',
                },
                {
                  t: 'For Startups',
                  d: 'Provisional and non provisional filings are supported with predictable timelines that fit board calendars and fund raise schedules.',
                },
              ].map((b) => (
                <li key={b.t} className="bg-paper p-7 md:p-9">
                  <h3 className="font-display text-[18px] md:text-[19px] font-medium text-ink tracking-[-0.01em]">
                    {b.t}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-ink-muted text-pretty">
                    {b.d}
                  </p>
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

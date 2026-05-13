import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import FinalCTA from '@/components/sections/FinalCTA';
import HeroAssembly from '@/components/illustrations/HeroAssembly';

export const metadata: Metadata = {
  title: 'Process',
  description:
    'How patent illustration projects move from sketch and CAD intake through delivery of USPTO ready filing sheets.',
};

const STEPS = [
  {
    no: '01',
    title: 'Send Sketch or CAD',
    body: 'Share what you have. Hand sketches, CAD models, photographs, prior drawings, or written disclosures. Anything that communicates the invention is enough to begin.',
    items: [
      'Accepted: PDF, PNG, JPG, STEP, IGES, SLDPRT, X_T, 3MF',
      'Specifications and claim language welcome',
      'NDA signed before any disclosure is shared',
    ],
  },
  {
    no: '02',
    title: 'Review Requirements',
    body: 'A short scoping exchange confirms figure count, view structure, sheet count, reference number list, and timeline. A fixed quote and delivery date are issued before drafting starts.',
    items: [
      'Figure count and view structure confirmed',
      'Fixed quote with delivery date',
      'Rush schedule available when filing deadlines require it',
    ],
  },
  {
    no: '03',
    title: 'Draft Illustration Delivery',
    body: 'First drafts are delivered as a complete sheet set rather than isolated figures. Each figure is numbered, labeled, and arranged across sheets ready for examiner review.',
    items: [
      'Numbered sheets per USPTO formatting',
      'Reference callouts aligned with the specification',
      'Two rounds of revision included in standard scope',
    ],
  },
  {
    no: '04',
    title: 'Final USPTO Ready Files',
    body: 'After revisions, the final sheet set is delivered as a single PDF suitable for direct filing. Editable source files are available on request for downstream prosecution.',
    items: [
      'Single PDF formatted to USPTO specifications',
      'High resolution PNG export of every figure',
      'Editable source files available on request',
    ],
  },
];

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Process"
        title={
          <>
            From rough sketch
            <br />
            <span className="text-ink-muted">to file ready sheets.</span>
          </>
        }
        description="Every project follows the same predictable workflow. The objective is a drawing set that supports the application without office actions tied to formatting."
      />

      <section className="border-b border-line">
        <div className="container-page py-20 md:py-28">
          <div className="relative">
            <div className="hidden lg:block absolute left-[136px] top-2 bottom-2 w-px bg-line" />
            <ul className="space-y-16 md:space-y-20">
              {STEPS.map((step, i) => (
                <Reveal key={step.no} as="li" delay={i * 0.05}>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    <div className="lg:col-span-3 flex lg:block items-center gap-4">
                      <div className="relative">
                        <span className="hidden lg:flex absolute -left-1 top-1 h-2 w-2 bg-ink" />
                        <span className="font-mono text-[11px] tracking-wider text-ink-muted">
                          STEP {step.no}
                        </span>
                        <div className="mt-2 font-display font-medium text-[44px] md:text-[56px] text-ink leading-none">
                          {step.no}
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-5">
                      <h2 className="font-display font-medium text-[24px] md:text-[28px] text-ink tracking-tightest text-balance">
                        {step.title}
                      </h2>
                      <p className="mt-4 text-[15.5px] leading-relaxed text-ink-muted text-pretty">
                        {step.body}
                      </p>
                    </div>
                    <div className="lg:col-span-4">
                      <ul className="border-t border-line">
                        {step.items.map((it) => (
                          <li
                            key={it}
                            className="py-3.5 border-b border-line text-[13.5px] text-ink flex items-start gap-3"
                          >
                            <span className="mt-[8px] inline-block h-px w-2.5 bg-ink shrink-0" />
                            <span className="leading-relaxed">{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper-warm">
        <div className="container-page py-20 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <Reveal className="lg:col-span-6">
              <div className="eyebrow eyebrow-line">Working Standards</div>
              <h2 className="mt-5 font-display font-medium text-display-lg text-ink text-balance">
                What every sheet inherits by default.
              </h2>
              <ul className="mt-9 space-y-4">
                {[
                  '8.5 x 11 inch portrait sheets with proper margins',
                  'Black line work at examination ready resolution',
                  'Reference numerals on leader lines without obstruction',
                  'Cross referenced numbering across all figures',
                  'Section, plan, elevation, and isometric views as required',
                ].map((s) => (
                  <li key={s} className="flex items-start gap-3 text-[15px] text-ink leading-relaxed">
                    <span className="mt-2 inline-block h-px w-3 bg-ink shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-6">
              <div className="relative border border-line bg-paper aspect-[5/4] tech-corners">
                <div className="absolute inset-0 grid-overlay opacity-50" />
                <HeroAssembly className="absolute inset-0 w-full h-full p-4 text-ink" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] uppercase tracking-eyebrow text-ink-muted">
                  <span>Sheet 1 / 4</span>
                  <span>Drive Assembly</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}

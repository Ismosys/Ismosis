import Reveal from '../Reveal';

const STEPS = [
  {
    no: '01',
    title: 'Send Sketch or CAD',
    body: 'Share rough sketches, photographs, CAD files, or written descriptions. Common formats include PDF, JPG, PNG, STEP, IGES, and SLDPRT.',
  },
  {
    no: '02',
    title: 'Review Requirements',
    body: 'We confirm the figure count, view structure, reference numbering preferences, and timeline before drafting begins.',
  },
  {
    no: '03',
    title: 'Draft Illustration Delivery',
    body: 'First draft is sent for review with all figures inked, labeled, and arranged on numbered sheets ready for markup.',
  },
  {
    no: '04',
    title: 'Final USPTO Ready Files',
    body: 'After revisions, final sheets are delivered as PDF and high resolution source files suitable for direct application filing.',
  },
];

export default function Process() {
  return (
    <section className="border-b border-line">
      <div className="container-page py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 md:mb-16">
          <Reveal className="lg:col-span-5">
            <div className="eyebrow eyebrow-line">Process</div>
            <h2 className="mt-5 font-display font-medium text-display-lg text-ink text-balance">
              Four steps from sketch to filing ready figures.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7 self-end">
            <p className="text-[16px] leading-relaxed text-ink-muted max-w-xl text-pretty">
              A predictable workflow that minimizes revisions. Most projects move from
              first draft to finalized drawings within five to seven business days.
            </p>
          </Reveal>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
          {STEPS.map((step, i) => (
            <Reveal
              key={step.no}
              as="li"
              delay={i * 0.06}
              className="bg-paper p-7 md:p-9 min-h-[260px] flex flex-col"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] tracking-wider text-ink-muted">
                  STEP {step.no}
                </span>
                <span className="font-display text-[34px] font-medium text-ink leading-none">
                  {step.no}
                </span>
              </div>
              <div className="mt-auto pt-12">
                <h3 className="font-display text-[19px] font-medium text-ink tracking-[-0.01em]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink-muted text-pretty">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

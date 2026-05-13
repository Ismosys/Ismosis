import Reveal from '../Reveal';
import Hinge from '../illustrations/Hinge';

const POINTS = [
  {
    title: 'USPTO Formatting Understanding',
    body: 'Sheet margins, view labeling, line weight, and shading conventions matched to MPEP 608.02 expectations.',
  },
  {
    title: 'Technical Accuracy',
    body: 'Figures preserve proportions, mechanisms, and operative features as specified in the disclosure.',
  },
  {
    title: 'Fast Communication',
    body: 'Responses within 24 hours during the project. Direct contact, no account managers between you and the work.',
  },
  {
    title: 'Professional Revisions',
    body: 'Revisions are part of the scope. Markups, written notes, and screen recordings are reviewed line by line.',
  },
  {
    title: 'Clean Figure Consistency',
    body: 'Reference numbering, callout style, and view orientation remain consistent across every figure in the set.',
  },
  {
    title: 'Reliable Delivery Timelines',
    body: 'A confirmed delivery date is set after scope review and held to. Rush schedules are available when filings demand it.',
  },
];

export default function WhyChoose() {
  return (
    <section className="border-b border-line bg-paper-warm">
      <div className="container-page py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <Reveal className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="eyebrow eyebrow-line">Why Ismosis</div>
            <h2 className="mt-5 font-display font-medium text-display-lg text-ink text-balance">
              Built for examiners.
              <br />
              <span className="text-ink-muted">Delivered for filers.</span>
            </h2>
            <p className="mt-6 max-w-md text-[15.5px] leading-relaxed text-ink-muted text-pretty">
              Every decision in the drawing serves a clear purpose. The objective is a
              file ready set that supports the application instead of slowing it down.
            </p>

            <div className="mt-10 border border-line bg-paper aspect-[5/4] relative tech-corners">
              <div className="absolute inset-0 grid-overlay opacity-50" />
              <Hinge className="absolute inset-0 w-full h-full p-4 text-ink" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] uppercase tracking-eyebrow text-ink-muted">
                <span>FIG. 7</span>
                <span>Hinge Assembly</span>
              </div>
            </div>
          </Reveal>

          <ul className="lg:col-span-7 space-y-0 border-t border-line">
            {POINTS.map((p, i) => (
              <Reveal
                key={p.title}
                as="li"
                delay={(i % 3) * 0.05}
                className="border-b border-line py-7 md:py-8"
              >
                <div className="flex items-start gap-6 md:gap-10">
                  <span className="font-mono text-[11px] tracking-wider text-ink-muted pt-1 shrink-0">
                    0{i + 1}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-[19px] md:text-[20px] font-medium text-ink tracking-[-0.01em]">
                      {p.title}
                    </h3>
                    <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-muted max-w-xl text-pretty">
                      {p.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

import Link from 'next/link';
import Reveal from '../Reveal';
import {
  IconUtility,
  IconDesign,
  IconRedraw,
  IconCAD,
  IconSoftware,
  IconLineArt,
} from '../illustrations/SmallIcons';

const SERVICES = [
  {
    id: 'utility',
    no: '01',
    title: 'Utility Patent Drawings',
    description:
      'Multi view utility figures prepared to USPTO specification with consistent reference numbering and shading conventions.',
    Icon: IconUtility,
  },
  {
    id: 'design',
    no: '02',
    title: 'Design Patent Drawings',
    description:
      'Seven view design submissions with proper surface shading, broken lines, and contour treatment for ornamental claims.',
    Icon: IconDesign,
  },
  {
    id: 'redrawing',
    no: '03',
    title: 'Patent Figure Redrawing',
    description:
      'Cleanup and reformatting of existing figures rejected for line weight, clarity, or formatting non compliance.',
    Icon: IconRedraw,
  },
  {
    id: 'cad',
    no: '04',
    title: 'CAD to Patent Illustration',
    description:
      'Conversion of STEP, IGES, and SolidWorks files into clean two dimensional patent figures with selected callouts.',
    Icon: IconCAD,
  },
  {
    id: 'software',
    no: '05',
    title: 'Software and UI Patent Figures',
    description:
      'Interface flow diagrams and screen state figures for software claims, system architecture, and method patents.',
    Icon: IconSoftware,
  },
  {
    id: 'line-art',
    no: '06',
    title: 'Technical Line Art',
    description:
      'Custom black line illustrations for technical documentation, white papers, and engineering specification sheets.',
    Icon: IconLineArt,
  },
];

export default function Services() {
  return (
    <section className="border-b border-line">
      <div className="container-page py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          <Reveal className="lg:col-span-5">
            <div className="eyebrow eyebrow-line">Services</div>
            <h2 className="mt-5 font-display font-medium text-display-lg text-ink text-balance">
              Drawings prepared for the application you are filing.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7 self-end">
            <p className="text-[16px] leading-relaxed text-ink-muted max-w-xl text-pretty">
              Each project is treated as a record submission. Figures are drafted with the
              line weight, view structure, and reference numbering examiners expect.
            </p>
          </Reveal>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-line">
          {SERVICES.map(({ id, no, title, description, Icon }, i) => (
            <Reveal
              key={id}
              as="li"
              delay={(i % 3) * 0.05}
              className="group relative border-r border-b border-line"
            >
              <Link
                href={`/services#${id}`}
                className="block p-7 md:p-9 h-full transition-colors duration-300 hover:bg-paper-warm"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[11px] tracking-wider text-ink-muted">
                    {no}
                  </span>
                  <Icon className="h-8 w-8 text-ink" />
                </div>
                <h3 className="mt-12 font-display text-[20px] font-medium text-ink tracking-[-0.01em] text-balance">
                  {title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink-muted text-pretty">
                  {description}
                </p>
                <div className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink">
                  <span className="transition-transform duration-300 ease-precise group-hover:-translate-x-0.5">
                    Learn more
                  </span>
                  <svg
                    viewBox="0 0 14 14"
                    className="h-3 w-3 transition-transform duration-300 ease-precise group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M2 7h10M8 3l4 4-4 4" />
                  </svg>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

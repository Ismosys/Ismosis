import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import FinalCTA from '@/components/sections/FinalCTA';
import Mechanical from '@/components/illustrations/Mechanical';
import ConsumerProduct from '@/components/illustrations/ConsumerProduct';
import Medical from '@/components/illustrations/Medical';
import Electronics from '@/components/illustrations/Electronics';
import MobileUI from '@/components/illustrations/MobileUI';
import ExplodedView from '@/components/illustrations/ExplodedView';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Patent illustration services for utility filings, design patents, redrawing, CAD conversion, software figures, and technical line art.',
};

const SERVICES = [
  {
    id: 'utility',
    no: '01',
    title: 'Utility Patent Drawings',
    summary:
      'Multi view technical drawings prepared for utility patent applications, with consistent reference numbering across every figure.',
    points: [
      'Plan, elevation, section, and isometric views as needed',
      'Reference numbering tied to the specification',
      'Standard line weights and surface shading per MPEP 608.02',
    ],
    Art: Mechanical,
  },
  {
    id: 'design',
    no: '02',
    title: 'Design Patent Drawings',
    summary:
      'Standard seven-view sets prepared for ornamental claims, with broken lines and contour treatment that examiners expect.',
    points: [
      'Front, rear, top, bottom, left, right, and perspective views',
      'Broken lines for unclaimed environment',
      'Surface shading and stippling where required',
    ],
    Art: ConsumerProduct,
  },
  {
    id: 'redrawing',
    no: '03',
    title: 'Patent Figure Redrawing',
    summary:
      'Existing figures that received office action objections are rebuilt to comply with line weight, clarity, and view requirements.',
    points: [
      'Cleanup of low-resolution or inconsistent linework',
      'Reformat to sheet specifications and margins',
      'Resolution of objection items in the response window',
    ],
    Art: Medical,
  },
  {
    id: 'cad',
    no: '04',
    title: 'CAD to Patent Illustration',
    summary:
      'Three-dimensional CAD models converted into clean two-dimensional figures that retain the essential geometry of the disclosure.',
    points: [
      'STEP, IGES, SLDPRT, X_T, 3MF accepted',
      'Hidden lines, section views, and exploded views',
      'Selected reference callouts based on claim language',
    ],
    Art: ExplodedView,
  },
  {
    id: 'software',
    no: '05',
    title: 'Software and UI Patent Figures',
    summary:
      'Screen state diagrams and method flowcharts for software claims, mobile interfaces, and system architecture figures.',
    points: [
      'Interface states with consistent device frames',
      'Flowcharts for claimed methods and processes',
      'System diagrams for distributed architecture claims',
    ],
    Art: MobileUI,
  },
  {
    id: 'line-art',
    no: '06',
    title: 'Technical Line Art',
    summary:
      'Custom black line illustrations for technical documentation, investor materials, and engineering specification sheets.',
    points: [
      'Cutaway and phantom views for product literature',
      'Annotated assembly figures',
      'Vector source delivery for downstream layout work',
    ],
    Art: Electronics,
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={
          <>
            Patent illustration work,
            <br />
            <span className="text-ink-muted">handled end to end.</span>
          </>
        }
        description="Six core offerings, each built around the specific formatting needs of the document being filed. Scope is defined before drafting and held throughout the project."
      />

      <section>
        {SERVICES.map((s, i) => {
          const reverse = i % 2 === 1;
          return (
            <div
              key={s.id}
              id={s.id}
              className="border-b border-line scroll-mt-24"
            >
              <div className="container-page py-20 md:py-28">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                  <Reveal
                    className={`lg:col-span-6 ${reverse ? 'lg:order-2' : 'lg:order-1'}`}
                  >
                    <div className="relative border border-line bg-paper-warm aspect-[5/4] tech-corners">
                      <div className="absolute inset-0 grid-overlay opacity-45" />
                      <s.Art className="absolute inset-0 w-full h-full p-4 text-ink" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] uppercase tracking-eyebrow text-ink-muted">
                        <span>Sample</span>
                        <span>0.4pt black line</span>
                      </div>
                    </div>
                  </Reveal>

                  <Reveal
                    delay={0.08}
                    className={`lg:col-span-6 ${reverse ? 'lg:order-1' : 'lg:order-2'}`}
                  >
                    <span className="font-mono text-[11px] tracking-wider text-ink-muted">
                      {s.no} / Service
                    </span>
                    <h2 className="mt-5 font-display font-medium text-display-lg text-ink tracking-tightest text-balance">
                      {s.title}
                    </h2>
                    <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-ink-muted text-pretty">
                      {s.summary}
                    </p>

                    <ul className="mt-9 space-y-3">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-start gap-3">
                          <span className="mt-[10px] inline-block h-px w-3 bg-ink shrink-0" />
                          <span className="text-[14.5px] leading-relaxed text-ink">
                            {p}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-10 flex flex-wrap items-center gap-3">
                      <Link href="/contact" className="btn-primary">
                        Request Quote
                      </Link>
                      <Link href="/portfolio" className="btn-link">
                        See examples
                        <svg viewBox="0 0 14 14" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M2 7h10M8 3l4 4-4 4" />
                        </svg>
                      </Link>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <FinalCTA />
    </>
  );
}

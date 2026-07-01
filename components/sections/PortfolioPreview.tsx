import Image from 'next/image';
import Link from 'next/link';
import Reveal from '../Reveal';
import { Stagger, StaggerItem } from '../Stagger';
import { PORTFOLIO_ITEMS } from '@/lib/portfolio';

const FEATURED_IDS = [
  'quadruped-body',
  'bearing-assembly',
  'planetary-rover',
  'torso-brace',
  'launch-vehicle',
  'turbine-housing',
];

const SPANS = [
  'lg:col-span-7',
  'lg:col-span-5',
  'lg:col-span-5',
  'lg:col-span-7',
  'lg:col-span-7',
  'lg:col-span-5',
];

export default function PortfolioPreview() {
  const featured = FEATURED_IDS.map((id) => PORTFOLIO_ITEMS.find((p) => p.id === id)!).filter(Boolean);

  return (
    <section className="border-b border-line bg-paper">
      <div className="container-page py-20 md:py-28">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <Reveal>
            <div className="eyebrow eyebrow-line">Portfolio</div>
            <h2 className="mt-5 font-display font-medium text-display-lg text-ink text-balance max-w-2xl">
              Selected work across mechanical, aerospace, and medical figures.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/portfolio" className="btn-link">
              View full portfolio
              <svg viewBox="0 0 14 14" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 7h10M8 3l4 4-4 4" />
              </svg>
            </Link>
          </Reveal>
        </div>

        <Stagger className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {featured.map((item, i) => (
            <StaggerItem key={item.id} className={SPANS[i]}>
              <Link
                href="/portfolio"
                className="group relative block overflow-hidden border border-line bg-paper aspect-[5/4] transition-[transform,border-color] duration-300 ease-precise hover:border-ink hover:-translate-y-0.5 active:translate-y-0 focus-ring"
              >
                <div className="absolute inset-0 grid-overlay opacity-30 z-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-15" />
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain p-4 md:p-7 transition-transform duration-700 ease-precise group-hover:scale-[1.04]"
                />

                <div className="absolute top-4 left-4 text-[10px] uppercase tracking-eyebrow text-ink-muted z-20">
                  {item.figure}
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between p-4 md:p-5 bg-gradient-to-t from-paper via-paper/85 to-transparent pt-12">
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-eyebrow text-ink-muted">
                      {item.category} / {item.type}
                    </div>
                    <h3 className="mt-1 font-display text-[17px] md:text-[18px] font-medium text-ink tracking-[-0.01em] truncate">
                      {item.title}
                    </h3>
                  </div>
                  <span className="inline-flex items-center justify-center h-9 w-9 shrink-0 border border-line-strong text-ink transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                    <svg viewBox="0 0 14 14" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M2 7h10M8 3l4 4-4 4" />
                    </svg>
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

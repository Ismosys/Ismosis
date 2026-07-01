'use client';

import Image from 'next/image';
import { useState, useMemo } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { EASE } from '@/lib/motion';
import { PORTFOLIO_ITEMS, type PortfolioItem, type Category } from '@/lib/portfolio';

const FILTERS: { id: Category | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'mechanical', label: 'Mechanical' },
  { id: 'aerospace', label: 'Aerospace' },
  { id: 'medical', label: 'Medical' },
  { id: 'industrial', label: 'Industrial' },
];

export default function PortfolioGrid() {
  const [filter, setFilter] = useState<Category | 'all'>('all');
  const [active, setActive] = useState<PortfolioItem | null>(null);
  const reduce = useReducedMotion();

  const visible = useMemo(
    () =>
      filter === 'all'
        ? PORTFOLIO_ITEMS
        : PORTFOLIO_ITEMS.filter((i) => i.category === filter),
    [filter]
  );

  return (
    <section className="border-b border-line">
      <div className="container-page py-16 md:py-20">
        <div className="flex flex-wrap items-center gap-2 mb-12 md:mb-14">
          {FILTERS.map((f) => {
            const isActive = filter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`h-9 px-4 text-[13px] font-medium tracking-[-0.005em] border transition-all duration-200 focus-ring ${
                  isActive
                    ? 'bg-ink text-paper border-ink'
                    : 'bg-paper text-ink-muted border-line-strong hover:text-ink hover:border-ink'
                }`}
              >
                {f.label}
              </button>
            );
          })}
          <div className="ml-auto text-[12px] uppercase tracking-eyebrow text-ink-muted">
            {visible.length} {visible.length === 1 ? 'item' : 'items'}
          </div>
        </div>

        <motion.ul
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((item) => (
              <motion.li
                key={item.id}
                layout
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <button
                  onClick={() => setActive(item)}
                  className="group block w-full text-left border border-line bg-paper transition-[transform,border-color] duration-300 ease-precise hover:border-ink hover:-translate-y-0.5 active:translate-y-0 focus-ring"
                >
                  <div className="relative aspect-[5/4] overflow-hidden bg-paper">
                    <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none z-10" />
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-contain p-4 md:p-6 transition-transform duration-700 ease-precise group-hover:scale-[1.03]"
                    />
                    <div className="absolute top-3 left-3 text-[10px] uppercase tracking-eyebrow text-ink-muted z-20">
                      {item.figure}
                    </div>
                  </div>
                  <div className="flex items-start justify-between gap-4 p-5 border-t border-line">
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-eyebrow text-ink-muted">
                        {item.type} / {item.category}
                      </div>
                      <h3 className="mt-1.5 font-display text-[17px] font-medium text-ink tracking-[-0.01em] truncate">
                        {item.title}
                      </h3>
                    </div>
                    <span className="inline-flex items-center justify-center h-8 w-8 shrink-0 border border-line-strong transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                      <svg viewBox="0 0 14 14" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M2 7h10M8 3l4 4-4 4" />
                      </svg>
                    </span>
                  </div>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-ink/85 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="relative w-full max-w-5xl bg-paper border border-paper max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 z-10 inline-flex items-center justify-center h-9 w-9 border border-line-strong bg-paper text-ink hover:bg-ink hover:text-paper transition-colors focus-ring"
                aria-label="Close"
              >
                <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 2l10 10M12 2L2 12" />
                </svg>
              </button>

              <div className="relative aspect-[16/10] bg-paper-warm shrink-0">
                <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />
                <Image
                  src={active.src}
                  alt={active.title}
                  fill
                  sizes="(min-width: 1280px) 1024px, 90vw"
                  className="object-contain p-6 md:p-10"
                />
              </div>
              <div className="p-7 md:p-9 border-t border-line overflow-y-auto">
                <div className="text-[10.5px] uppercase tracking-eyebrow text-ink-muted">
                  {active.figure} / {active.type} / {active.category}
                </div>
                <h3 className="mt-2 font-display text-[22px] md:text-[26px] font-medium text-ink tracking-tightest">
                  {active.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink-muted max-w-2xl text-pretty">
                  {active.description}
                </p>
                <div className="mt-6 pt-5 border-t border-line grid grid-cols-2 md:grid-cols-4 gap-5">
                  {[
                    { k: 'Application', v: active.application },
                    { k: 'Views', v: active.views },
                    { k: 'Method', v: active.method },
                    { k: 'Delivery', v: active.delivery },
                  ].map((row) => (
                    <div key={row.k}>
                      <div className="text-[10.5px] uppercase tracking-eyebrow text-ink-muted">
                        {row.k}
                      </div>
                      <div className="mt-1.5 text-[13.5px] text-ink">{row.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

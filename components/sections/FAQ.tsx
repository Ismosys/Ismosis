'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from '../Reveal';
import { EASE } from '@/lib/motion';

const FAQS = [
  {
    q: 'What file formats do you accept?',
    a: 'Sketches as PDF, JPG, or PNG. CAD files as STEP, IGES, SLDPRT, X_T, or 3MF. Written descriptions and claim language by document or email body. Photographs and screenshots are also accepted for redrawing work.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Most projects deliver first drafts within five to seven business days based on figure count and complexity. Rush schedules of 48–72 hours are available when filing dates require them.',
  },
  {
    q: 'Do you sign NDAs?',
    a: 'Yes. A mutual non-disclosure agreement is signed before sharing any disclosure materials. Standard agreements are accepted and custom agreements are reviewed without delay.',
  },
  {
    q: 'Can you redraw rough sketches?',
    a: 'Yes. Pencil sketches, whiteboard photos, and napkin-level concepts are routinely turned into compliant figures. Verbal callouts during a short review call are welcome if helpful.',
  },
  {
    q: 'Do you support design patents?',
    a: 'Yes. Standard seven-view design patent sets are prepared with proper broken lines, contour treatment, and surface shading suited to ornamental claims.',
  },
  {
    q: 'What file formats are delivered?',
    a: 'Final delivery includes a single PDF formatted to USPTO sheet specifications and high-resolution PNG exports of each figure. Editable source files are provided on request.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="border-b border-line">
      <div className="container-page py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <div className="eyebrow eyebrow-line">Questions</div>
            <h2 className="mt-5 font-display font-medium text-display-lg text-ink text-balance">
              Frequently asked
            </h2>
            <p className="mt-5 text-[15.5px] leading-relaxed text-ink-muted max-w-sm text-pretty">
              If something is not covered here, send a message and a direct answer follows
              within the same business day.
            </p>
          </Reveal>

          <div className="lg:col-span-8">
            <ul className="border-t border-line">
              {FAQS.map((item, i) => {
                const expanded = open === i;
                return (
                  <Reveal
                    as="li"
                    key={item.q}
                    delay={(i % 3) * 0.05}
                    className="border-b border-line"
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(expanded ? null : i)}
                      className="w-full flex items-start gap-6 py-6 md:py-7 text-left group"
                      aria-expanded={expanded}
                    >
                      <span className="font-mono text-[11px] tracking-wider text-ink-muted pt-1 shrink-0">
                        0{i + 1}
                      </span>
                      <span className="flex-1 font-display text-[18px] md:text-[19px] font-medium text-ink tracking-[-0.01em] pr-6">
                        {item.q}
                      </span>
                      <span
                        className={`mt-1 relative h-4 w-4 shrink-0 transition-transform duration-300 ease-precise ${
                          expanded ? 'rotate-45' : 'rotate-0'
                        }`}
                        aria-hidden="true"
                      >
                        <span className="absolute top-1/2 left-0 right-0 h-px bg-ink" />
                        <span className="absolute top-0 bottom-0 left-1/2 w-px bg-ink" />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {expanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="pb-7 pl-10 md:pl-[3.25rem] pr-10 max-w-2xl text-[15px] leading-relaxed text-ink-muted text-pretty">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

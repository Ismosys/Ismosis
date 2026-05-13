'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import HeroAssembly from '../illustrations/HeroAssembly';
import { EASE } from '@/lib/motion';

const TRUST = [
  'USPTO Compliant',
  'Fast Turnaround',
  'Revision Support',
  'Confidential Handling',
];

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative border-b border-line">
      <div className="container-page pt-14 md:pt-24 pb-16 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="eyebrow eyebrow-line"
            >
              Patent Illustration Studio
            </motion.div>

            <motion.h1
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
              className="mt-6 font-display font-medium text-display-2xl text-ink text-balance"
            >
              USPTO patent illustrations
              <br />
              <span className="text-ink-muted">
                that help inventors file faster.
              </span>
            </motion.h1>

            <motion.p
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.18 }}
              className="mt-7 max-w-xl text-[16px] md:text-[17px] leading-relaxed text-ink-muted text-pretty"
            >
              Accurate, formatting compliant patent drawings prepared for inventors and
              attorneys. Built from your sketches, CAD files, or photographs with the
              precision your application requires.
            </motion.p>

            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.28 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Link href="/contact" className="btn-primary h-12 px-6">
                Request Quote
                <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 7h10M8 3l4 4-4 4" />
                </svg>
              </Link>
              <Link href="/portfolio" className="btn-ghost h-12 px-6">
                View Portfolio
              </Link>
            </motion.div>

            <motion.ul
              initial={reduce ? { opacity: 0 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-12 grid grid-cols-2 sm:flex sm:flex-wrap gap-x-8 gap-y-3"
            >
              {TRUST.map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span className="inline-block h-px w-3 bg-ink" />
                  <span className="text-[12.5px] uppercase tracking-eyebrow text-ink font-medium">
                    {item}
                  </span>
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative border border-line bg-paper-warm aspect-[9/8] tech-corners">
              <div className="absolute inset-0 grid-overlay opacity-50" />
              <HeroAssembly className="absolute inset-0 w-full h-full text-ink p-4" />

              <div className="absolute top-3 right-3 flex items-center gap-2 text-[10px] uppercase tracking-eyebrow text-ink-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-navy" />
                Studio Sample
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] uppercase tracking-eyebrow text-ink-muted">
                <span>Sheet 1 / 4</span>
                <span>Inked / 0.5pt</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-[11px] tracking-eyebrow uppercase text-ink-muted">
              <span>FIG. 1 / Drive Assembly</span>
              <span>Black line / 0.4pt</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

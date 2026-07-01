'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import HeroAssembly from '../illustrations/HeroAssembly';
import { Stagger, StaggerItem } from '../Stagger';
import { EASE } from '@/lib/motion';

const TRUST = [
  'USPTO Compliant',
  'Fast Turnaround',
  'Revision Support',
  'Confidential Handling',
];

export default function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const figureY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -28]);

  return (
    <section ref={sectionRef} className="relative border-b border-line overflow-hidden">
      {/* Blueprint background, full-bleed */}
      <div className="absolute inset-0 blueprint-grid pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 blueprint-grid-major pointer-events-none" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-r from-paper via-paper/85 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-page relative pt-14 md:pt-24 pb-16 md:pb-0 lg:pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 lg:pb-28 self-end">
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="eyebrow eyebrow-line eyebrow-accent"
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

            <Stagger
              as="ul"
              className="mt-12 grid grid-cols-2 sm:flex sm:flex-wrap gap-x-8 gap-y-3"
            >
              {TRUST.map((item) => (
                <StaggerItem key={item} as="li" y={8} className="flex items-center gap-2.5">
                  <span className="inline-block h-px w-3 bg-ink" />
                  <span className="text-[12.5px] uppercase tracking-eyebrow text-ink font-medium">
                    {item}
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            className="relative lg:col-span-6 lg:mr-[calc(50%-50vw)]"
          >
            <motion.div
              style={{ y: figureY }}
              className="relative h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[660px] border-y border-l border-line bg-paper-warm tech-corners overflow-hidden"
            >
              <div className="absolute inset-0 grid-overlay opacity-50" aria-hidden="true" />
              <div className="absolute inset-0 blueprint-grid opacity-60" aria-hidden="true" />
              <HeroAssembly className="absolute inset-0 w-full h-full text-ink p-6 md:p-12" />

              <div className="absolute top-4 left-5 right-5 flex items-center justify-between text-[10px] uppercase tracking-eyebrow text-ink-muted">
                <span className="font-medium text-ink">FIG. 1 / Drive Assembly</span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy" />
                  Studio Sample
                </span>
              </div>
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-[10px] uppercase tracking-eyebrow text-ink-muted">
                <span>Sheet 1 / 4</span>
                <span>Black line / 0.4pt</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

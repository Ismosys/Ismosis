'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE } from '@/lib/motion';

const PROJECT_TYPES = [
  'Utility Patent',
  'Design Patent',
  'Figure Redrawing',
  'CAD Conversion',
  'Software / UI',
  'Other',
];

const TIMELINE = ['Standard (5 to 7 days)', 'Rush (48 to 72 hours)', 'Flexible'];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [type, setType] = useState(PROJECT_TYPES[0]);
  const [timeline, setTimeline] = useState(TIMELINE[0]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              <div>
                <label htmlFor="name" className="field-label">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="First and last name"
                  className="field-input"
                />
              </div>
              <div>
                <label htmlFor="email" className="field-label">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="name@example.com"
                  className="field-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              <div>
                <label htmlFor="company" className="field-label">
                  Company or Firm
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  placeholder="Optional"
                  className="field-input"
                />
              </div>
              <div>
                <label htmlFor="phone" className="field-label">
                  Phone / WhatsApp
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Optional"
                  className="field-input"
                />
              </div>
            </div>

            <div>
              <span className="field-label">Project Type</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {PROJECT_TYPES.map((p) => {
                  const active = type === p;
                  return (
                    <button
                      type="button"
                      key={p}
                      onClick={() => setType(p)}
                      className={`h-9 px-4 text-[13px] font-medium border transition-all duration-200 ${
                        active
                          ? 'bg-ink text-paper border-ink'
                          : 'bg-paper text-ink-muted border-line-strong hover:text-ink hover:border-ink'
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <span className="field-label">Timeline</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {TIMELINE.map((p) => {
                  const active = timeline === p;
                  return (
                    <button
                      type="button"
                      key={p}
                      onClick={() => setTimeline(p)}
                      className={`h-9 px-4 text-[13px] font-medium border transition-all duration-200 ${
                        active
                          ? 'bg-ink text-paper border-ink'
                          : 'bg-paper text-ink-muted border-line-strong hover:text-ink hover:border-ink'
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label htmlFor="figures" className="field-label">
                Estimated Figure Count
              </label>
              <input
                id="figures"
                name="figures"
                type="text"
                placeholder="Approximate figure count if known"
                className="field-input"
              />
            </div>

            <div>
              <label htmlFor="message" className="field-label">
                Project Details
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Brief description of the invention and what you would like illustrated"
                className="field-textarea"
              />
            </div>

            <div>
              <span className="field-label">Attach File</span>
              <label
                htmlFor="file"
                className="flex items-center justify-between gap-4 border border-dashed border-line-strong p-5 hover:border-ink transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center justify-center h-10 w-10 border border-line-strong text-ink">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                      <path d="M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7.5" />
                      <path d="M16 6l-4-4-4 4" />
                      <line x1="12" y1="2" x2="12" y2="15" />
                    </svg>
                  </span>
                  <div>
                    <div className="text-[14px] font-medium text-ink">
                      {fileName ? fileName : 'Upload sketch, CAD, or PDF'}
                    </div>
                    <div className="text-[12.5px] text-ink-muted mt-0.5">
                      PDF, PNG, JPG, STEP, IGES, SLDPRT up to 25MB
                    </div>
                  </div>
                </div>
                <span className="text-[12px] uppercase tracking-eyebrow text-ink-muted">
                  Browse
                </span>
              </label>
              <input
                id="file"
                name="file"
                type="file"
                className="sr-only"
                onChange={(e) =>
                  setFileName(e.target.files?.[0]?.name ?? null)
                }
              />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
              <button
                type="submit"
                className="btn-primary h-12 px-7"
              >
                Send Request
                <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 7h10M8 3l4 4-4 4" />
                </svg>
              </button>
              <p className="text-[12.5px] text-ink-muted leading-relaxed max-w-sm">
                Submitting this form does not create any attorney client relationship.
                Disclosures shared after an NDA is signed remain confidential.
              </p>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="border border-line p-10 md:p-14 bg-paper-warm tech-corners"
          >
            <div className="eyebrow eyebrow-line">Request Received</div>
            <h2 className="mt-5 font-display text-[28px] md:text-[32px] font-medium text-ink tracking-tightest text-balance">
              Thank you. A reply follows within 24 hours.
            </h2>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-ink-muted text-pretty">
              The request has been logged. Expect a scoped quote with figure count and
              delivery date in the next business day. Larger CAD files can be sent in
              reply to that message.
            </p>
            <div className="mt-8 pt-6 border-t border-line text-[13px] text-ink-muted">
              In the meantime, message{' '}
              <a
                href="mailto:ismaellateef81@gmail.com"
                className="text-ink underline-offset-2 hover:underline"
              >
                ismaellateef81@gmail.com
              </a>{' '}
              with any additional context.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

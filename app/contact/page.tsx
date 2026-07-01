import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import ContactForm from '@/components/ContactForm';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Request a patent illustration quote. Send sketches, CAD files, or written concepts. Replies within 24 hours.',
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Request a quote.
            <br />
            <span className="text-ink-muted">Replies within 24 hours.</span>
          </>
        }
        description="Share sketches, CAD files, or written descriptions. A scoped quote with figure count and delivery date follows within the next business day."
      />

      <section>
        <div className="container-page py-20 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            <Reveal delay={0.1} className="lg:col-span-5">
              <div className="lg:sticky lg:top-28 space-y-10">
                <div>
                  <div className="eyebrow eyebrow-line">Direct</div>
                  <a
                    href="mailto:ismaellateef81@gmail.com"
                    className="mt-4 block font-display text-[22px] md:text-[24px] text-ink tracking-[-0.01em] hover:opacity-60 transition-opacity"
                  >
                    ismaellateef81@gmail.com
                  </a>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink-muted max-w-sm">
                    Attachments up to 25MB by email. Larger CAD files can be sent through
                    any shared drive link.
                  </p>
                </div>

                <div className="pt-8 border-t border-line">
                  <div className="eyebrow eyebrow-line">WhatsApp</div>
                  <a
                    href="https://wa.me/?text=Hello%20Ismosis%2C%20I%20would%20like%20a%20quote%20for%20patent%20illustration%20work."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2.5 h-11 px-5 border border-line-strong text-ink text-[14px] font-medium tracking-[-0.005em] transition-colors hover:border-ink hover:bg-paper-tint"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                    Open WhatsApp chat
                  </a>
                </div>

                <div className="pt-8 border-t border-line">
                  <div className="eyebrow eyebrow-line">Response Time</div>
                  <p className="mt-4 text-[15.5px] leading-relaxed text-ink text-pretty max-w-sm">
                    Replies within 24 hours on business days. Urgent filing requests are
                    acknowledged within the same business day.
                  </p>
                </div>

                <div className="pt-8 border-t border-line">
                  <div className="eyebrow eyebrow-line">Confidentiality</div>
                  <p className="mt-4 text-[14.5px] leading-relaxed text-ink-muted max-w-sm">
                    A mutual non-disclosure agreement is signed before any disclosure
                    material is reviewed. Standard or custom NDAs are accepted.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

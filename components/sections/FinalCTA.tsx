import Link from 'next/link';
import Reveal from '../Reveal';

export default function FinalCTA() {
  return (
    <section className="bg-ink text-paper">
      <div className="container-page py-24 md:py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
          aria-hidden="true"
        />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          <Reveal className="lg:col-span-8">
            <div className="text-[11px] uppercase tracking-eyebrow text-paper/55 flex items-center gap-2">
              <span className="h-px w-6 bg-paper/40" />
              Next Step
            </div>
            <h2 className="mt-6 font-display font-medium text-display-xl text-paper text-balance">
              Ready to prepare your patent drawings?
            </h2>
            <p className="mt-7 max-w-xl text-[16px] md:text-[17px] leading-relaxed text-paper/65 text-pretty">
              Send your sketches, CAD files, or concepts for review. A scoped quote with
              figure count and delivery date follows within 24 hours.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-4 lg:text-right">
            <div className="flex flex-col items-start lg:items-end gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 h-12 px-7 bg-paper text-ink text-[14px] font-medium tracking-[-0.005em] transition-all duration-300 ease-precise hover:bg-paper-tint"
              >
                Request a Quote
                <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 7h10M8 3l4 4-4 4" />
                </svg>
              </Link>
              <a
                href="mailto:ismaellateef81@gmail.com"
                className="text-[14px] text-paper/70 hover:text-paper transition-colors"
              >
                ismaellateef81@gmail.com
              </a>
            </div>
          </Reveal>
        </div>

        <div className="relative mt-20 pt-8 border-t border-paper/15 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { k: 'Response', v: 'Within 24 hours' },
            { k: 'NDA', v: 'Signed on request' },
            { k: 'Delivery', v: '5–7 business days' },
            { k: 'Rush', v: '48–72 hours' },
          ].map((item) => (
            <div key={item.k}>
              <div className="text-[10.5px] uppercase tracking-eyebrow text-paper/45">
                {item.k}
              </div>
              <div className="mt-2 text-[14.5px] text-paper">{item.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

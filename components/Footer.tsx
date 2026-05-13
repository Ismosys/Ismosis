import Link from 'next/link';
import Logo from './Logo';

const SERVICES = [
  { href: '/services#utility', label: 'Utility Patent Drawings' },
  { href: '/services#design', label: 'Design Patent Drawings' },
  { href: '/services#redrawing', label: 'Patent Figure Redrawing' },
  { href: '/services#cad', label: 'CAD to Patent Illustration' },
  { href: '/services#software', label: 'Software and UI Figures' },
  { href: '/services#line-art', label: 'Technical Line Art' },
];

const COMPANY = [
  { href: '/about', label: 'About' },
  { href: '/process', label: 'Process' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-paper">
      <div className="container-page py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Logo className="h-6 w-auto text-ink" />
              <span className="font-display text-[18px] tracking-tight font-medium text-ink">
                Ismosis
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-[14.5px] leading-relaxed text-ink-muted">
              Patent illustration studio preparing USPTO compliant drawings for inventors,
              engineers, and patent professionals.
            </p>
            <div className="mt-8 flex flex-col gap-2">
              <span className="eyebrow eyebrow-line">Direct</span>
              <a
                href="mailto:ismaellateef81@gmail.com"
                className="text-[15px] text-ink hover:opacity-60 transition-opacity"
              >
                ismaellateef81@gmail.com
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-[11px] uppercase tracking-eyebrow text-ink-muted font-medium">
              Services
            </h3>
            <ul className="mt-5 space-y-3">
              {SERVICES.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[14px] text-ink hover:text-ink-muted transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-[11px] uppercase tracking-eyebrow text-ink-muted font-medium">
              Studio
            </h3>
            <ul className="mt-5 space-y-3">
              {COMPANY.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[14px] text-ink hover:text-ink-muted transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-[11px] uppercase tracking-eyebrow text-ink-muted font-medium">
              Begin
            </h3>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-ink hover:opacity-60 transition-opacity"
            >
              Request a quote
              <svg viewBox="0 0 14 14" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 7h10M8 3l4 4-4 4" />
              </svg>
            </Link>
            <p className="mt-4 text-[13px] text-ink-muted leading-relaxed">
              Replies within 24 hours.
            </p>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-line flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[12.5px] text-ink-muted">
            &copy; {year} Ismosis. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[12px] uppercase tracking-eyebrow text-ink-muted">
            <span>USPTO Compliant</span>
            <span className="hidden md:inline h-3 w-px bg-line-strong" />
            <span>Confidential Handling</span>
            <span className="hidden md:inline h-3 w-px bg-line-strong" />
            <span>NDA Available</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

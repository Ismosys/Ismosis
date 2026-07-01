'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Logo from './Logo';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/process', label: 'Process' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 bg-paper/85 backdrop-blur-md transition-[border,background] duration-300 ${
        scrolled ? 'border-b border-line' : 'border-b border-transparent'
      }`}
    >
      <div className="container-page flex h-16 md:h-[72px] items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group focus-ring" aria-label="Ismosis home">
          <Logo className="h-[22px] w-auto text-ink" />
          <span className="font-display text-[16px] tracking-tight font-medium text-ink">
            Ismosis
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3.5 py-2 text-[13.5px] font-medium tracking-[-0.005em] transition-colors duration-200 focus-ring ${
                  active ? 'text-ink' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute left-3.5 right-3.5 -bottom-[18px] h-px bg-navy hidden lg:block" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/contact" className="btn-primary hidden sm:inline-flex">
            Request Quote
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center h-10 w-10 -mr-2 text-ink focus-ring"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <div className="relative w-5 h-3">
              <span
                className={`absolute left-0 right-0 h-px bg-current transition-transform duration-300 ease-precise ${
                  open ? 'top-1.5 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 right-0 h-px bg-current transition-transform duration-300 ease-precise ${
                  open ? 'top-1.5 -rotate-45' : 'top-3'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden overflow-hidden border-t border-line transition-[max-height,opacity] duration-300 ease-precise ${
          open ? 'max-h-[480px] opacity-100' : 'max-h-0 opacity-0 border-transparent'
        }`}
      >
        <div className="container-page py-4">
          <nav className="flex flex-col">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between py-3.5 border-b border-line-soft last:border-b-0 text-[15px] focus-ring ${
                    active ? 'text-ink font-medium' : 'text-ink-muted'
                  }`}
                >
                  {item.label}
                  <ArrowRight className="h-3.5 w-3.5 opacity-50" />
                </Link>
              );
            })}
          </nav>
          <Link href="/contact" className="btn-primary w-full mt-5">
            Request Quote
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

function ArrowRight({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
    >
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  );
}

type IconProps = { className?: string };

export function IconUtility({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.1" className={className} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="6" y="6" width="20" height="20" />
      <line x1="6" y1="12" x2="26" y2="12" opacity="0.5" />
      <line x1="12" y1="6" x2="12" y2="26" opacity="0.5" />
      <circle cx="19" cy="19" r="4" />
      <line x1="19" y1="15" x2="19" y2="23" strokeDasharray="1.5 2" opacity="0.55" />
    </svg>
  );
}

export function IconDesign({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.1" className={className} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 5 L27 16 L16 27 L5 16 Z" />
      <path d="M16 9 L23 16 L16 23 L9 16 Z" opacity="0.6" />
      <circle cx="16" cy="16" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconRedraw({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.1" className={className} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 16a9 9 0 1 1 3 6.7" />
      <path d="M5 22 L10 22 L10 17" />
      <line x1="16" y1="12" x2="16" y2="20" opacity="0.55" />
      <line x1="12" y1="16" x2="20" y2="16" opacity="0.55" />
    </svg>
  );
}

export function IconCAD({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.1" className={className} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 6 L26 11 L26 21 L16 26 L6 21 L6 11 Z" />
      <path d="M16 6 L16 16 L26 11" opacity="0.55" />
      <path d="M16 16 L6 11 M16 16 L16 26" opacity="0.55" />
    </svg>
  );
}

export function IconSoftware({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.1" className={className} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="8" y="4" width="16" height="24" rx="2" />
      <line x1="8" y1="8" x2="24" y2="8" opacity="0.55" />
      <line x1="8" y1="24" x2="24" y2="24" opacity="0.55" />
      <rect x="11" y="11" width="10" height="3" opacity="0.55" />
      <rect x="11" y="16" width="7" height="2" opacity="0.45" />
      <rect x="11" y="20" width="10" height="2" opacity="0.45" />
    </svg>
  );
}

export function IconLineArt({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.1" className={className} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 22 C 10 8, 14 28, 20 14 S 28 10, 28 10" />
      <line x1="4" y1="26" x2="28" y2="26" opacity="0.45" strokeDasharray="1.5 2" />
      <circle cx="10" cy="14" r="1" fill="currentColor" stroke="none" opacity="0.7" />
      <circle cx="20" cy="14" r="1" fill="currentColor" stroke="none" opacity="0.7" />
    </svg>
  );
}

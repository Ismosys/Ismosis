export default function MobileUI({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 320"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Two phone screens for UI patent */}
      <g transform="translate(96 30)">
        {/* Phone frame 1 */}
        <rect x="0" y="0" width="96" height="200" rx="12" strokeWidth="1.1" />
        <rect x="6" y="20" width="84" height="170" strokeWidth="0.7" opacity="0.7" />

        {/* Notch */}
        <rect x="36" y="6" width="24" height="6" rx="3" strokeWidth="0.7" />

        {/* Status bar */}
        <line x1="14" y1="28" x2="36" y2="28" strokeWidth="0.5" opacity="0.6" />
        <rect x="74" y="24" width="8" height="6" strokeWidth="0.5" opacity="0.6" />

        {/* Header */}
        <rect x="14" y="36" width="40" height="6" strokeWidth="0.5" opacity="0.7" />
        <rect x="14" y="46" width="28" height="3" strokeWidth="0.4" opacity="0.5" />

        {/* Search bar */}
        <rect x="14" y="58" width="68" height="10" rx="2" strokeWidth="0.6" />

        {/* Content rows */}
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(14 ${78 + i * 28})`}>
            <rect x="0" y="0" width="20" height="20" rx="2" strokeWidth="0.6" />
            <rect x="24" y="3" width="38" height="4" strokeWidth="0.4" opacity="0.6" />
            <rect x="24" y="11" width="28" height="3" strokeWidth="0.4" opacity="0.45" />
          </g>
        ))}

        {/* Tab bar */}
        <line x1="6" y1="170" x2="90" y2="170" strokeWidth="0.5" opacity="0.5" />
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={18 + i * 20} cy={180} r="3" strokeWidth="0.5" opacity="0.65" />
        ))}

        {/* Home indicator */}
        <line x1="36" y1="194" x2="60" y2="194" strokeWidth="0.6" opacity="0.5" />
      </g>

      <g transform="translate(216 30)">
        {/* Phone frame 2 - detail view */}
        <rect x="0" y="0" width="96" height="200" rx="12" strokeWidth="1.1" />
        <rect x="6" y="20" width="84" height="170" strokeWidth="0.7" opacity="0.7" />

        <rect x="36" y="6" width="24" height="6" rx="3" strokeWidth="0.7" />

        {/* Back arrow */}
        <path d="M 14 28 L 18 24 L 18 32 Z" strokeWidth="0.6" />

        {/* Hero image */}
        <rect x="14" y="38" width="68" height="44" strokeWidth="0.7" />
        <line x1="14" y1="60" x2="82" y2="60" strokeWidth="0.4" opacity="0.45" />
        <circle cx="48" cy="60" r="8" strokeWidth="0.5" opacity="0.6" />

        {/* Title block */}
        <rect x="14" y="90" width="50" height="6" strokeWidth="0.5" opacity="0.7" />
        <rect x="14" y="100" width="68" height="3" strokeWidth="0.4" opacity="0.5" />
        <rect x="14" y="106" width="60" height="3" strokeWidth="0.4" opacity="0.5" />
        <rect x="14" y="112" width="64" height="3" strokeWidth="0.4" opacity="0.5" />

        {/* Action buttons */}
        <rect x="14" y="128" width="32" height="12" rx="6" strokeWidth="0.6" />
        <rect x="50" y="128" width="32" height="12" rx="6" strokeWidth="0.5" opacity="0.6" />

        {/* Secondary content */}
        <rect x="14" y="148" width="68" height="16" strokeWidth="0.6" opacity="0.7" />

        <line x1="36" y1="194" x2="60" y2="194" strokeWidth="0.6" opacity="0.5" />
      </g>

      {/* Connection arrow between screens */}
      <g stroke="currentColor" strokeWidth="0.7" opacity="0.6">
        <line x1="196" y1="130" x2="212" y2="130" />
        <path d="M 208 126 L 212 130 L 208 134" />
      </g>

      <g fontFamily="ui-monospace, monospace" fontSize="9" fill="currentColor" stroke="none" opacity="0.65">
        <text x="124" y="252">FIG. 5A</text>
        <text x="244" y="252">FIG. 5B</text>
      </g>
    </svg>
  );
}

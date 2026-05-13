export default function Electronics({ className = '' }: { className?: string }) {
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
      {/* PCB outline */}
      <g transform="translate(60 60)">
        <rect x="0" y="0" width="280" height="200" rx="4" strokeWidth="1.1" />

        {/* Mounting holes */}
        <circle cx="12" cy="12" r="4" strokeWidth="0.8" />
        <circle cx="268" cy="12" r="4" strokeWidth="0.8" />
        <circle cx="12" cy="188" r="4" strokeWidth="0.8" />
        <circle cx="268" cy="188" r="4" strokeWidth="0.8" />
        <circle cx="12" cy="12" r="1.5" strokeWidth="0.6" />
        <circle cx="268" cy="12" r="1.5" strokeWidth="0.6" />
        <circle cx="12" cy="188" r="1.5" strokeWidth="0.6" />
        <circle cx="268" cy="188" r="1.5" strokeWidth="0.6" />

        {/* SoC chip */}
        <rect x="100" y="60" width="80" height="80" strokeWidth="1.1" />
        <rect x="106" y="66" width="68" height="68" strokeWidth="0.7" opacity="0.6" />
        <circle cx="112" cy="72" r="1.5" strokeWidth="0.6" />
        {/* Chip pins */}
        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={`top-${i}`}
            x1={106 + i * 7}
            y1={60}
            x2={106 + i * 7}
            y2={56}
            strokeWidth="0.6"
          />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={`bot-${i}`}
            x1={106 + i * 7}
            y1={140}
            x2={106 + i * 7}
            y2={144}
            strokeWidth="0.6"
          />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={`l-${i}`}
            x1={100}
            y1={66 + i * 7}
            x2={96}
            y2={66 + i * 7}
            strokeWidth="0.6"
          />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={`r-${i}`}
            x1={180}
            y1={66 + i * 7}
            x2={184}
            y2={66 + i * 7}
            strokeWidth="0.6"
          />
        ))}

        {/* Capacitors */}
        <circle cx="40" cy="50" r="8" strokeWidth="0.9" />
        <circle cx="40" cy="50" r="4" strokeWidth="0.6" opacity="0.6" />
        <circle cx="60" cy="50" r="8" strokeWidth="0.9" />
        <circle cx="60" cy="50" r="4" strokeWidth="0.6" opacity="0.6" />

        {/* Crystal oscillator */}
        <rect x="36" y="160" width="36" height="14" rx="1" strokeWidth="0.9" />

        {/* Resistors */}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} transform={`translate(${214 + i * 12} 50)`}>
            <rect x="-4" y="-2" width="8" height="4" strokeWidth="0.7" />
            <line x1="-7" y1="0" x2="-4" y2="0" strokeWidth="0.6" />
            <line x1="4" y1="0" x2="7" y2="0" strokeWidth="0.6" />
          </g>
        ))}

        {/* Connector */}
        <rect x="210" y="150" width="56" height="24" strokeWidth="0.9" />
        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={`c-${i}`}
            x1={214 + i * 5}
            y1={150}
            x2={214 + i * 5}
            y2={174}
            strokeWidth="0.5"
            opacity="0.6"
          />
        ))}

        {/* Traces */}
        <path d="M 96 80 L 80 80 L 80 50 L 32 50" strokeWidth="0.5" opacity="0.5" />
        <path d="M 184 100 L 210 100 L 210 162" strokeWidth="0.5" opacity="0.5" />
        <path d="M 140 144 L 140 168 L 80 168" strokeWidth="0.5" opacity="0.5" />
        <path d="M 184 120 L 200 120 L 200 50 L 210 50" strokeWidth="0.5" opacity="0.5" />
      </g>

      <g fontFamily="ui-monospace, monospace" fontSize="9" fill="currentColor" stroke="none" opacity="0.6">
        <text x="40" y="44">FIG. 4</text>
      </g>
    </svg>
  );
}

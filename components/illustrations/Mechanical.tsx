export default function Mechanical({ className = '' }: { className?: string }) {
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
      {/* Gear assembly */}
      <g transform="translate(160 160)">
        {/* Outer gear teeth */}
        {Array.from({ length: 18 }).map((_, i) => {
          const angle = (i / 18) * Math.PI * 2;
          const x1 = Math.cos(angle) * 78;
          const y1 = Math.sin(angle) * 78;
          const x2 = Math.cos(angle) * 92;
          const y2 = Math.sin(angle) * 92;
          const a2 = ((i + 0.5) / 18) * Math.PI * 2;
          const x3 = Math.cos(a2) * 92;
          const y3 = Math.sin(a2) * 92;
          const x4 = Math.cos(a2) * 78;
          const y4 = Math.sin(a2) * 78;
          return (
            <path
              key={i}
              d={`M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4}`}
              strokeWidth="0.9"
            />
          );
        })}
        <circle r="78" strokeWidth="0.9" />
        <circle r="60" strokeWidth="0.7" />
        <circle r="20" strokeWidth="0.9" />
        <circle r="8" strokeWidth="0.7" />

        {/* Spokes */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i / 6) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={Math.cos(angle) * 20}
              y1={Math.sin(angle) * 20}
              x2={Math.cos(angle) * 60}
              y2={Math.sin(angle) * 60}
              strokeWidth="0.7"
              opacity="0.85"
            />
          );
        })}

        {/* Center cross */}
        <line x1="-4" y1="0" x2="4" y2="0" strokeWidth="0.6" />
        <line x1="0" y1="-4" x2="0" y2="4" strokeWidth="0.6" />
      </g>

      {/* Pinion gear */}
      <g transform="translate(310 160)">
        {Array.from({ length: 10 }).map((_, i) => {
          const angle = (i / 10) * Math.PI * 2;
          const x1 = Math.cos(angle) * 28;
          const y1 = Math.sin(angle) * 28;
          const x2 = Math.cos(angle) * 36;
          const y2 = Math.sin(angle) * 36;
          const a2 = ((i + 0.5) / 10) * Math.PI * 2;
          const x3 = Math.cos(a2) * 36;
          const y3 = Math.sin(a2) * 36;
          const x4 = Math.cos(a2) * 28;
          const y4 = Math.sin(a2) * 28;
          return (
            <path
              key={i}
              d={`M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4}`}
              strokeWidth="0.9"
            />
          );
        })}
        <circle r="28" strokeWidth="0.9" />
        <circle r="6" strokeWidth="0.7" />
      </g>

      {/* Bracket */}
      <g stroke="currentColor" strokeWidth="0.9">
        <rect x="40" y="60" width="20" height="200" />
        <line x1="40" y1="80" x2="60" y2="80" strokeWidth="0.6" />
        <line x1="40" y1="240" x2="60" y2="240" strokeWidth="0.6" />
        <circle cx="50" cy="80" r="4" strokeWidth="0.7" />
        <circle cx="50" cy="240" r="4" strokeWidth="0.7" />
      </g>

      {/* Connecting lines (centerlines) */}
      <line x1="60" y1="160" x2="160" y2="160" strokeWidth="0.6" strokeDasharray="6 3 1 3" opacity="0.55" />
      <line x1="160" y1="160" x2="310" y2="160" strokeWidth="0.6" strokeDasharray="6 3 1 3" opacity="0.55" />

      {/* Labels */}
      <g fontFamily="ui-monospace, monospace" fontSize="9" fill="currentColor" stroke="none" opacity="0.85">
        <text x="148" y="74">24</text>
        <text x="304" y="116">26</text>
        <text x="32" y="50">28</text>
      </g>
      <g stroke="currentColor" strokeWidth="0.6" opacity="0.85">
        <line x1="158" y1="84" x2="172" y2="100" />
        <line x1="312" y1="120" x2="306" y2="138" />
        <line x1="44" y1="56" x2="48" y2="62" />
      </g>
    </svg>
  );
}

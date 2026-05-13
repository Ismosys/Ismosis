export default function ConsumerProduct({ className = '' }: { className?: string }) {
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
      {/* Earbud / wireless device */}
      <g transform="translate(200 160)">
        {/* Main body */}
        <path
          d="M -60 -60 Q -85 -55 -88 -20 Q -90 25 -65 50 Q -40 70 -10 65 Q 20 60 30 35 L 30 -20 Q 28 -55 0 -65 Q -30 -70 -60 -60 Z"
          strokeWidth="1.1"
        />
        {/* Inner detail */}
        <path
          d="M -55 -50 Q -76 -45 -78 -15 Q -80 22 -58 44 Q -38 60 -14 56 Q 12 52 22 32 L 22 -18 Q 20 -48 -2 -56 Q -28 -60 -55 -50 Z"
          strokeWidth="0.7"
          opacity="0.55"
        />
        {/* Speaker mesh */}
        <ellipse cx="-30" cy="0" rx="24" ry="28" strokeWidth="0.8" />
        <ellipse cx="-30" cy="0" rx="14" ry="18" strokeWidth="0.7" opacity="0.7" />

        {/* Mesh dots */}
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 4 }).map((_, col) => {
            const x = -42 + col * 8;
            const y = -16 + row * 8;
            const dx = x + 30;
            const dy = y;
            if (dx * dx / 200 + dy * dy / 280 > 1) return null;
            return (
              <circle
                key={`${row}-${col}`}
                cx={x}
                cy={y}
                r="0.8"
                fill="currentColor"
                stroke="none"
                opacity="0.6"
              />
            );
          })
        )}

        {/* Status LED */}
        <circle cx="14" cy="-40" r="2.5" strokeWidth="0.7" />

        {/* Bottom stem */}
        <path
          d="M -10 65 Q -8 110 -22 130 Q -34 144 -52 142 Q -68 138 -68 122 L -68 90 Q -64 70 -50 66 Z"
          strokeWidth="1.1"
        />
        <path
          d="M -16 92 Q -22 110 -34 122 Q -46 128 -56 124 Q -62 118 -60 108"
          strokeWidth="0.7"
          opacity="0.5"
        />

        {/* Contact pads */}
        <rect x="-58" y="124" width="6" height="2" strokeWidth="0.7" />
        <rect x="-58" y="130" width="6" height="2" strokeWidth="0.7" />
      </g>

      {/* Label */}
      <g fontFamily="ui-monospace, monospace" fontSize="9" fill="currentColor" stroke="none" opacity="0.7">
        <text x="40" y="44">FIG. 2A</text>
      </g>
      <g stroke="currentColor" strokeWidth="0.6" opacity="0.6">
        <line x1="68" y1="296" x2="332" y2="296" strokeDasharray="0 0" />
      </g>
    </svg>
  );
}

export default function Hinge({ className = '' }: { className?: string }) {
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
      {/* Hinge mechanism - perspective */}
      <g transform="translate(200 160)">
        {/* Plate A */}
        <path d="M -130 -20 L -20 -40 L -20 20 L -130 40 Z" strokeWidth="1.1" />
        <path d="M -125 -16 L -25 -34 L -25 -28 L -125 -10 Z" strokeWidth="0.6" opacity="0.5" />

        {/* Knuckles on plate A */}
        <ellipse cx="-22" cy="-30" rx="6" ry="14" strokeWidth="0.9" />
        <ellipse cx="-22" cy="10" rx="6" ry="14" strokeWidth="0.9" />

        {/* Plate B */}
        <path d="M 20 -40 L 130 -20 L 130 40 L 20 20 Z" strokeWidth="1.1" />
        <path d="M 25 -34 L 125 -16 L 125 -10 L 25 -28 Z" strokeWidth="0.6" opacity="0.5" />

        {/* Knuckles on plate B */}
        <ellipse cx="22" cy="-30" rx="6" ry="14" strokeWidth="0.9" />
        <ellipse cx="22" cy="10" rx="6" ry="14" strokeWidth="0.9" />

        {/* Center barrel */}
        <ellipse cx="0" cy="-35" rx="8" ry="6" strokeWidth="1" />
        <ellipse cx="0" cy="15" rx="8" ry="6" strokeWidth="1" />
        <line x1="-8" y1="-35" x2="-8" y2="15" strokeWidth="1" />
        <line x1="8" y1="-35" x2="8" y2="15" strokeWidth="1" />

        {/* Pin */}
        <line x1="0" y1="-46" x2="0" y2="26" strokeWidth="0.7" strokeDasharray="4 2" opacity="0.55" />
        <circle cx="0" cy="-46" r="3" strokeWidth="0.8" />
        <circle cx="0" cy="26" r="3" strokeWidth="0.8" />

        {/* Screw holes plate A */}
        <circle cx="-100" cy="-12" r="4" strokeWidth="0.7" />
        <circle cx="-100" cy="-12" r="1.5" strokeWidth="0.5" />
        <circle cx="-60" cy="-22" r="4" strokeWidth="0.7" />
        <circle cx="-60" cy="-22" r="1.5" strokeWidth="0.5" />
        <circle cx="-100" cy="12" r="4" strokeWidth="0.7" />
        <circle cx="-100" cy="12" r="1.5" strokeWidth="0.5" />
        <circle cx="-60" cy="22" r="4" strokeWidth="0.7" />
        <circle cx="-60" cy="22" r="1.5" strokeWidth="0.5" />

        {/* Screw holes plate B */}
        <circle cx="100" cy="-12" r="4" strokeWidth="0.7" />
        <circle cx="100" cy="-12" r="1.5" strokeWidth="0.5" />
        <circle cx="60" cy="-22" r="4" strokeWidth="0.7" />
        <circle cx="60" cy="-22" r="1.5" strokeWidth="0.5" />
        <circle cx="100" cy="12" r="4" strokeWidth="0.7" />
        <circle cx="100" cy="12" r="1.5" strokeWidth="0.5" />
        <circle cx="60" cy="22" r="4" strokeWidth="0.7" />
        <circle cx="60" cy="22" r="1.5" strokeWidth="0.5" />
      </g>

      <g fontFamily="ui-monospace, monospace" fontSize="9" fill="currentColor" stroke="none" opacity="0.6">
        <text x="40" y="44">FIG. 7</text>
      </g>
    </svg>
  );
}

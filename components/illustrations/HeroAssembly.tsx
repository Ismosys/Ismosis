export default function HeroAssembly({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 720 640"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Figure label */}
      <g fontFamily="ui-monospace, monospace" fontSize="11" fill="currentColor" stroke="none" letterSpacing="0.05em">
        <text x="40" y="56">FIG. 1</text>
        <text x="40" y="72" opacity="0.5">SHEET 1 OF 4</text>
      </g>

      {/* Subtle border */}
      <rect x="32" y="32" width="656" height="576" stroke="currentColor" strokeWidth="0.6" opacity="0.2" />

      {/* Drive housing - main body */}
      <g transform="translate(360 330)">
        {/* Cylindrical housing - perspective ellipses */}
        <ellipse cx="0" cy="-110" rx="150" ry="40" stroke="currentColor" strokeWidth="1.2" />
        <ellipse cx="0" cy="-110" rx="150" ry="40" strokeDasharray="2 3" opacity="0.35" />

        <line x1="-150" y1="-110" x2="-150" y2="110" strokeWidth="1.2" />
        <line x1="150" y1="-110" x2="150" y2="110" strokeWidth="1.2" />

        <ellipse cx="0" cy="110" rx="150" ry="40" strokeWidth="1.2" />

        {/* Inner ring detail */}
        <ellipse cx="0" cy="-110" rx="118" ry="31" strokeWidth="0.8" opacity="0.8" />
        <ellipse cx="0" cy="-110" rx="118" ry="31" strokeDasharray="2 3" opacity="0.25" />
        <ellipse cx="0" cy="-110" rx="92" ry="24" strokeWidth="0.8" opacity="0.7" />

        {/* Central shaft */}
        <ellipse cx="0" cy="-110" rx="14" ry="4" strokeWidth="0.9" />
        <line x1="-14" y1="-110" x2="-14" y2="120" strokeWidth="0.9" />
        <line x1="14" y1="-110" x2="14" y2="120" strokeWidth="0.9" />
        <ellipse cx="0" cy="120" rx="14" ry="4" strokeWidth="0.9" />

        {/* Surface texture lines */}
        {Array.from({ length: 14 }).map((_, i) => {
          const angle = (i / 14) * Math.PI;
          const x = Math.cos(angle) * 150;
          const opacity = 0.18 + Math.abs(Math.sin(angle)) * 0.25;
          return (
            <line
              key={i}
              x1={x}
              y1={-110}
              x2={x}
              y2={110}
              strokeWidth="0.6"
              opacity={opacity}
            />
          );
        })}

        {/* Mounting flange */}
        <ellipse cx="0" cy="115" rx="170" ry="46" strokeWidth="1.1" />
        <ellipse cx="0" cy="115" rx="170" ry="46" strokeDasharray="2 3" opacity="0.25" />
        <ellipse cx="0" cy="115" rx="160" ry="42" strokeWidth="0.7" opacity="0.6" />

        {/* Bolt circles */}
        {[-130, -65, 0, 65, 130].map((x, i) => (
          <g key={i}>
            <ellipse cx={x} cy="118" rx="6" ry="2" strokeWidth="0.7" />
            <ellipse cx={x} cy="118" rx="2.5" ry="0.9" fill="currentColor" stroke="none" opacity="0.6" />
          </g>
        ))}

        {/* Top cap detail */}
        <ellipse cx="0" cy="-130" rx="60" ry="16" strokeWidth="0.9" />
        <line x1="-60" y1="-130" x2="-60" y2="-110" strokeWidth="0.9" />
        <line x1="60" y1="-130" x2="60" y2="-110" strokeWidth="0.9" />
      </g>

      {/* Callout: 12 - Top cap */}
      <g fontFamily="ui-monospace, monospace" fontSize="11" fill="currentColor" stroke="none">
        <text x="528" y="178">12</text>
      </g>
      <g stroke="currentColor" strokeWidth="0.7">
        <line x1="378" y1="194" x2="520" y2="180" />
        <circle cx="378" cy="194" r="2" fill="currentColor" stroke="none" />
      </g>

      {/* Callout: 14 - Cylindrical housing */}
      <g fontFamily="ui-monospace, monospace" fontSize="11" fill="currentColor" stroke="none">
        <text x="556" y="290">14</text>
      </g>
      <g stroke="currentColor" strokeWidth="0.7">
        <line x1="468" y1="280" x2="548" y2="286" />
        <circle cx="468" cy="280" r="2" fill="currentColor" stroke="none" />
      </g>

      {/* Callout: 16 - Inner ring */}
      <g fontFamily="ui-monospace, monospace" fontSize="11" fill="currentColor" stroke="none">
        <text x="116" y="226">16</text>
      </g>
      <g stroke="currentColor" strokeWidth="0.7">
        <line x1="140" y1="222" x2="252" y2="232" />
        <circle cx="252" cy="232" r="2" fill="currentColor" stroke="none" />
      </g>

      {/* Callout: 18 - Drive shaft */}
      <g fontFamily="ui-monospace, monospace" fontSize="11" fill="currentColor" stroke="none">
        <text x="110" y="340">18</text>
      </g>
      <g stroke="currentColor" strokeWidth="0.7">
        <line x1="136" y1="336" x2="346" y2="336" />
        <circle cx="346" cy="336" r="2" fill="currentColor" stroke="none" />
      </g>

      {/* Callout: 20 - Mounting flange */}
      <g fontFamily="ui-monospace, monospace" fontSize="11" fill="currentColor" stroke="none">
        <text x="548" y="466">20</text>
      </g>
      <g stroke="currentColor" strokeWidth="0.7">
        <line x1="500" y1="450" x2="540" y2="462" />
        <circle cx="500" cy="450" r="2" fill="currentColor" stroke="none" />
      </g>

      {/* Callout: 22 - Bolts */}
      <g fontFamily="ui-monospace, monospace" fontSize="11" fill="currentColor" stroke="none">
        <text x="170" y="500">22</text>
      </g>
      <g stroke="currentColor" strokeWidth="0.7">
        <line x1="200" y1="496" x2="298" y2="452" />
        <circle cx="298" cy="452" r="2" fill="currentColor" stroke="none" />
      </g>

      {/* Scale + reference marks */}
      <g stroke="currentColor" strokeWidth="0.6" opacity="0.5">
        <line x1="56" y1="572" x2="120" y2="572" />
        <line x1="56" y1="568" x2="56" y2="576" />
        <line x1="120" y1="568" x2="120" y2="576" />
      </g>
      <g fontFamily="ui-monospace, monospace" fontSize="10" fill="currentColor" stroke="none" opacity="0.6">
        <text x="56" y="592">SCALE 1:2</text>
      </g>

      <g fontFamily="ui-monospace, monospace" fontSize="10" fill="currentColor" stroke="none" opacity="0.6">
        <text x="556" y="592">ISMOSIS / 0001</text>
      </g>
    </svg>
  );
}

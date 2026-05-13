export default function ExplodedView({ className = '' }: { className?: string }) {
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
      {/* Exploded assembly stacked along an axis */}
      <g transform="translate(200 60)">
        {/* Top cap */}
        <ellipse cx="0" cy="0" rx="50" ry="12" strokeWidth="1.1" />
        <ellipse cx="0" cy="0" rx="50" ry="12" strokeDasharray="2 3" opacity="0.3" />
        <line x1="-50" y1="0" x2="-50" y2="10" strokeWidth="1.1" />
        <line x1="50" y1="0" x2="50" y2="10" strokeWidth="1.1" />
        <ellipse cx="0" cy="10" rx="50" ry="12" strokeWidth="1.1" />
      </g>

      <g transform="translate(200 110)">
        {/* Gasket / O-ring */}
        <ellipse cx="0" cy="0" rx="56" ry="8" strokeWidth="0.9" />
        <ellipse cx="0" cy="0" rx="56" ry="8" strokeDasharray="2 3" opacity="0.3" />
        <ellipse cx="0" cy="0" rx="44" ry="6" strokeWidth="0.7" opacity="0.6" />
      </g>

      <g transform="translate(200 160)">
        {/* Main body cylinder */}
        <ellipse cx="0" cy="0" rx="62" ry="14" strokeWidth="1.1" />
        <ellipse cx="0" cy="0" rx="62" ry="14" strokeDasharray="2 3" opacity="0.3" />
        <line x1="-62" y1="0" x2="-62" y2="46" strokeWidth="1.1" />
        <line x1="62" y1="0" x2="62" y2="46" strokeWidth="1.1" />
        <ellipse cx="0" cy="46" rx="62" ry="14" strokeWidth="1.1" />
        <ellipse cx="0" cy="46" rx="46" ry="10" strokeWidth="0.7" opacity="0.6" />
        {/* Threading */}
        {Array.from({ length: 5 }).map((_, i) => (
          <ellipse
            key={i}
            cx="0"
            cy={6 + i * 8}
            rx={62 - i * 0.4}
            ry={14 - i * 0.1}
            strokeWidth="0.4"
            opacity="0.25"
            strokeDasharray="3 60"
          />
        ))}
      </g>

      <g transform="translate(200 246)">
        {/* Internal piston */}
        <ellipse cx="0" cy="0" rx="40" ry="9" strokeWidth="1" />
        <line x1="-40" y1="0" x2="-40" y2="22" strokeWidth="1" />
        <line x1="40" y1="0" x2="40" y2="22" strokeWidth="1" />
        <ellipse cx="0" cy="22" rx="40" ry="9" strokeWidth="1" />
        <ellipse cx="0" cy="22" rx="28" ry="6" strokeWidth="0.7" opacity="0.6" />
      </g>

      <g transform="translate(200 290)">
        {/* Bottom plate */}
        <ellipse cx="0" cy="0" rx="68" ry="14" strokeWidth="1.1" />
        <ellipse cx="0" cy="0" rx="68" ry="14" strokeDasharray="2 3" opacity="0.3" />
        <ellipse cx="0" cy="0" rx="54" ry="10" strokeWidth="0.7" opacity="0.6" />
      </g>

      {/* Center alignment axis */}
      <line
        x1="200"
        y1="20"
        x2="200"
        y2="310"
        strokeWidth="0.5"
        strokeDasharray="4 3 1 3"
        opacity="0.5"
      />

      {/* Side callouts with numbers */}
      <g fontFamily="ui-monospace, monospace" fontSize="9" fill="currentColor" stroke="none" opacity="0.85">
        <text x="296" y="64">40</text>
        <text x="306" y="114">42</text>
        <text x="316" y="180">44</text>
        <text x="296" y="258">46</text>
        <text x="320" y="294">48</text>
      </g>
      <g stroke="currentColor" strokeWidth="0.55" opacity="0.55">
        <line x1="252" y1="60" x2="290" y2="60" />
        <line x1="258" y1="110" x2="302" y2="110" />
        <line x1="264" y1="176" x2="312" y2="176" />
        <line x1="242" y1="254" x2="290" y2="254" />
        <line x1="270" y1="290" x2="316" y2="290" />
      </g>

      <g fontFamily="ui-monospace, monospace" fontSize="9" fill="currentColor" stroke="none" opacity="0.6">
        <text x="40" y="44">FIG. 6</text>
        <text x="40" y="296">EXPLODED VIEW</text>
      </g>
    </svg>
  );
}

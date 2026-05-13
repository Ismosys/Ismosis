export default function Medical({ className = '' }: { className?: string }) {
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
      {/* Auto-injector / pen device */}
      <g transform="translate(200 160) rotate(-20)">
        {/* Cap */}
        <rect x="-110" y="-22" width="48" height="44" rx="2" strokeWidth="1.1" />
        <line x1="-100" y1="-22" x2="-100" y2="22" strokeWidth="0.6" opacity="0.5" />
        <line x1="-90" y1="-22" x2="-90" y2="22" strokeWidth="0.6" opacity="0.5" />
        <line x1="-80" y1="-22" x2="-80" y2="22" strokeWidth="0.6" opacity="0.5" />
        <line x1="-70" y1="-22" x2="-70" y2="22" strokeWidth="0.6" opacity="0.5" />

        {/* Main barrel */}
        <rect x="-62" y="-26" width="120" height="52" rx="3" strokeWidth="1.1" />

        {/* Viewing window */}
        <rect x="-30" y="-12" width="40" height="24" strokeWidth="0.9" />
        <line x1="-30" y1="-6" x2="10" y2="-6" strokeWidth="0.6" opacity="0.5" />
        <line x1="-30" y1="0" x2="10" y2="0" strokeWidth="0.6" opacity="0.5" />
        <line x1="-30" y1="6" x2="10" y2="6" strokeWidth="0.6" opacity="0.5" />

        {/* Activation button area */}
        <rect x="58" y="-26" width="48" height="52" rx="3" strokeWidth="1.1" />
        <circle cx="82" cy="0" r="14" strokeWidth="0.9" />
        <circle cx="82" cy="0" r="8" strokeWidth="0.7" opacity="0.7" />
        <circle cx="82" cy="0" r="2" fill="currentColor" stroke="none" opacity="0.7" />

        {/* Grip texture */}
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={i}
            x1={20 + i * 5}
            y1={-22}
            x2={20 + i * 5}
            y2={22}
            strokeWidth="0.5"
            opacity="0.4"
          />
        ))}

        {/* Needle housing */}
        <rect x="106" y="-12" width="22" height="24" rx="2" strokeWidth="1.1" />
        <line x1="128" y1="-6" x2="156" y2="-2" strokeWidth="0.9" />
        <line x1="128" y1="6" x2="156" y2="2" strokeWidth="0.9" />
      </g>

      {/* Callouts */}
      <g fontFamily="ui-monospace, monospace" fontSize="9" fill="currentColor" stroke="none" opacity="0.85">
        <text x="56" y="76">32</text>
        <text x="276" y="80">34</text>
        <text x="46" y="262">36</text>
      </g>
      <g stroke="currentColor" strokeWidth="0.6" opacity="0.65">
        <line x1="68" y1="82" x2="120" y2="124" />
        <line x1="284" y1="86" x2="266" y2="118" />
        <line x1="58" y1="266" x2="148" y2="218" />
      </g>

      <g fontFamily="ui-monospace, monospace" fontSize="9" fill="currentColor" stroke="none" opacity="0.6">
        <text x="40" y="44">FIG. 3</text>
      </g>
    </svg>
  );
}

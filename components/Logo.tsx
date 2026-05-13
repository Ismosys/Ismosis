export default function Logo({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="0.75"
        y="0.75"
        width="26.5"
        height="26.5"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="14" cy="14" r="7.5" stroke="currentColor" strokeWidth="1" />
      <path
        d="M14 2v24M2 14h24"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="1.5 2.5"
        opacity="0.5"
      />
      <circle cx="14" cy="14" r="1.5" fill="currentColor" />
    </svg>
  );
}

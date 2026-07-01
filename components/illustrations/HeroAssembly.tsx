'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { EASE } from '@/lib/motion';

type Callout = {
  n: string;
  tx: number;
  ty: number;
  line: [number, number, number, number];
  dot: [number, number];
};

const CALLOUTS: Callout[] = [
  { n: '12', tx: 528, ty: 178, line: [378, 194, 520, 180], dot: [378, 194] },
  { n: '14', tx: 556, ty: 290, line: [468, 280, 548, 286], dot: [468, 280] },
  { n: '16', tx: 116, ty: 226, line: [140, 222, 252, 232], dot: [252, 232] },
  { n: '18', tx: 110, ty: 340, line: [136, 336, 346, 336], dot: [346, 336] },
  { n: '20', tx: 548, ty: 466, line: [500, 450, 540, 462], dot: [500, 450] },
  { n: '22', tx: 170, ty: 500, line: [200, 496, 298, 452], dot: [298, 452] },
];

export default function HeroAssembly({
  className = '',
  animate = true,
}: {
  className?: string;
  animate?: boolean;
}) {
  const reduce = useReducedMotion();
  const on = animate && !reduce;

  const wipeStart = 0.25;
  const wipeDuration = 1.0;
  const calloutStart = wipeStart + wipeDuration + 0.05;
  const tailStart = calloutStart + CALLOUTS.length * 0.09 + 0.1;

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
      <defs>
        <clipPath id="hero-wipe">
          <motion.rect
            x="0"
            y="0"
            height="640"
            initial={{ width: on ? 0 : 720 }}
            animate={{ width: 720 }}
            transition={
              on ? { duration: wipeDuration, delay: wipeStart, ease: EASE } : { duration: 0 }
            }
          />
        </clipPath>
      </defs>

      {/* Figure label */}
      <motion.g
        fontFamily="ui-monospace, monospace"
        fontSize="11"
        fill="currentColor"
        stroke="none"
        letterSpacing="0.05em"
        initial={{ opacity: on ? 0 : 1 }}
        animate={{ opacity: 1 }}
        transition={on ? { duration: 0.5, delay: 0.1, ease: EASE } : { duration: 0 }}
      >
        <text x="40" y="56">FIG. 1</text>
        <text x="40" y="72" opacity="0.5">SHEET 1 OF 4</text>
      </motion.g>

      {/* Subtle border — draws in first */}
      <motion.rect
        x="32"
        y="32"
        width="656"
        height="576"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.2"
        initial={{ pathLength: on ? 0 : 1 }}
        animate={{ pathLength: 1 }}
        transition={on ? { duration: 0.8, ease: EASE } : { duration: 0 }}
      />

      {/* Drive housing — revealed by left-to-right wipe */}
      <g clipPath="url(#hero-wipe)">
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
      </g>

      {/* Numbered callouts — stagger in after the figure is drawn */}
      {CALLOUTS.map((c, i) => (
        <motion.g
          key={c.n}
          initial={{ opacity: on ? 0 : 1 }}
          animate={{ opacity: 1 }}
          transition={
            on
              ? { duration: 0.4, delay: calloutStart + i * 0.09, ease: EASE }
              : { duration: 0 }
          }
        >
          <text
            x={c.tx}
            y={c.ty}
            fontFamily="ui-monospace, monospace"
            fontSize="11"
            fill="currentColor"
            stroke="none"
          >
            {c.n}
          </text>
          <line
            x1={c.line[0]}
            y1={c.line[1]}
            x2={c.line[2]}
            y2={c.line[3]}
            stroke="currentColor"
            strokeWidth="0.7"
          />
          <circle cx={c.dot[0]} cy={c.dot[1]} r="2" fill="currentColor" stroke="none" />
        </motion.g>
      ))}

      {/* Scale + reference marks — fade in last */}
      <motion.g
        initial={{ opacity: on ? 0 : 1 }}
        animate={{ opacity: 1 }}
        transition={on ? { duration: 0.5, delay: tailStart, ease: EASE } : { duration: 0 }}
      >
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
      </motion.g>
    </svg>
  );
}

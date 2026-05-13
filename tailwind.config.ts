import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A0A0A',
          soft: '#1A1A1A',
          muted: '#3A3A3A',
        },
        paper: {
          DEFAULT: '#FFFFFF',
          warm: '#FAFAF9',
          tint: '#F5F5F4',
        },
        line: {
          DEFAULT: '#E5E5E5',
          soft: '#EFEFEF',
          strong: '#D4D4D4',
        },
        navy: {
          DEFAULT: '#0E2148',
          deep: '#091735',
          muted: '#1F3A6B',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['clamp(3.25rem, 6vw, 5.5rem)', { lineHeight: '0.98', letterSpacing: '-0.035em' }],
        'display-xl': ['clamp(2.5rem, 5vw, 4.25rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2rem, 4vw, 3.25rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
      },
      maxWidth: {
        page: '1280px',
        narrow: '960px',
      },
      letterSpacing: {
        tightest: '-0.04em',
        eyebrow: '0.16em',
      },
      transitionTimingFunction: {
        'precise': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;

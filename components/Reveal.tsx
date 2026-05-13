'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ReactNode } from 'react';
import { EASE } from '@/lib/motion';

type RevealTag = 'div' | 'section' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'li' | 'article';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  as?: RevealTag;
};

export default function Reveal({
  children,
  delay = 0,
  className = '',
  y = 16,
  as = 'div',
}: RevealProps) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y },
    visible: reduce ? { opacity: 1 } : { opacity: 1, y: 0 },
  };

  const transition = {
    duration: 0.7,
    ease: EASE,
    delay,
  };

  const viewport = { once: true, margin: '-60px' };

  const sharedProps = {
    initial: 'hidden' as const,
    whileInView: 'visible' as const,
    viewport,
    transition,
    variants,
    className,
  };

  switch (as) {
    case 'section':
      return <motion.section {...sharedProps}>{children}</motion.section>;
    case 'span':
      return <motion.span {...sharedProps}>{children}</motion.span>;
    case 'p':
      return <motion.p {...sharedProps}>{children}</motion.p>;
    case 'h1':
      return <motion.h1 {...sharedProps}>{children}</motion.h1>;
    case 'h2':
      return <motion.h2 {...sharedProps}>{children}</motion.h2>;
    case 'h3':
      return <motion.h3 {...sharedProps}>{children}</motion.h3>;
    case 'li':
      return <motion.li {...sharedProps}>{children}</motion.li>;
    case 'article':
      return <motion.article {...sharedProps}>{children}</motion.article>;
    default:
      return <motion.div {...sharedProps}>{children}</motion.div>;
  }
}

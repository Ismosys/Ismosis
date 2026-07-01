'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ReactNode } from 'react';
import { EASE } from '@/lib/motion';

type ParentTag = 'div' | 'ul' | 'ol' | 'section';
type ItemTag = 'div' | 'li' | 'article';

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

type StaggerProps = {
  children: ReactNode;
  className?: string;
  as?: ParentTag;
};

/**
 * Parent wrapper that reveals its <StaggerItem> children in sequence as the
 * group scrolls into view. Pairs with StaggerItem below.
 */
export function Stagger({ children, className = '', as = 'div' }: StaggerProps) {
  const shared = {
    initial: 'hidden' as const,
    whileInView: 'visible' as const,
    viewport: { once: true, margin: '-60px' },
    variants: container,
    className,
  };

  switch (as) {
    case 'ul':
      return <motion.ul {...shared}>{children}</motion.ul>;
    case 'ol':
      return <motion.ol {...shared}>{children}</motion.ol>;
    case 'section':
      return <motion.section {...shared}>{children}</motion.section>;
    default:
      return <motion.div {...shared}>{children}</motion.div>;
  }
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  as?: ItemTag;
  y?: number;
};

/**
 * Child of <Stagger>. Inherits the parent's staggered timing; collapses to a
 * plain fade under reduced-motion.
 */
export function StaggerItem({
  children,
  className = '',
  as = 'div',
  y = 16,
}: StaggerItemProps) {
  const reduce = useReducedMotion();

  const item: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE },
    },
  };

  const shared = { variants: item, className };

  switch (as) {
    case 'li':
      return <motion.li {...shared}>{children}</motion.li>;
    case 'article':
      return <motion.article {...shared}>{children}</motion.article>;
    default:
      return <motion.div {...shared}>{children}</motion.div>;
  }
}

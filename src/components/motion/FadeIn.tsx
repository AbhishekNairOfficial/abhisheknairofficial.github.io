'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import {
  FADE_DURATION_DEFAULT,
  FADE_OFFSET_PX,
  MOTION_EASE,
  VIEWPORT_MARGIN_FADEIN,
} from '@/lib/motion';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

const directionOffsets = {
  up: { y: FADE_OFFSET_PX },
  down: { y: -FADE_OFFSET_PX },
  left: { x: FADE_OFFSET_PX },
  right: { x: -FADE_OFFSET_PX },
  none: {},
};

export function FadeIn({
  children,
  delay = 0,
  duration = FADE_DURATION_DEFAULT,
  className,
  direction = 'up',
}: FadeInProps) {
  const reduceMotion = useReducedMotion();

  const initial = reduceMotion
    ? { opacity: 1, x: 0, y: 0 }
    : { opacity: 0, ...directionOffsets[direction] };

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration, delay, ease: MOTION_EASE };

  return (
    <motion.div
      className={className}
      initial={initial}
      transition={transition}
      viewport={{ once: true, margin: VIEWPORT_MARGIN_FADEIN }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
    >
      {children}
    </motion.div>
  );
}

'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import {
  MOTION_EASE,
  STAGGER_CHILD_DELAY,
  STAGGER_ITEM_DURATION,
  STAGGER_ITEM_Y,
  VIEWPORT_MARGIN_STAGGER,
} from '@/lib/motion';

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerChildren({
  children,
  className,
  staggerDelay = STAGGER_CHILD_DELAY,
}: StaggerChildrenProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      transition={{ staggerChildren: staggerDelay }}
      viewport={{ once: true, margin: VIEWPORT_MARGIN_STAGGER }}
      whileInView="visible"
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: STAGGER_ITEM_Y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: STAGGER_ITEM_DURATION, ease: MOTION_EASE },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

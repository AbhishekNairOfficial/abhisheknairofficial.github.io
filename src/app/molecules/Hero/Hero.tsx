'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { NAME, HERO_TITLE, HERO_TAGLINE } from '@/config/constants';
import {
  FADE_DURATION_DEFAULT,
  HERO_CHEVRON_LOOP_DURATION,
  HERO_H1_DELAY,
  HERO_H1_DURATION,
  HERO_INITIAL_Y_OFFSET,
  HERO_SCROLL_HINT_DELAY,
  HERO_SCROLL_HINT_DURATION,
  HERO_TAGLINE_DELAY,
  HERO_TAGLINE_Y_OFFSET,
  MOTION_EASE,
  SCROLL_INDICATOR_OFFSET,
} from '@/lib/motion';

export function Hero() {
  const reduceMotion = useReducedMotion();

  const h1Initial = reduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: HERO_INITIAL_Y_OFFSET };
  const h1Transition = reduceMotion
    ? { duration: 0 }
    : { duration: HERO_H1_DURATION, delay: HERO_H1_DELAY, ease: MOTION_EASE };

  const taglineInitial = reduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: HERO_TAGLINE_Y_OFFSET };
  const taglineTransition = reduceMotion
    ? { duration: 0 }
    : { duration: FADE_DURATION_DEFAULT, delay: HERO_TAGLINE_DELAY };

  const scrollHintTransition = reduceMotion
    ? { duration: 0 }
    : { delay: HERO_SCROLL_HINT_DELAY, duration: HERO_SCROLL_HINT_DURATION };

  const chevronAnimate = reduceMotion
    ? { y: 0 }
    : { y: [0, SCROLL_INDICATOR_OFFSET, 0] };
  const chevronTransition = reduceMotion
    ? { duration: 0 }
    : {
        duration: HERO_CHEVRON_LOOP_DURATION,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      };

  return (
    <section className="min-h-[90vh] flex flex-col justify-center relative pt-16">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] mb-8"
          initial={h1Initial}
          transition={h1Transition}
        >
          <span className="block font-mono text-xs uppercase tracking-[0.3em] text-primary mb-6">
            {NAME}
          </span>
          {HERO_TITLE.split('\n').map((line, i) => (
            <span
              className="block font-display font-normal"
              key={i}
            >
              {line}
            </span>
          ))}
        </motion.h1>

        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          initial={taglineInitial}
          transition={taglineTransition}
        >
          {HERO_TAGLINE}
        </motion.p>
      </div>

      <motion.div
        animate={{ opacity: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: reduceMotion ? 1 : 0 }}
        transition={scrollHintTransition}
      >
        <a
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          href="#about"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest">
            Scroll
          </span>
          <motion.div
            animate={chevronAnimate}
            transition={chevronTransition}
          >
            <ChevronDown aria-hidden className="h-4 w-4" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
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
  return (
    <section className="min-h-[90vh] flex flex-col justify-center relative pt-16">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] mb-8"
          initial={{ opacity: 0, y: HERO_INITIAL_Y_OFFSET }}
          transition={{ duration: HERO_H1_DURATION, delay: HERO_H1_DELAY, ease: MOTION_EASE }}
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
          initial={{ opacity: 0, y: HERO_TAGLINE_Y_OFFSET }}
          transition={{ duration: FADE_DURATION_DEFAULT, delay: HERO_TAGLINE_DELAY }}
        >
          {HERO_TAGLINE}
        </motion.p>
      </div>

      <motion.div
        animate={{ opacity: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        transition={{ delay: HERO_SCROLL_HINT_DELAY, duration: HERO_SCROLL_HINT_DURATION }}
      >
        <a
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          href="#about"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, SCROLL_INDICATOR_OFFSET, 0] }}
            transition={{ duration: HERO_CHEVRON_LOOP_DURATION, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}

'use client';

import { useReducedMotion } from 'framer-motion';
import { useCallback, useState } from 'react';
import {
  CLIENTS_MARQUEE_PAUSE,
  CLIENTS_MARQUEE_PLAY,
  CLIENTS_MARQUEE_TOGGLE_SUFFIX,
} from '@/config/constants';
import { cn } from '@/lib/utils';

export interface ClientMarqueeItem {
  name: string;
  context: string;
}

interface ClientsMarqueeProps {
  items: ClientMarqueeItem[];
}

export function ClientsMarquee({ items }: ClientsMarqueeProps) {
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);

  const togglePaused = useCallback(() => {
    setPaused((p) => !p);
  }, []);

  const displayItems = reduceMotion ? items : [...items, ...items];

  return (
    <div className="mb-12">
      <div className="overflow-hidden relative">
        <div
          className={
            reduceMotion
              ? 'flex flex-wrap justify-center gap-x-10 gap-y-8 md:gap-x-14'
              : cn(
                'flex clients-marquee-track animate-scroll',
                paused && 'animate-scroll-paused',
              )
          }
        >
          {displayItems.map((client, index) => (
            <div
              className="flex-shrink-0 px-8 md:px-12 flex flex-col items-center justify-center gap-3"
              key={`${client.name}-${index}`}
            >
              <span className="font-primary text-2xl sm:text-3xl text-foreground/60 hover:text-primary transition-all duration-300 whitespace-nowrap motion-safe:hover:scale-110">
                {client.name}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {client.context}
              </span>
            </div>
          ))}
        </div>
      </div>
      {!reduceMotion && (
        <div className="flex justify-end mt-4">
          <button
            aria-pressed={paused}
            className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary border border-border px-3 py-1.5 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            onClick={togglePaused}
            type="button"
          >
            {paused ? CLIENTS_MARQUEE_PLAY : CLIENTS_MARQUEE_PAUSE}
            {CLIENTS_MARQUEE_TOGGLE_SUFFIX}
          </button>
        </div>
      )}
    </div>
  );
}

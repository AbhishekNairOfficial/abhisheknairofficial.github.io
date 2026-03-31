'use client';

import type { ChangeEventHandler } from 'react';
import { ACCENT_HUE_LABEL, ACCENT_HUE_RESET } from '@/config/constants';
import { HUE_MAX, HUE_MIN } from '@/lib/accent-hue';

const sliderClassName =
  'hue-slider-track mb-3 h-2 w-full cursor-pointer appearance-none rounded-full accent-primary '
  + '[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 '
  + '[&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none '
  + '[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 '
  + '[&::-webkit-slider-thumb]:border-background [&::-webkit-slider-thumb]:bg-primary '
  + '[&::-webkit-slider-thumb]:shadow-sm [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 '
  + '[&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full '
  + '[&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-background '
  + '[&::-moz-range-thumb]:bg-primary';

interface ColorSliderPanelProps {
  hue: number;
  onHueChange: ChangeEventHandler<HTMLInputElement>;
  onReset: () => void;
  panelClassName: string;
  popoverId: string;
}

export function ColorSliderPanel({
  hue,
  onHueChange,
  onReset,
  panelClassName,
  popoverId,
}: ColorSliderPanelProps) {
  return (
    <div
      className={panelClassName}
      id={popoverId}
      role="region"
    >
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
        {ACCENT_HUE_LABEL}
      </p>
      <input
        aria-valuemax={HUE_MAX}
        aria-valuemin={HUE_MIN}
        aria-valuenow={hue}
        className={sliderClassName}
        max={HUE_MAX}
        min={HUE_MIN}
        onChange={onHueChange}
        type="range"
        value={hue}
      />
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-xs text-muted-foreground">
          {hue}
          &deg;
        </span>
        <button
          className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground underline-offset-4 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-popover rounded-sm"
          onClick={onReset}
          type="button"
        >
          {ACCENT_HUE_RESET}
        </button>
      </div>
    </div>
  );
}

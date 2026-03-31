'use client';

import { Palette } from 'lucide-react';
import { ACCENT_COLOR_ARIA_LABEL } from '@/config/constants';
import { ColorSliderPanel } from '@/components/ColorSliderPanel';
import { useColorSlider } from '@/components/useColorSlider';

export { DEFAULT_ACCENT_HUE } from '@/lib/accent-hue';

export function ColorSlider() {
  const {
    containerRef,
    handleHueChange,
    handleReset,
    handleToggleOpen,
    hue,
    mounted,
    open,
    panelClassName,
    popoverId,
  } = useColorSlider();

  if (!mounted) {
    return (
      <span
        aria-hidden
        className="h-9 w-9 inline-flex shrink-0"
      />
    );
  }

  return (
    <div
      className="relative shrink-0"
      ref={containerRef}
    >
      <button
        aria-controls={popoverId}
        aria-expanded={open}
        aria-label={ACCENT_COLOR_ARIA_LABEL}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        onClick={handleToggleOpen}
        type="button"
      >
        <Palette
          aria-hidden
          className="h-4 w-4"
        />
      </button>

      {open && (
        <ColorSliderPanel
          hue={hue}
          onHueChange={handleHueChange}
          onReset={handleReset}
          panelClassName={panelClassName}
          popoverId={popoverId}
        />
      )}
    </div>
  );
}

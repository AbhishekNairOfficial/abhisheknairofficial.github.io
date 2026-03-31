'use client';

import { useReducedMotion } from 'framer-motion';
import { useTheme } from 'next-themes';
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import type { ChangeEvent } from 'react';
import {
  applyAccentHue,
  clearAccentOverrides,
  DEFAULT_ACCENT_HUE,
  HUE_STORAGE_KEY,
  readStoredHue,
} from '@/lib/accent-hue';

export function useColorSlider() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [hue, setHue] = useState(DEFAULT_ACCENT_HUE);
  const [hasCustomHue, setHasCustomHue] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hydratedFromStorage = useRef(false);
  const reduceMotionPref = useReducedMotion();
  const reduceMotion = reduceMotionPref ?? false;
  const popoverId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !resolvedTheme || hydratedFromStorage.current) {
      return;
    }
    hydratedFromStorage.current = true;
    const stored = readStoredHue();
    if (stored !== null) {
      setHue(stored);
      setHasCustomHue(true);
      applyAccentHue(stored, resolvedTheme);
    }
  }, [mounted, resolvedTheme]);

  useEffect(() => {
    if (!mounted || !hasCustomHue || !resolvedTheme) {
      return;
    }
    applyAccentHue(hue, resolvedTheme);
  }, [mounted, hasCustomHue, hue, resolvedTheme]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const onPointerDown = (e: PointerEvent) => {
      const el = containerRef.current;
      if (el && !el.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const handleHueChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const next = Number.parseInt(e.target.value, 10);
      if (!Number.isFinite(next)) {
        return;
      }
      setHue(next);
      setHasCustomHue(true);
      try {
        window.localStorage.setItem(HUE_STORAGE_KEY, String(next));
      } catch {
        /* ignore */
      }
      applyAccentHue(next, resolvedTheme);
    },
    [resolvedTheme],
  );

  const handleReset = useCallback(() => {
    setHue(DEFAULT_ACCENT_HUE);
    setHasCustomHue(false);
    clearAccentOverrides();
    try {
      window.localStorage.removeItem(HUE_STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const handleToggleOpen = useCallback(() => {
    setOpen((o) => {
      return !o;
    });
  }, []);

  const panelTransition = reduceMotion ? '' : 'transition-opacity duration-150';
  const panelClassName =
    'absolute right-0 top-full z-50 mt-2 w-[min(18rem,calc(100vw-2rem))] '
    + 'rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-md '
    + panelTransition;

  return {
    containerRef,
    handleHueChange,
    handleReset,
    handleToggleOpen,
    hue,
    mounted,
    open,
    panelClassName,
    popoverId,
  };
}

export const HUE_STORAGE_KEY = 'custom-hue';
export const HUE_MAX = 360;
export const HUE_MIN = 0;
const SATURATION_DARK = 70;
const SATURATION_LIGHT = 84;
const LIGHTNESS_DARK = 48;
const LIGHTNESS_LIGHT = 32;

/** Matches default teal in globals.css */
export const DEFAULT_ACCENT_HUE = 174;

export function readStoredHue(): number | null {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(HUE_STORAGE_KEY);
    if (raw === null) {
      return null;
    }
    const n = Number.parseInt(raw, 10);
    if (Number.isFinite(n) && n >= HUE_MIN && n <= HUE_MAX) {
      return n;
    }
    return null;
  } catch {
    return null;
  }
}

export function applyAccentHue(
  hue: number,
  resolvedTheme: string | undefined,
): void {
  const root = document.documentElement;
  const isDark = resolvedTheme === 'dark';
  const sat = isDark ? SATURATION_DARK : SATURATION_LIGHT;
  const lit = isDark ? LIGHTNESS_DARK : LIGHTNESS_LIGHT;
  const value = `${Math.round(hue)} ${sat}% ${lit}%`;
  root.style.setProperty('--primary', value);
  root.style.setProperty('--accent', value);
  root.style.setProperty('--ring', value);
}

export function clearAccentOverrides(): void {
  const root = document.documentElement;
  root.style.removeProperty('--primary');
  root.style.removeProperty('--accent');
  root.style.removeProperty('--ring');
}

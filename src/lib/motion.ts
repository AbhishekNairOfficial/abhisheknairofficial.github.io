const EASE_X1 = 0.23;
const EASE_X2 = 0.32;

/** Shared Framer Motion easing: strong ease-out (starts fast, settles gently). */
export const MOTION_EASE = [EASE_X1, 1, EASE_X2, 1] as const;

export const STAGGER_CHILD_DELAY = 0.05;
export const STAGGER_MOBILE_LINK = 0.05;
export const FADE_DURATION_DEFAULT = 0.45;
export const STAGGER_ITEM_DURATION = 0.35;
export const SCROLL_INDICATOR_OFFSET = 6;
export const NAV_SCROLL_THRESHOLD_PX = 50;
export const FADE_OFFSET_PX = 18;
export const STAGGER_ITEM_Y = 12;
export const VIEWPORT_MARGIN_FADEIN = '-80px';
export const VIEWPORT_MARGIN_STAGGER = '-60px';
/** Base delay before skill category stagger (after propositions). */
export const SECTION_STAGGER_BASE = 0.15;

export const HERO_H1_DURATION = 0.7;
export const HERO_H1_DELAY = 0.2;
export const HERO_TAGLINE_DELAY = 0.5;
export const HERO_SCROLL_HINT_DELAY = 1.2;
export const HERO_SCROLL_HINT_DURATION = 0.5;
export const HERO_CHEVRON_LOOP_DURATION = 1.5;
export const HERO_INITIAL_Y_OFFSET = 30;
export const HERO_TAGLINE_Y_OFFSET = 20;

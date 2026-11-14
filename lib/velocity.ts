/**
 * Shared scroll-velocity store.
 *
 * Written once per frame by <SmoothScroll /> inside gsap.ticker, read by
 * any component that reacts to how fast the visitor scrolls. It is a plain
 * mutable object on purpose: continuous values never go through React state.
 */
export const velocity = {
  /** Smoothed velocity in px/s. Positive = scrolling down. */
  value: 0,
  /** |value| mapped to 0..1 (0 = still, 1 = flicking hard). */
  norm: 0,
  /** 1 when scrolling down, -1 when scrolling up. Holds last direction while idle. */
  direction: 1 as 1 | -1,
  /** Milliseconds since the visitor stopped scrolling. 0 while moving. */
  idleMs: 0,
  /** True once the user has stayed still for STOP_AFTER_MS. */
  stopped: true,
};

/** Velocity (px/s) under which we treat the page as still. */
export const STILL_THRESHOLD = 45;
/** Velocity (px/s) that maps to norm = 1. */
export const MAX_VELOCITY = 2600;
/** How long the page must be still before it counts as "stopped". */
export const STOP_AFTER_MS = 650;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

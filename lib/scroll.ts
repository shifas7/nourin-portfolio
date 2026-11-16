import type Lenis from "lenis";

let instance: Lenis | null = null;

/** Holds the active Lenis instance so other modules can reach it if needed. */
export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

const NAV_H = 64;
/** Case-study sub-bar, docked under the nav while the case studies are on screen. */
const SUBBAR_H = 56;
const GAP = 16;

/**
 * The single place every in-page jump goes through (nav, CTAs, channel bar, client
 * logos). It aims at the first line of text in the target rather than its box, so a
 * tall padded section never lands with its heading pushed off a short screen, and it
 * clears the fixed nav, plus the sub-bar when landing inside a case study.
 */
export function scrollToHash(hash: string) {
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return false;

  let y: number;
  if (hash === "#top" || hash === "#main-content") {
    y = 0;
  } else {
    const inCase = hash.startsWith("#work-");
    const anchor = inCase ? target.querySelector<HTMLElement>("p, h3") ?? target : target;
    const offset = NAV_H + (inCase ? SUBBAR_H : 0) + GAP;
    y = Math.max(0, anchor.getBoundingClientRect().top + window.scrollY - offset);
  }

  if (instance) instance.scrollTo(y, { duration: 1.2 });
  else window.scrollTo({ top: y });
  history.replaceState(null, "", hash);

  // Move focus for keyboard and screen-reader users without a second jump.
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
  return true;
}

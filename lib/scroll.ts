import type Lenis from "lenis";

let instance: Lenis | null = null;

/** Holds the active Lenis instance so other modules can reach it if needed. */
export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

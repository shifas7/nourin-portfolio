"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  velocity,
  STILL_THRESHOLD,
  MAX_VELOCITY,
  STOP_AFTER_MS,
  prefersReducedMotion,
} from "@/lib/velocity";
import { setLenis } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

/**
 * Runs Lenis smooth scrolling (skipped under reduced motion) and computes the
 * shared scroll velocity once per frame on the GSAP ticker.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduce = prefersReducedMotion();
    let lenis: Lenis | null = null;

    if (!reduce) {
      lenis = new Lenis({ lerp: 0.1, anchors: { offset: -84 } });
      lenis.on("scroll", ScrollTrigger.update);
      setLenis(lenis);
    }

    const raf = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    let lastY = window.scrollY;
    const tick = (_t: number, deltaMs: number) => {
      const dt = Math.max(deltaMs, 1) / 1000;
      const y = window.scrollY;
      const raw = (y - lastY) / dt;
      lastY = y;

      // Ease toward the raw value so the effects feel physical, not twitchy.
      velocity.value += (raw - velocity.value) * 0.18;
      const abs = Math.abs(velocity.value);

      if (abs > STILL_THRESHOLD) {
        velocity.direction = velocity.value > 0 ? 1 : -1;
        velocity.idleMs = 0;
        velocity.stopped = false;
      } else {
        velocity.idleMs += deltaMs;
        if (velocity.idleMs >= STOP_AFTER_MS) velocity.stopped = true;
      }

      velocity.norm = Math.min(abs / MAX_VELOCITY, 1);
      if (abs < 2) velocity.value = 0;
    };
    gsap.ticker.add(tick);

    // Fitted display type resizes once web fonts arrive; recompute trigger positions.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(() => requestAnimationFrame(refresh));
    window.addEventListener("load", refresh);
    const late = window.setTimeout(refresh, 1500);

    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(late);
      gsap.ticker.remove(raf);
      gsap.ticker.remove(tick);
      lenis?.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}

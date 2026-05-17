"use client";
import { useEffect, useRef } from "react";

export function useMouseParallax(strength = 0.02) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Only enable on pointer devices
    if (!globalThis.matchMedia("(pointer: fine)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (clientX - cx) * strength;
      const dy = (clientY - cy) * strength;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    };

    globalThis.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });
    return () => globalThis.removeEventListener("mousemove", handleMouseMove);
  }, [strength]);

  return ref;
}

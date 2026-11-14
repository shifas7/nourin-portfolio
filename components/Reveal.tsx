"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { prefersReducedMotion } from "@/lib/velocity";

/** Wipes its child in from the bottom (media) or fades it up (text) on load. */
export default function Reveal({
  children,
  kind = "fade",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  kind?: "fade" | "wipe";
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      if (kind === "wipe") {
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut", delay },
        );
        gsap.from(el.firstElementChild, { scale: 1.3, duration: 1.8, ease: "expo.out", delay });
      } else {
        gsap.from(el, { y: 24, opacity: 0, duration: 1.1, ease: "expo.out", delay });
      }
    }, el);
    return () => ctx.revert();
  }, [kind, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const originalWarn = console.warn;
    console.warn = (...args: Parameters<typeof console.warn>) => {
      if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) {
        return;
      }
      originalWarn(...args);
    };

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      console.warn = originalWarn;
    };
  }, []);

  return <>{children}</>;
}

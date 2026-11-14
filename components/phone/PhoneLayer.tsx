"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { prefersReducedMotion } from "@/lib/velocity";

// three.js is only downloaded once this mounts, after the page is idle.
const PhoneScene = dynamic(() => import("@/components/phone/PhoneScene"), { ssr: false });

function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function whenIdle(cb: () => void) {
  const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
  if (w.requestIdleCallback) {
    const id = w.requestIdleCallback(cb, { timeout: 2500 });
    return () => (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(id);
  }
  const id = window.setTimeout(cb, 1200);
  return () => window.clearTimeout(id);
}

/**
 * Progressive enhancement: the page first paints with flat CSS phones. On large,
 * pointer-driven screens with motion allowed, the WebGL phone loads when the browser
 * is idle, and html.has-3d (which hides the flat phones) is set only once it has rendered.
 */
export default function PhoneLayer() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (hover: hover)");
    let cancelIdle = () => {};

    const decide = () => {
      const ok = mq.matches && !prefersReducedMotion() && webglAvailable();
      if (!ok) {
        setEnabled(false);
        document.documentElement.classList.remove("has-3d");
        return;
      }
      cancelIdle = whenIdle(() => setEnabled(true));
    };

    const start = () => decide();
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    mq.addEventListener("change", decide);
    return () => {
      cancelIdle();
      window.removeEventListener("load", start);
      mq.removeEventListener("change", decide);
    };
  }, []);

  return enabled ? <PhoneScene onReady={() => document.documentElement.classList.add("has-3d")} /> : null;
}

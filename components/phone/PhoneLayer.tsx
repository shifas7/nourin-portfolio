"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { prefersReducedMotion } from "@/lib/velocity";

const PhoneScene = dynamic(() => import("@/components/phone/PhoneScene"), { ssr: false });

function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Mounts the WebGL phone only on large, pointer-driven screens with motion allowed.
 * Sets html.has-3d so the flat fallback phones hide themselves.
 */
export default function PhoneLayer() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (hover: hover)");
    const decide = () => {
      const ok = mq.matches && !prefersReducedMotion() && webglAvailable();
      setEnabled(ok);
      document.documentElement.classList.toggle("has-3d", ok);
    };
    const first = requestAnimationFrame(decide);
    mq.addEventListener("change", decide);
    return () => {
      cancelAnimationFrame(first);
      mq.removeEventListener("change", decide);
    };
  }, []);

  return enabled ? <PhoneScene /> : null;
}

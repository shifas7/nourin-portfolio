"use client";
import { useRef } from "react";
import { useInView } from "framer-motion";

export function useScrollReveal(options?: Parameters<typeof useInView>[1]) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2, ...options });
  return { ref, inView };
}

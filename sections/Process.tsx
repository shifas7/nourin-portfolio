"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PhoneStation from "@/components/phone/PhoneStation";
import SplitReveal from "@/components/SplitReveal";
import { process } from "@/lib/content";
import { prefersReducedMotion } from "@/lib/velocity";

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const line = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = line.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 80%", end: "top 35%", scrub: true } },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <PhoneStation
      as="section"
      labelledBy="process-title"
      pose={{ visible: false }}
      className="mx-auto max-w-[1400px] px-4 pb-28 md:px-8 md:pb-40"
    >
      <SplitReveal
        id="process-title"
        text="How a project runs"
        className="font-display text-[clamp(2.4rem,4.6vw,4.4rem)] leading-[0.95] text-fg [text-wrap:balance]"
      />
      <div className="relative mt-14">
        <div className="absolute left-0 right-0 top-[7px] hidden h-px bg-line md:block" />
        <div ref={line} className="absolute left-0 right-0 top-[7px] hidden h-px origin-left bg-accent md:block" />
        <ol className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6">
          {process.map((p) => (
            <li key={p.verb} className="relative">
              <span aria-hidden className="block h-[15px] w-[15px] rounded-full border-2 border-accent bg-bg" />
              <h3 className="font-display mt-6 text-3xl text-fg">{p.verb}</h3>
              <p className="mt-3 max-w-[30ch] text-[16px] leading-relaxed text-muted">{p.line}</p>
            </li>
          ))}
        </ol>
      </div>
    </PhoneStation>
  );
}

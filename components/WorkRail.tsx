"use client";

import { useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cases } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sticky channel switcher for the case studies. Highlights the case in view and
 * jumps straight to a channel. It sits below the 3D phone layer (z-20 vs z-30) and
 * only as wide as its pills, so it never cuts across the phone.
 */
export default function WorkRail() {
  const [active, setActive] = useState<string | null>(null);

  useLayoutEffect(() => {
    const triggers = cases.map((c) =>
      ScrollTrigger.create({
        trigger: `#work-${c.id}`,
        start: "top 55%",
        end: "bottom 45%",
        onToggle: (self) => {
          if (self.isActive) setActive(c.id);
        },
      }),
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <nav aria-label="Case studies by channel" className="sticky top-[76px] z-20 py-2">
      <ul className="inline-flex max-w-full gap-1 overflow-x-auto rounded-full border border-line bg-bg/85 p-1 backdrop-blur-md [scrollbar-width:none]">
        {cases.map((c) => {
          const on = active === c.id;
          return (
            <li key={c.id} className="shrink-0">
              <a
                href={`#work-${c.id}`}
                aria-current={on ? "true" : undefined}
                className={`inline-flex h-9 items-center rounded-full px-4 text-[14px] transition-colors duration-300 ${
                  on ? "bg-fg text-bg" : "text-muted hover:text-fg"
                }`}
              >
                {c.service}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

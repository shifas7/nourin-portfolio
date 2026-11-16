"use client";

import { useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cases } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

/** Height of the sub-bar (lib/scroll.ts uses the same value for jump offsets). */
const BAR_H = 56;

/**
 * Channel switcher for the case studies. It is a solid, full-width sub-bar docked
 * under the nav (not a floating pill), so text never shows through or beside it.
 * It slides in only while the case studies are on screen.
 */
export default function WorkRail() {
  const [active, setActive] = useState<string | null>(null);
  const [shown, setShown] = useState(false);

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
    const first = `#work-${cases[0].id}`;
    const last = `#work-${cases[cases.length - 1].id}`;
    triggers.push(
      ScrollTrigger.create({
        trigger: first,
        endTrigger: last,
        start: "top 70%",
        end: "bottom 30%",
        onToggle: (self) => setShown(self.isActive),
      }),
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <nav
      aria-label="Case studies by channel"
      aria-hidden={!shown}
      className={`fixed inset-x-0 top-16 z-[35] border-b border-line bg-bg/95 backdrop-blur-md transition-[transform,opacity] duration-500 ease-out-expo ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0"
      }`}
      style={{ height: BAR_H }}
    >
      <ul className="mx-auto flex h-full max-w-[1400px] items-center gap-1 overflow-x-auto px-4 [scrollbar-width:none] md:px-8">
        {cases.map((c) => {
          const on = active === c.id;
          return (
            <li key={c.id} className="shrink-0">
              <a
                href={`#work-${c.id}`}
                tabIndex={shown ? 0 : -1}
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

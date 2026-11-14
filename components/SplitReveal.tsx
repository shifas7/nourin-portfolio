"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/velocity";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  text: string;
  by?: "word" | "char";
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  id?: string;
  delay?: number;
};

/** Text that rises out of masks, word by word or letter by letter, when it scrolls in. */
export default function SplitReveal({ text, by = "word", as = "h2", className = "", id, delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll(".split-item"), {
        yPercent: 110,
        rotate: by === "char" ? 6 : 2,
        duration: 1.1,
        ease: "expo.out",
        stagger: by === "char" ? 0.025 : 0.06,
        delay,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [by, delay]);

  const Tag = as;
  const words = text.split(" ");

  return (
    <Tag ref={ref as React.Ref<never>} id={id} className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} aria-hidden className="split-mask">
          {by === "word" ? (
            <span className="split-item">{word}</span>
          ) : (
            word.split("").map((c, ci) => (
              <span key={ci} className="split-item">
                {c}
              </span>
            ))
          )}
          {wi < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}

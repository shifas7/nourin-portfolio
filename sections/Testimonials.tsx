"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { testimonials } from "@/data/testimonials";

function TestimonialCard({
  testimonial,
  index,
}: Readonly<{
  testimonial: (typeof testimonials)[0];
  index: number;
}>) {
  return (
    <div
      className="editorial-card snap-center w-[85vw] md:w-[450px] shrink-0 flex flex-col justify-between"
      style={{ minHeight: "260px" }}
    >
      <div>
        {/* Header row */}
        <div className="flex items-center justify-between mb-24px">
          <span className="font-manrope text-[10px] tracking-widest uppercase text-cream-dark">
            0{index + 1}
          </span>
          <span className="font-cormorant text-base text-cream-dark">✦</span>
        </div>

        {/* Quote */}
        <blockquote className="font-cormorant italic text-base md:text-lg leading-relaxed text-espresso/90 mb-24px">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
      </div>

      {/* Footer author details */}
      <div className="border-t border-cream-dark/25 pt-16px mt-auto">
        <p
          className="font-manrope text-xs font-semibold tracking-wide uppercase"
          style={{ color: "var(--espresso)" }}
        >
          {testimonial.author}
        </p>
        <p
          className="font-inter text-xs mt-4px leading-none"
          style={{ color: "rgba(74,52,40,0.6)" }}
        >
          {testimonial.role}
        </p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const total = el.scrollWidth - el.clientWidth;
    if (total <= 0) return;
    setScrollProgress(el.scrollLeft / total);
  };

  // Set scroll behaviour and attach drag-scroll listeners on mount
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.style.scrollBehavior = "smooth";
    el.tabIndex = 0; // Make the scrollable container keyboard-focusable for accessibility

    const handleMouseDown = (e: MouseEvent) => {
      el.style.scrollBehavior = "auto";
      const startX = e.pageX - el.offsetLeft;
      const scrollLeft = el.scrollLeft;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const x = moveEvent.pageX - el.offsetLeft;
        const walk = (x - startX) * 1.5; // scroll speed multiplier
        el.scrollLeft = scrollLeft - walk;
        handleScroll();
      };

      const handleMouseUp = () => {
        el.style.scrollBehavior = "smooth";
        globalThis.removeEventListener("mousemove", handleMouseMove);
        globalThis.removeEventListener("mouseup", handleMouseUp);
      };

      globalThis.removeEventListener("mousemove", handleMouseMove);
      globalThis.removeEventListener("mouseup", handleMouseUp);
      globalThis.addEventListener("mousemove", handleMouseMove);
      globalThis.addEventListener("mouseup", handleMouseUp);
    };

    el.addEventListener("mousedown", handleMouseDown);

    return () => {
      el.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return (
    <section
      id="testimonials"
      className="section-pad relative overflow-hidden"
      style={{ backgroundColor: "var(--beige)" }}
      aria-label="Client testimonials"
    >
      <div className="absolute inset-0 paper-texture opacity-40 pointer-events-none" />
      <div
        className="absolute -top-40 right-0 w-96 h-96 rounded-full pointer-events-none filter blur-[80px]"
        style={{ backgroundColor: "rgba(217,194,176,0.3)" }}
      />

      <div className="editorial-container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-48px"
        >
          <span
            className="font-manrope text-fluid-sm tracking-[0.2em] flex items-center gap-3 mb-16px"
            style={{ color: "rgba(74,52,40,0.72)" }}
          >
            <span className="w-8 h-px inline-block" style={{ backgroundColor: "rgba(74,52,40,0.4)" }} />Testimonials
          </span>
          <h2
            className="font-cormorant text-fluid-xl font-semibold leading-tight max-w-xl"
            style={{ color: "var(--espresso)" }}
          >
            What they say{" "}
            <span className="italic font-light">after working with me.</span>
          </h2>
        </motion.div>

        <section
          ref={scrollRef}
          onScroll={handleScroll}
          aria-label="Testimonials scroll container"
          className="flex flex-row flex-nowrap gap-24px overflow-x-auto scrollbar-none snap-x snap-mandatory py-16px cursor-grab active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-espresso"
          style={{ scrollbarWidth: "none" }}
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} />
          ))}
        </section>

        {/* Cinematic Scroll Progress Bar */}
        <div className="w-full h-[2px] bg-cream-dark/20 relative mt-32px rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-espresso rounded-full"
            style={{ width: `${scrollProgress * 100}%` }}
            transition={{ ease: "easeOut", duration: 0.1 }}
          />
        </div>

        {/* Drag hints */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="font-manrope text-xs tracking-widest uppercase text-center mt-24px"
          style={{ color: "rgba(74,52,40,0.4)" }}
        >
          Drag or swipe to read client stories →
        </motion.p>
      </div>
    </section>
  );
}

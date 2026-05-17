"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";

const metrics = [
  { value: 12, suffix: "M+", label: "Organic Reach", unit: "across brand portfolios" },
  { value: 34, suffix: "+", label: "Brand Collaborations", unit: "across MENA & global" },
  { value: 210, suffix: "%", label: "Engagement Growth", unit: "average across clients" },
  { value: 18, suffix: "+", label: "Retained Clients", unit: "long-term partnerships" },
];

function CountUp({
  target,
  suffix,
  active,
}: Readonly<{
  target: number;
  suffix: string;
  active: boolean;
}>) {
  const countRef = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || startedRef.current) return;
    startedRef.current = true;
    const el = countRef.current;
    if (!el) return;

    const duration = 2200; // slightly longer duration for custom deceleration feel
    const start = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // custom quartic ease-out
      el.textContent = Math.round(eased * target).toString();
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [active, target]);

  return (
    <>
      <span ref={countRef}>0</span>
      {suffix}
    </>
  );
}

function MetricItem({
  metric,
  index,
  active,
}: Readonly<{
  metric: typeof metrics[0];
  index: number;
  active: boolean;
}>) {
  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col p-24px relative border-b border-cream-dark/25 sm:border-b-0"
    >
      {/* Index marker */}
      <span className="font-manrope text-[10px] tracking-widest uppercase mb-16px text-cream-dark">
        0{index + 1} {/* IMPACT */}
      </span>
      {/* Stat */}
      <div
        className="font-bodoni font-light leading-none tracking-[-0.03em]"
        style={{ fontSize: "clamp(2.8rem, 5.5vw, 4.8rem)", color: "var(--espresso)" }}
      >
        <CountUp target={metric.value} suffix={metric.suffix} active={active} />
      </div>
      {/* Label */}
      <p className="font-manrope text-xs md:text-sm font-semibold tracking-wider mt-16px uppercase" style={{ color: "var(--espresso)" }}>
        {metric.label}
      </p>
      {/* Unit */}
      <p className="font-inter text-xs mt-8px leading-relaxed" style={{ color: "rgba(74,52,40,0.6)" }}>
        {metric.unit}
      </p>

      {/* Dynamic Animated Vertical Border (for desktop) */}
      {index < 3 && (
        <motion.div
          className="absolute right-0 top-6 bottom-6 w-[1px] bg-cream-dark/25 hidden md:block origin-top"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 + index * 0.15 }}
        />
      )}
    </motion.div>
  );
}

export default function Results() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      id="results"
      ref={sectionRef}
      className="section-pad relative overflow-hidden"
      style={{ backgroundColor: "var(--beige)" }}
      aria-label="Results and metrics"
    >
      {/* Decorative gradients */}
      <div
        className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full pointer-events-none filter blur-[80px] opacity-[0.2]"
        style={{ backgroundColor: "rgba(217,194,176,0.5)" }}
      />

      <div className="editorial-container">
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
            <span className="w-8 h-px inline-block" style={{ backgroundColor: "rgba(74,52,40,0.4)" }} />{" "}
            Performance
          </span>
          <h2 className="font-cormorant text-fluid-xl font-semibold leading-tight max-w-xl" style={{ color: "var(--espresso)" }}>
            Numbers that tell{" "}
            <span className="italic font-light">the story.</span>
          </h2>
        </motion.div>

        {/* Double-ruled Grid with dynamic line drawing reveals */}
        <div className="relative py-24px md:py-32px">
          {/* Top Line drawing animation */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[1.5px] bg-cream-dark/40 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8px md:gap-0"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {metrics.map((metric, i) => (
              <MetricItem key={metric.label} metric={metric} index={i} active={isInView} />
            ))}
          </motion.div>

          {/* Bottom Line drawing animation */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-cream-dark/40 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          />
        </div>

        {/* Editorial note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1 }}
          className="font-cormorant italic text-fluid-md mt-48px text-right max-w-lg ml-auto leading-relaxed"
          style={{ color: "rgba(74,52,40,0.6)" }}
        >
          &ldquo;Every number is a story of someone who chose to feel something.&rdquo;
        </motion.p>
      </div>
    </section>
  );
}

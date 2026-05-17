"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { insights } from "@/data/insights";
import { staggerContainer, scaleIn } from "@/lib/motion";

type InsightType = "quote" | "metric" | "sticky";

interface InsightCard {
  type: InsightType;
  rotation: number;
  text?: string;
  author?: string;
  stat?: string;
  label?: string;
}

function QuoteCard({ card }: Readonly<{ card: InsightCard }>) {
  return (
    <div
      className="editorial-card cursor-pointer h-full"
      style={{
        transform: `rotate(${card.rotation}deg)`,
      }}
    >
      <span className="font-manrope block text-[10px] tracking-widest uppercase mb-16px text-cream-dark">
        Quote // Philosophy
      </span>
      <p
        className="font-cormorant text-fluid-md italic leading-snug mb-16px"
        style={{ color: "var(--espresso)" }}
      >
        &ldquo;{card.text}&rdquo;
      </p>
      {card.author && (
        <p
          className="font-manrope text-xs tracking-widest uppercase"
          style={{ color: "rgba(74,52,40,0.85)" }}
        >
          — {card.author}
        </p>
      )}
    </div>
  );
}

function MetricCard({ card }: Readonly<{ card: InsightCard }>) {
  return (
    <div
      className="editorial-card-dark cursor-pointer h-full"
      style={{
        transform: `rotate(${card.rotation}deg)`,
      }}
    >
      <span className="font-manrope block text-[10px] tracking-widest uppercase mb-16px text-cream-dark">
        Metric // Evidence
      </span>
      <p
        className="font-cormorant text-5xl font-semibold leading-none mb-16px"
        style={{ color: "var(--ivory)" }}
      >
        {card.stat}
      </p>
      <p
        className="font-inter text-xs leading-relaxed"
        style={{ color: "rgba(250,247,244,0.85)" }}
      >
        {card.label}
      </p>
    </div>
  );
}

function StickyCard({ card }: Readonly<{ card: InsightCard }>) {
  return (
    <div
      className="editorial-card cursor-pointer h-full"
      style={{
        transform: `rotate(${card.rotation}deg)`,
        backgroundColor: "rgba(243, 233, 226, 0.85)",
        borderLeft: "4px solid var(--espresso)",
      }}
    >
      <span
        className="font-manrope block mb-16px text-[10px] tracking-widest uppercase"
        style={{ color: "var(--espresso)" }}
      >
        ✦ Note // Strategy
      </span>
      <p
        className="font-inter text-sm leading-relaxed"
        style={{ color: "rgba(74,52,40,0.9)" }}
      >
        {card.text}
      </p>
    </div>
  );
}

function InsightCardWrapper({
  card,
}: Readonly<{ card: InsightCard; index: number }>) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Setup spring physics for super-buttery inertia
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 25 });

  // Map motion spring value to degree range (-8deg to 8deg)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-8, 8]);

  // Sweep radial gloss glare gradients
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareOpacity = useTransform(mouseXSpring, [-0.5, 0, 0.5], [0.18, 0, 0.18]);
  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]) => `radial-gradient(circle at ${gx} ${gy}, rgba(255, 255, 255, 0.5) 0%, transparent 60%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={scaleIn}
      className="gpu w-full relative"
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        y: -10,
        scale: 1.012,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Heavy Tactile 3D shadow lift inside 3D space */}
      <div 
        className="absolute inset-2 -z-10 rounded-[16px] blur-md opacity-20 pointer-events-none transition-opacity duration-300"
        style={{
          background: "rgba(74, 52, 40, 0.16)",
          transform: "translateZ(-15px)"
        }}
      />
      
      {card.type === "quote" && <QuoteCard card={card} />}
      {card.type === "metric" && <MetricCard card={card} />}
      {card.type === "sticky" && <StickyCard card={card} />}

      {/* Sweeping gloss glaze overlay reflecting custom studio lighting */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-20 rounded-[16px] overflow-hidden mix-blend-overlay"
        style={{
          background: glareBackground,
          opacity: glareOpacity,
        }}
      />
    </motion.div>
  );
}

export default function PinnedInsights() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yOdd = useTransform(scrollYProgress, [0, 1], isDesktop ? [-45, 45] : [0, 0]);
  const yEven = useTransform(scrollYProgress, [0, 1], isDesktop ? [45, -45] : [0, 0]);

  // Distribute cards into columns
  const col0 = [insights[0], insights[4]];
  const col1 = [insights[1], insights[5]];
  const col2 = [insights[2], insights[6]];
  const col3 = [insights[3], insights[7]];

  return (
    <section
      id="insights"
      ref={containerRef}
      className="section-pad relative overflow-hidden"
      style={{ backgroundColor: "var(--ivory)" }}
      aria-label="Pinned strategy insights"
    >
      {/* Ambient decorations */}
      <div
        className="absolute -top-32 -right-32 w-64 h-64 rounded-full pointer-events-none"
        style={{
          backgroundColor: "rgba(243,233,226,0.4)",
          filter: "blur(48px)",
        }}
      />
      <div
        className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full pointer-events-none"
        style={{
          backgroundColor: "rgba(217,194,176,0.25)",
          filter: "blur(48px)",
        }}
      />

      <div className="editorial-container">
        {/* Section header */}
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
            <span
              className="w-8 h-px inline-block"
              style={{ backgroundColor: "rgba(74,52,40,0.4)" }}
            />{" "}
            Pinned Insights
          </span>
          <h2
            className="font-cormorant text-fluid-xl font-semibold leading-tight max-w-xl"
            style={{ color: "var(--espresso)" }}
          >
            What I believe about
            <br />
            <span className="italic font-light">digital desire.</span>
          </h2>
        </motion.div>

        {/* Flex grid columns with parallax scroll */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-24px"
          style={{ perspective: 1000, transformStyle: "preserve-3d" }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Column 0 */}
          <motion.div style={{ y: yEven }} className="flex flex-col gap-24px w-full">
            {col0.map((card, i) => (
              <InsightCardWrapper key={card.text || card.label} card={card as InsightCard} index={i * 4} />
            ))}
          </motion.div>

          {/* Column 1 */}
          <motion.div style={{ y: yOdd }} className="flex flex-col gap-24px w-full">
            {col1.map((card, i) => (
              <InsightCardWrapper key={card.text || card.label} card={card as InsightCard} index={i * 4 + 1} />
            ))}
          </motion.div>

          {/* Column 2 */}
          <motion.div style={{ y: yEven }} className="flex flex-col gap-24px w-full">
            {col2.map((card, i) => (
              <InsightCardWrapper key={card.text || card.label} card={card as InsightCard} index={i * 4 + 2} />
            ))}
          </motion.div>

          {/* Column 3 */}
          <motion.div style={{ y: yOdd }} className="flex flex-col gap-24px w-full">
            {col3.map((card, i) => (
              <InsightCardWrapper key={card.text || card.label} card={card as InsightCard} index={i * 4 + 3} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

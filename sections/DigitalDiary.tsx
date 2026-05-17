"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { diaryEntries } from "@/data/diary";
import { fadeUp, staggerContainer, slideInLeft, slideInRight } from "@/lib/motion";

function DiaryCard({
  entry,
  index,
  isDesktop,
}: Readonly<{ entry: (typeof diaryEntries)[0]; index: number; isDesktop: boolean }>) {
  const isEven = index % 2 === 0;
  const cardVariant = isDesktop ? (isEven ? slideInLeft : slideInRight) : fadeUp;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-6, 6]);

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareOpacity = useTransform(mouseXSpring, [-0.5, 0, 0.5], [0.15, 0, 0.15]);
  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]) => `radial-gradient(circle at ${gx} ${gy}, rgba(255, 255, 255, 0.22) 0%, transparent 65%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop) return;
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
    <motion.article
      variants={cardVariant}
      className="snap-item w-[82vw] md:w-auto shrink-0 relative cursor-pointer group"
      aria-label={entry.title}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
        rotateX: isDesktop ? rotateX : 0,
        rotateY: isDesktop ? rotateY : 0,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ 
        y: -10,
        scale: 1.01,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } 
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Colour swatch bar */}
      <div className="flex h-1.5 rounded-t-card overflow-hidden relative z-10">
        {entry.palette.map((color) => (
          <div
            key={color}
            className="flex-1"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {/* Card body */}
      <div
        className="editorial-card-dark rounded-t-none p-24px relative overflow-hidden"
        style={{
          transform: `rotate(${isEven ? -0.5 : 0.5}deg)`,
          borderTop: "none",
        }}
      >
        {/* Label */}
        <span
          className="font-manrope block mb-16px text-[10px] tracking-[0.2em] uppercase"
          style={{ color: "var(--cream-dark)" }}
        >
          {entry.label}
        </span>

        {/* Title */}
        <h3
          className="font-cormorant text-fluid-lg font-semibold leading-tight mb-16px"
          style={{ color: "var(--ivory)" }}
        >
          {entry.title}
        </h3>

        {/* Description */}
        <p
          className="font-inter text-sm leading-relaxed mb-24px"
          style={{ color: "rgba(250,247,244,0.8)" }}
        >
          {entry.description}
        </p>

        {/* Mood */}
        <div className="flex items-center gap-2 mb-24px">
          <span
            className="font-manrope text-[10px] tracking-[0.15em] uppercase"
            style={{ color: "rgba(217,194,176,0.6)" }}
          >
            Mood:
          </span>
          <span
            className="font-cormorant italic text-sm"
            style={{ color: "var(--cream)" }}
          >
            {entry.mood}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="font-manrope rounded-full px-3 py-1 text-[10px] tracking-widest uppercase"
              style={{
                backgroundColor: "rgba(74,52,40,0.4)",
                color: "var(--cream)",
                border: "1px solid rgba(217,194,176,0.15)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Decorative quote */}
        <div
          className="absolute -bottom-4 -right-4 w-16 h-16 flex items-center justify-center opacity-[0.03]"
          aria-hidden="true"
        >
          <span
            className="font-cormorant text-8xl"
            style={{ color: "var(--ivory)" }}
          >
            &rdquo;
          </span>
        </div>
      </div>

      {/* Sweeping gloss glare overlay for dark theme cards */}
      {isDesktop && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-20 rounded-card overflow-hidden mix-blend-overlay"
          style={{
            background: glareBackground,
            opacity: glareOpacity,
          }}
        />
      )}
    </motion.article>
  );
}

import ScrollGlowText from "@/components/ScrollGlowText";

export default function DigitalDiary() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const glowOpacity1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.03, 0.08, 0.03]);
  const glowOpacity2 = useTransform(scrollYProgress, [0, 0.5, 1], [0.02, 0.06, 0.02]);

  const headerY = useTransform(scrollYProgress, [0, 0.5], [40, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section
      id="diary"
      ref={sectionRef}
      className="section-pad luxury-dark-section"
      aria-label="Digital diary and moodboards"
    >
      {/* Warm ambient studio lighting glows */}
      <motion.div
        className="absolute top-0 left-1/4 w-[45vw] h-[45vw] rounded-full pointer-events-none filter blur-[120px]"
        style={{ backgroundColor: "var(--cream)", opacity: glowOpacity1 }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[40vw] h-[40vw] rounded-full pointer-events-none filter blur-[120px]"
        style={{ backgroundColor: "var(--espresso-light)", opacity: glowOpacity2 }}
      />

      <div className="editorial-container luxury-dark-content">
        {/* Header */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="mb-48px"
        >
          <span
            className="font-manrope text-fluid-sm tracking-[0.2em] flex items-center gap-3 mb-16px"
            style={{ color: "var(--cream-dark)" }}
          >
            <span
              className="w-8 h-px inline-block"
              style={{ backgroundColor: "rgba(217,194,176,0.3)" }}
            />{" "}
            Digital Diary
          </span>
          <h2
            className="font-cormorant text-fluid-xl font-semibold leading-tight max-w-2xl"
            style={{ color: "var(--ivory)" }}
          >
            My private archive of{" "}
            <span className="italic font-light text-cream">
              campaign thinking.
            </span>
          </h2>
          <ScrollGlowText
            text="Where strategy meets intuition — a collection of ideas, moodboards, and moments that shaped brands people love."
            className="font-inter text-sm mt-16px max-w-md leading-relaxed"
            theme="dark"
          />
        </motion.div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden">
          <div className="snap-container gap-16px pb-6 -mx-6 px-6">
            {diaryEntries.map((entry, i) => (
              <DiaryCard key={entry.id} entry={entry} index={i} isDesktop={isDesktop} />
            ))}
          </div>
          <p
            className="font-manrope text-xs tracking-widest text-center mt-16px"
            style={{ color: "rgba(217,194,176,0.4)" }}
          >
            Swipe to explore →
          </p>
        </div>

        {/* Desktop: editorial grid */}
        <motion.div
          className="hidden md:grid grid-cols-2 gap-32px"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {diaryEntries.map((entry, i) => (
            <DiaryCard key={entry.id} entry={entry} index={i} isDesktop={isDesktop} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

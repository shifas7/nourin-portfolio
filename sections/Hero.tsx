"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { fadeUp, staggerContainer, textReveal } from "@/lib/motion";
import { useMouseParallax } from "@/hooks/useMouseParallax";

const ParticleScene = dynamic(() => import("@/components/ParticleScene"), {
  ssr: false,
});

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useMouseParallax(0.015);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const badgeY1 = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const badgeY2 = useTransform(scrollYProgress, [0, 1], [0, -80]);

  // Split text variables
  const nameStaggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.15,
      },
    },
  };

  const letterReveal = {
    hidden: { y: "115%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const clipReveal = {
    hidden: { y: "100%" },
    visible: {
      y: "0%",
      transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "var(--ivory)" }}
      aria-label="Hero introduction"
    >
      {/* Particle atmosphere */}
      <ParticleScene />

      {/* Background warm wash */}
      <div
        className="absolute inset-0 z-1"
        style={{
          background:
            "linear-gradient(135deg, rgba(243,233,226,0.5) 0%, rgba(250,247,244,0.92) 50%, rgba(250,247,244,0.7) 100%)",
        }}
      />

      {/* Portrait image */}
      <motion.div
        className="absolute right-0 top-0 w-full md:w-[55%] h-[70vh] md:h-full z-2 gpu"
        style={{ scale: imageScale, opacity: imageOpacity }}
      >
        <motion.div
          ref={imageRef as React.RefObject<HTMLDivElement>}
          className="w-full h-full gpu relative"
          style={{ position: "relative" }}
        >
          <Image
            src="/images/nourin-hero-enhanced.png"
            alt="Nourin Nassar — Digital Marketing Strategist"
            fill
            priority
            quality={100}
            sizes="(max-width: 768px) 100vw, 55vw"
            className="object-cover object-center md:object-[center_25%]"
            style={{
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 68%, rgba(0,0,0,0.3) 90%, rgba(0,0,0,0) 100%), linear-gradient(to left, rgba(0,0,0,1) 75%, rgba(0,0,0,0.1) 94%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 68%, rgba(0,0,0,0.3) 90%, rgba(0,0,0,0) 100%), linear-gradient(to left, rgba(0,0,0,1) 75%, rgba(0,0,0,0.1) 94%, rgba(0,0,0,0) 100%)",
              maskComposite: "intersect",
              WebkitMaskComposite: "destination-in",
              filter:
                "contrast(1.08) brightness(0.94) saturate(1.02) sepia(0.04)",
            }}
          />
          {/* Subtle editorial vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 60% 30%, transparent 45%, rgba(74,52,40,0.16) 100%)",
              mixBlendMode: "multiply",
            }}
          />
          {/* Warm tint overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(74,52,40,0.06) 0%, transparent 60%, rgba(217,194,176,0.15) 100%)",
              mixBlendMode: "multiply",
            }}
          />
          {/* Grain on image */}
          <div
            className="absolute inset-0 paper-texture opacity-[0.05]"
            style={{ mixBlendMode: "overlay" }}
          />
        </motion.div>
      </motion.div>

      {/* Typography Layer locked inside global editorial container */}
      <div className="editorial-container relative z-3 flex flex-col justify-end md:justify-center min-h-screen pb-16 md:pb-0">
        <motion.div
          style={{ y: textY }}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col max-w-xl md:max-w-2xl"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp} className="mb-16px">
            <span
              className="inline-flex items-center gap-2 font-manrope text-fluid-sm tracking-[0.2em]"
              style={{ color: "rgba(74,52,40,0.72)" }}
            >
              <span
                className="w-8 h-px"
                style={{
                  backgroundColor: "rgba(74,52,40,0.4)",
                  display: "inline-block",
                }}
              />{" "}
              Portfolio {new Date().getFullYear()}
            </span>
          </motion.div>

          {/* Name */}
          <motion.div
            variants={nameStaggerContainer}
            className="flex flex-nowrap mb-8px overflow-hidden"
          >
            <h1
              className="font-cormorant text-fluid-hero font-semibold leading-none tracking-[-0.03em] flex flex-nowrap whitespace-nowrap"
              style={{ color: "var(--espresso)" }}
            >
              {"NOURIN".split("").map((char, index) => (
                <span key={index} className="inline-block overflow-hidden relative pb-4 -mb-4">
                  <motion.span
                    variants={letterReveal}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                </span>
              ))}
            </h1>
          </motion.div>
          <motion.div
            variants={nameStaggerContainer}
            className="flex flex-nowrap md:ml-[8vw] overflow-hidden"
          >
            <div
              className="font-cormorant text-fluid-hero font-light leading-none tracking-[-0.02em] flex flex-nowrap whitespace-nowrap"
              style={{ color: "rgba(74,52,40,0.36)" }}
            >
              {"NASSAR".split("").map((char, index) => (
                <span key={index} className="inline-block overflow-hidden relative pb-4 -mb-4">
                  <motion.span
                    variants={letterReveal}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                </span>
              ))}
            </div>
          </motion.div>

          {/* Role */}
          <motion.p
            variants={fadeUp}
            className="font-inter text-fluid-sm tracking-[0.15em] uppercase mt-24px"
            style={{ color: "rgba(74,52,40,0.85)" }}
          >
            Digital Marketing Strategist &nbsp;·&nbsp; Brand Storyteller
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={staggerContainer}
            className="font-bodoni text-fluid-md italic mt-16px max-w-[320px] md:max-w-[420px] leading-relaxed flex flex-col gap-1"
            style={{ color: "rgba(74,52,40,0.9)", fontStyle: "italic" }}
          >
            <span className="block overflow-hidden relative pb-1">
              <motion.span variants={clipReveal} className="block">
                &ldquo;I don&apos;t market products.
              </motion.span>
            </span>
            <span className="block overflow-hidden relative pb-1">
              <motion.span variants={clipReveal} className="block text-cream-dark font-normal">
                I create digital desire.&rdquo;
              </motion.span>
            </span>
          </motion.p>

          {/* Available badge */}
          <motion.div variants={fadeUp} className="mt-32px inline-flex">
            <span
              className="inline-flex items-center gap-3 font-manrope text-xs tracking-[0.12em] uppercase rounded-full"
              style={{
                backgroundColor: "var(--espresso)",
                color: "var(--ivory)",
                boxShadow: "0 4px 12px rgba(74,52,40,0.15)",
                padding: "10px 24px",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
                style={{ backgroundColor: "rgba(217,194,176,0.8)" }}
              />
              <span style={{ marginRight: "-0.12em" }}>Available for projects</span>
            </span>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={fadeUp}
            className="mt-48px flex items-center gap-3"
          >
            <motion.div
              className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
              style={{ border: "1px solid rgba(74,52,40,0.4)" }}
              aria-hidden="true"
            >
              <motion.div
                className="w-1 h-2 rounded-full"
                style={{ backgroundColor: "rgba(74,52,40,0.6)" }}
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            <span
              className="font-manrope text-xs tracking-widest uppercase"
              style={{ color: "rgba(74,52,40,0.5)" }}
            >
              Scroll
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating editorial notes */}
      <motion.div
        initial={{ opacity: 0, rotate: -4, x: 20 }}
        animate={{ opacity: 1, rotate: -4, x: 0 }}
        transition={{ delay: 1.8, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ y: badgeY1 }}
        className="absolute bottom-[28%] right-6 md:right-[48%] z-4 hidden sm:block"
      >
        <div
          className="backdrop-blur-sm rounded-[12px] px-4 py-3 max-w-[160px]"
          style={{
            backgroundColor: "rgba(250,247,244,0.82)",
            border: "1px solid rgba(217,194,176,0.6)",
            boxShadow: "0 8px 32px rgba(74,52,40,0.1)",
          }}
        >
          <p
            className="font-cormorant italic text-sm leading-snug"
            style={{ color: "rgba(74,52,40,0.8)" }}
          >
            ✦ Strategy rooted in emotion
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, rotate: 3, x: -20 }}
        animate={{ opacity: 1, rotate: 3, x: 0 }}
        transition={{ delay: 2.1, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ y: badgeY2 }}
        className="absolute top-[25%] right-8 md:right-[10%] z-4 hidden md:block"
      >
        <div
          className="rounded-[12px] px-4 py-3 max-w-[150px]"
          style={{
            backgroundColor: "var(--espresso)",
            color: "var(--ivory)",
            boxShadow: "0 8px 32px rgba(74,52,40,0.25)",
          }}
        >
          <p
            className="font-manrope text-xs tracking-wide leading-snug"
            style={{ opacity: 0.9 }}
          >
            12M+ organic reach
          </p>
        </div>
      </motion.div>
    </section>
  );
}

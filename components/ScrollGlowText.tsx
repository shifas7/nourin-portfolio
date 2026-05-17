"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface ScrollGlowTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  theme?: "light" | "dark";
}

export default function ScrollGlowText({
  text,
  className = "",
  style = {},
  theme = "light",
}: Readonly<ScrollGlowTextProps>) {
  const elementRef = useRef<HTMLParagraphElement>(null);
  
  // Track scroll position of the paragraph element
  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: ["start 88%", "start 40%"],
  });

  const words = text.split(" ");
  
  const baseColor = theme === "light" ? "rgba(74, 52, 40, 0.28)" : "rgba(250, 247, 244, 0.25)";
  const activeColor = theme === "light" ? "rgba(74, 52, 40, 0.95)" : "rgba(250, 247, 244, 0.95)";

  return (
    <p
      ref={elementRef}
      className={className}
      style={{
        ...style,
        display: "flex",
        flexWrap: "wrap",
        columnGap: "0.32em",
        rowGap: "0.12em",
        wordBreak: "break-word",
        overflowWrap: "break-word",
      }}
    >
      {words.map((word, i) => {
        // Map individual word thresholds
        const start = i / words.length;
        const end = (i + 1.2) / words.length;

        // High performance transforms driven by scrollYProgress
        const opacity = useTransform(scrollYProgress, [start, end], [0.35, 1]);
        const color = useTransform(
          scrollYProgress as MotionValue<number>,
          [start, end],
          [baseColor, activeColor]
        );

        return (
          <motion.span
            key={i}
            style={{ opacity, color }}
            className="inline-block transition-all duration-200"
          >
            {word}
          </motion.span>
        );
      })}
    </p>
  );
}

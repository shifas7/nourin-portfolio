"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user has already visited in this session
    if (typeof window !== "undefined") {
      const hasVisited = window.sessionStorage.getItem("noi-preloaded");
      if (hasVisited === "true") {
        setLoading(false);
        return;
      }
    }

    // Block scrolling while preloader runs
    window.document.body.style.overflow = "hidden";

    // Set a timer to finish preloading
    const timer = setTimeout(() => {
      setLoading(false);
      window.document.body.style.overflow = "";
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem("noi-preloaded", "true");
      }
    }, 3200);

    return () => {
      clearTimeout(timer);
      window.document.body.style.overflow = "";
    };
  }, []);

  const words = "I don't market products. I create digital desire.".split(" ");

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.8,
      },
    },
  };

  const wordVariants = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] as const } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-matte paper-texture overflow-hidden"
          style={{ backgroundColor: "#121212" }}
        >
          {/* Subtle noise and light glow */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              background: "radial-gradient(circle at center, var(--cream) 0%, transparent 70%)",
            }}
          />

          <div className="flex flex-col items-center max-w-[90vw] md:max-w-xl text-center relative z-10 px-4">
            {/* Elegant SVG star drawing itself */}
            <svg
              viewBox="0 0 100 100"
              className="w-12 h-12 md:w-16 md:h-16 mb-8 text-cream-dark"
              aria-hidden="true"
            >
              <motion.path
                d="M 50 12 L 53.5 38 L 79 38 L 58.5 53 L 66 79 L 50 63 L 34 79 L 41.5 53 L 21 38 L 46.5 38 Z"
                stroke="currentColor"
                strokeWidth="1.2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 1, 1] }}
                transition={{
                  pathLength: { duration: 1.8, ease: "easeInOut" },
                  opacity: { duration: 1.0, ease: "easeIn" },
                }}
              />
              <motion.circle
                cx="50"
                cy="50"
                r="3"
                className="fill-cream"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.6, ease: "easeOut" }}
              />
            </svg>

            {/* Cinematic statement */}
            <motion.h2
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="font-cormorant italic text-xl md:text-2xl font-light leading-relaxed text-ivory tracking-wide flex flex-wrap justify-center gap-x-2 gap-y-1"
            >
              {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden pb-1">
                  <motion.span
                    variants={wordVariants}
                    className="inline-block font-light"
                    style={{
                      color: word.includes("desire") ? "var(--cream)" : "var(--ivory)",
                      fontWeight: word.includes("desire") ? 400 : 300
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.h2>

            {/* Tiny brand wordmark */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 2.2, duration: 1.0 }}
              className="mt-12 flex flex-col items-center gap-1.5"
            >
              <span className="font-manrope text-[8px] tracking-[0.3em] text-cream-dark uppercase">
                NOURIN NASSAR
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

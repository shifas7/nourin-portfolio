"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type HoverType = "default" | "magnetic" | "view" | "drag";

export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const hoveredElRef = useRef<HTMLElement | null>(null);

  const [cursorState, setCursorState] = useState<{
    type: HoverType;
    label: string;
    isDark: boolean;
  }>({
    type: "default",
    label: "",
    isDark: false,
  });

  useEffect(() => {
    // Only enable on pointer-fine devices (desktops)
    if (!globalThis.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Position the core pointer dot instantly
      dot.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
    };

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const animate = () => {
      if (hoveredElRef.current && hoveredElRef.current.tagName !== "DIV") {
        // --- Magnetic Snap State ---
        // Lerp toward the exact center of the hovered element
        const rect = hoveredElRef.current.getBoundingClientRect();
        const targetX = rect.left + rect.width / 2;
        const targetY = rect.top + rect.height / 2;

        ringX = lerp(ringX, targetX, 0.22);
        ringY = lerp(ringY, targetY, 0.22);

        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        
        // Morph the dimensions and border-radius to wrap the button snugly
        const elRadius = window.getComputedStyle(hoveredElRef.current).borderRadius;
        ring.style.width = `${rect.width + 12}px`;
        ring.style.height = `${rect.height + 12}px`;
        ring.style.borderRadius = elRadius !== "0px" ? elRadius : "8px";
      } else {
        // --- Default/View/Drag Tracking State ---
        ringX = lerp(ringX, mouseX, 0.1);
        ringY = lerp(ringY, mouseY, 0.1);

        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      requestAnimationFrame(animate);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Find closest interactive parent
      const interactive = target.closest("a, button, [role='button'], .snap-item, .editorial-card, .editorial-card-dark, [data-cursor-drag]");
      
      // Dynamic contrast detection based on container background
      const isDarkBackground = !!target.closest(".luxury-dark-section, .editorial-card-dark");
      setCursorState(prev => ({ ...prev, isDark: isDarkBackground }));

      if (!interactive) {
        hoveredElRef.current = null;
        return;
      }

      const isCard = 
        interactive.classList.contains("snap-item") || 
        interactive.classList.contains("editorial-card") || 
        interactive.classList.contains("editorial-card-dark") ||
        interactive.closest(".snap-item, .editorial-card, .editorial-card-dark") !== null;

      const isDragZone = 
        interactive.hasAttribute("data-cursor-drag") || 
        interactive.closest("[data-cursor-drag]") !== null ||
        interactive.id === "testimonials" || 
        interactive.closest("#testimonials") !== null;

      if (isCard) {
        // Morph into big VIEW bubble
        hoveredElRef.current = null;
        setCursorState({ type: "view", label: "VIEW // ✦", isDark: isDarkBackground });
        
        dot.style.opacity = "0";
        ring.style.width = "84px";
        ring.style.height = "84px";
        ring.style.borderRadius = "50%";
        ring.style.opacity = "0.95";
        ring.style.backgroundColor = isDarkBackground ? "rgba(250, 247, 244, 0.12)" : "rgba(74, 52, 40, 0.08)";
      } else if (isDragZone && !interactive.closest("a, button")) {
        // Morph into big DRAG bubble
        hoveredElRef.current = null;
        setCursorState({ type: "drag", label: "DRAG // ↔", isDark: isDarkBackground });
        
        dot.style.opacity = "0";
        ring.style.width = "84px";
        ring.style.height = "84px";
        ring.style.borderRadius = "50%";
        ring.style.opacity = "0.95";
        ring.style.backgroundColor = isDarkBackground ? "rgba(250, 247, 244, 0.12)" : "rgba(74, 52, 40, 0.08)";
      } else {
        // Snap magnetically onto small buttons/links
        hoveredElRef.current = interactive as HTMLElement;
        setCursorState({ type: "magnetic", label: "", isDark: isDarkBackground });
        
        dot.style.opacity = "0";
        ring.style.opacity = "1";
        ring.style.backgroundColor = "transparent";
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactive = target.closest("a, button, [role='button'], .snap-item, .editorial-card, .editorial-card-dark, [data-cursor-drag]");
      if (!interactive) return;

      // Restore defaults
      hoveredElRef.current = null;
      setCursorState({ type: "default", label: "", isDark: !!target.closest(".luxury-dark-section") });

      dot.style.opacity = "1";
      ring.style.opacity = "0.5";
      ring.style.width = "36px";
      ring.style.height = "36px";
      ring.style.borderRadius = "50%";
      ring.style.backgroundColor = "transparent";
    };

    globalThis.addEventListener("mousemove", onMouseMove, { passive: true });
    globalThis.addEventListener("mouseover", handleMouseOver, { passive: true });
    globalThis.addEventListener("mouseout", handleMouseOut, { passive: true });
    
    const animationFrameId = requestAnimationFrame(animate);

    return () => {
      globalThis.removeEventListener("mousemove", onMouseMove);
      globalThis.removeEventListener("mouseover", handleMouseOver);
      globalThis.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Custom Core Pointer Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block w-2 h-2 rounded-full transition-opacity duration-300"
        style={{
          backgroundColor: cursorState.isDark ? "var(--cream)" : "var(--espresso)",
          mixBlendMode: "normal"
        }}
        aria-hidden="true"
      />

      {/* Custom Morphing Frame Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block border rounded-full flex items-center justify-center text-center overflow-hidden"
        style={{
          width: "36px",
          height: "36px",
          borderColor: cursorState.isDark ? "var(--cream)" : "var(--espresso)",
          opacity: 0.5,
          transition: "width 0.35s cubic-bezier(0.22, 1, 0.36, 1), height 0.35s cubic-bezier(0.22, 1, 0.36, 1), border-radius 0.35s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease",
        }}
        aria-hidden="true"
      >
        <AnimatePresence>
          {cursorState.label && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="font-manrope font-bold text-[8px] tracking-[0.2em] uppercase shrink-0"
              style={{
                color: cursorState.isDark ? "var(--cream)" : "var(--espresso)",
                whiteSpace: "nowrap"
              }}
            >
              {cursorState.label}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

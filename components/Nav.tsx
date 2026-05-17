"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SOCIAL_LINKS } from "@/constants";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Disable body scroll when full-screen mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 sm:py-4 shadow-[0_4px_30px_rgba(74,52,40,0.06)] border-b"
            : "py-4 sm:py-6 md:py-8"
        }`}
        style={{
          backgroundColor: scrolled
            ? "rgba(250, 247, 244, 0.88)"
            : "rgba(250, 247, 244, 0.2)",
          backdropFilter: scrolled ? "blur(20px)" : "blur(8px)",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "blur(8px)",
          borderColor: scrolled
            ? "rgba(217, 194, 176, 0.3)"
            : "rgba(217, 194, 176, 0.08)",
        }}
      >
        <div className="editorial-container flex items-center justify-between w-full">
          {/* Brand Wordmark Logo */}
          <button
            onClick={() => handleNavClick("#hero")}
            className="flex flex-col items-start gap-0.5 text-left group cursor-pointer focus:outline-none min-w-0"
            aria-label="Go to top"
          >
            <span className="font-cormorant font-bold italic text-base sm:text-xl tracking-wider text-espresso transition-colors duration-300 group-hover:text-espresso-light whitespace-nowrap">
              N. NASSAR
            </span>
            <span className="font-manrope text-[7px] sm:text-[8px] font-bold tracking-[0.25em] text-espresso/50 transition-colors duration-300 group-hover:text-espresso-light/70 uppercase whitespace-nowrap">
              DIGITAL STRATEGIST
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-3 lg:gap-5"
            onMouseLeave={() => setHoveredLink(null)}
            aria-label="Desktop main navigation"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                onMouseEnter={() => setHoveredLink(link.label)}
                className="relative font-manrope text-[11px] font-bold tracking-[0.15em] uppercase px-2 py-4 text-espresso/70 hover:text-espresso transition-colors duration-300 cursor-pointer focus:outline-none flex items-center justify-center group"
              >
                <span className="relative z-10 block">
                  {link.label}
                  {/* Proper underline directly under the text */}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-espresso transition-all duration-300 ease-out group-hover:w-full pointer-events-none" />
                </span>
                {hoveredLink === link.label && (
                  <motion.div
                    layoutId="nav-hover-circle"
                    className="absolute border border-espresso/30 rounded-full z-0 pointer-events-none bg-espresso/1.5"
                    style={{ width: "56px", height: "56px" }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Elements */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Desktop CTA Button */}
            <button
              onClick={() => handleNavClick("#contact")}
              className="hidden sm:inline-flex items-center justify-center font-manrope text-[10px] font-bold tracking-[0.15em] uppercase rounded-full border border-espresso text-espresso hover:bg-cream-dark hover:text-espresso transition-all duration-300 shadow-[0_2px_10px_rgba(74,52,40,0.03)] hover:shadow-[0_4px_15px_rgba(74,52,40,0.1)] active:scale-95 cursor-pointer focus:outline-none"
              style={{ padding: "10px" }}
            >
              Get In Touch
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden relative w-9 h-9 flex flex-col items-center justify-center rounded-full border border-espresso/25 hover:border-espresso/45 bg-ivory/30 hover:bg-ivory/60 transition-all duration-300 z-50 cursor-pointer focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              <div className="w-4 h-3 relative flex flex-col justify-between">
                <motion.span
                  animate={
                    menuOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="block w-4 h-px bg-espresso"
                />
                <motion.span
                  animate={
                    menuOpen
                      ? { opacity: 0, scale: 0.8 }
                      : { opacity: 1, scale: 1 }
                  }
                  transition={{ duration: 0.2 }}
                  className="block w-4 h-px bg-espresso"
                />
                <motion.span
                  animate={
                    menuOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="block w-4 h-px bg-espresso"
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Cinematic Full-Screen Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-ivory flex flex-col justify-between p-6 sm:p-10 pt-28 md:hidden paper-texture"
          >
            {/* Top Branding / Section Indicator */}
            <div className="flex flex-col gap-2">
              <span className="font-manrope text-[9px] font-bold tracking-[0.2em] text-espresso/40 uppercase">
                Digital Portfolio
              </span>
              <div className="w-12 h-px bg-cream/50" />
            </div>

            {/* Huge Cinematic Menu Links */}
            <nav
              className="flex flex-col gap-4 my-auto"
              aria-label="Mobile main navigation"
            >
              {NAV_LINKS.map((link, i) => (
                <div key={link.label} className="overflow-hidden py-1">
                  <motion.button
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.15 + i * 0.08,
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={() => handleNavClick(link.href)}
                    className="font-cormorant text-4xl sm:text-5xl italic font-semibold text-espresso hover:text-espresso-light text-left transition-colors duration-300 w-full flex items-center justify-between group cursor-pointer focus:outline-none relative"
                  >
                    <span className="relative inline-block">
                      {link.label}
                      <span className="absolute left-0 bottom-1 w-0 h-[2px] bg-espresso/30 transition-all duration-500 ease-out group-hover:w-full" />
                    </span>
                    <span className="text-xl opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-cream-dark">
                      →
                    </span>
                  </motion.button>
                </div>
              ))}
            </nav>

            {/* Bottom Statement & Quick Links */}
            <div className="flex flex-col gap-6 mt-auto">
              <div className="w-full h-px bg-cream/25" />

              <div className="flex flex-col gap-4">
                <p className="font-cormorant italic text-base sm:text-lg text-espresso/70 leading-relaxed max-w-sm">
                  "I don't market products. I create digital desire."
                </p>

                <div className="flex flex-col gap-2 pt-2">
                  <span className="font-manrope text-[9px] font-bold tracking-widest text-espresso/40 uppercase">
                    Connect
                  </span>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {SOCIAL_LINKS.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-manrope text-xs font-bold tracking-wider text-espresso/70 hover:text-espresso transition-colors duration-200"
                      >
                        {social.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

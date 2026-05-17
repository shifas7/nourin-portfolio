"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { SOCIAL_LINKS } from "@/constants";
import ScrollGlowText from "@/components/ScrollGlowText";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    brief: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="pt-72px md:pt-96px lg:pt-140px pb-0px luxury-dark-section overflow-hidden"
      aria-label="Contact Nourin Nassar"
    >
      {/* Cinematic warm studio lights — clamped so they never break mobile layout */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full pointer-events-none filter blur-[80px] md:blur-[120px] opacity-[0.08]"
        style={{
          backgroundColor: "var(--cream)",
          width: "min(800px, 90vw)",
          height: "min(400px, 50vw)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 rounded-full pointer-events-none filter blur-[70px] md:blur-[100px] opacity-[0.04]"
        style={{
          backgroundColor: "var(--espresso-light)",
          width: "min(400px, 60vw)",
          height: "min(400px, 60vw)",
        }}
      />

      <div className="editorial-container luxury-dark-content">
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-48px lg:gap-72px items-start">
          
          {/* Left Column (5 cols): Typography & Direct Coordinates */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="lg:col-span-5 flex flex-col justify-between h-full space-y-8 lg:space-y-12"
          >
            <div>
              {/* Category indicator with elegant lines */}
              <motion.span
                variants={fadeUp}
                className="font-manrope text-fluid-sm tracking-[0.25em] flex items-center gap-3 mb-24px"
                style={{ color: "var(--cream-dark)" }}
              >
                Contact // Dialogue{" "}
                <motion.span
                  className="h-px bg-cream-dark/30 origin-left inline-block"
                  style={{ width: "32px" }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                />
              </motion.span>

              {/* Cinematic Heading */}
              <motion.h2
                variants={fadeUp}
                className="font-cormorant text-fluid-display font-semibold leading-[1.05] tracking-[-0.015em] mb-24px text-left wrap-break-word hyphens-auto"
                style={{ color: "var(--ivory)" }}
              >
                Let&apos;s build something
                <br />
                <span className="italic font-light text-cream">
                  people remember.
                </span>
              </motion.h2>

              {/* Descriptive Paragraph */}
              <ScrollGlowText
                text="Whether it's a brand launch, a campaign overhaul, or finding your digital voice — I'd love to hear about it."
                className="font-inter text-sm md:text-base leading-relaxed text-left max-w-lg"
                theme="dark"
              />
            </div>

            {/* Direct Coordinates Block with animated border and stagger entry */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6 pt-8 text-left relative"
            >
              {/* Dynamic border-top draw */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[1px] bg-cream-dark/15 origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              />

              <motion.div variants={fadeUp}>
                <span className="font-manrope text-[10px] tracking-[0.2em] uppercase text-cream-dark/60 block mb-8px">
                  Direct Coordinates
                </span>
                <a
                  href="mailto:hello@nourinnassar.com"
                  className="font-cormorant text-2xl md:text-3xl italic text-cream hover:text-ivory transition-all duration-300 relative inline-block group"
                >
                  hello@nourinnassar.com
                  <span className="absolute left-0 bottom-0 w-full h-px bg-cream scale-x-100 origin-left transition-transform duration-500 group-hover:scale-x-0" />{" "}
                  <span className="absolute left-0 bottom-0 w-full h-px bg-ivory scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />{" "}
                </a>
              </motion.div>

              <motion.div variants={fadeUp}>
                <span className="font-manrope text-[10px] tracking-[0.2em] uppercase text-cream-dark/60 block mb-6px">
                  Location & Availability
                </span>
                <p className="font-inter text-sm text-ivory/80">
                  Based in Dubai & Beirut // Available globally
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column (7 cols): The Contact Form */}
          <div className="lg:col-span-7 w-full">
            {/* Form or Success */}
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-center py-48px bg-matte-soft/20 rounded-card border border-cream-dark/10 p-32px"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-24px"
                  style={{
                    backgroundColor: "var(--espresso)",
                    border: "1px solid rgba(217,194,176,0.3)",
                  }}
                >
                  <span style={{ color: "var(--cream)", fontSize: "24px" }}>
                    ✦
                  </span>
                </div>
                <h3
                  className="font-cormorant text-3xl font-semibold mb-16px"
                  style={{ color: "var(--ivory)" }}
                >
                  Message received.
                </h3>
                <p
                  className="font-inter text-sm"
                  style={{ color: "rgba(250,247,244,0.6)" }}
                >
                  I&apos;ll be in touch soon. Thank you for reaching out.
                </p>
              </motion.div>
            ) : (
              <motion.form
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                onSubmit={handleSubmit}
                className="grid gap-32px lg:gap-48px"
                aria-label="Contact form"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-32px">
                  {/* Name */}
                  <motion.div variants={fadeUp} className="relative group">
                    <label
                      htmlFor="contact-name"
                      className="font-manrope text-[10px] tracking-[0.2em] uppercase text-cream-dark block mb-8px text-left"
                    >
                      My name is
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      className="w-full bg-transparent border-none text-ivory text-sm md:text-base outline-none placeholder-cream-dark/25 text-left relative z-10"
                      style={{ paddingTop: "12px", paddingBottom: "12px" }}
                      placeholder="Your name"
                    />
                    {/* Animated Baseline */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-cream-dark/25 origin-left"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                    />
                    {/* Focus Accent Border */}
                    <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-cream scale-x-0 origin-left transition-transform duration-500 group-focus-within:scale-x-100 z-20" />
                  </motion.div>

                  {/* Email */}
                  <motion.div variants={fadeUp} className="relative group">
                    <label
                      htmlFor="contact-email"
                      className="font-manrope text-[10px] tracking-[0.2em] uppercase text-cream-dark block mb-8px text-left"
                    >
                      Reach me at
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      className="w-full bg-transparent border-none text-ivory text-sm md:text-base outline-none placeholder-cream-dark/25 text-left relative z-10"
                      style={{ paddingTop: "12px", paddingBottom: "12px" }}
                      placeholder="hello@brand.com"
                    />
                    {/* Animated Baseline */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-cream-dark/25 origin-left"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    />
                    {/* Focus Accent Border */}
                    <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-cream scale-x-0 origin-left transition-transform duration-500 group-focus-within:scale-x-100 z-20" />
                  </motion.div>
                </div>

                {/* Project Brief */}
                <motion.div variants={fadeUp} className="relative group">
                  <label
                    htmlFor="contact-brief"
                    className="font-manrope text-[10px] tracking-[0.2em] uppercase text-cream-dark block mb-8px text-left"
                  >
                    About my campaign / project brief
                  </label>
                  <textarea
                    id="contact-brief"
                    rows={4}
                    value={formState.brief}
                    onChange={(e) =>
                      setFormState({ ...formState, brief: e.target.value })
                    }
                    className="w-full bg-transparent border-none text-ivory text-sm md:text-base outline-none placeholder-cream-dark/25 resize-none text-left relative z-10"
                    style={{ paddingTop: "12px", paddingBottom: "12px" }}
                    placeholder="Describe your vision, target timeline, or core values..."
                  />
                  {/* Animated Baseline */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-cream-dark/25 origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
                  />
                  {/* Focus Accent Border */}
                  <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-cream scale-x-0 origin-left transition-transform duration-500 group-focus-within:scale-x-100 z-20" />
                </motion.div>

                {/* Submit */}
                <motion.div variants={fadeUp} className="text-left">
                  <button
                    type="submit"
                    className="w-full sm:w-auto font-manrope text-xs tracking-[0.18em] uppercase rounded-full font-medium transition-all duration-500 active:scale-[0.98] cursor-pointer"
                    style={{
                      backgroundColor: "var(--ivory)",
                      color: "var(--espresso)",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
                      padding: "16px 32px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--cream)";
                      e.currentTarget.style.boxShadow =
                          "0 8px 32px rgba(217, 194, 176, 0.45)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--ivory)";
                      e.currentTarget.style.boxShadow =
                          "0 4px 20px rgba(0, 0, 0, 0.25)";
                    }}
                  >
                    Send Message ✦
                  </button>
                </motion.div>
              </motion.form>
            )}
          </div>
        </div>

        {/* Full-Width Grounded Footer */}
        <footer className="mt-48px md:mt-72px lg:mt-96px pt-48px border-t border-cream-dark/15 pb-32px">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-32px">
            {/* Brand Signature */}
            <div className="flex flex-col items-start gap-1">
              <span className="font-cormorant font-bold italic text-xl tracking-wider text-ivory">
                N. NASSAR
              </span>
              <span className="font-manrope text-[8px] font-bold tracking-[0.25em] text-cream-dark/50 uppercase">
                DIGITAL STRATEGIST // STORYTELLER
              </span>
            </div>

            {/* Social Links Row */}
            <div className="flex flex-wrap items-center gap-12px md:gap-16px">
              {SOCIAL_LINKS.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative flex items-center justify-center px-16px py-8px rounded-full border border-cream-dark/15 hover:border-cream/45 bg-matte-soft/20 hover:bg-cream-dark/5 transition-all duration-300 font-manrope text-[10px] font-bold tracking-[0.18em] uppercase text-cream-dark/70 hover:text-ivory"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cream-dark/40 group-hover:bg-cream transition-colors duration-300" />
                    {link.label}
                    <span className="inline-block transform transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[8px] text-cream-dark/60 group-hover:text-ivory">
                      ↗
                    </span>
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Lower Copyright Line */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-16px mt-32px md:mt-48px pt-24px border-t border-cream-dark/5">
            <p className="font-manrope text-[10px] tracking-widest text-cream-dark/30">
              © 2026 Nourin Nassar · All Rights Reserved
            </p>
            <p className="font-manrope text-[10px] tracking-widest text-cream-dark/30 uppercase">
              I don&apos;t market products. I create digital desire.
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}

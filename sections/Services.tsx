"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/data/services";
import { staggerContainer, fadeUp } from "@/lib/motion";

const serviceDetails: Record<
  string,
  { strategic: string; deliverables: string[] }
> = {
  "01": {
    strategic:
      "Define your brand's emotional territory — the space it owns in people's minds before they even decide to buy. We position your product to trigger instant digital desire.",
    deliverables: [
      "Competitor Gap Analysis",
      "Brand Persona Formulation",
      "Emotional Value Mapping",
      "Tone of Voice Guides",
    ],
  },
  "02": {
    strategic:
      "Platform-native content strategies built on audience psychology, cultural fluency, and editorial precision. Engineered to turn casual scrolling into authentic community.",
    deliverables: [
      "Psychographic Profiling",
      "Algorithmic Growth Mapping",
      "Format-Native Storyboards",
      "Distribution Calendars",
    ],
  },
  "03": {
    strategic:
      "Creative briefs, visual systems, and content calendars that transform feeds into world-building experiences. Curated to deliver cohesive and premium brand assets.",
    deliverables: [
      "Visual Moodboards",
      "Asset Art Direction",
      "Influencer Style Briefs",
      "Asset Curation Guidelines",
    ],
  },
  "04": {
    strategic:
      "From awareness to conversion — campaigns mapped across the full emotional journey of your audience, combining analytical insights with high-end storytelling.",
    deliverables: [
      "Full-Funnel Journey Architecture",
      "Launch Event Blueprints",
      "Omni-Channel Messaging",
      "Attribution Models",
    ],
  },
  "05": {
    strategic:
      "Paid media strategies that don't just perform — they resonate. Targeted reach that captures attention without losing your brand's luxury identity.",
    deliverables: [
      "Creative Performance Audit",
      "Psychology-Targeted Copy",
      "Structured A/B Testing Matrix",
      "RoAS Optimization",
    ],
  },
  "06": {
    strategic:
      "Build a digital presence that reflects your authentic authority — highly curated, strategic, and unmistakably you. Your legacy, translated for the digital age.",
    deliverables: [
      "Executive Narrative Design",
      "LinkedIn Content Architecture",
      "Thought Leadership Outlines",
      "PR & Placement Outreach",
    ],
  },
};

function ServiceItem({ service }: Readonly<{ service: (typeof services)[0] }>) {
  const [open, setOpen] = useState(false);
  const details = serviceDetails[service.id];

  return (
    <motion.div
      variants={fadeUp}
      className="relative"
    >
      <button
        className="w-full py-24px md:py-32px flex items-start gap-16px group text-left cursor-pointer"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`service-${service.id}`}
      >
        {/* Number */}
        <span
          className="font-manrope text-xs tracking-[0.2em] pt-1.5 shrink-0 w-8 transition-colors duration-300"
          style={{ color: open ? "var(--cream-dark)" : "rgba(74,52,40,0.4)" }}
        >
          {service.id}
        </span>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-4">
            <h3
              className="font-cormorant text-fluid-lg font-semibold transition-all duration-500 ease-out group-hover:translate-x-2"
              style={{
                color: open ? "var(--espresso-light)" : "var(--espresso)",
              }}
            >
              {service.title}
            </h3>

            <motion.div
              animate={{ rotate: open ? 45 : 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-6 h-6 shrink-0"
              style={{
                color: open ? "var(--espresso-light)" : "rgba(74,52,40,0.4)",
              }}
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </motion.div>
          </div>

          <p
            className="font-cormorant italic text-sm mt-8px"
            style={{ color: "rgba(74,52,40,0.6)" }}
          >
            {service.tagline}
          </p>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`service-${service.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pl-12 pb-32px md:pl-16 grid grid-cols-1 md:grid-cols-2 gap-24px md:gap-48px">
              {/* Strategic philosophy */}
              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <span className="font-manrope block text-[10px] tracking-widest uppercase mb-16px text-cream-dark">
                  Strategic Philosophy
                </span>
                <p
                  className="font-inter text-sm md:text-base leading-relaxed"
                  style={{ color: "rgba(74,52,40,0.8)" }}
                >
                  {details.strategic}
                </p>
              </motion.div>

              {/* Tactical deliverables grid */}
              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <span className="font-manrope block text-[10px] tracking-widest uppercase mb-16px text-cream-dark">
                  Tactical Deliverables
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-16px">
                  {details.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-8px font-manrope text-xs"
                      style={{ color: "rgba(74,52,40,0.72)" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cream-dark shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Animated Divider border */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-cream-dark/35 origin-left pointer-events-none"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      />
    </motion.div>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="section-pad relative overflow-hidden"
      style={{ backgroundColor: "var(--ivory)" }}
      aria-label="Services offered"
    >
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none filter blur-[80px] opacity-[0.2]"
        style={{ backgroundColor: "var(--beige)" }}
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
            <span
              className="w-8 h-px inline-block"
              style={{ backgroundColor: "rgba(74,52,40,0.4)" }}
            />{" "}
            Services
          </span>
          <h2
            className="font-cormorant text-fluid-xl font-semibold leading-tight"
            style={{ color: "var(--espresso)" }}
          >
            What I craft <span className="italic font-light">for you.</span>
          </h2>
        </motion.div>

        {/* Services list */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative pt-1px"
        >
          {/* Animated list top border */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[1.5px] bg-cream-dark/35 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          />

          {services.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

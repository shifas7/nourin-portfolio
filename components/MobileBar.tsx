"use client";

import { useEffect, useState } from "react";
import { EnvelopeSimple, WhatsappLogo } from "@phosphor-icons/react";
import { profile } from "@/lib/content";

/**
 * One-tap contact on phones: slides up once the hero is gone and steps aside
 * while the brief form itself is on screen.
 */
export default function MobileBar() {
  const [pastHero, setPastHero] = useState(false);
  const [atContact, setAtContact] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const contact = document.getElementById("contact");
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) setPastHero(!e.isIntersecting);
        if (e.target === contact) setAtContact(e.isIntersecting);
      }
    });
    if (hero) io.observe(hero);
    if (contact) io.observe(contact);
    return () => io.disconnect();
  }, []);

  const show = pastHero && !atContact;
  const wa = profile.whatsapp;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(12px,env(safe-area-inset-bottom))] transition-transform duration-500 ease-out-expo lg:hidden ${
        show ? "translate-y-0" : "translate-y-[130%]"
      }`}
      aria-hidden={!show}
    >
      <div className="flex gap-2 rounded-full border border-line bg-bg/90 p-1.5 shadow-[0_12px_40px_-12px_rgb(17_17_19/0.35)] backdrop-blur-md">
        <a
          href={wa ? `https://wa.me/${wa}` : `mailto:${profile.email}`}
          target={wa ? "_blank" : undefined}
          rel={wa ? "noopener noreferrer" : undefined}
          tabIndex={show ? 0 : -1}
          data-track={wa ? "contact_whatsapp" : "contact_email"}
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full text-[15px] font-medium text-fg"
        >
          {wa ? <WhatsappLogo size={20} weight="fill" /> : <EnvelopeSimple size={20} />}
          {wa ? "WhatsApp" : "Email"}
        </a>
        <a
          href="#contact"
          tabIndex={show ? 0 : -1}
          data-track="cta_start_project"
          className="inline-flex h-12 flex-[1.4] items-center justify-center rounded-full bg-accent text-[15px] font-semibold text-on-accent"
        >
          Start a project
        </a>
      </div>
    </div>
  );
}

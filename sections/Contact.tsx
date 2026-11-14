"use client";

import { useEffect, useId, useState } from "react";
import { ArrowUpRight, Check, EnvelopeSimple, LinkedinLogo, WhatsappLogo } from "@phosphor-icons/react";
import PhoneStation from "@/components/phone/PhoneStation";
import CssPhone from "@/components/phone/CssPhone";
import SplitReveal from "@/components/SplitReveal";
import { profile, briefOptions } from "@/lib/content";
import { updateBrief, useBrief, briefToText } from "@/lib/brief-store";
import { track } from "@/lib/track";

type Errors = Partial<Record<"name" | "email" | "services", string>>;

const field =
  "h-13 w-full rounded-2xl border border-line bg-transparent px-5 text-fg placeholder:text-muted transition-colors focus:border-accent focus:outline-none focus-visible:outline-none";

export default function Contact() {
  const uid = useId();
  const brief = useBrief();
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  // Arriving from a service page (/?service=SEO#contact) preselects that service.
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("service");
    if (wanted && briefOptions.services.includes(wanted)) updateBrief({ services: [wanted] });
  }, []);

  const toggleService = (s: string) =>
    updateBrief({
      services: brief.services.includes(s) ? brief.services.filter((x) => x !== s) : [...brief.services, s],
    });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!brief.services.length) next.services = "Pick at least one, or choose Not sure yet.";
    if (!brief.name.trim()) next.name = "Add your name so I know who to reply to.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(brief.email)) next.email = "Add an email address I can reply to.";
    setErrors(next);
    if (next.services) return document.querySelector<HTMLElement>(`#${CSS.escape(uid)}-services button`)?.focus();
    if (next.name) return document.getElementById(`${uid}-name`)?.focus();
    if (next.email) return document.getElementById(`${uid}-email`)?.focus();

    const subject = `New project: ${brief.services.join(", ")}${brief.company ? ` for ${brief.company}` : ""}`;
    const body = `${briefToText(brief)}\n\nReply to: ${brief.email}`;
    track("generate_lead", { services: brief.services.join(", "), budget: brief.budget || "not set" });
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <PhoneStation
      as="section"
      id="contact"
      labelledBy="contact-title"
      pose={{ screen: "chat", x: 0.5, y: 0, rotX: 0.03, rotY: -0.26, rotZ: 0.02, scale: 1.12 }}
      className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 border-t border-line px-4 py-28 md:px-8 md:py-36 lg:grid-cols-12"
    >
      <div className="lg:col-span-6">
        <SplitReveal
          id="contact-title"
          text="Start a project"
          className="font-display text-[clamp(2.8rem,6vw,5.8rem)] leading-[0.95] text-fg [text-wrap:balance]"
        />
        <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-muted">
          Tell me what you need. Your message takes shape as you type, then opens in your email ready to
          send.
        </p>

        <form noValidate onSubmit={submit} className="mt-12 grid gap-8">
          <fieldset>
            <legend className="font-medium text-fg">What do you need help with?</legend>
            <div id={`${uid}-services`} className="mt-3 flex flex-wrap gap-2">
              {briefOptions.services.map((s) => {
                const on = brief.services.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    role="checkbox"
                    aria-checked={on}
                    onClick={() => toggleService(s)}
                    className={`inline-flex h-11 items-center gap-1.5 rounded-full border px-5 text-[15px] transition-[background-color,border-color,color,transform] duration-300 ease-out-expo active:scale-[0.97] ${
                      on ? "border-fg bg-fg text-bg" : "border-line text-fg hover:border-fg"
                    }`}
                  >
                    {on && <Check size={14} weight="bold" />}
                    {s}
                  </button>
                );
              })}
            </div>
            {errors.services && <p className="mt-2 text-sm text-accent-ink">{errors.services}</p>}
          </fieldset>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="grid gap-2">
              <label htmlFor={`${uid}-budget`} className="font-medium text-fg">
                Monthly budget
              </label>
              <select
                id={`${uid}-budget`}
                value={brief.budget}
                onChange={(e) => updateBrief({ budget: e.target.value })}
                className={`${field} cursor-pointer`}
              >
                <option value="">Choose a range</option>
                {briefOptions.budgets.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <label htmlFor={`${uid}-timeline`} className="font-medium text-fg">
                When do you want to start?
              </label>
              <select
                id={`${uid}-timeline`}
                value={brief.timeline}
                onChange={(e) => updateBrief({ timeline: e.target.value })}
                className={`${field} cursor-pointer`}
              >
                <option value="">Choose a timeline</option>
                {briefOptions.timelines.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="grid gap-2">
              <label htmlFor={`${uid}-name`} className="font-medium text-fg">
                Your name
              </label>
              <input
                id={`${uid}-name`}
                value={brief.name}
                onChange={(e) => updateBrief({ name: e.target.value })}
                autoComplete="name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? `${uid}-name-err` : undefined}
                className={field}
              />
              {errors.name && (
                <p id={`${uid}-name-err`} className="text-sm text-accent-ink">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <label htmlFor={`${uid}-company`} className="font-medium text-fg">
                Brand or business
              </label>
              <input
                id={`${uid}-company`}
                value={brief.company}
                onChange={(e) => updateBrief({ company: e.target.value })}
                autoComplete="organization"
                className={field}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <label htmlFor={`${uid}-email`} className="font-medium text-fg">
              Email
            </label>
            <input
              id={`${uid}-email`}
              type="email"
              value={brief.email}
              onChange={(e) => updateBrief({ email: e.target.value })}
              autoComplete="email"
              placeholder="you@yourbrand.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? `${uid}-email-err` : undefined}
              className={field}
            />
            {errors.email && (
              <p id={`${uid}-email-err`} className="text-sm text-accent-ink">
                {errors.email}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <label htmlFor={`${uid}-message`} className="font-medium text-fg">
              Anything else
            </label>
            <textarea
              id={`${uid}-message`}
              rows={3}
              value={brief.message}
              onChange={(e) => updateBrief({ message: e.target.value })}
              placeholder="What has worked before, what has not, links to your pages."
              className="w-full resize-y rounded-2xl border border-line bg-transparent px-5 py-4 text-fg placeholder:text-muted focus:border-accent focus:outline-none focus-visible:outline-none"
            />
          </div>

          {/* Live preview for small screens, where the phone isn't beside the form */}
          <div className="rounded-[28px] bg-panel p-5 lg:hidden" aria-live="polite">
            <p className="text-sm font-medium text-fg">Your message</p>
            <p className="mt-3 rounded-[20px] rounded-br-md bg-accent px-4 py-3 text-[15px] leading-snug text-on-accent">
              {briefToText(brief)}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="inline-flex h-13 items-center gap-2 rounded-full bg-accent px-8 text-base font-semibold text-on-accent transition-transform duration-300 ease-out-expo hover:-translate-y-0.5 active:translate-y-px"
            >
              Send the brief <ArrowUpRight size={18} weight="bold" />
            </button>
            {sent && (
              <p role="status" className="max-w-[40ch] text-[15px] text-muted">
                Your email app should open with the brief. If not, write to{" "}
                <a className="text-fg underline underline-offset-4" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
                .
              </p>
            )}
          </div>
        </form>

        <div className="mt-12 flex flex-wrap gap-3 border-t border-line pt-8">
          <a href={`mailto:${profile.email}`} data-track="contact_email" className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 text-[15px] text-fg hover:border-fg">
            <EnvelopeSimple size={18} /> {profile.email}
          </a>
          <a
            href={profile.linkedin}
            data-track="contact_linkedin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 text-[15px] text-fg hover:border-fg"
          >
            <LinkedinLogo size={18} /> LinkedIn
          </a>
          {profile.whatsapp && (
            <a
              href={`https://wa.me/${profile.whatsapp}`}
              data-track="contact_whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 text-[15px] text-fg hover:border-fg"
            >
              <WhatsappLogo size={18} /> WhatsApp
            </a>
          )}
        </div>
      </div>

      <div className="hidden justify-center lg:col-span-5 lg:col-start-8 lg:flex lg:items-start">
        <CssPhone screen="chat" width={270} className="lg:sticky lg:top-24" />
      </div>
    </PhoneStation>
  );
}

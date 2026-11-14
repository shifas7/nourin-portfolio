import PhoneStation from "@/components/phone/PhoneStation";
import CssPhone from "@/components/phone/CssPhone";
import SplitReveal from "@/components/SplitReveal";
import Reveal from "@/components/Reveal";
import AuditButton from "@/components/AuditButton";
import { proof } from "@/lib/content";

export default function Hero() {
  return (
    <>
      <PhoneStation
        as="section"
        id="top"
        labelledBy="hero-title"
        pose={{ screen: "reel", x: 0.5, y: -0.02, rotX: 0.06, rotY: -0.38, rotZ: 0.05, scale: 1.18 }}
        className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-4 pb-10 pt-24 md:px-8 lg:min-h-[100dvh] lg:grid-cols-12 lg:gap-12"
      >
        <div className="lg:col-span-6">
          <Reveal delay={0.1}>
            <p className="text-[15px] text-muted">Nourin Nassar, digital marketer in Kochi</p>
          </Reveal>
          <SplitReveal
            as="h1"
            id="hero-title"
            text="Campaigns that turn scrolling into enquiries."
            className="font-display mt-5 text-[clamp(2.9rem,6vw,5.9rem)] leading-[0.95] text-fg [text-wrap:balance]"
            delay={0.15}
          />
          <Reveal delay={0.55}>
            <p className="mt-7 max-w-[40ch] text-lg leading-relaxed text-muted md:text-xl">
              Meta Ads, reels, SEO and local search for brands that need leads, not likes.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <a
                href="#contact"
                data-track="cta_start_project"
                className="inline-flex h-13 items-center rounded-full bg-accent px-8 text-base font-semibold text-on-accent transition-transform duration-300 ease-out-expo hover:-translate-y-0.5 active:translate-y-px"
              >
                Start a project
              </a>
              <AuditButton className="link-draw inline-flex items-center pb-0.5 text-base text-fg">
                Or get a free 15-min audit
              </AuditButton>
            </div>
          </Reveal>
        </div>
        <div className="flex justify-center lg:col-span-6">
          <CssPhone screen="reel" width={200} className="sm:hidden" />
          <CssPhone screen="reel" width={270} className="hidden sm:block" />
        </div>
      </PhoneStation>

      <PhoneStation
        as="section"
        labelledBy="proof-title"
        pose={{ screen: "reel", x: 0.52, y: 0.02, rotX: 0.02, rotY: -0.18, rotZ: 0.02, scale: 1.05 }}
        className="mx-auto max-w-[1400px] px-4 pb-24 md:px-8 md:pb-36"
      >
        <h2 id="proof-title" className="sr-only">
          Results
        </h2>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:w-[58%]">
          {proof.map((p) => (
            <div key={p.value} className="border-t border-line pt-5">
              <dt className="font-display text-[clamp(2.4rem,4.4vw,4rem)] leading-none text-fg">{p.value}</dt>
              <dd className="mt-3 max-w-[26ch] text-[15px] leading-snug text-muted">{p.label}</dd>
            </div>
          ))}
        </dl>
      </PhoneStation>
    </>
  );
}

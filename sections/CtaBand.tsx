import PhoneStation from "@/components/phone/PhoneStation";
import AuditButton from "@/components/AuditButton";

/** Closing pitch before the brief: the low-risk offer, then the full project CTA. */
export default function CtaBand() {
  return (
    <PhoneStation as="section" labelledBy="cta-title" pose={{ visible: false }} className="mx-auto max-w-[1400px] px-4 pb-28 md:px-8 md:pb-36">
      <div className="relative overflow-hidden rounded-[28px] bg-accent px-6 py-14 text-on-accent md:px-14 md:py-20">
        <h2 id="cta-title" className="font-display max-w-[16ch] text-[clamp(2.6rem,6vw,5.6rem)] leading-[0.95] [text-wrap:balance]">
          Ready for more enquiries?
        </h2>
        <p className="mt-6 max-w-[48ch] text-lg leading-relaxed opacity-80">
          Start with a free 15-minute audit of your Instagram, ads or Google Business Profile. No pitch, just the three
          things I would fix first.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <AuditButton className="inline-flex h-13 items-center rounded-full bg-on-accent px-8 text-base font-semibold text-accent transition-transform duration-300 ease-out-expo hover:-translate-y-0.5 active:translate-y-px">
            Get a free audit
          </AuditButton>
          <a
            href="#contact"
            data-track="cta_start_project"
            className="inline-flex h-13 items-center rounded-full border border-current/40 px-8 text-base font-medium transition-colors duration-300 hover:border-current"
          >
            Start a project
          </a>
        </div>
      </div>
    </PhoneStation>
  );
}

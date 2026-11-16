import Image from "next/image";
import PhoneStation from "@/components/phone/PhoneStation";
import { jobs, credentials } from "@/lib/content";

export default function About() {
  return (
    <PhoneStation
      as="section"
      id="about"
      labelledBy="about-title"
      pose={{ visible: false }}
      className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-4 pb-28 md:px-8 md:pb-40 lg:grid-cols-12 lg:gap-6"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-panel lg:col-span-5">
        <Image
          src="/images/nourin-about.webp"
          alt="Nourin Nassar smiling in sunglasses and a pink scarf"
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover object-top"
        />
      </div>

      <div className="lg:col-span-6 lg:col-start-7 lg:self-center">
        <h2 id="about-title" className="font-display text-[clamp(2.4rem,4.6vw,4.4rem)] leading-[0.95] text-fg [text-wrap:balance]">
          Hi, I&apos;m Nourin.
        </h2>
        <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-muted">
          I studied journalism and PR, then spent four years inside Kochi agencies running social, paid and search for brands
          like Asianet, Silver Storm and Jotun Paints. I care most about one number: how many people put their hand up and ask.
        </p>

        <ul className="mt-10 border-t border-line">
          {jobs.map((j) => (
            <li key={j.company} className="grid grid-cols-[1fr_auto] gap-4 border-b border-line py-4">
              <span>
                <span className="block font-medium text-fg">{j.company}</span>
                <span className="text-[15px] text-muted">{j.role}</span>
              </span>
              <span className="font-mono text-sm text-muted">{j.dates}</span>
            </li>
          ))}
        </ul>

        <ul className="mt-8 flex flex-wrap gap-2">
          {credentials.map((c) => (
            <li key={c} className="rounded-2xl bg-panel px-4 py-2 text-[14px] leading-snug text-fg">
              {c}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[15px] text-muted">References from past agency leads are available on request.</p>
      </div>
    </PhoneStation>
  );
}

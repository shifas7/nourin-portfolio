import PhoneStation from "@/components/phone/PhoneStation";
import SplitReveal from "@/components/SplitReveal";
import { services } from "@/lib/content";

const tones = ["bg-panel", "bg-fg text-bg", "bg-panel", "bg-accent text-on-accent"];

export default function Services() {
  return (
    <PhoneStation
      as="section"
      id="services"
      labelledBy="services-title"
      pose={{ visible: false }}
      className="mx-auto max-w-[1400px] px-4 py-28 md:px-8 md:py-40"
    >
      <SplitReveal
        id="services-title"
        text="What you can hire me for"
        className="font-display max-w-[14ch] text-[clamp(2.6rem,5.4vw,5.2rem)] leading-[0.95] text-fg [text-wrap:balance]"
      />

      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-12">
        {services.map((s, i) => (
          <article
            key={s.id}
            className={`flex flex-col justify-between gap-12 rounded-[28px] p-7 md:p-10 ${tones[i]} ${
              i === 0 || i === 3 ? "md:col-span-7" : "md:col-span-5"
            }`}
          >
            <div>
              <h3 className="font-display text-[clamp(1.8rem,2.8vw,2.6rem)] leading-[1.02]">{s.name}</h3>
              <p className="mt-4 max-w-[36ch] text-[17px] leading-relaxed opacity-75">{s.goodFor}</p>
            </div>
            <ul className="flex flex-wrap gap-2">
              {s.includes.map((x) => (
                <li key={x} className="rounded-full border border-current/25 px-4 py-2 text-[14px]">
                  {x}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </PhoneStation>
  );
}

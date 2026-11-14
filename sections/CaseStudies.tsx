import PhoneStation from "@/components/phone/PhoneStation";
import CssPhone from "@/components/phone/CssPhone";
import SplitReveal from "@/components/SplitReveal";
import { cases } from "@/lib/content";

export default function CaseStudies() {
  return (
    <section id="work" aria-labelledby="work-title" className="mx-auto max-w-[1400px] px-4 md:px-8">
      <PhoneStation pose={{ screen: "reel", x: 0.5, rotY: -0.5, rotX: 0.1, rotZ: 0.06, scale: 0.95 }} className="pb-10 pt-10 lg:w-[56%]">
        <SplitReveal
          id="work-title"
          text="Five briefs. Five channels. Real numbers."
          className="font-display text-[clamp(2.6rem,5.4vw,5.2rem)] leading-[0.95] text-fg [text-wrap:balance]"
        />
        <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-muted">
          Each one starts with a business problem, not a post. Scroll and the phone shows the work.
        </p>
      </PhoneStation>

      {cases.map((c, i) => {
        const flip = i % 2 === 1;
        return (
          <PhoneStation
            key={c.id}
            as="article"
            labelledBy={`case-${c.id}`}
            pose={{
              screen: c.screen,
              x: flip ? -0.5 : 0.5,
              y: 0,
              rotX: 0.04,
              rotY: flip ? 0.32 : -0.32,
              rotZ: flip ? -0.03 : 0.03,
              scale: 1.12,
            }}
            className="grid min-h-[100dvh] grid-cols-1 items-center gap-10 border-t border-line py-20 lg:grid-cols-12 lg:py-0"
          >
            <div className={`lg:col-span-5 ${flip ? "lg:col-start-8" : "lg:col-start-1"}`}>
              <p className="text-[15px] text-muted">
                {c.client} <span className="text-accent-ink">/ {c.service}</span>
              </p>
              <h3 id={`case-${c.id}`} className="font-display mt-4 text-[clamp(2.4rem,4.6vw,4.4rem)] leading-[0.95] text-fg [text-wrap:balance]">
                {c.title}
              </h3>

              <dl className="mt-10 grid gap-7">
                <div>
                  <dt className="text-sm font-medium text-fg">The brief</dt>
                  <dd className="mt-1.5 max-w-[46ch] text-[17px] leading-relaxed text-muted">{c.brief}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-fg">What I did</dt>
                  <dd className="mt-1.5 max-w-[46ch] text-[17px] leading-relaxed text-muted">{c.did}</dd>
                </div>
                <div className="border-t border-line pt-6">
                  <dt className="text-sm font-medium text-fg">The result</dt>
                  <dd className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    {c.resultValue && (
                      <span className="font-display text-[clamp(2.6rem,4.4vw,4rem)] leading-none text-accent">{c.resultValue}</span>
                    )}
                    <span className="max-w-[34ch] text-[17px] leading-snug text-fg">{c.result}</span>
                  </dd>
                </div>
              </dl>
            </div>

            <div className={`flex justify-center lg:col-span-5 ${flip ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-8"}`}>
              <CssPhone screen={c.screen} width={260} />
            </div>
          </PhoneStation>
        );
      })}
    </section>
  );
}

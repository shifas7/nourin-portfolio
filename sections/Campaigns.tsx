import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import PhoneStation from "@/components/phone/PhoneStation";
import SplitReveal from "@/components/SplitReveal";
import { campaigns } from "@/lib/content";

/** The wider campaign archive, grouped by brand, each linking to the live post. */
export default function Campaigns() {
  return (
    <PhoneStation
      as="section"
      id="campaigns"
      labelledBy="campaigns-title"
      pose={{ visible: false }}
      className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32"
    >
      <SplitReveal
        id="campaigns-title"
        text="More campaigns I've run"
        className="font-display max-w-[14ch] text-[clamp(2.4rem,4.6vw,4.4rem)] leading-[0.95] text-fg [text-wrap:balance]"
      />

      <div className="mt-14 grid gap-12 md:mt-20">
        {campaigns.map((group) => (
          <div key={group.brand} id={`campaigns-${group.id}`} className="grid gap-6 border-t border-line pt-8 md:grid-cols-12 md:gap-6">
            <div className="md:col-span-4">
              <h3 className="font-display text-[clamp(1.6rem,2.4vw,2.2rem)] leading-tight text-fg">{group.brand}</h3>
              <a
                href={group.instagram}
                target="_blank"
                rel="noopener noreferrer"
                data-track="outbound_client_instagram"
                className="tap link-draw mt-3 inline-flex items-center gap-1 pb-0.5 text-[15px] text-muted hover:text-fg"
              >
                Instagram <ArrowUpRight size={14} />
              </a>
            </div>
            <ul className="grid gap-x-6 gap-y-7 sm:grid-cols-2 md:col-span-8">
              {group.items.map((item) => (
                <li key={item.name}>
                  <p className="text-lg font-medium text-fg">{item.name}</p>
                  {item.note && <p className="mt-1 max-w-[42ch] text-[15px] leading-relaxed text-muted">{item.note}</p>}
                  {item.post && (
                    <a
                      href={item.post}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-track="outbound_campaign_post"
                      aria-label={`View the ${item.name} post on Instagram`}
                      className="tap link-draw mt-2 inline-flex items-center gap-1 pb-0.5 text-[14px] font-medium text-accent-ink"
                    >
                      View post <ArrowUpRight size={13} />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </PhoneStation>
  );
}

"use client";

import Image from "next/image";
import { ArrowDownRight, ArrowUpRight } from "@phosphor-icons/react";
import PhoneStation from "@/components/phone/PhoneStation";
import { clients, type Client } from "@/lib/content";
import { getLenis } from "@/lib/scroll";

/** Nav (64px), plus the case-study sub-bar (56px) when landing inside the work section. */
function offsetFor(hash: string) {
  return hash.startsWith("#work-") ? 64 + 56 + 8 : 64 + 16;
}

function Logo({ c }: { c: Client }) {
  if (!c.logo) {
    return <span className="font-display text-center text-[clamp(1.1rem,1.6vw,1.5rem)] leading-tight text-[#111113]">{c.name}</span>;
  }
  if (c.withName) {
    return (
      <span className="flex flex-col items-center gap-2">
        <span className="relative h-11 w-14">
          <Image src={c.logo} alt="" fill sizes="56px" className="object-contain" />
        </span>
        <span className="text-center text-[15px] font-semibold leading-tight text-[#111113]">{c.name}</span>
      </span>
    );
  }
  // Squarish marks need a taller box than wide wordmarks to look the same size.
  return (
    <span className={`relative ${c.square ? "h-[78%] w-[62%]" : "h-[52%] w-[80%]"}`}>
      <Image
        src={c.logo}
        alt={c.name}
        fill
        unoptimized={c.logo.endsWith(".svg")}
        sizes="(min-width: 1024px) 220px, 45vw"
        className="object-contain"
      />
    </span>
  );
}

/**
 * Client logo wall in full colour. A tile opens the work done for that client:
 * its case study or campaigns on this page, or, for brands whose work lives on their
 * feed, the brand's Instagram. A small label says which, so clicks are never a surprise.
 */
export default function Clients() {
  const jump = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    const el = document.querySelector<HTMLElement>(hash);
    if (!el) return;
    e.preventDefault();
    const top = el.getBoundingClientRect().top + window.scrollY - offsetFor(hash);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(top, { duration: 1.3 });
    else window.scrollTo({ top });
    history.replaceState(null, "", hash);
  };

  return (
    <PhoneStation
      as="section"
      id="clients"
      labelledBy="clients-title"
      pose={{ visible: false }}
      className="mx-auto max-w-[1400px] px-4 pb-24 md:px-8 md:pb-32"
    >
      <div className="border-t border-line pt-8">
        <h2 id="clients-title" className="text-[15px] text-muted">
          Brands I&apos;ve worked with
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {clients.map((c) => {
            const href = c.work ?? c.instagram;
            const external = !c.work && !!c.instagram;
            const tile = `group relative flex aspect-[3/2] flex-col items-center justify-center rounded-[20px] px-6 ring-1 transition-[transform,box-shadow] duration-300 ease-out-expo ${
              c.dark ? "bg-[#0d0d0d] ring-white/10" : "bg-white ring-black/5"
            }`;
            const label = c.work ? "See the work" : "Instagram";
            return (
              <li key={c.id}>
                {href ? (
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    onClick={c.work ? (e) => jump(e, c.work!) : undefined}
                    aria-label={c.work ? `${c.name}: see the work` : `${c.name} on Instagram`}
                    data-track={c.work ? "client_to_work" : "outbound_client_instagram"}
                    className={`${tile} hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgb(17_17_19/0.35)]`}
                  >
                    <span className="flex min-h-0 w-full flex-1 items-center justify-center pt-3">
                      <Logo c={c} />
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 whitespace-nowrap pb-3 text-[12px] font-medium opacity-100 transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100 ${
                        c.dark ? "text-white/70" : "text-[#5d5d62]"
                      }`}
                    >
                      {label}
                      {c.work ? <ArrowDownRight size={12} /> : <ArrowUpRight size={12} />}
                    </span>
                  </a>
                ) : (
                  <div className={tile}>
                    <Logo c={c} />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </PhoneStation>
  );
}

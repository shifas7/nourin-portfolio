"use client";

import { useEffect, useState } from "react";
import {
  BatteryFull,
  CellSignalFull,
  WifiHigh,
  Heart,
  ChatCircle,
  PaperPlaneTilt,
  BookmarkSimple,
  MagnifyingGlass,
  MapPin,
  Phone,
  NavigationArrow,
  Globe,
  CaretDown,
  CaretLeft,
  TrendUp,
  Microphone,
  Plus,
  Play,
} from "@phosphor-icons/react";
import { screenshots, type ScreenId } from "@/lib/content";
import { useBrief, briefToText } from "@/lib/brief-store";

import { SCREEN_W, SCREEN_H } from "@/lib/screen";

/*
 * Illustrative, brand-neutral screens showing the kind of work Nourin does.
 * Any screen with a path in `screenshots` (lib/content.ts) shows that real image instead.
 */

function StatusBar({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={`flex h-[54px] items-end justify-between px-8 pb-2 text-[15px] font-semibold ${dark ? "text-white" : "text-[#111]"}`}
    >
      <span>9:41</span>
      <span className="flex items-center gap-1.5">
        <CellSignalFull size={17} weight="fill" />
        <WifiHigh size={17} weight="bold" />
        <BatteryFull size={22} weight="fill" />
      </span>
    </div>
  );
}

function Island() {
  return <div className="absolute left-1/2 top-[11px] z-10 h-[34px] w-[120px] -translate-x-1/2 rounded-full bg-black" />;
}

const STORIES = [
  { src: "/images/story-playful.webp", caption: "The first 3 seconds decide everything. Here is how I plan them." },
  { src: "/images/story-smile.webp", caption: "Meta Ads, reels and SEO for Kerala brands that want enquiries." },
  { src: "/images/story-desk.webp", caption: "Every campaign starts with one question: what makes you stop scrolling?" },
];
const STORY_MS = 4200;

/**
 * Instagram-style stories: progress bars fill, then the next photo slides in from the
 * right. Offsets are relative to the active story, so the loop back to the first one
 * still moves forward; stories not entering or leaving jump without animating.
 */
function ReelScreen() {
  const [active, setActive] = useState(0);
  // Only the first story loads up front; the rest wait until the page has loaded,
  // so they never compete with the hero image for bandwidth.
  const [loadRest, setLoadRest] = useState(false);
  const n = STORIES.length;

  useEffect(() => {
    let t = 0;
    const go = () => {
      t = window.setTimeout(() => setLoadRest(true), 600);
    };
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => {
      window.removeEventListener("load", go);
      window.clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % n), STORY_MS);
    return () => window.clearInterval(id);
  }, [n]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-black text-white">
      {STORIES.map((s, i) => {
        if (i > 0 && !loadRest) return null;
        const offset = (i - active + n) % n; // 0 = showing, n-1 = just left, else waiting on the right
        const x = offset === 0 ? "0%" : offset === n - 1 ? "-100%" : "100%";
        const moving = offset === 0 || offset === n - 1;
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={s.src}
            src={s.src}
            alt=""
            fetchPriority={i === 0 ? "high" : "auto"}
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              transform: `translate3d(${x},0,0)`,
              transition: moving ? "transform 650ms cubic-bezier(0.16, 1, 0.3, 1)" : "none",
            }}
          />
        );
      })}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0)_22%,rgba(0,0,0,0)_55%,rgba(0,0,0,0.75)_100%)]" />
      <div className="relative">
        <StatusBar dark />
        <div className="mx-4 mt-2 flex gap-1">
          {STORIES.map((s, i) => (
            <span key={s.src} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/35">
              {i < active && <span className="block h-full w-full bg-white" />}
              {i === active && (
                <span
                  key={`bar-${active}`}
                  className="story-progress block h-full w-full origin-left bg-white"
                  style={{ animationDuration: `${STORY_MS}ms` }}
                />
              )}
            </span>
          ))}
        </div>
      </div>
      <div className="absolute bottom-8 left-5 right-20">
        <div className="flex items-center gap-2.5">
          <span className="h-9 w-9 overflow-hidden rounded-full border-2 border-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/nourin-avatar.webp" alt="" className="h-full w-full object-cover" />
          </span>
          <span className="text-[15px] font-semibold">Nourin Nassar</span>
          <span className="rounded-md border border-white/70 px-2 py-0.5 text-[12px] font-semibold">Follow</span>
        </div>
        <p key={active} className="story-caption mt-3 text-[17px] font-semibold leading-snug">
          {STORIES[active].caption}
        </p>
      </div>
      <div className="absolute bottom-10 right-4 flex flex-col items-center gap-6">
        <Heart size={30} weight="fill" className="text-[#ff5b2e]" />
        <ChatCircle size={30} weight="fill" />
        <PaperPlaneTilt size={30} weight="fill" />
        <BookmarkSimple size={30} weight="fill" />
      </div>
    </div>
  );
}

function LeadScreen() {
  return (
    <div className="relative h-full w-full bg-[#f4f4f2] text-[#111]">
      <StatusBar />
      <div className="flex items-center gap-3 px-4 py-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1d1a14] text-[13px] font-bold text-[#e7c77d]">YB</span>
        <span className="leading-tight">
          <span className="block text-[15px] font-semibold">Your brand</span>
          <span className="block text-[12px] text-[#666]">Sponsored</span>
        </span>
      </div>
      <p className="px-4 pb-3 text-[14px] leading-snug">Bridal season is here. Book a private viewing and get the new collection price list.</p>
      <div className="relative mx-0 h-[300px] overflow-hidden bg-[radial-gradient(circle_at_30%_25%,#f6dc95_0%,#c99a3a_38%,#5b3f10_100%)]">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-[#1d1405]">
          <span className="text-[13px] font-semibold uppercase tracking-[0.3em]">The bridal edit</span>
          <span className="mt-3 text-[46px] font-black leading-[0.9] tracking-tight">22K<br />Gold</span>
          <span className="mt-4 rounded-full bg-[#1d1405] px-4 py-1.5 text-[13px] font-semibold text-[#f6dc95]">Private viewings open</span>
        </div>
      </div>
      {/* Instant form sheet */}
      <div className="absolute inset-x-0 bottom-0 rounded-t-[28px] bg-white px-5 pb-8 pt-3 shadow-[0_-12px_40px_rgba(0,0,0,0.18)]">
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-[#ddd]" />
        <p className="text-[18px] font-bold">Get the price list</p>
        <p className="mt-1 text-[13px] text-[#666]">Your brand will call you back today.</p>
        {["Full name", "Phone number", "Preferred store"].map((f, i) => (
          <div key={f} className="mt-3 rounded-xl border border-[#e2e2e2] px-4 py-2.5">
            <span className="block text-[11px] text-[#636363]">{f}</span>
            <span className="block text-[15px]">{["Anjali Menon", "+91 98•• ••• •12", "Kochi, MG Road"][i]}</span>
          </div>
        ))}
        <div className="mt-4 rounded-xl bg-[#ff5b2e] py-3.5 text-center text-[16px] font-semibold text-[#111113]">Submit</div>
      </div>
    </div>
  );
}

function AnalyticsScreen() {
  const pts = [18, 22, 20, 27, 25, 31, 30, 36, 34, 41, 45, 52];
  const max = 56;
  const path = pts.map((p, i) => `${(i / (pts.length - 1)) * 330},${150 - (p / max) * 150}`).join(" ");
  return (
    <div className="h-full w-full bg-[#0f1012] text-white">
      <StatusBar dark />
      <div className="px-5 pt-2">
        <p className="text-[13px] text-white/50">Your website, last 6 months</p>
        <p className="mt-1 text-[26px] font-bold">Overview</p>
      </div>
      <div className="mx-4 mt-5 rounded-3xl bg-[#1a1b1f] p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[13px] text-white/50">Website visits</p>
            <p className="mt-1 text-[34px] font-bold tracking-tight">Up 30%</p>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-[#ff5b2e]/15 px-2.5 py-1 text-[13px] font-semibold text-[#ff7b55]">
            <TrendUp size={14} weight="bold" /> 30%
          </span>
        </div>
        <svg viewBox="0 0 330 160" className="mt-4 h-[160px] w-full">
          <defs>
            <linearGradient id="fillA" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#ff5b2e" stopOpacity="0.35" />
              <stop offset="1" stopColor="#ff5b2e" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={`0,150 ${path} 330,150`} fill="url(#fillA)" />
          <polyline points={path} fill="none" stroke="#ff5b2e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      </div>
      <div className="mx-4 mt-4 grid grid-cols-2 gap-4">
        <div className="rounded-3xl bg-[#1a1b1f] p-5">
          <p className="text-[13px] text-white/50">Leads</p>
          <p className="mt-1 text-[28px] font-bold">Up 20%</p>
          <div className="mt-4 flex h-14 items-end gap-1.5">
            {[30, 38, 34, 46, 52, 60].map((h, i) => (
              <span key={i} className="flex-1 rounded-sm bg-white/80" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        <div className="rounded-3xl bg-[#1a1b1f] p-5">
          <p className="text-[13px] text-white/50">Top channel</p>
          <p className="mt-1 text-[22px] font-bold leading-tight">Social</p>
          <p className="mt-3 text-[13px] text-white/50">then organic search</p>
        </div>
      </div>
    </div>
  );
}

function CalendarScreen() {
  const posts: Record<number, { t: string; c: string }> = {
    2: { t: "Reel", c: "#ff5b2e" },
    4: { t: "Post", c: "#2b2b2f" },
    6: { t: "Story", c: "#c9c3b8" },
    9: { t: "Reel", c: "#ff5b2e" },
    11: { t: "Post", c: "#2b2b2f" },
    13: { t: "Live", c: "#6c7a5c" },
    16: { t: "Reel", c: "#ff5b2e" },
    18: { t: "Post", c: "#2b2b2f" },
    20: { t: "Story", c: "#c9c3b8" },
    23: { t: "Reel", c: "#ff5b2e" },
    25: { t: "Collab", c: "#6c7a5c" },
    27: { t: "Post", c: "#2b2b2f" },
    30: { t: "Reel", c: "#ff5b2e" },
  };
  return (
    <div className="h-full w-full bg-white text-[#111]">
      <StatusBar />
      <div className="flex items-end justify-between px-5 pt-2">
        <div>
          <p className="text-[13px] text-[#636363]">Content calendar</p>
          <p className="text-[28px] font-bold">November</p>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111] text-white">
          <Plus size={18} weight="bold" />
        </span>
      </div>
      <div className="mt-4 grid grid-cols-7 px-3 text-center text-[11px] font-semibold text-[#636363]">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-1 px-3">
        {Array.from({ length: 35 }, (_, i) => {
          const day = i - 4;
          const p = posts[day];
          return (
            <div key={i} className={`h-[62px] rounded-lg p-1 ${day > 0 && day <= 30 ? "bg-[#f4f4f2]" : ""}`}>
              {day > 0 && day <= 30 && <span className="block text-[11px] text-[#5f5f5f]">{day}</span>}
              {p && (
                <span className="mt-1 block rounded px-1 py-0.5 text-[10px] font-semibold" style={{ background: p.c, color: p.c === "#c9c3b8" || p.c === "#ff5b2e" ? "#111113" : "#fff" }}>
                  {p.t}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div className="mx-4 mt-4 flex items-center gap-3 rounded-2xl bg-[#111] p-4 text-white">
        <span className="h-12 w-12 shrink-0 overflow-hidden rounded-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/nourin-smile-thumb.webp" alt="" className="h-full w-full object-cover" />
        </span>
        <span className="leading-tight">
          <span className="block text-[12px] text-white/60">Tomorrow, 7:00 pm</span>
          <span className="block text-[15px] font-semibold">Reel: three ways to style the new edit</span>
        </span>
      </div>
    </div>
  );
}

function MapScreen() {
  return (
    <div className="relative h-full w-full bg-[#e9e7e1] text-[#111]">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice">
        <rect width="390" height="844" fill="#ebe8e1" />
        <path d="M-20 260 C120 230 220 300 420 250" stroke="#fff" strokeWidth="26" fill="none" />
        <path d="M120 -20 C140 200 90 420 160 900" stroke="#fff" strokeWidth="20" fill="none" />
        <path d="M-20 520 C140 480 250 560 420 500" stroke="#fff" strokeWidth="14" fill="none" />
        <path d="M290 -20 C260 260 330 520 280 900" stroke="#fff" strokeWidth="12" fill="none" />
        <rect x="190" y="320" width="80" height="120" rx="10" fill="#d8e3cf" />
        <rect x="20" y="300" width="70" height="70" rx="8" fill="#dcd7cc" />
        <path d="M0 640 C100 620 180 700 390 660 L390 844 L0 844 Z" fill="#c9dbe6" />
      </svg>
      <div className="relative">
        <StatusBar />
        <div className="mx-4 mt-1 flex items-center gap-3 rounded-full bg-white px-4 py-3 shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
          <MagnifyingGlass size={18} weight="bold" />
          <span className="text-[15px] text-[#555]">bridal jewellery near me</span>
        </div>
      </div>
      <div className="absolute left-[176px] top-[330px] flex flex-col items-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ff5b2e] text-white shadow-lg">
          <MapPin size={26} weight="fill" />
        </span>
        <span className="mt-1 rounded-md bg-white px-2 py-0.5 text-[12px] font-semibold shadow">Your brand</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 rounded-t-[28px] bg-white px-5 pb-9 pt-3 shadow-[0_-12px_40px_rgba(0,0,0,0.15)]">
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-[#ddd]" />
        <p className="text-[22px] font-bold">Your brand</p>
        <p className="mt-1 text-[14px] text-[#555]">Jewellery store, MG Road</p>
        <p className="mt-1 text-[14px]">
          <span className="font-semibold text-[#17723f]">Open now</span>
          <span className="text-[#555]"> until 9 pm, 1.2 km away</span>
        </p>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            { i: <NavigationArrow size={20} weight="fill" />, l: "Directions", main: true },
            { i: <Phone size={20} weight="fill" />, l: "Call" },
            { i: <Globe size={20} weight="bold" />, l: "Website" },
          ].map((b) => (
            <span
              key={b.l}
              className={`flex flex-col items-center gap-1 rounded-2xl py-3 text-[13px] font-semibold ${b.main ? "bg-[#ff5b2e] text-[#111113]" : "bg-[#f1f1ef]"}`}
            >
              {b.i}
              {b.l}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SearchScreen() {
  return (
    <div className="h-full w-full bg-white text-[#111]">
      <StatusBar />
      <div className="mx-4 mt-1 flex items-center gap-3 rounded-full border border-[#e3e3e3] px-4 py-3">
        <MagnifyingGlass size={18} weight="bold" />
        <span className="flex-1 text-[15px]">how to check gold purity in dubai</span>
        <Microphone size={18} weight="fill" className="text-[#636363]" />
      </div>
      <div className="mt-5 px-5">
        <p className="text-[12px] text-[#5f5f5f]">yourbrand.com › guides</p>
        <p className="mt-1 text-[19px] font-semibold leading-snug text-[#1a3fbf]">How to check gold purity in Dubai: a buyer&apos;s guide</p>
        <p className="mt-1.5 text-[14px] leading-snug text-[#444]">Hallmarks, karat stamps and the three questions to ask before you buy.</p>
        <div className="mt-3 divide-y divide-[#eee] rounded-2xl border border-[#eee]">
          {["What does a 22K hallmark look like?", "Is Dubai gold cheaper than India?", "How do I test gold at home?"].map((q, i) => (
            <div key={q} className="flex items-center justify-between px-4 py-3 text-[14px]">
              <span>{q}</span>
              <CaretDown size={16} className={i === 0 ? "rotate-180" : ""} />
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-2xl bg-[#f6f6f4] p-4 text-[13px] leading-snug text-[#444]">
          A 22K hallmark shows the purity number 916, the assay office mark and the jeweller&apos;s code.
        </div>
      </div>
      <div className="mt-5 px-5">
        <p className="text-[12px] text-[#5f5f5f]">another-site.com</p>
        <p className="mt-1 text-[17px] font-semibold text-[#1a3fbf]">Gold rates today</p>
        <div className="mt-2 h-3 w-4/5 rounded bg-[#eee]" />
        <div className="mt-1.5 h-3 w-3/5 rounded bg-[#eee]" />
      </div>
    </div>
  );
}

function GiveawayScreen() {
  return (
    <div className="h-full w-full bg-white text-[#111]">
      <StatusBar />
      <div className="flex items-center gap-3 px-4 py-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[conic-gradient(from_200deg,#14b8c4,#0b6e8f,#14b8c4)] p-[2px]">
          <span className="flex h-full w-full items-center justify-center rounded-full bg-white text-[12px] font-black text-[#0b6e8f]">SS</span>
        </span>
        <span className="leading-tight">
          <span className="block text-[15px] font-semibold">Silver Storm</span>
          <span className="block text-[12px] text-[#5f5f5f]">Athirappilly, Kerala</span>
        </span>
      </div>
      <div className="relative h-[390px] overflow-hidden bg-[linear-gradient(160deg,#5fe0e8_0%,#14a3c4_45%,#0b4f7a_100%)]">
        <svg aria-hidden viewBox="0 0 390 390" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <path d="M0 300 C80 270 150 330 230 300 C300 275 350 310 390 290 L390 390 L0 390 Z" fill="rgba(255,255,255,0.18)" />
          <path d="M0 330 C90 305 170 360 250 332 C320 310 360 340 390 325 L390 390 L0 390 Z" fill="rgba(255,255,255,0.22)" />
        </svg>
        <div className="relative flex h-full flex-col items-center justify-center px-8 text-center text-white">
          <span className="text-[13px] font-bold uppercase tracking-[0.28em]">Kerala&apos;s</span>
          <span className="mt-2 text-[44px] font-black uppercase leading-[0.88] tracking-tight">Biggest<br />Giveaway</span>
          <span className="mt-5 rounded-full bg-white px-4 py-1.5 text-[14px] font-bold text-[#0b4f7a]">Win an iPhone 15 Pro</span>
        </div>
      </div>
      <div className="flex items-center gap-4 px-4 pt-3">
        <Heart size={26} weight="fill" className="text-[#e0245e]" />
        <ChatCircle size={26} />
        <PaperPlaneTilt size={26} />
        <BookmarkSimple size={26} className="ml-auto" />
      </div>
      <p className="px-4 pt-2 text-[14px] leading-snug">
        <span className="font-semibold">Silver Storm</span> Follow, share and tag your gang. The biggest summer prize in Kerala is
        waiting.
      </p>
      <div className="mx-4 mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-[#f2f6f7] p-3">
          <p className="text-[12px] text-[#4d5b60]">Impressions</p>
          <p className="text-[24px] font-bold tracking-tight">8M+</p>
        </div>
        <div className="rounded-2xl bg-[#f2f6f7] p-3">
          <p className="text-[12px] text-[#4d5b60]">New followers</p>
          <p className="text-[24px] font-bold tracking-tight">+80k</p>
        </div>
      </div>
    </div>
  );
}

function ChannelScreen() {
  const tiles = ["#7c2d12", "#1e3a8a", "#831843", "#14532d", "#4c1d95", "#713f12"];
  return (
    <div className="h-full w-full bg-[#0f0f12] text-white">
      <StatusBar dark />
      <div className="flex items-center gap-3 px-4 pt-2">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ff5b2e] text-[15px] font-black text-[#111113]">A</span>
        <span className="leading-tight">
          <span className="block text-[18px] font-bold">Asianet</span>
          <span className="block text-[12px] text-white/60">Malayalam entertainment, Star Network</span>
        </span>
      </div>
      <div className="mt-4 flex gap-2 overflow-hidden px-4">
        {["Reels", "Contests", "Live", "Shorts"].map((c, i) => (
          <span key={c} className={`rounded-full px-3 py-1.5 text-[12px] font-semibold ${i === 0 ? "bg-white text-[#111]" : "bg-white/10 text-white"}`}>
            {c}
          </span>
        ))}
      </div>
      <div className="mx-4 mt-4 grid grid-cols-2 gap-3">
        {[
          { t: "Star Singer", s: "Season 9", c: "from-[#f59e0b] to-[#b91c1c]" },
          { t: "Chandrakantham", s: "Serial", c: "from-[#6366f1] to-[#1e1b4b]" },
        ].map((s) => (
          <div key={s.t} className={`flex h-[150px] flex-col justify-end rounded-2xl bg-gradient-to-br ${s.c} p-3`}>
            <p className="text-[17px] font-bold leading-tight">{s.t}</p>
            <p className="text-[12px] text-white/80">{s.s}</p>
          </div>
        ))}
      </div>
      <p className="mx-4 mt-5 text-[13px] font-semibold text-white/70">Latest reels</p>
      <div className="mx-4 mt-2 grid grid-cols-3 gap-1.5">
        {tiles.map((c, i) => (
          <div key={i} className="relative h-[120px] rounded-lg" style={{ background: `linear-gradient(170deg, ${c}, #0f0f12)` }}>
            <Play size={16} weight="fill" className="absolute bottom-2 left-2 text-white/90" />
          </div>
        ))}
      </div>
    </div>
  );
}

function VideosScreen() {
  const colors = ["#1f2937", "#334155", "#0f766e", "#7c2d12", "#1e3a8a", "#3f3f46", "#14532d", "#581c87", "#9a3412"];
  return (
    <div className="h-full w-full bg-white text-[#111]">
      <StatusBar />
      <div className="px-5 pt-2">
        <p className="text-[13px] text-[#5f5f5f]">Content plan</p>
        <p className="text-[26px] font-bold leading-tight">Indus Go</p>
        <p className="mt-1 text-[14px] text-[#444]">24 vertical videos, 3 content buckets</p>
      </div>
      <div className="mx-4 mt-4 flex gap-2">
        {["Bucket 1", "Bucket 2", "Bucket 3"].map((b, i) => (
          <span key={b} className={`flex-1 rounded-full py-2 text-center text-[13px] font-semibold ${i === 0 ? "bg-[#111] text-white" : "bg-[#f1f1ef] text-[#333]"}`}>
            {b}
          </span>
        ))}
      </div>
      <div className="mx-4 mt-4 grid grid-cols-3 gap-2">
        {colors.map((c, i) => (
          <div key={i} className="relative aspect-[9/16] overflow-hidden rounded-xl" style={{ background: `linear-gradient(165deg, ${c}, #0b0b0e)` }}>
            <span className="absolute left-2 top-2 rounded bg-black/40 px-1.5 py-0.5 text-[10px] font-semibold text-white">0:{(15 + i * 3).toString().padStart(2, "0")}</span>
            <Play size={18} weight="fill" className="absolute bottom-2 right-2 text-white" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatScreen() {
  const brief = useBrief();
  const text = briefToText(brief);
  const empty = text === "Hi Nourin,";
  return (
    <div className="flex h-full w-full flex-col bg-[#f2f1ee] text-[#111]">
      <StatusBar />
      <div className="flex items-center gap-3 border-b border-black/5 px-4 pb-3">
        <CaretLeft size={22} weight="bold" />
        <span className="h-10 w-10 overflow-hidden rounded-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/nourin-avatar.webp" alt="" className="h-full w-full object-cover" />
        </span>
        <span className="leading-tight">
          <span className="block text-[16px] font-semibold">Nourin Nassar</span>
          <span className="block text-[12px] text-[#5f5f5f]">Digital marketer, Kochi</span>
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-3 px-4 pb-4">
        <div className="max-w-[78%] rounded-[20px] rounded-bl-md bg-white px-4 py-3 text-[15px] leading-snug shadow-sm">
          Hi, tell me about your brand and what you want more of.
        </div>
        <div className="ml-auto max-w-[82%] rounded-[20px] rounded-br-md bg-[#ff5b2e] px-4 py-3 text-[15px] leading-snug text-[#111113]">
          {empty ? (
            <span className="flex gap-1 py-1">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-2 w-2 animate-pulse rounded-full bg-[#111113]/70" style={{ animationDelay: `${i * 160}ms` }} />
              ))}
            </span>
          ) : (
            text
          )}
        </div>
      </div>
      <div className="mx-3 mb-8 flex items-center gap-2 rounded-full bg-white px-4 py-3 text-[15px] text-[#636363]">
        <span className="flex-1">Message</span>
        <PaperPlaneTilt size={20} weight="fill" className="text-[#ff5b2e]" />
      </div>
    </div>
  );
}

const screens: Record<ScreenId, () => React.ReactElement> = {
  reel: ReelScreen,
  giveaway: GiveawayScreen,
  channel: ChannelScreen,
  videos: VideosScreen,
  lead: LeadScreen,
  analytics: AnalyticsScreen,
  calendar: CalendarScreen,
  map: MapScreen,
  search: SearchScreen,
  chat: ChatScreen,
};

/** A full 390x844 phone screen. */
export default function PhoneScreen({ id }: { id: ScreenId }) {
  const Screen = screens[id];
  const shot = screenshots[id];
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ width: SCREEN_W, height: SCREEN_H }}>
      {shot ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={shot} alt="" className="absolute inset-0 h-full w-full object-cover object-top" />
      ) : (
        <>
          <Island />
          <Screen />
        </>
      )}
    </div>
  );
}

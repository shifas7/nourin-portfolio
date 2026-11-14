"use client";

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
} from "@phosphor-icons/react";
import type { ScreenId } from "@/lib/content";
import { useBrief, briefToText } from "@/lib/brief-store";

import { SCREEN_W, SCREEN_H } from "@/lib/screen";

/*
 * Illustrative, brand-neutral screens showing the kind of work Nourin does.
 * TODO: swap any of these for real screenshots or screen recordings of her campaigns.
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

function ReelScreen() {
  return (
    <div className="relative h-full w-full bg-black text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/nourin-portrait.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0)_22%,rgba(0,0,0,0)_55%,rgba(0,0,0,0.75)_100%)]" />
      <div className="relative">
        <StatusBar dark />
        <div className="mx-4 mt-2 flex gap-1">
          {[1, 0.6, 0, 0].map((f, i) => (
            <span key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/35">
              <span className="block h-full bg-white" style={{ width: `${f * 100}%` }} />
            </span>
          ))}
        </div>
      </div>
      <div className="absolute bottom-8 left-5 right-20">
        <div className="flex items-center gap-2.5">
          <span className="h-9 w-9 overflow-hidden rounded-full border-2 border-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/nourin-square.jpg" alt="" className="h-full w-full object-cover" />
          </span>
          <span className="text-[15px] font-semibold">Nourin Nassar</span>
          <span className="rounded-md border border-white/70 px-2 py-0.5 text-[12px] font-semibold">Follow</span>
        </div>
        <p className="mt-3 text-[17px] font-semibold leading-snug">The first 3 seconds decide everything. Here is how I plan them.</p>
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
            <span className="block text-[11px] text-[#888]">{f}</span>
            <span className="block text-[15px]">{["Anjali Menon", "+91 98•• ••• •12", "Kochi, MG Road"][i]}</span>
          </div>
        ))}
        <div className="mt-4 rounded-xl bg-[#ff5b2e] py-3.5 text-center text-[16px] font-semibold text-white">Submit</div>
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
          <p className="text-[13px] text-[#888]">Content calendar</p>
          <p className="text-[28px] font-bold">November</p>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111] text-white">
          <Plus size={18} weight="bold" />
        </span>
      </div>
      <div className="mt-4 grid grid-cols-7 px-3 text-center text-[11px] font-semibold text-[#999]">
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
              {day > 0 && day <= 30 && <span className="block text-[11px] text-[#777]">{day}</span>}
              {p && (
                <span className="mt-1 block rounded px-1 py-0.5 text-[10px] font-semibold text-white" style={{ background: p.c, color: p.c === "#c9c3b8" ? "#222" : "#fff" }}>
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
          <img src="/images/nourin-portrait.jpg" alt="" className="h-full w-full object-cover" />
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
          <span className="font-semibold text-[#1f8f4e]">Open now</span>
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
              className={`flex flex-col items-center gap-1 rounded-2xl py-3 text-[13px] font-semibold ${b.main ? "bg-[#ff5b2e] text-white" : "bg-[#f1f1ef]"}`}
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
        <Microphone size={18} weight="fill" className="text-[#888]" />
      </div>
      <div className="mt-5 px-5">
        <p className="text-[12px] text-[#777]">yourbrand.com › guides</p>
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
      <div className="mt-5 px-5 opacity-60">
        <p className="text-[12px] text-[#777]">another-site.com</p>
        <p className="mt-1 text-[17px] font-semibold text-[#1a3fbf]">Gold rates today</p>
        <div className="mt-2 h-3 w-4/5 rounded bg-[#eee]" />
        <div className="mt-1.5 h-3 w-3/5 rounded bg-[#eee]" />
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
          <img src="/images/nourin-square.jpg" alt="" className="h-full w-full object-cover" />
        </span>
        <span className="leading-tight">
          <span className="block text-[16px] font-semibold">Nourin Nassar</span>
          <span className="block text-[12px] text-[#777]">Digital marketer, Kochi</span>
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-3 px-4 pb-4">
        <div className="max-w-[78%] rounded-[20px] rounded-bl-md bg-white px-4 py-3 text-[15px] leading-snug shadow-sm">
          Hi, tell me about your brand and what you want more of.
        </div>
        <div className="ml-auto max-w-[82%] rounded-[20px] rounded-br-md bg-[#ff5b2e] px-4 py-3 text-[15px] leading-snug text-white">
          {empty ? (
            <span className="flex gap-1 py-1">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-2 w-2 animate-pulse rounded-full bg-white/80" style={{ animationDelay: `${i * 160}ms` }} />
              ))}
            </span>
          ) : (
            text
          )}
        </div>
      </div>
      <div className="mx-3 mb-8 flex items-center gap-2 rounded-full bg-white px-4 py-3 text-[15px] text-[#999]">
        <span className="flex-1">Message</span>
        <PaperPlaneTilt size={20} weight="fill" className="text-[#ff5b2e]" />
      </div>
    </div>
  );
}

const screens: Record<ScreenId, () => React.ReactElement> = {
  reel: ReelScreen,
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
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ width: SCREEN_W, height: SCREEN_H }}>
      <Island />
      <Screen />
    </div>
  );
}

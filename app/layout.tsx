import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Analytics from "@/components/Analytics";
import { profile } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name} | Digital Marketer in Kochi for Meta Ads, Reels and SEO`,
    template: `%s | ${profile.name}`,
  },
  description:
    "Nourin Nassar is a Kochi-based digital marketer. Meta Ads, social media, reels, SEO and local search for brands that need leads, not likes.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${profile.name} | Digital Marketer in Kochi`,
    description: "Campaigns that turn scrolling into enquiries. Meta Ads, reels, SEO and local search.",
    type: "website",
    locale: "en_IN",
    siteName: profile.name,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#efefec" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0e10" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: `${profile.name}, Digital Marketer`,
  url: SITE_URL,
  image: `${SITE_URL}/images/nourin-square.jpg`,
  email: `mailto:${profile.email}`,
  areaServed: ["Kochi", "Kerala", "India"],
  address: { "@type": "PostalAddress", addressLocality: "Ernakulam", addressRegion: "Kerala", addressCountry: "IN" },
  founder: { "@type": "Person", name: profile.name, jobTitle: "Digital Marketer", sameAs: [profile.linkedin] },
  knowsAbout: ["Meta Ads", "Lead generation", "Social media marketing", "Reels", "SEO", "Google Business Profile"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <SmoothScroll />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

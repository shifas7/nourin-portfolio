import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Bodoni_Moda,
  Inter,
  Manrope,
} from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import GrainOverlay from "@/components/GrainOverlay";
import CursorGlow from "@/components/CursorGlow";
import Nav from "@/components/Nav";
import Preloader from "@/components/Preloader";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf7f4" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
  ],
};

export const metadata: Metadata = {
  title: "Nourin Nassar — Digital Marketing Strategist & Brand Storyteller",
  description:
    "I don't market products. I create digital desire. — Nourin Nassar is a Digital Marketing Strategist & Brand Storyteller crafting emotionally intelligent campaigns with 12M+ organic reach.",
  keywords: [
    "digital marketing",
    "brand storytelling",
    "social media strategy",
    "content direction",
    "campaign planning",
    "Nourin Nassar",
  ],
  openGraph: {
    title: "Nourin Nassar — Digital Marketing Strategist",
    description: "I don't market products. I create digital desire.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${bodoni.variable} ${inter.variable} ${manrope.variable}`}
    >
      <body>
        <Preloader />
        <SmoothScroll>
          <GrainOverlay />
          <CursorGlow />
          <Nav />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

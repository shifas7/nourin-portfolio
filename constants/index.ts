// Brand Color Tokens
export const COLORS = {
  espresso: "#4A3428",
  beige: "#F3E9E2",
  ivory: "#FAF7F4",
  cream: "#D9C2B0",
  matte: "#171717",
} as const;

// Typography
export const FONTS = {
  heading: "var(--font-cormorant)",
  display: "var(--font-bodoni)",
  body: "var(--font-inter)",
  accent: "var(--font-manrope)",
} as const;

// Social links
export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/", icon: "instagram" },
  { label: "LinkedIn", href: "https://linkedin.com/", icon: "linkedin" },
  { label: "Email", href: "mailto:hello@nourinnassar.com", icon: "mail" },
] as const;

// Navigation links
export const NAV_LINKS = [
  { label: "Work", href: "#insights" },
  { label: "Story", href: "#diary" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
] as const;

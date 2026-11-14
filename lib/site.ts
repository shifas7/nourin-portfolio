/**
 * Public site URL, used for absolute links in share cards, the sitemap and
 * structured data. Set NEXT_PUBLIC_SITE_URL to the real domain in production.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

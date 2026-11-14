type Params = Record<string, string | number>;

type TrackWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

/**
 * Sends one event to GA4 and the Meta Pixel when they are configured.
 * A no-op until NEXT_PUBLIC_GA_ID / NEXT_PUBLIC_META_PIXEL_ID are set.
 */
export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  const w = window as TrackWindow;
  w.gtag?.("event", event, params);
  if (w.fbq) {
    if (event === "generate_lead") w.fbq("track", "Lead", params);
    else if (event.startsWith("contact_")) w.fbq("track", "Contact", { method: event.replace("contact_", "") });
    else w.fbq("trackCustom", event, params);
  }
}

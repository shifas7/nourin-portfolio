import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Nourin Nassar, digital marketer in Kochi. Campaigns that turn scrolling into enquiries.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Share card for WhatsApp, LinkedIn and X: promise, one result, and her photo. */
export default async function OpengraphImage() {
  const photo = await readFile(join(process.cwd(), "public/images/nourin-portrait.jpg"));
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#efefec", color: "#111113", padding: 64 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 760 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 28, color: "#5d5d62" }}>
            <div style={{ width: 18, height: 18, borderRadius: 9, background: "#ff5b2e" }} />
            Nourin Nassar, digital marketer in Kochi
          </div>
          <div style={{ display: "flex", fontSize: 82, fontWeight: 700, lineHeight: 0.98, letterSpacing: -4 }}>
            Campaigns that turn scrolling into enquiries.
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
            <span style={{ fontSize: 64, fontWeight: 700, color: "#ff5b2e", letterSpacing: -2 }}>10 Cr+</span>
            <span style={{ fontSize: 28, color: "#5d5d62" }}>in leads for jewellery clients via Meta Ads</span>
          </div>
        </div>
        <div style={{ display: "flex", flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              width: 250,
              height: 500,
              borderRadius: 44,
              padding: 10,
              background: "#1f1f23",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
            <img src={src} width={230} height={480} style={{ borderRadius: 36, objectFit: "cover" }} />
          </div>
        </div>
      </div>
    ),
    size,
  );
}

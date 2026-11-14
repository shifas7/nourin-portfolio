import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ff5b2e",
          color: "#111113",
          fontSize: 120,
          fontWeight: 800,
          letterSpacing: -6,
        }}
      >
        N
      </div>
    ),
    size,
  );
}

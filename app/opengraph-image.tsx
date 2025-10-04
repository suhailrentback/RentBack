// app/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "RentBack — Pay rent, earn rewards";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0b0b0b",
          color: "white",
          padding: 48,
          position: "relative",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(600px 300px at 10% 10%, rgba(5,150,105,.25), transparent), radial-gradient(600px 300px at 90% 90%, rgba(16,185,129,.25), transparent)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
                 stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 11.5L12 4l9 7.5" />
              <path d="M5 10v9h14v-9" />
            </svg>
            <span style={{ fontSize: 28, fontWeight: 800, letterSpacing: 0.2 }}>RentBack</span>
          </div>

          <div style={{ height: 24 }} />
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.05 }}>
            Pay rent, earn <span style={{ color: "#10b981" }}>rewards</span>.
          </div>
          <div style={{ height: 16 }} />
          <div style={{ fontSize: 28, opacity: 0.85 }}>
            Raast, cards & wallets • Built for PK • Urdu/English
          </div>
          <div style={{ marginTop: "auto", fontSize: 20, opacity: 0.7 }}>
            © {new Date().getFullYear()} RentBack
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

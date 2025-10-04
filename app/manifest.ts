// app/manifest.ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RentBack",
    short_name: "RentBack",
    description: "Pay rent, earn rewards — built for Pakistan.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0b0b",
    theme_color: "#059669",
    lang: "en",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}

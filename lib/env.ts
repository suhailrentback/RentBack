// lib/env.ts
export const ENV = {
  BRAND: process.env.NEXT_PUBLIC_BRAND_NAME ?? "RentBack",
  SUPPORT: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "help@rentback.app",
  DEMO: process.env.NEXT_PUBLIC_DEMO === "true",
  DEFAULT_LANG: (process.env.NEXT_PUBLIC_DEFAULT_LANG === "ur" ? "ur" : "en") as "en" | "ur",
  DEFAULT_THEME: (process.env.NEXT_PUBLIC_DEFAULT_THEME === "light" ? "light" : "dark") as
    | "light"
    | "dark",
};

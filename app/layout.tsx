// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "RentBack — Pay rent, earn rewards",
  description:
    "A BILT-style rent payments & rewards experience for Pakistan. Raast-native, PKR-first, Urdu/English, light/dark.",
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#0b0b0b" }, { color: "#ffffff" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Apply persisted theme/lang BEFORE React hydrates to avoid flashes */}
      <Script id="rb-prehydrate" strategy="beforeInteractive">{`
        try {
          var d = document.documentElement;
          var theme = localStorage.getItem('rb-theme');
          var lang = localStorage.getItem('rb-lang');
          if (theme !== 'light' && theme !== 'dark') {
            // fall back to system preference on first visit
            theme = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
          }
          if (lang !== 'en' && lang !== 'ur') lang = 'en';
          d.classList.toggle('dark', theme === 'dark');
          d.setAttribute('lang', lang);
          d.setAttribute('dir', lang === 'ur' ? 'rtl' : 'ltr');
        } catch(e) {}
      `}</Script>

      <body
        className={`${inter.className} min-h-screen bg-white text-slate-900 dark:bg-[#0b0b0b] dark:text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

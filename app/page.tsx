"use client";
export const dynamic = "force-dynamic";

import Link from "next/link";
import { useEffect, useState } from "react";

const BRAND = {
  primary: "#059669", // emerald-600
};

export default function Landing() {
  // Respect prefers-color-scheme if user hasn’t chosen
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [lang, setLang] = useState<"en" | "ur">("en");

  useEffect(() => {
    // hydrate from localStorage (set by AppShell elsewhere, if present)
    try {
      const t = localStorage.getItem("rb-theme");
      const l = localStorage.getItem("rb-lang");
      if (t === "light" || t === "dark") setTheme(t);
      if (l === "en" || l === "ur") setLang(l);
    } catch {}
    // set html lang/dir
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ur" ? "rtl" : "ltr");
    // set body class for theme
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme, lang]);

  const t = copy[lang];
  const dir = lang === "ur" ? "rtl" : "ltr";

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white dark:bg-[#0b0b0b] dark:text-white"
         style={{ direction: dir }}>
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-emerald-400">
            <Logo />
            <span>RentBack</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang((p) => (p === "en" ? "ur" : "en"))}
              className="px-3 py-2 text-sm rounded-lg border border-white/10 hover:bg-white/10"
            >
              {lang === "en" ? "اردو" : "English"}
            </button>
            <button
              onClick={() => setTheme((p) => (p === "dark" ? "light" : "dark"))}
              className="px-3 py-2 text-sm rounded-lg border border-white/10 hover:bg-white/10"
            >
              {theme === "dark" ? t.light : t.dark}
            </button>
            <Link href="/sign-in" className="px-4 py-2 rounded-lg font-semibold bg-emerald-600 hover:bg-emerald-700">
              {t.signIn}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="mx-auto max-w-6xl px-4">
        <section className="py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              {t.heroTitle}
            </h1>
            <p className="mt-4 text-slate-200/80 text-lg">{t.heroSub}</p>
            <div className="mt-6 flex gap-3">
              <Link
                href="/sign-in"
                className="px-5 py-3 rounded-xl font-semibold bg-emerald-600 hover:bg-emerald-700"
              >
                {t.ctaPrimary}
              </Link>
              <a
                href="#features"
                className="px-5 py-3 rounded-xl font-semibold border border-white/15 hover:bg-white/10"
              >
                {t.ctaSecondary}
              </a>
            </div>
            <div className="mt-6 inline-block text-xs rounded-lg border border-emerald-400/30 text-emerald-200/90 px-2 py-1">
              {t.banner}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 blur-3xl opacity-30"
                 style={{ background: `conic-gradient(from 90deg at 50% 50%, ${BRAND.primary}, #10b981, #34d399)` }} />
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_20px_60px_rgba(5,150,105,0.25)]">
              <CardVisual />
            </div>
            <p className="mt-3 text-sm opacity-75">{t.cardCaption}</p>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-10 grid md:grid-cols-3 gap-4">
          {t.features.map((f, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-emerald-300 font-semibold">{f.title}</div>
              <p className="mt-1 text-sm opacity-80">{f.body}</p>
            </div>
          ))}
        </section>

        {/* Footer */}
        <footer className="py-10 text-sm opacity-70">
          © {new Date().getFullYear()} RentBack — {t.footer}
        </footer>
      </main>
    </div>
  );
}

function Logo({ size = 22, stroke = BRAND.primary }: { size?: number; stroke?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 11.5L12 4l9 7.5" />
      <path d="M5 10v9h14v-9" />
    </svg>
  );
}

function CardVisual() {
  return (
    <div className="relative w-full max-w-[520px] h-[260px] rounded-2xl overflow-hidden border border-white/10 text-slate-900 rb-animated-bg">
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
      <div className="absolute inset-0 p-5 flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <Logo /> <span>RentBack</span>
          </div>
          <span className="text-[12px] text-slate-800/90">VIRTUAL • Debit</span>
        </div>
        <div className="mt-auto font-mono tracking-wider">
          <div className="text-[22px] font-semibold text-slate-800">
            **** **** **** 0007
          </div>
          <div className="flex gap-5 mt-1 text-[12px] text-slate-800">
            <span>Exp 12/27</span>
            <span>PKR</span>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes rb-grad{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        .rb-animated-bg{background:linear-gradient(120deg,#059669,#14b8a6,#34d399);background-size:200% 200%;animation:rb-grad 12s ease infinite}
      `}</style>
    </div>
  );
}

const copy = {
  en: {
    signIn: "Sign in",
    light: "Light",
    dark: "Dark",
    banner: "Pakistan-focused rent & rewards — demo preview",
    heroTitle: "Turn rent into rewards.",
    heroSub:
      "Pay your landlord in PKR via bank transfer, card or wallet — earn points you can redeem for local perks.",
    ctaPrimary: "Get started",
    ctaSecondary: "How it works",
    cardCaption: "Fintech look. Pakistani market. Built for Sandbox Pakistan 2025.",
    features: [
      { title: "Pay fast", body: "Bank transfer (Raast), card, or wallet — simple instructions and receipts." },
      { title: "Earn rewards", body: "Redeem with Pakistani brands like Jazz, Daraz, Careem, and more." },
      { title: "Bilingual + RTL", body: "English/اردو, light/dark, and mobile-first UI." },
    ],
    footer: "Made with ♥ in PK",
  },
  ur: {
    signIn: "سائن اِن",
    light: "لائٹ",
    dark: "ڈارک",
    banner: "پاکستان کے لیے رینٹ اور انعامات — ڈیمو پریویو",
    heroTitle: "کرایہ کو انعامات میں بدلیں۔",
    heroSub:
      "بینک ٹرانسفر، کارڈ یا والیٹ سے PKR میں ادائیگی کریں — اور مقامی سہولتوں پر پوائنٹس ریڈیم کریں۔",
    ctaPrimary: "شروع کریں",
    ctaSecondary: "کیسے کام کرتا ہے",
    cardCaption: "فِن ٹیک انداز۔ پاکستانی مارکیٹ۔ سینڈ باکس پاکستان 2025 کے لیے۔",
    features: [
      { title: "تیز ادائیگی", body: "بینک ٹرانسفر (راست)، کارڈ یا والیٹ — آسان ہدایات اور رسیدیں۔" },
      { title: "انعامات", body: "Jazz، Daraz، Careem وغیرہ پر ریڈیم کریں۔" },
      { title: "دو لسانی + RTL", body: "English/اردو، لائٹ/ڈارک، اور موبائل فرسٹ UI۔" },
    ],
    footer: "PK میں محبت کے ساتھ",
  },
} as const;

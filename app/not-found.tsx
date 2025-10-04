"use client";

import Link from "next/link";
import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";

export default function NotFound() {
  const { t, lang } = useLang();

  // Safe labels using existing keys + fallbacks
  const L = {
    title: "404",
    headline: lang === "ur" ? "صفحہ نہیں ملا" : "Page not found",
    desc:
      lang === "ur"
        ? "معاف کیجئے، جو لنک آپ نے کھولا وہ موجود نہیں۔ نیچے دیے گئے اختیارات میں سے کسی ایک کو آزمائیں۔"
        : "Sorry, the link you followed doesn’t exist. Try one of the options below.",
    home: t?.nav?.home ?? (lang === "ur" ? "ہوم" : "Home"),
    signIn: lang === "ur" ? "سائن اِن" : "Sign in",
    support: t?.support ?? (lang === "ur" ? "سپورٹ" : "Support"),
    goBack: lang === "ur" ? "واپس جائیں" : "Go back",
  };

  return (
    <AppShell title={L.title} hideBottomNav>
      <div className="relative p-6">
        {/* Soft gradient aura like other pages */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-40 dark:opacity-30"
          aria-hidden
          style={{
            background:
              "radial-gradient(60% 40% at 50% 0%, rgba(16,185,129,0.25), transparent 60%)",
          }}
        />

        {/* Card */}
        <section className="mx-auto max-w-2xl rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur p-8 text-center">
          {/* 404 badge */}
          <div className="inline-flex items-center gap-2 rounded-xl px-3 py-1 border border-black/10 dark:border-white/10 text-xs tracking-wide">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
            <span className="opacity-70">404</span>
          </div>

          <h1 className="mt-4 text-2xl md:text-3xl font-bold">{L.headline}</h1>
          <p className="mt-2 text-sm opacity-80">{L.desc}</p>

          {/* Helpful actions */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="h-11 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
            >
              {L.home}
            </Link>
            <Link
              href="/sign-in"
              className="h-11 px-5 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
            >
              {L.signIn}
            </Link>
            <Link
              href="/support"
              className="h-11 px-5 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
            >
              {L.support}
            </Link>
            <button
              type="button"
              onClick={() => (window.history.length > 1 ? window.history.back() : (window.location.href = "/"))}
              className="h-11 px-5 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
            >
              {L.goBack}
            </button>
          </div>

          {/* Tiny tips row */}
          <div className="mt-6 grid gap-2 text-xs opacity-70">
            <p>
              {lang === "ur"
                ? "ٹائپنگ چیک کریں یا ہوم پیج سے دوبارہ آغاز کریں۔"
                : "Check the URL for typos, or start again from the home page."}
            </p>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

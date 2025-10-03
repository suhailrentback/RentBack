// app/founder/page.tsx
"use client";

import Link from "next/link";
import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";

export default function FounderPage() {
  const { lang } = useLang();

  const L =
    lang === "ur"
      ? {
          title: "بانی",
          byline: "سہیل — رینٹ بیک کے بانی",
          mission:
            "ہم کرایہ داروں کے لیے ادائیگی کو آسان، شفاف اور انعامی بناتے ہیں۔",
          card1Title: "ہمارا وژن",
          card1Body:
            "پاکستان میں کرایہ کی ادائیگی کو بینک ٹرانسفر اور RAAST کے ذریعے محفوظ اور فوری بنانا۔",
          card2Title: "ہم کیا بنا رہے ہیں",
          card2Body:
            "کرایہ کی ادائیگیاں، خودکار رسیدیں، اور حقیقی انعامات — ایک سادہ ایپ میں۔",
          contactCta: "سپورٹ سے رابطہ",
          contactHint: "کسی بھی سوال کے لیے"
        }
      : {
          title: "Founder",
          byline: "Suhail — Founder at RentBack",
          mission:
            "We make rent payments simple, transparent, and rewarding for tenants.",
          card1Title: "Our vision",
          card1Body:
            "Modernize rent in Pakistan with secure, instant RAAST & bank transfers.",
          card2Title: "What we're building",
          card2Body:
            "Rent payments, automatic receipts, and real rewards — in one simple app.",
          contactCta: "Contact Support",
          contactHint: "Have a question?"
        };

  return (
    <AppShell title={L.title}>
      <div className="p-4 space-y-4">
        {/* Hero card */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white/50 dark:bg-white/5 backdrop-blur">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-600/10 flex items-center justify-center">
              <span className="text-lg">🌱</span>
            </div>
            <div className="flex-1">
              <h2 className="text-base font-semibold">{L.byline}</h2>
              <p className="text-sm opacity-80 mt-1">{L.mission}</p>
            </div>
          </div>
        </section>

        {/* Two small info cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
            <h3 className="text-sm font-medium">{L.card1Title}</h3>
            <p className="text-sm opacity-80 mt-1">{L.card1Body}</p>
          </section>

          <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
            <h3 className="text-sm font-medium">{L.card2Title}</h3>
            <p className="text-sm opacity-80 mt-1">{L.card2Body}</p>
          </section>
        </div>

        {/* Contact */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4 flex items-center justify-between">
          <div className="text-sm opacity-80">{L.contactHint}</div>
          <Link
            href="/support"
            className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-sm"
          >
            {L.contactCta}
          </Link>
        </section>
      </div>
    </AppShell>
  );
}

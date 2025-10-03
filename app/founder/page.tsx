// app/founder/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useLang } from "@/hooks/useLang";

export default function FounderPage() {
  const r = useRouter();
  const { lang } = useLang();

  const L =
    lang === "ur"
      ? {
          title: "بانی کا پیغام",
          hero: "کرایہ ادائیگی کا مستقبل — آج سے",
          byline: "سوہیل احمد کی قیادت میں",
          p1: "ہمارے بانی سوہیل احمد کی قیادت میں رینٹ بیک پاکستان اور اس سے آگے کرایہ ادائیگیوں کا مستقبل بنا رہا ہے۔ ہمارا مشن روزمرہ خرچ کو مالی ترقی، تحفظ اور انعامات کے موقع میں بدلنا ہے۔",
          p2: "یہ ڈیمو پہلا قدم ہے — یہ دکھاتا ہے کہ ٹیکنالوجی، ڈیزائن اور اعتماد کیسے اکٹھے ہو سکتے ہیں۔ جلد ہی رینٹ بیک ایک مکمل پلیٹ فارم بنے گا جو کرایہ داروں، مکان مالکان اور شراکت داروں سب کے لیے یکساں فائدہ مند ہوگا۔",
          p3: "ہمارے سفر کا حصہ بننے کا شکریہ۔",
          home: "ہوم",
          signIn: "سائن اِن",
        }
      : {
          title: "Founder’s Note",
          hero: "The future of rent — starting now",
          byline: "Led by Suhail Ahmed",
          p1: "Led by our founder, Suhail Ahmed, RentBack is building the future of rent payments in Pakistan and beyond. The mission is to transform an everyday expense into an opportunity for financial growth, security, and rewards.",
          p2: "This demo is the first step — showing how technology, design, and trust can come together. Soon, RentBack will expand into a full platform that benefits tenants, landlords, and partners equally.",
          p3: "Thank you for being part of our journey.",
          home: "Home",
          signIn: "Sign in",
        };

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-[#0b0b0b] dark:text-white">
      {/* Top bar (no bottom nav on this page) */}
      <header className="sticky top-0 z-10 border-b border-black/10 dark:border-white/10 bg-white/70 dark:bg-[#0b0b0b]/70 backdrop-blur">
        <div className="mx-auto max-w-3xl px-4 h-14 flex items-center justify-between">
          <div className="text-base font-semibold">RentBack</div>
          <nav className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => r.push("/")}
              className="h-9 px-3 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-sm"
            >
              {L.home}
            </button>
            <button
              type="button"
              onClick={() => r.push("/sign-in")}
              className="h-9 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
            >
              {L.signIn}
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        {/* Hero card */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white/50 dark:bg-white/5 backdrop-blur">
          <h1 className="text-2xl font-bold">{L.title}</h1>
          <p className="text-sm opacity-70">{L.byline}</p>
          <p className="text-lg font-semibold mt-2">{L.hero}</p>
        </section>

        {/* Message card */}
        <section className="mt-4 rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white/50 dark:bg-white/5 backdrop-blur space-y-3 leading-7">
          <p>{L.p1}</p>
          <p>{L.p2}</p>
          <p>{L.p3}</p>
        </section>
      </main>
    </div>
  );
}

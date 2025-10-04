// app/terms/page.tsx
"use client";

import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";
import Link from "next/link";

export default function TermsPage() {
  const { lang } = useLang();
  const L = lang === "ur" ? ur : en;

  return (
    <AppShell title={L.title}>
      <div className="p-4 space-y-6">
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white/60 dark:bg-white/5">
          <h2 className="text-lg font-semibold">{L.intro.h}</h2>
          <p className="text-sm opacity-80 mt-2">{L.intro.p1}</p>
          <p className="text-sm opacity-80 mt-2">{L.intro.p2}</p>
          <p className="text-sm opacity-80 mt-2">
            {L.contact} <a className="underline" href="mailto:help@rentback.app">help@rentback.app</a>
          </p>
        </section>

        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white/60 dark:bg-white/5">
          <h3 className="font-semibold">{L.sections.use.h}</h3>
          <p className="text-sm opacity-80 mt-2">{L.sections.use.p}</p>

          <h3 className="font-semibold mt-5">{L.sections.privacy.h}</h3>
          <p className="text-sm opacity-80 mt-2">
            {L.sections.privacy.p}{" "}
            <Link href="/privacy" className="underline">{L.sections.privacy.link}</Link>.
          </p>

          <h3 className="font-semibold mt-5">{L.sections.liability.h}</h3>
          <p className="text-sm opacity-80 mt-2">{L.sections.liability.p}</p>

          <h3 className="font-semibold mt-5">{L.sections.changes.h}</h3>
          <p className="text-sm opacity-80 mt-2">{L.sections.changes.p}</p>
        </section>
      </div>
    </AppShell>
  );
}

const en = {
  title: "Terms",
  intro: {
    h: "Beta demo terms",
    p1: "This is a demonstration for RentBack. It simulates rent payments and rewards for product exploration only.",
    p2: "No real money moves. For production terms, we will publish updated legal documents before going live.",
  },
  contact: "Questions?",
  sections: {
    use: {
      h: "Acceptable use",
      p: "Please don’t attempt to abuse, reverse engineer, or disrupt the demo.",
    },
    privacy: {
      h: "Privacy",
      p: "We collect only minimal telemetry needed to operate this demo.",
      link: "See Privacy",
    },
    liability: {
      h: "Liability",
      p: "This demo is provided as-is without warranties. Use at your own discretion.",
    },
    changes: {
      h: "Changes",
      p: "We may update these terms at any time.",
    },
  },
};

const ur = {
  title: "شرائط",
  intro: {
    h: "بی-ٹا ڈیمو کی شرائط",
    p1: "یہ RentBack کا ڈیمو ہے جو صرف پروڈکٹ دیکھنے کے لیے کرایہ اور ریوارڈز کی نقالی کرتا ہے۔",
    p2: "کوئی حقیقی رقم منتقل نہیں ہوتی۔ پروڈکشن شرائط لانچ سے پہلے شائع کی جائیں گی۔",
  },
  contact: "سوالات؟",
  sections: {
    use: {
      h: "قابلِ قبول استعمال",
      p: "براہِ کرم ڈیمو کو خراب کرنے یا ریورس انجینئرنگ کی کوشش نہ کریں۔",
    },
    privacy: {
      h: "پرائیویسی",
      p: "ہم اس ڈیمو کے لیے صرف کم سے کم درکار ٹیلیمیٹری اکٹھی کرتے ہیں۔",
      link: "پرائیویسی دیکھیں",
    },
    liability: {
      h: "ذمہ داری",
      p: "یہ ڈیمو کسی ضمانت کے بغیر ‘جوں کا توں’ فراہم کیا جاتا ہے۔",
    },
    changes: {
      h: "تبدیلیاں",
      p: "ہم ان شرائط کو کسی بھی وقت اپڈیٹ کر سکتے ہیں۔",
    },
  },
};

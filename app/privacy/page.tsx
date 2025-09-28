"use client";
export const dynamic = "force-static";

import { useEffect, useState } from "react";

export default function PrivacyPage() {
  const [lang, setLang] = useState<"en" | "ur">("en");

  useEffect(() => {
    try {
      const l = localStorage.getItem("rb-lang");
      if (l === "en" || l === "ur") setLang(l);
      document.documentElement.setAttribute("lang", l ?? "en");
      document.documentElement.setAttribute("dir", l === "ur" ? "rtl" : "ltr");
    } catch {}
  }, []);

  const t = copy[lang];
  const dir = lang === "ur" ? "rtl" : "ltr";

  return (
    <main className="mx-auto max-w-3xl px-4 py-12" style={{ direction: dir }}>
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p className="mt-2 text-sm opacity-70">Last updated: 28 Sep 2025</p>

      <section className="mt-8 space-y-4 text-sm leading-6">
        <p>{t.intro}</p>

        <h2 className="text-xl font-semibold mt-6">{t.dataWeCollect.h}</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>{t.dataWeCollect.i}</li>
          <li>{t.dataWeCollect.p}</li>
          <li>{t.dataWeCollect.t}</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">{t.howWeUse.h}</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>{t.howWeUse.p}</li>
          <li>{t.howWeUse.s}</li>
          <li>{t.howWeUse.c}</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">{t.sharing.h}</h2>
        <p>{t.sharing.p}</p>

        <h2 className="text-xl font-semibold mt-6">{t.security.h}</h2>
        <p>{t.security.p}</p>

        <h2 className="text-xl font-semibold mt-6">{t.rights.h}</h2>
        <p>{t.rights.p}</p>

        <h2 className="text-xl font-semibold mt-6">{t.contact.h}</h2>
        <p>
          {t.contact.p}{" "}
          <a
            className="underline"
            href="mailto:privacy@rentback.pk"
          >
            privacy@rentback.pk
          </a>
          .
        </p>
      </section>
    </main>
  );
}

const copy = {
  en: {
    intro:
      "RentBack respects your privacy. This policy explains what we collect, why we collect it, and how we protect it.",
    dataWeCollect: {
      h: "Data We Collect",
      i: "Identity & contact info (name, email, phone).",
      p: "Payment details and transaction metadata necessary to process rent (no card PANs are stored on our servers).",
      t: "Technical data (device, usage, logs) to keep the service secure and reliable.",
    },
    howWeUse: {
      h: "How We Use Your Data",
      p: "To provide rent payments, receipts, and rewards.",
      s: "To prevent fraud, secure accounts, and meet legal/AML obligations.",
      c: "To communicate about your account, including support and service updates.",
    },
    sharing: {
      h: "Sharing",
      p: "We only share data with payment partners, banks, and service providers necessary to operate RentBack, or when required by law.",
    },
    security: {
      h: "Security",
      p: "We use encryption in transit and at rest where applicable, role-based access, and auditing. No system is 100% secure, but we work to protect your data.",
    },
    rights: {
      h: "Your Rights",
      p: "You can request access, correction, or deletion of your personal data subject to legal retention requirements.",
    },
    contact: {
      h: "Contact",
      p: "Questions about privacy?",
    },
  },
  ur: {
    intro:
      "RentBack آپ کی پرائیویسی کا احترام کرتا ہے۔ یہ پالیسی بتاتی ہے کہ ہم کیا معلومات اکٹھا کرتے ہیں، کیوں کرتے ہیں، اور انہیں کیسے محفوظ رکھتے ہیں۔",
    dataWeCollect: {
      h: "ہم کیا معلومات لیتے ہیں",
      i: "شناخت اور رابطہ معلومات (نام، ای میل، فون)۔",
      p: "ادائیگی کی تفصیل اور ٹرانزیکشن میٹا ڈیٹا (کارڈ نمبر ہمارے سرورز پر محفوظ نہیں کیے جاتے)۔",
      t: "تکنیکی ڈیٹا (ڈیوائس، استعمال، لاگز) تاکہ سروس محفوظ اور قابلِ اعتماد رہے۔",
    },
    howWeUse: {
      h: "استعمال کا طریقہ",
      p: "کرایہ ادائیگی، رسیدیں اور ریوارڈز فراہم کرنے کے لیے۔",
      s: "فراڈ کی روک تھام، اکاؤنٹ کی سیکیورٹی، اور قانونی/AML تقاضوں کے لیے۔",
      c: "اکاؤنٹ سے متعلق رابطے، مدد اور سروس اپڈیٹس کے لیے۔",
    },
    sharing: {
      h: "اشتراک",
      p: "ہم صرف ادائیگی پارٹنرز، بینکوں اور سروس پرووائیڈرز کے ساتھ ضروری حد تک معلومات شیئر کرتے ہیں، یا جب قانون کی ضرورت ہو۔",
    },
    security: {
      h: "سیکیورٹی",
      p: "ڈیٹا منتقلی اور ذخیرے میں جہاں قابلِ اطلاق ہو انکرپشن، رول بیسڈ ایکسیس، اور آڈٹنگ استعمال کی جاتی ہے۔",
    },
    rights: {
      h: "آپ کے حقوق",
      p: "آپ اپنی ذاتی معلومات تک رسائی، درستی یا حذف کرنے کی درخواست کر سکتے ہیں، قانونی تقاضوں کے مطابق۔",
    },
    contact: {
      h: "رابطہ",
      p: "پرائیویسی سے متعلق سوالات؟",
    },
  },
} as const;

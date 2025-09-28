"use client";
export const dynamic = "force-static";

import { useEffect, useState } from "react";

export default function TermsPage() {
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
      <h1 className="text-3xl font-bold">{t.title}</h1>
      <p className="mt-2 text-sm opacity-70">{t.lastUpdated} 28 Sep 2025</p>

      <section className="mt-8 space-y-6 text-sm leading-6">
        <p>{t.intro}</p>

        <div>
          <h2 className="text-xl font-semibold">{t.accept.h}</h2>
          <p>{t.accept.p}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">{t.accounts.h}</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>{t.accounts.a}</li>
            <li>{t.accounts.b}</li>
            <li>{t.accounts.c}</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">{t.payments.h}</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>{t.payments.a}</li>
            <li>{t.payments.b}</li>
            <li>{t.payments.c}</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">{t.rewards.h}</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>{t.rewards.a}</li>
            <li>{t.rewards.b}</li>
            <li>{t.rewards.c}</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">{t.use.h}</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>{t.use.a}</li>
            <li>{t.use.b}</li>
            <li>{t.use.c}</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">{t.termination.h}</h2>
          <p>{t.termination.p}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">{t.disclaimers.h}</h2>
          <p>{t.disclaimers.p}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">{t.liability.h}</h2>
          <p>{t.liability.p}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">{t.changes.h}</h2>
          <p>{t.changes.p}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">{t.law.h}</h2>
          <p>{t.law.p}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">{t.contact.h}</h2>
          <p>
            {t.contact.p}{" "}
            <a className="underline" href="mailto:legal@rentback.pk">
              legal@rentback.pk
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}

const copy = {
  en: {
    title: "Terms of Service",
    lastUpdated: "Last updated:",
    intro:
      "These Terms of Service (the “Terms”) govern your use of RentBack. By creating an account or using the service, you agree to these Terms.",
    accept: {
      h: "Acceptance of Terms",
      p: "If you do not agree, do not use RentBack. We may update these Terms from time to time. Continued use means you accept the changes."
    },
    accounts: {
      h: "Accounts & Eligibility",
      a: "You must be at least 18 and legally able to enter contracts in Pakistan.",
      b: "You are responsible for maintaining the confidentiality of your credentials and for all activity under your account.",
      c: "We may require identity verification and compliance checks (e.g., AML/CTF, sanctions screening)."
    },
    payments: {
      h: "Payments",
      a: "Payments may be facilitated via Raast, cards, or supported wallets. Processing is handled by regulated partners.",
      b: "You authorize us and our partners to debit and credit your accounts to complete rent payments and fees.",
      c: "Receipts and references are provided for successful transactions. Processing times and availability can vary by bank and scheme."
    },
    rewards: {
      h: "Rewards",
      a: "Points accrue based on qualifying rent payments and promotions, subject to caps and exclusions.",
      b: "Points have no cash value, are non-transferable, and may expire or be adjusted for refunds/chargebacks/fraud.",
      c: "Marketplace redemptions are subject to partner terms and availability."
    },
    use: {
      h: "Acceptable Use",
      a: "Do not use RentBack for illegal activities, fraud, or money laundering.",
      b: "Do not interfere with or abuse the service, including reverse engineering or unauthorized access.",
      c: "We may suspend or terminate accounts that violate these Terms or applicable law."
    },
    termination: {
      h: "Suspension & Termination",
      p: "We may suspend or terminate access at any time for suspected violations, risk, or non-compliance. You may close your account; certain data may be retained as required by law."
    },
    disclaimers: {
      h: "Disclaimers",
      p: "The service is provided “as is” without warranties of any kind. We do not guarantee uninterrupted or error-free operation, or that payments will always process within a particular time."
    },
    liability: {
      h: "Limitation of Liability",
      p: "To the maximum extent permitted by law, RentBack and its affiliates are not liable for indirect, incidental, or consequential damages. Our total liability is limited to the fees you paid to RentBack in the 3 months preceding the claim."
    },
    changes: {
      h: "Changes to the Service",
      p: "We may modify or discontinue features at any time. We will aim to provide notice where practical."
    },
    law: {
      h: "Governing Law & Disputes",
      p: "These Terms are governed by the laws of Pakistan. Courts in Karachi shall have exclusive jurisdiction, subject to any mandatory arbitration or mediation requirements under applicable law."
    },
    contact: {
      h: "Contact",
      p: "Questions about these Terms?"
    }
  },
  ur: {
    title: "سروس کی شرائط",
    lastUpdated: "آخری اپڈیٹ:",
    intro:
      "یہ شرائط (Terms) RentBack کے استعمال کو کنٹرول کرتی ہیں۔ اکاؤنٹ بنانے یا سروس استعمال کرنے سے آپ ان شرائط سے اتفاق کرتے ہیں۔",
    accept: {
      h: "شرائط کی منظوری",
      p: "اگر آپ متفق نہیں ہیں تو سروس استعمال نہ کریں۔ ہم وقتاً فوقتاً شرائط میں تبدیلی کر سکتے ہیں؛ استعمال جاری رکھنے کا مطلب ہے آپ تبدیلیاں قبول کرتے ہیں۔"
    },
    accounts: {
      h: "اکاؤنٹس اور اہلیت",
      a: "آپ کی عمر کم از کم 18 سال ہو اور پاکستان میں قانونی معاہدہ کرنے کے اہل ہوں۔",
      b: "اپنے لاگ اِن کی حفاظت اور اکاؤنٹ پر ہونے والی سرگرمی کے آپ خود ذمہ دار ہیں۔",
      c: "ہم شناختی تصدیق اور تعمیلی جانچ (جیسے AML/CTF، پابندیوں کی اسکریننگ) کر سکتے ہیں۔"
    },
    payments: {
      h: "ادائیگیاں",
      a: "ادائیگیاں راست، کارڈز یا معاون والیٹس کے ذریعے ہو سکتی ہیں؛ پراسیسنگ مجاز پارٹنرز کرتے ہیں۔",
      b: "آپ RentBack اور ہمارے پارٹنرز کو اکاؤنٹس سے رقم ڈیبٹ/کریڈٹ کرنے کی اجازت دیتے ہیں تاکہ کرایہ اور فیس مکمل ہو سکے۔",
      c: "کامیاب ٹرانزیکشنز پر رسید اور ریفرنس فراہم کیا جاتا ہے؛ اوقاتِ کار اور دستیابی بینک/اسکیما پر منحصر ہیں۔"
    },
    rewards: {
      h: "ریوارڈز",
      a: "اہل کرایہ ادائیگیوں اور پروموشنز پر پوائنٹس ملتے ہیں، حدود اور اخراجات لاگو ہو سکتے ہیں۔",
      b: "پوائنٹس کی نقدی قدر نہیں؛ غیر منتقلی پذیر ہیں؛ ریفنڈ/چارج بیک/فراڈ کی صورت میں ایکسیڈ یا منسوخ ہو سکتے ہیں۔",
      c: "مارکیٹ پلیس ریڈیمشن پارٹنر شرائط اور دستیابی کے تابع ہے۔"
    },
    use: {
      h: "قبول استعمال",
      a: "غیر قانونی سرگرمی، فراڈ یا منی لانڈرنگ کے لیے سروس استعمال نہ کریں۔",
      b: "سروس میں مداخلت/بد استعمال، ریورس انجینئرنگ یا غیر مجاز رسائی ممنوع ہے۔",
      c: "شرائط یا قانون کی خلاف ورزی پر اکاؤنٹ معطل یا بند کیا جا سکتا ہے۔"
    },
    termination: {
      h: "معطلی اور اختتام",
      p: "خلاف ورزی، خطرہ یا عدم تعمیل پر رسائی معطل/ختم کی جا سکتی ہے۔ آپ اکاؤنٹ بند کر سکتے ہیں؛ کچھ ڈیٹا قانونی ضرورت کے تحت برقرار رہ سکتا ہے۔"
    },
    disclaimers: {
      h: "ڈسکلیمر",
      p: "سروس ‘جوں کی توں’ فراہم کی جاتی ہے؛ کسی قسم کی ضمانت نہیں۔ نان اسٹاپ یا غلطی سے پاک عمل کی ضمانت نہیں دی جاتی۔"
    },
    liability: {
      h: "ذمہ داری کی حد",
      p: "قانونی حد تک RentBack اور اس سے منسلک ادارے بالواسطہ یا نتیجہ جاتی نقصانات کے ذمہ دار نہیں۔ ہماری کل ذمہ داری پچھلے 3 ماہ میں ادا کی گئی فیس تک محدود ہے۔"
    },
    changes: {
      h: "سروس میں تبدیلیاں",
      p: "ہم کسی بھی وقت فیچرز میں تبدیلی یا اختتام کر سکتے ہیں؛ ممکن ہو تو اطلاع دیں گے۔"
    },
    law: {
      h: "قانون اور تنازعات",
      p: "یہ شرائط پاکستان کے قوانین کے تحت ہیں۔ عدالتیں کراچی میں خصوصی دائرہ اختیار رکھتی ہیں، جب تک قابل اطلاق قانون کسی معاون عمل (مثلاً ثالثی) کا تقاضا نہ کرے۔"
    },
    contact: {
      h: "رابطہ",
      p: "ان شرائط سے متعلق سوالات؟"
    }
  }
} as const;

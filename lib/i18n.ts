// lib/i18n.ts

export const strings = {
  en: {
    app: "RentBack",
    demo: "Demo",
    needHelp: "Need help?",
    support: "Support",
    bottom: { home: "Home", pay: "Pay", rewards: "Rewards", profile: "Profile" },
    pay: {
      title: "Pay Rent",
      subtitle: "Create and send rent payments",
      amount: "Amount",
      method: "Payment Method",
      markSent: "Mark as Sent",
      receipt: "View Receipt",
      print: "Print Receipt",
    },
    rewards: {
      title: "Rewards",
      subtitle: "Earn points on every rent payment",
      redeem: "Redeem Voucher",
      recent: "Recent Activity",
      empty: "Make a rent payment to start earning points",
    },
    receipt: {
      title: "Payment Receipt",
      notReal: "Demo: Not a real payment",
      tenant: "Tenant",
      property: "Property",
      amount: "Amount",
      method: "Method",
      date: "Date",
      ref: "Reference",
      print: "Print / Save",
    },
    landlord: {
      ledger: "Ledger",
      payouts: "Payouts",
      discrepancies: "Discrepancies",
      properties: "Properties",
    },
    admin: {
      transactions: "Transactions",
      payouts: "Payouts Overview",
      discrepancies: "Discrepancy Report",
    },
    legal: { privacy: "Privacy Policy", terms: "Terms of Service" },
    toggles: {
      lang: { en: "EN", ur: "اردو" },
      theme: { light: "Light", dark: "Dark" },
    },
  },
  ur: {
    app: "رینٹ بیک",
    demo: "ڈیمو",
    needHelp: "مدد چاہیے؟",
    support: "سپورٹ",
    bottom: { home: "ہوم", pay: "ادائیگی", rewards: "انعامات", profile: "پروفائل" },
    pay: {
      title: "کرایہ ادا کریں",
      subtitle: "کرایہ کی ادائیگی بنائیں اور بھیجیں",
      amount: "رقم",
      method: "ادائیگی کا طریقہ",
      markSent: "بھیجا گیا نشان لگائیں",
      receipt: "رسید دیکھیں",
      print: "رسید پرنٹ کریں",
    },
    rewards: {
      title: "انعامات",
      subtitle: "ہر کرایہ کی ادائیگی پر پوائنٹس حاصل کریں",
      redeem: "واؤچر ریڈیم کریں",
      recent: "حالیہ سرگرمی",
      empty: "پوائنٹس کمانے کے لیے کرایہ ادا کریں",
    },
    receipt: {
      title: "ادائیگی کی رسید",
      notReal: "ڈیمو: یہ اصلی ادائیگی نہیں ہے",
      tenant: "کرایہ دار",
      property: "پراپرٹی",
      amount: "رقم",
      method: "طریقہ",
      date: "تاریخ",
      ref: "ریفرنس",
      print: "پرنٹ / محفوظ کریں",
    },
    landlord: {
      ledger: "کھاتہ",
      payouts: "ادائیگیوں کا خلاصہ",
      discrepancies: "فرق",
      properties: "پراپرٹیز",
    },
    admin: {
      transactions: "ٹرانزیکشنز",
      payouts: "ادائیگیوں کا جائزہ",
      discrepancies: "فرق رپورٹ",
    },
    legal: { privacy: "رازداری کی پالیسی", terms: "سروس کی شرائط" },
    toggles: {
      lang: { en: "EN", ur: "اردو" },
      theme: { light: "روشن", dark: "اندھیرا" },
    },
  },
} as const;

export type Lang = keyof typeof strings;

/** Return 'rtl' for Urdu so layout/margins flip correctly */
export function dirFor(lang: Lang): "ltr" | "rtl" {
  return lang === "ur" ? "rtl" : "ltr";
}

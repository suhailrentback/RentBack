// lib/i18n.ts
// Complete EN/UR strings for Tenant/Landlord/Admin + helpers.
// Safe drop-in replacement.

export type Lang = "en" | "ur";

/** Direction helper for RTL/LTR layouts */
export function dirFor(lang: Lang): "rtl" | "ltr" {
  return lang === "ur" ? "rtl" : "ltr";
}

/** Read preferred language (falls back to EN) */
export function getLang(): Lang {
  if (typeof window !== "undefined") {
    const v = window.localStorage.getItem("rb-lang");
    if (v === "en" || v === "ur") return v;
  }
  return "en";
}

/** Persist language and notify listeners */
export function setLang(lang: Lang) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("rb-lang", lang);
    try {
      window.dispatchEvent(new CustomEvent("rb-lang-changed", { detail: lang }));
    } catch {}
  }
}

/** Canonical strings */
export const strings = {
  en: {
    app: "RentBack",
    demo: "Demo",
    needHelp: "Need help?",
    support: "Support",

    // legacy/compat
    nav: { home: "Home" },

    // Bottom nav
    bottom: {
      home: "Home",
      pay: "Pay",
      rewards: "Rewards",
      profile: "Profile",
    },

    // Tenant → Pay
    pay: {
      title: "Pay Rent",
      subtitle: "Make a secure payment",
      property: "Property",
      amount: "Amount (PKR)",
      method: "Payment Method",
      create: "Create Payment",
      markSent: "Mark as Sent",
      print: "Print Receipt",
      receipt: "Receipt",
      success: "Payment created",
      recent: "Recent payments",
      emptyTitle: "No payments yet",
      emptyCta: "Create your first payment",
      methods: {
        raast: "Raast",
        bank: "Bank Transfer",
        jazzcash: "JazzCash",
      },
      dueWarning: "Amount is less than the expected due.",
    },

    // Tenant → Rewards
    rewards: {
      title: "Rewards",
      balance: "Balance",
      redeem: "Redeem",
      activity: "Recent activity",
      earned: "Earned",
      redeemed: "Redeemed",
      toGold: "to Gold Tier",
      empty: "Make a rent payment to start earning points",
      vendors: {
        foodpanda: "Foodpanda",
        daraz: "Daraz",
        careem: "Careem",
        cinepax: "Cinepax",
      },
      voucher: {
        code: "Voucher Code",
        copied: "Code copied",
        receiptTitle: "Redemption Receipt",
      },
    },

    // Tenant → Receipt
    receipt: {
      title: "Payment Receipt",
      demoNote: "Demo: Not a real payment",
      backHome: "Back to Home",
      print: "Print",
      tenant: "Tenant",
      email: "Email",
      property: "Property",
      amount: "Amount",
      method: "Method",
      date: "Date",
      ref: "Reference",
      qrHelp: "Scan to verify (demo)",
    },

    // Landlord
    landlord: {
      home: {
        title: "Landlord Dashboard",
        welcome: "Overview of payouts, ledger and properties",
        // KPI labels
        rentCollected: "Rent collected (30 days)",
        pendingCount: "Payments pending confirmation",
        // Card titles
        payoutsCard: "Payouts",
        ledgerCard: "Ledger",
        discrepanciesCard: "Discrepancies",
        propertiesCard: "Properties",
        // Payouts card block
        payouts: {
          title: "Payouts",
          next: "Next settlement",
          day: "Friday",
          none: "No settlements yet",
        },
        // Discrepancies card block
        discrepancies: {
          title: "Discrepancies",
          subtitle: "Underpaid vs expected due",
        },
        // Last payment block
        lastPayment: "Last payment",
        // 🔧 NEW: used by landlord/page.tsx for the button label
        viewReceipt: "View receipt",
      },
      ledger: {
        title: "Ledger",
        exportCsv: "Export CSV",
        empty: "No ledger entries yet",
        viewReceipt: "View receipt",
      },
      payouts: {
        title: "Payouts",
        exportCsv: "Export CSV",
        week: "Week",
        amount: "Amount",
        status: "Status",
      },
      discrepancies: {
        title: "Discrepancies",
        exportCsv: "Export CSV",
        rowHint: "Payments under expected amount",
      },
      properties: {
        title: "Properties",
        tenants: "Tenants",
        readOnly: "Read-only (demo)",
      },
    },

    // Admin
    admin: {
      home: {
        title: "Admin",
        payouts: "Payouts Overview",
        discrepancies: "Discrepancy Report",
        transactions: "Transactions",
      },
      transactions: {
        title: "Transactions",
        exportCsv: "Export CSV",
      },
      payouts: {
        title: "Payouts Overview",
        exportCsv: "Export CSV",
      },
      discrepancies: {
        title: "Discrepancy Report",
        exportCsv: "Export CSV",
      },
    },

    // Legal
    legal: {
      privacy: "Privacy Policy",
      terms: "Terms of Service",
    },
  },

  ur: {
    app: "رینٹ بیک",
    demo: "ڈیمو",
    needHelp: "مدد چاہیے؟",
    support: "سپورٹ",

    nav: { home: "ہوم" },

    bottom: {
      home: "ہوم",
      pay: "ادائیگی",
      rewards: "ریوارڈز",
      profile: "پروفائل",
    },

    pay: {
      title: "کرایہ ادا کریں",
      subtitle: "محفوظ ادائیگی کریں",
      property: "پراپرٹی",
      amount: "رقم (روپے)",
      method: "ادائیگی کا طریقہ",
      create: "ادائیگی بنائیں",
      markSent: "بھجوایا نشان لگائیں",
      print: "رسید پرنٹ کریں",
      receipt: "رسید",
      success: "ادائیگی بن گئی",
      recent: "حالیہ ادائیگیاں",
      emptyTitle: "ابھی کوئی ادائیگی نہیں",
      emptyCta: "اپنی پہلی ادائیگی بنائیں",
      methods: {
        raast: "راعست",
        bank: "بینک ٹرانسفر",
        jazzcash: "جاز کیش",
      },
      dueWarning: "رقم واجب الادا سے کم ہے۔",
    },

    rewards: {
      title: "ریوارڈز",
      balance: "بیلنس",
      redeem: "ریڈیـم",
      activity: "حالیہ سرگرمی",
      earned: "حاصل",
      redeemed: "ریڈیـمڈ",
      toGold: "گولڈ لیول تک",
      empty: "ریوارڈز حاصل کرنے کے لیے کرایہ ادا کریں",
      vendors: {
        foodpanda: "فوڈ پانڈا",
        daraz: "دراذ",
        careem: "کریم",
        cinepax: "سنی پیکس",
      },
      voucher: {
        code: "واؤچر کوڈ",
        copied: "کوڈ کاپی ہو گیا",
        receiptTitle: "ریڈیمپشن رسید",
      },
    },

    receipt: {
      title: "ادائیگی کی رسید",
      demoNote: "ڈیمو: یہ اصل ادائیگی نہیں ہے",
      backHome: "ہوم پر واپس",
      print: "پرنٹ",
      tenant: "کرایہ دار",
      email: "ای میل",
      property: "پراپرٹی",
      amount: "رقم",
      method: "طریقہ",
      date: "تاریخ",
      ref: "حوالہ",
      qrHelp: "تصدیق کے لیے اسکین کریں (ڈیمو)",
    },

    landlord: {
      home: {
        title: "لینڈلارڈ ڈیش بورڈ",
        welcome: "ادائیگیوں، لیجر اور پراپرٹیز کا خلاصہ",
        rentCollected: "گزشتہ 30 دن میں وصول شدہ کرایہ",
        pendingCount: "زیرِ التواء ادائیگیاں",
        payoutsCard: "ادائیگیاں",
        ledgerCard: "کھاتہ",
        discrepanciesCard: "فرق",
        propertiesCard: "پراپرٹیز",
        payouts: {
          title: "ادائیگیاں",
          next: "اگلی سیٹلمنٹ",
          day: "جمعہ",
          none: "ابھی کوئی سیٹلمنٹ نہیں",
        },
        discrepancies: {
          title: "فرق",
          subtitle: "متوقع رقم کے مقابلے کم ادائیگی",
        },
        lastPayment: "آخری ادائیگی",
        // 🔧 NEW (Urdu): matches landlord.home.viewReceipt usage
        viewReceipt: "رسید دیکھیں",
      },
      ledger: {
        title: "کھاتہ",
        exportCsv: "CSV ایکسپورٹ",
        empty: "کوئی اندراج موجود نہیں",
        viewReceipt: "رسید دیکھیں",
      },
      payouts: {
        title: "ادائیگیاں",
        exportCsv: "CSV ایکسپورٹ",
        week: "ہفتہ",
        amount: "رقم",
        status: "حالت",
      },
      discrepancies: {
        title: "فرق کی رپورٹ",
        exportCsv: "CSV ایکسپورٹ",
        rowHint: "متوقع رقم سے کم ادائیگیاں",
      },
      properties: {
        title: "پراپرٹیز",
        tenants: "کرایہ دار",
        readOnly: "صرف دیکھنے کے لیے (ڈیمو)",
      },
    },

    admin: {
      home: {
        title: "ایڈمن",
        payouts: "ادائیگیوں کا جائزہ",
        discrepancies: "فرق رپورٹ",
        transactions: "ٹرانزیکشنز",
      },
      transactions: {
        title: "ٹرانزیکشنز",
        exportCsv: "CSV ایکسپورٹ",
      },
      payouts: {
        title: "ادائیگیوں کا جائزہ",
        exportCsv: "CSV ایکسپورٹ",
      },
      discrepancies: {
        title: "فرق رپورٹ",
        exportCsv: "CSV ایکسپورٹ",
      },
    },

    legal: {
      privacy: "پرائیویسی پالیسی",
      terms: "شرائطِ استعمال",
    },
  },
} as const;

export type Strings = typeof strings.en;

/** Accessor */
export function t(lang: Lang): typeof strings.en {
  return strings[lang];
}

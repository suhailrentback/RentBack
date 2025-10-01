// lib/i18n.ts
// Simple i18n bundle used by the demo. No JSX here—pure TypeScript only.

export type Lang = "en" | "ur";

export const strings = {
  en: {
    app: "RentBack",
    demo: "Demo",
    needHelp: "Need help?",
    support: "Support",

    nav: {
      home: "Home",
    },

    bottom: {
      home: "Home",
      pay: "Pay",
      rewards: "Rewards",
      profile: "Profile",
    },

    toggles: {
      dark: "Dark",
      light: "Light",
      urdu: "اردو",
      english: "English",
    },

    tenant: {
      home: {
        title: "Dashboard",
        subtitle: "Your rent, rewards and receipts at a glance",
        rentDue: "Current rent due",
        quickPay: "Pay now",
        rewardsBalance: "Rewards balance",
        lastPayment: "Last payment",
        viewReceipt: "View receipt",
        shortcuts: {
          pay: "Pay Rent",
          rewards: "Rewards",
          receipts: "Receipts",
          support: "Support",
        },
      },

      pay: {
        title: "Pay Rent",
        subtitle: "Create a payment and mark as sent",
        property: "Property",
        amount: "Amount (PKR)",
        method: "Payment method",
        methods: {
          RAAST: "Raast (demo)",
          BANK: "Bank Transfer (demo)",
          JAZZCASH: "JazzCash (demo)",
        },
        create: "Create Payment",
        markSent: "Mark as Sent",
        sent: "Sent",
        pending: "Pending",
        warnBelowDue: "Amount is below the due amount.",
        receipt: "Receipt",
        print: "Print",
      },

      receipt: {
        title: "Payment Receipt",
        demoBadge: "Demo: Not a real payment",
        tenant: "Tenant",
        property: "Property",
        amount: "Amount",
        method: "Method",
        date: "Date",
        raastRef: "Raast reference",
        print: "Print / Save",
      },

      rewards: {
        title: "Rewards",
        balance: "Current balance",
        redeem: "Quick redeem",
        activity: "Recent activity",
        earned: "Earned",
        redeemed: "Redeemed",
        voucherCode: "Voucher code",
        progress: {
          toGold: "You're {{pts}} pts away from Gold Tier",
        },
        empty: "Make a rent payment to start earning points.",
      },

      profile: {
        title: "Profile",
        signOut: "Sign out (demo)",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        needHelp: "Need Help?",
      },
    },

    landlord: {
      home: {
        title: "Landlord Dashboard",
        welcome: "Overview of payouts, ledger and properties",

        rentCollected: "Rent collected (30 days)",
        pendingCount: "Payments pending confirmation",

        payoutsCard: "Payouts",
        ledgerCard: "Ledger",
        discrepanciesCard: "Discrepancies",
        propertiesCard: "Properties",

        payouts: {
          title: "Payouts",
          next: "Next settlement",
          day: "Friday",
          none: "No payouts yet",
        },

        discrepancies: {
          title: "Discrepancies",
          subtitle: "Payments below due",
        },

        lastPayment: "Last payment",
        viewReceipt: "View receipt",
        emptyLastPayment: "No recent payments",

        quickLinks: {
          ledger: "Go to Ledger",
          payouts: "View Payouts",
          discrepancies: "Review Discrepancies",
          properties: "Manage Properties",
        },
      },

      properties: {
        title: "Properties",
        tenants: "Tenants",
        readOnly: "Read-only (demo)",
        none: "No properties found",
      },
    },

    admin: {
      home: {
        title: "Admin",
        cards: {
          payouts: "Payouts Overview",
          discrepancies: "Discrepancy Report",
          transactions: "Transactions",
        },
      },
      payouts: {
        title: "Payouts Overview",
      },
      discrepancies: {
        title: "Discrepancy Report",
      },
      transactions: {
        title: "Transactions",
      },
    },
  },

  ur: {
    app: "رینٹ بیک",
    demo: "ڈیمو",
    needHelp: "مدد درکار؟",
    support: "سپورٹ",

    nav: {
      home: "ہوم",
    },

    bottom: {
      home: "ہوم",
      pay: "ادائیگی",
      rewards: "ریوارڈز",
      profile: "پروفائل",
    },

    toggles: {
      dark: "ڈارک",
      light: "لائٹ",
      urdu: "اردو",
      english: "English",
    },

    tenant: {
      home: {
        title: "ڈیش بورڈ",
        subtitle: "آپ کے کرایہ، ریوارڈز اور رسیدیں ایک نظر میں",
        rentDue: "موجودہ واجب الادا کرایہ",
        quickPay: "ابھی ادا کریں",
        rewardsBalance: "ریوارڈز بیلنس",
        lastPayment: "آخری ادائیگی",
        viewReceipt: "رسیـد دیکھیں",
        shortcuts: {
          pay: "کرایہ ادا کریں",
          rewards: "ریوارڈز",
          receipts: "رسیـدیں",
          support: "سپورٹ",
        },
      },

      pay: {
        title: "کرایہ ادا کریں",
        subtitle: "ادائیگی بنائیں اور بھیج دیا کی حیثیت لگائیں",
        property: "پراپرٹی",
        amount: "رقم (PKR)",
        method: "ادائیگی کا طریقہ",
        methods: {
          RAAST: "راست (ڈیمو)",
          BANK: "بینک ٹرانسفر (ڈیمو)",
          JAZZCASH: "جاز کیش (ڈیمو)",
        },
        create: "ادائیگی بنائیں",
        markSent: "بھیج دیا",
        sent: "بھیج دیا",
        pending: "زیر التواء",
        warnBelowDue: "رقم واجب الادا سے کم ہے۔",
        receipt: "رسیـد",
        print: "پرنٹ",
      },

      receipt: {
        title: "ادائیگی کی رسید",
        demoBadge: "ڈیمو: حقیقی ادائیگی نہیں",
        tenant: "کرایہ دار",
        property: "پراپرٹی",
        amount: "رقم",
        method: "طریقہ",
        date: "تاریخ",
        raastRef: "راست حوالہ",
        print: "پرنٹ / محفوظ کریں",
      },

      rewards: {
        title: "ریوارڈز",
        balance: "موجودہ بیلنس",
        redeem: "فوری ری ڈیم",
        activity: "حالیہ سرگرمی",
        earned: "حاصل",
        redeemed: "ری ڈیم",
        voucherCode: "واؤچر کوڈ",
        progress: {
          toGold: "گولڈ ٹئیر تک {{pts}} پوائنٹس باقی",
        },
        empty: "ریوارڈز حاصل کرنے کے لیے کرایہ ادا کریں۔",
      },

      profile: {
        title: "پروفائل",
        signOut: "سائن آؤٹ (ڈیمو)",
        privacy: "پرائیویسی پالیسی",
        terms: "سروس کی شرائط",
        needHelp: "مدد درکار؟",
      },
    },

    landlord: {
      home: {
        title: "لینڈلارڈ ڈیش بورڈ",
        welcome: "ادائیگیوں، لیجر اور پراپرٹیز کا خلاصہ",

        rentCollected: "گزشتہ 30 دن کا حاصل کردہ کرایہ",
        pendingCount: "تصدیق کے منتظر پرداخت",

        payoutsCard: "ادائیگیاں",
        ledgerCard: "کھاتہ",
        discrepanciesCard: "فرق",
        propertiesCard: "پراپرٹیز",

        payouts: {
          title: "ادائیگیاں",
          next: "اگلی سیٹلمنٹ",
          day: "جمعہ",
          none: "تاحال کوئی ادائیگی نہیں",
        },

        discrepancies: {
          title: "فرق",
          subtitle: "واجب الادا سے کم ادائیگیاں",
        },

        lastPayment: "آخری ادائیگی",
        viewReceipt: "رسیـد دیکھیں",
        emptyLastPayment: "کوئی حالیہ ادائیگی نہیں",

        quickLinks: {
          ledger: "لیجر پر جائیں",
          payouts: "ادائیگیاں دیکھیں",
          discrepancies: "فرق چیک کریں",
          properties: "پراپرٹیز مینیج کریں",
        },
      },

      properties: {
        title: "پراپرٹیز",
        tenants: "کرایہ دار",
        readOnly: "صرف دیکھنے کے لیے (ڈیمو)",
        none: "کوئی پراپرٹی موجود نہیں",
      },
    },

    admin: {
      home: {
        title: "ایڈمن",
        cards: {
          payouts: "پے آؤٹس اوور ویو",
          discrepancies: "ڈسکریپینسی رپورٹ",
          transactions: "ٹرانزیکشنز",
        },
      },
      payouts: {
        title: "پے آؤٹس اوور ویو",
      },
      discrepancies: {
        title: "ڈسکریپینسی رپورٹ",
      },
      transactions: {
        title: "ٹرانزیکشنز",
      },
    },
  },
} as const;

export const isRTL = (lang: Lang) => lang === "ur";
export const dirFor = (lang: Lang) => (isRTL(lang) ? "rtl" : "ltr");

// Optional: a tiny helper if you ever want to get a language at runtime.
// For now, most pages just import `strings` and choose keys directly.
export const getStrings = (lang: Lang = "en") => strings[lang];

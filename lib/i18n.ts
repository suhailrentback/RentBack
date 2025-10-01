// lib/i18n.ts
// Pure TypeScript i18n bundle (no JSX). Backwards-compatible with pages
// that referenced both old and new key shapes across tenant/landlord/admin.

export type Lang = "en" | "ur";

export const dirFor = (lang: Lang) => (lang === "ur" ? "rtl" : "ltr");

// Optional helper if a page wants the current language bundle.
// (Pages can also directly use strings.en / strings.ur.)
export function currentLang(): Lang {
  if (typeof window !== "undefined") {
    const v = window.localStorage.getItem("lang");
    if (v === "en" || v === "ur") return v;
  }
  return "en";
}

export const strings = {
  en: {
    app: "RentBack",
    demo: "Demo",
    needHelp: "Need help?",
    support: "Support",

    nav: { home: "Home" },
    bottom: { home: "Home", pay: "Pay", rewards: "Rewards", profile: "Profile" },

    // Provide BOTH shapes for toggles to avoid breakage
    toggles: {
      dark: "Dark",
      light: "Light",
      urdu: "Urdu",
      english: "English",
      theme: { dark: "Dark", light: "Light" },
      lang: { english: "English", urdu: "Urdu" },
    },

    // Top-level receipt (some pages referenced t.receipt.*)
    receipt: {
      title: "Payment Receipt",
      demo: "Demo: Not a real payment",
      print: "Print / Save",
      sent: "Sent",
      pending: "Pending",
      qrLabel: "Scan to verify (demo)",
      backHome: "Back to Home",
      makeAnotherPayment: "Make Another Payment",
      rewardsLinkLabel: "Claim Rewards",
      notFoundTitle: "Receipt Not Found",
      notFoundBody: "Could not find a receipt with that ID.",
      details: {
        tenant: "Tenant",
        email: "Email",
        property: "Property",
        amount: "Amount",
        method: "Method",
        date: "Date",
        raastRef: "Raast reference",
        status: "Status",
        raast: "Raast Reference",
      },
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

      // Duplicate of top-level receipt to satisfy pages using t.tenant.receipt.*
      receipt: {
        title: "Payment Receipt",
        demo: "Demo: Not a real payment",
        print: "Print / Save",
        sent: "Sent",
        pending: "Pending",
        qrLabel: "Scan to verify (demo)",
        backHome: "Back to Home",
        makeAnotherPayment: "Make Another Payment",
        rewardsLinkLabel: "Claim Rewards",
        notFoundTitle: "Receipt Not Found",
        notFoundBody: "Could not find a receipt with that ID.",
        details: {
          tenant: "Tenant",
          email: "Email",
          property: "Property",
          amount: "Amount",
          method: "Method",
          date: "Date",
          raastRef: "Raast reference",
          status: "Status",
          raast: "Raast Reference",
        },
      },

      rewards: {
        title: "Rewards",
        balance: "Current balance",
        redeem: "Quick redeem",
        activity: "Recent activity",
        earned: "Earned",
        redeemed: "Redeemed",
        voucherCode: "Voucher code",
        progress: { toGold: "You're {{pts}} pts away from Gold Tier" },
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

        // These lines were missing in a few failing builds:
        rentCollected: "Rent collected (30 days)",
        pendingCount: "Payments pending confirmation",
        payoutsCard: "Payouts",
        ledgerCard: "Ledger",
        discrepanciesCard: "Discrepancies",
        propertiesCard: "Properties",
        lastPayment: "Last payment",
        viewReceipt: "View receipt",
        emptyLastPayment: "No recent payments",

        quickLinks: {
          ledger: "View Ledger",
          payouts: "Payouts",
          discrepancies: "Discrepancies",
          properties: "Properties",
        },

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
      },

      properties: {
        title: "Properties",
        subtitle: "Manage your properties and tenants",
        none: "No properties found.",
        tenants: "Tenants",
        expected: "Expected",
        due: "Next Due",
        status: "Status",
        active: "Active",
        tenant: "Tenant",
      },
    },

    admin: {
      home: {
        title: "Admin",
        cards: {
          transactions: { title: "Transactions", subtitle: "Search & export" },
          payouts: { title: "Payouts Overview", subtitle: "Weekly settlements" },
          discrepancies: { title: "Discrepancies", subtitle: "Underpayments" },
        },
      },
      transactions: {
        title: "Transactions",
        filter30: "Last 30 days",
        exportCsv: "Export CSV",
        none: "No transactions found",
      },
      payouts: {
        title: "Payouts Overview",
        exportCsv: "Export CSV",
        none: "No payouts yet",
      },
      discrepancies: {
        title: "Discrepancy Report",
        exportCsv: "Export CSV",
        none: "No discrepancies found",
      },
    },

    legal: { privacy: "Privacy Policy", terms: "Terms of Service" },
  },

  ur: {
    app: "رينٹ بیک",
    demo: "ڈیمو",
    needHelp: "مدد چاہیے؟",
    support: "سپورٹ",

    nav: { home: "ہوم" },
    bottom: { home: "ہوم", pay: "ادائیگی", rewards: "انعامات", profile: "پروفائل" },

    // Both shapes for safety
    toggles: {
      dark: "ڈارک",
      light: "لائٹ",
      urdu: "اردو",
      english: "English",
      theme: { dark: "ڈارک", light: "لائٹ" },
      lang: { english: "English", urdu: "اردو" },
    },

    receipt: {
      title: "ادائیگی کی رسید",
      demo: "ڈیمو: حقیقی ادائیگی نہیں",
      print: "پرنٹ / محفوظ کریں",
      sent: "بھیجا گیا",
      pending: "زیر التواء",
      qrLabel: "تصدیق کے لیے اسکین کریں (ڈیمو)",
      backHome: "ہوم پر واپس",
      makeAnotherPayment: "ایک اور ادائیگی کریں",
      rewardsLinkLabel: "انعامات کا دعوی کریں",
      notFoundTitle: "رسید نہیں ملی",
      notFoundBody: "اس ID کے ساتھ کوئی رسید نہیں مل سکی۔",
      details: {
        tenant: "کرایہ دار",
        email: "ای میل",
        property: "پراپرٹی",
        amount: "رقم",
        method: "طریقہ",
        date: "تاریخ",
        raastRef: "راست حوالہ",
        status: "حیثیت",
        raast: "راست حوالہ",
      },
    },

    tenant: {
      home: {
        title: "ڈیش بورڈ",
        subtitle: "آپ کا کرایہ، انعامات اور رسیدیں ایک نظر میں",
        rentDue: "موجودہ کرایہ",
        quickPay: "ابھی ادائیگی کریں",
        rewardsBalance: "انعامات کا بیلنس",
        lastPayment: "آخری ادائیگی",
        viewReceipt: "رسید دیکھیں",
        shortcuts: {
          pay: "کرایہ ادا کریں",
          rewards: "انعامات",
          receipts: "رسیدیں",
          support: "سپورٹ",
        },
      },
      pay: {
        title: "کرایہ ادا کریں",
        subtitle: "ادائیگی بنائیں اور بھیجا ہوا نشان زد کریں",
        property: "پراپرٹی",
        amount: "رقم (PKR)",
        method: "ادائیگی کا طریقہ",
        methods: {
          RAAST: "راست (ڈیمو)",
          BANK: "بینک ٹرانسفر (ڈیمو)",
          JAZZCASH: "جاز کیش (ڈیمو)",
        },
        create: "ادائیگی بنائیں",
        markSent: "بھیجا ہوا نشان زد کریں",
        sent: "بھیجا گیا",
        pending: "زیر التواء",
        warnBelowDue: "رقم واجب الادا رقم سے کم ہے۔",
        receipt: "رسید",
        print: "پرنٹ کریں",
      },

      receipt: {
        title: "ادائیگی کی رسید",
        demo: "ڈیمو: حقیقی ادائیگی نہیں",
        print: "پرنٹ / محفوظ کریں",
        sent: "بھیجا گیا",
        pending: "زیر التواء",
        qrLabel: "تصدیق کے لیے اسکین کریں (ڈیمو)",
        backHome: "ہوم پر واپس",
        makeAnotherPayment: "ایک اور ادائیگی کریں",
        rewardsLinkLabel: "انعامات کا دعوی کریں",
        notFoundTitle: "رسید نہیں ملی",
        notFoundBody: "اس ID کے ساتھ کوئی رسید نہیں مل سکی۔",
        details: {
          tenant: "کرایہ دار",
          email: "ای میل",
          property: "پراپرٹی",
          amount: "رقم",
          method: "طریقہ",
          date: "تاریخ",
          raastRef: "راست حوالہ",
          status: "حیثیت",
          raast: "راست حوالہ",
        },
      },

      rewards: {
        title: "انعامات",
        balance: "موجودہ بیلنس",
        redeem: "فوری چھڑائیں",
        activity: "حالیہ سرگرمی",
        earned: "کمائے",
        redeemed: "چھڑائے",
        voucherCode: "واؤچر کوڈ",
        progress: { toGold: "آپ گولڈ ٹائر سے {{pts}} پوائنٹس دور ہیں" },
        empty: "پوائنٹس کمانا شروع کرنے کے لیے کرایہ کی ادائیگی کریں۔",
      },

      profile: {
        title: "پروفائل",
        signOut: "سائن آؤٹ (ڈیمو)",
        privacy: "رازداری کی پالیسی",
        terms: "سروس کی شرائط",
        needHelp: "مدد چاہیے؟",
      },
    },

    landlord: {
      home: {
        title: "مکان مالک کا ڈیش بورڈ",
        welcome: "ادائیگیوں، لیجر اور جائیدادوں کا جائزہ",

        rentCollected: "اکھٹا ہوا کرایہ (30 دن)",
        pendingCount: "تصدیق کے منتظر",
        payoutsCard: "ادائیگیاں",
        ledgerCard: "کھاتہ",
        discrepanciesCard: "فرق",
        propertiesCard: "پراپرٹیز",
        lastPayment: "آخری ادائیگی",
        viewReceipt: "رسید دیکھیں",
        emptyLastPayment: "کوئی حالیہ ادائیگی نہیں",

        quickLinks: {
          ledger: "لیجر دیکھیں",
          payouts: "ادائیگیاں",
          discrepancies: "فرق",
          properties: "پراپرٹیز",
        },

        payouts: {
          title: "ادائیگیاں",
          next: "اگلی سیٹلمنٹ",
          day: "جمعہ",
          none: "ابھی تک کوئی ادائیگی نہیں",
        },

        discrepancies: {
          title: "فرق",
          subtitle: "واجب الادا سے کم ادائیگیاں",
        },
      },

      properties: {
        title: "جائیدادیں",
        subtitle: "اپنی جائیدادوں اور کرایہ داروں کا نظم کریں",
        none: "کوئی جائیداد نہیں ملی۔",
        tenants: "کرایہ دار",
        expected: "متوقع",
        due: "اگلی تاریخ",
        status: "حیثیت",
        active: "فعال",
        tenant: "کرایہ دار",
      },
    },

    admin: {
      home: {
        title: "ایڈمن",
        cards: {
          transactions: { title: "ٹرانزیکشنز", subtitle: "تلاش اور ایکسپورٹ" },
          payouts: { title: "ادائیگیوں کا خلاصہ", subtitle: "ہفتہ وار سیٹلمنٹ" },
          discrepancies: { title: "فرق رپورٹ", subtitle: "کم ادائیگیاں" },
        },
      },
      transactions: {
        title: "ٹرانزیکشنز",
        filter30: "آخری 30 دن",
        exportCsv: "CSV ایکسپورٹ",
        none: "کوئی ٹرانزیکشن نہیں",
      },
      payouts: {
        title: "ادائیگیوں کا خلاصہ",
        exportCsv: "CSV ایکسپورٹ",
        none: "ابھی تک کوئی ادائیگی نہیں",
      },
      discrepancies: {
        title: "فرق رپورٹ",
        exportCsv: "CSV ایکسپورٹ",
        none: "کوئی فرق نہیں ملا",
      },
    },

    legal: { privacy: "رازداری پالیسی", terms: "سروس کی شرائط" },
  },
} as const;

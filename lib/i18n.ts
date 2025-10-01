 // lib/i18n.ts

export type Lang = "en" | "ur";

export const strings = {
  en: {
    app: "RentBack",
    demo: "Demo",
    needHelp: "Need help?",
    support: "Support",
    bottom: { home: "Home", pay: "Pay", rewards: "Rewards", profile: "Profile" },

    signIn: "Sign in",
    signOut: "Sign out",
    email: "Email",
    continue: "Continue",

    pay: {
      title: "Pay Rent",
      subtitle: "Demo Mode — no real charges",
      amount: "Amount (PKR)",
      landlord: "Landlord / Property",
      method: "Method",
      create: "Create Payment (Demo)",
      csv: "Download CSV",
      recent: "Recent",
      instructions: "Instructions",
      succeeded: "Succeeded",
      sent: "Sent",
      refunded: "Refunded",
      markSent: "Mark as Sent",
      receipt: "View Receipt",
      refund: "Refund (Demo)",
      invalid: "Enter amount and landlord name.",
      transferTo: "Send to",
      iban: "IBAN",
      memo: "Memo",
      collections: "RentBack Collections",
      ibanValue: "PK00-RENT-0000-0007",
      print: "Print / Save PDF",
      close: "Close",
      status: "Status",
      copy: "Copy",
      copied: "Copied",
      raastQR: "Raast QR (demo)",
    },

    rewards: {
      title: "Rewards",
      subtitle: "Pakistan-focused perks",
      redeem: "Redeem",
      choose: "Choose denomination",
      confirm: "Confirm Redemption",
      cancel: "Cancel",
      recent: "Recent Redemptions",
      none: "No redemptions yet.",
      viewReceipt: "View Redeem Receipt",
      receiptTitle: "Redemption Receipt",
      points: "Points",
      status: "Status",
      balance: "Current Balance",
      activity: "Activity",
      earn: "Earn",
      redeemAction: "Redeem",
      toNextTier: "to next tier",
    },

    receipt: {
      title: "Payment Receipt",
      demoNote: "Demo: Not a real payment",
      tenant: "Tenant",
      email: "Email",
      property: "Property",
      amount: "Amount",
      method: "Method",
      date: "Date",
      reference: "Reference",
      print: "Print",
      backHome: "Back to Home",
    },

    landlord: {
      home: {
        title: "Landlord Dashboard",
        welcome: "Overview of payouts, ledger and properties",
        payoutsCard: "Payouts",
        ledgerCard: "Ledger",
        discrepanciesCard: "Discrepancies",
        propertiesCard: "Properties",
      },

      ledger: {
        title: "Ledger",
        empty: "No entries yet.",
        exportCsv: "Export CSV",
        viewReceipt: "View receipt",
      },

      payouts: {
        title: "Payouts",
        weeklySummary: "Weekly settlement summary",
        exportCsv: "Export CSV",
      },

      discrepancies: {
        title: "Discrepancies",
        description: "Payments that look short vs due amount",
        exportCsv: "Export CSV",
      },

      properties: {
        title: "Properties",
        tenants: "Tenants",
        units: "Units",
        address: "Address",
        lastPaid: "Last paid",
      },
    },

    admin: {
      home: {
        title: "Admin",
        payouts: "Payouts Overview",
        discrepancies: "Discrepancy Report",
        transactions: "Transactions",
      },
      payouts: {
        title: "Payouts Overview",
        exportCsv: "Export CSV",
      },
      discrepancies: {
        title: "Discrepancy Report",
        exportCsv: "Export CSV",
      },
      transactions: {
        title: "Transactions",
        exportCsv: "Export CSV",
      },
    },

    legal: {
      privacy: "Privacy Policy",
      terms: "Terms of Service",
    },
  },

  ur: {
    app: "RentBack",
    demo: "ڈیمو",
    needHelp: "مدد چاہیے؟",
    support: "مدد",
    bottom: { home: "ہوم", pay: "ادائیگی", rewards: "انعامات", profile: "پروفائل" },

    signIn: "سائن اِن",
    signOut: "لاگ آؤٹ",
    email: "ای میل",
    continue: "جاری رکھیں",

    pay: {
      title: "کرایہ ادا کریں",
      subtitle: "ڈیمو — کوئی حقیقی چارج نہیں",
      amount: "رقم (PKR)",
      landlord: "مالک / پراپرٹی",
      method: "طریقہ",
      create: "ادائیگی بنائیں (ڈیمو)",
      csv: "CSV ڈاؤن لوڈ",
      recent: "حالیہ",
      instructions: "ہدایات",
      succeeded: "کامیاب",
      sent: "بھیج دیا",
      refunded: "ریفنڈ",
      markSent: "Sent نشان",
      receipt: "رسید دیکھیں",
      refund: "ریفنڈ (ڈیمو)",
      invalid: "رقم اور مالک/پراپرٹی لکھیں۔",
      transferTo: "موصول کنندہ",
      iban: "IBAN",
      memo: "میمو",
      collections: "RentBack Collections",
      ibanValue: "PK00-RENT-0000-0007",
      print: "پرنٹ / PDF",
      close: "بند کریں",
      status: "اسٹیٹس",
      copy: "کاپی",
      copied: "کاپی ہو گیا",
      raastQR: "راست کیو آر (ڈیمو)",
    },

    rewards: {
      title: "انعامات",
      subtitle: "پاکستان کے لیے سہولتیں",
      redeem: "ریڈیم",
      choose: "ڈینام منتخب کریں",
      confirm: "تصدیق",
      cancel: "منسوخ",
      recent: "حالیہ ریڈیمپشنز",
      none: "ابھی تک کوئی ریڈیمپشن نہیں۔",
      viewReceipt: "ریڈیم رسید",
      receiptTitle: "ریڈیمپشن رسید",
      points: "پوائنٹس",
      status: "اسٹیٹس",
      balance: "موجودہ بیلنس",
      activity: "سرگرمیاں",
      earn: "کمانا",
      redeemAction: "ریڈیم",
      toNextTier: "اگلے درجے تک",
    },

    receipt: {
      title: "ادائیگی کی رسید",
      demoNote: "ڈیمو: یہ حقیقی ادائیگی نہیں",
      tenant: "کرایہ دار",
      email: "ای میل",
      property: "پراپرٹی",
      amount: "رقم",
      method: "طریقہ",
      date: "تاریخ",
      reference: "حوالہ",
      print: "پرنٹ",
      backHome: "واپس ہوم",
    },

    landlord: {
      home: {
        title: "مالک ڈیش بورڈ",
        welcome: "ادائیگیوں، کھاتے اور پراپرٹیز کا خلاصہ",
        payoutsCard: "ادائیگیاں",
        ledgerCard: "کھاتہ",
        discrepanciesCard: "فرق",
        propertiesCard: "پراپرٹیز",
      },

      ledger: {
        title: "کھاتہ",
        empty: "ابھی کوئی اندراج نہیں۔",
        exportCsv: "CSV ڈاؤن لوڈ",
        viewReceipt: "رسید دیکھیں",
      },

      payouts: {
        title: "ادائیگیوں کا خلاصہ",
        weeklySummary: "ہفتہ وار سیٹلمنٹ خلاصہ",
        exportCsv: "CSV ڈاؤن لوڈ",
      },

      discrepancies: {
        title: "فرق",
        description: "وہ ادائیگیاں جو واجب الادا رقم سے کم لگتی ہیں",
        exportCsv: "CSV ڈاؤن لوڈ",
      },

      properties: {
        title: "پراپرٹیز",
        tenants: "کرایہ دار",
        units: "یونٹس",
        address: "پتہ",
        lastPaid: "آخری ادائیگی",
      },
    },

    admin: {
      home: {
        title: "ایڈمن",
        payouts: "ادائیگیوں کا جائزہ",
        discrepancies: "فرق کی رپورٹ",
        transactions: "ٹرانزیکشنز",
      },
      payouts: {
        title: "ادائیگیوں کا جائزہ",
        exportCsv: "CSV ڈاؤن لوڈ",
      },
      discrepancies: {
        title: "فرق کی رپورٹ",
        exportCsv: "CSV ڈاؤن لوڈ",
      },
      transactions: {
        title: "ٹرانزیکشنز",
        exportCsv: "CSV ڈاؤن لوڈ",
      },
    },

    legal: {
      privacy: "پرائیویسی پالیسی",
      terms: "سروس کی شرائط",
    },
  },
} as const;

// RTL helper for Urdu
export function dirFor(lang: Lang): "ltr" | "rtl" {
  return lang === "ur" ? "rtl" : "ltr";
}

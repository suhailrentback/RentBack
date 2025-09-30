// lib/i18n.ts

export type Lang = "en" | "ur";

export const strings = {
  en: {
    // App-level
    app: "RentBack",
    demo: "Demo",
    needHelp: "Need help?",
    support: "Support",

    // Bottom nav (if you use i18n here)
    bottom: {
      home: "Home",
      pay: "Pay",
      rewards: "Rewards",
      profile: "Profile",
    },

    // Legal pages & links
    legal: {
      privacy: "Privacy Policy",
      terms: "Terms of Service",
    },

    // Tenant → Pay
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
      invalid: "Enter amount and landlord / property.",
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

    // Tenant → Rewards
    rewards: {
      title: "Rewards",
      subtitle: "Pakistan-focused perks",
      balance: "Balance",
      redeem: "Redeem",
      choose: "Choose denomination",
      confirm: "Confirm Redemption",
      cancel: "Cancel",
      recent: "Recent Activity",
      none: "No redemptions yet — make a rent payment to earn points.",
      viewReceipt: "View Redemption Receipt",
      receiptTitle: "Redemption Receipt",
      points: "Points",
      status: "Status",
      // Optional partner labels (if you show partner grid)
      partners: {
        foodpanda: "Foodpanda",
        daraz: "Daraz",
        careem: "Careem",
        cinepax: "Cinepax",
      },
      tiers: {
        nextTier: "You’re {n} pts away from Gold Tier",
      },
    },

    // Tenant → Receipt (printable)
    receipt: {
      title: "Payment Receipt",
      demoWatermark: "Demo: Not a real payment",
      tenantName: "Tenant",
      tenantEmail: "Email",
      property: "Property",
      amount: "Amount",
      method: "Method",
      date: "Date",
      raastRef: "Reference",
      print: "Print / Save",
      back: "Back",
      homeLabel: "Home",
    },

    // LANDLORD — NEW
    landlord: {
      home: {
        title: "Landlord",
        welcome: "Welcome back",
        rentCollected: "Rent Collected (30d)",
        pendingCount: "Pending Items",
        payouts: {
          title: "Payouts (last 7 days)",
          next: "Next Payout",
          day: "Friday",
          none: "No settlements in the last 7 days",
        },
        discrepancies: {
          title: "Discrepancies",
          subtitle: "Payments under expected rent",
        },
        quickLinks: {
          ledger: "Ledger",
          properties: "Properties",
          receipts: "Receipts",
          support: "Support",
        },
        lastPayment: "Last Payment",
        emptyLastPayment: "No payments yet",
        viewReceipt: "View Receipt",
      },
      ledger: {
        title: "Ledger",
        subtitle: "Demo — Settlements simulated",
        date: "Date",
        tenant: "Tenant",
        property: "Property",
        amount: "Amount (PKR)",
        method: "Method",
        status: "Status",
        posted: "POSTED",
        discrepancy: "Under expected",
        exportCSV: "Download CSV",
        empty: "No payments yet — ask your tenant to make a demo payment.",
        receipt: "Receipt",
      },
      properties: {
        title: "Properties",
        subtitle: "Demo — read-only",
        name: "Property",
        tenant: "Tenant",
        expected: "Expected Rent (PKR)",
        due: "Next Due",
        status: "Status",
        active: "Active",
        none: "No properties yet — this demo shows a couple of sample ones.",
      },
    },
  },

  ur: {
    // App-level
    app: "RentBack",
    demo: "ڈیمو",
    needHelp: "مدد چاہیے؟",
    support: "مدد",

    // Bottom nav
    bottom: {
      home: "ہوم",
      pay: "ادائیگی",
      rewards: "انعامات",
      profile: "پروفائل",
    },

    // Legal
    legal: {
      privacy: "پرائیویسی پالیسی",
      terms: "سروس کی شرائط",
    },

    // Tenant → Pay
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
      receipt: "رسید",
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
      raastQR: "راست کیو آر (ڈیمو)",
    },

    // Tenant → Rewards
    rewards: {
      title: "انعامات",
      subtitle: "پاکستان کے لیے سہولتیں",
      balance: "بیلنس",
      redeem: "ریڈیم",
      choose: "ڈینام منتخب کریں",
      confirm: "تصدیق",
      cancel: "منسوخ",
      recent: "حالیہ سرگرمی",
      none: "ابھی تک کوئی ریڈیمپشن نہیں — پوائنٹس کمانے کے لیے ادائیگی کریں۔",
      viewReceipt: "ریڈیم رسید",
      receiptTitle: "ریڈیمپشن رسید",
      points: "پوائنٹس",
      status: "اسٹیٹس",
      partners: {
        foodpanda: "فوڈ پانڈا",
        daraz: "در از",
        careem: "کریم",
        cinepax: "سنی پیکس",
      },
      tiers: {
        nextTier: "آپ {n} پوائنٹس دور ہیں — گولڈ ٹیئر",
      },
    },

    // Tenant → Receipt
    receipt: {
      title: "ادائیگی کی رسید",
      demoWatermark: "ڈیمو: حقیقی ادائیگی نہیں",
      tenantName: "کرایہ دار",
      tenantEmail: "ای میل",
      property: "پراپرٹی",
      amount: "رقم",
      method: "طریقہ",
      date: "تاریخ",
      raastRef: "ریفرنس",
      print: "پرنٹ / محفوظ کریں",
      back: "واپس",
      homeLabel: "ہوم",
    },

    // LANDLORD — NEW (Urdu)
    landlord: {
      home: {
        title: "لینڈلارڈ",
        welcome: "خوش آمدید",
        rentCollected: "گزشتہ 30 دن میں وصولی",
        pendingCount: "زیر التواء آئٹمز",
        payouts: {
          title: "ادائیگیاں (گزشتہ 7 دن)",
          next: "اگلا پے آؤٹ",
          day: "جمعہ",
          none: "گزشتہ 7 دن میں کوئی سیٹلمنٹ نہیں",
        },
        discrepancies: {
          title: "فرق",
          subtitle: "متوقع کرائے سے کم ادائیگیاں",
        },
        quickLinks: {
          ledger: "لیجر",
          properties: "پراپرٹیز",
          receipts: "رسیدیں",
          support: "مدد",
        },
        lastPayment: "آخری ادائیگی",
        emptyLastPayment: "ابھی تک کوئی ادائیگی نہیں",
        viewReceipt: "رسید دیکھیں",
      },
      ledger: {
        title: "لیجر",
        subtitle: "ڈیمو — کلیئرنگ فرضی",
        date: "تاریخ",
        tenant: "کرایہ دار",
        property: "پراپرٹی",
        amount: "رقم (PKR)",
        method: "طریقہ",
        status: "اسٹیٹس",
        posted: "POSTED",
        discrepancy: "متوقع سے کم",
        exportCSV: "CSV ڈاؤن لوڈ",
        empty: "ابھی تک کوئی ادائیگی نہیں — کرایہ دار سے ڈیمو ادائیگی کروائیں۔",
        receipt: "رسید",
      },
      properties: {
        title: "پراپرٹیز",
        subtitle: "ڈیمو — صرف دیکھنے کے لیے",
        name: "پراپرٹی",
        tenant: "کرایہ دار",
        expected: "متوقع کرایہ (PKR)",
        due: "اگلی تاریخ",
        status: "اسٹیٹس",
        active: "فعال",
        none: "ابھی کوئی پراپرٹی نہیں — یہ ڈیمو چند مثالیں دکھاتا ہے۔",
      },
    },
  },
} as const;

export function dirFor(lang: Lang): "ltr" | "rtl" {
  return lang === "ur" ? "rtl" : "ltr";
}

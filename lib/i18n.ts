// lib/i18n.ts
export type Lang = "en" | "ur";

export function dirFor(lang: Lang): "ltr" | "rtl" {
  return lang === "ur" ? "rtl" : "ltr";
}

export const strings = {
  en: {
    app: "RentBack",
    demo: "Demo",
    needHelp: "Need help?",
    support: "Support",
    bottom: {
      home: "Home",
      pay: "Pay",
      rewards: "Rewards",
      profile: "Profile",
    },
    legal: {
      privacy: "Privacy Policy",
      terms: "Terms of Service",
    },

    // Tenant Home (Dashboard)
    home: {
      title: "Welcome",
      currentRentDue: "Current Rent Due",
      dueOn: "Due on",
      payNow: "Pay Now",
      rewardsBalance: "Rewards Balance",
      lastPayment: "Last Payment",
      viewReceipt: "View Receipt",
      shortcuts: {
        pay: "Pay Rent",
        rewards: "Rewards",
        receipts: "Receipts",
        support: "Support",
      },
      emptyLastPayment: "No payments yet",
    },

    // Tenant Pay
    pay: {
      title: "Pay Rent",
      subtitle: "Demo Mode — no real charges",
      property: "Property",
      amount: "Amount (PKR)",
      method: "Method",
      methodRaast: "Raast",
      methodBank: "Bank Transfer",
      methodWallet: "JazzCash",
      autofillLast: "Autofill last payment",
      lowAmountWarn: "Amount is less than the due. Are you sure?",
      create: "Create Payment (Demo)",
      recent: "Recent",
      markSent: "Mark as Sent",
      viewReceipt: "View Receipt",
      status: "Status",
      pending: "Pending",
      sent: "Sent",
      print: "Print / Save PDF",
      raastQR: "Raast QR (demo)",
      invalid: "Enter amount and select property.",
      emptyState: "No payments yet — create your first demo payment.",
    },

    // Tenant Rewards
    rewards: {
      title: "Rewards",
      subtitle: "Pakistan-focused perks",
      balance: "Points Balance",
      redeemNow: "Redeem Now",
      partners: "Top Partners",
      recentActivity: "Recent Activity",
      empty: "No redemptions yet — make a payment to earn points.",
      earn: "Earn",
      redeem: "Redeem",
      confirm: "Confirm",
      cancel: "Cancel",
      receiptTitle: "Redemption Receipt",
      codeLabel: "Voucher Code",
      progressToNext: "You’re %{left} pts away from Gold Tier",
      points: "Points",
      status: "Status",
      viewReceipt: "View Redeem Receipt",
    },

    // Tenant Receipt
    receipt: {
      title: "Payment Receipt",
      demo: "Demo: Not a real payment",
      backHome: "← Home",
      print: "Print / Save PDF",
      notFoundTitle: "Receipt not found",
      notFoundBody:
        "This payment doesn’t exist in your demo history. Create a payment on the Pay page and try again.",
      details: {
        tenant: "Tenant",
        email: "Email",
        property: "Property",
        amount: "Amount",
        method: "Method",
        date: "Date",
        status: "Status",
        raast: "Raast Reference",
      },
      sent: "Sent",
      pending: "Pending",
      qrLabel: "Raast QR (demo)",
      rewardsLinkLabel: "🎁 Rewards",
      makeAnotherPayment: "Make another payment",
    },

    // Profile
    profile: {
      title: "Profile",
      signOut: "Sign out",
      language: "Language",
      theme: "Theme",
      english: "English",
      urdu: "اردو",
      dark: "Dark",
      light: "Light",
      demoBadge: "Demo",
      links: {
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        support: "Need help?",
      },
    },
  },

  ur: {
    app: "RentBack",
    demo: "ڈیمو",
    needHelp: "مدد درکار؟",
    support: "سپورٹ",
    bottom: {
      home: "ہوم",
      pay: "ادائیگی",
      rewards: "انعامات",
      profile: "پروفائل",
    },
    legal: {
      privacy: "پرائیویسی پالیسی",
      terms: "سروس کی شرائط",
    },

    // Tenant Home (Dashboard)
    home: {
      title: "خوش آمدید",
      currentRentDue: "موجودہ واجب الادا کرایہ",
      dueOn: "آخری تاریخ",
      payNow: "ابھی ادا کریں",
      rewardsBalance: "پوائنٹس بیلنس",
      lastPayment: "آخری ادائیگی",
      viewReceipt: "رسید دیکھیں",
      shortcuts: {
        pay: "کرایہ ادا کریں",
        rewards: "انعامات",
        receipts: "رسیدیں",
        support: "مدد",
      },
      emptyLastPayment: "ابھی تک کوئی ادائیگی نہیں",
    },

    // Tenant Pay
    pay: {
      title: "کرایہ ادا کریں",
      subtitle: "ڈیمو — کوئی حقیقی چارج نہیں",
      property: "پراپرٹی",
      amount: "رقم (PKR)",
      method: "طریقہ",
      methodRaast: "راست",
      methodBank: "بینک ٹرانسفر",
      methodWallet: "جاز کیش",
      autofillLast: "آخری ادائیگی سے بھر دیں",
      lowAmountWarn: "رقم واجب الادا سے کم ہے۔ کیا آپ مطمئن ہیں؟",
      create: "ادائیگی بنائیں (ڈیمو)",
      recent: "حالیہ",
      markSent: "بھیج دیا نشان زد کریں",
      viewReceipt: "رسید دیکھیں",
      status: "اسٹیٹس",
      pending: "زیر التواء",
      sent: "بھیج دیا",
      print: "پرنٹ / PDF",
      raastQR: "راست کیو آر (ڈیمو)",
      invalid: "رقم درج کریں اور پراپرٹی منتخب کریں۔",
      emptyState: "ابھی تک کوئی ادائیگی نہیں — پہلی ڈیمو ادائیگی بنائیں۔",
    },

    // Tenant Rewards
    rewards: {
      title: "انعامات",
      subtitle: "پاکستان کے لیے سہولتیں",
      balance: "پوائنٹس بیلنس",
      redeemNow: "ابھی ریڈیم کریں",
      partners: "مشہور پارٹنرز",
      recentActivity: "حالیہ سرگرمی",
      empty: "ابھی کوئی ریڈیمپشن نہیں — پوائنٹس کمانے کے لیے ادائیگی کریں۔",
      earn: "کمایا",
      redeem: "ریڈیم",
      confirm: "تصدیق",
      cancel: "منسوخ",
      receiptTitle: "ریڈیمپشن رسید",
      codeLabel: "ووچر کوڈ",
      progressToNext: "آپ گولڈ ٹیئر سے %{left} پوائنٹس دور ہیں",
      points: "پوائنٹس",
      status: "اسٹیٹس",
      viewReceipt: "ریڈیم رسید",
    },

    // Tenant Receipt
    receipt: {
      title: "ادائیگی کی رسید",
      demo: "ڈیمو: یہ حقیقی ادائیگی نہیں ہے",
      backHome: "← ہوم",
      print: "پرنٹ / PDF محفوظ کریں",
      notFoundTitle: "رسید نہیں ملی",
      notFoundBody:
        "یہ ادائیگی آپ کی ڈیمو ہسٹری میں موجود نہیں۔ ادائیگی پیج پر ایک ڈیمو ادائیگی بنائیں اور دوبارہ کھولیں۔",
      details: {
        tenant: "کرایہ دار",
        email: "ای میل",
        property: "پراپرٹی",
        amount: "رقم",
        method: "طریقہ",
        date: "تاریخ",
        status: "اسٹیٹس",
        raast: "راست ریفرنس",
      },
      sent: "بھیج دیا",
      pending: "زیر التواء",
      qrLabel: "راست کیو آر (ڈیمو)",
      rewardsLinkLabel: "🎁 انعامات",
      makeAnotherPayment: "ایک اور ادائیگی کریں",
    },

    // Profile
    profile: {
      title: "پروفائل",
      signOut: "لاگ آؤٹ",
      language: "زبان",
      theme: "تھیم",
      english: "English",
      urdu: "اردو",
      dark: "ڈارک",
      light: "لائٹ",
      demoBadge: "ڈیمو",
      links: {
        privacy: "پرائیویسی پالیسی",
        terms: "سروس کی شرائط",
        support: "مدد درکار؟",
      },
    },
  },
} as const;

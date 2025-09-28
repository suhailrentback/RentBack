export type Lang = "en" | "ur";

/** ───────────────────────────────────────────────────────────
 *  Currency / date helpers (PKR + locale-aware rendering)
 *  ─────────────────────────────────────────────────────────── */
export function formatPKR(value: number, lang: Lang = "en"): string {
  return new Intl.NumberFormat(lang === "ur" ? "ur-PK" : "en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(d: Date | string | number, lang: Lang = "en"): string {
  const date = typeof d === "string" || typeof d === "number" ? new Date(d) : d;
  return new Intl.DateTimeFormat(lang === "ur" ? "ur-PK" : "en-PK", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
}

export function dirFor(lang: Lang): "ltr" | "rtl" {
  return lang === "ur" ? "rtl" : "ltr";
}

/** ───────────────────────────────────────────────────────────
 *  Strings (keeps your current keys; adds landlord/admin stubs)
 *  ─────────────────────────────────────────────────────────── */
export const strings = {
  en: {
    app: "RentBack",
    tagline: "Turning rent into rewards.",
    cta: "Get Started",
    signIn: "Sign in",
    signOut: "Sign out",
    email: "Email",
    continue: "Continue",
    dark: "Dark",
    light: "Light",
    urdu: "اردو",
    english: "English",
    nav: { home: "Home", pay: "Pay", rewards: "Rewards", support: "Support", profile: "Profile" },
    demoBanner: "Demo preview — no real payments are processed.",

    // Tenant
    tenant: {
      title: "Tenant",
      dueThisMonth: "Due this month",
      lastActivity: "Last activity",
      noPayments: "No payments yet.",
    },

    // Pay (YOUR ORIGINAL KEYS)
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

    // Rewards (YOUR ORIGINAL KEYS)
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
    },

    // Landlord (NEW – safe placeholders)
    landlord: {
      title: "Landlord",
      ledger: "Ledger",
      settings: "Settings",
      receivables: "Receivables",
      noItems: "No items to show.",
    },

    // Admin (NEW – safe placeholders)
    admin: {
      title: "Admin",
      users: "Users",
      transactions: "Transactions",
      search: "Search",
      none: "Nothing to show yet.",
    },
  },

  ur: {
    app: "RentBack",
    tagline: "کرائے کو انعامات میں بدلنا۔",
    cta: "شروع کریں",
    signIn: "سائن اِن",
    signOut: "لاگ آؤٹ",
    email: "ای میل",
    continue: "جاری رکھیں",
    dark: "ڈارک",
    light: "لائٹ",
    urdu: "اردو",
    english: "English",
    nav: { home: "ہوم", pay: "ادائیگی", rewards: "انعامات", support: "مدد", profile: "پروفائل" },
    demoBanner: "ڈیمو پریویو — کوئی حقیقی ادائیگیاں پروسیس نہیں ہوتیں۔",

    // Tenant
    tenant: {
      title: "کرایہ دار",
      dueThisMonth: "اس ماہ واجب الادا",
      lastActivity: "آخری سرگرمی",
      noPayments: "ابھی تک کوئی ادائیگی نہیں",
    },

    // Pay (YOUR ORIGINAL KEYS)
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

    // Rewards (YOUR ORIGINAL KEYS)
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
    },

    // Landlord (NEW – safe placeholders)
    landlord: {
      title: "مالک مکان",
      ledger: "لیجر",
      settings: "سیٹنگز",
      receivables: "واجبات",
      noItems: "دکھانے کے لیے کچھ نہیں۔",
    },

    // Admin (NEW – safe placeholders)
    admin: {
      title: "ایڈمن",
      users: "صارفین",
      transactions: "ٹرانزیکشنز",
      search: "تلاش",
      none: "ابھی کچھ موجود نہیں۔",
    },
  },
} as const;

/** Convenience getter so you can do:
 *   const t = tFor(lang);
 *   t.pay.title
 */
export function tFor(lang: Lang) {
  return strings[lang];
}

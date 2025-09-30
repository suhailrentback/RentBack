// lib/i18n.ts
export type Lang = "en" | "ur";

export const strings = {
  en: {
    app: "RentBack",
    demo: "Demo",
    needHelp: "Need help?",
    support: "Support",

    // Bottom nav labels (used in MobileAppShell/BottomNav)
    bottom: {
      home: "Home",
      pay: "Pay",
      rewards: "Rewards",
      profile: "Profile",
    },

    // (Older pages may still reference this)
    nav: { home: "Home", pay: "Pay", rewards: "Rewards", support: "Support", profile: "Profile" },

    // Common UI
    common: {
      view: "View",
      close: "Close",
      back: "Back",
      exportCSV: "Export CSV",
      downloadCSV: "Download CSV",
      print: "Print",
      savePDF: "Save PDF",
      amount: "Amount",
      date: "Date",
      status: "Status",
      method: "Method",
      property: "Property",
      landlord: "Landlord / Property",
      tenant: "Tenant",
      loading: "Loading…",
      empty: "Nothing here yet.",
      tryAgain: "Try again",
      done: "Done",
      cancel: "Cancel",
      confirm: "Confirm",
    },

    // Landing & auth (kept brief; you can expand later)
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

    demoBanner: "Demo preview — no real payments are processed.",

    // Tenant — Home (Dashboard)
    tenant: {
      home: {
        title: "Welcome",
        subtitle: "Your rent & rewards at a glance",
        rentDue: "Current Rent Due",
        dueOn: "Due on",
        quickPay: "Pay Now",
        rewardsBalance: "Rewards Balance",
        lastPayment: "Last Payment",
        viewReceipt: "View Receipt",
        shortcuts: {
          pay: "Pay Rent",
          rewards: "Rewards",
          receipts: "Receipts",
          support: "Support",
        },
        emptyLastPayment: "No payments yet — make your first payment to see it here.",
      },

      // Tenant — Pay
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
        warnBelowDue: "Warning: entered amount is below rent due.",
      },

      // Tenant — Receipt
      receipt: {
        title: "Payment Receipt",
        notReal: "Demo: Not a real payment",
        payer: "Payer",
        email: "Email",
        property: "Property",
        amount: "Amount",
        method: "Method",
        date: "Date",
        reference: "Reference",
        qrNote: "Fake Raast-style QR for demo only",
        print: "Print / Save PDF",
        backHome: "Back to Home",
      },

      // Tenant — Rewards
      rewards: {
        title: "Rewards",
        subtitle: "Pakistan-focused perks",
        balanceTitle: "Rewards Balance",
        earnActivity: "Recent Activity",
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
        earned: "Earned",
        redeemed: "Redeemed",
        partnersTitle: "Quick Redeem",
        progressToTier: "You’re {points} pts away from Gold Tier",
      },
    },

    // Landlord
    landlord: {
      home: {
        title: "Landlord",
        subtitle: "Overview of your rent inflows",
        ledgerCardTitle: "Ledger",
        ledgerCardDesc: "Recent tenant payments (demo).",
        propertiesCardTitle: "Properties",
        propertiesCardDesc: "Units & tenants — read-only in demo.",
        payoutsCardTitle: "Payouts",
        payoutsCardDesc: "Weekly settlement summary (demo).",
        discCardTitle: "Discrepancies",
        discCardDesc: "Payments below expected rent.",
      },

      ledger: {
        title: "Ledger",
        subtitle: "Posted tenant payments",
        downloadCSV: "Download CSV",
        empty: "No ledger entries yet.",
        posted: "POSTED",
      },

      properties: {
        title: "Properties",
        subtitle: "Read-only (demo)",
        property: "Property",
        tenant: "Tenant",
        rent: "Monthly Rent",
        due: "Due Day",
        empty: "No properties found.",
      },

      payouts: {
        title: "Payouts",
        subtitle: "Weekly settlements (demo)",
        thisWeek: "This Week",
        lastWeek: "Last Week",
        total: "Total",
        scheduled: "Scheduled",
      },

      discrepancies: {
        title: "Discrepancies",
        subtitle: "Payments below expected rent",
        property: "Property",
        tenant: "Tenant",
        expected: "Expected",
        paid: "Paid",
        delta: "Delta",
        none: "No discrepancies — all good!",
      },
    },

    // Admin
    admin: {
      home: {
        title: "Admin",
        subtitle: "Tools for monitoring demo data",
        payoutsTitle: "Payouts Overview",
        payoutsDesc: "Weekly settlements by landlord (demo).",
        discTitle: "Discrepancy Report",
        discDesc: "Shows payments below expected rent for quick follow-up.",
        txTitle: "Transactions",
        txDesc: "Filter recent transactions and export CSV (demo).",
      },

      payouts: {
        title: "Payouts Overview",
        subtitle: "Aggregate view across landlords (demo)",
        week: "Week",
        landlord: "Landlord",
        amount: "Amount",
        scheduled: "Scheduled",
        empty: "No payouts yet.",
      },

      discrepancies: {
        title: "Discrepancy Report",
        subtitle: "Find payments below expected rent",
        property: "Property",
        tenant: "Tenant",
        expected: "Expected",
        paid: "Paid",
        delta: "Delta",
        empty: "No discrepancies at the moment.",
      },

      transactions: {
        filterRange: "Range",
        last7: "Last 7 days",
        last30: "Last 30 days",
        all: "All",
      },
    },

    // Legal
    legal: {
      privacy: "Privacy Policy",
      terms: "Terms of Service",
    },

    // Profile
    profile: {
      title: "Profile",
      email: "Email",
      language: "Language",
      theme: "Theme",
      links: {
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        help: "Need help?",
        signOut: "Sign out",
      },
      demoBadge: "Demo",
    },
  },

  ur: {
    app: "RentBack",
    demo: "ڈیمو",
    needHelp: "مدد درکار ہے؟",
    support: "سپورٹ",

    bottom: {
      home: "ہوم",
      pay: "ادائیگی",
      rewards: "انعامات",
      profile: "پروفائل",
    },

    nav: { home: "ہوم", pay: "ادائیگی", rewards: "انعامات", support: "مدد", profile: "پروفائل" },

    common: {
      view: "دیکھیں",
      close: "بند کریں",
      back: "واپس",
      exportCSV: "CSV ایکسپورٹ",
      downloadCSV: "CSV ڈاؤن لوڈ",
      print: "پرنٹ",
      savePDF: "PDF محفوظ کریں",
      amount: "رقم",
      date: "تاریخ",
      status: "اسٹیٹس",
      method: "طریقہ",
      property: "پراپرٹی",
      landlord: "مالک / پراپرٹی",
      tenant: "کرایہ دار",
      loading: "لوڈ ہو رہا ہے…",
      empty: "فی الحال کچھ نہیں۔",
      tryAgain: "دوبارہ کوشش کریں",
      done: "ہو گیا",
      cancel: "منسوخ",
      confirm: "تصدیق",
    },

    tagline: "کرائے کو انعامات میں بدلنا۔",
    cta: "شروع کریں",
    signIn: "سائن اِن",
    signOut: "لاگ آؤٹ",
    email: "ای میل",
    continue: "جاری رکھیں",
    dark: "ڈارک",
    light: "لائٹ",
    urdu: "اردو",
    english: "English",

    demoBanner: "ڈیمو — کوئی حقیقی ادائیگی پروسیس نہیں ہوتی۔",

    tenant: {
      home: {
        title: "خوش آمدید",
        subtitle: "آپ کے کرایہ اور انعامات ایک نظر میں",
        rentDue: "بقایا کرایہ",
        dueOn: "آخری تاریخ",
        quickPay: "فوراً ادا کریں",
        rewardsBalance: "ریوارڈز بیلنس",
        lastPayment: "آخری ادائیگی",
        viewReceipt: "رسید",
        shortcuts: {
          pay: "ادائیگی",
          rewards: "انعامات",
          receipts: "رسیدیں",
          support: "مدد",
        },
        emptyLastPayment: "ابھی کوئی ادائیگی نہیں — پہلی ادائیگی کریں۔",
      },

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
        raastQR: "راست کیو آر (ڈیمو)",
        warnBelowDue: "انتباہ: رقم بقایا کرایہ سے کم ہے۔",
      },

      receipt: {
        title: "ادائیگی رسید",
        notReal: "ڈیمو: یہ حقیقی ادائیگی نہیں",
        payer: "اداکنندہ",
        email: "ای میل",
        property: "پراپرٹی",
        amount: "رقم",
        method: "طریقہ",
        date: "تاریخ",
        reference: "ریفرنس",
        qrNote: "ڈیمو کیلئے فرضی راست کیو آر",
        print: "پرنٹ / PDF",
        backHome: "ہوم پر واپس",
      },

      rewards: {
        title: "انعامات",
        subtitle: "پاکستان کے لیے سہولتیں",
        balanceTitle: "ریوارڈز بیلنس",
        earnActivity: "حالیہ سرگرمی",
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
        earned: "حاصل",
        redeemed: "ریڈیم",
        partnersTitle: "جلدی ریڈیم",
        progressToTier: "آپ گولڈ ٹیئر سے {points} پوائنٹس دور ہیں",
      },
    },

    landlord: {
      home: {
        title: "مالک",
        subtitle: "آمدنی کا خلاصہ",
        ledgerCardTitle: "لیجر",
        ledgerCardDesc: "حالیہ ادائیگیاں (ڈیمو)",
        propertiesCardTitle: "پراپرٹیز",
        propertiesCardDesc: "یونٹس اور کرایہ دار — صرف پڑھنے کیلئے",
        payoutsCardTitle: "ادائیگیاں",
        payoutsCardDesc: "ہفتہ وار سیٹلمنٹ (ڈیمو)",
        discCardTitle: "فرق/کمی",
        discCardDesc: "متوقع کرائے سے کم ادائیگیاں",
      },

      ledger: {
        title: "لیجر",
        subtitle: "پوسٹ کی گئی ادائیگیاں",
        downloadCSV: "CSV ڈاؤن لوڈ",
        empty: "کوئی اندراج نہیں۔",
        posted: "POSTED",
      },

      properties: {
        title: "پراپرٹیز",
        subtitle: "صرف پڑھنے کیلئے (ڈیمو)",
        property: "پراپرٹی",
        tenant: "کرایہ دار",
        rent: "ماہانہ کرایہ",
        due: "آخری تاریخ",
        empty: "کوئی پراپرٹی نہیں۔",
      },

      payouts: {
        title: "ادائیگیاں",
        subtitle: "ہفتہ وار سیٹلمنٹ (ڈیمو)",
        thisWeek: "اس ہفتے",
        lastWeek: "گزشتہ ہفتہ",
        total: "کل",
        scheduled: "شیڈولڈ",
      },

      discrepancies: {
        title: "فرق/کمی",
        subtitle: "متوقع کرائے سے کم ادائیگیاں",
        property: "پراپرٹی",
        tenant: "کرایہ دار",
        expected: "متوقع",
        paid: "ادا شدہ",
        delta: "فرق",
        none: "فی الحال کوئی فرق نہیں۔",
      },
    },

    admin: {
      home: {
        title: "ایڈمن",
        subtitle: "ڈیمو ڈیٹا مانیٹرنگ",
        payoutsTitle: "پے آؤٹس اوورویو",
        payoutsDesc: "ہفتہ وار سیٹلمنٹس (ڈیمو)",
        discTitle: "فرق رپورٹ",
        discDesc: "متوقع سے کم ادائیگیاں",
        txTitle: "ٹرانزیکشنز",
        txDesc: "فلٹر کریں اور CSV ایکسپورٹ",
      },

      payouts: {
        title: "پے آؤٹس اوورویو",
        subtitle: "تمام مالکان کیلئے",
        week: "ہفتہ",
        landlord: "مالک",
        amount: "رقم",
        scheduled: "شیڈولڈ",
        empty: "ابھی کچھ نہیں۔",
      },

      discrepancies: {
        title: "فرق رپورٹ",
        subtitle: "کم ادائیگیوں کی فہرست",
        property: "پراپرٹی",
        tenant: "کرایہ دار",
        expected: "متوقع",
        paid: "ادا شدہ",
        delta: "فرق",
        empty: "کوئی فرق نہیں۔",
      },

      transactions: {
        filterRange: "مدت",
        last7: "گزشتہ 7 دن",
        last30: "گزشتہ 30 دن",
        all: "تمام",
      },
    },

    legal: {
      privacy: "پرائیویسی پالیسی",
      terms: "سروس کی شرائط",
    },

    profile: {
      title: "پروفائل",
      email: "ای میل",
      language: "زبان",
      theme: "تھیم",
      links: {
        privacy: "پرائیویسی پالیسی",
        terms: "سروس کی شرائط",
        help: "مدد درکار ہے؟",
        signOut: "لاگ آؤٹ",
      },
      demoBadge: "ڈیمو",
    },
  },
} as const;

// Direction helper for layout
export function dirFor(lang: Lang): "ltr" | "rtl" {
  return lang === "ur" ? "rtl" : "ltr";
}

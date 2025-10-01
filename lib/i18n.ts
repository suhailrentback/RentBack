// lib/i18n.ts
// Simple i18n bundle used by the demo. No JSX here—pure TypeScript only.

export type Lang = "en" | "ur";

// 👇 FIX #1: Added the missing dirFor function
export const dirFor = (lang: Lang) => (lang === "ur" ? "rtl" : "ltr");

export const strings = {
  en: {
    app: "RentBack",
    demo: "Demo",
    needHelp: "Need help?",
    support: "Support",
    nav: { home: "Home" },
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
      },
    },
  },
  // 👇 FIX #2: Added the missing Urdu translations object
  ur: {
    app: "رينٹ بیک",
    demo: "ڈیمو",
    needHelp: "مدد چاہیے؟",
    support: "سپورٹ",
    nav: { home: "ہوم" },
    bottom: {
      home: "ہوم",
      pay: "ادائیگی",
      rewards: "انعامات",
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
        title: "انعامات",
        balance: "موجودہ بیلنس",
        redeem: "فوری چھڑائیں",
        activity: "حالیہ سرگرمی",
        earned: "کمائے",
        redeemed: "چھڑائے",
        voucherCode: "واؤچر کوڈ",
        progress: {
          toGold: "آپ گولڈ ٹائر سے {{pts}} پوائنٹس دور ہیں",
        },
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
      },
    },
  },
};

// lib/i18n.ts
// Simple i18n bundle used by the demo. No JSX here—pure TypeScript only.

export type Lang = "en" | "ur";

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
        signOut: "

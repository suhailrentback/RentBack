// lib/i18n.ts
export type Lang = 'en' | 'ur';
export function dirFor(lang: Lang): 'ltr' | 'rtl' { return lang === 'ur' ? 'rtl' : 'ltr'; }

export const strings = {
  en: {
    app: 'RentBack',
    demo: 'Demo',
    needHelp: 'Need help?',
    support: 'Support',
    bottom: { home: 'Home', pay: 'Pay', rewards: 'Rewards', profile: 'Profile' },
    dark: 'Dark', light: 'Light', urdu: 'اردو', english: 'English',
    tenant: {
      home: { hello: 'Welcome back', points: 'Points' },
      pay: {
        title: 'Pay Rent', subtitle: 'Demo — no real charges',
        amount: 'Amount (PKR)', lease: 'Property / Lease', method: 'Method', memo: 'Memo (optional)',
        create: 'Create Payment (Demo)', recent: 'Recent', csv: 'Download CSV',
        actions: { markSent: 'Mark as Sent', receipt: 'View Receipt' },
        statuses: { PENDING: 'Pending', POSTED: 'Succeeded', FAILED: 'Failed' },
        methods: { RAAST: 'Raast', CARD: 'Card', WALLET: 'Wallet' },
        invalid: 'Enter amount and choose a property.',
      },
      rewards: {
        title: 'Rewards', subtitle: 'Pakistan-focused perks',
        points: 'Points', redeem: 'Redeem', choose: 'Choose amount', confirm: 'Confirm',
        recent: 'Recent Redemptions', none: 'No redemptions yet.',
      },
      receipt: {
        title: 'Payment Receipt', print: 'Print / Save PDF', disclaimer: 'Demo: Not a real payment',
        to: 'Transfer to', method: 'Method', status: 'Status', ref: 'Reference', date: 'Date',
      }
    },
    landlord: { ledger: { title: 'Ledger', csv: 'Export CSV', empty: 'No entries yet.' } },
    admin: { tx: { title: 'Transactions', csv: 'Export CSV', empty: 'No transactions.' } },
    csvHead: { id: 'id', createdAt: 'createdAt', tenant: 'tenant', landlord: 'landlord', property: 'property', amount: 'amount', status: 'status', method: 'method', raastRef: 'raastRef' },
    legal: { privacy: 'Privacy', terms: 'Terms' }
  },
  ur: {
    app: 'RentBack',
    demo: 'ڈیمو',
    needHelp: 'مدد چاہیے؟',
    support: 'مدد',
    bottom: { home: 'ہوم', pay: 'ادائیگی', rewards: 'انعامات', profile: 'پروفائل' },
    dark: 'ڈارک', light: 'لائٹ', urdu: 'اردو', english: 'English',
    tenant: {
      home: { hello: 'خوش آمدید', points: 'پوائنٹس' },
      pay: {
        title: 'کرایہ ادا کریں', subtitle: 'ڈیمو — حقیقی چارج نہیں',
        amount: 'رقم (PKR)', lease: 'پراپرٹی / لیز', method: 'طریقہ', memo: 'میمو (اختیاری)',
        create: 'ادائیگی بنائیں (ڈیمو)', recent: 'حالیہ', csv: 'CSV ڈاؤن لوڈ',
        actions: { markSent: 'Sent کریں', receipt: 'رسید دیکھیں' },
        statuses: { PENDING: 'زیر التواء', POSTED: 'کامیاب', FAILED: 'ناکام' },
        methods: { RAAST: 'راست', CARD: 'کارڈ', WALLET: 'والیٹ' },
        invalid: 'رقم اور پراپرٹی منتخب کریں۔',
      },
      rewards: {
        title: 'انعامات', subtitle: 'پاکستان کیلئے سہولتیں',
        points: 'پوائنٹس', redeem: 'ریڈیم', choose: 'رقم منتخب کریں', confirm: 'تصدیق',
        recent: 'حالیہ ریڈیمپشنز', none: 'ابھی تک کوئی ریڈیمپشن نہیں۔',
      },
      receipt: {
        title: 'ادائیگی رسید', print: 'پرنٹ / PDF', disclaimer: 'ڈیمو: حقیقی ادائیگی نہیں',
        to: 'منتقل کریں', method: 'طریقہ', status: 'اسٹیٹس', ref: 'حوالہ', date: 'تاریخ',
      }
    },
    landlord: { ledger: { title: 'لیجر', csv: 'CSV برآمد کریں', empty: 'ابھی داخلے نہیں۔' } },
    admin: { tx: { title: 'ٹرانزیکشنز', csv: 'CSV برآمد کریں', empty: 'کوئی ٹرانزیکشن نہیں۔' } },
    csvHead: { id: 'id', createdAt: 'createdAt', tenant: 'tenant', landlord: 'landlord', property: 'property', amount: 'amount', status: 'status', method: 'method', raastRef: 'raastRef' },
    legal: { privacy: 'پرائیویسی', terms: 'شرائط' }
  },
} as const;

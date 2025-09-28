export type Lang = 'en'|'ur';
export const strings = {
  en: {
    app: 'RentBack',
    tagline: 'Turning rent into rewards.',
    cta: 'Get Started',
    signIn: 'Sign in',
    signOut: 'Sign out',
    email: 'Email',
    continue: 'Continue',
    dark: 'Dark',
    light: 'Light',
    urdu: 'اردو',
    english: 'English',
    nav: { home:'Home', pay:'Pay', rewards:'Rewards', support:'Support', profile:'Profile' },
    demoBanner: 'Demo preview — no real payments are processed.',
    pay: {
      title: 'Pay Rent', subtitle: 'Demo Mode — no real charges',
      amount: 'Amount (PKR)', landlord: 'Landlord / Property', method: 'Method',
      create: 'Create Payment (Demo)', csv: 'Download CSV',
      recent: 'Recent', instructions: 'Instructions',
      succeeded: 'Succeeded', sent: 'Sent', refunded: 'Refunded',
      markSent: 'Mark as Sent', receipt: 'View Receipt', refund: 'Refund (Demo)',
      invalid: 'Enter amount and landlord name.', transferTo: 'Send to',
      iban: 'IBAN', memo: 'Memo', collections: 'RentBack Collections',
      ibanValue: 'PK00-RENT-0000-0007', print: 'Print / Save PDF', close: 'Close',
      status: 'Status', copy: 'Copy', copied: 'Copied', raastQR: 'Raast QR (demo)'
    },
    rewards: {
      title: 'Rewards', subtitle: 'Pakistan-focused perks',
      redeem:'Redeem', choose:'Choose denomination', confirm:'Confirm Redemption',
      cancel:'Cancel', recent:'Recent Redemptions', none:'No redemptions yet.',
      viewReceipt:'View Redeem Receipt', receiptTitle:'Redemption Receipt', points:'Points', status:'Status'
    },
  },
  ur: {
    app: 'RentBack',
    tagline: 'کرائے کو انعامات میں بدلنا۔',
    cta: 'شروع کریں',
    signIn: 'سائن اِن',
    signOut: 'لاگ آؤٹ',
    email: 'ای میل',
    continue: 'جاری رکھیں',
    dark: 'ڈارک',
    light: 'لائٹ',
    urdu: 'اردو',
    english: 'English',
    nav: { home:'ہوم', pay:'ادائیگی', rewards:'انعامات', support:'مدد', profile:'پروفائل' },
    demoBanner: 'ڈیمو پریویو — کوئی حقیقی ادائیگیاں پروسیس نہیں ہوتیں۔',
    pay: {
      title: 'کرایہ ادا کریں', subtitle: 'ڈیمو — کوئی حقیقی چارج نہیں',
      amount:'رقم (PKR)', landlord:'مالک / پراپرٹی', method:'طریقہ',
      create:'ادائیگی بنائیں (ڈیمو)', csv:'CSV ڈاؤن لوڈ',
      recent:'حالیہ', instructions:'ہدایات',
      succeeded:'کامیاب', sent:'بھیج دیا', refunded:'ریفنڈ',
      markSent:'Sent نشان', receipt:'رسید', refund:'ریفنڈ (ڈیمو)',
      invalid:'رقم اور مالک/پراپرٹی لکھیں۔', transferTo:'موصول کنندہ',
      iban:'IBAN', memo:'میمو', collections:'RentBack Collections',
      ibanValue:'PK00-RENT-0000-0007', print:'پرنٹ / PDF', close:'بند کریں',
      status:'اسٹیٹس', copy:'کاپی', copied:'کاپی ہو گیا', raastQR:'راست کیو آر (ڈیمو)'
    },
    rewards: {
      title:'انعامات', subtitle:'پاکستان کے لیے سہولتیں',
      redeem:'ریڈیم', choose:'ڈینام منتخب کریں', confirm:'تصدیق',
      cancel:'منسوخ', recent:'حالیہ ریڈیمپشنز', none:'ابھی تک کوئی ریڈیمپشن نہیں۔',
      viewReceipt:'ریڈیم رسید', receiptTitle:'ریڈیمپشن رسید', points:'پوائنٹس', status:'اسٹیٹس'
    },
  }
} as const;

export function dirFor(lang: Lang): 'ltr'|'rtl' { return lang==='ur' ? 'rtl':'ltr'; }

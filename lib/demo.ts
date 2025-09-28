export type PaymentStatus = 'initiated'|'sent'|'succeeded'|'refunded';
export type PaymentMethod = 'Bank Transfer'|'Card'|'Wallet';
export type Payment = { id:string; ref:string; amount:number; landlord:string; method:PaymentMethod; status:PaymentStatus; ts:number; };
export type Redemption = { id:string; ref:string; brand:string; title:string; denomination:number; points:number; status:'requested'|'fulfilled'|'cancelled'; ts:number; };

export const ibanValue = 'PK00-RENT-0000-0007';

export function formatPKR(n:number){
  return new Intl.NumberFormat('en-PK', { style:'currency', currency:'PKR', maximumFractionDigits:0}).format(n);
}

export function toCSV(rows: string[][]){
  return [rows[0].join(','), ...rows.slice(1).map(r=>r.join(','))].join('\n');
}

export function makeRef(prefix='RB'){ return `${prefix}-${Math.floor(100000 + Math.random()*900000)}` }

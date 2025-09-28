'use client';
import React, { useMemo, useState } from 'react';
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import RaastQR from '@/components/RaastQR'
import { strings } from '@/lib/i18n'
import { useTL } from '@/components/providers/ThemeLangProvider'
import { Payment, PaymentStatus, PaymentMethod, formatPKR, toCSV, makeRef } from '@/lib/demo'

export default function PayPage(){
  const { lang } = useTL(); const t = strings[lang];
  const [amountView, setAmountView] = useState('');
  const [amountVal, setAmountVal] = useState(0);
  const [landlord, setLandlord] = useState('');
  const [method, setMethod] = useState<PaymentMethod>('Bank Transfer');
  const [msg, setMsg] = useState('');
  const [payments, setPayments] = useState<Payment[]>(()=>{
    if (typeof window==='undefined') return [];
    try { const raw = localStorage.getItem('rb-demo-payments'); return raw? JSON.parse(raw):[] } catch { return [] }
  });

  React.useEffect(()=>{
    try { localStorage.setItem('rb-demo-payments', JSON.stringify(payments)) } catch {}
  },[payments]);

  const create = () => {
    if (!amountVal || !landlord.trim()) { setMsg(t.pay.invalid); return; }
    const id = `${Date.now()}_${Math.floor(Math.random()*1e6)}`;
    const ref = makeRef('RB');
    let status: PaymentStatus = method==='Bank Transfer' ? 'initiated':'succeeded';
    const p: Payment = { id, ref, amount: amountVal, landlord: landlord.trim(), method, status, ts: Date.now() };
    setPayments([p, ...payments]);
    setAmountView(''); setAmountVal(0); setLandlord('');
    setMsg(status==='succeeded' ? 'Payment succeeded (demo).' : 'Transfer instructions below.');
  };

  const markSent = (id: string) => setPayments(ps => ps.map(p=> p.id===id?{...p, status:'sent'}:p));
  const refund = (id: string) => setPayments(ps => ps.map(p=> p.id===id?{...p, status:'refunded'}:p));

  const downloadCSV = () => {
    const headers = ['ref','amount','landlord','method','status','ts'];
    const rows = payments.map(p=> [p.ref, String(p.amount), p.landlord, p.method, p.status, new Date(p.ts).toISOString()]);
    const csv = toCSV([headers, ...rows]);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href=url; a.download='rentback-demo-payments.csv'; a.click(); URL.revokeObjectURL(url);
  };

  function formatInput(raw: string){
    const digits = raw.replace(/[^0-9]/g,'');
    const value = digits? Number(digits):0;
    const view = new Intl.NumberFormat('en-PK').format(value);
    return { view, value };
  }

  return (
    <div className="grid gap-3">
      <Card>
        <div className="font-semibold mb-2">{t.pay.title}</div>
        <div className="grid gap-2">
          <input value={amountView} onChange={(e)=>{ const {view,value}=formatInput(e.target.value); setAmountView(view); setAmountVal(value); }} placeholder={t.pay.amount} inputMode="numeric" className="px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5" />
          <input value={landlord} onChange={e=>setLandlord(e.target.value)} placeholder={t.pay.landlord} className="px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5" />
          <select value={method} onChange={e=>setMethod(e.target.value as PaymentMethod)} className="px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5">
            <option>Bank Transfer</option><option>Card</option><option>Wallet</option>
          </select>
          <div className="flex gap-2">
            <Button onClick={create}>{t.pay.create}</Button>
            <Button variant="outline" onClick={downloadCSV}>{t.pay.csv}</Button>
          </div>
          {msg && <div className="text-sm text-brand">{msg}</div>}
        </div>
      </Card>

      <Card>
        <div className="font-semibold mb-2">{t.pay.recent}</div>
        <div className="grid gap-2">
        {payments.length===0? <div className="text-sm opacity-70">No demo payments yet.</div> : payments.map(p=>(
          <div key={p.id} className="p-3 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5">
            <div className="flex items-center justify-between font-semibold"><span>{p.landlord}</span><span>{formatPKR(p.amount)}</span></div>
            <div className="text-xs opacity-80 flex items-center justify-between"><span>{p.method} • Ref {p.ref}</span><span>{p.status}</span></div>
            {p.method==='Bank Transfer' && p.status==='initiated' && (
              <div className="mt-2 text-sm space-y-1">
                <div>{t.pay.transferTo}: <b>{t.pay.collections}</b></div>
                <div>{t.pay.iban}: <b>{t.pay.ibanValue}</b></div>
                <div>{t.pay.memo}: <b>{p.ref}</b></div>
                <div className="flex items-center gap-3 mt-2">
                  <div className="rounded-xl border border-black/10 dark:border-white/10 p-2">
                    <div className="text-xs opacity-70">{t.pay.raastQR}</div>
                    <div className="bg-white p-2 rounded-md inline-block"><RaastQR value={`RB|${t.pay.ibanValue}|${p.ref}|${p.amount}`} size={96} /></div>
                  </div>
                  <Button onClick={()=>markSent(p.id)}>{t.pay.markSent}</Button>
                </div>
              </div>
            )}
            <div className="mt-2 flex gap-2">
              <Button variant="outline" onClick={()=>window.alert('Demo receipt modal omitted to keep code compact.')}>{t.pay.receipt}</Button>
              <Button variant="outline" onClick={()=>refund(p.id)} disabled={p.status==='refunded' || p.status==='initiated'}>{p.status==='refunded'? t.pay.refunded : t.pay.refund}</Button>
            </div>
          </div>
        ))}
        </div>
      </Card>
    </div>
  );
}

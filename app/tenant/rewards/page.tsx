'use client';
import React, { useState } from 'react';
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { strings } from '@/lib/i18n'
import { useTL } from '@/components/providers/ThemeLangProvider'

const catalog = [
  { id:'daraz', brand:'Daraz', title:'Daraz Voucher', denom:[500,1000,2000], save:'Up to 8%' },
  { id:'jazz', brand:'Jazz', title:'Jazz Load', denom:[200,500,1000], save:'5%' },
  { id:'careem', brand:'Careem', title:'Careem Credit', denom:[300,500,1000], save:'5%' },
];

type Redemption = { id:string; ref:string; brand:string; title:string; denomination:number; points:number; status:'requested'|'fulfilled'|'cancelled'; ts:number };

function makeRef(){ return `RB-REDEEM-${Math.floor(100000 + Math.random()*900000)}` }

export default function RewardsPage(){
  const { lang } = useTL(); const t = strings[lang];
  const [pick, setPick] = useState<{id:string;brand:string;title:string;denom:number[]} | null>(null);
  const [items, setItems] = useState<Redemption[]>(()=>{
    if (typeof window==='undefined') return [];
    try { const raw=localStorage.getItem('rb-demo-redemptions'); return raw? JSON.parse(raw):[] } catch { return [] }
  });
  React.useEffect(()=>{ try{ localStorage.setItem('rb-demo-redemptions', JSON.stringify(items)) }catch{} },[items]);

  const confirm = (denom:number)=>{
    if (!pick) return;
    const it: Redemption = { id: String(Date.now()), ref: makeRef(), brand: pick.brand, title: pick.title, denomination: denom, points: Math.round(denom/10), status:'requested', ts: Date.now() };
    setItems([it, ...items]); setPick(null);
  };

  return (
    <div className="grid gap-3">
      <Card>
        <div className="font-semibold mb-2">{t.rewards.title}</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {catalog.map(r=>(
            <div key={r.id} className="p-3 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5">
              <div className="font-semibold">{r.title}</div>
              <div className="text-xs opacity-70">{r.brand} • {r.save}</div>
              <div className="mt-2"><Button size="sm" onClick={()=>setPick(r)}>{t.rewards.redeem}</Button></div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="font-semibold mb-2">{t.rewards.recent}</div>
        {items.length===0? <div className="text-sm opacity-70">{t.rewards.none}</div> : (
          <div className="grid gap-2">
            {items.map(r=>(
              <div key={r.id} className="p-3 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5">
                <div className="flex items-center justify-between font-semibold"><span>{r.brand} — {r.title}</span><span className="text-brand">{r.status}</span></div>
                <div className="text-xs opacity-80 flex items-center justify-between"><span>Ref {r.ref} • {t.rewards.points}: {r.points}</span><span>{new Date(r.ts).toLocaleString('en-PK')}</span></div>
                <div className="mt-2"><Button variant="outline" onClick={()=>window.alert('Demo redeem receipt.')}>{t.rewards.viewReceipt}</Button></div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {pick && (
        <Card>
          <div className="font-semibold mb-2">{t.rewards.choose}: {pick.title}</div>
          <div className="flex flex-wrap gap-2">
            {pick.denom.map(d=>(<Button key={d} variant="outline" onClick={()=>confirm(d)}>{new Intl.NumberFormat('en-PK', { style:'currency', currency:'PKR', maximumFractionDigits:0}).format(d)}</Button>))}
          </div>
          <div className="mt-2"><Button onClick={()=>setPick(null)}>{t.rewards.cancel}</Button></div>
        </Card>
      )}
    </div>
  )
}

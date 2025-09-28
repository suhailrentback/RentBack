'use client';
import React from 'react';
import Card from '@/components/ui/Card'
import { formatPKR } from '@/lib/demo'

export default function Ledger(){
  const items = [
    { ref:'RB-100201', ts: Date.now()-86400000*2, tenant:'Ali Khan', property:'DHA Phase 6', amount:120000, status:'sent' },
    { ref:'RB-100202', ts: Date.now()-86400000, tenant:'Ali Khan', property:'DHA Phase 6', amount:120000, status:'succeeded' },
    { ref:'RB-300777', ts: Date.now()-3600*1000*5, tenant:'Sara', property:'GreenView 12A', amount:180000, status:'initiated' },
  ];
  return <Card>
    <div className="font-semibold mb-2">Payments Ledger</div>
    <div className="grid gap-2">
      {items.map((r,i)=>(
        <div key={i} className="p-3 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5">
          <div className="flex items-center justify-between"><span>{r.tenant} — {r.property}</span><span>{formatPKR(r.amount)}</span></div>
          <div className="text-xs opacity-80 flex justify-between"><span>Ref {r.ref}</span><span>{new Date(r.ts).toLocaleString('en-PK')} • {r.status}</span></div>
        </div>
      ))}
    </div>
  </Card>;
}

'use client';
import React from 'react';
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { toCSV } from '@/lib/demo'

export default function Transactions(){
  const tx = [
    { id:'1', ref:'RB-100201', kind:'rent', amount:120000, method:'Bank Transfer', status:'sent', ts: Date.now()-86400000*2 },
    { id:'2', ref:'RB-100202', kind:'rent', amount:120000, method:'Card', status:'succeeded', ts: Date.now()-86400000 },
    { id:'3', ref:'RB-REDEEM-770001', kind:'redeem', amount:-1000, method:'voucher', status:'fulfilled', ts: Date.now()-86400000*7 },
  ];
  const exportCSV = ()=>{
    const headers = ['ref','kind','amount','method','status','ts'];
    const rows = tx.map(r=> [r.ref, r.kind, String(r.amount), r.method, r.status, new Date(r.ts).toISOString()]);
    const csv = toCSV([headers, ...rows]);
    const url = URL.createObjectURL(new Blob([csv], {type:'text/csv;charset=utf-8;'}));
    const a = document.createElement('a'); a.href=url; a.download='admin-transactions.csv'; a.click(); URL.revokeObjectURL(url);
  }
  return <Card>
    <div className="flex items-center justify-between mb-2">
      <div className="font-semibold">Transactions</div>
      <Button variant="outline" onClick={exportCSV}>Export CSV</Button>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="text-left opacity-70"><tr><th className="p-2">Ref</th><th className="p-2">Kind</th><th className="p-2">Amount</th><th className="p-2">Method</th><th className="p-2">Status</th><th className="p-2">Date</th></tr></thead>
        <tbody>
          {tx.map(r=>(<tr key={r.id} className="border-t border-black/10 dark:border-white/10">
            <td className="p-2">{r.ref}</td><td className="p-2">{r.kind}</td><td className="p-2">{r.amount}</td><td className="p-2">{r.method}</td><td className="p-2">{r.status}</td><td className="p-2">{new Date(r.ts).toLocaleString('en-PK')}</td>
          </tr>))}
        </tbody>
      </table>
    </div>
  </Card>;
}

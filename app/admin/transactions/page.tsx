// app/admin/transactions/page.tsx
"use client";
import { useEffect, useMemo, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import { strings } from "@/lib/i18n";
import { csvForAdmin, formatPKR, getAdminTransactions } from "@/lib/demo";

function RowSkel(){ return <div className="h-10 rounded-lg bg-black/5 dark:bg-white/10 animate-pulse" />; }

export default function AdminTxPage() {
  const [lang, setLang] = useState<"en"|"ur">("en");
  useEffect(() => { const l = localStorage.getItem("rb-lang"); if (l==='ur'||l==='en') setLang(l); }, []);
  const t = strings[lang];

  const [loading, setLoading] = useState(true);
  useEffect(() => { const id = setTimeout(() => setLoading(false), 400); return () => clearTimeout(id); }, []);

  const rows = useMemo(() => getAdminTransactions(), []);
  function dl() {
    const blob = new Blob([csvForAdmin()], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a");
    a.href = url; a.download = "transactions.csv"; a.click(); URL.revokeObjectURL(url);
  }

  return (
    <MobileAppShell>
      <div className="max-w-md mx-auto p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">{t.admin.tx.title}</h1>
          <button onClick={dl} className="text-sm px-3 py-1.5 rounded-lg border">{t.admin.tx.csv}</button>
        </div>

        <div className="mt-4 grid gap-2">
          {loading && (<><RowSkel/><RowSkel/><RowSkel/></>)}
          {!loading && rows.length === 0 && (
            <div className="p-4 rounded-xl border text-sm opacity-80">{t.admin.tx.empty}</div>
          )}
          {!loading && rows.map(r => (
            <div key={r.id} className="p-3 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{r.propertyName}</div>
                  <div className="text-xs opacity-70">{new Date(r.createdAt).toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{formatPKR(r.amount)}</div>
                  <div className="text-xs opacity-70">{r.status} · {r.method}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileAppShell>
  );
}

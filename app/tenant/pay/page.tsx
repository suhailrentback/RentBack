"use client";

import { useEffect, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import EmptyState from "@/components/EmptyState";
import { TableSkel } from "@/components/Skeletons";
import { strings } from "@/lib/i18n";

type Payment = {
  id: string;
  amount: number;
  landlord: string;
  status: string;
  createdAt: string;
};

export default function TenantPayPage() {
  const lang: "en" | "ur" = "en"; // replace with your lang state later
  const t = strings[lang];

  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState<Payment[]>([]);

  // simulate loading
  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
      // leave empty to trigger empty state for now
      setPayments([]);
    }, 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <MobileAppShell>
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-semibold">{t.pay.title}</h1>
        <p className="text-sm opacity-70">{t.pay.subtitle}</p>

        <div className="mt-6">
          {loading ? (
            <TableSkel rows={6} />
          ) : payments.length === 0 ? (
            <EmptyState
              title="No payments yet"
              subtitle="Create a demo payment to see it appear here."
              ctaHref="/tenant/pay"
              ctaLabel="Create Payment"
            />
          ) : (
            <ul className="space-y-2">
              {payments.map((p) => (
                <li
                  key={p.id}
                  className="rounded-lg border border-black/10 dark:border-white/10 p-3 flex justify-between"
                >
                  <div>
                    <div className="font-medium">{p.landlord}</div>
                    <div className="text-xs opacity-70">
                      {new Date(p.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">PKR {p.amount}</div>
                    <div className="text-xs opacity-70">{p.status}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </MobileAppShell>
  );
}

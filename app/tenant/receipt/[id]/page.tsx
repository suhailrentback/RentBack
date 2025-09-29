"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MobileAppShell from "@/components/MobileAppShell";
import { strings } from "@/lib/i18n";
import { getTenantContext, formatPKR } from "@/lib/demo";

type Lang = "en" | "ur";

export default function TenantReceiptPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;

  // language from localStorage (keeps labels consistent with your app shell)
  const [lang, setLang] = useState<Lang>("en");
  const t = strings[lang];

  useEffect(() => {
    try {
      const l = localStorage.getItem("rb-lang");
      if (l === "en" || l === "ur") setLang(l);
    } catch {}
  }, []);

  // pull current tenant context (demo memory)
  const ctx = useMemo(() => getTenantContext(), []);
  const payment = useMemo(
    () => ctx.payments.find((p: any) => p.id === id),
    [ctx, id]
  );

  // graceful missing receipt
  if (!payment) {
    return (
      <MobileAppShell>
        <div className="max-w-md mx-auto px-4 pb-24">
          <div className="pt-4" />
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-white/5">
            <div className="text-lg font-semibold mb-1">
              {lang === "en" ? "Receipt not found" : "رسید نہیں ملی"}
            </div>
            <div className="text-sm opacity-75 mb-4">
              {lang === "en"
                ? "We couldn’t find that receipt in your recent demo payments."
                : "ہم آپ کی حالیہ ڈیمو ادائیگیوں میں یہ رسید نہیں ڈھونڈ سکے۔"}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => router.back()}
                className="px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
              >
                {lang === "en" ? "Go back" : "واپس جائیں"}
              </button>
            </div>
          </div>
        </div>
      </MobileAppShell>
    );
  }

  // derive labels sensibly from whatever the demo object provides
  const createdAt: string =
    (payment.createdAt as string) || (payment.date as string) || new Date().toISOString();
  const property: string =
    payment.property || payment.propertyName || payment.landlord || "Property";
  const method: string = payment.method || "RAAST";
  const status: string = payment.status || "POSTED";
  const amount: number = Number(payment.amount ?? 0);
  const memo: string = payment.memo || payment.reference || "Rent payment";
  const reference: string =
    payment.reference ||
    `RB-${String(payment.id).slice(0, 4).toUpperCase()}-${String(payment.id).slice(-4).toUpperCase()}`;

  function printReceipt() {
    window.print();
  }

  return (
    <MobileAppShell>
      {/* Print styles to make this A4-friendly and hide chrome during print */}
      <style jsx global>{`
        @media print {
          html, body { background: white !important; }
          nav, .print-hide { display: none !important; }
          .receipt-sheet {
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
          }
          .receipt-card {
            page-break-inside: avoid;
            border: 1px solid #ddd !important;
          }
        }
      `}</style>

      <div className="max-w-md mx-auto px-4 pb-24">
        <div className="pt-3 pb-4 flex items-center justify-between print-hide">
          <button
            onClick={() => router.back()}
            className="px-3 py-2 text-sm rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
          >
            {lang === "en" ? "Back" : "واپس"}
          </button>
          <button
            onClick={printReceipt}
            className="px-3 py-2 text-sm rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {t.pay?.print ?? (lang === "en" ? "Print / Save PDF" : "پرنٹ / پی ڈی ایف")}
          </button>
        </div>

        <div className="receipt-sheet space-y-4">
          <div className="receipt-card rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-white/5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Logo />
                <div className="font-semibold">RentBack</div>
              </div>
              <div className="text-right">
                <div className="text-xs opacity-70">{lang === "en" ? "Receipt ID" : "رسید آئی ڈی"}</div>
                <div className="font-mono text-sm">{payment.id}</div>
              </div>
            </div>

            {/* Meta */}
            <div className="grid grid-cols-2 gap-4 mt-5">
              <Meta label={lang === "en" ? "Date" : "تاریخ"} value={new Date(createdAt).toLocaleString()} />
              <Meta label={lang === "en" ? "Status" : "اسٹیٹس"} value={status} />
              <Meta label={lang === "en" ? "Property / Landlord" : "پراپرٹی / مالک"} value={property} />
              <Meta label={lang === "en" ? "Method" : "طریقہ"} value={method} />
            </div>

            {/* Amount */}
            <div className="mt-6 rounded-xl bg-emerald-600/10 dark:bg-emerald-400/10 p-4 flex items-center justify-between">
              <div className="text-sm opacity-70">{lang === "en" ? "Amount" : "رقم"}</div>
              <div className="text-lg font-semibold">{formatPKR(amount)}</div>
            </div>

            {/* Reference / Memo */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <Meta label={lang === "en" ? "Reference" : "ریفرنس"} value={reference} mono />
              <Meta label={lang === "en" ? "Memo" : "میمو"} value={memo} />
            </div>

            {/* QR + Disclaimer */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <div className="aspect-square rounded-xl border border-black/10 dark:border-white/10 flex items-center justify-center">
                  {/* Fake QR placeholder for demo */}
                  <div className="text-xs opacity-70">QR</div>
                </div>
                <div className="text-[10px] opacity-60 mt-2">
                  {lang === "en" ? "Raast reference (demo)" : "راست ریفرنس (ڈیمو)"}
                </div>
              </div>
              <div className="col-span-2 text-xs opacity-80">
                <p>
                  {lang === "en"
                    ? "Demo: Not a real payment. This receipt is for product preview only."
                    : "ڈیمو: یہ حقیقی ادائیگی نہیں۔ یہ رسید صرف پراڈکٹ پری ویو کے لیے ہے۔"}
                </p>
              </div>
            </div>
          </div>

          {/* Footer (print-safe) */}
          <div className="text-xs opacity-60 text-center">
            © {new Date().getFullYear()} RentBack — {lang === "en" ? "Pakistan" : "پاکستان"}
          </div>
        </div>
      </div>
    </MobileAppShell>
  );
}

function Meta({
  label,
  value,
  mono,
}: {
  label: string;
  value: string | number;
  mono?: boolean;
}) {
  return (
    <div>
      <div className="text-xs opacity-70">{label}</div>
      <div className={mono ? "font-mono text-sm" : "text-sm"}>{value}</div>
    </div>
  );
}

function Logo({ size = 20, stroke = "#059669" }: { size?: number; stroke?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 11.5L12 4l9 7.5" />
      <path d="M5 10v9h14v-9" />
    </svg>
  );
}

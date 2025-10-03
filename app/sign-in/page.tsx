// app/sign-in/page.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useLang } from "@/hooks/useLang";

export default function SignIn() {
  const r = useRouter();
  const next = useSearchParams().get("next") || "/tenant";
  const { lang } = useLang();

  const L = lang === "ur"
    ? {
        title: "ڈیمو رول منتخب کریں",
        subtitle:
          "یہ ایک ڈیمو ہے — صرف ایک کوکی سیٹ کی جاتی ہے تاکہ محفوظ صفحات کھل سکیں۔ حقیقی لاگ اِن نہیں۔",
        tenant: "کرایہ دار کے طور پر جاری رکھیں",
        landlord: "مکان مالک کے طور پر جاری رکھیں",
        admin: "ایڈمن کے طور پر جاری رکھیں",
        tip: "ٹِپ: اگر مسئلہ ہو تو نیا اِنکگنیٹو/پرائیویٹ ونڈو آزمائیں۔",
        home: "ہوم",
      }
    : {
        title: "Choose a demo role",
        subtitle:
          "This is a demo — we set a cookie so protected pages load. No real auth.",
        tenant: "Continue as Tenant",
        landlord: "Continue as Landlord",
        admin: "Continue as Admin",
        tip: "Tip: use a new private/incognito window if you get stuck.",
        home: "Home",
      };

  function pick(role: "TENANT" | "LANDLORD" | "ADMIN") {
    // Set a demo cookie so middleware lets you in
    document.cookie = `rb-role=${role}; Path=/; Max-Age=${60 * 60 * 24 * 30}`;
    // Route to the correct zone (or the originally requested page for TENANT)
    if (role === "TENANT") r.push(next);
    else if (role === "LANDLORD") r.push("/landlord");
    else r.push("/admin");
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-[#0b0b0b] dark:text-white">
      {/* Top bar with Home button (no bottom nav on this page) */}
      <header className="sticky top-0 z-10 border-b border-black/10 dark:border-white/10 bg-white/70 dark:bg-[#0b0b0b]/70 backdrop-blur">
        <div className="mx-auto max-w-3xl px-4 h-14 flex items-center justify-between">
          <div className="text-base font-semibold">RentBack</div>
          <button
            type="button"
            onClick={() => r.push("/")}
            className="h-9 px-3 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-sm"
          >
            {L.home}
          </button>
        </div>
      </header>

      {/* Centered card */}
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="mx-auto w-full max-w-md rounded-2xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur p-6">
          <h1 className="text-xl font-bold">{L.title}</h1>
          <p className="text-sm opacity-70 mt-1">{L.subtitle}</p>

          <div className="mt-5 grid gap-2">
            <button
              type="button"
              onClick={() => pick("TENANT")}
              className="h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {L.tenant}
            </button>

            <button
              type="button"
              onClick={() => pick("LANDLORD")}
              className="h-11 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
            >
              {L.landlord}
            </button>

            <button
              type="button"
              onClick={() => pick("ADMIN")}
              className="h-11 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
            >
              {L.admin}
            </button>
          </div>

          <p className="text-xs opacity-60 mt-4">{L.tip}</p>
        </div>
      </main>
    </div>
  );
}

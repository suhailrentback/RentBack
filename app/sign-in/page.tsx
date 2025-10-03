"use client";

import { useRouter, useSearchParams } from "next/navigation";
import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";

export default function SignIn() {
  const r = useRouter();
  const next = useSearchParams().get("next") || "/tenant";
  const { lang } = useLang();

  // Localized copy (kept here so you don't need to touch i18n)
  const L =
    lang === "en"
      ? {
          title: "Sign in",
          sub: "Choose a demo role. This sets a cookie so protected app pages load. No real auth here.",
          tenant: "Continue as Tenant",
          landlord: "Continue as Landlord",
          admin: "Continue as Admin",
          tip: "Tip: use a private/incognito window if you get stuck.",
        }
      : {
          title: "سائن اِن",
          sub: "ڈیمو رول منتخب کریں۔ یہ ایک کوکی سیٹ کرتا ہے تاکہ محفوظ صفحات کھل سکیں۔ یہاں حقیقی لاگ اِن نہیں۔",
          tenant: "کرایہ دار کے طور پر جاری رکھیں",
          landlord: "مکان مالک کے طور پر جاری رکھیں",
          admin: "ایڈمن کے طور پر جاری رکھیں",
          tip: "مشورہ: اگر مسئلہ ہو تو پرائیویٹ/انکوگنیٹو ونڈو استعمال کریں۔",
        };

  function pick(role: "TENANT" | "LANDLORD" | "ADMIN") {
    // Set a demo cookie so middleware lets you in (30 days)
    document.cookie = `rb-role=${role}; Path=/; Max-Age=${60 * 60 * 24 * 30}`;
    // Route to the correct zone (or originally requested page for TENANT)
    if (role === "TENANT") r.push(next);
    else if (role === "LANDLORD") r.push("/landlord");
    else r.push("/admin");
  }

  return (
    <AppShell title={L.title} hideBottomNav>
      <div className="p-4">
        <section className="w-full max-w-md mx-auto rounded-2xl border border-black/10 dark:border-white/10 p-6 bg-white/60 dark:bg-white/5 backdrop-blur">
          <p className="text-sm opacity-75">{L.sub}</p>

          <div className="mt-5 grid gap-2">
            <button
              type="button"
              onClick={() => pick("TENANT")}
              className="h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
            >
              {L.tenant}
            </button>
            <button
              type="button"
              onClick={() => pick("LANDLORD")}
              className="h-11 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 font-medium"
            >
              {L.landlord}
            </button>
            <button
              type="button"
              onClick={() => pick("ADMIN")}
              className="h-11 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 font-medium"
            >
              {L.admin}
            </button>
          </div>

          <p className="text-xs opacity-60 mt-4">{L.tip}</p>
        </section>
      </div>
    </AppShell>
  );
}

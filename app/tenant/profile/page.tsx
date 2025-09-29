"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";

type Lang = "en" | "ur";

const labels = {
  en: {
    title: "Profile",
    sub: "Account & support",
    email: "Email",
    role: "Role",
    support: "Need help?",
    contact: "Contact support",
    legal: "Legal",
    privacy: "Privacy",
    terms: "Terms",
    signOut: "Sign out (demo)",
  },
  ur: {
    title: "پروفائل",
    sub: "اکاؤنٹ اور مدد",
    email: "ای میل",
    role: "رول",
    support: "مدد درکار؟",
    contact: "سپورٹ سے رابطہ",
    legal: "قانونی",
    privacy: "پرائیویسی",
    terms: "شرائط",
    signOut: "لاگ آؤٹ (ڈیمو)",
  },
} as const;

export default function ProfilePage() {
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    const htmlLang = document.documentElement.getAttribute("lang");
    setLang(htmlLang === "ur" ? "ur" : "en");
  }, []);
  const t = useMemo(() => labels[lang], [lang]);
  const dir = lang === "ur" ? "rtl" : "ltr";

  const email = "tenant@rentback.app"; // demo
  const role = "Tenant (demo)";

  function signOut() {
    try {
      document.cookie = "rb-role=; Max-Age=0; Path=/;";
      localStorage.removeItem("rb-payments");
      localStorage.removeItem("rb-reward-balance");
      localStorage.removeItem("rb-reward-entries");
    } catch {}
    window.location.href = "/sign-in";
  }

  return (
    <MobileAppShell>
      <div className="p-4 space-y-4" style={{ direction: dir }}>
        <div>
          <h1 className="text-xl font-semibold">{t.title}</h1>
          <p className="text-sm opacity-70">{t.sub}</p>
        </div>

        <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5 space-y-3">
          <div>
            <div className="text-xs opacity-70">{t.email}</div>
            <div className="font-medium">{email}</div>
          </div>
          <div>
            <div className="text-xs opacity-70">{t.role}</div>
            <div className="font-medium">{role}</div>
          </div>
        </div>

        <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5 space-y-3">
          <div className="text-sm font-medium opacity-80">{t.support}</div>
          <a
            href="mailto:help@rentback.app"
            className="inline-block text-sm px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {t.contact}
          </a>
        </div>

        <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5 space-y-3">
          <div className="text-sm font-medium opacity-80">{t.legal}</div>
          <div className="flex gap-3">
            <Link
              href="/privacy"
              className="px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 text-sm hover:bg-black/5 dark:hover:bg-white/10"
            >
              {t.privacy}
            </Link>
            <Link
              href="/terms"
              className="px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 text-sm hover:bg-black/5 dark:hover:bg-white/10"
            >
              {t.terms}
            </Link>
          </div>
        </div>

        <button
          onClick={signOut}
          className="w-full px-4 py-2 rounded-xl bg-black/90 hover:bg-black text-white dark:bg-white/10 dark:hover:bg-white/20"
        >
          {t.signOut}
        </button>
      </div>
    </MobileAppShell>
  );
}

"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Role = "tenant" | "landlord" | "admin";

export default function SignInPage() {
  const router = useRouter();
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [lang, setLang] = useState<"en" | "ur">("en");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("tenant");
  const [error, setError] = useState<string | null>(null);

  // hydrate theme/lang from localStorage and set html attributes
  useEffect(() => {
    try {
      const t = localStorage.getItem("rb-theme");
      const l = localStorage.getItem("rb-lang");
      if (t === "light" || t === "dark") setTheme(t);
      if (l === "en" || l === "ur") setLang(l);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ur" ? "rtl" : "ltr");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    try {
      localStorage.setItem("rb-theme", theme);
      localStorage.setItem("rb-lang", lang);
    } catch {}
  }, [theme, lang]);

  const t = copy[lang];
  const dir = lang === "ur" ? "rtl" : "ltr";

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    // super basic demo validation
    if (!email.includes("@") || password.length < 3) {
      setError(t.err);
      return;
    }
    try {
      // demo: stash role/email; in production replace with real auth
      localStorage.setItem("rb-user-role", role);
      localStorage.setItem("rb-user-email", email);
    } catch {}
    router.push("/" + role);
  }

  return (
    <div
      className="min-h-screen bg-white text-slate-900 dark:bg-[#0b0b0b] dark:text-white"
      style={{ direction: dir }}
    >
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/30 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400">
            <Logo />
            <span>RentBack</span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang((p) => (p === "en" ? "ur" : "en"))}
              className="px-3 py-2 text-sm rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
            >
              {lang === "en" ? "اردو" : "English"}
            </button>
            <button
              onClick={() => setTheme((p) => (p === "dark" ? "light" : "dark"))}
              className="px-3 py-2 text-sm rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
            >
              {theme === "dark" ? t.light : t.dark}
            </button>
          </div>
        </div>
      </header>

      {/* Form Card */}
      <main className="mx-auto max-w-6xl px-4">
        <section className="py-14 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold">{t.title}</h1>
            <p className="mt-3 opacity-80">{t.sub}</p>
            <ul className="mt-6 space-y-2 text-sm opacity-80">
              <li>• {t.bullet1}</li>
              <li>• {t.bullet2}</li>
              <li>• {t.bullet3}</li>
            </ul>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 blur-3xl opacity-30 hidden dark:block"
                 style={{ background: "conic-gradient(from 90deg at 50% 50%, #059669, #10b981, #34d399)" }} />
            <div className="relative rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 p-6">
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">{t.email}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-black/15 dark:border-white/10 bg-white dark:bg-black/20 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{t.password}</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-black/15 dark:border-white/10 bg-white dark:bg-black/20 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t.role}</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["tenant", "landlord", "admin"] as Role[]).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRole(r)}
                        className={
                          "px-3 py-2 rounded-xl border text-sm " +
                          (role === r
                            ? "bg-emerald-600 text-white border-emerald-600"
                            : "border-black/15 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10")
                        }
                        aria-pressed={role === r}
                      >
                        {t.roles[r]}
                      </button>
                    ))}
                  </div>
                </div>

                {error && (
                  <div className="text-red-600 dark:text-red-400 text-sm">{error}</div>
                )}

                <button
                  type="submit"
                  className="w-full px-4 py-3 rounded-xl font-semibold bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  {t.submit}
                </button>
              </form>

              <p className="mt-4 text-xs opacity-70">
                {t.disclaimer}
              </p>
            </div>

            <p className="mt-3 text-xs opacity-70">
              <Link href="/" className="underline hover:opacity-100 opacity-80">
                ← {t.back}
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

function Logo({ size = 22, stroke = "#059669" }: { size?: number; stroke?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 11.5L12 4l9 7.5" />
      <path d="M5 10v9h14v-9" />
    </svg>
  );
}

const copy = {
  en: {
    title: "Welcome back",
    sub: "Sign in to pay rent, earn rewards, and manage your account.",
    bullet1: "Pay via bank transfer (Raast), card, or wallet",
    bullet2: "Earn & redeem rewards with Pakistani brands",
    bullet3: "English/Urdu, light/dark, mobile-first",
    email: "Email",
    password: "Password",
    role: "Choose a role (demo)",
    roles: { tenant: "Tenant", landlord: "Landlord", admin: "Admin" },
    submit: "Continue",
    disclaimer: "Demo sign-in. No real authentication yet.",
    back: "Back to landing",
    light: "Light",
    dark: "Dark",
    err: "Enter a valid email and a password (min 3 chars).",
  },
  ur: {
    title: "خوش آمدید",
    sub: "کرایہ ادا کریں، انعامات حاصل کریں، اور اکاؤنٹ مینیج کریں۔",
    bullet1: "بینک ٹرانسفر (راست)، کارڈ یا والیٹ سے ادائیگی",
    bullet2: "پاکستانی برانڈز پر انعامات ریڈیم کریں",
    bullet3: "English/اردو، لائٹ/ڈارک، موبائل فرسٹ",
    email: "ای میل",
    password: "پاس ورڈ",
    role: "رول منتخب کریں (ڈیمو)",
    roles: { tenant: "کلایٔنٹ", landlord: "مالک مکان", admin: "ایڈمن" },
    submit: "جاری رکھیں",
    disclaimer: "ڈیمو سائن اِن — حقیقی تصدیق نہیں۔",
    back: "واپس لینڈنگ پر جائیں",
    light: "لائٹ",
    dark: "ڈارک",
    err: "درست ای میل اور کم از کم 3 حروف کا پاس ورڈ درج کریں۔",
  },
} as const;

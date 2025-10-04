"use client";

import Link from "next/link";
import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";

export default function NotFound() {
  const { t } = useLang();

  // Fallbacks in case these keys don't exist in i18n yet
  const L = {
    title: "404",
    desc:
      t?.support ??
      "This page could not be found.",
    home: t?.nav?.home ?? "Home",
    signIn: t?.auth?.signIn ?? "Sign in",
    support: t?.support ?? "Support",
  };

  return (
    <AppShell title={L.title} hideBottomNav>
      <div className="p-6">
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-8 text-center bg-white/60 dark:bg-white/5">
          <div className="text-6xl font-extrabold text-emerald-600 dark:text-emerald-400">
            404
          </div>
          <p className="mt-3 text-sm opacity-80">
            {L.desc}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="h-11 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {L.home}
            </Link>
            <Link
              href="/sign-in"
              className="h-11 px-5 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
            >
              {L.signIn}
            </Link>
            <Link
              href="/support"
              className="h-11 px-5 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
            >
              {L.support}
            </Link>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

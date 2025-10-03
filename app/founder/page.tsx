"use client";

import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";
import Link from "next/link";

export default function FounderPage() {
  const { t } = useLang();
  const L = t.founder;

  return (
    <AppShell title={L.title} hideBottomNav>
      <div className="p-4 space-y-4">
        {/* Top-right actions (Home / Sign in) */}
        <div className="flex justify-end gap-2">
          <Link
            href="/"
            className="px-3 py-2 text-sm rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
          >
            {L.actions.home}
          </Link>
          <Link
            href="/sign-in"
            className="px-3 py-2 text-sm rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {L.actions.signIn}
          </Link>
        </div>

        {/* Hero */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white/50 dark:bg-white/5 backdrop-blur">
          <p className="text-sm opacity-70">{L.subtitle}</p>
          <h2 className="text-2xl font-bold mt-1">{L.title}</h2>
        </section>

        {/* Body */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white/50 dark:bg-white/5 backdrop-blur">
          <p className="text-sm leading-6">{L.story}</p>
          <p className="text-sm leading-6 mt-3">{L.vision}</p>
          <p className="text-sm leading-6 mt-3 font-medium">{L.closing}</p>
        </section>
      </div>
    </AppShell>
  );
}

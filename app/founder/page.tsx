"use client";

import Link from "next/link";
import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";

export default function FounderPage() {
  const { t } = useLang();
  const L = t.founderPage; // we added founderPage copy to i18n earlier

  return (
    <AppShell title={L.title} hideBottomNav>
      <div className="p-4 space-y-4">
        {/* Hero card */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white/50 dark:bg-white/5 backdrop-blur">
          <p className="text-sm opacity-80">{L.byline}</p>
          <h2 className="text-2xl font-bold mt-1">{L.hero}</h2>
          <p className="mt-4 text-sm leading-6 opacity-90">{L.p1}</p>
          <p className="mt-3 text-sm leading-6 opacity-90">{L.p2}</p>
          <p className="mt-3 text-sm leading-6 opacity-90">{L.p3}</p>
        </section>

        {/* Top-right already has Home / Sign in via header; no bottom nav */}
        <section className="text-xs opacity-70">
          <div>© {new Date().getFullYear()} RentBack</div>
        </section>
      </div>
    </AppShell>
  );
}

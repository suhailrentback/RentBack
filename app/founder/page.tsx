"use client";

import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";

export default function FounderPage() {
  const { t } = useLang();
  // Use the 'founder' section from i18n (not 'founderPage')
  const L = t.founder;

  return (
    <AppShell title={L.title} hideBottomNav>
      <div className="p-4 space-y-4">
        {/* Hero */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white/50 dark:bg-white/5 backdrop-blur">
          <p className="text-sm opacity-70">{L.byline}</p>
          <h2 className="text-2xl font-bold mt-1">{L.h1}</h2>
        </section>

        {/* Body */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white/50 dark:bg-white/5 backdrop-blur">
          <p className="text-sm leading-6">{L.p1}</p>
          <p className="text-sm leading-6 mt-3">{L.p2}</p>
          <p className="text-sm leading-6 mt-3 font-medium">{L.thanks}</p>
        </section>
      </div>
    </AppShell>
  );
}

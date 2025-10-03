// app/founder/page.tsx
"use client";

import Link from "next/link";
import { useLang } from "@/hooks/useLang";
import AppShell from "@/components/AppShell";

export default function FounderPage() {
  const { t } = useLang();
  const L = t.founder;

  // Use a neutral role so AppShell doesn't render the bottom nav
  return (
    <AppShell role="public" title={L.title}>
      <div className="p-4 space-y-4">
        {/* Hero */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white/50 dark:bg-white/5 backdrop-blur">
          <h1 className="text-2xl font-bold">{L.title}</h1>
          <p className="text-sm opacity-80 mt-1">{L.subtitle}</p>
        </section>

        {/* Story + actions */}
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white/50 dark:bg-white/5 backdrop-blur space-y-3">
          <p className="text-base leading-relaxed">{L.story}</p>
          <p className="text-base leading-relaxed">{L.vision}</p>
          <p className="text-base font-medium">{L.closing}</p>

          {/* Buttons below the paragraph block */}
          <div className="pt-2 flex gap-3">
            <Link
              href="/"
              className="px-4 py-2 rounded-xl border border-black/10 dark:border-white/10 text-sm"
            >
              {L.actions.home}
            </Link>
            <Link
              href="/signin"
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm"
            >
              {L.actions.signIn}
            </Link>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

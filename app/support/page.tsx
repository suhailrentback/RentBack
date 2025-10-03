"use client";

import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";

export default function SupportPage() {
  const { t } = useLang();

  return (
    <AppShell role="tenant" title={t.needHelp}>
      <div className="p-4 space-y-4">
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
          <p className="text-sm opacity-80">{t.support}</p>
        </section>
      </div>
    </AppShell>
  );
}

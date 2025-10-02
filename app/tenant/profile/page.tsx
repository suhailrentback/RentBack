// app/tenant/profile/page.tsx
"use client";

import AppShell from "@/components/AppShell";
import { strings, type Lang } from "@/lib/i18n";

export default function TenantProfilePage() {
  const lang: Lang = "en";
  const t = strings[lang];

  return (
    <AppShell role="tenant" title={t.tenant.profile.title}>
      <div className="p-4 space-y-4">
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5">
          <div className="text-sm font-medium">{t.tenant.profile.title}</div>
          <div className="mt-2 text-xs opacity-70">{t.tenant.profile.needHelp}</div>
          <div className="mt-4 flex gap-2">
            <button className="px-3 py-2 rounded-lg border text-sm">{t.tenant.profile.privacy}</button>
            <button className="px-3 py-2 rounded-lg border text-sm">{t.tenant.profile.terms}</button>
          </div>
          <div className="mt-6">
            <button className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm">
              {t.tenant.profile.signOut}
            </button>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

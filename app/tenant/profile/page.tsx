"use client";

import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";

export default function TenantProfilePage() {
  const { t } = useLang();

  return (
    <AppShell role="tenant" title={t.tenant.profile.title}>
      <div className="p-4 space-y-4">
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4 space-y-3">
          <button
            className="px-3 py-2 rounded-lg bg-emerald-600 text-white text-sm"
            onClick={() => alert("Signed out (demo)")}
          >
            {t.tenant.profile.signOut}
          </button>

          <div className="h-px bg-black/10 dark:bg-white/10" />

          <div className="grid gap-2 sm:grid-cols-2">
            <a
              className="px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 text-sm hover:bg-black/5 dark:hover:bg-white/5"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert(t.tenant.profile.privacy);
              }}
            >
              {t.tenant.profile.privacy}
            </a>
            <a
              className="px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 text-sm hover:bg-black/5 dark:hover:bg-white/5"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert(t.tenant.profile.terms);
              }}
            >
              {t.tenant.profile.terms}
            </a>
          </div>

          <p className="text-sm opacity-70">{t.tenant.profile.needHelp}</p>
        </section>
      </div>
    </AppShell>
  );
}

import React from 'react';
import AppShell from '@/components/AppShell';
import SectionNav from '@/components/SectionNav';
import ThemeLangProvider, { useTL } from '@/components/providers/ThemeLangProvider';
import { strings } from '@/lib/i18n';

function TenantNav() {
  const { lang } = useTL(); const t = strings[lang];
  return <SectionNav base="/tenant" items={[
    { href: '', label: t.nav.home},
    { href: '/pay', label: t.nav.pay},
    { href: '/rewards', label: t.nav.rewards},
    { href: '/profile', label: t.nav.profile},
  ]} />
}

export default function Layout({ children }:{children:React.ReactNode}){
  return <AppShell>
    <TenantNav />
    <div className="max-w-4xl mx-auto p-4">{children}</div>
  </AppShell>;
}

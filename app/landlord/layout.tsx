import React from 'react';
import AppShell from '@/components/AppShell';
import SectionNav from '@/components/SectionNav';

export default function Layout({ children }:{children:React.ReactNode}){
  return <AppShell>
    <SectionNav base="/landlord" items={[
      { href: '', label: 'Dashboard' },
      { href: '/ledger', label: 'Ledger' },
      { href: '/settings', label: 'Settings' },
    ]} />
    <div className="max-w-4xl mx-auto p-4">{children}</div>
  </AppShell>;
}

import React from 'react';
import AppShell from '@/components/AppShell';
import SectionNav from '@/components/SectionNav';

export default function Layout({ children }:{children:React.ReactNode}){
  return <AppShell>
    <SectionNav base="/admin" items={[
      { href: '', label: 'Overview' },
      { href: '/transactions', label: 'Transactions' },
      { href: '/users', label: 'Users' },
    ]} />
    <div className="max-w-5xl mx-auto p-4">{children}</div>
  </AppShell>;
}

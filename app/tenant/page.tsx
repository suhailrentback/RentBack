'use client';
import React from 'react';
import Card from '@/components/ui/Card'
import { useTL } from '@/components/providers/ThemeLangProvider'
import { strings } from '@/lib/i18n'

export default function TenantHome(){
  const { lang } = useTL(); const t = strings[lang];
  return (
    <div className="grid gap-3">
      <Card><div className="font-semibold mb-1">{t.demoBanner}</div><div className="text-sm opacity-80">No real payments are moved.</div></Card>
      <Card><div className="font-semibold">Overview</div><div className="text-sm opacity-80">Pending balance: PKR 120,000 • New rewards: 2</div></Card>
    </div>
  )
}

import React from 'react'
import AppShell from '@/components/AppShell'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import ThemeLangProvider, { useTL } from '@/components/providers/ThemeLangProvider'
import { strings } from '@/lib/i18n'

function Landing() {
  const { lang } = useTL();
  const t = strings[lang];
  return (
    <div className="grid gap-6">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold">{t.app}</h1>
        <p className="opacity-80">{t.tagline}</p>
        <div className="flex gap-2 justify-center">
          <a href="/tenant"><Button>{t.cta}</Button></a>
          <a href="/sign-in"><Button variant="outline">{t.signIn}</Button></a>
        </div>
      </div>
      <Card>
        <div className="font-semibold mb-2">What is RentBack?</div>
        <p className="opacity-80">Pay rent easily and earn rewards. Designed for Pakistan, inspired by the best fintech UX.</p>
      </Card>
    </div>
  )
}

export default function Page() {
  return (
    <AppShell>
      <Landing />
    </AppShell>
  )
}

'use client';
import React, { useState } from 'react'
import AppShell from '@/components/AppShell'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { useRouter } from 'next/navigation'
import { useTL } from '@/components/providers/ThemeLangProvider'
import { strings } from '@/lib/i18n'

export default function SignInPage(){
  const { lang } = useTL();
  const t = strings[lang];
  const [email, setEmail] = useState('');
  const router = useRouter();
  const onSubmit = (e:React.FormEvent)=>{
    e.preventDefault();
    localStorage.setItem('rb-email', email);
    router.push('/tenant');
  }
  return (
    <AppShell>
      <Card>
        <form onSubmit={onSubmit} className="grid gap-3">
          <h2 className="text-xl font-semibold">{t.signIn}</h2>
          <input className="px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5" placeholder={t.email} value={email} onChange={e=>setEmail(e.target.value)} />
          <Button type="submit">{t.continue}</Button>
        </form>
      </Card>
    </AppShell>
  )
}

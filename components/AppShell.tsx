'use client';
import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { strings } from '@/lib/i18n';
import ThemeLangProvider, { useTL } from '@/components/providers/ThemeLangProvider';

function ShellInner({ children }: {children: React.ReactNode}) {
  const { lang, setLang, theme, setTheme } = useTL();
  const t = strings[lang];
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[var(--rb-bg)] dark:text-white">
      <header className="sticky top-0 z-30 h-14 flex items-center justify-between px-4 border-b border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/30 backdrop-blur">
        <Link href="/" className="font-bold text-brand">RentBack</Link>
        <div className="flex gap-2">
          <Button variant="outline" onClick={()=> setLang(lang==='en'?'ur':'en')}>{lang==='en'?t.urdu:t.english}</Button>
          <Button variant="outline" onClick={()=> setTheme(theme==='dark'?'light':'dark')}>{theme==='dark'?t.light:t.dark}</Button>
          <Link href="/sign-in"><Button variant="solid">{t.signIn}</Button></Link>
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-4">{children}</main>
      <footer className="p-6 text-sm opacity-70 text-center border-t border-black/10 dark:border-white/10">© {new Date().getFullYear()} RentBack</footer>
    </div>
  );
}

export default function AppShell({ children }:{children:React.ReactNode}){
  return <ThemeLangProvider><ShellInner>{children}</ShellInner></ThemeLangProvider>
}

'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Lang } from '@/lib/i18n';
import { dirFor } from '@/lib/i18n';

type Ctx = {
  lang: Lang; setLang: (l:Lang)=>void;
  theme: 'light'|'dark'; setTheme:(t:'light'|'dark')=>void;
};
const C = createContext<Ctx | null>(null);
export function useTL(){ const v=useContext(C); if(!v) throw new Error('TL missing'); return v; }

export default function ThemeLangProvider({ children }: {children: React.ReactNode}){
  const [lang, setLang] = useState<Lang>(()=> (typeof window!=='undefined' && (localStorage.getItem('rb-lang') as Lang)) || 'en');
  const [theme, setTheme] = useState<'light'|'dark'>(()=> (typeof window!=='undefined' && (localStorage.getItem('rb-theme') as 'light'|'dark')) || 'dark');
  useEffect(()=>{
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', lang);
      document.documentElement.setAttribute('dir', dirFor(lang));
      localStorage.setItem('rb-lang', lang);
    }
  },[lang]);
  useEffect(()=>{
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', theme==='dark');
      localStorage.setItem('rb-theme', theme);
    }
  },[theme]);
  return <C.Provider value={{lang,setLang,theme,setTheme}}>{children}</C.Provider>;
}

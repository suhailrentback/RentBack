'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SectionNav({ base, items }:{ base:string; items: {href:string; label:string}[] }){
  const path = usePathname();
  return (
    <nav className="sticky top-14 z-20 bg-white/70 dark:bg-black/30 backdrop-blur border-b border-black/10 dark:border-white/10">
      <div className="max-w-4xl mx-auto grid grid-flow-col auto-cols-fr">
        {items.map(it=>{
          const active = path === `${base}${it.href}`;
          return (
            <Link key={it.href} href={`${base}${it.href}`} className={`px-4 py-3 text-center font-medium ${active?'text-brand border-b-2 border-brand':'opacity-80 hover:opacity-100'}`}>{it.label}</Link>
          );
        })}
      </div>
    </nav>
  );
}

'use client';
import React, { useState } from 'react';
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

export default function Profile(){
  const [name, setName] = useState(()=> typeof window!=='undefined' ? localStorage.getItem('rb-profile-name') || '' : '');
  const [cnic, setCnic] = useState(()=> typeof window!=='undefined' ? localStorage.getItem('rb-profile-cnic') || '' : '');
  const [property, setProperty] = useState(()=> typeof window!=='undefined' ? localStorage.getItem('rb-profile-property') || '' : '');
  const save = ()=>{ try{ localStorage.setItem('rb-profile-name', name); localStorage.setItem('rb-profile-cnic', cnic); localStorage.setItem('rb-profile-property', property); alert('Saved'); }catch{} };
  return <Card>
    <div className="font-semibold mb-2">Profile</div>
    <div className="grid gap-2">
      <input className="px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
      <input className="px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5" placeholder="CNIC" value={cnic} onChange={e=>setCnic(e.target.value)} />
      <input className="px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5" placeholder="Property" value={property} onChange={e=>setProperty(e.target.value)} />
      <Button onClick={save}>Save</Button>
    </div>
  </Card>;
}

import React from 'react';
import Card from '@/components/ui/Card'
export default function AdminHome(){
  return <div className="grid gap-3">
    <Card><div className="font-semibold">System Health</div><div className="text-sm opacity-80">Everything looks good. (Demo)</div></Card>
  </div>;
}

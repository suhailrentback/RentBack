import React from 'react';
import Card from '@/components/ui/Card'
export default function LandlordHome(){
  return <div className="grid gap-3">
    <Card><div className="font-semibold">Overview</div><div className="text-sm opacity-80">3 units • Expected this month: PKR 360,000</div></Card>
  </div>;
}

import React from 'react';
export default function RaastQR({ value, size=112 }:{value:string; size?:number}){
  let x=5381; for (const ch of value) { x=((x*33 + ch.charCodeAt(0))>>>0); }
  const cells=21; const bits:number[]=[]; let y=x;
  for (let i=0;i<cells*cells;i++){ y^=y<<13; y^=y>>>17; y^=y<<5; bits.push(y & 1); }
  const cell=size/cells;
  return <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label="QR demo">
    <rect width={size} height={size} fill="#fff" />
    {bits.map((b,i)=> b ? <rect key={i} x={(i%cells)*cell} y={Math.floor(i/cells)*cell} width={cell} height={cell} fill="#000" /> : null)}
  </svg>;
}

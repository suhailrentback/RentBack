import React from 'react';
export default function Card({ children, className='' }: {children:React.ReactNode, className?:string}) {
  return <div className={`rb-card ${className}`}>{children}</div>;
}

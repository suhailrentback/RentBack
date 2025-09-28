'use client';
import { clsx } from 'clsx';
import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'solid'|'outline'|'ghost'|'danger';
  size?: 'sm'|'md'|'lg';
};

export default function Button({ variant='solid', size='md', className, ...props }: Props) {
  const base = 'inline-flex items-center justify-center rounded-lg font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed';
  const v = {
    solid: 'bg-brand text-white hover:bg-brand-700',
    outline: 'border border-brand/30 text-brand hover:bg-brand/10',
    ghost: 'text-brand hover:bg-brand/10',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  }[variant];
  const s = { sm:'px-2 py-1 text-sm', md:'px-3 py-2', lg:'px-4 py-3 text-base' }[size];
  return <button className={clsx(base, v, s, className)} {...props} />;
}

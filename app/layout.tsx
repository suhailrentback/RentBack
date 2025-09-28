import './globals.css'
import React from 'react'

export const metadata = {
  title: 'RentBack',
  description: 'Turning rent into rewards.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}

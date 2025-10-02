// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import LangProvider from "@/providers/LangProvider";

export const metadata: Metadata = {
  title: "RentBack",
  description: "Demo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}

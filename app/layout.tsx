import type { Metadata } from "next";
import "./globals.css";
import LangProvider from "@/providers/LangProvider";

export const metadata: Metadata = {
  title: "RentBack",
  description: "Modern rent & rewards demo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Note: html has static lang/dir at SSR; LangProvider syncs them on the client.
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className="min-h-dvh bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}

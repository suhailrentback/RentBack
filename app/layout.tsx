import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/providers/LangProvider";

export const metadata: Metadata = {
  title: "RentBack",
  description: "Demo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // The provider will set <html dir/lang> on the client; we default to en/ltr for SSR
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}

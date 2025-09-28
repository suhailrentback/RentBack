// app/landlord/layout.tsx
import type { ReactNode } from "react";
import MobileAppShell from "@/components/MobileAppShell";

export default function LandlordLayout({ children }: { children: ReactNode }) {
  return <MobileAppShell>{children}</MobileAppShell>;
}

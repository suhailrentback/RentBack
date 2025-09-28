// app/tenant/layout.tsx
import type { ReactNode } from "react";
import MobileAppShell from "@/components/MobileAppShell";

export default function TenantLayout({ children }: { children: ReactNode }) {
  return <MobileAppShell>{children}</MobileAppShell>;
}

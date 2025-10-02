// app/admin/layout.tsx
import "@/app/globals.css";
import AppShell from "@/components/AppShell";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Title can be overridden by pages; this is a safe default.
  return (
    <AppShell role="admin" title="Admin">
      {children}
    </AppShell>
  );
}

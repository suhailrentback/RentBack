// app/landlord/ledger/page.tsx
import ScreenSection from "@/components/mobile/ScreenSection";

export const dynamic = "force-dynamic";

export default function LandlordLedger() {
  return (
    <div className="space-y-4">
      <ScreenSection title="Ledger (demo)">
        <table className="w-full text-sm">
          <thead className="opacity-70">
            <tr>
              <th className="text-left py-2">Date</th>
              <th className="text-left py-2">Tenant</th>
              <th className="text-right py-2">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 dark:divide-white/10">
            {[
              { d: "2025-10-01", t: "Ali", a: "PKR 120,000" },
              { d: "2025-09-01", t: "Sana", a: "PKR 120,000" },
              { d: "2025-09-01", t: "Hamza", a: "PKR 120,000" },
            ].map((row) => (
              <tr key={row.d + row.t}>
                <td className="py-2">{row.d}</td>
                <td className="py-2">{row.t}</td>
                <td className="py-2 text-right">{row.a}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScreenSection>
    </div>
  );
}

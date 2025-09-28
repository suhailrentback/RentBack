// app/admin/transactions/page.tsx
import ScreenSection from "@/components/mobile/ScreenSection";

export const dynamic = "force-dynamic";

export default function AdminTransactions() {
  const txns = [
    { date: "2025-10-01", user: "Ali", method: "Raast", amount: "PKR 120,000", ref: "RB-23091" },
    { date: "2025-10-01", user: "Sana", method: "Card", amount: "PKR 120,000", ref: "RB-23090" },
  ];
  return (
    <div className="space-y-4">
      <ScreenSection title="Transactions (demo)">
        <table className="w-full text-sm">
          <thead className="opacity-70">
            <tr>
              <th className="text-left py-2">Date</th>
              <th className="text-left py-2">User</th>
              <th className="text-left py-2">Method</th>
              <th className="text-right py-2">Amount</th>
              <th className="text-right py-2">Ref</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 dark:divide-white/10">
            {txns.map((t) => (
              <tr key={t.ref}>
                <td className="py-2">{t.date}</td>
                <td className="py-2">{t.user}</td>
                <td className="py-2">{t.method}</td>
                <td className="py-2 text-right">{t.amount}</td>
                <td className="py-2 text-right">{t.ref}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScreenSection>
    </div>
  );
}

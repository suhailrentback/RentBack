import { formatPKR } from "@/lib/demo";

export default function ReceiptCard({
  title, amount, ref, createdAt, lines = [],
}: { title:string; amount:number; ref:string; createdAt:string; lines?: {label:string; value:string}[] }) {
  return (
    <div className="print-card rounded-2xl border p-6 bg-white text-slate-900 max-w-md mx-auto">
      <div className="flex items-center gap-2 font-bold text-emerald-600">
        <Logo /> <span>RentBack</span>
      </div>
      <h2 className="mt-3 text-xl font-semibold">{title}</h2>
      <div className="mt-2 text-2xl font-bold">{formatPKR(amount)}</div>
      <div className="mt-1 text-xs opacity-70">{new Date(createdAt).toLocaleString()}</div>

      <div className="mt-4 space-y-1 text-sm">
        {lines.map((l)=>(
          <div key={l.label} className="flex justify-between">
            <span className="opacity-70">{l.label}</span>
            <span>{l.value}</span>
          </div>
        ))}
        <div className="flex justify-between">
          <span className="opacity-70">Reference</span>
          <span>{ref}</span>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <FakeQR />
        <div className="text-xs opacity-80">
          Raast (demo): Scan to view reference<br/> 
          <span className="italic">Demo: Not a real payment</span>
        </div>
      </div>
    </div>
  );
}

function Logo({ size = 20, stroke = "#059669" }: { size?: number; stroke?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 11.5L12 4l9 7.5" /><path d="M5 10v9h14v-9" />
    </svg>
  );
}
function FakeQR(){
  return <div className="h-16 w-16 bg-[repeating-linear-gradient(45deg,#000_0_2px,#fff_2px_4px)] rounded"/>
}

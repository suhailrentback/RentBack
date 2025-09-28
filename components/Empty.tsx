export default function Empty({ title, hint, cta }: { title:string; hint?:string; cta?:React.ReactNode }) {
  return (
    <div className="text-center py-10 opacity-80">
      <div className="text-base font-semibold">{title}</div>
      {hint && <div className="text-sm mt-1">{hint}</div>}
      {cta && <div className="mt-3">{cta}</div>}
    </div>
  );
}

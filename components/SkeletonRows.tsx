export default function SkeletonRows({ rows=6 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({length:rows}).map((_,i)=>(
        <div key={i} className="skel h-10"></div>
      ))}
    </div>
  );
}

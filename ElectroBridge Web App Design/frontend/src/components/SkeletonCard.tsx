export function SkeletonCard() {
  return (
    <div className="bg-[#1A2438] border border-[#1F2937] rounded-2xl p-5 animate-pulse">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-[#1F2937]" />
        <div className="flex-1">
          <div className="h-4 bg-[#1F2937] rounded w-3/4 mb-2" />
          <div className="h-3 bg-[#1F2937] rounded w-1/2" />
        </div>
      </div>
      <div className="flex gap-2 mb-3">
        <div className="h-5 bg-[#1F2937] rounded-full w-16" />
        <div className="h-5 bg-[#1F2937] rounded-full w-20" />
      </div>
      <div className="flex gap-3 mb-3">
        <div className="h-3 bg-[#1F2937] rounded w-24" />
        <div className="h-3 bg-[#1F2937] rounded w-16" />
      </div>
    </div>
  );
}

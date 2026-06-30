export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[#00E5FF] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-[#94A3B8]">Loading...</p>
      </div>
    </div>
  );
}

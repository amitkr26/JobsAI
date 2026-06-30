import { CheckCircle } from 'lucide-react';

export function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/25 uppercase tracking-widest">
      <CheckCircle size={10} /> Verified
    </span>
  );
}

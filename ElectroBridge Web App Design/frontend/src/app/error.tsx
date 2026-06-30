'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <AlertTriangle size={48} className="text-[#EF4444] mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-white mb-2">Something went wrong</h1>
        <p className="text-[#94A3B8] text-sm mb-6">An unexpected error occurred. Please try again.</p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00E5FF] text-[#0B1120] font-semibold text-sm hover:bg-[#00E5FF]/90 transition-all"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <AlertCircle size={48} className="text-[#1F2937] mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-white mb-2">Page Not Found</h1>
        <p className="text-[#94A3B8] text-sm mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00E5FF] text-[#0B1120] font-semibold text-sm hover:bg-[#00E5FF]/90 transition-all"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

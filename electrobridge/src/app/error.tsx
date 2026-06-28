"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ reset }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <AlertTriangle className="w-12 h-12 text-warning" />
      <h2 className="font-display text-xl font-bold text-text-primary">
        Something went wrong
      </h2>
      <p className="text-text-muted text-sm">
        An error occurred while loading this page.
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 bg-cyan text-navy font-semibold rounded-lg px-4 py-2 text-sm hover:bg-cyan/90 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Try Again
      </button>
    </div>
  );
}

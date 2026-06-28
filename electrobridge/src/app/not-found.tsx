import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <h1 className="font-display text-6xl font-bold text-cyan">404</h1>
      <h2 className="font-display text-xl font-bold text-text-primary">
        Page Not Found
      </h2>
      <p className="text-text-muted text-sm">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-cyan text-navy font-semibold rounded-lg px-4 py-2 text-sm hover:bg-cyan/90 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Go Home
      </Link>
    </div>
  );
}

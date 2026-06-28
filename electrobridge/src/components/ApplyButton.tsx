"use client";

import { ExternalLink } from "lucide-react";

interface ApplyButtonProps {
  applyLink: string;
  opportunityId: string;
}

export default function ApplyButton({ applyLink, opportunityId }: ApplyButtonProps) {
  const handleClick = async () => {
    try {
      await fetch("/api/track-click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ opportunity_id: opportunityId }),
      });
    } catch {
      // Silently fail - don't block the user
    }
    window.open(applyLink, "_blank", "noopener noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 bg-cyan text-navy font-semibold rounded-lg px-6 py-3 hover:bg-cyan/90 transition-colors"
    >
      Apply Now
      <ExternalLink className="w-4 h-4" />
    </button>
  );
}

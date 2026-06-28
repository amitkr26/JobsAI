"use client";

import { useEffect, useState } from "react";
import { getDaysUntilDeadline, isExpired } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface DeadlineCountdownProps {
  deadline: string;
}

export default function DeadlineCountdown({
  deadline,
}: DeadlineCountdownProps) {
  const [days, setDays] = useState(getDaysUntilDeadline(deadline));

  useEffect(() => {
    const timer = setInterval(() => {
      setDays(getDaysUntilDeadline(deadline));
    }, 60000);
    return () => clearInterval(timer);
  }, [deadline]);

  if (isExpired(deadline)) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-800 text-gray-500 text-xs font-medium border border-gray-700">
        Expired
      </span>
    );
  }

  if (days <= 3) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-900/30 text-red-400 text-xs font-medium border border-red-500/30 animate-pulse">
        <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-ping" />
        🔥 Last {days === 0 ? "day" : `${days} days`}!
      </span>
    );
  }

  if (days <= 7) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-900/30 text-orange-400 text-xs font-medium border border-orange-500/30">
        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping" />
        ⚡ Closes in {days} days
      </span>
    );
  }

  return (
    <span className="text-xs font-medium text-text-muted">
      {days === 0
        ? "Due today"
        : days === 1
        ? "1 day left"
        : `${days} days left`}
    </span>
  );
}

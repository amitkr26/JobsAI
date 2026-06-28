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
      <span className="text-red-400 text-xs font-medium">Expired</span>
    );
  }

  const isUrgent = days <= 7;

  return (
    <span
      className={cn(
        "text-xs font-medium",
        isUrgent ? "text-red-400" : "text-text-muted"
      )}
    >
      {days === 0
        ? "Due today"
        : days === 1
        ? "1 day left"
        : `${days} days left`}
    </span>
  );
}

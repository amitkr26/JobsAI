import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getDaysUntilDeadline(deadline: string): number {
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const diff = deadlineDate.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function isExpired(deadline: string): boolean {
  return getDaysUntilDeadline(deadline) < 0;
}

export const CATEGORY_COLORS: Record<string, string> = {
  JRF: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  SRF: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  PhD: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Govt Job": "bg-green-500/20 text-green-400 border-green-500/30",
  "Private Job": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Fellowship: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

export const CATEGORIES = [
  "All",
  "JRF",
  "SRF",
  "PhD",
  "Govt Job",
  "Private Job",
  "Fellowship",
] as const;

export const ELIGIBILITY_OPTIONS = [
  "All",
  "NET",
  "GATE",
  "MSc",
  "BE/BTech",
  "PhD",
] as const;

export const LOCATIONS = [
  "All",
  "Delhi",
  "Bangalore",
  "Mumbai",
  "International",
  "Remote",
] as const;

export const DEADLINE_FILTERS = [
  "All",
  "This Week",
  "This Month",
  "Later",
] as const;

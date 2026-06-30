import { clsx, type ClassValue } from 'clsx';
import { formatDistanceToNow, format, isAfter, isBefore, addDays } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: string | Date, fmt: string = 'MMM d, yyyy'): string {
  return format(new Date(date), fmt);
}

export function getDaysUntilDeadline(deadline: string | null): number | null {
  if (!deadline) return null;
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const diff = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
}

export function isExpired(deadline: string | null): boolean {
  if (!deadline) return false;
  return isAfter(new Date(), new Date(deadline));
}

export function timeAgo(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function isNew(date: string | null, days: number = 7): boolean {
  if (!date) return false;
  return isAfter(new Date(date), addDays(new Date(), -days));
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length).trimEnd() + '…';
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function generateInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'VLSI & ASIC': '#00E5FF',
    'Semiconductor Process': '#3B82F6',
    'Embedded Systems': '#F59E0B',
    'RF & Microwave': '#10B981',
    'Research & PhD': '#8B5CF6',
    'Signal Processing': '#EF4444',
    'AI Hardware': '#00E5FF',
    Fellowships: '#3B82F6',
  };
  return colors[category] || '#94A3B8';
}

export function getStipendNumeric(stipend: string | null): { min: number; max: number } {
  if (!stipend) return { min: 0, max: 0 };
  const numbers = stipend.match(/\d+/g);
  if (!numbers) return { min: 0, max: 0 };
  if (numbers.length === 1) return { min: parseInt(numbers[0]), max: parseInt(numbers[0]) };
  return { min: parseInt(numbers[0]), max: parseInt(numbers[1]) };
}

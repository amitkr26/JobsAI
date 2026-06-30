import { api } from '@/lib/api';

export interface NewsData {
  id: number;
  source: string;
  sourceColor: string;
  time: string;
  headline: string;
  summary: string;
  tags: string[];
  category: string;
}

const SOURCE_COLORS: Record<string, string> = {
  'IEEE Spectrum': '#00E5FF',
  'EE Times': '#3B82F6',
  'Semiconductor Today': '#10B981',
  'Digit India': '#F59E0B',
  'EDN Network': '#8B5CF6',
  'Electronic Design': '#EF4444',
  default: '#00E5FF',
};

export async function getNews(params?: Record<string, string>): Promise<NewsData[]> {
  const res = await api.news.list(params);
  return (res.data || []).map((n: any) => ({
    id: n.id || parseInt(n.slug || '0'),
    source: n.source || 'Unknown',
    sourceColor: SOURCE_COLORS[n.source] || SOURCE_COLORS.default,
    time: n.published_at ? timeAgo(new Date(n.published_at)) : 'Recently',
    headline: n.title,
    summary: n.summary || '',
    tags: n.tags || [],
    category: n.category || 'Semiconductor',
  }));
}

export async function getNewsArticle(slug: string): Promise<NewsData | null> {
  const res = await api.news.get(slug);
  const n = res.data;
  if (!n) return null;
  return {
    id: n.id || parseInt(n.slug || '0'),
    source: n.source || 'Unknown',
    sourceColor: SOURCE_COLORS[n.source] || SOURCE_COLORS.default,
    time: n.published_at ? timeAgo(new Date(n.published_at)) : 'Recently',
    headline: n.title,
    summary: n.summary || '',
    tags: n.tags || [],
    category: n.category || 'Semiconductor',
  };
}

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

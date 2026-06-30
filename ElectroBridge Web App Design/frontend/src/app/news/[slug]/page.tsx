'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { ChevronRight, ExternalLink, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getNewsArticle, NewsData } from '@/data/news';

export default function NewsDetailPage() {
  const [article, setArticle] = useState<NewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const slug = (params.slug as string) || '';

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getNewsArticle(slug);
        if (!data) return;
        setArticle(data);
      } catch {
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex items-center justify-center">
        <RefreshCw size={32} className="text-[#00E5FF] animate-spin mx-auto mb-3" />
        <p className="text-[#94A3B8] text-sm">Loading article...</p>
      </div>
    );
  }

  if (!article) notFound();

  return (
    <div className="min-h-screen bg-[#0B1120]">
      <div className="max-w-[800px] mx-auto px-4 py-10">
        <Link href="/news" className="inline-flex items-center gap-1.5 text-sm text-[#94A3B8] hover:text-white mb-6 transition-colors">
          <ChevronRight size={14} className="rotate-180" /> Back to News
        </Link>

        <article>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full shrink-0" style={{ background: article.sourceColor }} />
            <span className="text-sm font-semibold" style={{ color: article.sourceColor }}>{article.source}</span>
            <span className="text-xs text-[#94A3B8]">{article.time}</span>
            <Badge variant="gray" size="xs">{article.category}</Badge>
          </div>

          <h1 className="text-3xl font-bold text-white mb-4 leading-tight">{article.headline}</h1>
          <p className="text-lg text-[#94A3B8] leading-relaxed mb-8">{article.summary}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {article.tags.map((t) => (
              <Badge key={t} variant="default" size="sm">#{t}</Badge>
            ))}
          </div>

          <a
            href="#"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1A2438] border border-[#1F2937] text-sm text-white hover:border-[#00E5FF]/30 transition-colors"
          >
            <ExternalLink size={14} /> Read full article on {article.source}
          </a>
        </article>
      </div>
    </div>
  );
}
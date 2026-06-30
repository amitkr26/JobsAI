'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ExternalLink, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getNews, NewsData } from '@/data/news';

const tabs = ['All', 'Semiconductor', 'VLSI', 'AI Chips', 'Research', 'India', 'Industry', 'Jobs'];

export default function NewsPage() {
  const [active, setActive] = useState('All');
  const [newsItems, setNewsItems] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getNews();
        setNewsItems(data);
      } catch {
        setNewsItems([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = active === 'All' ? newsItems : newsItems.filter((n) => n.category === active || n.tags.includes(active));

  return (
    <div className="min-h-screen bg-[#0B1120]">
      <div className="max-w-[1100px] mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-1">Semiconductor & Electronics News</h1>
          <p className="text-[#94A3B8] text-sm">Curated from IEEE Spectrum, EE Times, Semiconductor Today, and more</p>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                active === tab
                  ? 'bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/25'
                  : 'text-[#94A3B8] border border-[#1F2937] hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <RefreshCw size={32} className="text-[#00E5FF] animate-spin mx-auto mb-3" />
            <p className="text-[#94A3B8] text-sm">Loading news...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#94A3B8] text-sm">No news articles found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((n) => (
              <Link
                key={n.id}
                href={`/news/${n.id}`}
                className="block bg-[#1A2438] border border-[#1F2937] rounded-2xl p-6 hover:border-[#00E5FF]/20 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
              >
                <div className="flex items-start gap-3">
                  <div className="w-2.5 h-2.5 rounded-full mt-2 shrink-0" style={{ background: n.sourceColor }} />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-semibold" style={{ color: n.sourceColor }}>{n.source}</span>
                      <span className="text-xs text-[#94A3B8]">{n.time}</span>
                      <Badge variant="gray" size="xs">{n.category}</Badge>
                    </div>
                    <h3 className="text-base font-semibold text-white mb-2 leading-snug">{n.headline}</h3>
                    <p className="text-sm text-[#94A3B8] leading-relaxed mb-3">{n.summary}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {n.tags.map((t) => (
                        <Badge key={t} variant="default" size="xs">#{t}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <ExternalLink size={14} className="text-[#94A3B8] shrink-0 mt-1" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
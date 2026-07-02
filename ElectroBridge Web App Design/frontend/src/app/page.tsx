'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getOpportunities } from '@/data/opportunities';
import { getNews } from '@/data/news';
import { LandingHero } from '@/components/LandingHero';
import { OpportunityCard } from '@/components/OpportunityCard';

export default function HomePage() {
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [oppCount, setOppCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [opps, news, allOpps] = await Promise.all([
          getOpportunities({ is_featured: 'true' }),
          getNews(),
          getOpportunities(),
        ]);
        setOpportunities(opps);
        setNewsItems(news);
        setOppCount(allOpps.length);
      } catch {
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B1120]">
      <LandingHero />

      {/* Stats Strip */}
      <section className="py-8 px-4 border-y border-[#1F2937] bg-[#111827]/50">
        <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-3xl font-extrabold text-[#00E5FF]">{oppCount}+</p>
            <p className="text-xs text-[#94A3B8] mt-1">Verified Opportunities</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-extrabold text-[#00E5FF]">{newsItems.length}+</p>
            <p className="text-xs text-[#94A3B8] mt-1">News Articles</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-extrabold text-[#00E5FF]">
              {[...new Set(opportunities.map((o) => o.org))].length}
            </p>
            <p className="text-xs text-[#94A3B8] mt-1">Organizations</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-extrabold text-[#00E5FF]">Groq AI</p>
            <p className="text-xs text-[#94A3B8] mt-1">AI Engine</p>
          </div>
        </div>
      </section>

      {/* Featured Opportunities */}
      <section className="py-16 px-4 bg-[#111827]/30">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Featured Opportunities</h2>
              <p className="text-[#94A3B8] text-sm mt-1">Handpicked, verified, and expiring soon</p>
            </div>
            <Link href="/opportunities" className="text-sm text-[#00E5FF] hover:text-[#00E5FF]/80 flex items-center gap-1">
              View all <ChevronRight size={14} />
            </Link>
          </div>
          {loading ? (
            <div className="text-center py-12 text-[#94A3B8]">Loading opportunities...</div>
          ) : opportunities.length === 0 ? (
            <div className="text-center py-12 text-[#94A3B8]">No featured opportunities available. Check back soon.</div>
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              {opportunities.slice(0, 3).map((opp) => (
                <OpportunityCard key={opp.id} opp={opp} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* News */}
      <section className="py-16 px-4">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Latest Semiconductor News</h2>
              <p className="text-[#94A3B8] text-sm mt-1">Curated from trusted industry sources</p>
            </div>
            <Link href="/news" className="text-sm text-[#00E5FF] flex items-center gap-1">
              All news <ChevronRight size={14} />
            </Link>
          </div>
          {loading ? (
            <div className="text-center py-12 text-[#94A3B8]">Loading news...</div>
          ) : newsItems.length === 0 ? (
            <div className="text-center py-12 text-[#94A3B8]">No news articles available. Check back soon.</div>
          ) : (
            <div className="space-y-3">
              {newsItems.slice(0, 3).map((n) => (
                <Link
                  key={n.id}
                  href={`/news/detail?slug=${n.slug}`}
                  className="block bg-[#1A2438] border border-[#1F2937] rounded-xl p-4 hover:border-[#00E5FF]/20 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: n.sourceColor }} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium" style={{ color: n.sourceColor }}>{n.source}</span>
                        <span className="text-xs text-[#94A3B8]">{n.time}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-white mb-1">{n.headline}</h4>
                      <p className="text-xs text-[#94A3B8] leading-relaxed">{n.summary}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* AI CTA */}
      <section className="py-16 px-4">
        <div className="max-w-[1100px] mx-auto">
          <div className="relative bg-[#111827] border border-[#00E5FF]/20 rounded-3xl p-10 overflow-hidden text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/5 via-transparent to-[#3B82F6]/5 pointer-events-none" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-[#00E5FF]/10 border border-[#00E5FF]/25 flex items-center justify-center mx-auto mb-5">
                <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#00E5FF" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" /><path d="M12 7v4" /></svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">AI-Powered Career Guidance</h2>
              <p className="text-[#94A3B8] max-w-xl mx-auto text-sm leading-relaxed mb-7">
                Get personalized opportunity matching, resume scoring, skill gap analysis, and complete career roadmaps — powered by advanced AI trained on semiconductor industry data.
              </p>
              <Link
                href="/chat"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#00E5FF] text-[#0B1120] font-semibold text-sm hover:bg-[#00E5FF]/90 transition-all shadow-[0_0_32px_rgba(0,229,255,0.2)]"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3a6 6 0 016 6v4a2 2 0 01-2 2H8a2 2 0 01-2-2V9a6 6 0 016-6z" /><path d="M8 15v2a4 4 0 008 0v-2" /></svg>
                Try AI Assistant
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
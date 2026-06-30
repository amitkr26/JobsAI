'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getOpportunities } from '@/data/opportunities';
import { getNews } from '@/data/news';
import { LandingHero } from '@/components/LandingHero';
import { OpportunityCard } from '@/components/OpportunityCard';

const stats = [
  { val: '4,200+', label: 'Verified Opportunities' },
  { val: '98%', label: 'Accuracy Rate' },
  { val: '1.2L+', label: 'Active Users' },
  { val: '340+', label: 'Partner Orgs' },
];

const categories = [
  { icon: 'Cpu', label: 'VLSI & ASIC', count: 142, color: '#00E5FF' },
  { icon: 'CircuitBoard', label: 'Semiconductor Process', count: 89, color: '#3B82F6' },
  { icon: 'Zap', label: 'Embedded Systems', count: 213, color: '#F59E0B' },
  { icon: 'Radio', label: 'RF & Microwave', count: 67, color: '#10B981' },
  { icon: 'FlaskConical', label: 'Research & PhD', count: 54, color: '#8B5CF6' },
  { icon: 'BarChart3', label: 'Signal Processing', count: 98, color: '#EF4444' },
  { icon: 'Bot', label: 'AI Hardware', count: 76, color: '#00E5FF' },
  { icon: 'GraduationCap', label: 'Fellowships', count: 45, color: '#3B82F6' },
];

const testimonials = [
  { name: 'Rohan Verma', role: 'VLSI Engineer @ Qualcomm', text: 'ElectroBridge\'s AI matched me to an internship I\'d never have found on my own. The verification system saved me from applying to fake listings.', avatar: 'RV' },
  { name: 'Ananya Iyer', role: 'PhD Scholar @ IISc', text: 'The best resource for semiconductor research opportunities in India. The AI insights are genuinely helpful for PhD applications.', avatar: 'AI' },
  { name: 'Karthik Sundaram', role: 'Embedded Engineer @ DRDO', text: 'Found my current role through ElectroBridge. The deadline tracking and AI resume review were game-changers.', avatar: 'KS' },
];

const iconMap: Record<string, React.ReactNode> = {
  Cpu: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M20 9h3M1 15h3M20 15h3" /></svg>,
  CircuitBoard: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M11 9h4a2 2 0 012 2v2M7 15h4a2 2 0 002-2v-2" /></svg>,
  Zap: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  Radio: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.9 16.1C1 12.2 1 5.8 4.9 1.9" /><path d="M7.8 13.2c-2.3-2.3-2.3-6.1 0-8.5" /><circle cx="12" cy="12" r="2" /><path d="M16.2 11.2c2.3 2.3 2.3 6.1 0 8.5" /><path d="M19.1 14.1c3.9-3.9 3.9-10.3 0-14.2" /></svg>,
  FlaskConical: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 2v7.527a2 2 0 01-.211.896L4.72 20.55a1 1 0 00.9 1.45h12.76a1 1 0 00.9-1.45l-5.069-10.127A2 2 0 0114 9.527V2" /><path d="M8.5 2h7" /><path d="M7 16h10" /></svg>,
  BarChart3: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 20h18" /><path d="M3 20V4" /><path d="M7 20V10" /><path d="M11 20V7" /><path d="M15 20v-5" /><path d="M19 20V3" /></svg>,
  Bot: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" /><path d="M12 7v4" /><line x1="8" y1="16" x2="8" y2="16" /><line x1="16" y1="16" x2="16" y2="16" /></svg>,
  GraduationCap: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>,
};

export default function HomePage() {
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [opps, news] = await Promise.all([
          getOpportunities({ is_featured: 'true' }),
          getNews(),
        ]);
        setOpportunities(opps);
        setNewsItems(news);
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
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-extrabold text-[#00E5FF]">{s.val}</p>
              <p className="text-xs text-[#94A3B8] mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-2xl font-bold text-white mb-2">Browse by Category</h2>
          <p className="text-[#94A3B8] text-sm mb-8">Find opportunities tailored to your specialization</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                href={`/opportunities?category=${encodeURIComponent(cat.label)}`}
                className="group bg-[#1A2438] border border-[#1F2937] rounded-2xl p-5 text-left hover:border-[#00E5FF]/30 hover:shadow-[0_0_20px_rgba(0,229,255,0.06)] transition-all duration-200"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: cat.color + '18', border: `1.5px solid ${cat.color}30` }}
                >
                  <span style={{ color: cat.color }}>{iconMap[cat.icon]}</span>
                </div>
                <p className="font-semibold text-white text-sm">{cat.label}</p>
                <p className="text-xs text-[#94A3B8] mt-0.5">{cat.count} openings</p>
              </Link>
            ))}
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
                  href={`/news/${n.id}`}
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

      {/* Testimonials */}
      <section className="py-16 px-4 bg-[#111827]/30">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-2">Trusted by Electronics Professionals</h2>
          <p className="text-[#94A3B8] text-sm text-center mb-10">What our community says</p>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-[#1A2438] border border-[#1F2937] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex items-center justify-center text-[#00E5FF] text-xs font-bold">{t.avatar}</div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-[#94A3B8]">{t.role}</p>
                  </div>
                </div>
                <p className="text-sm text-[#94A3B8] leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex gap-0.5 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" width="12" height="12" fill="#F59E0B" stroke="#F59E0B"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
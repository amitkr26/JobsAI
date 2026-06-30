'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import {
  ChevronRight, MapPin, Zap, Clock, ExternalLink, Bookmark, Share2,
  Flag, Bot, CheckCircle, Award, ThumbsUp, MessageCircle, RefreshCw,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AvatarCircle } from '@/components/AvatarCircle';
import { VerifiedBadge } from '@/components/VerifiedBadge';
import { getOpportunities, getOpportunity, OpportunityData } from '@/data/opportunities';

export default function OpportunityDetailPage() {
  const [saved, setSaved] = useState(false);
  const [opp, setOpp] = useState<OpportunityData | null>(null);
  const [related, setRelated] = useState<OpportunityData[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const slug = (params.slug as string) || '';

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [current, all] = await Promise.all([
          getOpportunity(slug),
          getOpportunities(),
        ]);
        if (!current) return;
        setOpp(current);
        setRelated(all.filter((o) => o.id !== current.id).slice(0, 3));
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
        <div className="text-center">
          <RefreshCw size={32} className="text-[#00E5FF] animate-spin mx-auto mb-3" />
          <p className="text-[#94A3B8] text-sm">Loading opportunity...</p>
        </div>
      </div>
    );
  }

  if (!opp) notFound();

  const daysLeft = Math.max(0, Math.ceil((new Date(opp.deadline).getTime() - Date.now()) / 86400000));

  return (
    <div className="min-h-screen bg-[#0B1120]">
      <div className="max-w-[1440px] mx-auto px-4 py-8">
        <Link href="/opportunities" className="inline-flex items-center gap-1.5 text-sm text-[#94A3B8] hover:text-white mb-6 transition-colors">
          <ChevronRight size={14} className="rotate-180" /> Back to Opportunities
        </Link>

        <div className="flex flex-col lg:flex-row gap-7">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="bg-[#1A2438] border border-[#1F2937] rounded-2xl p-7 mb-5">
              <div className="flex items-start gap-4 mb-5">
                <AvatarCircle initials={opp.logo} color={opp.color} />
                <div>
                  <h1 className="text-2xl font-bold text-white mb-1">{opp.title}</h1>
                  <p className="text-[#94A3B8]">{opp.org}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    {opp.verified && <VerifiedBadge />}
                    <Badge variant="default">{opp.type}</Badge>
                    <Badge variant="gray">{opp.degree}</Badge>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-5 text-sm text-[#94A3B8] pb-5 border-b border-[#1F2937]">
                <span className="flex items-center gap-1.5"><MapPin size={13} className="text-[#00E5FF]" />{opp.location}</span>
                <span className="flex items-center gap-1.5"><Zap size={13} className="text-[#00E5FF]" />{opp.stipend}</span>
                <span className="flex items-center gap-1.5"><Clock size={13} className="text-[#F59E0B]" /> Deadline: {opp.deadline} ({daysLeft} days)</span>
              </div>

              {opp.description && (
                <div className="mt-5">
                  <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <div className="w-1.5 h-4 rounded-full bg-[#00E5FF]" /> Description
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">{opp.description}</p>
                </div>
              )}

              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-[#94A3B8]">Deadline in</p>
                  <p className="text-xs text-[#F59E0B] font-semibold">{daysLeft} days</p>
                </div>
                <div className="h-1.5 bg-[#1F2937] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#F59E0B] to-[#EF4444] rounded-full" style={{ width: `${Math.max(5, (1 - daysLeft / 90) * 100)}%` }} />
                </div>
              </div>
            </div>

            {opp.tags.length > 0 && (
              <div className="bg-[#1A2438] border border-[#1F2937] rounded-2xl p-6 mb-4">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-4 rounded-full bg-[#00E5FF]" /> Skills & Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {opp.tags.map((tag: string) => (
                    <Badge key={tag} variant="gray">{tag}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right panel */}
          <div className="lg:w-80 shrink-0">
            <div className="sticky top-20 space-y-4">
              <div className="bg-[#1A2438] border border-[#1F2937] rounded-2xl p-5">
                <a href="#" className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#00E5FF] text-[#0B1120] font-semibold text-sm hover:bg-[#00E5FF]/90 transition-all shadow-[0_0_24px_rgba(0,229,255,0.2)] mb-3">
                  <ExternalLink size={15} /> Apply Now
                </a>
                <div className="flex gap-2">
                  <button onClick={() => setSaved(!saved)} className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-sm font-medium transition-colors ${saved ? 'bg-[#00E5FF]/10 border-[#00E5FF]/25 text-[#00E5FF]' : 'border-[#1F2937] text-[#94A3B8] hover:text-white'}`}>
                    <Bookmark size={14} fill={saved ? 'currentColor' : 'none'} /> {saved ? 'Saved' : 'Save'}
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-[#1F2937] text-sm font-medium text-[#94A3B8] hover:text-white transition-colors">
                    <Share2 size={14} /> Share
                  </button>
                </div>
                <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs text-[#94A3B8] hover:text-[#EF4444] transition-colors mt-2">
                  <Flag size={12} /> Report Issue
                </button>
              </div>

              {/* Related */}
              {related.length > 0 && (
                <div className="bg-[#1A2438] border border-[#1F2937] rounded-2xl p-5">
                  <h4 className="text-sm font-semibold text-white mb-3">Related Opportunities</h4>
                  <div className="space-y-3">
                    {related.map((o) => (
                      <Link key={o.id} href={`/opportunities/${o.id}`} className="flex items-start gap-2 group">
                        <AvatarCircle initials={o.logo} color={o.color} />
                        <div>
                          <p className="text-xs font-semibold text-white group-hover:text-[#00E5FF] transition-colors leading-snug">{o.title}</p>
                          <p className="text-[10px] text-[#94A3B8] mt-0.5">{o.daysLeft}d left · {o.stipend}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
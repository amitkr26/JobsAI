'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bookmark, Share2, MapPin, Zap, Clock, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AvatarCircle } from '@/components/AvatarCircle';
import { VerifiedBadge } from '@/components/VerifiedBadge';
import type { OpportunityData } from '@/data/opportunities';

interface OpportunityCardProps {
  opp: OpportunityData;
}

export function OpportunityCard({ opp }: OpportunityCardProps) {
  const [saved, setSaved] = useState(opp.saved);

  return (
    <Link
      href={`/opportunities/${opp.id}`}
      className="group bg-[#1A2438] border border-[#1F2937] rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:border-[#00E5FF]/30 hover:shadow-[0_0_24px_rgba(0,229,255,0.08)] hover:-translate-y-0.5 relative overflow-hidden block"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00E5FF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex items-start gap-3 mb-3">
        <AvatarCircle initials={opp.logo} color={opp.color} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-white text-[15px] leading-tight line-clamp-2">{opp.title}</h3>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={(e) => { e.preventDefault(); setSaved(!saved); }}
                className={`p-1.5 rounded-lg transition-colors ${saved ? 'text-[#00E5FF]' : 'text-[#94A3B8] hover:text-white'}`}
              >
                <Bookmark size={14} fill={saved ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={(e) => e.preventDefault()}
                className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white transition-colors"
              >
                <Share2 size={14} />
              </button>
            </div>
          </div>
          <p className="text-sm text-[#94A3B8] mt-0.5">{opp.org}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {opp.verified && <VerifiedBadge />}
        <Badge variant="gray">{opp.type}</Badge>
        <Badge variant="gray">{opp.degree}</Badge>
      </div>
      <div className="flex flex-wrap gap-3 text-xs text-[#94A3B8] mb-3">
        <span className="flex items-center gap-1"><MapPin size={11} />{opp.location}</span>
        <span className="flex items-center gap-1"><Zap size={11} className="text-[#00E5FF]" />{opp.stipend}</span>
        <span className="flex items-center gap-1">
          <Clock size={11} className={opp.daysLeft < 30 ? 'text-[#F59E0B]' : 'text-[#94A3B8]'} />
          {opp.daysLeft}d left
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {opp.tags.slice(0, 3).map((t) => (
          <Badge key={t} variant="default" size="xs">{t}</Badge>
        ))}
        {opp.tags.length > 3 && (
          <Badge variant="gray" size="xs">+{opp.tags.length - 3}</Badge>
        )}
      </div>
    </Link>
  );
}

'use client';

import { Award, Edit3, ThumbsUp, MessageCircle, Share2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const posts = [
  {
    id: 1, author: 'Priya Krishnamurthy', role: 'PhD Candidate, IISc', avatar: 'PK', time: '3h ago',
    title: 'My journey from B.Tech ECE to a spintronics PhD at TIFR — AMA',
    body: 'After 2 years of failed gate attempts and one industry job, I finally cracked the TIFR interview. Happy to share my preparation strategy, interview tips, and what a day in the nano-fab lab actually looks like.',
    upvotes: 247, comments: 83, tags: ['PhD', 'TIFR', 'Spintronics', 'Career'],
  },
  {
    id: 2, author: 'Arjun Mehta', role: 'VLSI Engineer, Qualcomm', avatar: 'AM', time: '6h ago',
    title: 'RTL coding style that got me through Qualcomm\'s design interview',
    body: 'Sharing the exact coding patterns, FSM templates, and synthesis-aware Verilog tricks that I practiced for 3 months before the interview. PDF + code repo attached.',
    upvotes: 189, comments: 61, tags: ['VLSI', 'Qualcomm', 'RTL', 'Interview'],
  },
  {
    id: 3, author: 'Sneha Agarwal', role: 'M.Tech Student, IIT Delhi', avatar: 'SA', time: '1d ago',
    title: 'Comparison of GATE vs JEST vs BARC for semiconductor research aspirants',
    body: 'I appeared for all three this year. Here\'s my honest take on syllabus overlap, cutoff trends, and which exam actually matters more for different research lab pathways.',
    upvotes: 312, comments: 104, tags: ['GATE', 'JEST', 'Research', 'Strategy'],
  },
];

const contributors = [
  { name: 'Rohan Mehta', posts: 142, rep: 2400, avatar: 'RM' },
  { name: 'Divya Nair', posts: 98, rep: 1870, avatar: 'DN' },
  { name: 'Ashwin Kumar', posts: 87, rep: 1650, avatar: 'AK' },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-[#0B1120]">
      <div className="max-w-[1440px] mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6">
        <main className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">Community</h1>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00E5FF] text-[#0B1120] text-sm font-semibold hover:bg-[#00E5FF]/90 transition-colors">
              <Edit3 size={13} /> New Post
            </button>
          </div>

          <div className="flex gap-1.5 mb-5 overflow-x-auto pb-1">
            {['Trending', 'Latest', 'Top Discussions', 'Q&A', 'Showcase'].map((t, i) => (
              <button
                key={t}
                className={`shrink-0 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-colors ${
                  i === 0
                    ? 'bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/25'
                    : 'text-[#94A3B8] border border-[#1F2937] hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-[#1A2438] border border-[#1F2937] rounded-2xl p-5 hover:border-[#00E5FF]/20 cursor-pointer transition-all duration-200">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex items-center justify-center text-[#00E5FF] text-xs font-bold shrink-0">
                    {post.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-white">{post.author}</p>
                      <span className="text-xs text-[#94A3B8]">·</span>
                      <p className="text-xs text-[#94A3B8]">{post.role}</p>
                      <span className="ml-auto text-xs text-[#94A3B8]">{post.time}</span>
                    </div>
                    <h3 className="font-semibold text-white text-sm mb-2">{post.title}</h3>
                    <p className="text-sm text-[#94A3B8] line-clamp-2 mb-3">{post.body}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {post.tags.map((t) => <Badge key={t} variant="default" size="xs">#{t}</Badge>)}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-[#94A3B8]">
                      <button className="flex items-center gap-1 hover:text-[#00E5FF] transition-colors"><ThumbsUp size={12} />{post.upvotes}</button>
                      <button className="flex items-center gap-1 hover:text-[#00E5FF] transition-colors"><MessageCircle size={12} />{post.comments}</button>
                      <button className="flex items-center gap-1 hover:text-[#00E5FF] transition-colors"><Share2 size={12} />Share</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        <aside className="lg:w-64 shrink-0 space-y-5">
          <div className="bg-[#1A2438] border border-[#1F2937] rounded-2xl p-5">
            <h3 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
              <Award size={13} className="text-[#F59E0B]" /> Top Contributors
            </h3>
            <div className="space-y-3">
              {contributors.map((c, i) => (
                <div key={c.name} className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#94A3B8] w-4">{i + 1}</span>
                  <div className="w-8 h-8 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex items-center justify-center text-[#00E5FF] text-xs font-bold">{c.avatar}</div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-white">{c.name}</p>
                    <p className="text-[10px] text-[#94A3B8]">{c.rep} rep · {c.posts} posts</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1A2438] border border-[#1F2937] rounded-2xl p-5">
            <h3 className="font-semibold text-white text-sm mb-3">Trending Tags</h3>
            <div className="flex flex-wrap gap-1.5">
              {['#VLSI', '#GATE2026', '#IISc', '#InternshipHunt', '#ISRO', '#Spintronics', '#EmbeddedSys', '#AI-Chips'].map((t) => (
                <Badge key={t} variant="default" size="xs">{t}</Badge>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

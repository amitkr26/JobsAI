import Link from 'next/link';
import { Search, Sparkles, ArrowRight, CircuitBoard } from 'lucide-react';

export function LandingHero() {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#00E5FF]/5 rounded-full blur-[120px]" />
        <div className="absolute top-40 left-1/4 w-[300px] h-[300px] bg-[#3B82F6]/8 rounded-full blur-[80px]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00E5FF" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-[1100px] mx-auto text-center">
        <div className="flex justify-center mb-8">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-2xl bg-[#00E5FF]/10 border border-[#00E5FF]/25 animate-pulse" />
            <div className="absolute inset-3 rounded-xl bg-[#111827] border border-[#1F2937] flex items-center justify-center">
              <CircuitBoard size={32} className="text-[#00E5FF]" />
            </div>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="absolute w-8 h-px bg-gradient-to-r from-[#00E5FF]/60 to-transparent"
                style={{
                  top: `${25 + i * 17}%`,
                  left: i % 2 === 0 ? '-2rem' : 'auto',
                  right: i % 2 !== 0 ? '-2rem' : 'auto',
                  transform: i % 2 !== 0 ? 'rotate(180deg)' : undefined,
                }}
              />
            ))}
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-[#00E5FF] text-xs font-medium mb-6">
          <Sparkles size={12} /> AI-Powered Career Intelligence for Electronics & Semiconductors
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-6">
          Discover Your Path in<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#3B82F6]">
            Semiconductors & Electronics
          </span>
        </h1>

        <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto mb-10 leading-relaxed">
          Verified internships, research fellowships, PhD scholarships, and industry roles — curated
          for electronics engineers and semiconductor professionals. AI-matched to your skills.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <Link
            href="/opportunities"
            className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#00E5FF] text-[#0B1120] font-semibold text-sm hover:bg-[#00E5FF]/90 transition-all duration-150 shadow-[0_0_32px_rgba(0,229,255,0.25)]"
          >
            Explore Opportunities <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/chat"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-[#1F2937] bg-[#111827] text-white font-semibold text-sm hover:border-[#00E5FF]/30 transition-colors"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#00E5FF" strokeWidth="2">
              <rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" /><path d="M12 7v4" />
            </svg>
            Ask AI
          </Link>
        </div>

        <div className="max-w-2xl mx-auto relative">
          <div className="flex items-center gap-3 px-4 py-3.5 bg-[#111827] border border-[#1F2937] rounded-2xl focus-within:border-[#00E5FF]/40 transition-colors">
            <Search size={18} className="text-[#94A3B8] shrink-0" />
            <input
              placeholder="Search by role, organization, skill, or location…"
              className="flex-1 bg-transparent text-white placeholder:text-[#94A3B8] text-sm outline-none"
            />
            <Link
              href="/opportunities"
              className="px-4 py-2 rounded-xl bg-[#00E5FF] text-[#0B1120] text-sm font-semibold hover:bg-[#00E5FF]/90 transition-colors"
            >
              Search
            </Link>
          </div>
          <p className="text-xs text-[#94A3B8] mt-2">
            Popular: VLSI Internship · PhD Spintronics · Embedded Systems Pune · GATE research
          </p>
        </div>
      </div>
    </section>
  );
}

import { CircuitBoard, Target, Shield, Users, Sparkles } from 'lucide-react';

const values = [
  { icon: <Target size={18} />, label: 'Precision', desc: 'Every opportunity is verified, categorized, and enriched with AI to ensure you never waste time on dead leads.' },
  { icon: <Shield size={18} />, label: 'Trust', desc: 'We actively verify listings, check links, and flag expired posts so you can apply with confidence.' },
  { icon: <Users size={18} />, label: 'Community', desc: 'A thriving network of electronics professionals sharing insights, interview prep, and career guidance.' },
  { icon: <Sparkles size={18} />, label: 'Innovation', desc: 'AI-powered matching, resume scoring, and personalized career roadmaps built for semiconductor professionals.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0B1120]">
      <div className="max-w-[1100px] mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="w-14 h-14 rounded-2xl bg-[#00E5FF]/10 border border-[#00E5FF]/25 flex items-center justify-center mx-auto mb-5">
            <CircuitBoard size={24} className="text-[#00E5FF]" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">About ElectroBridge</h1>
          <p className="text-[#94A3B8] max-w-2xl mx-auto text-sm leading-relaxed">
            We are on a mission to become the definitive career platform for India&apos;s electronics and semiconductor engineering community — bridging the gap between talent and opportunity in the world&apos;s fastest-growing chip ecosystem.
          </p>
        </div>

        <section className="grid md:grid-cols-4 gap-4 mb-20">
          {values.map((v) => (
            <div key={v.label} className="bg-[#1A2438] border border-[#1F2937] rounded-2xl p-6 text-center">
              <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex items-center justify-center text-[#00E5FF] mx-auto mb-3">
                {v.icon}
              </div>
              <h3 className="font-semibold text-white text-sm mb-2">{v.label}</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-2">Our Story</h2>
          <p className="text-[#94A3B8] text-sm text-center mb-8 max-w-xl mx-auto">Bridging talent and opportunity</p>
          <div className="bg-[#1A2438] border border-[#1F2937] rounded-2xl p-8">
            <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
              ElectroBridge was built to solve a simple problem: great opportunities in India&apos;s electronics and semiconductor sectors are scattered across hundreds of websites, PDFs, and circulars. Students and professionals spend more time hunting for openings than preparing for them.
            </p>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              We aggregate verified research fellowships, PhD positions, internships, and engineering roles from ISRO, DRDO, CSIR, IITs, IISc, TIFR, and industry — all in one place. Every listing is verified, AI-enriched, and kept current.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
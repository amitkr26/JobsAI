'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Bot, Plus, Search, FileText, TrendingUp, BarChart3, Send,
} from 'lucide-react';

const features = [
  { icon: <Search size={16} />, label: 'Opportunity Matching', color: '#00E5FF' },
  { icon: <FileText size={16} />, label: 'Resume Scoring', color: '#3B82F6' },
  { icon: <TrendingUp size={16} />, label: 'Skill Gap Analysis', color: '#10B981' },
  { icon: <BarChart3 size={16} />, label: 'Career Roadmap', color: '#F59E0B' },
];

const suggestions = [
  'Best VLSI jobs for freshers 2025',
  'PhD opportunities in spintronics',
  'Review my resume for ISRO application',
  'Career roadmap: B.Tech ECE to chip architect',
];

const CHAT_HISTORY_INITIAL = [
  { role: 'user' as const, text: 'What are the best VLSI internships for final year B.Tech students in 2025?' },
  {
    role: 'ai' as const,
    text: 'Great question! For final-year B.Tech students in 2025, here are the **top VLSI internship opportunities**:\n\n**1. ISRO VSSC/ISAC Internship** — ₹35k/mo stipend, work on satellite ASIC design. Deadline: Aug 15.\n\n**2. Intel India R&D** — AI chip architecture, ₹60k/mo. Requires strong SystemVerilog.\n\n**3. Qualcomm University Program** — Bangalore/Hyderabad. Competitive, strong PPO chance.\n\n**4. IISc Nano-fabrication Lab** — Excellent for those interested in process engineering over design.\n\nI also notice your profile shows proficiency in Cadence Virtuoso. I\'d recommend **applying to ISRO and IISc first** as they weight that tool heavily. Want me to draft a cover letter for ISRO?',
  },
];

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(CHAT_HISTORY_INITIAL);
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { role: 'user' as const, text: input }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: 'ai' as const,
          text: 'I found **12 matching opportunities** based on your query. The top picks are ISRO VSSC VLSI internship (deadline Aug 15, ₹35k/mo) and IISc nano-fab fellowship (deadline Jul 30, ₹42k/mo). Would you like me to analyze your profile fit for either of these?',
        },
      ]);
      setTyping(false);
    }, 1800);
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  return (
    <div className="min-h-screen bg-[#0B1120] flex">
      {/* Left sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-[#1F2937] bg-[#111827]">
        <div className="p-4 border-b border-[#1F2937]">
          <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-[#00E5FF] text-sm font-medium hover:bg-[#00E5FF]/15 transition-colors">
            <Plus size={14} /> New Chat
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider px-2 mb-2">Recent</p>
          {['VLSI jobs for freshers', 'PhD spintronics TIFR', 'Embedded systems Pune', 'Resume review ISRO'].map((h) => (
            <button key={h} className="w-full text-left px-3 py-2.5 rounded-xl text-sm text-[#94A3B8] hover:bg-[#1A2438] hover:text-white transition-colors truncate">
              {h}
            </button>
          ))}
        </div>
        <div className="p-3 border-t border-[#1F2937]">
          <div className="flex flex-wrap gap-1.5">
            {features.map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-medium"
                style={{ background: f.color + '15', color: f.color }}
              >
                {f.icon} {f.label}
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Chat area */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="px-6 py-4 border-b border-[#1F2937] flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex items-center justify-center">
            <Bot size={16} className="text-[#00E5FF]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">ElectroBridge AI</p>
            <p className="text-xs text-[#10B981] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] inline-block" />
              Online · Semiconductor specialist
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {m.role === 'ai' && (
                <div className="w-8 h-8 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot size={14} className="text-[#00E5FF]" />
                </div>
              )}
              <div
                className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-[#00E5FF]/10 border border-[#00E5FF]/15 text-white rounded-tr-sm'
                    : 'bg-[#1A2438] border border-[#1F2937] text-[#E2E8F0] rounded-tl-sm'
                }`}
              >
                {m.text.split('\n').map((line, j) => (
                  <p
                    key={j}
                    className={j > 0 ? 'mt-1.5' : ''}
                    dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                  />
                ))}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex items-center justify-center">
                <Bot size={14} className="text-[#00E5FF]" />
              </div>
              <div className="px-4 py-3 bg-[#1A2438] border border-[#1F2937] rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]/60 animate-bounce" style={{ animationDelay: `${i * 0.15}s` } as React.CSSProperties} />
                ))}
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 2 && (
          <div className="px-6 pb-3 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => setInput(s)}
                className="px-3 py-1.5 rounded-xl bg-[#1A2438] border border-[#1F2937] text-xs text-[#94A3B8] hover:text-white hover:border-[#00E5FF]/30 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="px-6 pb-6">
          <div className="flex items-center gap-2 px-4 py-3 bg-[#111827] border border-[#1F2937] rounded-2xl focus-within:border-[#00E5FF]/40 transition-colors">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about opportunities, career advice, resume help…"
              className="flex-1 bg-transparent text-sm text-white placeholder:text-[#94A3B8] outline-none"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="p-2 rounded-lg bg-[#00E5FF] text-[#0B1120] disabled:opacity-40 hover:bg-[#00E5FF]/90 transition-colors"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

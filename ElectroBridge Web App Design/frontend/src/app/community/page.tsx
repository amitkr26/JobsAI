export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <div className="w-16 h-16 rounded-2xl bg-[#00E5FF]/10 border border-[#00E5FF]/25 flex items-center justify-center mx-auto mb-5">
          <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#00E5FF" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Community</h1>
        <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
          Community features are coming soon. You&apos;ll be able to share insights, ask questions, and connect with other electronics and semiconductor professionals.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1A2438] border border-[#1F2937] text-sm text-[#94A3B8]">
          Stay tuned for updates
        </div>
      </div>
    </div>
  );
}

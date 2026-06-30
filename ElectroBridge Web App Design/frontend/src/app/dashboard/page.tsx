import { Bookmark, Briefcase, Award, Bell, FileText, Clock, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AvatarCircle } from '@/components/AvatarCircle';
import { OPPORTUNITIES } from '@/data/opportunities';

function StatCard({ icon, label, value, delta }: { icon: React.ReactNode; label: string; value: string; delta?: string }) {
  return (
    <div className="bg-[#1A2438] border border-[#1F2937] rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="w-9 h-9 rounded-xl bg-[#00E5FF]/10 flex items-center justify-center text-[#00E5FF]">{icon}</div>
        {delta && <span className="text-[11px] text-[#10B981] font-semibold">+{delta}</span>}
      </div>
      <div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-xs text-[#94A3B8] mt-0.5">{label}</p>
      </div>
    </div>
  );
}

const apps = [
  { org: 'ISRO VSSC', role: 'VLSI Intern', status: 'Under Review', color: '#F59E0B' },
  { org: 'IISc', role: 'Nano-fab Fellow', status: 'Shortlisted', color: '#10B981' },
  { org: 'Intel India', role: 'AI Chip Intern', status: 'Applied', color: '#00E5FF' },
  { org: 'DRDO DLRL', role: 'RF Trainee', status: 'Rejected', color: '#EF4444' },
];

const statusColor: Record<string, 'yellow' | 'green' | 'default' | 'red'> = {
  'Under Review': 'yellow',
  Shortlisted: 'green',
  Applied: 'default',
  Rejected: 'red',
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0B1120]">
      <div className="max-w-[1440px] mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">My Dashboard</h1>
            <p className="text-sm text-[#94A3B8] mt-0.5">Track your applications and career progress</p>
          </div>
          <a
            href="/resume"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/25 text-[#00E5FF] text-sm font-medium hover:bg-[#00E5FF]/15 transition-colors"
          >
            <FileText size={14} /> Build Resume
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={<Bookmark size={16} />} label="Saved Opportunities" value="14" delta="3" />
          <StatCard icon={<Briefcase size={16} />} label="Applications" value="4" />
          <StatCard icon={<Award size={16} />} label="Resume ATS Score" value="74/100" delta="12" />
          <StatCard icon={<Bell size={16} />} label="Active Alerts" value="6" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#1A2438] border border-[#1F2937] rounded-2xl p-5">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Briefcase size={15} className="text-[#00E5FF]" /> Application Tracker
            </h3>
            <div className="space-y-3">
              {apps.map((a) => (
                <div key={a.org} className="flex items-center gap-3 p-3 bg-[#0B1120] rounded-xl border border-[#1F2937]">
                  <AvatarCircle initials={a.org.slice(0, 2)} color={a.color} />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{a.role}</p>
                    <p className="text-xs text-[#94A3B8]">{a.org}</p>
                  </div>
                  <Badge variant={statusColor[a.status] || 'gray'}>{a.status}</Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-[#1A2438] border border-[#1F2937] rounded-2xl p-5">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Award size={15} className="text-[#00E5FF]" /> Resume Score
              </h3>
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20">
                  <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                    <circle cx="40" cy="40" r="34" fill="none" stroke="#1F2937" strokeWidth="8" />
                    <circle cx="40" cy="40" r="34" fill="none" stroke="#00E5FF" strokeWidth="8" strokeDasharray="213.6" strokeDashoffset="55.5" strokeLinecap="round" />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white">74</span>
                </div>
                <div>
                  <p className="text-xs text-[#94A3B8] mb-2">Areas to improve:</p>
                  {['Add publications', 'Quantify achievements', 'Improve keywords'].map((tip) => (
                    <p key={tip} className="text-xs text-[#94A3B8] flex items-center gap-1">
                      <ChevronRight size={10} className="text-[#F59E0B]" />
                      {tip}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[#1A2438] border border-[#1F2937] rounded-2xl p-5">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Clock size={15} className="text-[#F59E0B]" /> Upcoming Deadlines
              </h3>
              <div className="space-y-2.5">
                {OPPORTUNITIES.slice(0, 4).map((o) => (
                  <div key={o.id} className="flex items-center justify-between text-sm">
                    <p className="text-white truncate flex-1 mr-2 text-xs">{o.org.split('—')[0].trim()}</p>
                    <Badge variant={o.daysLeft < 30 ? 'red' : 'yellow'} size="xs">{o.daysLeft}d</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Bookmark, Briefcase, Award, Bell, FileText, Clock, ChevronRight, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AvatarCircle } from '@/components/AvatarCircle';
import { getOpportunities, OpportunityData } from '@/data/opportunities';

function StatCard({ icon, label, value, delta }: { icon: React.ReactNode; label: string; value: string; delta?: string }) {
  return (
    <div className="bg-[#1A2438] border border-[#1F2937] rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="w-9 h-9 rounded-xl bg-[#00E5FF]/10 flex items-center justify-center text-[#00E5FF]">{icon}</div>
      </div>
      <div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-xs text-[#94A3B8] mt-0.5">{label}</p>
      </div>
    </div>
  );
}

const statusColor: Record<string, 'yellow' | 'green' | 'default' | 'red'> = {
  'Under Review': 'yellow',
  Shortlisted: 'green',
  Applied: 'default',
  Rejected: 'red',
};

export default function DashboardPage() {
  const [opportunities, setOpportunities] = useState<OpportunityData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getOpportunities();
        setOpportunities(data);
      } catch {
        setOpportunities([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

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
          <StatCard icon={<Bookmark size={16} />} label="Saved Opportunities" value="0" />
          <StatCard icon={<Briefcase size={16} />} label="Applications" value="0" />
          <StatCard icon={<Award size={16} />} label="Resume ATS Score" value="0" />
          <StatCard icon={<Bell size={16} />} label="Active Alerts" value="0" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#1A2438] border border-[#1F2937] rounded-2xl p-5">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Briefcase size={15} className="text-[#00E5FF]" /> Application Tracker
            </h3>
            <div className="text-center py-10 text-[#94A3B8] text-sm">
              No applications yet. Start applying to opportunities!
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-[#1A2438] border border-[#1F2937] rounded-2xl p-5">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Award size={15} className="text-[#00E5FF]" /> Resume Score
              </h3>
              <div className="text-center py-6 text-[#94A3B8] text-sm">
                Upload your resume to get an ATS score.
              </div>
            </div>

            <div className="bg-[#1A2438] border border-[#1F2937] rounded-2xl p-5">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Clock size={15} className="text-[#F59E0B]" /> Upcoming Deadlines
              </h3>
              {loading ? (
                <div className="flex items-center justify-center py-4">
                  <RefreshCw size={14} className="text-[#00E5FF] animate-spin" />
                </div>
              ) : opportunities.length === 0 ? (
                <div className="text-center py-4 text-[#94A3B8] text-xs">No upcoming deadlines.</div>
              ) : (
                <div className="space-y-2.5">
                  {opportunities.slice(0, 4).map((o) => (
                    <div key={o.id} className="flex items-center justify-between text-sm">
                      <p className="text-white truncate flex-1 mr-2 text-xs">{o.org}</p>
                      <Badge variant={o.daysLeft < 30 ? 'red' : 'yellow'} size="xs">{o.daysLeft}d</Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import {
  Shield, Briefcase, Link, Flag, Bot, Search, Filter,
  Plus, Eye, CheckCircle, Trash2, RefreshCw,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getOpportunities, OpportunityData } from '@/data/opportunities';

const modules = ['Opportunities', 'Verification Queue', 'News', 'Reports', 'Analytics', 'AI Usage', 'Broken Links'];

export default function AdminPage() {
  const [activeModule, setActiveModule] = useState('Opportunities');
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
    <div className="min-h-screen bg-[#0B1120] flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-[#1F2937] bg-[#111827] hidden md:flex flex-col">
        <div className="p-4 border-b border-[#1F2937]">
          <div className="flex items-center gap-2">
            <Shield size={14} className="text-[#00E5FF]" />
            <span className="text-sm font-semibold text-white">Admin Panel</span>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {modules.map((m) => (
            <button
              key={m}
              onClick={() => setActiveModule(m)}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${
                activeModule === m
                  ? 'bg-[#00E5FF]/10 text-[#00E5FF]'
                  : 'text-[#94A3B8] hover:bg-[#1A2438] hover:text-white'
              }`}
            >
              {m}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-white">{activeModule}</h1>
          <div className="flex items-center gap-2">
            <Badge variant="green">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] inline-block mr-1" /> System Normal
            </Badge>
            <button className="px-3 py-1.5 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/25 text-[#00E5FF] text-sm font-medium hover:bg-[#00E5FF]/15 transition-colors">
              <Plus size={13} className="inline mr-1" />Add New
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
          {[
            { icon: <Briefcase size={15} />, label: 'Verified Opportunities', value: String(opportunities.length), color: '#00E5FF' },
            { icon: <Link size={15} />, label: 'Broken Links', value: 'N/A', color: '#EF4444' },
            { icon: <Flag size={15} />, label: 'User Reports', value: 'N/A', color: '#F59E0B' },
            { icon: <Bot size={15} />, label: 'AI Requests (24h)', value: 'N/A', color: '#10B981' },
          ].map((s) => (
            <div key={s.label} className="bg-[#1A2438] border border-[#1F2937] rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: s.color + '18', color: s.color }}>
                  {s.icon}
                </div>
              </div>
              <p className="text-xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-[#94A3B8] mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-[#1A2438] border border-[#1F2937] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#1F2937]">
            <h3 className="text-sm font-semibold text-white">Verified Opportunities</h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#111827] border border-[#1F2937] rounded-lg">
                <Search size={12} className="text-[#94A3B8]" />
                <input placeholder="Search…" className="bg-transparent text-xs text-white placeholder:text-[#94A3B8] outline-none w-32" />
              </div>
              <button className="p-1.5 rounded-lg border border-[#1F2937] text-[#94A3B8] hover:text-white">
                <Filter size={13} />
              </button>
            </div>
          </div>
          {loading ? (
            <div className="text-center py-12">
              <RefreshCw size={24} className="text-[#00E5FF] animate-spin mx-auto" />
              <p className="text-[#94A3B8] text-xs mt-2">Loading...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-[#1F2937]">
                  <tr className="text-[#94A3B8] text-xs uppercase tracking-wider">
                    {['Title', 'Organization', 'Type', 'Deadline', 'Status', 'Actions'].map((h) => (
                      <th key={h} className="text-left px-5 py-3 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1F2937]">
                  {opportunities.map((opp) => (
                    <tr key={opp.id} className="hover:bg-[#111827] transition-colors">
                      <td className="px-5 py-3 text-white font-medium text-xs max-w-[180px] truncate">{opp.title}</td>
                      <td className="px-5 py-3 text-[#94A3B8] text-xs">{opp.org.split('—')[0].trim()}</td>
                      <td className="px-5 py-3"><Badge variant="gray" size="xs">{opp.type}</Badge></td>
                      <td className="px-5 py-3 text-[#94A3B8] text-xs">{opp.deadline}</td>
                      <td className="px-5 py-3">
                        <Badge variant={opp.verified ? 'green' : 'yellow'} size="xs">
                          {opp.verified ? 'Verified' : 'Pending'}
                        </Badge>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <button className="p-1 rounded text-[#94A3B8] hover:text-[#00E5FF] transition-colors"><Eye size={13} /></button>
                          <button className="p-1 rounded text-[#94A3B8] hover:text-[#10B981] transition-colors"><CheckCircle size={13} /></button>
                          <button className="p-1 rounded text-[#94A3B8] hover:text-[#EF4444] transition-colors"><Trash2 size={13} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {opportunities.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-[#94A3B8] text-xs">No opportunities found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          <div className="flex items-center justify-between px-5 py-3 border-t border-[#1F2937]">
            <p className="text-xs text-[#94A3B8]">Showing {opportunities.length} records</p>
          </div>
        </div>
      </div>
    </div>
  );
}
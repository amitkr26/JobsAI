'use client';

import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Grid3X3, List, AlertCircle, RefreshCw } from 'lucide-react';
import { OpportunityCard } from '@/components/OpportunityCard';
import { getOpportunities, OpportunityData } from '@/data/opportunities';
import { useSearchParams } from 'next/navigation';

const filters = {
  'Job Type': ['Internship', 'Full-time', 'Research Fellowship', 'PhD Scholarship', 'Trainee'],
  'Degree': ['B.Tech', 'M.Tech', 'PhD'],
  'Location': ['Bengaluru', 'Hyderabad', 'Mumbai', 'Pune', 'Delhi'],
};

export default function OpportunitiesPage() {
  const searchParams = useSearchParams();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [opportunities, setOpportunities] = useState<OpportunityData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const params: Record<string, string> = {};
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
          params.category = categoryParam;
        }
        const data = await getOpportunities(Object.keys(params).length ? params : undefined);
        setOpportunities(data);
      } catch {
        setOpportunities([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [searchParams]);

  const filtered = opportunities.filter((o) => {
    if (search && !o.title.toLowerCase().includes(search.toLowerCase()) && !o.org.toLowerCase().includes(search.toLowerCase())) return false;
    if (activeFilters.length > 0 && !activeFilters.includes(o.type)) return false;
    return true;
  });

  const displayed = search || activeFilters.length > 0 ? filtered : opportunities;

  return (
    <div className="min-h-screen bg-[#0B1120]">
      <div className="max-w-[1440px] mx-auto flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-72 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto border-r border-[#1F2937] p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-white text-sm flex items-center gap-2">
              <SlidersHorizontal size={14} className="text-[#00E5FF]" /> Filters
            </h3>
            <button onClick={() => setActiveFilters([])} className="text-xs text-[#94A3B8] hover:text-white">Clear all</button>
          </div>
          {Object.entries(filters).map(([group, opts]) => (
            <div key={group} className="mb-5">
              <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">{group}</p>
              <div className="space-y-1.5">
                {opts.map((opt) => {
                  const active = activeFilters.includes(opt);
                  return (
                    <button
                      key={opt}
                      onClick={() => setActiveFilters(active ? activeFilters.filter((f) => f !== opt) : [...activeFilters, opt])}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                        active
                          ? 'bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20'
                          : 'text-[#94A3B8] hover:text-white hover:bg-[#1A2438]'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </aside>

        {/* Main */}
        <main className="flex-1 p-5 lg:p-7">
          {/* Top bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
            <div className="flex-1 flex items-center gap-2 px-4 py-2.5 bg-[#111827] border border-[#1F2937] rounded-xl focus-within:border-[#00E5FF]/40 transition-colors">
              <Search size={15} className="text-[#94A3B8]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search opportunities…"
                className="bg-transparent text-sm text-white placeholder:text-[#94A3B8] outline-none flex-1"
              />
            </div>
            <div className="flex items-center gap-2">
              {loading && <RefreshCw size={14} className="text-[#00E5FF] animate-spin" />}
              <div className="flex items-center border border-[#1F2937] rounded-xl overflow-hidden">
                <button
                  onClick={() => setView('grid')}
                  className={`p-2 transition-colors ${view === 'grid' ? 'bg-[#1A2438] text-white' : 'text-[#94A3B8]'}`}
                >
                  <Grid3X3 size={14} />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`p-2 transition-colors ${view === 'list' ? 'bg-[#1A2438] text-white' : 'text-[#94A3B8]'}`}
                >
                  <List size={14} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-[#94A3B8]">
              <span className="text-white font-semibold">{displayed.length}</span> opportunities found
            </p>
            <select className="text-sm bg-[#111827] border border-[#1F2937] text-[#94A3B8] rounded-lg px-3 py-1.5 outline-none">
              <option>Sort: Deadline (Soonest)</option>
              <option>Sort: Stipend (Highest)</option>
              <option>Sort: Newest First</option>
            </select>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <RefreshCw size={32} className="text-[#00E5FF] animate-spin mx-auto mb-3" />
              <p className="text-[#94A3B8] text-sm">Loading opportunities...</p>
            </div>
          ) : (
            <div className={view === 'grid' ? 'grid md:grid-cols-2 xl:grid-cols-3 gap-4' : 'space-y-3'}>
              {displayed.map((opp) => (
                <OpportunityCard key={opp.id} opp={opp} />
              ))}
              {displayed.length === 0 && (
                <div className="col-span-3 text-center py-20">
                  <AlertCircle size={40} className="text-[#1F2937] mx-auto mb-3" />
                  <p className="text-[#94A3B8] text-sm">No opportunities match your filters</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
import { api } from '@/lib/api';

export interface OpportunityData {
  id: number;
  title: string;
  org: string;
  verified: boolean;
  location: string;
  stipend: string;
  deadline: string;
  daysLeft: number;
  tags: string[];
  type: string;
  degree: string;
  saved: boolean;
  logo: string;
  color: string;
  description: string;
}

export async function getOpportunities(params?: Record<string, string>): Promise<OpportunityData[]> {
  const res = await api.opportunities.list(params);
  return (res.data || []).map((o: any) => ({
    id: o.id || parseInt(o.slug || '0'),
    title: o.title,
    org: o.organization,
    verified: o.verification_status === 'verified',
    location: o.location || 'India',
    stipend: o.stipend || 'N/A',
    deadline: o.deadline ? new Date(o.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Open',
    daysLeft: o.deadline ? Math.ceil((new Date(o.deadline).getTime() - Date.now()) / 86400000) : 30,
    tags: o.tags || [],
    type: o.type || 'Opportunity',
    degree: o.degree_requirement || 'B.Tech / M.Tech',
    saved: false,
    logo: (o.organization || 'EB').slice(0, 2).toUpperCase(),
    color: '#00E5FF',
    description: o.description || '',
  }));
}

export async function getOpportunity(id: string): Promise<OpportunityData | null> {
  const res = await api.opportunities.get(id);
  const o = res.data;
  if (!o) return null;
  return {
    id: o.id || parseInt(o.slug || '0'),
    title: o.title,
    org: o.organization,
    verified: o.verification_status === 'verified',
    location: o.location || 'India',
    stipend: o.stipend || 'N/A',
    deadline: o.deadline ? new Date(o.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Open',
    daysLeft: o.deadline ? Math.ceil((new Date(o.deadline).getTime() - Date.now()) / 86400000) : 30,
    tags: o.tags || [],
    type: o.type || 'Opportunity',
    degree: o.degree_requirement || 'B.Tech / M.Tech',
    saved: false,
    logo: (o.organization || 'EB').slice(0, 2).toUpperCase(),
    color: '#00E5FF',
    description: o.description || '',
  };
}

export const CATEGORIES = [
  { label: 'VLSI & ASIC', slug: 'vlsi-asic', color: '#00E5FF', icon: 'Cpu' },
  { label: 'Semiconductor Process', slug: 'semiconductor-process', color: '#3B82F6', icon: 'CircuitBoard' },
  { label: 'Embedded Systems', slug: 'embedded-systems', color: '#F59E0B', icon: 'Zap' },
  { label: 'RF & Microwave', slug: 'rf-microwave', color: '#10B981', icon: 'Radio' },
  { label: 'Research & PhD', slug: 'research-phd', color: '#8B5CF6', icon: 'FlaskConical' },
  { label: 'Signal Processing', slug: 'signal-processing', color: '#EF4444', icon: 'BarChart3' },
  { label: 'AI Hardware', slug: 'ai-hardware', color: '#00E5FF', icon: 'Bot' },
  { label: 'Fellowships', slug: 'fellowships', color: '#3B82F6', icon: 'GraduationCap' },
] as const;

export const OPPORTUNITY_TYPES = [
  'Internship',
  'Full-time',
  'Fellowship',
  'PhD',
  'Trainee',
  'Research',
] as const;

export const DEGREE_LEVELS = [
  'B.Tech',
  'M.Tech',
  'PhD',
  'Diploma',
  'Any Graduate',
] as const;

export const VERIFICATION_STATUSES = [
  'verified',
  'unverified',
  'expired',
  'flagged',
] as const;

export const NEWS_CATEGORIES = [
  'Semiconductor',
  'VLSI',
  'AI Chips',
  'Research',
  'India',
  'Industry',
  'Jobs',
] as const;

export const APPLICATION_STATUSES = [
  'saved',
  'applied',
  'interview',
  'offer',
  'rejected',
  'accepted',
] as const;

export const ALERT_FREQUENCIES = ['instant', 'daily', 'weekly'] as const;

export const SORT_OPTIONS = [
  { label: 'Deadline (Soonest)', value: 'deadline_asc' },
  { label: 'Stipend (Highest)', value: 'stipend_desc' },
  { label: 'Newest First', value: 'newest' },
] as const;

export const ITEMS_PER_PAGE = 12;

export const SITE_CONFIG = {
  name: 'ElectroBridge',
  tagline: 'AI-Powered Career Intelligence for Electronics & Semiconductors',
  description: 'Verified internships, research fellowships, PhD scholarships, and industry roles — curated for electronics engineers and semiconductor professionals.',
  url: 'https://electrobridge.com',
  ogImage: '/og.png',
  links: {
    github: 'https://github.com/electrobridge',
    twitter: 'https://twitter.com/electrobridge',
  },
} as const;

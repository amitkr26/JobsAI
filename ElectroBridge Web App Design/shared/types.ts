export interface Opportunity {
  id?: string;
  title: string;
  organization: string;
  org_slug?: string;
  category: string;
  type: 'Internship' | 'Full-time' | 'Fellowship' | 'PhD' | 'Trainee' | 'Research';
  description: string;
  location: string | null;
  stipend: string | null;
  min_stipend?: number;
  max_stipend?: number;
  currency?: string;
  deadline: string | null;
  degree_requirement?: string | null;
  eligibility: string | null;
  tags: string[];
  source_url: string | null;
  apply_link: string | null;
  apply_link_type?: 'direct' | 'homepage' | 'pdf' | 'email' | 'portal';
  source: string;
  slug: string;
  verification_status: 'verified' | 'unverified' | 'expired' | 'flagged';
  verified_at?: string;
  official_page_url?: string;
  is_active: boolean;
  is_featured: boolean;
  last_link_checked?: string;
  link_check_status?: string;
  admin_notes?: string;
  posted_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface NewsArticle {
  id?: string;
  title: string;
  summary: string | null;
  content?: string;
  source: string | null;
  source_url: string | null;
  source_site?: string;
  image_url: string | null;
  author?: string;
  tags: string[];
  category?: string;
  slug?: string;
  is_verified?: boolean;
  published_at: string | null;
  created_at?: string;
}

export interface Subscriber {
  id?: string;
  email: string;
  keywords: string[];
  categories: string[];
  is_active: boolean;
  subscribed_at?: string;
  unsubscribed_at?: string;
}

export interface UserProfile {
  id: string;
  full_name?: string;
  avatar_url?: string;
  headline?: string;
  bio?: string;
  skills: string[];
  education?: EducationEntry[];
  experience?: ExperienceEntry[];
  resume_url?: string;
  linkedin_url?: string;
  github_url?: string;
  preferences?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
}

export interface EducationEntry {
  institution: string;
  degree: string;
  field?: string;
  start_year?: string;
  end_year?: string;
  cgpa?: string;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  start_date?: string;
  end_date?: string;
  description?: string;
  current?: boolean;
}

export interface SavedOpportunity {
  id?: string;
  user_id: string;
  opportunity_id: string;
  notes?: string;
  saved_at?: string;
}

export interface Application {
  id?: string;
  user_id: string;
  opportunity_id: string;
  status: 'saved' | 'applied' | 'interview' | 'offer' | 'rejected' | 'accepted';
  applied_at?: string;
  deadline?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserAlert {
  id?: string;
  user_id: string;
  keywords: string[];
  categories: string[];
  frequency: 'instant' | 'daily' | 'weekly';
  is_active: boolean;
  created_at?: string;
  last_triggered_at?: string;
}

export interface LinkCheckLog {
  id?: string;
  opportunity_id: string;
  url: string;
  status: 'valid' | 'broken' | 'redirect' | 'error';
  status_code?: number;
  checked_at: string;
}

export interface OpportunityReport {
  id?: string;
  opportunity_id: string;
  reason: string;
  details?: string;
  reporter_email?: string;
  status: 'pending' | 'reviewed' | 'resolved';
  created_at?: string;
  resolved_at?: string;
}

export interface AiUsageLog {
  id?: string;
  feature: string;
  provider: string;
  model?: string;
  prompt_tokens?: number;
  completion_tokens?: number;
  total_tokens?: number;
  duration_ms?: number;
  success: boolean;
  error_message?: string;
  user_id?: string;
  created_at?: string;
}

export interface Suggestion {
  id?: string;
  name: string;
  email: string;
  message: string;
  created_at?: string;
}

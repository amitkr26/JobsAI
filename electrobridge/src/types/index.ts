export interface Opportunity {
  id?: string;
  title: string;
  organization: string;
  category: "JRF" | "SRF" | "PhD" | "Govt Job" | "Private Job" | "Fellowship";
  location: string | null;
  stipend: string | null;
  deadline: string | null;
  eligibility: string | null;
  description: string | null;
  apply_link: string | null;
  source_url?: string | null;
  is_active?: boolean;
  created_at?: string;
  tags: string[];
}

export interface NewsArticle {
  id?: string;
  title: string;
  summary: string | null;
  source: string | null;
  source_url: string | null;
  published_at: string | null;
  image_url: string | null;
  tags: string[];
  created_at?: string;
}

export interface Subscriber {
  id?: string;
  email: string;
  keywords: string[];
  categories: string[];
  created_at?: string;
  is_active: boolean;
}

export interface SavedOpportunity {
  id?: string;
  user_id: string;
  opportunity_id: string;
  created_at?: string;
}

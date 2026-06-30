-- ElectroBridge Base Schema (Supabase)
-- Run this first.

-- ============================================================
-- EXTENSIONS
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- OPPORTUNITIES
-- ============================================================
CREATE TABLE IF NOT EXISTS opportunities (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  organization text NOT NULL,
  org_slug text,
  category text,
  type text,
  description text,
  location text,
  stipend text,
  min_stipend integer,
  max_stipend integer,
  currency text DEFAULT 'INR',
  deadline timestamp with time zone,
  degree_requirement text,
  eligibility text,
  tags text[] DEFAULT '{}',
  source_url text,
  apply_link text,
  apply_link_type text DEFAULT 'homepage'
    CHECK (apply_link_type IN ('direct', 'homepage', 'pdf', 'email', 'portal')),
  source text DEFAULT 'manual',
  slug text,
  verification_status text DEFAULT 'unverified'
    CHECK (verification_status IN ('verified', 'unverified', 'expired', 'flagged')),
  verified_at timestamp with time zone,
  official_page_url text,
  is_active boolean DEFAULT true,
  is_featured boolean DEFAULT false,
  last_link_checked timestamp with time zone,
  link_check_status text,
  admin_notes text,
  posted_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_opportunities_category ON opportunities(category);
CREATE INDEX IF NOT EXISTS idx_opportunities_deadline ON opportunities(deadline);
CREATE INDEX IF NOT EXISTS idx_opportunities_verification_status ON opportunities(verification_status);
CREATE INDEX IF NOT EXISTS idx_opportunities_tags ON opportunities USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_opportunities_org_slug ON opportunities(org_slug);
CREATE INDEX IF NOT EXISTS idx_opportunities_posted_at ON opportunities(posted_at DESC);
CREATE INDEX IF NOT EXISTS idx_opportunities_is_active ON opportunities(is_active);

-- ============================================================
-- NEWS ARTICLES
-- ============================================================
CREATE TABLE IF NOT EXISTS news_articles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  summary text,
  content text,
  source text,
  source_url text,
  source_site text,
  image_url text,
  author text,
  tags text[] DEFAULT '{}',
  category text,
  slug text,
  is_verified boolean DEFAULT false,
  published_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_news_published_at ON news_articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_tags ON news_articles USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_news_slug ON news_articles(slug);
CREATE INDEX IF NOT EXISTS idx_news_category ON news_articles(category);

-- ============================================================
-- SUBSCRIBERS
-- ============================================================
CREATE TABLE IF NOT EXISTS subscribers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  keywords text[] DEFAULT '{}',
  categories text[] DEFAULT '{}',
  is_active boolean DEFAULT true,
  subscribed_at timestamp with time zone DEFAULT now(),
  unsubscribed_at timestamp with time zone
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);

-- ============================================================
-- USER PROFILES
-- ============================================================
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name text,
  avatar_url text,
  headline text,
  bio text,
  skills text[] DEFAULT '{}',
  education jsonb DEFAULT '[]',
  experience jsonb DEFAULT '[]',
  resume_url text,
  linkedin_url text,
  github_url text,
  preferences jsonb DEFAULT '{}',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- ============================================================
-- SAVED OPPORTUNITIES
-- ============================================================
CREATE TABLE IF NOT EXISTS saved_opportunities (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  opportunity_id uuid NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
  notes text,
  saved_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, opportunity_id)
);

-- ============================================================
-- APPLICATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS applications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  opportunity_id uuid NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
  status text DEFAULT 'saved'
    CHECK (status IN ('saved', 'applied', 'interview', 'offer', 'rejected', 'accepted')),
  applied_at timestamp with time zone,
  deadline timestamp with time zone,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_applications_user_id ON applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);

-- ============================================================
-- USER ALERTS
-- ============================================================
CREATE TABLE IF NOT EXISTS user_alerts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  keywords text[] DEFAULT '{}',
  categories text[] DEFAULT '{}',
  frequency text DEFAULT 'instant'
    CHECK (frequency IN ('instant', 'daily', 'weekly')),
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  last_triggered_at timestamp with time zone
);

CREATE INDEX IF NOT EXISTS idx_user_alerts_user_id ON user_alerts(user_id);

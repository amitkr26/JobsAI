-- ElectroBridge Extensions (Supabase)
-- Run after 001_base_schema.sql.

-- ============================================================
-- SLUG SYSTEM
-- ============================================================
CREATE OR REPLACE FUNCTION generate_slug(title text, organization text, category text)
RETURNS text AS $$
DECLARE
  base_slug text;
  final_slug text;
  counter integer := 0;
BEGIN
  base_slug := lower(coalesce(category, 'uncategorized')) || '-' ||
    regexp_replace(lower(coalesce(organization, 'unknown')), '[^a-z0-9]+', '-', 'g') || '-' ||
    regexp_replace(lower(coalesce(title, 'untitled')), '[^a-z0-9]+', '-', 'g');
  base_slug := regexp_replace(base_slug, '-+', '-', 'g');
  base_slug := trim(both '-' from base_slug);
  base_slug := left(base_slug, 80);

  final_slug := base_slug;
  WHILE EXISTS (SELECT 1 FROM opportunities WHERE slug = final_slug) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  RETURN final_slug;
END;
$$ LANGUAGE plpgsql;

UPDATE opportunities
SET slug = generate_slug(title, organization, category)
WHERE slug IS NULL;

ALTER TABLE opportunities ALTER COLUMN slug SET NOT NULL;
ALTER TABLE opportunities ADD CONSTRAINT unique_opportunity_slug UNIQUE (slug);
CREATE INDEX IF NOT EXISTS idx_opportunities_slug ON opportunities(slug);

CREATE OR REPLACE FUNCTION auto_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := generate_slug(NEW.title, NEW.organization, NEW.category);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_slug ON opportunities;
CREATE TRIGGER set_slug BEFORE INSERT ON opportunities
FOR EACH ROW EXECUTE FUNCTION auto_slug();

-- ============================================================
-- AI USAGE LOG
-- ============================================================
CREATE TABLE IF NOT EXISTS ai_usage_log (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  feature text NOT NULL,
  provider text NOT NULL,
  model text,
  prompt_tokens integer,
  completion_tokens integer,
  total_tokens integer,
  duration_ms integer,
  success boolean DEFAULT true,
  error_message text,
  user_id uuid,
  created_at timestamp with time zone DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ai_usage_log_created_at ON ai_usage_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_usage_log_feature ON ai_usage_log(feature);
CREATE INDEX IF NOT EXISTS idx_ai_usage_log_provider ON ai_usage_log(provider);

-- ============================================================
-- LINK CHECK LOGS
-- ============================================================
CREATE TABLE IF NOT EXISTS link_check_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  opportunity_id uuid REFERENCES opportunities(id) ON DELETE CASCADE,
  url text,
  status text DEFAULT 'unknown',
  status_code integer,
  checked_at timestamp with time zone DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_link_check_logs_opportunity ON link_check_logs(opportunity_id);

-- ============================================================
-- OPPORTUNITY REPORTS
-- ============================================================
CREATE TABLE IF NOT EXISTS opportunity_reports (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  opportunity_id uuid REFERENCES opportunities(id) ON DELETE CASCADE,
  reason text,
  details text,
  reporter_email text,
  status text DEFAULT 'pending'
    CHECK (status IN ('pending', 'reviewed', 'resolved')),
  created_at timestamp with time zone DEFAULT now(),
  resolved_at timestamp with time zone
);

CREATE INDEX IF NOT EXISTS idx_opportunity_reports_status ON opportunity_reports(status);

-- ============================================================
-- SUGGESTIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS suggestions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text,
  email text,
  message text,
  created_at timestamp with time zone DEFAULT now()
);

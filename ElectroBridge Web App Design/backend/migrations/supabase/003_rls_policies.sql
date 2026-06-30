-- ElectroBridge RLS Policies
-- Run after 002_extensions.sql.

-- ============================================================
-- OPPORTUNITIES
-- ============================================================
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read active opportunities" ON opportunities;
CREATE POLICY "Public can read active opportunities"
  ON opportunities FOR SELECT
  USING (is_active = true);

DROP POLICY IF EXISTS "Admin can manage opportunities" ON opportunities;
CREATE POLICY "Admin can manage opportunities"
  ON opportunities FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- NEWS ARTICLES
-- ============================================================
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read news" ON news_articles;
CREATE POLICY "Public can read news"
  ON news_articles FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Admin can manage news" ON news_articles;
CREATE POLICY "Admin can manage news"
  ON news_articles FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- SUBSCRIBERS
-- ============================================================
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can subscribe" ON subscribers;
CREATE POLICY "Anyone can subscribe"
  ON subscribers FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admin can read subscribers" ON subscribers;
CREATE POLICY "Admin can read subscribers"
  ON subscribers FOR SELECT
  USING (true);

-- ============================================================
-- USER PROFILES
-- ============================================================
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own profile" ON user_profiles;
CREATE POLICY "Users can read own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Admin can manage profiles" ON user_profiles;
CREATE POLICY "Admin can manage profiles"
  ON user_profiles FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- SAVED OPPORTUNITIES
-- ============================================================
ALTER TABLE saved_opportunities ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own saved opportunities" ON saved_opportunities;
CREATE POLICY "Users can manage own saved opportunities"
  ON saved_opportunities FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- APPLICATIONS
-- ============================================================
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own applications" ON applications;
CREATE POLICY "Users can manage own applications"
  ON applications FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- USER ALERTS
-- ============================================================
ALTER TABLE user_alerts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own alerts" ON user_alerts;
CREATE POLICY "Users can manage own alerts"
  ON user_alerts FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- AI USAGE LOG
-- ============================================================
ALTER TABLE ai_usage_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role can insert ai_usage_log" ON ai_usage_log;
CREATE POLICY "Service role can insert ai_usage_log"
  ON ai_usage_log FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admin can read ai_usage_log" ON ai_usage_log;
CREATE POLICY "Admin can read ai_usage_log"
  ON ai_usage_log FOR SELECT
  USING (true);

-- ============================================================
-- LINK CHECK LOGS
-- ============================================================
ALTER TABLE link_check_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin can manage link_check_logs" ON link_check_logs;
CREATE POLICY "Admin can manage link_check_logs"
  ON link_check_logs FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- OPPORTUNITY REPORTS
-- ============================================================
ALTER TABLE opportunity_reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can report" ON opportunity_reports;
CREATE POLICY "Anyone can report"
  ON opportunity_reports FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admin can manage reports" ON opportunity_reports;
CREATE POLICY "Admin can manage reports"
  ON opportunity_reports FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- SUGGESTIONS
-- ============================================================
ALTER TABLE suggestions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit suggestions" ON suggestions;
CREATE POLICY "Anyone can submit suggestions"
  ON suggestions FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admin can read suggestions" ON suggestions;
CREATE POLICY "Admin can read suggestions"
  ON suggestions FOR SELECT
  USING (true);

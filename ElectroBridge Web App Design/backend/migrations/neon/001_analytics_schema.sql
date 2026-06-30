-- ElectroBridge Neon Schema (Analytics + High-Volume Ingestion)
-- Neon handles heavy writes: scraping ingestion, click tracking, analytics.

-- ============================================================
-- SCRAPE LOGS
-- ============================================================
CREATE TABLE IF NOT EXISTS scrape_logs (
  id bigserial PRIMARY KEY,
  scraper text NOT NULL,
  items_scraped integer DEFAULT 0,
  items_new integer DEFAULT 0,
  items_updated integer DEFAULT 0,
  errors text[] DEFAULT '{}',
  duration_ms integer,
  started_at timestamp with time zone DEFAULT now(),
  completed_at timestamp with time zone
);

CREATE INDEX IF NOT EXISTS idx_scrape_logs_scraper ON scrape_logs(scraper);
CREATE INDEX IF NOT EXISTS idx_scrape_logs_started_at ON scrape_logs(started_at DESC);

-- ============================================================
-- CLICK TRACKING
-- ============================================================
CREATE TABLE IF NOT EXISTS click_tracking (
  id bigserial PRIMARY KEY,
  opportunity_id uuid,
  user_id text,
  ip_address inet,
  user_agent text,
  clicked_at timestamp with time zone DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_click_tracking_opportunity ON click_tracking(opportunity_id);
CREATE INDEX IF NOT EXISTS idx_click_tracking_clicked_at ON click_tracking(clicked_at DESC);

-- ============================================================
-- DAILY STATS (materialized for dashboards)
-- ============================================================
CREATE TABLE IF NOT EXISTS daily_stats (
  id bigserial PRIMARY KEY,
  date date NOT NULL DEFAULT CURRENT_DATE,
  total_opportunities integer DEFAULT 0,
  active_opportunities integer DEFAULT 0,
  new_opportunities_today integer DEFAULT 0,
  total_news_articles integer DEFAULT 0,
  total_subscribers integer DEFAULT 0,
  ai_requests integer DEFAULT 0,
  unique_visitors integer DEFAULT 0,
  UNIQUE(date)
);

CREATE INDEX IF NOT EXISTS idx_daily_stats_date ON daily_stats(date DESC);

-- ============================================================
-- PAGE VIEWS ANALYTICS
-- ============================================================
CREATE TABLE IF NOT EXISTS page_views (
  id bigserial PRIMARY KEY,
  path text NOT NULL,
  referrer text,
  user_agent text,
  ip_address inet,
  viewed_at timestamp with time zone DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(path);
CREATE INDEX IF NOT EXISTS idx_page_views_viewed_at ON page_views(viewed_at DESC);

-- ============================================================
-- RSS FEED CACHE
-- ============================================================
CREATE TABLE IF NOT EXISTS rss_feed_cache (
  id bigserial PRIMARY KEY,
  feed_url text NOT NULL,
  source_name text,
  items jsonb NOT NULL,
  fetched_at timestamp with time zone DEFAULT now(),
  UNIQUE(feed_url)
);

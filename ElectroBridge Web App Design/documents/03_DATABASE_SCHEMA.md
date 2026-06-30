# Database Schema

## Overview

Two database systems:
- **Supabase** (PostgreSQL) — Auth, user data, transactional data
- **Neon** (PostgreSQL) — Heavy ingestion, analytics, large-volume data

## Table: opportunities

Stores all job/opportunity listings aggregated from various sources.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID PK | Primary key |
| title | TEXT NOT NULL | Opportunity title |
| organization | TEXT NOT NULL | Organization name |
| org_slug | TEXT | URL-friendly org name |
| category | TEXT | Category (VLSI, Embedded, etc.) |
| type | TEXT | Internship, Full-time, Fellowship, PhD, etc. |
| description | TEXT | Full description |
| location | TEXT | Job location |
| stipend | TEXT | Stipend/salary (display string) |
| min_stipend | INTEGER | Minimum stipend (numeric for sorting) |
| max_stipend | INTEGER | Maximum stipend (numeric for sorting) |
| currency | TEXT | Currency code (INR, USD, etc.) |
| deadline | TIMESTAMPTZ | Application deadline |
| degree_requirement | TEXT | Required degree level |
| eligibility | TEXT | Eligibility criteria (JSON or text) |
| tags | TEXT[] | Array of tags |
| source_url | TEXT UNIQUE | Original URL |
| apply_link | TEXT | Application link |
| apply_link_type | TEXT | direct, homepage, pdf, email, portal |
| source | TEXT | Source name (isro, drdo, csir, rss, manual) |
| slug | TEXT UNIQUE NOT NULL | URL-friendly identifier |
| verification_status | TEXT | verified, unverified, expired, flagged |
| verified_at | TIMESTAMPTZ | When verification happened |
| official_page_url | TEXT | Official page for verification |
| is_active | BOOLEAN DEFAULT true | Whether listing is active |
| is_featured | BOOLEAN DEFAULT false | Featured opportunity |
| last_link_checked | TIMESTAMPTZ | Last link check timestamp |
| link_check_status | TEXT | valid, broken, unknown |
| admin_notes | TEXT | Internal admin notes |
| posted_at | TIMESTAMPTZ | When opportunity was posted |
| created_at | TIMESTAMPTZ DEFAULT now() | Row creation time |
| updated_at | TIMESTAMPTZ DEFAULT now() | Row update time |

### Indexes
- `idx_opportunities_category` ON category
- `idx_opportunities_deadline` ON deadline
- `idx_opportunities_verification_status` ON verification_status
- `idx_opportunities_tags` ON tags (GIN)
- `idx_opportunities_slug` ON slug UNIQUE
- `idx_opportunities_org_slug` ON org_slug
- `idx_opportunities_source_url` ON source_url UNIQUE
- `idx_opportunities_posted_at` ON posted_at

## Table: news_articles

Stores semiconductor/electronics news aggregated from RSS feeds.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID PK | Primary key |
| title | TEXT NOT NULL | Article headline |
| summary | TEXT | Article summary |
| content | TEXT | Full article content |
| source | TEXT | Source name (IEEE Spectrum, EE Times, etc.) |
| source_url | TEXT UNIQUE | Original article URL |
| source_site | TEXT | Source domain |
| image_url | TEXT | Article image |
| author | TEXT | Article author |
| tags | TEXT[] | Array of tags |
| category | TEXT | Category |
| slug | TEXT UNIQUE | URL-friendly identifier |
| is_verified | BOOLEAN DEFAULT false | AI verified relevance |
| published_at | TIMESTAMPTZ | Publication date |
| created_at | TIMESTAMPTZ DEFAULT now() | Row creation time |

### Indexes
- `idx_news_source_url` ON source_url UNIQUE
- `idx_news_published_at` ON published_at
- `idx_news_tags` ON tags (GIN)
- `idx_news_slug` ON slug UNIQUE

## Table: subscribers

Email newsletter subscribers.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID PK | Primary key |
| email | TEXT UNIQUE NOT NULL | Subscriber email |
| keywords | TEXT[] | Preferred keywords |
| categories | TEXT[] | Preferred categories |
| is_active | BOOLEAN DEFAULT true | Subscription active |
| subscribed_at | TIMESTAMPTZ DEFAULT now() | Subscription date |
| unsubscribed_at | TIMESTAMPTZ | Unsubscribe date |

## Table: ai_usage_log

Logs all AI API calls for analytics and billing.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID PK | Primary key |
| feature | TEXT NOT NULL | Feature name (chat, match, search, etc.) |
| provider | TEXT NOT NULL | AI provider used |
| model | TEXT | Model name |
| prompt_tokens | INTEGER | Input tokens |
| completion_tokens | INTEGER | Output tokens |
| total_tokens | INTEGER | Total tokens |
| duration_ms | INTEGER | Response time |
| success | BOOLEAN | Whether call succeeded |
| error_message | TEXT | Error if failed |
| user_id | UUID | User who made the call |
| created_at | TIMESTAMPTZ DEFAULT now() | When call was made |

## Table: user_profiles

Extended user profile data.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID PK | References auth.users |
| full_name | TEXT | User's full name |
| avatar_url | TEXT | Profile picture URL |
| headline | TEXT | Professional headline |
| bio | TEXT | Short biography |
| skills | TEXT[] | Array of skills |
| education | JSONB | Education history |
| experience | JSONB | Work experience |
| resume_url | TEXT | Resume file URL |
| linkedin_url | TEXT | LinkedIn profile |
| github_url | TEXT | GitHub profile |
| preferences | JSONB | User preferences |
| created_at | TIMESTAMPTZ | Account creation |
| updated_at | TIMESTAMPTZ | Profile update time |

## Table: saved_opportunities

User bookmarked opportunities.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID PK | Primary key |
| user_id | UUID NOT NULL | References user_profiles.id |
| opportunity_id | UUID NOT NULL | References opportunities.id |
| notes | TEXT | Personal notes |
| saved_at | TIMESTAMPTZ DEFAULT now() | When saved |
| UNIQUE(user_id, opportunity_id) | | Prevents duplicates |

## Table: applications

Tracks user applications to opportunities.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID PK | Primary key |
| user_id | UUID NOT NULL | References user_profiles.id |
| opportunity_id | UUID NOT NULL | References opportunities.id |
| status | TEXT | saved, applied, interview, offer, rejected, accepted |
| applied_at | TIMESTAMPTZ | When applied |
| deadline | TIMESTAMPTZ | Application deadline |
| notes | TEXT | User notes |
| created_at | TIMESTAMPTZ | Row creation |
| updated_at | TIMESTAMPTZ | Row update |

## Table: user_alerts

Custom alerts for users.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID PK | Primary key |
| user_id | UUID NOT NULL | References user_profiles.id |
| keywords | TEXT[] | Keywords to match |
| categories | TEXT[] | Categories to match |
| frequency | TEXT | instant, daily, weekly |
| is_active | BOOLEAN DEFAULT true | Alert active |
| created_at | TIMESTAMPTZ | Creation time |
| last_triggered_at | TIMESTAMPTZ | Last notification |

## Table: link_check_logs

Audit trail for opportunity link checking.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID PK | Primary key |
| opportunity_id | UUID | References opportunities.id |
| url | TEXT | URL checked |
| status | TEXT | valid, broken, redirect, error |
| status_code | INTEGER | HTTP status code |
| checked_at | TIMESTAMPTZ | When checked |

## Table: opportunity_reports

User-submitted reports for broken/spam opportunities.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID PK | Primary key |
| opportunity_id | UUID | References opportunities.id |
| reason | TEXT | Report reason |
| details | TEXT | Additional details |
| reporter_email | TEXT | Optional contact email |
| status | TEXT | pending, reviewed, resolved |
| created_at | TIMESTAMPTZ | Report creation |
| resolved_at | TIMESTAMPTZ | When resolved |

## Table: suggestions

User suggestions from contact form.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID PK | Primary key |
| name | TEXT | User name |
| email | TEXT | User email |
| message | TEXT | Suggestion content |
| created_at | TIMESTAMPTZ | Submission time |

## Row-Level Security (RLS)

Tables are protected by Supabase RLS policies:

| Table | Public Read | Auth Read | Auth Write | Admin All |
|-------|-------------|-----------|------------|-----------|
| opportunities | ✓ (active only) | ✓ | — | ✓ |
| news_articles | ✓ | ✓ | — | ✓ |
| subscribers | — | — | Insert only | ✓ |
| ai_usage_log | — | Own rows | — | ✓ |
| user_profiles | — | Own row | Own row | ✓ |
| saved_opportunities | — | Own rows | Own rows | ✓ |
| applications | — | Own rows | Own rows | ✓ |
| user_alerts | — | Own rows | Own rows | ✓ |
| link_check_logs | — | — | — | ✓ |
| opportunity_reports | — | — | Insert only | ✓ |
| suggestions | — | — | Insert only | ✓ |

## Migrations

Refer to legacy codebase migrations:
- `electrobridge/supabase/migrations/20260501000001_fix_duplicates_and_cleanup.sql`
- `electrobridge/supabase/migrations/20260501000002_verification_and_slugs.sql`
- `electrobridge/supabase/migrations/20260501000003_cleanup_irrelevant_news.sql`
- `electrobridge/supabase/migrations/20260501000004_ai_usage_log.sql`
- `electrobridge/supabase/migrations/20260501000005_news_slug_suggestions.sql`

## Schema Changes from Legacy

1. Added `currency` column to opportunities
2. Added `min_stipend` and `max_stipend` for numeric filtering
3. Added `is_featured` flag to opportunities
4. Added `source_site` to news_articles for domain-level filtering
5. Added `headline` to user_profiles for professional display
6. Replaced `telegram_subscribers` and `calendar_exports` tables (removed from target)
7. Removed `telegram_bot` references

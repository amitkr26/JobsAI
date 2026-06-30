# Migration Log

## Migration Overview

Migrating from legacy `electrobridge/` (Next.js 14 + Vercel + Supabase) to new `ElectroBridge Web App Design/` (Next.js App Router + Netlify + Render + Supabase + Neon).

## What We Keep (from Legacy)

| Component | File(s) | Action |
|-----------|---------|--------|
| Database schema | supabase/migrations/*.sql | Port to new Supabase + Neon |
| SQL migrations | supabase-migration.sql, supabase-migration-v2.sql, supabase-cleanup.sql | Reference for schema |
| TypeScript types | src/types/index.ts | Copy to shared/types/ |
| AI provider orchestration | src/lib/ai/providers.ts | Refactor — remove 2 providers |
| AI matcher | src/lib/ai/matcher.ts | Port with simplification |
| AI search parser | src/lib/ai/search-parser.ts | Port |
| AI summarizer | src/lib/ai/summarizer.ts | Port |
| AI expiry checker | src/lib/ai/expiry-checker.ts | Port |
| AI newsletter | src/lib/ai/newsletter.ts | Port |
| AI news filter | src/lib/ai/news-filter-ai.ts | Port |
| Scraper: ISRO | src/lib/scrapers/isro-scraper.ts | Port |
| Scraper: DRDO | src/lib/scrapers/drdo-scraper.ts | Port |
| Scraper: CSIR | src/lib/scrapers/csir-scraper.ts | Port |
| Scraper: Government | src/lib/scrapers/govt-scraper.ts | Port |
| Scraper: RSS parser | src/lib/scrapers/rss-parser.ts | Port |
| Scraper: News filter | src/lib/scrapers/news-filter.ts | Port |
| Scraper: Types | src/lib/scrapers/types.ts | Copy to shared/ |
| Scraper: Utilities | src/lib/scrapers/utils.ts | Port |
| Rate limiter | src/lib/rate-limiter.ts | Port |
| Email digest | src/lib/email-digest.ts | Port |
| Seed data | src/lib/seed-data.ts | Port |
| Supabase client | src/lib/supabase.ts | Refactor (two clients → one per env) |
| Utility functions | src/lib/utils.ts | Copy to shared/ |
| All API routes | src/app/api/* | Port to new backend |
| Seed/test scripts | scripts/* | Port |

## What We Remove (from Legacy)

| Component | Reason |
|-----------|--------|
| vercel.json | Moving to Netlify + Render |
| Vercel Cron configs | Moving to Render Cron |
| Edge Functions | Moving to Netlify Functions / backend APIs |
| Cloudflare AI provider | Reducing AI complexity |
| HuggingFace provider | Reducing AI complexity |
| AWS Bedrock provider | Reducing AI complexity |
| NVIDIA NIM provider | Reducing AI complexity |
| telegram_bot.ts | Not needed for launch |
| telegram_subscribers table | Not needed for launch |
| calendar_exports table | Not needed for launch |
| All UI components under src/components/ | Rewriting from Figma design |
| All pages under src/app/ | Rewriting from Figma design |

## What We Build New

| Component | Based On |
|-----------|----------|
| Next.js project setup | Fresh |
| Tailwind design tokens | Figma theme.css + legacy tailwind.config.ts |
| shadcn/ui integration | Existing src/app/components/ui/ |
| All page components | Figma App.tsx design |
| Navbar | Figma design |
| Footer | Figma design |
| Landing page | Figma LandingScreen |
| Opportunities listing | Figma OpportunitiesScreen + legacy logic |
| Opportunity detail | Figma DetailScreen + legacy logic |
| News pages | Figma NewsScreen + legacy logic |
| AI chat page | Figma AIScreen + legacy AI logic |
| Dashboard | Figma DashboardScreen |
| Admin panel | Figma AdminScreen + legacy logic |
| Auth pages | New (Supabase Auth UI) |
| User profile | New |
| Saved opportunities | New |
| Application tracker | New |
| User alerts | New |
| Deployment configs | netlify.toml + Render config |

## Migration Phases

### Phase 0: Foundation ✓
- Audit both codebases
- Create documentation
- Generate migration roadmap

### Phase 1: Frontend Rebuild (Current)
- Initialize Next.js project
- Port Figma design to components
- Set up routing and layout

### Phase 2: Database Migration
- Create Supabase project and run migrations
- Create Neon project and run migrations
- Set up RLS policies
- Test with seed data

### Phase 3: Backend Port
- Set up Express/Fastify server
- Port API routes
- Test each endpoint

### Phase 4: Scrapers + AI
- Port scraper modules
- Refactor AI providers (remove 4, keep 3)
- Set up cron jobs on Render

### Phase 5: Auth + User System
- Set up Supabase Auth
- Build user-facing features

### Phase 6: Admin + Newsletter
- Build admin panel
- Set up email system

### Phase 7: QA + Deployment
- Full audit
- Security review
- Deploy to production

# Master Context

## Project Identity

- **Name:** ElectroBridge
- **Tagline:** AI-Powered Career Intelligence for Electronics & Semiconductors
- **Domain:** Electronics, semiconductor, VLSI, research, fellowship, PhD, government job, and private job opportunity aggregation
- **Region Focus:** India (primary), global research opportunities (secondary)

## Core Mission

Transform a Figma-based UI prototype into a fully working production web application that:
1. Aggregates opportunities from multiple sources (ISRO, DRDO, CSIR, RSS feeds, etc.)
2. Verifies opportunities via AI and manual review
3. Filters irrelevant/spam data
4. Presents searchable AI-powered dashboard
5. Provides personalized AI matching and career guidance
6. Delivers email newsletters and digests
7. Offers admin panel for moderation and analytics

## Target Users

- Electronics engineering students (B.Tech, M.Tech)
- PhD scholars in semiconductor/VLSI fields
- Semiconductor professionals seeking career growth
- Research fellows and postdocs
- Government job aspirants (DRDO, ISRO, CSIR, etc.)

## Key Metrics (Target)

- 4,200+ verified opportunities
- 98% accuracy rate
- 1.2L+ active users
- 340+ partner organizations

## Current State

### Figma Export (ElectroBridge Web App Design/src/)
- Vite + React SPA (not Next.js)
- Single monolithic App.tsx (1395 lines)
- shadcn/ui library (50 components, unused)
- Tailwind CSS v4, dark theme
- Mock/fake data only
- No routing (state-based screen switching)
- No backend, no auth, no database, no API

### Legacy Codebase (electrobridge/)
- Next.js 14 App Router (fully functional)
- Supabase database with RLS
- 23 reusable components
- 15+ API routes
- Multi-provider AI system (Groq, Gemini, OpenRouter)
- Production scrapers (ISRO, DRDO, CSIR, RSS)
- Email system via Resend
- Admin panel
- SEO infrastructure (sitemap, robots, OG images, JSON-LD)
- 5 SQL migration files
- TypeScript types and utilities

## Target Architecture

### Frontend
- Framework: Next.js App Router
- Language: TypeScript
- Styling: Tailwind CSS
- Deployment: Netlify
- UI: Based on Figma design, using shadcn/ui primitives

### Backend
- Hosting: Render
- Workers: Background jobs, cron
- Scrapers: Migrated from legacy codebase
- AI pipelines: Simplified (Gemini, Groq, OpenRouter only)
- Email: Resend
- Newsletter: Cron-based weekly digest

### Database
- Supabase: User data, auth, profiles, transactional data
- Neon: Heavy scraping ingestion, analytics, large-volume writes

### Auth
- Supabase Auth with RLS policies

## Features to Build

1. Homepage (landing page)
2. Opportunities listing + filtering + search
3. Opportunity detail page
4. News listing + filtering
5. News detail page
6. Categories browsing
7. Organizations directory
8. AI-powered search
9. AI chat assistant
10. AI opportunity matching
11. User authentication
12. User dashboard
13. User profile
14. Saved/bookmarked opportunities
15. Application tracker
16. User alerts
17. Admin panel (CRUD, analytics, moderation)
18. Newsletter (subscribe, digest, unsubscribe)
19. Verification workflow (AI + manual)
20. Analytics (AI usage, opportunity stats, user metrics)

## Migration Strategy

1. Create documentation framework (Phase 0 — current)
2. Set up Next.js frontend with Figma design, porting UI components
3. Migrate database schema from legacy to Supabase + Neon
4. Port backend API routes from legacy
5. Migrate and simplify AI module
6. Port scrapers and data pipelines
7. Set up auth and user system
8. Build admin panel
9. Set up deployment (Netlify + Render)
10. Testing, security audit, and launch

# Architecture

## System Overview

```
┌──────────────────────────────────────────────────────────┐
│                     Netlify (Frontend)                    │
│  ┌────────────────────────────────────────────────────┐  │
│  │              Next.js App Router                    │  │
│  │  Pages │ API Routes │ Middleware │ Edge Functions  │  │
│  │  ┌─────┴─────┐ ┌────┴────┐ ┌────┴────┐            │  │
│  │  │ shadcn/ui │ │Tailwind │ │ TypeScript│           │  │
│  │  └───────────┘ └─────────┘ └──────────┘            │  │
│  └────────────────────────────────────────────────────┘  │
└────────────────────────┬─────────────────────────────────┘
                         │
            HTTPS / JSON / Server-Sent Events
                         │
┌────────────────────────┴─────────────────────────────────┐
│                    Render (Backend)                       │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Express/Fastify API Server                        │  │
│  │  ┌──────────┐ ┌───────────┐ ┌──────────────────┐  │  │
│  │  │ AI       │ │ Scrapers  │ │ Email/Newsletter  │  │  │
│  │  │ Pipeline │ │ (Cron)    │ │ (Cron)            │  │  │
│  │  └──────────┘ └───────────┘ └──────────────────┘  │  │
│  │  ┌──────────┐ ┌───────────┐                      │  │
│  │  │ Workers  │ │ Webhooks  │                      │  │
│  │  └──────────┘ └───────────┘                      │  │
│  └────────────────────────────────────────────────────┘  │
└────────────────────┬──────────────────┬──────────────────┘
                     │                  │
            ┌────────┴──────┐    ┌──────┴──────┐
            │   Supabase    │    │    Neon      │
            │  Auth + RLS   │    │ Analytics +  │
            │  User Data    │    │ Scrape Data  │
            │  Profiles     │    │ News Archive │
            └───────────────┘    └──────────────┘
```

## Frontend Architecture (Next.js App Router)

### Routes
```
/                       → Homepage (Landing)
/opportunities          → Opportunity listing
/opportunities/[slug]   → Opportunity detail
/news                   → News listing
/news/[slug]            → News detail
/categories             → Categories
/category/[category]    → Per-category opportunities
/organizations          → Organizations directory
/organizations/[slug]   → Per-organization opportunities
/chat                   → AI chat assistant
/match                  → AI opportunity matching
/dashboard              → User dashboard
/profile                → User profile
/saved                  → Saved opportunities
/applications           → Application tracker
/alerts                 → User alerts
/admin                  → Admin panel
/resources              → Resource guides
/about                  → About page
/contact                → Contact form
```

### Component Architecture
```
Layout
├── Navbar
├── Page Content
│   ├── Server Components (data fetching)
│   └── Client Components (interactivity)
└── Footer
```

### Data Flow
- Server Components fetch data directly from Supabase/Neon
- Client Components use Server Actions or API routes for mutations
- AI features use API routes that proxy to AI providers
- Auth state managed via Supabase Auth + middleware

## Backend Architecture (Render)

### Services
1. **API Server** — Express/Fastify handling non-Next.js API routes
2. **Scraper Workers** — Cron-based scraping jobs
3. **AI Workers** — Batch processing, embedding generation
4. **Email Workers** — Newsletter dispatch, digest generation

### Cron Jobs
```
Daily 6 AM   → scrape:all (ISRO, DRDO, CSIR, RSS)
Daily 12 PM  → check:links (verify opportunity URLs)
Daily 3 AM   → cleanup:news (deduplicate, filter)
Weekly Sun   → send:digest (weekly email digest)
Hourly       → ai:expire (auto-expire outdated listings)
```

## AI Architecture

### Providers (Reduced)
1. **Gemini** — Primary for chat and matching
2. **Groq** — Primary for fast inference
3. **OpenRouter** — Fallback

### Removed Providers
- AWS Bedrock
- NVIDIA NIM
- Cloudflare AI
- HuggingFace

### AI Features
- Chat assistant (context-aware, opportunity-aware)
- Opportunity matching (profile → opportunity scoring)
- Natural language search query parsing
- Opportunity summarization
- Expiry detection
- News relevance filtering
- Newsletter content generation

## Database Strategy

### Supabase (Transactional)
- Auth users
- User profiles
- Saved opportunities
- Applications
- User alerts
- Subscribers
- AI usage logs
- Opportunity reports
- Suggestions

### Neon (Analytical + High-Volume)
- Opportunities (ingestion target)
- News articles
- Link check logs
- Analytics data
- Click tracking

## Deployment

### Frontend → Netlify
- Next.js app with ISR/SSR
- Netlify Functions for server-side APIs
- Environment variables via Netlify dashboard
- CDN for static assets

### Backend → Render
- Express/Fastify API server
- Background workers
- Cron jobs
- Docker containerization

### Email → Resend
- Transactional emails (welcome, alerts)
- Weekly digest
- Newsletter campaigns

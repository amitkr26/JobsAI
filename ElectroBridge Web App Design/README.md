# ElectroBridge — Electronics & Semiconductor Opportunities Platform

Connects Indian students and professionals to verified R&D opportunities in electronics, semiconductor, VLSI, and space sectors. Aggregates from ISRO, DRDO, CSIR, IITs, IISc, TIFR, and industry RSS feeds. Features AI-powered chat, matching, and natural language search.

## Live URLs

| Service | URL |
|---------|-----|
| Frontend | [https://electrobridge.netlify.app](https://electrobridge.netlify.app) |
| Backend | [https://electrobridge-api.onrender.com](https://electrobridge-api.onrender.com) |
| Health | [https://electrobridge-api.onrender.com/health](https://electrobridge-api.onrender.com/health) |

## Features

- **Verified Opportunities** — Filtered to `verification_status='verified'` by default. Currently: VLSI Design at Intel, JRF at IISc, Embedded Systems at TIFR, EV Engineering at Tata Motors, RF & Microwave at ISRO.
- **Tech News** — Electronics/semiconductor news from verified sources. Category pill tabs, API-fetched.
- **Organizations** — Browse opportunities by org (ISRO, IISc, Intel, Tata Motors, TIFR, DRDO).
- **AI Chat** — Career assistant specialized in Indian R&D. Powered by Groq LLaMA 3.3 70B.
- **AI Match** — Tag-based and description-based scoring. Submit skills, get top 10 matches.
- **AI Search** — Natural language query parsing (e.g., "VLSI internships in Bangalore" → filters).
- **AI Summarize** — Condense opportunity descriptions into key points.
- **Email Subscription** — Newsletter signup (stores to DB; delivery requires cron).
- **Admin Panel** — Dashboard stats, add opportunities, add news articles.

## Project Structure

```
├── frontend/          Next.js 15 App Router (static export)
│   ├── src/app/       17 pages — landing, opportunities, news, orgs, chat,
│   │                  login, signup, dashboard, admin, about, contact, etc.
│   ├── src/components/ Navbar, Footer, LandingHero, OpportunityCard,
│   │                  SkeletonCard, AvatarCircle, VerifiedBadge, Badge
│   ├── src/data/       API-fetching data layer (news.ts, opportunities.ts)
│   └── src/lib/        API client, Supabase, utils
│
├── backend/           Express 5 API server
│   ├── src/routes/    6 routers: opportunities, news, organizations,
│   │                  subscribe, admin, ai
│   ├── src/lib/       Supabase client, Neon, AI modules (Groq, matcher,
│   │                  search-parser, summarizer)
│   └── src/middleware/ Admin auth, DB guard
│
├── shared/            Types, constants, utilities shared across the stack
└── documents/         Architecture, deployment guide, API spec, audit, etc.
```

## Quick Start

### Prerequisites
- Node.js 22 (see `.nvmrc`)
- Supabase project (URL + service_role key)
- Groq API key ([console.groq.com](https://console.groq.com))

### Backend

```bash
cd backend
cp .env.example .env
# Edit .env: add SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, GROQ_API_KEY, ADMIN_PASSWORD
npm install
npx tsx src/index.ts
# → http://localhost:4000 | health: http://localhost:4000/health
```

### Frontend

```bash
cd frontend
cp .env.example .env.local
# Edit .env.local: add NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
# NEXT_PUBLIC_API_URL should point to your backend (http://localhost:4000/api for dev)
npm install
npm run dev
# → http://localhost:3000
```

## API

All endpoints live at `/api/*` on the backend.

### Public
| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Service status |
| `GET` | `/api/opportunities` | List (paginated, filterable, verified-only) |
| `GET` | `/api/opportunities/:id` | Detail (verified-only) |
| `GET` | `/api/news` | List (paginated, verified-only) |
| `GET` | `/api/news/:slug` | Detail by slug |
| `GET` | `/api/organizations` | List (name, slug, count) |
| `GET` | `/api/organizations/:slug` | Opportunities by org slug |
| `POST` | `/api/subscribe` | Subscribe email (rate-limited: 3/hr/IP) |
| `POST` | `/api/ai/chat` | Chat with career assistant |
| `POST` | `/api/ai/match` | Match skills against opportunities |
| `GET` | `/api/ai/search?q=` | Natural language search |
| `POST` | `/api/ai/summarize` | Summarize text |

### Admin (requires `x-admin-token` header)
| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/admin/stats` | Dashboard stats |
| `POST` | `/api/opportunities` | Create opportunity |
| `PATCH` | `/api/opportunities/:id` | Update opportunity |
| `DELETE` | `/api/opportunities/:id` | Delete opportunity |

All data endpoints default to returning only verified records (`verification_status='verified'` / `is_verified=true`). Pass `?verified=all` to bypass (admin use).

## Deployment

### Frontend → Netlify
- Static export (`output: 'export'`), publish `out/`
- Deploy via zip upload or GitHub Actions
- `public/_redirects` proxies `/api/*` → Render backend

### Backend → Render
- Node web service, `npm install` + `npx tsx src/index.ts`
- Health check at `/health`, Free plan (Oregon)
- No cron infrastructure (data added manually for MVP)

### Environment Variables

**Backend (required):** `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `GROQ_API_KEY`, `ADMIN_PASSWORD`

**Frontend (required):** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_API_URL`

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15, Tailwind CSS v4, TypeScript |
| Backend | Express 5, tsx runtime |
| Database | Supabase (PostgreSQL + RLS) |
| AI | Groq (llama-3.3-70b-versatile) |
| Hosting | Netlify (frontend), Render (backend) |

## Documents

See the `documents/` folder for:
- `02_ARCHITECTURE.md` — System architecture and data flow
- `04_ENV_VARIABLES.md` — Full env var reference
- `05_DEPLOYMENT.md` — Deployment guide
- `11_API_SPEC.md` — Complete API reference
- `15_PROJECT_AUDIT.md` — Comprehensive project audit
- `16_MIGRATION_PLAN.md` — MVP simplification plan

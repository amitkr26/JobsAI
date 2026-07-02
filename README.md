# ElectroBridge — Electronics & Semiconductor Opportunities Platform

A one-stop platform for electronics, semiconductor, VLSI, and research opportunities in India. Aggregates verified JRF/PhD/internship/engineering roles from ISRO, DRDO, CSIR, IITs, IISc, TIFR, and industry. Features AI-powered chat, matching, and search.

| Component | Live URL | Stack |
|-----------|----------|-------|
| **Frontend** | [electrobridge.netlify.app](https://electrobridge.netlify.app) | Next.js 15, static export, Tailwind CSS v4 |
| **Backend** | [electrobridge-api.onrender.com](https://electrobridge-api.onrender.com) | Express 5, tsx runtime |
| **Database** | Supabase (Singapore) | PostgreSQL, RLS |
| **AI** | Groq LLaMA 3.3 70B | Single provider |

## Active Codebase

**`ElectroBridge Web App Design/`** — the refactored MVP:
- `frontend/` — Next.js 15 App Router, static export, 17 page routes
- `backend/` — Express 5 API server, 6 route modules
- `shared/` — Types, constants, utilities
- `documents/` — Architecture, deployment, API spec, project audit

## Quick Start

```bash
# Backend
cd "ElectroBridge Web App Design/backend"
cp .env.example .env   # fill in keys
npm install
npx tsx src/index.ts   # → http://localhost:4000

# Frontend (separate terminal)
cd "ElectroBridge Web App Design/frontend"
cp .env.example .env.local   # fill in keys
npm install
npm run dev                  # → http://localhost:3000
```

## Features

- **Verified Opportunities** — R&D roles from top Indian research orgs, all verification_status='verified'
- **Tech News** — Electronics/semiconductor news with category filters (from API, not scraped live)
- **Organizations** — Browse by ISRO, DRDO, IISC, TIFR, Intel, Tata Motors, etc.
- **AI Chat** — Career assistant specialized in Indian R&D opportunities
- **AI Match** — Upload skills, get matched opportunities (tag + description scoring)
- **AI Search** — Natural language search query parsing
- **AI Summarize** — Opportunity description summarization
- **Subscribe** — Email alerts (manual for MVP, no cron)
- **Admin Panel** — Add/edit opportunities, news, view stats
- **Static Export** — Pre-rendered detail pages, API-fetched at runtime

## Tech Stack

- **Next.js 15** — App Router, static export
- **Express 5** — API server, CORS, Helmet
- **Supabase** — PostgreSQL, RLS, service_role for server queries
- **Groq** — AI inference (llama-3.3-70b-versatile)
- **Tailwind CSS v4** — Dark theme, utility-first
- **Netlify** — Frontend hosting
- **Render** — Backend hosting

## Project Structure

```
ElectroBridge Web App Design/   ← ACTIVE MVP
├── frontend/                   Next.js 15 static app
│   ├── src/app/                17 page routes
│   ├── src/components/         7 components
│   └── src/lib/                API client, supabase, utils
├── backend/                    Express 5 API server
│   ├── src/routes/             6 route modules
│   ├── src/lib/                supabase, neon, AI modules
│   └── src/middleware/         Admin auth
├── shared/                     Types, constants
└── documents/                  Architecture, deploy, API spec

electrobridge/                  ← LEGACY (read-only)
docs/                           ← Legacy documentation
```

## Admin Access

Set `ADMIN_PASSWORD` env var on the backend. Send it as `x-admin-token` header:
```bash
curl -H "x-admin-token: your-password" https://electrobridge-api.onrender.com/api/admin/stats
```

## License

Built for the electronics research community. 100% free tier.

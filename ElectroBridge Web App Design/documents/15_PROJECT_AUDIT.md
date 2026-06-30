# Project Audit Report: ElectroBridge (JobsAI)

*Generated: June 30, 2026*

---

## 1. Project Overview

**ElectroBridge** — a full-stack web platform connecting Indian students/professionals to verified R&D opportunities in electronics, semiconductor, and space sectors. Aggregates from ISRO, DRDO, CSIR, IITs, IISc, TIFR, and industry RSS feeds. Includes AI-powered chat, matchmaking, and summarization.

### Tech Stack
| Layer | Stack | Hosting |
|-------|-------|---------|
| Frontend | Next.js 15, Tailwind CSS v4, static export | Netlify |
| Backend | Express 5, `npx tsx` runtime | Render (Free, Oregon) |
| Database | Supabase (primary) + Neon (analytics) | Supabase Cloud + Neon Cloud |
| Auth | Supabase Auth | Supabase |
| AI | Groq LLaMA 3.3 70B / Gemini / OpenRouter / HuggingFace | External APIs |

### Live URLs
| Component | URL |
|-----------|-----|
| Frontend | `https://electrobridge.netlify.app` |
| Backend | `https://electrobridge-api.onrender.com` |
| Health | `https://electrobridge-api.onrender.com/health` |
| Supabase | `jbqjipwanfsxyqkfrrpx.supabase.co` |

### Repository
- **Origin:** `https://github.com/amitkr26/JobsAI`
- **Fork:** `https://github.com/pogotunes/JobsAI`
- **Commits:** 70 | **Authors:** 4 | **Branch:** `main`
- **Total files:** ~250+ across two application trees

---

## 2. What Is Done ✅

### 2.1 Backend (Express 5 — `ElectroBridge Web App Design/backend/`)
| Component | Status | Details |
|-----------|--------|---------|
| Express server entry | ✅ | CORS, helmet, health endpoint, routers at `/api/*` |
| Opportunities CRUD routes | ✅ | List (paginated, filterable), detail, create, update, delete |
| News routes | ✅ | List (paginated, filterable), detail by slug |
| Organizations routes | ✅ | List aggregated from opps, detail by org_slug |
| AI routes | ✅ | `/chat`, `/match`, `/search`, `/summarize`, `/expire` |
| Subscribe routes | ✅ | Subscribe (rate-limited 3/hr/IP), unsubscribe |
| Admin routes | ✅ | Stats, add-opportunity, add-news, recheck-link |
| Scrape routes | ✅ | News, opportunities, check-links, cleanup (cron-guarded) |
| Newsletter routes | ✅ | Weekly digest, send (cron-guarded) |
| Auth middleware | ✅ | `requireAdmin`, `requireCronSecret`, `requireDatabase` |
| AI provider engine | ✅ | Groq→Gemini→OpenRouter→HuggingFace→Bedrock fallback chain |
| AI Matcher | ✅ | Opportunity matching against user skills |
| AI Summarizer | ✅ | Description summarization |
| AI Search parser | ✅ | NL queries → DB filters |
| AI News filter | ✅ | Electronics-relevance classification |
| AI Newsletter generator | ✅ | Weekly digest content |
| AI Expiry checker | ✅ | Deadline verification |
| Scrapers: ISRO, DRDO, CSIR | ✅ | Website scrapers for career pages |
| RSS Parser | ✅ | 18 electronics-feed sources |
| News keyword filter | ✅ | EDGE-sector relevance filter |
| Verified-only filter (all routes) | ✅ | Default: `verification_status='verified'` / `is_verified=true` |
| DB migrations (Supabase base) | ✅ | 3 applied: base_schema, extensions, RLS policies |
| DB migrations (Neon analytics) | ✅ | 5 tables created: scrape_logs, click_tracking, daily_stats, page_views, rss_feed_cache |
| `.nvmrc` (Node 22) | ✅ | |
| Render deploy | ✅ | Live with `npm install` + `npx tsx src/index.ts` |

### 2.2 Frontend (Next.js 15 — `ElectroBridge Web App Design/frontend/`)
| Component | Status | Details |
|-----------|--------|---------|
| App Router with static export | ✅ | `output: 'export'` in next.config.ts |
| Tailwind CSS v4 | ✅ | |
| Landing page | ✅ | LandingHero with spotlight, stats, featured |
| Opportunities list | ✅ | API-fetched, paginated |
| Opportunity detail | ✅ | 5 UUIDs pre-built via generateStaticParams |
| News list | ✅ | Category pill tabs, API-fetched |
| News detail | ✅ | 5 slugs pre-built |
| Organizations detail | ✅ | 6 orgs pre-built |
| AI Chat | ✅ | Conversation interface |
| AI Match | ✅ | Skill input + matching |
| Resume page | ✅ | |
| About / Contact | ✅ | |
| Login / Signup | ✅ | Supabase Auth UI |
| Dashboard | ✅ | Stats, application tracker |
| Admin panel | ✅ | Stats, add-opportunity, add-news |
| Navbar (auth-aware) | ✅ | Login state, dashboard link |
| Loading/Error/404 states | ✅ | All pages |
| API client (`lib/api.ts`) | ✅ | Thin fetch wrapper |
| Netlify config | ✅ | `netlify.toml`, `_redirects`, security headers |
| No fallback/dummy data | ✅ | `FALLBACK_OPPORTUNITIES` and `FALLBACK_NEWS` removed |

### 2.3 Main App (Next.js 14 — `electrobridge/`)
| Component | Status | Details |
|-----------|--------|---------|
| Full Next.js 14 App Router | ✅ | All pages, 27 API routes, 28 components |
| Opportunities with apply tracking | ✅ | ICS calendar export, click tracking |
| News with images/sources | ✅ | Full CRUD with AI filtering |
| Resources hub | ✅ | 6 guides: PhD, JRF, NET vs GATE, VLSI, etc. |
| Auth system | ✅ | Supabase SSR with OAuth |
| Dashboard (full) | ✅ | Stats, apps, resume score |
| Profile | ✅ | Full upsert with skills/education/experience |
| Admin panel (full) | ✅ | Edit opportunity, add news |
| Telegram bot | ✅ | Notification bot |
| Design tokens system | ✅ | `lib/design-tokens.ts` |
| 6 incremental DB migrations | ✅ | Auth tables, AI usage logs, user profiles |

### 2.4 Infrastructure
| Component | Status | Details |
|-----------|--------|---------|
| Supabase project | ✅ | Live, 12+ tables, RLS enabled |
| Neon database | ✅ | Live, 5 analytics tables |
| Render backend | ✅ | Deployed, healthy (supabase:true, neon:true) |
| Netlify frontend | ✅ | Deployed (pages returning 200) |
| 13 env vars on Render | ✅ | All API keys set |
| GitHub Actions CI | ✅ | Lint + build on push/PR to main |
| GitHub Actions Deploy | ✅ | Build → zip → POST to Netlify (token DENIED) |
| `opencode.json` | ✅ | AI context config |

### 2.5 Database Schema (Supabase)
| Table | Rows | Purpose |
|-------|------|---------|
| `opportunities` | **5** | Verified R&D opportunities |
| `news_articles` | **5** | Verified electronics news |
| `subscribers` | 0 | Email newsletter subscribers |
| `user_profiles` | 0 | Linked to `auth.users` |
| `saved_opportunities` | 0 | User bookmarks |
| `applications` | 0 | User applications with status |
| `user_alerts` | 0 | Keyword/category alerts |
| `ai_usage_log` | 0 | AI provider audit trail |
| `link_check_logs` | 0 | Link verification history |
| `opportunity_reports` | 0 | User-submitted issue reports |
| `suggestions` | 0 | User suggestions |
| `telegram_subscribers` | 0 | Telegram bot users |
| `calendar_exports` | 0 | ICS calendar export log |

### 2.6 Documentation
`docs/` (14 files), `documents/` (15 files incl. this one), plus `AUTH_SETUP.md`, `DASHBOARD_SUMMARY.md`, `REFACTOR_SUMMARY.md`.

---

## 3. What Is NOT Done ❌

### 3.1 Critical / High Priority
| Item | Priority | Notes |
|------|----------|-------|
| Netlify CD deploy token denied | 🔴 HIGH | `nfp_` token returns "Access Denied" |
| Fork push broken | 🔴 HIGH | `pogotunes/JobsAI` push 403 — PAT expired |
| Render deploy may be stale | 🔴 HIGH | Latest commit `4002b30` stuck in `update_in_progress` |
| No automated deploys | 🟡 MED | Netlify token + fork push both need fixing |
| No cron jobs active | 🟡 MED | Render free plan has no cron; scrapers, expiry, newsletter never run |
| Frontend detail pages fragile | 🟡 MED | Pre-built UUIDs only; new DB records = no detail pages until rebuild |

### 3.2 Medium Priority
| Item | Priority | Notes |
|------|----------|-------|
| Supabase Auth not configured | 🟡 MED | Needs Email/Google OAuth setup in Supabase dashboard |
| All user tables empty | 🟡 MED | Zero real users, profiles, saves, or applications |
| Scrapers never tested live | 🟡 MED | ISRO/DRDO/CSIR scrapers coded but never run on Render |
| No email delivery | 🟡 MED | Resend API key set, no cron triggers newsletter |
| No analytics data | 🟡 MED | Neon tables all zero — no monitoring possible |
| No Telegram notifications | 🟡 MED | Bot coded, not deployed |
| No link checking | 🟡 MED | Links never verified |
| No AI usage monitoring | 🟡 MED | `ai_usage_log` empty, no dashboard |
| Two codebases diverging | 🟡 MED | `electrobridge/` (Next 14) vs `ElectroBridge Web App Design/` (Next 15) |
| `.env.local` tracked in git | 🟡 RISK | Live keys committed |
| No package-lock in frontend | 🟡 RISK | Non-reproducible builds |

### 3.3 Low Priority
| Item | Notes |
|------|-------|
| Admin dashboard minimal | No analytics, user mgmt, moderation workflows |
| ICS calendar export | Table exists, no frontend button |
| Favorites page | Exists in main app, not ported |
| Categories page | Exists in main app, not ported |
| Resource guides (6) | Exist in main app, not ported |
| Password reset | No frontend page |
| Multi-language | Not started |
| PWA / offline | Not started |
| Dark mode | Not started |
| Rate limiter UX | Backend has it, no user-facing feedback |
| NVIDIA NIM integration | Documented, not implemented |

---

## 4. Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                        BROWSER                                   │
│  electrobridge.netlify.app (Next.js 15 static export)            │
│  ┌────────────────────────────────────────────────────────┐      │
│  │  Pages: /, /opportunities, /news, /orgs, /chat, ...   │      │
│  │  All data fetched client-side via fetch()              │      │
│  └──────────────────┬─────────────────────────────────────┘      │
│                     │ API calls via NEXT_PUBLIC_API_URL            │
│                     │ or _redirects proxy                         │
├─────────────────────┼────────────────────────────────────────────┤
│                     ▼                                            │
│  electrobridge-api.onrender.com (Express 5 + tsx)                │
│  ┌────────────────────────────────────────────────────────┐      │
│  │  /health                 → { status, services }        │      │
│  │  /api/opportunities      → verified-only CRUD          │      │
│  │  /api/news               → verified-only list/detail   │      │
│  │  /api/organizations      → verified orgs list/detail   │      │
│  │  /api/ai/*               → Chat, Match, Search, ...   │      │
│  │  /api/subscribe          → Email subscription          │      │
│  │  /api/admin/*            → Admin panel API             │      │
│  │  /api/scrape/*           → Cron-guarded scrapers      │      │
│  │  /api/newsletter/*       → Weekly digest               │      │
│  │                                                         │      │
│  │  AI Providers: Groq → Gemini → OpenRouter → HF         │      │
│  │  Scrapers: ISRO, DRDO, CSIR, RSS (18 sources)          │      │
│  │  Rate Limiter: 3 req/hr/IP for subscribe               │      │
│  └────┬────────────────────┬──────────────────────────────┘      │
│       │                    │                                       │
│       ▼                    ▼                                       │
│  ┌──────────────┐    ┌──────────────┐                             │
│  │  Supabase    │    │  Neon        │                             │
│  │  (primary)   │    │  (analytics) │                             │
│  │  12+ tables  │    │  5 tables    │                             │
│  └──────────────┘    └──────────────┘                             │
└──────────────────────────────────────────────────────────────────┘
```

---

## 5. API Surface

### Public Endpoints
| Method | Path | Auth | Verified Filter |
|--------|------|------|----------------|
| GET | `/health` | None | — |
| GET | `/api/opportunities` | None | ✅ `eq('verification_status', 'verified')` |
| GET | `/api/opportunities/:id` | None | ✅ `eq('verification_status', 'verified')` |
| GET | `/api/news` | None | ✅ `eq('is_verified', true)` |
| GET | `/api/news/:slug` | None | ✅ `eq('is_verified', true)` |
| GET | `/api/organizations` | None | ✅ `eq('verification_status', 'verified')` |
| GET | `/api/organizations/:slug` | None | ✅ `eq('verification_status', 'verified')` |
| POST | `/api/subscribe` | None | — |
| POST | `/api/ai/chat` | None | — |
| POST | `/api/ai/match` | None | ✅ on matched opportunities |
| GET | `/api/ai/search` | None | ✅ `eq('verification_status', 'verified')` |

### Protected Endpoints
| Method | Path | Auth |
|--------|------|------|
| POST | `/api/opportunities` | Admin |
| PATCH | `/api/opportunities/:id` | Admin |
| DELETE | `/api/opportunities/:id` | Admin |
| POST | `/api/admin/*` | Admin |

### Cron Endpoints (require `CRON_SECRET`)
`/api/scrape/*`, `/api/newsletter/*`, `/api/ai/expire`

---

## 6. Seed Data

**Opportunities** (5 verified, all with future deadlines):
1. VLSI Design Engineer Intern — Intel India R&D (Jul 31)
2. JRF VLSI Design — IISc Bangalore (Jul 30)
3. Research Intern Embedded Systems — TIFR Mumbai (Jul 25)
4. Embedded Systems Engineer EV — Tata Motors Pune (Jul 20)
5. Research Intern RF & Microwave — ISRO SAC Ahmedabad (Jul 15)

**News** (5 verified):
1. India Semiconductor Mission ₹76,000 Cr incentive
2. Chandrayaan-4 cabinet approval ₹2,104 Cr
3. IISc cryogenic quantum processor
4. DRDO hypersonic scramjet test
5. IIT Bombay & Intel AI research lab

---

## 7. Deployment Status

| Component | Status | URL |
|-----------|--------|-----|
| Frontend | ✅ LIVE | `https://electrobridge.netlify.app` |
| Backend | ✅ LIVE | `https://electrobridge-api.onrender.com` (health: OK) |
| Supabase | ✅ LIVE | Project active, tables exist |
| Neon | ✅ LIVE | Connected via DATABASE_URL |
| CI | ✅ Configured | GitHub Actions: lint + build on push/PR |
| CD | ❌ BROKEN | Netlify deploy token denied |

### Health Check
```json
GET /health → 200
{"status":"healthy","services":{"supabase":true,"neon":true}}
```

### Environment Variables (13 on Render)
`SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `DATABASE_URL`, `GROQ_API_KEY`, `GEMINI_API_KEY`, `OPENROUTER_API_KEY`, `HUGGINGFACE_API_KEY`, `RESEND_API_KEY`, `CRON_SECRET`, `CORS_ORIGIN`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NODE_VERSION`

---

## 8. Repository Structure

```
/workspaces/JobsAI/
├── electrobridge/                          ← MAIN APP (Next.js 14, full-featured)
│   ├── src/app/                            ← 36 pages + 27 API routes
│   ├── src/components/                     ← 28 UI components
│   ├── src/lib/ (AI, scrapers, supabase)   ← 25 module files
│   └── supabase/migrations/                ← 6 incremental migrations
│
├── ElectroBridge Web App Design/           ← FIGMA REDESIGN (Next.js 15 + Express 5)
│   ├── frontend/                           ← Active Netlify deploy (26 pages, 9 components)
│   ├── backend/                            ← Active Render deploy (8 route files, AI, scrapers)
│   ├── shared/                             ← Types, constants, utils
│   └── documents/                          ← 15 design/deployment docs
│
├── docs/                                   ← 14 project docs
├── supabase/                               ← Root Supabase config + 3 base migrations
└── .github/workflows/                      ← CI + Deploy workflows
```

### File Count by Area
| Area | Files |
|------|-------|
| Backend (Express 5 routes) | 8 |
| Backend (AI modules) | 7 |
| Backend (scrapers) | 9 |
| Backend (migrations) | 4 |
| Frontend (pages) | 26 |
| Frontend (components) | 9 |
| Frontend (lib) | 3 |
| Main app (pages) | 36+ |
| Main app (API routes) | 27 |
| Main app (components) | 28 |
| Main app (lib modules) | 25 |
| Documentation | 20+ |
| Migrations (all) | 9 |
| CI/CD | 2 |

---

## 9. Known Issues & Risks

| Issue | Severity | Workaround |
|-------|----------|------------|
| Netlify token denied | 🔴 BLOCKER | Generate new `nfp_` token or switch deploy method |
| Fork push 403 | 🔴 BLOCKER | Replace PAT; pushes to origin work |
| Render tsc build fails | 🟡 WORKAROUND | Using `npx tsx` — works but non-standard |
| generateStaticParams hardcoded UUIDs | 🟡 FRAGILE | Rebuild needed when DB records change |
| Two app codebases diverging | 🟡 RISK | Manual sync needed |
| .env.local in git history | 🟡 RISK | Keys exposed; use `git filter-branch` to clean |
| No package-lock.json in frontend | 🟡 RISK | Run `npm install --package-lock-only` |

---

## 10. Immediate Next Steps

| Priority | Action |
|----------|--------|
| 🔴 1 | Generate new Netlify deploy token |
| 🔴 2 | Fix fork PAT for `pogotunes/JobsAI` |
| 🔴 3 | Verify Render deploy completed for commit `4002b30` |
| 🟡 4 | Configure Supabase Auth (Email + Google OAuth) |
| 🟡 5 | Set up cron-job.org or Render cron for scrapers |
| 🟡 6 | Rebuild + redeploy frontend after auth setup |
| 🟡 7 | Add more seed/verified data |
| 🟡 8 | Automate frontend rebuild when new DB records appear |
| 🟢 9 | Port remaining pages from main app (categories, favorites, resources) |
| 🟢 10 | Connect analytics dashboard to Neon tables |
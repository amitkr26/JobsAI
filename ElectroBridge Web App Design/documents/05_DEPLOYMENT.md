# Deployment

## Target Platform

| Component | Platform | Configuration |
|-----------|----------|--------------|
| Frontend | Netlify | Next.js App Router, ISR, SSR |
| Backend | Render | Express/Fastify API, Docker |
| Database | Supabase + Neon | PostgreSQL managed |
| Email | Resend | Transactional + newsletter |
| Domain | Netlify DNS | electrobridge.com |

## Frontend Deployment (Netlify)

### Build Settings
```
Base directory: frontend/
Build command: npm run build
Publish directory: frontend/.next
Node version: 20.x
```

### Netlify Configuration (netlify.toml)
```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[[redirects]]
  from = "/api/*"
  to = "/api/:splat"
  status = 200
```

### Environment Variables
Set via Netlify dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_ADMIN_PASSWORD`

## Backend Deployment (Render)

### Web Service
```
Name: electrobridge-api
Runtime: Docker / Node
Build Command: npm install && npm run build
Start Command: npm start
Health Check Path: /health
```

### Cron Jobs (Render Cron)
```
Schedule 1: 0 6 * * * → /api/scrape?mode=all
Schedule 2: 0 12 * * * → /api/check-links
Schedule 3: 0 3 * * 0 → /api/send-digest
```

### Background Workers
```
Name: electrobridge-worker
Type: Background Worker
Command: npm run worker
```

## Database Setup

### Supabase
1. Create project at supabase.com
2. Run migration files in order
3. Enable RLS policies
4. Set up auth providers (email/password)

### Neon
1. Create project at neon.tech
2. Run schema migrations
3. Set up connection pooling

## CI/CD

### GitHub Actions
- On push to main: build + lint + test
- On PR: build + lint + typecheck
- On tag: deploy to production

### Branch Strategy
- `main` → production
- `develop` → staging
- `feature/*` → feature branches

## Vercel Migration Notes

Removed from legacy:
- `vercel.json` — replaced with Netlify config
- Vercel Edge Functions — replaced with Netlify Functions
- Vercel Cron — replaced with Render Cron
- Vercel-specific env vars — replaced with Netlify/Render equivalents

## Monitoring

- Netlify analytics for frontend
- Render dashboard for backend
- Supabase dashboard for database
- Plausible analytics for user tracking
- Sentry for error tracking (future)

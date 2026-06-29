# TASKS.md — ElectroBridge Next Steps
**OpenCode ko ye file + MASTER_CONTEXT.md dono deni hain.**

---

## ✅ COMPLETED

### Task 1 — Toast Notification System
sonner installed (`^2.0.7`), `<Toaster />` in layout.tsx. Toasts on subscribe, report issue, contact form, admin edit/add.

### Task 2 — Error & Not-Found Pages
- `src/app/not-found.tsx` — custom 404
- `src/app/error.tsx` — global error boundary with Try again + Go home
- `src/app/opportunities/[slug]/not-found.tsx` — "Opportunity not found or has expired"
- `src/app/news/[slug]/not-found.tsx` — "Article not found"

### Task 3 — Loading States
- `LoadingSkeleton.tsx` component created
- `src/app/opportunities/loading.tsx` — 6-card grid skeleton
- `src/app/news/loading.tsx` — 6-card grid skeleton
- `src/app/opportunities/[slug]/loading.tsx` — full page skeleton
- `src/app/chat/loading.tsx` — text skeleton

### Task 6 — Fix Double Font Loading
Removed Google Fonts `@import` from `globals.css`. Fonts now load only via `next/font` in layout.tsx.

### Task 7 — Admin Add Opportunity Form
Already existed as inline "Add New" tab in admin dashboard. No extra page needed.

### Task 8 — Admin Edit & Delete Opportunity
- `src/app/admin/edit-opportunity/[id]/page.tsx` — pre-filled edit form
- Soft delete (sets `is_active = false`) with confirm dialog
- Edit button added to admin opportunities table

### Task 9 — Admin Add News Manually
- `src/app/admin/add-news/page.tsx` — form with auto-slug generation
- Link button in admin dashboard ("Add News")
- Insert into `news_articles` table

### Task 10 — SEO Fix Metadata
- `src/app/chat/layout.tsx` — "AI Career Assistant — ElectroBridge"
- `src/app/match/layout.tsx` — "AI Opportunity Match — ElectroBridge"
- `src/app/organizations/page.tsx` — "Organizations — ElectroBridge"
- About page, opp detail, news detail already had proper metadata

### Task 11 — Input Validation
- `/api/subscribe`: email regex validation + trim + lowercase + duplicate check
- `/api/report-issue`: UUID format check + 500-char description limit

---

## 🔜 PENDING (need manual action)

### Task 4 — AI Features: Enable Groq (Free Tier)
**You do this:**
1. Go to https://console.groq.com → Sign up free → Create API key
2. Add to Vercel: `GROQ_API_KEY=your_key_here`
3. Optionally Gemini: https://aistudio.google.com → `GEMINI_API_KEY=your_key`

The provider chain in `src/lib/ai/providers.ts` is already built. Just add the env var.

### Task 5 — Email Digest: Enable Resend (Free Tier)
**You do this:**
1. Go to https://resend.com → Sign up free (3,000 emails/month)
2. Create API key
3. Add to Vercel: `RESEND_API_KEY=your_key`
4. Add to Vercel: `FROM_EMAIL=noreply@electrobridge.vercel.app`

### Task 12 — Set up Telegram Bot
1. Create bot via @BotFather on Telegram
2. Add `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHANNEL_ID` to Vercel env
3. The posting logic is already built in `src/lib/telegram-bot.ts`

---

## 📋 NEW TASKS

### Task 13 — Fix .env.local Git Security Issue
- Rotate `SUPABASE_SERVICE_ROLE_KEY` in Supabase dashboard
- Add `electrobridge/.env.local` to root `.gitignore`
- Remove file from git tracking: `git rm --cached electrobridge/.env.local`
- Add a `.env.example` with placeholder values

### Task 14 — Update MASTER_CONTEXT.md
- [Auto-done by OpenCode] Reflect completed tasks and current file structure

---

*Tasks 4-5 need free account signups — do them yourself, then tell OpenCode.*
*Tasks 12-13 are manual/ops tasks.*

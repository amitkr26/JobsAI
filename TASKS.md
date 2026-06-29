# TASKS.md — ElectroBridge
**OpenCode ko MASTER_CONTEXT.md ke saath ye file bhi deni hai.**
**Updated:** June 2026 (v2 — post audit fixes)

---

## ALREADY DONE (don't redo these)

- Sonner toast on subscribe, report, contact
- error.tsx + not-found.tsx + route-level 404s
- loading.tsx files (chat, news, opportunities, opportunities/[slug])
- Google Fonts double loading fixed
- Email validation + UUID check + 500-char limit
- SEO metadata: chat, match, organizations pages
- Admin: edit/delete opportunity
- Admin: add news

---

## TASK S1 — Fix .env.local Security (YOU DO THIS, NOT OPENCODE — DO TODAY)

Run in terminal inside JobsAI repo:
  echo "electrobridge/.env.local" >> .gitignore
  git rm --cached electrobridge/.env.local
  git commit -m "Remove .env.local from tracking"
  git push

Then in Vercel Dashboard > Settings > Environment Variables:
- Change NEXT_PUBLIC_ADMIN_PASSWORD to something strong
- Change CRON_SECRET to something random

Also: Supabase Dashboard > Settings > API > Regenerate service_role key > update in Vercel.

YOUR FULL DATABASE ADMIN KEY IS PUBLICLY VISIBLE ON GITHUB RIGHT NOW.

---

## TASK S2 — Enable AI (YOU sign up, then tell OpenCode)

Go to https://console.groq.com > Sign up free > Create API key
Add to Vercel: GROQ_API_KEY=your_key

Then tell OpenCode:
"I added GROQ_API_KEY to Vercel. Check src/lib/ai/providers.ts — verify GROQ_API_KEY is read
from process.env and the model name is current (use llama3-8b-8192 or mixtral-8x7b-32768).
Then test /chat page — a message should get an AI response."

---

## TASK S3 — Enable Email Digest (YOU sign up, then tell OpenCode)

Go to https://resend.com > Sign up free (3000 emails/month)
Add to Vercel: RESEND_API_KEY=your_key
Add to Vercel: FROM_EMAIL=onboarding@resend.dev

Then tell OpenCode:
"I added RESEND_API_KEY and FROM_EMAIL to Vercel. Check src/lib/email-digest.ts — verify
both env vars are read correctly. FROM_EMAIL should fallback to onboarding@resend.dev.
Test by calling: POST /api/send-digest with Authorization: Bearer YOUR_CRON_SECRET"

---

## TASK S4 — Enable Telegram (YOU set up, then tell OpenCode)

Open Telegram > @BotFather > /newbot > copy token
Add to Vercel: TELEGRAM_BOT_TOKEN=your_token
Create channel > add bot as admin > get channel ID
Add to Vercel: TELEGRAM_CHANNEL_ID=@yourchannel

Then tell OpenCode:
"I added TELEGRAM_BOT_TOKEN and TELEGRAM_CHANNEL_ID to Vercel.
Check src/lib/telegram-bot.ts — verify it works.
Wire it so adding a new opportunity via admin panel auto-posts to Telegram channel."

---

## TASK 1 — Fix sitemap.ts (15 min) — TELL OPENCODE THIS:

"Please fix src/app/sitemap.ts.
It currently creates its own Supabase client inline instead of using the shared one.
Change it to import supabaseAdmin from @/lib/supabase.
If isConfigured is false, return only static URLs."

---

## TASK 2 — Add New Opportunity Page in Admin (45 min) — TELL OPENCODE THIS:

"Create src/app/admin/add-opportunity/page.tsx

Must use same admin password check as admin/page.tsx or admin/edit-opportunity/[id]/page.tsx.

Form fields:
- title (required), organization (required)
- category (select: JRF / SRF / PhD / Postdoc / Fellowship / Govt Job / Private Job / Internship / Project Associate)
- location, stipend, deadline (optional date — empty = rolling), description, apply_link
- official_page_url (required)
- tags (comma-separated text, save as text[])
- verification_status (select: pending / verified / link_unavailable, default: pending)

On submit: INSERT into opportunities using supabaseAdmin, is_active: true, posted_at: now()
On success: toast.success('Opportunity added!') + clear form
On error: toast.error(error.message)

Add 'Add New Opportunity' button in admin/page.tsx linking to /admin/add-opportunity"

---

## TASK 3 — Rate Limiting (30 min) — TELL OPENCODE THIS:

"Add rate limiting to two routes:

1. src/app/api/subscribe/route.ts:
   Max 3 requests per IP per hour using a Map<string, {count: number, resetAt: number}>
   Get IP from request.headers.get('x-forwarded-for') || 'unknown'
   If exceeded: return 429 with message 'Too many requests. Try again later.'

2. src/app/api/scrape/route.ts:
   Should only run if Authorization header contains valid CRON_SECRET
   Look at check-links/route.ts to see how CRON_SECRET is validated there — replicate that pattern
   If invalid: return 401"

---

## TASK 4 — ISR for Detail Pages (20 min) — TELL OPENCODE THIS:

"Add Incremental Static Regeneration to opportunity and news detail pages.

In src/app/opportunities/[slug]/page.tsx add:
  export const revalidate = 3600

Also add generateStaticParams() that fetches all opportunity slugs/ids from supabase
and returns array of { slug: '...' } for pre-rendering at build time.

In src/app/news/[slug]/page.tsx add:
  export const revalidate = 1800

Same generateStaticParams() for news slugs."

---

## TASK 5 — Fix Homepage Stats Count (15 min) — TELL OPENCODE THIS:

"Check src/components/StatsBar.tsx and src/app/page.tsx.
Homepage shows '10 active opportunities' but DB has 28.

The correct query for active opportunity count is:
  .from('opportunities')
  .select('*', { count: 'exact', head: true })
  .eq('is_active', true)
  .or('deadline.gte.' + new Date().toISOString() + ',deadline.is.null')

Fix StatsBar to use this query and show the real count.
Also verify JRF count and PhD count queries are using .eq('category', 'JRF') etc correctly."

---

## TASK 6 — Plausible Analytics (10 min) — TELL OPENCODE THIS:

"Add Plausible analytics to src/app/layout.tsx.
Add in the head section using next/script with strategy='afterInteractive':
  <Script defer data-domain='electrobridge.vercel.app' src='https://plausible.io/js/script.js' />

Import Script from 'next/script'."

(Sign up at plausible.io first — 30 day free trial, no credit card)

---

## OPENCODE SESSION START — ALWAYS USE THIS:

"Read MASTER_CONTEXT.md and TASKS.md from the project root before writing any code.
Tell me what you understood about the current project state, then I will tell you which task to start."

---

## PRIORITY ORDER:
S1 (security — you, today) > Task 2 (add opp) > Task 5 (stats fix) > Task 1 (sitemap) >
S2 (groq signup) > Task 4 (ISR) > Task 3 (rate limit) > S3 (resend) > S4 (telegram) > Task 6
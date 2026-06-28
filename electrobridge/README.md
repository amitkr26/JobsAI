# ElectroBridge

Your gateway to electronics & semiconductor opportunities. Aggregate job postings, JRF/PhD positions, government research jobs, technology news, and industry trends — all in one place.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

## Getting Started

### 1. Clone and Install

```bash
npm install
```

### 2. Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the schema from `supabase-schema.sql`:

```sql
-- Opportunities table
create table opportunities (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  organization text not null,
  category text not null,
  location text,
  stipend text,
  deadline date,
  eligibility text,
  description text,
  apply_link text,
  source_url text,
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  tags text[]
);

-- News articles table
create table news_articles (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  summary text,
  source text,
  source_url text,
  published_at timestamp with time zone,
  image_url text,
  tags text[],
  created_at timestamp with time zone default now()
);

-- Email subscribers table
create table subscribers (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  keywords text[],
  categories text[],
  created_at timestamp with time zone default now(),
  is_active boolean default true
);

-- Enable RLS
alter table opportunities enable row level security;
alter table news_articles enable row level security;
alter table subscribers enable row level security;

-- Saved bookmarks (requires Supabase Auth)
create table saved_opportunities (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id),
  opportunity_id uuid references opportunities(id),
  created_at timestamp with time zone default now()
);

alter table saved_opportunities enable row level security;

create policy "Users can manage own bookmarks" on saved_opportunities
  for all using (auth.uid() = user_id);

-- Public read access
create policy "Public can read opportunities" on opportunities for select using (true);
create policy "Public can read news" on news_articles for select using (true);
create policy "Anyone can subscribe" on subscribers for insert with check (true);
```

3. Copy your **Project URL**, **anon key**, and **service_role key** from Settings → API.

### 3. Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_ADMIN_PASSWORD=electrobridge2026
CRON_SECRET=mysecretcron2026
```

### 4. Seed Data

Visit `/api/seed` in your browser to load 10 seed opportunities, or call:

```bash
curl https://your-domain.vercel.app/api/seed
```

### 5. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project from GitHub
3. Add environment variables (same as `.env.local`)
4. Deploy

## Admin Panel

Access `/admin` with password (default: `electrobridge2026`).

Features:
- Add/edit/expire opportunities
- View subscribers
- Trigger RSS news scrape

## RSS News Scraper

The `/api/scrape` endpoint fetches news from:
- IEEE Spectrum
- EE Times
- Semiconductor Engineering
- Electronics Weekly
- The Hindu Science

Schedule it via Supabase cron or any cron service:

```bash
curl -H "Authorization: Bearer YOUR_CRON_SECRET" https://your-domain.vercel.app/api/scrape
```

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/opportunities` | GET | List opportunities (with filters) |
| `/api/opportunities` | POST | Create opportunity (service role) |
| `/api/opportunities/[id]` | GET | Get single opportunity |
| `/api/opportunities/[id]` | PATCH | Update opportunity |
| `/api/opportunities/[id]` | DELETE | Delete opportunity |
| `/api/news` | GET | List news articles |
| `/api/subscribe` | POST | Subscribe email |
| `/api/subscribe?email=` | DELETE | Unsubscribe |
| `/api/scrape` | GET | Trigger RSS scrape |
| `/api/seed` | GET | Seed database with sample data |

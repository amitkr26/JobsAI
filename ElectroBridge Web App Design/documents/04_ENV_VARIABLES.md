# Environment Variables

## Frontend (Netlify — Next.js)

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✓ | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✓ | Supabase anonymous key |
| `NEXT_PUBLIC_SITE_URL` | | Site URL for OG images |
| `NEXT_PUBLIC_ADMIN_PASSWORD` | | Admin panel password |

## Backend (Render)

| Variable | Required | Description |
|----------|----------|-------------|
| `SUPABASE_URL` | ✓ | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | ✓ | Supabase service role key |
| `NEON_DATABASE_URL` | ✓ | Neon PostgreSQL connection string |
| `RESEND_API_KEY` | ✓ | Resend email API key |
| `FROM_EMAIL` | ✓ | Sender email address |
| `CRON_SECRET` | ✓ | Secret for protecting cron endpoints |
| `GROQ_API_KEY` | ✓ | Groq AI API key |
| `GEMINI_API_KEY` | ✓ | Google Gemini API key |
| `OPENROUTER_API_KEY` | | OpenRouter API key (fallback) |
| `TELEGRAM_BOT_TOKEN` | | Telegram bot token |
| `TELEGRAM_CHANNEL_ID` | | Telegram channel ID |
| `NODE_ENV` | | Environment (development/production) |
| `LOG_LEVEL` | | Logging level (info, debug, error) |

## Local Development (.env.local)

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Database
NEON_DATABASE_URL=your_neon_connection_string

# Email
RESEND_API_KEY=re_your_key
FROM_EMAIL=hello@electrobridge.com

# AI
GROQ_API_KEY=gsk_your_key
GEMINI_API_KEY=your_gemini_key
OPENROUTER_API_KEY=your_openrouter_key

# Cron
CRON_SECRET=your_cron_secret

# Admin
NEXT_PUBLIC_ADMIN_PASSWORD=electrobridge2026

# Telegram (optional)
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHANNEL_ID=@your_channel

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Security Notes

- NEVER commit `.env.local` or any `.env` file to version control
- Rotate keys regularly
- Use separate keys for development and production
- Supabase anon key is public (safe for client-side usage)
- Service role key must NEVER be exposed client-side
- API keys should be restricted to specific origins where possible

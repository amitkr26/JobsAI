# Security Checklist

## Environment & Secrets

- [ ] No secrets committed to version control
- [ ] `.env.local` in `.gitignore`
- [ ] Environment variables set via platform dashboard (Netlify, Render)
- [ ] API keys restricted to specific origins where possible
- [ ] Service role keys never exposed to client
- [ ] Cron secret protects automated endpoints

## Authentication (Supabase Auth)

- [ ] Email/password auth enabled
- [ ] Password reset flow secure
- [ ] Session management (JWT expiration, refresh)
- [ ] Rate limiting on auth endpoints
- [ ] No sensitive data in auth tokens

## Row-Level Security (Supabase)

- [ ] All tables have RLS enabled
- [ ] Public tables: read-only for opportunities, news
- [ ] User tables: users can only read/write own data
- [ ] Admin tables: service-role-only access
- [ ] Subscriber table: insert-only for public
- [ ] Report/suggestion tables: insert-only for public
- [ ] RLS policies tested with different roles

## API Security

- [ ] All API endpoints validate input
- [ ] Rate limiting on public endpoints (subscribe: 3/IP/hr)
- [ ] Admin endpoints password-protected
- [ ] Cron endpoints secret-protected
- [ ] CORS configured correctly
- [ ] Request size limits
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (React auto-escapes, content-security-policy)

## Frontend Security

- [ ] Content Security Policy headers
- [ ] XSS prevention (no dangerouslySetInnerHTML)
- [ ] Secure cookie handling (httpOnly, secure, sameSite)
- [ ] Sanitize user-generated content if any
- [ ] Proper iframe/embed policies
- [ ] No inline scripts in production

## Backend Security

- [ ] Input validation on all endpoints
- [ ] Rate limiting on scrapers (respect robots.txt)
- [ ] Timeout handling for external API calls
- [ ] Error messages don't leak internals
- [ ] Logging without sensitive data
- [ ] Dependency vulnerability scanning

## Deployment Security

- [ ] HTTPS enforced (Netlify + Render)
- [ ] SSL certificates valid and auto-renewing
- [ ] DDoS protection (Netlify edge + Cloudflare if needed)
- [ ] Security headers configured:
  - [ ] Strict-Transport-Security
  - [ ] X-Content-Type-Options
  - [ ] X-Frame-Options
  - [ ] X-XSS-Protection
  - [ ] Referrer-Policy
  - [ ] Permissions-Policy

## Data Privacy

- [ ] User email stored securely
- [ ] Unsubscribe mechanism present in all emails
- [ ] Data retention policy documented
- [ ] User data export capability
- [ ] User data deletion capability
- [ ] No tracking cookies without consent (if applicable)
- [ ] GDPR compliance basics (if EU users)

## Operational Security

- [ ] Regular dependency updates
- [ ] Vulnerability scanning (npm audit)
- [ ] Backup strategy for databases
- [ ] Incident response plan
- [ ] Monitoring for suspicious activity
- [ ] Access review for admin panel

## AI Provider Security

- [ ] API keys stored securely as environment variables
- [ ] Rate limiting on AI endpoints
- [ ] Content filtering for AI inputs/outputs
- [ ] No PII sent to AI providers
- [ ] Usage logging for audit

## Audit Items (Pre-Launch)

- [ ] Full dependency audit (`npm audit`)
- [ ] RLS policy review
- [ ] API endpoint penetration test (basic)
- [ ] Auth flow review
- [ ] Environment variable audit
- [ ] Build output inspection (no leaked secrets)
- [ ] Security headers verified

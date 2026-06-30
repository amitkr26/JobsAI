# Known Bugs & Issues

## Figma Export Issues (src/)

| # | Issue | File | Severity | Status |
|---|-------|------|----------|--------|
| 1 | Monolithic App.tsx (1395 lines) — impossible to maintain | src/app/App.tsx | High | Will be rewritten |
| 2 | State-based routing instead of URL routing | src/app/App.tsx | High | Will be replaced |
| 3 | Mock data only — no real API integration | src/app/App.tsx | High | Will be replaced |
| 4 | No error handling or loading states | src/app/App.tsx | Medium | Will be added |
| 5 | No accessibility attributes (aria-*) | src/app/App.tsx | Medium | Will be added |
| 6 | Hardcoded colors instead of CSS variables | src/app/App.tsx | Medium | Will use theme |
| 7 | No TypeScript strict usage | src/app/App.tsx | Medium | Will enforce strict |
| 8 | No responsive testing done | All | Medium | Will test mobile-first |
| 9 | shadcn/ui components imported but unused | src/app/components/ui/ | Low | Will use in rebuild |

## Legacy Codebase Issues (electrobridge/)

| # | Issue | File | Severity | Status |
|---|-------|------|----------|--------|
| 1 | Too many AI providers (5) increasing complexity | src/lib/ai/providers.ts | Medium | Will reduce to 3 |
| 2 | Vercel-specific dependencies | vercel.json, next.config.mjs | Medium | Will migrate |
| 3 | Telegram integration with no usage | src/lib/telegram-bot.ts | Low | Will remove |
| 4 | Mixed server/client component patterns | Multiple | Medium | Will standardize |
| 5 | No test coverage | — | High | Will add tests |

## Migration Risks

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|------------|--------|------------|
| 1 | Data loss during schema migration | Low | High | Backup before migration; test on copy |
| 2 | AI provider API changes | Medium | Medium | Use abstraction layer with fallback |
| 3 | Broken scrapers (source HTML changes) | Medium | High | Add scraper health monitoring |
| 4 | Build/deployment configuration errors | Medium | Medium | CI/CD pipeline with staging env |
| 5 | Missing edge cases in UI rebuild | Medium | Medium | Component inventory checklist |
| 6 | Supabase RLS policy errors | Low | High | Test RLS policies thoroughly |

## Open Items

- [ ] Determine if Sentry should be added for error tracking
- [ ] Decide on analytics provider (Plausible vs PostHog vs custom)
- [ ] Confirm domain and DNS migration plan
- [ ] SSL certificate provisioning

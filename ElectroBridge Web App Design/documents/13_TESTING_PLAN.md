# Testing Plan

## Testing Levels

### 1. TypeScript Compilation
- **Tool:** `tsc --noEmit`
- **Scope:** All frontend, backend, and shared code
- **Frequency:** Every build, CI pipeline
- **Standard:** Strict mode, no `any` (exceptions documented)

### 2. Linting
- **Tool:** ESLint (Next.js config)
- **Scope:** All TypeScript/TSX files
- **Rules:** `next/core-web-vitals`, custom strict rules
- **Frequency:** Every PR, pre-commit

### 3. Unit Testing (Future)
- **Tool:** Vitest
- **Scope:** Utility functions, API handlers, AI logic, scrapers
- **Target:** 80%+ coverage on shared utilities

### 4. Component Testing (Future)
- **Tool:** React Testing Library + Vitest
- **Scope:** All interactive components
- **Focus:** States (loading, empty, error, edge cases)

### 5. API Integration Testing (Future)
- **Tool:** Supertest or Postman/Newman
- **Scope:** All backend API endpoints
- **Focus:** Response shapes, status codes, auth, validation

### 6. E2E Testing (Future)
- **Tool:** Playwright
- **Scope:** Critical user flows
- **Flows:**
  - Browse opportunities → view detail → save
  - Search → filter → view
  - Subscribe → confirm email
  - Admin login → CRUD opportunity

## Current Test Status

- **Frontend:** No tests yet (new project)
- **Backend:** No tests yet (new project)
- **Legacy:** No test infrastructure exists

## Testing Priorities (MVP)

| Priority | What to Test | Why |
|----------|-------------|-----|
| P0 | TypeScript strict compilation | Catch type errors before runtime |
| P0 | API endpoints (manual + integration) | Core data flow must work |
| P0 | Auth flow (login, register, protected routes) | Security critical |
| P1 | Scraper output validation | Data quality |
| P1 | RLS policies | Data security |
| P1 | AI provider fallback chain | Reliability |
| P2 | Email delivery (Resend) | User communication |
| P2 | Cron job execution | Data freshness |
| P3 | Responsive UI (mobile, tablet, desktop) | UX quality |
| P3 | Accessibility (keyboard, screen reader) | Compliance |

## QA Checklist (per Phase)

After each development phase, verify:

- [ ] TypeScript compiles without errors (`tsc --noEmit`)
- [ ] No lint warnings (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] No broken imports
- [ ] No dead code or unused components
- [ ] All new components have proper TypeScript types
- [ ] Error boundaries implemented for client components
- [ ] Loading states present for async operations
- [ ] Empty states handled for list components
- [ ] Mobile responsiveness checked
- [ ] Dark theme consistency
- [ ] No console errors in development
- [ ] API responses match expected shape

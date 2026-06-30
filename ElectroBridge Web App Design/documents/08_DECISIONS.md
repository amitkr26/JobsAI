# Architectural Decisions

## ADR-001: Next.js App Router over Vite/React SPA

- **Status:** Accepted
- **Context:** Figma export uses Vite + React with state-based screen switching. Need proper routing.
- **Decision:** Use Next.js App Router for file-based routing, SSR, ISR, and server components.
- **Rationale:** Better SEO, proper URL routing, server-side data fetching, ISR for opportunity/news pages.
- **Consequences:** Must rebuild routing from scratch; cannot reuse state-based screen navigation.

## ADR-002: Supabase + Neon Dual Database

- **Status:** Accepted
- **Context:** Legacy uses only Supabase. Need separation of concerns for user data vs analytics.
- **Decision:** Supabase for auth + user data; Neon for scraping ingestion + analytics.
- **Rationale:** Prevents analytics queries from impacting user-facing performance; scales independently.
- **Consequences:** Dual connection management; data synchronization between systems.

## ADR-003: Reduce AI Providers to 3

- **Status:** Accepted
- **Context:** Legacy has 5 AI providers (Groq, Gemini, OpenRouter, Cloudflare AI, HuggingFace).
- **Decision:** Keep only Groq, Gemini, OpenRouter. Remove Bedrock, NIM, Cloudflare, HuggingFace.
- **Rationale:** Reduce complexity; 3 providers provide sufficient fallback; removed providers had low usage.
- **Consequences:** Need to refactor AI orchestration; remove provider-specific code.

## ADR-004: Netlify over Vercel

- **Status:** Accepted
- **Context:** Legacy deploys on Vercel with vercel.json, Vercel Cron, Vercel Edge Functions.
- **Decision:** Migrate to Netlify for frontend, Render for backend.
- **Rationale:** Cost optimization; better cron job support on Render; remove vendor lock-in.
- **Consequences:** Must rewrite deployment config; replace Edge Functions with Netlify Functions or backend APIs.

## ADR-005: Mobile-First Design

- **Status:** Accepted
- **Context:** Figma design appears desktop-focused. Production needs mobile support.
- **Decision:** Implement mobile-first responsive design using Tailwind breakpoints.
- **Rationale:** Target audience includes students who primarily use mobile devices.
- **Consequences:** May need to redesign some desktop-oriented layouts for mobile.

## ADR-006: Monorepo Structure

- **Status:** Accepted
- **Context:** Previous structure was flat. Need clear separation.
- **Decision:** Organize into frontend/, backend/, shared/, documents/, scripts/.
- **Rationale:** Clean separation of concerns; shared types between frontend and backend; easier CI/CD.
- **Consequences:** Need to set up proper tsconfig paths for shared imports.

## ADR-007: Remove Telegram Integration

- **Status:** Accepted
- **Context:** Legacy has telegram_subscribers table and Telegram bot integration.
- **Decision:** Remove Telegram integration from initial build. Portal-only for launch.
- **Rationale:** Reduces complexity for MVP; low usage of Telegram features.
- **Consequences:** Can be added later as a separate feature if needed.

## ADR-008: Rewrite UI, Reuse Logic

- **Status:** Accepted
- **Context:** Figma has new UI design; legacy has working backend logic.
- **Decision:** Rewrite all UI components from Figma design; port backend logic, types, and utilities from legacy.
- **Rationale:** Figma design represents the new product vision; legacy UI was not designed by the same system.
- **Consequences:** Cannot directly copy any UI components; must port business logic carefully.

## ADR-009: ISR for Content Pages

- **Status:** Accepted
- **Context:** Opportunities and news pages change regularly but not constantly.
- **Decision:** Use ISR (Incremental Static Regeneration) with revalidation: opportunities 3600s, news 1800s.
- **Rationale:** Good balance of freshness and performance; reduces database load.
- **Consequences:** Pages may be up to 1 hour stale; acceptable for this use case.

## ADR-010: State Management

- **Status:** Accepted
- **Context:** Need to manage UI state across the application.
- **Decision:** Use React Server Components for data fetching, client components for interactivity. No global state library. Use URL search params for filter/search state.
- **Rationale:** Server Components reduce client JS; URL state is shareable and bookmarkable.
- **Consequences:** Filters and search state are in URL; may need context for some client-side state.

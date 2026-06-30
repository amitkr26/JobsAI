# ElectroBridge — Start Here

## Project Overview

ElectroBridge is a production-grade AI-powered platform for electronics, semiconductor, VLSI, research, fellowship, PhD, government job, and private job opportunity aggregation.

The platform aggregates opportunities from multiple sources, verifies them, filters irrelevant data, and presents them in a searchable AI-powered dashboard.

## Quick Links

| Document | Purpose |
|----------|---------|
| [01_MASTER_CONTEXT.md](./01_MASTER_CONTEXT.md) | Full project context, goals, and scope |
| [02_ARCHITECTURE.md](./02_ARCHITECTURE.md) | System architecture and tech stack |
| [03_DATABASE_SCHEMA.md](./03_DATABASE_SCHEMA.md) | Database schema design |
| [04_ENV_VARIABLES.md](./04_ENV_VARIABLES.md) | Environment variables reference |
| [05_DEPLOYMENT.md](./05_DEPLOYMENT.md) | Deployment configuration |
| [06_TASK_TRACKER.md](./06_TASK_TRACKER.md) | Current and planned tasks |
| [07_PROGRESS_LOG.md](./07_PROGRESS_LOG.md) | Development progress log |
| [08_DECISIONS.md](./08_DECISIONS.md) | Architectural decisions log |
| [09_BUGS.md](./09_BUGS.md) | Known bugs and issues |
| [10_MIGRATION_LOG.md](./10_MIGRATION_LOG.md) | Migration from old to new codebase |
| [11_API_SPEC.md](./11_API_SPEC.md) | API specification |
| [12_COMPONENT_INVENTORY.md](./12_COMPONENT_INVENTORY.md) | UI component inventory |
| [13_TESTING_PLAN.md](./13_TESTING_PLAN.md) | Testing strategy and plan |
| [14_SECURITY_CHECKLIST.md](./14_SECURITY_CHECKLIST.md) | Security requirements |

## Directory Structure

```
ElectroBridge Web App Design/
├── documents/          ← YOU ARE HERE
├── frontend/           ← Next.js App Router + Tailwind + TypeScript
├── backend/            ← APIs, workers, scrapers, AI, email jobs
├── shared/             ← Types, constants, utilities, validators
├── scripts/            ← Migration, setup, testing scripts
├── src/                ← Figma export source (read-only reference)
├── guidelines/         ← Design guidelines
├── index.html          ← Figma export entry
├── package.json        ← Figma export deps
├── vite.config.ts      ← Figma export config
└── pnpm-workspace.yaml ← Figma export workspace
```

## Development Principles

1. Think before coding — audit before modifying
2. Never delete important code without backup
3. Refactor incrementally — avoid big-bang rewrites
4. Maintain changelog — update docs after every phase
5. Production quality — mobile-first, accessible, semantic
6. Avoid technical debt — clean architecture, no duplication
7. Document everything — no undocumented architectural changes

## Getting Started

1. Read [01_MASTER_CONTEXT.md](./01_MASTER_CONTEXT.md) for full context
2. Review [02_ARCHITECTURE.md](./02_ARCHITECTURE.md) for architecture
3. Check [06_TASK_TRACKER.md](./06_TASK_TRACKER.md) for current tasks
4. Review [10_MIGRATION_LOG.md](./10_MIGRATION_LOG.md) for migration status

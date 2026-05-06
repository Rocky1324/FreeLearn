# EduConnect Haïti

A digital educational platform providing accessible learning resources, career guidance, and opportunity tracking for students in Haiti, with a strong emphasis on offline accessibility.

## Run & Operate

- `pnpm install` — install all workspace dependencies
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- **Run button**: starts `@workspace/educonnect-haiti` Vite dev server on port 19941

Required env vars: `DATABASE_URL`, `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE` (auto-set by Replit DB)

## Stack

- **Monorepo**: pnpm workspaces
- **Runtime**: Node.js 24
- **Frontend**: React + Vite + Tailwind CSS v4 + Radix UI + Framer Motion + wouter
- **Backend**: Express 5 + TypeScript + pino logging
- **Database**: PostgreSQL + Drizzle ORM + drizzle-zod
- **Validation**: Zod (v4), drizzle-zod
- **API codegen**: Orval (from OpenAPI spec)
- **Mobile**: Expo (React Native) — separate app in `artifacts/educonnect-mobile/`

## Where things live

- `artifacts/educonnect-haiti/` — React web frontend
- `artifacts/api-server/` — Express backend
- `artifacts/educonnect-mobile/` — Expo mobile app
- `lib/db/src/schema/` — Drizzle DB schema (source of truth)
- `lib/api-spec/` — OpenAPI spec (source of truth for API contracts)
- `lib/api-client-react/` — Generated React Query hooks
- `lib/api-zod/` — Generated Zod schemas

## Architecture decisions

- Monorepo with pnpm workspaces; all packages share a single lockfile
- Frontend is almost entirely offline-capable using IndexedDB for video/lesson storage
- Admin auth is client-side only (SHA-256 password hash checked in browser via `use-admin-auth.ts`)
- API server is separate from the frontend and uses OpenAPI-first codegen for type safety
- Database schema is intentionally empty at project start — tables are added as features are built

## Product

- Course browser with Haitian curriculum content (1ère AF through 9ème AF)
- Flashcard study tools per course
- Opportunity and school directory with Leaflet maps
- Career orientation guidance
- Admin panel (teacher space) for managing YouTube video assignments
- Offline video storage via IndexedDB
- Academic calendar

## User preferences

_Populate as you build_

## Gotchas

- PORT and BASE_PATH env vars must be set when running the Vite dev server (handled by `.replit` workflow config)
- The DB schema is empty (`lib/db/src/schema/index.ts`) — no tables are defined yet; API server will throw if called without a DB
- Mobile app (Expo) is not served by the main workflow — it requires a separate Expo dev server

## Pointers

- DB skill: `.local/skills/database/SKILL.md`
- React+Vite skill: `.local/skills/react-vite/SKILL.md`

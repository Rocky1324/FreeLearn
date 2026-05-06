# FreeLearn (EduConnect Haïti)

A digital educational platform providing accessible learning resources, career guidance, and opportunity tracking for students in Haiti, with full auth, progress tracking, and offline support.

## Run & Operate

- `pnpm install` — install all workspace dependencies
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server (port 8080)
- **Run button**: starts `@workspace/educonnect-haiti` Vite dev server (port 19941)

Required env vars: `DATABASE_URL`, `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE` (auto-set by Replit DB)

## Stack

- **Monorepo**: pnpm workspaces
- **Runtime**: Node.js 24
- **Frontend**: React + Vite + Tailwind CSS v4 + Radix UI + Framer Motion + wouter
- **Backend**: Express 5 + TypeScript + pino logging + cookie-parser
- **Database**: PostgreSQL + Drizzle ORM
- **Auth**: bcryptjs (passwords) + DB-stored sessions (SHA-256 hashed tokens, HTTP-only SameSite=Lax cookies)
- **Mobile**: Expo (React Native) — separate app in `artifacts/educonnect-mobile/`

## Where things live

- `artifacts/educonnect-haiti/` — React web frontend
- `artifacts/api-server/` — Express backend
- `artifacts/educonnect-mobile/` — Expo mobile app
- `lib/db/src/schema/` — Drizzle DB schema (source of truth)
  - `users.ts` — users table (student | teacher roles)
  - `sessions.ts` — session tokens (hashed, 30-day expiry)
  - `progress.ts` — user_progress (chapter completions)
  - `teacher-videos.ts` — teacher YouTube assignments per chapter

## Architecture decisions

- **Auth**: Session tokens — random 32-byte hex token stored in cookie; SHA-256 hash stored in DB. No JWT. Teacher registration requires code `TEACHER2026`.
- **Vite proxy**: `/api` → `http://localhost:8080` so cookies work same-origin in dev
- **Progress**: Moved from localStorage → PostgreSQL `user_progress` table; optimistic updates via React Query
- **Teacher videos**: YouTube IDs moved from IndexedDB → `teacher_videos` DB table (shared across all clients); offline video blobs stay in IndexedDB
- **Protected routes**: All app routes redirect to `/bienvenue` if not authenticated; landing/login/register are public
- **CORS**: `origin: true, credentials: true` on API (proxy handles it in dev)

## Product

- Landing page (`/bienvenue`), Login (`/connexion`), Register (`/inscription`)
- Course browser (1ère AF → 9ème AF) with chapter progress tracked in DB
- Flashcard study tools per course
- Progress dashboard (`/tableau-de-bord`) — streak, chapters completed, per-course bars, recent activity
- Opportunity and school directory with Leaflet maps
- Career orientation guidance
- Teacher panel (`/admin`) — YouTube video assignments saved to DB; offline MP4 upload via IndexedDB
- Offline video storage via IndexedDB + Service Worker caching
- Academic calendar

## User preferences

- App name: FreeLearn (not EduConnect Haïti)
- Teacher code: `TEACHER2026` (hardcoded in `artifacts/api-server/src/routes/auth.ts`)

## Gotchas

- DB schema push: `pnpm --filter @workspace/db run push` (requires DATABASE_URL)
- API server typecheck shows TS6305 errors for workspace libs — these are pre-existing and don't affect the build (esbuild handles source directly)
- The Vite proxy (`/api` → port 8080) is required for cookies to work; do not call the API directly from frontend code
- Mobile app (Expo) requires a separate Expo dev server workflow

## Pointers

- DB skill: `.local/skills/database/SKILL.md`
- React+Vite skill: `.local/skills/react-vite/SKILL.md`

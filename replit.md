# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5 (with cookie-parser, helmet, CORS, rate limiting)
- **Database**: PostgreSQL + Drizzle ORM (Replit managed)
- **Auth**: bcrypt (password hashing) + JWT (access + refresh tokens via httpOnly cookies)
- **Validation**: Zod v3 (api-server), Zod v4 via `zod/v4` (lib/db)
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React + Vite + Tailwind + shadcn/ui + wouter routing
- **Map**: react-leaflet (OpenStreetMap tiles)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Architecture

### Artifacts (active services)
- `artifacts/educonnect-haiti` — React web app (port 19941, served via `Start application` workflow)
- `artifacts/api-server` — Express API server (port 8080)
- `artifacts/educonnect-mobile` — Expo React Native mobile app
- `artifacts/mockup-sandbox` — Vite component preview server (port 8081)

### Packages
- `lib/db` — Drizzle ORM database client + schema (users, refresh_tokens tables)
- `lib/api-spec` — OpenAPI spec

### Web App Routing
- `/` — Landing page (home)
- `/cours`, `/cours/:id` — Courses
- `/fiches`, `/fiches/:courseId` — Flashcards
- `/calendrier` — Calendar
- `/ecoles` — Schools map (react-leaflet, OpenStreetMap)
- `/centres` — Community centers
- `/opportunites` — Scholarships/opportunities
- `/orientation` — Orientation quiz
- `/connexion` — Login page
- `/inscription` — Register page
- `/admin` — Admin dashboard (requires teacher/admin role)

### API Routes
All routes under `/api/*`, proxied from web app via Vite proxy.
- `GET /api/healthz` — health check
- `POST /api/auth/register` — user registration (rate limited: 5/hr)
- `POST /api/auth/login` — login (rate limited: 10/15min, account lockout after 5 failures)
- `POST /api/auth/logout` — logout + revoke refresh token
- `GET /api/auth/me` — get current user (JWT required)
- `POST /api/auth/refresh` — rotate refresh token

## Security Measures
- Passwords hashed with bcrypt (12 rounds)
- JWT access tokens (15min) + httpOnly cookie refresh tokens (7 days)
- Refresh token rotation (old token revoked on each use)
- Account lockout after 5 failed login attempts (15 min)
- No user enumeration (same error for wrong email/password)
- Rate limiting on auth routes
- Body size limit (10kb)
- Helmet security headers
- CORS configured for specific origins only
- sameSite=strict cookies

## Database Schema
- `users` — id, email (unique), password_hash, full_name, role (student/teacher/admin), is_verified, failed_login_attempts, locked_until, last_login, created_at, updated_at
- `refresh_tokens` — id, user_id (FK), token_hash, expires_at, created_at, revoked_at

## Environment Variables
- `DATABASE_URL`, `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE` — PostgreSQL (Replit managed)
- `JWT_SECRET` — Access token signing secret (auto-generated)
- `JWT_REFRESH_SECRET` — Refresh token signing secret (auto-generated)
- `JWT_EXPIRES_IN` — Access token TTL (default: 15m)
- `JWT_REFRESH_EXPIRES_IN` — Refresh token TTL (default: 7d)

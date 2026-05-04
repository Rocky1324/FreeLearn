# EduConnect Haïti — Workspace

## Overview

pnpm monorepo — educational platform for Haitian students. Three artifacts: a React/Vite web app, an Expo mobile app, and an Express API server backed by PostgreSQL.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5 + pino-http logging
- **Database**: PostgreSQL + Drizzle ORM (`@workspace/db`)
- **Auth**: JWT (access token in HttpOnly cookie, refresh token in `/api/auth` scoped cookie)
- **Password hashing**: bcryptjs (pure JS — no native compile)
- **Web frontend**: React + Vite (artifact: `educonnect-haiti`, port 19941)
- **Mobile**: Expo React Native (artifact: `educonnect-mobile`)
- **API server**: Express (artifact: `api-server`, port 8080)

## Key Commands

- `pnpm --filter @workspace/db run push` — push DB schema (interactive)
- `pnpm --filter @workspace/db run push-force` — push DB schema (non-interactive, --force)
- `pnpm --filter @workspace/api-server run build` — build API server (esbuild → dist/index.mjs)
- `pnpm --filter @workspace/api-server run dev` — build + start API server
- `pnpm --filter @workspace/educonnect-haiti run dev` — start Vite web dev server

## Database Schema (6 tables)

All tables exist in PostgreSQL. Schema source: `lib/db/src/schema/`.

| Table | Purpose |
|---|---|
| `users` | Auth — email, password_hash, role (text: student/teacher/admin), failed_attempts |
| `refresh_tokens` | Rotating refresh tokens (hashed SHA-256). Has legacy `revoked_at` nullable column. |
| `chapter_progress` | Per-user chapter completion (chapter_id + course_id) |
| `calendar_sessions` | Study calendar sessions (date, courseId, durationMinutes) |
| `downloaded_courses` | Which courses a user has marked for offline use |
| `chapter_videos` | Teacher-set YouTube IDs per chapter (stored globally, visible to all students) |

**Known schema quirks:**
- `users.role` is a legacy `user_role` ENUM type in the DB but `text` in the Drizzle schema — works fine, values come back as strings.
- `users` has both `failed_login_attempts` (legacy) and `failed_attempts` (current); Drizzle uses `failed_attempts`.
- `refresh_tokens` has a legacy `revoked_at` nullable column not in the Drizzle schema — harmless.
- `downloaded_courses` previously had `downloaded_at`; renamed to `created_at` to match Drizzle schema.

## API Routes (`artifacts/api-server/src/routes/`)

| Route | Auth | Notes |
|---|---|---|
| `POST /api/auth/register` | None | fullName, email, password |
| `POST /api/auth/login` | None | Returns JWT cookies |
| `POST /api/auth/logout` | JWT | Clears cookies + deletes refresh token |
| `GET /api/auth/me` | JWT | Returns safe user object |
| `POST /api/auth/refresh` | Refresh cookie | Issues new access token |
| `GET /api/progress` | JWT | `{ done: { [chapterId]: true } }` |
| `POST /api/progress/:chapterId` | JWT | Body: `{ courseId }` — toggle completion |
| `GET /api/calendar` | JWT | `{ data: { [date]: sessions[] } }` |
| `POST /api/calendar` | JWT | Body: `{ date, courseId, durationMinutes }` |
| `DELETE /api/calendar/:id` | JWT | Delete a session |
| `GET /api/downloads` | JWT | `{ downloaded: { [courseId]: true } }` |
| `POST /api/downloads/:courseId` | JWT | Toggle download flag |
| `DELETE /api/downloads/:courseId` | JWT | Remove download flag |
| `GET /api/videos` | **Public** | `{ videos: { [chapterId]: youtubeId } }` |
| `PUT /api/videos/:chapterId` | `x-admin-key` header | Body: `{ youtubeUrl }` — extracts ID from any YouTube URL format |
| `DELETE /api/videos/:chapterId` | `x-admin-key` header | Removes video from DB |

**Admin key**: defaults to `S1G42026` (set via `ADMIN_KEY` env var). The admin page (`/admin`) sends this key automatically.

## Frontend Structure (`artifacts/educonnect-haiti/src/`)

- `lib/api.ts` — API client: `authApi`, `progressApi`, `calendarApi`, `downloadsApi`, `videosApi`
- `hooks/use-auth.tsx` — `AuthProvider` + `useAuth()` (wraps entire app in `App.tsx`)
- `hooks/use-progress.tsx` — API-backed chapter completion (`isDone`, `toggle`, `courseStats`)
- `hooks/use-calendar.tsx` — API-backed calendar sessions
- `hooks/use-downloads.tsx` — API-backed offline download flags
- `hooks/use-admin-auth.ts` — Separate admin password auth (SHA-256 of "S1G42026")
- `pages/login.tsx` — Login form
- `pages/register.tsx` — Registration form
- `pages/progress-dashboard.tsx` — `/progression` route — shows all course progress
- `pages/admin.tsx` — Teacher space: YouTube IDs (→ DB via `videosApi`) + offline MP4 management (→ IndexedDB)
- `pages/course-detail.tsx` — Loads YouTube IDs from DB via `videosApi.getAll()` on mount

## Auth Flow

1. Student registers → account created with `role: 'student'`
2. Login → access token (15min HttpOnly cookie) + refresh token (7d scoped cookie)
3. `useAuth` hook calls `/api/auth/me` on mount; if 401, user is null
4. `ProtectedRoute` in App.tsx redirects unauthenticated users to `/connexion`
5. `PublicOnlyRoute` redirects logged-in users to `/cours`

## Video Architecture

- **YouTube IDs** → stored in `chapter_videos` PostgreSQL table → visible to ALL students on ALL devices
- **MP4 blobs** → IndexedDB (per-browser, hors-ligne only) — teacher uploads via admin page
- Admin page reads both sources and shows combined status per chapter
- `course-detail.tsx` checks DB YouTube IDs first, falls back to hardcoded `youtubeId` in course data

## Vite Proxy

`/api` → `http://localhost:8080` (configured in `vite.config.ts`)

## Known Issues / Notes

- GitHub push timeouts in Replit = network timeout, not a code problem. Push smaller commits or use the Git panel.
- The `Start application` workflow is legacy (from before multi-artifact setup). Use individual artifact workflows.

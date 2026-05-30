# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

808s & Cold Takes podcast website — a Create React App (CRA) TypeScript SPA with MUI, plus a pair of Vercel Serverless Functions (`api/`) that exist solely to send transactional email via Resend. The frontend is the bulk of the app; the functions are only the contact/interview email relay.

## Commands

- `npm run dev` — run the full app locally via `vercel dev` (serves the CRA frontend AND the `api/` functions on one origin; this is the primary dev command). Requires the Vercel CLI and a one-time `vercel link`.
- `npm start` — run only the CRA dev server at http://localhost:3000 (no `api/` functions; use `npm run dev` if you need the email endpoints)
- `npm run build` — production build to `build/`
- `npm test` — Jest in interactive watch mode (CRA / react-scripts)
- `npm test -- src/services/rssService.test.ts` — run a single test file (pass `--watchAll=false` to run once and exit)

There is no separate lint script — ESLint runs as part of `start`/`build`. The email functions' logic is unit-tested via the shared modules in `src/lib/email/` (the `api/` handlers themselves are thin and verified with `vercel dev`).

## Architecture

### Dual-mode data layer (Supabase OR localStorage)

The single most important pattern: **every data service degrades gracefully when Supabase is not configured.** `src/config/supabase.ts` exports `isSupabaseConfigured` (true only when both `REACT_APP_SUPABASE_URL` and `REACT_APP_SUPABASE_ANON_KEY` are set). Services in `src/services/` (`teamService`, `interviewService`, `eventService`, `nominationService`) check this flag at the top of each function and delegate to `localStorageService.ts` when Supabase is absent — so the app and admin CRUD are fully usable with no backend. When editing or adding a data service, preserve this branch: implement both the Supabase path and the localStorage path.

Admin auth (`src/contexts/AuthContext.tsx`) follows the same rule — when Supabase is unconfigured it simply stops loading and leaves the user signed out. Admin routes are gated by `src/components/admin/ProtectedRoute`.

### Routing & feature flags

`src/App.tsx` defines all routes. Public pages live in `src/views/`, admin pages in `src/views/admin/` (each wrapped in `<ProtectedRoute>`). Some routes are gated behind `src/config/featureFlags.ts` (e.g. `showContactPage`) — to enable/disable a page, toggle the flag rather than removing the route. Unknown routes redirect to `/`.

### Episodes via RSS (no database)

Episodes are not stored — they are fetched at runtime from the Buzzsprout RSS feed (`https://feeds.buzzsprout.com/1737669.rss`) through a CORS proxy in `src/services/rssService.ts`, with fallback to mock data on failure. `App.tsx` prefetches episodes on mount. See README for details.

### Email backend (Vercel Functions in `api/`)

Two Vercel Serverless Functions handle transactional email:
- `POST /api/contact` → `api/contact.ts` (general inquiry: name, email, message)
- `POST /api/interview` → `api/interview.ts` (interview request: officialName, email, + optional fields)

Both are **thin handlers** that delegate to shared, unit-tested logic in `src/lib/email/`:
- `escapeHtml.ts` — escapes user input for safe interpolation into HTML email bodies.
- `validation.ts` — `validateContactPayload` / `validateInterviewPayload` (trim, required-field, email + header-injection checks via `isHeaderSafe`/`sanitizeHeaderValue`) and `checkAntiSpam` (honeypot + minimum fill-time gate).
- `templates.ts` — `buildContactEmailHtml` / `buildInterviewEmailHtml`, which escape every user value.
The handlers read config via `api/_lib/sendEmail.ts` (`getEmailConfig` + a cached Resend client) and set `replyTo` to the submitter's address. They require `RESEND_API_KEY`, `CONTACT_EMAIL_TO`, and `CONTACT_EMAIL_FROM`; without them the endpoints return a 500 "Email service is not configured."

Hardening: all user input is HTML-escaped; the email field is rejected if it contains CR/LF (header injection); a hidden honeypot field plus a client-computed `elapsedMs` (time the form was on screen) silently drop bot-shaped submissions (returning `200 {success:true}` so bots get no signal).

The frontend calls these through `src/services/contactService.ts`, which posts to `/api/contact` and `/api/interview` (relative paths — they resolve to the functions under `vercel dev` and in production). The contact forms in `src/views/ContactPage.tsx` send the `honeypot` and `elapsedMs` fields. Note `contactService`'s dev shortcut: when `!isSupabaseConfigured && NODE_ENV === 'development'`, it **simulates** success and logs the payload instead of hitting the backend.

## Environment

Copy `.env.example` to `.env` (gitignored). Frontend vars must be prefixed `REACT_APP_` to be exposed by CRA. The email functions read `RESEND_API_KEY`, `CONTACT_EMAIL_TO`, `CONTACT_EMAIL_FROM` from `process.env`; `vercel dev` loads `.env` locally, and the same vars must be set in the Vercel project (Settings → Environment Variables) for production.

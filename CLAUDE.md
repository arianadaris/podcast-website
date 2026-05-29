# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

808s & Cold Takes podcast website — a Create React App (CRA) TypeScript SPA with MUI, plus a small Express backend (`server/`) that exists solely to send transactional email via Resend. The frontend is the bulk of the app; the backend is only the contact/interview email relay.

## Commands

- `npm start` — run the React dev server at http://localhost:3000 (CRA, with ESLint via `react-app` config baked in)
- `npm run build` — production build to `build/`
- `npm test` — Jest in interactive watch mode (CRA / react-scripts)
- `npm test -- src/services/rssService.test.ts` — run a single test file (pass `--watchAll=false` to run once and exit)
- `npm run server` — start the Express email backend (`node server/index.js`, defaults to port 5000)

There is no separate lint script — ESLint runs as part of `start`/`build`. There is no test runner for the backend.

## Architecture

### Dual-mode data layer (Supabase OR localStorage)

The single most important pattern: **every data service degrades gracefully when Supabase is not configured.** `src/config/supabase.ts` exports `isSupabaseConfigured` (true only when both `REACT_APP_SUPABASE_URL` and `REACT_APP_SUPABASE_ANON_KEY` are set). Services in `src/services/` (`teamService`, `interviewService`, `eventService`, `nominationService`) check this flag at the top of each function and delegate to `localStorageService.ts` when Supabase is absent — so the app and admin CRUD are fully usable with no backend. When editing or adding a data service, preserve this branch: implement both the Supabase path and the localStorage path.

Admin auth (`src/contexts/AuthContext.tsx`) follows the same rule — when Supabase is unconfigured it simply stops loading and leaves the user signed out. Admin routes are gated by `src/components/admin/ProtectedRoute`.

### Routing & feature flags

`src/App.tsx` defines all routes. Public pages live in `src/views/`, admin pages in `src/views/admin/` (each wrapped in `<ProtectedRoute>`). Some routes are gated behind `src/config/featureFlags.ts` (e.g. `showContactPage`) — to enable/disable a page, toggle the flag rather than removing the route. Unknown routes redirect to `/`.

### Episodes via RSS (no database)

Episodes are not stored — they are fetched at runtime from the Buzzsprout RSS feed (`https://feeds.buzzsprout.com/1737669.rss`) through a CORS proxy in `src/services/rssService.ts`, with fallback to mock data on failure. `App.tsx` prefetches episodes on mount. See README for details.

### Email backend (`server/`)

Express app (`server/index.js`) mounts two routers and serves the CRA `build/` in production:
- `POST /api/contact` → `server/contact.js` (general inquiry: name, email, message)
- `POST /api/interview` → `server/interview.js` (interview request: officialName, email, + optional fields)

Both render an HTML template from `server/templates/` (`contact-email.html`, `interview-email.html`), send via Resend, and set `replyTo` to the submitter's address. They require `RESEND_API_KEY`, `CONTACT_EMAIL_TO`, and `CONTACT_EMAIL_FROM` (see `.env.example`); without them the endpoints return a 500 "Email service is not configured."

The frontend calls these through `src/services/contactService.ts`, which posts to `/api/contact` and `/api/interview`. Note its dev shortcut: when `!isSupabaseConfigured && NODE_ENV === 'development'`, it **simulates** success and logs the payload instead of hitting the backend — so submitting a form in `npm start` alone will not send a real email; you must run `npm run server` and have Resend env vars set.

## Environment

Copy `.env.example` to `.env` (gitignored). Frontend vars must be prefixed `REACT_APP_` to be exposed by CRA. Backend reads `RESEND_API_KEY`, `CONTACT_EMAIL_TO`, `CONTACT_EMAIL_FROM` via `dotenv`.

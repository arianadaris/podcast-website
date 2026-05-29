# Part 1 — Practices & Code Improvements (Design)

**Date:** 2026-05-29
**Status:** Approved (sequence), pending spec review
**Scope:** The "Part 1 — Practices & Code" items from the improvement overview. Part 2 (features) is explicitly deferred to a later cycle.

## Context

808s & Cold Takes is a CRA + TypeScript + MUI SPA with a dual-mode data layer (Supabase ↔ localStorage), an admin CRM under `/admin`, episodes via Buzzsprout RSS, and a just-shipped contact/interview email feature (currently an Express app in `server/` relaying via Resend).

A thorough codebase review surfaced ~9 independent workstreams under "practices & code." This document sequences them into reviewable chunks, each with its own design→implement→verify cycle.

## Key decisions

| Decision | Choice | Rationale |
|---|---|---|
| Backend deployment | **Migrate `server/` to Vercel Functions** | Frontend + API deploy as one unit; fixes "where does the backend run" gap and the promote-to-prod friction. |
| Spam protection | **Honeypot + time-trap, no new vendor** | Zero accounts, zero user friction, catches the majority of automated spam. KV rate limiting / Turnstile deferred until abuse appears. |
| Access control | **Keep single admin role; add audit log** | Small team — full RBAC is YAGNI for now. Audit log gives accountability without Supabase role plumbing. |
| Code-health adoption | **Incremental, low-risk** | Introduce patterns and convert highest-value spots; avoid a site-wide big-bang rewrite. |
| Local dev workflow | **`vercel dev`** | Matches production exactly; replaces the `npm start` + `npm run server` + CRA proxy setup. |

## Out of scope (deliberately excluded)

- Role-based access control (RBAC) and per-entity permissions.
- KV/Redis-backed rate limiting and third-party captcha (Turnstile/hCaptcha).
- All of Part 2 (features): submission-pipeline CRM, episode pages, OG tags, newsletter, etc.

## Implementation sequence

Each chunk ships independently and is verified before the next begins. 🔸 marks steps requiring the user (Supabase SQL / Vercel dashboard) — I cannot perform these from code.

### Chunk 1 — Backend → Vercel Functions + hardening (P0)
- Convert `server/contact.js` + `server/interview.js` into `api/contact.ts` + `api/interview.ts` (Vercel Functions). Extract shared send/validate/template-render logic into `api/_lib/`.
- Hardening:
  - **HTML-escape** all user-supplied values before injecting into email templates (fixes HTML/script injection in the email body).
  - **Block email-header injection**: reject/strip CR/LF in the email field; tighten email validation.
  - **Honeypot field** (hidden input) — reject submissions where it is filled.
  - **Time-trap**: a render-timestamp field — reject submissions completed in under ~3s.
  - Guards: POST-only, content-type check, payload-size limit.
  - Locked-down CORS (same-origin in production).
- Add security headers (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy) via `vercel.json`.
- Frontend: add hidden honeypot + render-timestamp to both forms in the contact UI; remove the `proxy` field and the `DANGEROUSLY_DISABLE_HOST_CHECK`/`HOST` workaround from `.env`/`.env.example`; document the `vercel dev` workflow.
- Retire `server/` once the functions are verified end-to-end.
- 🔸 **User:** first-run `vercel` login/link; set Vercel **Production Branch = `master`**.
- **Verify:** local `vercel dev` send works; honeypot/time-trap reject bot-shaped requests; escaped input renders safely in the received email.

### Chunk 2 — Audit log (P0, single role retained)
- New `audit_log` entity with a Supabase table + localStorage fallback (mirrors the existing dual-mode pattern). Fields: `id`, `actor` (user email/id), `action` (create/update/delete), `entity_type`, `entity_id`, `summary`, `created_at`.
- Wire writes into the service-layer mutations for team, interviews, events, and nomination deletes.
- Read-only `/admin/audit` page (reuses `DataTable`), wrapped in `ProtectedRoute`.
- 🔸 **User:** run the provided SQL to create the table + RLS policy.
- **Verify:** an admin create/update/delete produces a correct audit row in both Supabase and localStorage modes.

### Chunk 3 — Shared types + Zod validation (P1, incremental)
- Move domain interfaces into `src/types/` (re-exported where needed); derive form types from them to eliminate duplicates like `EventFormData`.
- Introduce Zod schemas for the contact/interview submission payloads as the **single source of truth shared by the client and the Vercel function**. Optionally extend to nominations.
- Scope: submission flows + the entities touched; not a rewrite of every form.
- **Verify:** types compile with no duplication; invalid payloads are rejected identically client- and server-side.

### Chunk 4 — react-query (P1, incremental)
- Add `@tanstack/react-query` + `QueryClientProvider` at the app root.
- Convert public list reads (team, interviews, events, nominations, episodes prefetch) to `useQuery`; convert admin mutations to `useMutation` with cache invalidation and optimistic delete where valuable.
- Leave edge cases hand-rolled; remove the now-redundant `loading`/`error` `useState` triplets on converted pages.
- **Verify:** converted pages fetch/cache correctly; admin edits reflect without manual refetch.

### Chunk 5 — Split the three oversized components (P1)
- `ContactPage` (648) → `GeneralContactForm` + `InterviewRequestForm` + a shared field wrapper.
- `NominationsPage` (637) → per-category section components + submit container.
- `EpisodesPage` (619) → episode card / list / search / pagination subcomponents.
- **Verify:** behavior unchanged; each new component is independently readable.

### Chunk 6 — Theme tokens + dead code (P2)
- Promote the brutalist `border: '2px solid black'` / `borderRadius: 0` / blue gradient into `theme.ts` tokens plus a `BrutalCard`/`BrutalBox` wrapper; apply to touched files (incremental, not all 30+ at once).
- Remove the unused `Navigation.tsx`.
- De-duplicate `EventCard` / `ArchivedEventCard` via a shared base.
- **Verify:** visual parity; repeated style literals reduced in touched files.

### Chunk 7 — Error boundary, error-handling consistency, a11y, skeletons (P2)
- Add a top-level React `ErrorBoundary` (prevents a single render error white-screening the app).
- Standardize service error handling on one style (throw + caller-handles via a small helper); remove silent empty catches.
- Accessibility: `aria-live` on loading regions, `aria-invalid`/`aria-errormessage` on form fields, a skip-to-content link.
- Replace full-page spinners on main lists with skeleton loaders.
- **Verify:** thrown render errors show a fallback; basic a11y checks pass on key pages.

### Chunk 8 — Observability + deploy hygiene (P2)
- Add **Vercel Analytics + Speed Insights** (no new vendor) and optional **Sentry** (free tier) for error tracking; consistent contextual logging in the functions.
- Confirm `vercel.json` build configuration and security headers.
- 🔸 **User:** enable Analytics in the Vercel dashboard.
- **Verify:** analytics events register; (if Sentry) a test error is captured.

## Cross-cutting principles

- Preserve the **dual-mode pattern** (Supabase ↔ localStorage) in every new data path (audit log especially).
- Each chunk leaves the app fully working; no half-migrated states across a chunk boundary.
- Tests added alongside the riskiest new logic (dual-mode branching, submission validation) per the incremental philosophy.

## Success criteria for Part 1

- Public email endpoints are escaped, header-injection-safe, honeypot/time-trap protected, and deploy with the frontend on Vercel.
- Admin mutations are recorded in an audit log in both data modes.
- Domain types are centralized; submission validation is shared client/server via Zod.
- Highest-traffic reads use react-query; the three oversized components are decomposed.
- Brutalist styling is tokenized; dead code removed.
- App has an error boundary, improved a11y, skeleton loaders, analytics, and (optionally) error tracking.

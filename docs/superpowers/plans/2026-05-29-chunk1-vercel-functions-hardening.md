# Chunk 1 — Backend → Vercel Functions + Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the two email endpoints from the Express app in `server/` to Vercel Serverless Functions in `api/`, hardened against injection and spam, with local dev via `vercel dev`.

**Architecture:** Pure, testable logic (HTML-escaping, payload validation, anti-spam, email-template building) lives in `src/lib/email/` so the existing `react-scripts test` runner and root `tsconfig.json` cover it. Thin Vercel handlers in `api/contact.ts` and `api/interview.ts` import that logic plus a Resend wrapper in `api/_lib/sendEmail.ts`. The handlers are integration-verified with `vercel dev` (they cannot run under `react-scripts test`, which only scans `src/`).

**Tech Stack:** React 19 + CRA + TypeScript, MUI, Resend (email), Vercel Functions (`@vercel/node`), Jest via react-scripts.

---

## Testing boundary (read first)

`react-scripts test` only discovers tests inside `src/`. Therefore:
- **Unit-tested via TDD (Tasks 1–3):** everything in `src/lib/email/`.
- **Not unit-tested, manually verified with `vercel dev` (Tasks 5–6, 11):** the `api/` handlers and the Resend wrapper. These are deliberately kept thin so almost all logic lives in the tested `src/lib/email/` modules. This is a conscious boundary, not an omitted test.

## User-only prerequisites (🔸 cannot be done from code)

These are needed for Task 11 (verification) and production. Do them before Task 11:
1. Install the Vercel CLI: `npm i -g vercel`
2. From the project root: `vercel login`, then `vercel link` (link to the existing project).
3. Add the three email env vars to the Vercel project (Production + Preview), via dashboard **Settings → Environment Variables** or CLI: `vercel env add RESEND_API_KEY`, `vercel env add CONTACT_EMAIL_TO`, `vercel env add CONTACT_EMAIL_FROM`.
4. Set **Settings → Git → Production Branch = `master`**.
The local `.env` already contains the three vars; `vercel dev` reads `.env` at the project root.

---

### Task 1: HTML-escaping utility

**Files:**
- Create: `src/lib/email/escapeHtml.ts`
- Test: `src/lib/email/escapeHtml.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/lib/email/escapeHtml.test.ts
import { escapeHtml } from './escapeHtml';

describe('escapeHtml', () => {
  it('escapes the five HTML-significant characters', () => {
    expect(escapeHtml(`<script>alert("x")&'`)).toBe(
      '&lt;script&gt;alert(&quot;x&quot;)&amp;&#39;'
    );
  });

  it('leaves ordinary text untouched', () => {
    expect(escapeHtml('Hello world 123')).toBe('Hello world 123');
  });

  it('escapes ampersands before other entities (no double-escape)', () => {
    expect(escapeHtml('Tom & Jerry < 5')).toBe('Tom &amp; Jerry &lt; 5');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx react-scripts test --watchAll=false src/lib/email/escapeHtml.test.ts`
Expected: FAIL — "Cannot find module './escapeHtml'".

- [ ] **Step 3: Write minimal implementation**

```ts
// src/lib/email/escapeHtml.ts
/**
 * Escapes the five HTML-significant characters so untrusted user input can be
 * safely interpolated into an HTML email body. Ampersand is replaced first to
 * avoid double-escaping the entities produced by the later replacements.
 */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx react-scripts test --watchAll=false src/lib/email/escapeHtml.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/email/escapeHtml.ts src/lib/email/escapeHtml.test.ts
git commit -m "Add escapeHtml utility for email templates"
```

---

### Task 2: Validation + anti-spam module

**Files:**
- Create: `src/lib/email/validation.ts`
- Test: `src/lib/email/validation.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/lib/email/validation.test.ts
import {
  isHeaderSafe,
  sanitizeHeaderValue,
  checkAntiSpam,
  validateContactPayload,
  validateInterviewPayload,
} from './validation';

describe('isHeaderSafe', () => {
  it('rejects values containing CR or LF', () => {
    expect(isHeaderSafe('a@b.com')).toBe(true);
    expect(isHeaderSafe('a@b.com\nBcc: evil@x.com')).toBe(false);
    expect(isHeaderSafe('a@b.com\r\n')).toBe(false);
  });
});

describe('sanitizeHeaderValue', () => {
  it('collapses CR/LF into a single space', () => {
    expect(sanitizeHeaderValue('Name\r\nInjected')).toBe('Name Injected');
  });
});

describe('checkAntiSpam', () => {
  it('flags a filled honeypot', () => {
    expect(checkAntiSpam({ honeypot: 'bot', elapsedMs: 9000 }).ok).toBe(false);
  });
  it('flags submissions faster than 3s', () => {
    expect(checkAntiSpam({ honeypot: '', elapsedMs: 1200 }).ok).toBe(false);
  });
  it('flags a missing/invalid elapsed time', () => {
    expect(checkAntiSpam({ honeypot: '', elapsedMs: undefined }).ok).toBe(false);
  });
  it('passes a real, slow, empty-honeypot submission', () => {
    expect(checkAntiSpam({ honeypot: '', elapsedMs: 9000 }).ok).toBe(true);
  });
});

describe('validateContactPayload', () => {
  it('accepts a valid payload and returns trimmed data', () => {
    const r = validateContactPayload({ name: '  Ann ', email: 'a@b.com', message: ' hi ' });
    expect(r.valid).toBe(true);
    expect(r.data).toEqual({ name: 'Ann', email: 'a@b.com', message: 'hi' });
  });
  it('rejects missing fields', () => {
    expect(validateContactPayload({ name: '', email: 'a@b.com', message: 'x' }).valid).toBe(false);
  });
  it('rejects an email with a newline (header injection)', () => {
    expect(validateContactPayload({ name: 'A', email: 'a@b.com\nBcc: x', message: 'x' }).valid).toBe(false);
  });
});

describe('validateInterviewPayload', () => {
  it('requires officialName and email, passes optionals through trimmed', () => {
    const r = validateInterviewPayload({ officialName: ' DJ ', email: 'a@b.com', availability: ' weekends ' });
    expect(r.valid).toBe(true);
    expect(r.data!.officialName).toBe('DJ');
    expect(r.data!.availability).toBe('weekends');
    expect(r.data!.musicWorkExample).toBe('');
  });
  it('rejects when officialName is blank', () => {
    expect(validateInterviewPayload({ officialName: '  ', email: 'a@b.com' }).valid).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx react-scripts test --watchAll=false src/lib/email/validation.test.ts`
Expected: FAIL — "Cannot find module './validation'".

- [ ] **Step 3: Write minimal implementation**

```ts
// src/lib/email/validation.ts
export interface ContactData {
  name: string;
  email: string;
  message: string;
}

export interface InterviewData {
  officialName: string;
  email: string;
  musicWorkExample: string;
  availability: string;
  specificTopics: string;
  previousInterviews: string;
  additionalDetails: string;
}

export interface ValidationResult<T> {
  valid: boolean;
  error?: string;
  data?: T;
}

export interface AntiSpamInput {
  honeypot?: unknown;
  elapsedMs?: unknown;
}

export interface AntiSpamResult {
  ok: boolean;
  reason?: string;
}

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;
const MIN_FILL_MS = 3000;

function str(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export function isHeaderSafe(value: string): boolean {
  return !/[\r\n]/.test(value);
}

export function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

/**
 * Bot-shaped requests: a filled honeypot field, or a form completed implausibly
 * fast. `elapsedMs` is computed on the client (time the form was on screen) to
 * avoid client/server clock-skew false-positives.
 */
export function checkAntiSpam({ honeypot, elapsedMs }: AntiSpamInput): AntiSpamResult {
  if (typeof honeypot === 'string' && honeypot.trim() !== '') {
    return { ok: false, reason: 'honeypot' };
  }
  if (typeof elapsedMs !== 'number' || !Number.isFinite(elapsedMs) || elapsedMs < MIN_FILL_MS) {
    return { ok: false, reason: 'too-fast' };
  }
  return { ok: true };
}

export function validateContactPayload(body: any): ValidationResult<ContactData> {
  const name = str(body?.name);
  const email = str(body?.email);
  const message = str(body?.message);
  if (!name || !email || !message) {
    return { valid: false, error: 'Name, email, and message are required.' };
  }
  if (!EMAIL_PATTERN.test(email) || !isHeaderSafe(email)) {
    return { valid: false, error: 'Please provide a valid email address.' };
  }
  return { valid: true, data: { name, email, message } };
}

export function validateInterviewPayload(body: any): ValidationResult<InterviewData> {
  const officialName = str(body?.officialName);
  const email = str(body?.email);
  if (!officialName) {
    return { valid: false, error: 'Official name or stage name is required.' };
  }
  if (!email) {
    return { valid: false, error: 'Email address is required.' };
  }
  if (!EMAIL_PATTERN.test(email) || !isHeaderSafe(email)) {
    return { valid: false, error: 'Please provide a valid email address.' };
  }
  return {
    valid: true,
    data: {
      officialName,
      email,
      musicWorkExample: str(body?.musicWorkExample),
      availability: str(body?.availability),
      specificTopics: str(body?.specificTopics),
      previousInterviews: str(body?.previousInterviews),
      additionalDetails: str(body?.additionalDetails),
    },
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx react-scripts test --watchAll=false src/lib/email/validation.test.ts`
Expected: PASS (all describe blocks green).

- [ ] **Step 5: Commit**

```bash
git add src/lib/email/validation.ts src/lib/email/validation.test.ts
git commit -m "Add email payload validation and anti-spam checks"
```

---

### Task 3: Email template builders

**Files:**
- Create: `src/lib/email/templates.ts`
- Test: `src/lib/email/templates.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/lib/email/templates.test.ts
import { buildContactEmailHtml, buildInterviewEmailHtml, formatTimestamp } from './templates';

const FIXED = 'Friday, May 29, 2026 at 8:00 AM ET';

describe('buildContactEmailHtml', () => {
  it('includes the name and message', () => {
    const html = buildContactEmailHtml({ name: 'Ann', email: 'a@b.com', message: 'Hello' }, FIXED);
    expect(html).toContain('Ann');
    expect(html).toContain('Hello');
    expect(html).toContain(FIXED);
  });
  it('escapes HTML in user input (no raw script tag)', () => {
    const html = buildContactEmailHtml(
      { name: 'A', email: 'a@b.com', message: '<script>alert(1)</script>' },
      FIXED
    );
    expect(html).not.toContain('<script>alert(1)</script>');
    expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
  });
});

describe('buildInterviewEmailHtml', () => {
  it('renders required fields and only the provided optional rows', () => {
    const html = buildInterviewEmailHtml(
      {
        officialName: 'DJ X',
        email: 'dj@x.com',
        musicWorkExample: 'spotify.com/x',
        availability: '',
        specificTopics: '',
        previousInterviews: '',
        additionalDetails: '',
      },
      FIXED
    );
    expect(html).toContain('DJ X');
    expect(html).toContain('spotify.com/x');
    expect(html).toContain('Music / Work Examples');
    expect(html).not.toContain('Availability'); // empty optional omitted
  });
  it('escapes HTML in optional fields', () => {
    const html = buildInterviewEmailHtml(
      {
        officialName: 'DJ',
        email: 'dj@x.com',
        musicWorkExample: '',
        availability: '<b>x</b>',
        specificTopics: '',
        previousInterviews: '',
        additionalDetails: '',
      },
      FIXED
    );
    expect(html).toContain('&lt;b&gt;x&lt;/b&gt;');
    expect(html).not.toContain('<b>x</b>');
  });
});

describe('formatTimestamp', () => {
  it('appends ET', () => {
    expect(formatTimestamp(new Date('2026-05-29T12:00:00Z'))).toContain('ET');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx react-scripts test --watchAll=false src/lib/email/templates.test.ts`
Expected: FAIL — "Cannot find module './templates'".

- [ ] **Step 3: Write minimal implementation**

```ts
// src/lib/email/templates.ts
import { escapeHtml } from './escapeHtml';
import { ContactData, InterviewData } from './validation';

export function formatTimestamp(date: Date = new Date()): string {
  const formatted = date.toLocaleString('en-US', {
    timeZone: 'America/New_York',
    dateStyle: 'full',
    timeStyle: 'short',
  });
  return `${formatted} ET`;
}

export function buildContactEmailHtml(
  data: ContactData,
  timestamp: string = formatTimestamp()
): string {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const message = escapeHtml(data.message);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Contact Message &ndash; 808s &amp; COLD TAKES</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f0f4f8; font-family: Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f4f8; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border: 2px solid #000000;">
          <tr>
            <td style="background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%); padding: 32px 24px; text-align: center; border-bottom: 2px solid #000000;">
              <p style="margin: 0 0 8px 0; font-size: 28px; font-weight: 900; color: #000000; letter-spacing: 0.05em;">808s &amp; COLD TAKES</p>
              <p style="margin: 0; font-size: 14px; font-weight: 600; color: #000000; text-transform: uppercase; letter-spacing: 0.15em;">New Contact Message</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 24px 0 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #bbdefb; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 10px 16px; font-weight: 700; color: #1565c0; width: 80px; border-bottom: 1px solid #e3f2fd;">Name</td>
                  <td style="padding: 10px 16px; color: #212121; border-bottom: 1px solid #e3f2fd;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; font-weight: 700; color: #1565c0; width: 80px;">Email</td>
                  <td style="padding: 10px 16px; color: #212121;"><a href="mailto:${email}" style="color: #1976d2;">${email}</a></td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 24px 24px 24px;">
              <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 700; color: #1565c0; text-transform: uppercase; letter-spacing: 0.1em;">Message</p>
              <div style="background-color: #e3f2fd; border-left: 4px solid #1976d2; padding: 16px; font-size: 15px; color: #212121; line-height: 1.6; white-space: pre-wrap;">${message}</div>
            </td>
          </tr>
          <tr>
            <td style="background-color: #1976d2; padding: 16px 24px; border-top: 2px solid #000000; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #e3f2fd;">Received at ${timestamp}</p>
              <p style="margin: 6px 0 0 0; font-size: 12px; color: #e3f2fd;">Reply directly to this email to respond to ${name}.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function optionalRow(label: string, value: string, isLast = false): string {
  const v = value.trim();
  if (!v) return '';
  const borderStyle = isLast ? '' : 'border-bottom: 1px solid #e3f2fd;';
  return `<tr>
    <td style="padding: 10px 16px; font-weight: 700; color: #1565c0; width: 200px; vertical-align: top; ${borderStyle}">${escapeHtml(label)}</td>
    <td style="padding: 10px 16px; color: #212121; vertical-align: top; white-space: pre-wrap; ${borderStyle}">${escapeHtml(v)}</td>
  </tr>`;
}

export function buildInterviewEmailHtml(
  data: InterviewData,
  timestamp: string = formatTimestamp()
): string {
  const officialName = escapeHtml(data.officialName);
  const email = escapeHtml(data.email);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Interview Request &ndash; 808s &amp; COLD TAKES</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f0f4f8; font-family: Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f4f8; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border: 2px solid #000000;">
          <tr>
            <td style="background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%); padding: 32px 24px; text-align: center; border-bottom: 2px solid #000000;">
              <p style="margin: 0 0 8px 0; font-size: 28px; font-weight: 900; color: #000000; letter-spacing: 0.05em;">808s &amp; COLD TAKES</p>
              <p style="margin: 0; font-size: 14px; font-weight: 600; color: #000000; text-transform: uppercase; letter-spacing: 0.15em;">New Interview Request</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px;">
              <p style="margin: 0 0 20px 0; font-size: 15px; color: #424242;">A new interview request has been submitted through the 808s &amp; COLD TAKES website.</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #bbdefb;">
                <tr>
                  <td style="padding: 10px 16px; font-weight: 700; color: #1565c0; width: 200px; vertical-align: top; border-bottom: 1px solid #e3f2fd;">Name / Stage Name</td>
                  <td style="padding: 10px 16px; color: #212121; vertical-align: top; border-bottom: 1px solid #e3f2fd;">${officialName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; font-weight: 700; color: #1565c0; width: 200px; vertical-align: top; border-bottom: 1px solid #e3f2fd;">Email</td>
                  <td style="padding: 10px 16px; color: #212121; vertical-align: top; border-bottom: 1px solid #e3f2fd;"><a href="mailto:${email}" style="color: #1976d2;">${email}</a></td>
                </tr>
                ${optionalRow('Music / Work Examples', data.musicWorkExample)}
                ${optionalRow('Availability', data.availability)}
                ${optionalRow('Topics to Discuss', data.specificTopics)}
                ${optionalRow('Previous Interviews', data.previousInterviews)}
                ${optionalRow('Additional Details', data.additionalDetails, true)}
              </table>
            </td>
          </tr>
          <tr>
            <td style="background-color: #1976d2; padding: 16px 24px; border-top: 2px solid #000000; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #e3f2fd;">Received at ${timestamp}</p>
              <p style="margin: 6px 0 0 0; font-size: 12px; color: #e3f2fd;">Reply directly to this email to respond to the requester.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx react-scripts test --watchAll=false src/lib/email/templates.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/email/templates.ts src/lib/email/templates.test.ts
git commit -m "Add HTML-escaped email template builders"
```

---

### Task 4: Resend wrapper

**Files:**
- Create: `api/_lib/sendEmail.ts`

(No unit test — thin Resend wrapper, verified in Task 11. See Testing Boundary.)

- [ ] **Step 1: Create the wrapper**

```ts
// api/_lib/sendEmail.ts
import { Resend } from 'resend';

export interface EmailConfig {
  apiKey: string;
  to: string;
  from: string;
}

/**
 * Reads the three required email env vars. Returns null if any is missing so
 * callers can return a clean "not configured" response.
 */
export function getEmailConfig(): EmailConfig | null {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;
  const from = process.env.CONTACT_EMAIL_FROM;
  if (!apiKey || !to || !from) return null;
  return { apiKey, to, from };
}

export async function sendEmail(
  config: EmailConfig,
  opts: { subject: string; html: string; replyTo: string }
): Promise<{ error: unknown }> {
  const resend = new Resend(config.apiKey);
  const { error } = await resend.emails.send({
    from: config.from,
    to: [config.to],
    subject: opts.subject,
    html: opts.html,
    replyTo: [opts.replyTo],
  });
  return { error };
}
```

- [ ] **Step 2: Commit**

```bash
git add api/_lib/sendEmail.ts
git commit -m "Add Resend email wrapper for Vercel functions"
```

---

### Task 5: Contact Vercel function

**Files:**
- Create: `api/contact.ts`

(Manually verified in Task 11. See Testing Boundary.)

- [ ] **Step 1: Create the handler**

```ts
// api/contact.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { validateContactPayload, checkAntiSpam } from '../src/lib/email/validation';
import { buildContactEmailHtml } from '../src/lib/email/templates';
import { getEmailConfig, sendEmail } from './_lib/sendEmail';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed.' });
  }

  const body = (req.body && typeof req.body === 'object') ? req.body : {};

  // Silently accept bot-shaped submissions (filled honeypot / too fast) without
  // sending, so bots get no signal that they were caught.
  const spam = checkAntiSpam({ honeypot: body.honeypot, elapsedMs: body.elapsedMs });
  if (!spam.ok) {
    return res.status(200).json({ success: true });
  }

  const validation = validateContactPayload(body);
  if (!validation.valid) {
    return res.status(400).json({ success: false, error: validation.error });
  }

  const config = getEmailConfig();
  if (!config) {
    return res.status(500).json({ success: false, error: 'Email service is not configured.' });
  }

  try {
    const { name, email, message } = validation.data!;
    const { error } = await sendEmail(config, {
      subject: 'New contact message from 808s & COLD TAKES site',
      html: buildContactEmailHtml({ name, email, message }),
      replyTo: email,
    });
    if (error) {
      console.error('Error sending contact email via Resend:', error);
      return res.status(502).json({ success: false, error: 'Failed to send email. Please try again later.' });
    }
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Unexpected error in /api/contact:', err);
    return res.status(500).json({ success: false, error: 'An unexpected error occurred while sending your message.' });
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add api/contact.ts
git commit -m "Add hardened /api/contact Vercel function"
```

---

### Task 6: Interview Vercel function

**Files:**
- Create: `api/interview.ts`

(Manually verified in Task 11. See Testing Boundary.)

- [ ] **Step 1: Create the handler**

```ts
// api/interview.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { validateInterviewPayload, checkAntiSpam, sanitizeHeaderValue } from '../src/lib/email/validation';
import { buildInterviewEmailHtml } from '../src/lib/email/templates';
import { getEmailConfig, sendEmail } from './_lib/sendEmail';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed.' });
  }

  const body = (req.body && typeof req.body === 'object') ? req.body : {};

  const spam = checkAntiSpam({ honeypot: body.honeypot, elapsedMs: body.elapsedMs });
  if (!spam.ok) {
    return res.status(200).json({ success: true });
  }

  const validation = validateInterviewPayload(body);
  if (!validation.valid) {
    return res.status(400).json({ success: false, error: validation.error });
  }

  const config = getEmailConfig();
  if (!config) {
    return res.status(500).json({ success: false, error: 'Email service is not configured.' });
  }

  try {
    const data = validation.data!;
    const { error } = await sendEmail(config, {
      subject: sanitizeHeaderValue(`Interview Request: ${data.officialName} – 808s & COLD TAKES`),
      html: buildInterviewEmailHtml(data),
      replyTo: data.email,
    });
    if (error) {
      console.error('Error sending interview request email via Resend:', error);
      return res.status(502).json({ success: false, error: 'Failed to send your request. Please try again later.' });
    }
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Unexpected error in /api/interview:', err);
    return res.status(500).json({ success: false, error: 'An unexpected error occurred. Please try again later.' });
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add api/interview.ts
git commit -m "Add hardened /api/interview Vercel function"
```

---

### Task 7: vercel.json security headers

**Files:**
- Create: `vercel.json`

- [ ] **Step 1: Create the config**

CSP is shipped as **Report-Only** here so it cannot break the app (MUI/emotion inject inline styles, CRA inlines a runtime script). It can be promoted to enforcing in Chunk 8 after observing reports. The other headers are safe to enforce immediately.

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        {
          "key": "Content-Security-Policy-Report-Only",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://feeds.buzzsprout.com https://api.allorigins.win https://*.supabase.co; frame-src https://www.youtube.com https://www.youtube-nocookie.com https://www.tiktok.com https://www.instagram.com; frame-ancestors 'none'"
        }
      ]
    }
  ]
}
```

- [ ] **Step 2: Commit**

```bash
git add vercel.json
git commit -m "Add security response headers via vercel.json"
```

---

### Task 8: Wire honeypot + elapsedMs into the frontend

**Files:**
- Modify: `src/services/contactService.ts` (payload interfaces, lines 3–17)
- Modify: `src/views/ContactPage.tsx` (imports line 1; state ~line 51–71; submit handlers ~line 91–140; JSX both tab `Stack`s)

- [ ] **Step 1: Extend the payload interfaces**

In `src/services/contactService.ts`, add the two optional fields to BOTH interfaces:

```ts
export interface GeneralContactPayload {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
  elapsedMs?: number;
}

export interface InterviewRequestPayload {
  officialName: string;
  email: string;
  musicWorkExample?: string;
  availability?: string;
  specificTopics?: string;
  previousInterviews?: string;
  additionalDetails?: string;
  honeypot?: string;
  elapsedMs?: number;
}
```

(No other change in this file — the existing `fetch(..., { body: JSON.stringify(payload) })` already forwards the new fields.)

- [ ] **Step 2: Import `useRef` in ContactPage**

Change line 1 of `src/views/ContactPage.tsx`:

```ts
import React, { useState, useRef } from 'react';
```

- [ ] **Step 3: Add honeypot state + per-form timers**

In `src/views/ContactPage.tsx`, immediately after the `const [interviewError, setInterviewError] = useState<string | null>(null);` line (~line 71), add:

```ts
  const [generalHoneypot, setGeneralHoneypot] = useState('');
  const [interviewHoneypot, setInterviewHoneypot] = useState('');
  const generalStartRef = useRef<number>(Date.now());
  const interviewStartRef = useRef<number>(Date.now());
```

- [ ] **Step 4: Send honeypot + elapsedMs from the general handler**

In `handleSendMessage`, replace the line:

```ts
      const result = await sendGeneralContactMessage({ name, email, message });
```

with:

```ts
      const result = await sendGeneralContactMessage({
        name,
        email,
        message,
        honeypot: generalHoneypot,
        elapsedMs: Date.now() - generalStartRef.current,
      });
```

- [ ] **Step 5: Send honeypot + elapsedMs from the interview handler**

In `handleRequestInterview`, replace the line:

```ts
      const result = await sendInterviewRequest(interviewForm);
```

with:

```ts
      const result = await sendInterviewRequest({
        ...interviewForm,
        honeypot: interviewHoneypot,
        elapsedMs: Date.now() - interviewStartRef.current,
      });
```

- [ ] **Step 6: Add the hidden honeypot input to the General form**

In the General Contact tab, inside its `<Stack spacing={3}>` (just after the opening `<Stack ...>` tag near the Name `TextField`), add:

```tsx
                <Box
                  component="input"
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={generalHoneypot}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGeneralHoneypot(e.target.value)}
                  sx={{ position: 'absolute', left: '-5000px', width: '1px', height: '1px', opacity: 0 }}
                />
```

- [ ] **Step 7: Add the hidden honeypot input to the Interview form**

In the Request Interview tab, inside the `<Stack spacing={3}>` that wraps the interview form fields (the branch rendered when `!interviewSubmitted`), add the same block but bound to the interview honeypot:

```tsx
                  <Box
                    component="input"
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={interviewHoneypot}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInterviewHoneypot(e.target.value)}
                    sx={{ position: 'absolute', left: '-5000px', width: '1px', height: '1px', opacity: 0 }}
                  />
```

- [ ] **Step 8: Type-check the frontend**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: no errors in `src/services/contactService.ts` or `src/views/ContactPage.tsx` (pre-existing `node_modules/react-hook-form` lib-definition errors are unrelated and may be ignored).

- [ ] **Step 9: Commit**

```bash
git add src/services/contactService.ts src/views/ContactPage.tsx
git commit -m "Send honeypot and elapsed-time anti-spam fields from contact forms"
```

---

### Task 9: Dependencies, scripts, and env cleanup

**Files:**
- Modify: `package.json` (remove `"proxy"` line; remove `"server"` script; add `"dev"` script)
- Modify: `.env.example`
- Modify: `.env` (local, gitignored — via PowerShell)

- [ ] **Step 1: Remove the CRA proxy line**

In `package.json`, delete the line:

```json
  "proxy": "http://localhost:5000",
```

- [ ] **Step 2: Replace the server script with a dev script**

In `package.json` `"scripts"`, remove:

```json
    "server": "node server/index.js"
```

and add:

```json
    "dev": "vercel dev"
```

- [ ] **Step 3: Uninstall Express-only deps and add Vercel types**

Run:
```bash
npm uninstall express cors dotenv
npm install --save-dev @vercel/node
```
Expected: `express`, `cors`, `dotenv` removed from `dependencies`; `@vercel/node` added to `devDependencies`; `resend` remains in `dependencies`.

- [ ] **Step 4: Remove the obsolete CRA dev-server env hack from `.env.example`**

In `.env.example`, delete these four lines (the proxy-driven host-check workaround is gone with the proxy):

```
# Disable CRA dev-server host check (dev only). Required because package.json sets a
# "proxy": react-scripts then enables a host check, and without this the dev server
# crashes with "options.allowedHosts[0] should be a non-empty string".
DANGEROUSLY_DISABLE_HOST_CHECK=true
```

- [ ] **Step 5: Remove the same hack from the local `.env`**

Run (PowerShell):
```powershell
$p = "D:\Dev\Web Dev\808s-podcast\.env"
$lines = Get-Content $p | Where-Object { $_ -notmatch '^DANGEROUSLY_DISABLE_HOST_CHECK=' -and $_ -notmatch 'Disable CRA dev-server host check' -and $_ -notmatch 'react-scripts then enables' -and $_ -notmatch 'crashes with' }
while ($lines.Count -gt 0 -and [string]::IsNullOrWhiteSpace($lines[-1])) { $lines = $lines[0..($lines.Count-2)] }
[System.IO.File]::WriteAllLines($p, $lines)
```
Then verify keys remain (values redacted):
```powershell
Get-Content "D:\Dev\Web Dev\808s-podcast\.env" | ForEach-Object { if ($_ -match '^([A-Z_]+)=') { $matches[1] } }
```
Expected: `REACT_APP_SUPABASE_URL`, `REACT_APP_SUPABASE_ANON_KEY`, `RESEND_API_KEY`, `CONTACT_EMAIL_TO`, `CONTACT_EMAIL_FROM` (no `DANGEROUSLY_DISABLE_HOST_CHECK`, no `HOST`).

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json .env.example
git commit -m "Switch local dev to vercel dev; drop Express deps and CRA proxy hack"
```

---

### Task 10: Retire the Express backend

**Files:**
- Delete: `server/` (entire directory: `index.js`, `contact.js`, `interview.js`, `templates/`)

Do this only after Tasks 5–6 exist (the functions replace it). Final end-to-end proof is Task 11.

- [ ] **Step 1: Remove the directory from git**

Run:
```bash
git rm -r server
```
Expected: deletes `server/index.js`, `server/contact.js`, `server/interview.js`, `server/templates/contact-email.html`, `server/templates/interview-email.html`.

- [ ] **Step 2: Confirm nothing else imports it**

Run: `git grep -n "server/" -- ":!docs" ":!*.md"` and `git grep -n "require('./contact')"`
Expected: no remaining references in app code (matches only in this plan / docs are fine).

- [ ] **Step 3: Commit**

```bash
git commit -m "Remove Express email backend (replaced by Vercel functions)"
```

---

### Task 11: End-to-end verification with `vercel dev`

**Files:** none (verification only).

Requires the 🔸 user prerequisites at the top (Vercel CLI installed, `vercel login`, `vercel link`, env vars present locally in `.env`).

- [ ] **Step 1: Confirm the full unit suite is green**

Run: `npx react-scripts test --watchAll=false src/lib/email`
Expected: PASS — escapeHtml, validation, templates suites all green.

- [ ] **Step 2: Start the unified dev server**

Run: `vercel dev`
Expected: Vercel detects CRA, builds the frontend, and serves functions under `/api/*` on a single local URL (typically http://localhost:3000). No `npm run server` and no separate proxy.

- [ ] **Step 3: Verify a legitimate contact send**

In the browser, open `/contact`, fill the General form normally (taking more than 3 seconds), and submit.
Expected: success Alert shows; a real email arrives at `CONTACT_EMAIL_TO` (or a clean "Email service is not configured." if Resend env is absent locally). Confirm the received email renders the message as text.

- [ ] **Step 4: Verify HTML is escaped in the email**

Submit a General message whose body is `<b>bold</b> <script>x</script>`.
Expected: the received email shows the literal text `<b>bold</b> <script>x</script>` (no bold, no executed/stripped tag), confirming escaping.

- [ ] **Step 5: Verify the time-trap**

Using browser devtools console, POST a too-fast request:
```js
fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Bot', email: 'b@b.com', message: 'spam', honeypot: '', elapsedMs: 200 }),
}).then(r => r.json()).then(console.log)
```
Expected: `{ success: true }` returned, but **no email arrives** (silently dropped as too-fast).

- [ ] **Step 6: Verify the honeypot**

```js
fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Bot', email: 'b@b.com', message: 'spam', honeypot: 'gotcha', elapsedMs: 9000 }),
}).then(r => r.json()).then(console.log)
```
Expected: `{ success: true }`, but **no email arrives**.

- [ ] **Step 7: Verify method guard**

```js
fetch('/api/contact').then(r => console.log(r.status))
```
Expected: `405`.

- [ ] **Step 8: Repeat Steps 3–4 for the Interview form** (`/contact` → Request Interview tab), confirming the email arrives with only the optional fields you filled and HTML escaped.

- [ ] **Step 9: Push and confirm production**

After local verification passes and the 🔸 Vercel env vars + Production Branch are set:
```bash
git push origin master
```
Expected: a single Vercel Production deployment builds frontend + functions; the live `/contact` form sends successfully.

---

## Self-Review

**Spec coverage (Chunk 1 items from the design doc):**
- Convert `server/contact.js` + `interview.js` → Vercel Functions → Tasks 5, 6 (+ shared logic Tasks 1–4), retire server Task 10. ✓
- HTML-escape user input → Task 1 + Task 3 (+ tests). ✓
- Block email-header injection → Task 2 (`isHeaderSafe`, `sanitizeHeaderValue`) used in validation + interview subject. ✓
- Honeypot + time-trap → Task 2 (`checkAntiSpam`), Task 8 (frontend fields). ✓
- POST-only + content-type/payload guards → Tasks 5, 6 (method 405 + object-body guard; Vercel parses/limits JSON bodies). ✓
- CORS locked down → functions are same-origin under Vercel (no cross-origin CORS middleware needed); no `cors()` carried over. ✓
- Security headers via vercel.json → Task 7. ✓
- Frontend honeypot + timestamp; drop proxy/`npm run server`; document `vercel dev` → Tasks 8, 9, 11. ✓
- Retire `server/` → Task 10. ✓
- 🔸 Vercel login + Production Branch = master + env → prerequisites + Task 11. ✓

**Placeholder scan:** No TBD/TODO; every code step has complete code; commands have expected output. ✓

**Type consistency:** `ContactData`/`InterviewData`/`ValidationResult<T>`/`AntiSpamInput` defined in Task 2 and consumed unchanged in Tasks 3, 5, 6. `checkAntiSpam` signature (`{ honeypot, elapsedMs }`) matches the frontend payload fields added in Task 8 and the handler calls in Tasks 5–6. `getEmailConfig`/`sendEmail` defined in Task 4, used in Tasks 5–6. ✓

**Notes / deliberate boundaries:**
- `api/` handlers are not run by `react-scripts test` (scans `src/` only); they are kept thin and integration-verified in Task 11. Stated in Testing Boundary.
- CSP ships Report-Only to avoid breaking MUI/CRA; enforcement deferred to Chunk 8.

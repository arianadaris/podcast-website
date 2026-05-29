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

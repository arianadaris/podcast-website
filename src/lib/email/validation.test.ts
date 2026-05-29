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

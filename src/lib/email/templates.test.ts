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

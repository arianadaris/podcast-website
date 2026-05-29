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

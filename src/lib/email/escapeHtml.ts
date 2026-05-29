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

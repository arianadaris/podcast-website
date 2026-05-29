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

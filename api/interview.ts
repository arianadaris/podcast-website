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

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

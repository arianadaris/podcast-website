const express = require('express');
const fs = require('fs');
const path = require('path');
const { Resend } = require('resend');

const router = express.Router();

const {
  RESEND_API_KEY,
  CONTACT_EMAIL_TO,
  CONTACT_EMAIL_FROM,
} = process.env;

if (!RESEND_API_KEY) {
  console.warn(
    '[contact] RESEND_API_KEY is not set. Contact emails will fail until this is configured.'
  );
}

if (!CONTACT_EMAIL_TO || !CONTACT_EMAIL_FROM) {
  console.warn(
    '[contact] CONTACT_EMAIL_TO or CONTACT_EMAIL_FROM is not set. Please configure both to enable email sending.'
  );
}

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

const EMAIL_TEMPLATE_PATH = path.join(__dirname, 'templates', 'contact-email.html');
const emailTemplate = fs.readFileSync(EMAIL_TEMPLATE_PATH, 'utf-8');

/**
 * Fills the contact HTML template with the provided values.
 */
function buildContactEmailHtml({ name, email, message }) {
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  return emailTemplate
    .replaceAll('{{NAME}}', name)
    .replaceAll('{{EMAIL}}', email)
    .replaceAll('{{MESSAGE}}', message)
    .replaceAll('{{TIMESTAMP}}', `${timestamp} ET`);
}

router.post('/', async (req, res) => {
  const { name, email, message } = req.body || {};

  if (
    !name ||
    typeof name !== 'string' ||
    !email ||
    typeof email !== 'string' ||
    !message ||
    typeof message !== 'string'
  ) {
    return res.status(400).json({
      success: false,
      error: 'Name, email, and message are required.',
    });
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  const emailPattern = /^\S+@\S+\.\S+$/;
  if (!emailPattern.test(trimmedEmail)) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a valid email address.',
    });
  }

  if (!resend || !CONTACT_EMAIL_TO || !CONTACT_EMAIL_FROM) {
    return res.status(500).json({
      success: false,
      error: 'Email service is not configured.',
    });
  }

  try {
    const { error } = await resend.emails.send({
      from: CONTACT_EMAIL_FROM,
      to: [CONTACT_EMAIL_TO],
      subject: 'New contact message from 808s & COLD TAKES site',
      html: buildContactEmailHtml({ name: trimmedName, email: trimmedEmail, message: trimmedMessage }),
      replyTo: [trimmedEmail],
    });

    if (error) {
      console.error('Error sending contact email via Resend:', error);
      return res.status(502).json({
        success: false,
        error: 'Failed to send email. Please try again later.',
      });
    }

    return res.json({ success: true });
  } catch (err) {
    console.error('Unexpected error in /api/contact:', err);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while sending your message.',
    });
  }
});

module.exports = router;

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

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

const EMAIL_TEMPLATE_PATH = path.join(__dirname, 'templates', 'interview-email.html');
const emailTemplate = fs.readFileSync(EMAIL_TEMPLATE_PATH, 'utf-8');

/**
 * Returns a table row HTML string for an optional field, or an empty string
 * if the value is blank.
 */
function optionalRow(label, value, isLast = false) {
  if (!value || !value.trim()) return '';
  const borderStyle = isLast ? '' : 'border-bottom: 1px solid #e3f2fd;';
  return `<tr>
    <td style="padding: 10px 16px; font-weight: 700; color: #1565c0; width: 200px; vertical-align: top; ${borderStyle}">${label}</td>
    <td style="padding: 10px 16px; color: #212121; vertical-align: top; white-space: pre-wrap; ${borderStyle}">${value.trim()}</td>
  </tr>`;
}

/**
 * Fills the interview HTML template with the provided values.
 */
function buildInterviewEmailHtml({ officialName, email, musicWorkExample, availability, specificTopics, previousInterviews, additionalDetails }) {
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  return emailTemplate
    .replace('{{OFFICIAL_NAME}}', officialName)
    .replaceAll('{{EMAIL}}', email)
    .replace('{{MUSIC_WORK_ROW}}', optionalRow('Music / Work Examples', musicWorkExample))
    .replace('{{AVAILABILITY_ROW}}', optionalRow('Availability', availability))
    .replace('{{TOPICS_ROW}}', optionalRow('Topics to Discuss', specificTopics))
    .replace('{{PREVIOUS_INTERVIEWS_ROW}}', optionalRow('Previous Interviews', previousInterviews))
    .replace('{{ADDITIONAL_DETAILS_ROW}}', optionalRow('Additional Details', additionalDetails, true))
    .replace('{{TIMESTAMP}}', `${timestamp} ET`);
}

router.post('/', async (req, res) => {
  const {
    officialName,
    email,
    musicWorkExample,
    availability,
    specificTopics,
    previousInterviews,
    additionalDetails,
  } = req.body || {};

  if (!officialName || typeof officialName !== 'string' || !officialName.trim()) {
    return res.status(400).json({ success: false, error: 'Official name or stage name is required.' });
  }
  if (!email || typeof email !== 'string' || !email.trim()) {
    return res.status(400).json({ success: false, error: 'Email address is required.' });
  }

  const emailPattern = /^\S+@\S+\.\S+$/;
  if (!emailPattern.test(email.trim())) {
    return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
  }

  if (!resend || !CONTACT_EMAIL_TO || !CONTACT_EMAIL_FROM) {
    return res.status(500).json({ success: false, error: 'Email service is not configured.' });
  }

  try {
    const { error } = await resend.emails.send({
      from: CONTACT_EMAIL_FROM,
      to: [CONTACT_EMAIL_TO],
      subject: `Interview Request: ${officialName.trim()} – 808s & COLD TAKES`,
      html: buildInterviewEmailHtml({
        officialName: officialName.trim(),
        email: email.trim(),
        musicWorkExample,
        availability,
        specificTopics,
        previousInterviews,
        additionalDetails,
      }),
      replyTo: [email.trim()],
    });

    if (error) {
      console.error('Error sending interview request email via Resend:', error);
      return res.status(502).json({ success: false, error: 'Failed to send your request. Please try again later.' });
    }

    return res.json({ success: true });
  } catch (err) {
    console.error('Unexpected error in /api/interview:', err);
    return res.status(500).json({ success: false, error: 'An unexpected error occurred. Please try again later.' });
  }
});

module.exports = router;

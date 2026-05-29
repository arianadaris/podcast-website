// src/lib/email/templates.ts
import { escapeHtml } from './escapeHtml';
import { ContactData, InterviewData } from './validation';

export function formatTimestamp(date: Date = new Date()): string {
  const formatted = date.toLocaleString('en-US', {
    timeZone: 'America/New_York',
    dateStyle: 'full',
    timeStyle: 'short',
  });
  return `${formatted} ET`;
}

export function buildContactEmailHtml(
  data: ContactData,
  timestamp: string = formatTimestamp()
): string {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const message = escapeHtml(data.message);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Contact Message &ndash; 808s &amp; COLD TAKES</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f0f4f8; font-family: Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f4f8; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border: 2px solid #000000;">
          <tr>
            <td style="background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%); padding: 32px 24px; text-align: center; border-bottom: 2px solid #000000;">
              <p style="margin: 0 0 8px 0; font-size: 28px; font-weight: 900; color: #000000; letter-spacing: 0.05em;">808s &amp; COLD TAKES</p>
              <p style="margin: 0; font-size: 14px; font-weight: 600; color: #000000; text-transform: uppercase; letter-spacing: 0.15em;">New Contact Message</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 24px 0 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #bbdefb; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 10px 16px; font-weight: 700; color: #1565c0; width: 80px; border-bottom: 1px solid #e3f2fd;">Name</td>
                  <td style="padding: 10px 16px; color: #212121; border-bottom: 1px solid #e3f2fd;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; font-weight: 700; color: #1565c0; width: 80px;">Email</td>
                  <td style="padding: 10px 16px; color: #212121;"><a href="mailto:${email}" style="color: #1976d2;">${email}</a></td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 24px 24px 24px;">
              <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 700; color: #1565c0; text-transform: uppercase; letter-spacing: 0.1em;">Message</p>
              <div style="background-color: #e3f2fd; border-left: 4px solid #1976d2; padding: 16px; font-size: 15px; color: #212121; line-height: 1.6; white-space: pre-wrap;">${message}</div>
            </td>
          </tr>
          <tr>
            <td style="background-color: #1976d2; padding: 16px 24px; border-top: 2px solid #000000; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #e3f2fd;">Received at ${timestamp}</p>
              <p style="margin: 6px 0 0 0; font-size: 12px; color: #e3f2fd;">Reply directly to this email to respond to ${name}.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function optionalRow(label: string, value: string, isLast = false): string {
  const v = value.trim();
  if (!v) return '';
  const borderStyle = isLast ? '' : 'border-bottom: 1px solid #e3f2fd;';
  return `<tr>
    <td style="padding: 10px 16px; font-weight: 700; color: #1565c0; width: 200px; vertical-align: top; ${borderStyle}">${escapeHtml(label)}</td>
    <td style="padding: 10px 16px; color: #212121; vertical-align: top; white-space: pre-wrap; ${borderStyle}">${escapeHtml(v)}</td>
  </tr>`;
}

export function buildInterviewEmailHtml(
  data: InterviewData,
  timestamp: string = formatTimestamp()
): string {
  const officialName = escapeHtml(data.officialName);
  const email = escapeHtml(data.email);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Interview Request &ndash; 808s &amp; COLD TAKES</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f0f4f8; font-family: Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f4f8; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border: 2px solid #000000;">
          <tr>
            <td style="background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%); padding: 32px 24px; text-align: center; border-bottom: 2px solid #000000;">
              <p style="margin: 0 0 8px 0; font-size: 28px; font-weight: 900; color: #000000; letter-spacing: 0.05em;">808s &amp; COLD TAKES</p>
              <p style="margin: 0; font-size: 14px; font-weight: 600; color: #000000; text-transform: uppercase; letter-spacing: 0.15em;">New Interview Request</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px;">
              <p style="margin: 0 0 20px 0; font-size: 15px; color: #424242;">A new interview request has been submitted through the 808s &amp; COLD TAKES website.</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #bbdefb;">
                <tr>
                  <td style="padding: 10px 16px; font-weight: 700; color: #1565c0; width: 200px; vertical-align: top; border-bottom: 1px solid #e3f2fd;">Name / Stage Name</td>
                  <td style="padding: 10px 16px; color: #212121; vertical-align: top; border-bottom: 1px solid #e3f2fd;">${officialName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; font-weight: 700; color: #1565c0; width: 200px; vertical-align: top; border-bottom: 1px solid #e3f2fd;">Email</td>
                  <td style="padding: 10px 16px; color: #212121; vertical-align: top; border-bottom: 1px solid #e3f2fd;"><a href="mailto:${email}" style="color: #1976d2;">${email}</a></td>
                </tr>
                ${optionalRow('Music / Work Examples', data.musicWorkExample)}
                ${optionalRow('Availability', data.availability)}
                ${optionalRow('Topics to Discuss', data.specificTopics)}
                ${optionalRow('Previous Interviews', data.previousInterviews)}
                ${optionalRow('Additional Details', data.additionalDetails, true)}
              </table>
            </td>
          </tr>
          <tr>
            <td style="background-color: #1976d2; padding: 16px 24px; border-top: 2px solid #000000; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #e3f2fd;">Received at ${timestamp}</p>
              <p style="margin: 6px 0 0 0; font-size: 12px; color: #e3f2fd;">Reply directly to this email to respond to the requester.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

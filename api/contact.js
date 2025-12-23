// /api/contact.js : Contact form "Send a quick request" submissions
// Sends admin notification email with full contact form payload.
// If visitor email is valid, sends confirmation email to visitor.
// Admin email "Reply-To" = visitor's email (so you can reply back).

export default async function handler(req, res) {
  // Preflight + method guard
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const data = getJsonBody(req);

    // Honeypot check (using honeypot_company field)
    if (data.honeypot_company) {
      console.warn('[contact] Honeypot triggered');
      return res.status(200).json({ ok: true, confirm_ok: false });
    }

    // Parse fields
    const clinicName = (data.clinicName || "").trim();
    const websiteUrl = (data.websiteUrl || "").trim();
    const contactName = (data.contactName || "").trim();
    const email = (data.email || "").trim();
    const phone = (data.phone || "").trim();
    const contactMethod = (data.contactMethod || "").trim();
    const improvement = (data.improvement || "").trim();
    const message = (data.message || "").trim();

    // Validate required fields
    const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    
    const missingClinic = !clinicName;
    const missingWebsite = !websiteUrl;
    const missingName = !contactName;
    const missingEmail = !email || !isEmail(email);
    const missingContactMethod = !contactMethod;
    const missingImprovement = !improvement;

    if (missingClinic || missingWebsite || missingName || missingEmail || missingContactMethod || missingImprovement) {
      const errors = [];
      if (missingClinic) errors.push('clinic name');
      if (missingWebsite) errors.push('website URL');
      if (missingName) errors.push('contact name');
      if (missingEmail) errors.push('valid email');
      if (missingContactMethod) errors.push('contact method');
      if (missingImprovement) errors.push('improvement selection');
      
      return res.status(400).json({
        ok: false,
        error: `Missing required fields: ${errors.join(', ')}`
      });
    }

    // Extract metadata fields
    const {
      pagePath = '',
      referrer = '',
      timezone = '',
      userAgent = ''
    } = data || {};

    console.log('[contact] Incoming request:', { clinicName, websiteUrl, contactName, email });

    // Env
    const TO =
      process.env.RESEND_NOTIFICATIONS ||
      process.env.QS_TO_EMAIL ||
      'hello@keyturn.studio';
    const FROM =
      process.env.RESEND_FROM ||
      process.env.QS_FROM_EMAIL ||
      'Keyturn Studio <hello@updates.keyturn.studio>';
    const BIZ_REPLY_TO =
      process.env.QS_REPLY_TO ||
      process.env.REPLY_TO ||
      'hello@keyturn.studio';

    // Admin notification email (internal - MUST succeed)
    const subject = `Contact form: ${clinicName}`;
    const htmlAdmin = `
      <h2>New Contact Form Submission</h2>
      <table cellpadding="6" cellspacing="0" style="font-family:Inter,Arial,sans-serif">
        ${row('Clinic / Practice name', clinicName)}
        ${row('Website URL', websiteUrl)}
        ${row('Contact name', contactName)}
        ${row('Email', email)}
        ${row('Phone', phone || 'Not provided')}
        ${row('Preferred contact method', contactMethod)}
        ${row('What to improve', improvement)}
        ${row('Message', message || 'No additional message')}
      </table>
      <hr style="margin:16px 0;border:0;border-top:1px solid #e5eaf2">
      <p style="font:12px/1.4 Inter,Arial,sans-serif;color:#6b7280">
        Meta: page: ${escapeHtml(pagePath)} | tz: ${escapeHtml(timezone)} | referrer: ${escapeHtml(referrer)} | UA: ${escapeHtml(userAgent)}
      </p>
    `;

    // Client confirmation email (if email is valid)
    const htmlClient = email ? `
      <div style="background:#0a1220;padding:24px 12px;">
        <table role="presentation" width="100%" style="max-width:640px;margin:0 auto;">
          <tr><td>
            <div style="background:#ffffff;border:1px solid #e5eaf2;border-radius:16px;padding:24px">
              <h1 style="margin:0 0 12px;font:700 20px Inter,Arial,sans-serif;color:#0b1220">
                We got your message
              </h1>
              <p style="margin:0 0 12px;font:14px/1.6 Inter,Arial,sans-serif;color:#0b1220">
                Hi ${escapeHtml(contactName)}, thanks for reaching out! We've received your request and will get back to you <b>within 1 business day</b>.
              </p>
              <p style="margin:12px 0;font:14px/1.6 Inter,Arial,sans-serif;color:#0b1220">
                <b>What you sent:</b><br>
                Clinic/practice: ${escapeHtml(clinicName)}<br>
                Website: ${escapeHtml(websiteUrl)}<br>
                Preferred contact: ${escapeHtml(contactMethod)}<br>
                Want to improve: ${escapeHtml(improvement)}${message ? '<br>Message: ' + escapeHtml(message) : ''}
              </p>
              <p style="margin:12px 0 0;font:14px/1.6 Inter,Arial,sans-serif;color:#0b1220">
                Reply to this email if you need to add anything.
              </p>
              <p style="margin:16px 0 0;font:14px/1.6 Inter,Arial,sans-serif;color:#0b1220">Keyturn Studio</p>
            </div>
          </td></tr>
          <tr><td style="text-align:center;color:#cdd6ea;font:12px Inter,Arial,sans-serif;padding-top:12px">
            © ${new Date().getFullYear()} Keyturn Studio
          </td></tr>
        </table>
      </div>
    ` : null;

    // Send internal email (required for contact submission to succeed)
    let internalSent = false;
    let confirmSent = false;
    
    try {
      // Try sending via Resend first, then SendGrid
      const result = await sendViaResend(FROM, TO, subject, htmlAdmin, email, htmlClient, BIZ_REPLY_TO) ||
                     await sendViaSendGrid(FROM, TO, subject, htmlAdmin, email, htmlClient, BIZ_REPLY_TO);
      
      if (!result) {
        // No provider configured - this is a critical error
        console.error('[contact] Email provider not configured');
        return res.status(500).json({ 
          ok: false, 
          error: 'Email provider not configured' 
        });
      }
      
      internalSent = result.internalSent;
      confirmSent = result.confirmSent;
      
    } catch (e) {
      console.error('[contact] Email send error:', e);
      
      // Internal email failure is critical
      return res.status(500).json({ 
        ok: false, 
        error: 'Failed to send notification email' 
      });
    }

    return res.status(200).json({ 
      ok: true,
      confirm_ok: confirmSent
    });
  } catch (e) {
    console.error('[contact] Server error:', e);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
}

/* ------------ helpers ------------- */

// Use Next's parsed body if available; fall back to JSON.parse
function getJsonBody(req) {
  if (req.body) {
    if (typeof req.body === 'string') {
      try { return JSON.parse(req.body); } catch { return {}; }
    }
    return req.body;
  }
  return {};
}

function row(label, value) {
  return `<tr><td><b>${escapeHtml(label)}</b></td><td>${escapeHtml(
    value || ''
  )}</td></tr>`;
}

function escapeHtml(s) {
  return String(s || '').replace(/[&<>"']/g, (m) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[m]));
}

/* -------- Email providers ---------- */
async function sendViaResend(from, to, subject, htmlAdmin, clientEmail, htmlClient, bizReplyTo) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;

  let internalSent = false;
  let confirmSent = false;

  // Admin → you (reply-to = client) - MUST succeed
  const r1 = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: clientEmail || undefined,
      subject,
      html: htmlAdmin
    })
  });
  if (!r1.ok) {
    const errorText = await r1.text();
    console.error('[contact] Resend admin error:', errorText);
    throw new Error(`Resend admin error: ${errorText}`);
  }
  
  internalSent = true;

  // Client confirmation (if email and htmlClient provided)
  // If this fails, we log but don't throw
  if (clientEmail && htmlClient) {
    try {
      const r2 = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from,
          to: [clientEmail],
          subject: 'We got your message (Keyturn Studio)',
          html: htmlClient,
          reply_to: bizReplyTo
        })
      });
      if (!r2.ok) {
        const errorText = await r2.text();
        console.error('[contact] Resend client confirmation error:', errorText);
        confirmSent = false;
      } else {
        confirmSent = true;
      }
    } catch (e) {
      console.error('[contact] Resend client confirmation exception:', e);
      confirmSent = false;
    }
  }

  return { internalSent, confirmSent };
}

async function sendViaSendGrid(from, to, subject, htmlAdmin, clientEmail, htmlClient, bizReplyTo) {
  const key = process.env.SENDGRID_API_KEY;
  if (!key) return false;

  let internalSent = false;
  let confirmSent = false;

  // Admin → you (reply-to = client) - MUST succeed
  const r1 = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }], subject }],
      from: { email: extractEmail(from) },
      reply_to: clientEmail ? { email: clientEmail } : undefined,
      content: [{ type: 'text/html', value: htmlAdmin }]
    })
  });
  if (r1.status >= 400) {
    const errorText = await r1.text();
    console.error('[contact] SendGrid admin error:', errorText);
    throw new Error(`SendGrid admin error: ${errorText}`);
  }
  
  internalSent = true;

  // Client confirmation (if email and htmlClient provided)
  // If this fails, we log but don't throw
  if (clientEmail && htmlClient) {
    try {
      const r2 = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: clientEmail }],
              subject: 'We got your message (Keyturn Studio)'
            }
          ],
          from: { email: extractEmail(from) },
          reply_to: { email: bizReplyTo },
          content: [{ type: 'text/html', value: htmlClient }]
        })
      });
      if (r2.status >= 400) {
        const errorText = await r2.text();
        console.error('[contact] SendGrid client confirmation error:', errorText);
        confirmSent = false;
      } else {
        confirmSent = true;
      }
    } catch (e) {
      console.error('[contact] SendGrid client confirmation exception:', e);
      confirmSent = false;
    }
  }

  return { internalSent, confirmSent };
}

function extractEmail(v) {
  return String(v || '').replace(/^.*<|>$/g, '') || v;
}

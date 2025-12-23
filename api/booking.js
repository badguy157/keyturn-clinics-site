// /api/booking.js : Booking request intake
// Sends admin notification email with booking details.
// Admin email "Reply-To" = client's email (so you can reply back).

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

    // Parse fields
    const name = (data.name || "").trim();
    const email = (data.email || "").trim();
    const phone = (data.phone || "").trim();
    const treatment = (data.treatment || "").trim();
    const timeWindow = (data.timeWindow || data.preferredWindow || "").trim();

    // Validate: name AND (email OR phone) AND treatment AND timeWindow
    const missingName = !name;
    const missingContact = !email && !phone;
    const missingTreatment = !treatment;
    const missingTimeWindow = !timeWindow;

    if (missingName || missingContact || missingTreatment || missingTimeWindow) {
      const errors = [];
      if (missingName) errors.push('name');
      if (missingContact) errors.push('email or phone');
      if (missingTreatment) errors.push('treatment');
      if (missingTimeWindow) errors.push('preferred time window');
      
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
      userAgent = '',
      source = ''
    } = data || {};

    console.log('[booking] Incoming request:', { name, email, phone, treatment, timeWindow });

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

    // Admin notification email
    const subject = `Fit Check booking request: ${name} - ${treatment}`;
    const htmlAdmin = `
      <h2>New Fit Check Booking Request</h2>
      <table cellpadding="6" cellspacing="0" style="font-family:Inter,Arial,sans-serif">
        ${row('Name', name)}
        ${row('Email', email)}
        ${row('Phone', phone)}
        ${row('Treatment / Service', treatment)}
        ${row('Preferred Time Window', timeWindow)}
        ${row('Source', source)}
      </table>
      <hr style="margin:16px 0;border:0;border-top:1px solid #e5eaf2">
      <p style="font:12px/1.4 Inter,Arial,sans-serif;color:#6b7280">
        Meta: page: ${escapeHtml(pagePath)} | tz: ${escapeHtml(timezone)} | referrer: ${escapeHtml(referrer)} | UA: ${escapeHtml(userAgent)}
      </p>
    `;

    // Client confirmation email (if email provided)
    const htmlClient = email ? `
      <div style="background:#0a1220;padding:24px 12px;">
        <table role="presentation" width="100%" style="max-width:640px;margin:0 auto;">
          <tr><td>
            <div style="background:#ffffff;border:1px solid #e5eaf2;border-radius:16px;padding:24px">
              <h1 style="margin:0 0 12px;font:700 20px Inter,Arial,sans-serif;color:#0b1220">
                Fit Check request received
              </h1>
              <p style="margin:0 0 12px;font:14px/1.6 Inter,Arial,sans-serif;color:#0b1220">
                Hi ${escapeHtml(name)}, we've received your Fit Check booking request and will reach out <b>within 1 business day</b> to confirm your appointment.
              </p>
              <p style="margin:12px 0;font:14px/1.6 Inter,Arial,sans-serif;color:#0b1220">
                <b>Your request:</b><br>
                Treatment interest: ${escapeHtml(treatment)}<br>
                Preferred time: ${escapeHtml(timeWindow)}
              </p>
              <p style="margin:12px 0 0;font:14px/1.6 Inter,Arial,sans-serif;color:#0b1220">
                If you need to change anything, just reply to this email.
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

    // Send internal email (required for booking to succeed)
    let internalSent = false;
    let confirmSent = false;
    
    try {
      // Send internal notification
      internalSent =
        (await sendViaResend(FROM, TO, subject, htmlAdmin, email, htmlClient, BIZ_REPLY_TO)) ||
        (await sendViaSendGrid(FROM, TO, subject, htmlAdmin, email, htmlClient, BIZ_REPLY_TO));
      
      if (!internalSent) {
        // No provider configured
        console.error('[booking] Email provider not configured');
        return res.status(500).json({ 
          ok: false, 
          error: 'Email provider not configured' 
        });
      }
      
      // Both emails sent successfully by the provider
      confirmSent = !!email;
      
    } catch (e) {
      console.error('[booking] Email send error:', e);
      
      // All email errors are critical for booking
      return res.status(500).json({ 
        ok: false, 
        error: 'Failed to send notification email' 
      });
    }

    return res.status(200).json({ 
      ok: true,
      confirmOk: confirmSent
    });
  } catch (e) {
    console.error('[booking] Server error:', e);
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

  // Admin → you (reply-to = client if email provided)
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
    console.error('[booking] Resend admin error:', errorText);
    throw new Error(`Resend admin error: ${errorText}`);
  }

  // Client confirmation (if email and htmlClient provided)
  if (clientEmail && htmlClient) {
    const r2 = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from,
        to: [clientEmail],
        subject: 'Fit Check request received (Keyturn Studio)',
        html: htmlClient,
        reply_to: bizReplyTo
      })
    });
    if (!r2.ok) {
      const errorText = await r2.text();
      console.error('[booking] Resend client error:', errorText);
      throw new Error(`Resend client error: ${errorText}`);
    }
  }

  return true;
}

async function sendViaSendGrid(from, to, subject, htmlAdmin, clientEmail, htmlClient, bizReplyTo) {
  const key = process.env.SENDGRID_API_KEY;
  if (!key) return false;

  // Admin → you (reply-to = client if email provided)
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
    console.error('[booking] SendGrid admin error:', errorText);
    throw new Error(`SendGrid admin error: ${errorText}`);
  }

  // Client confirmation (if email and htmlClient provided)
  if (clientEmail && htmlClient) {
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
            subject: 'Fit Check request received (Keyturn Studio)'
          }
        ],
        from: { email: extractEmail(from) },
        reply_to: { email: bizReplyTo },
        content: [{ type: 'text/html', value: htmlClient }]
      })
    });
    if (r2.status >= 400) {
      const errorText = await r2.text();
      console.error('[booking] SendGrid client error:', errorText);
      throw new Error(`SendGrid client error: ${errorText}`);
    }
  }

  return true;
}

function extractEmail(v) {
  return String(v || '').replace(/^.*<|>$/g, '') || v;
}

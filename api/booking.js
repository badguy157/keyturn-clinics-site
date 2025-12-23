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

    // Admin notification email
    const subject = `Booking request: ${name} - ${treatment}`;
    const htmlAdmin = `
      <h2>New Booking Request</h2>
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

    // Send email (required for booking to succeed)
    let emailSent = false;
    try {
      emailSent =
        (await sendViaResend(FROM, TO, subject, htmlAdmin, email)) ||
        (await sendViaSendGrid(FROM, TO, subject, htmlAdmin, email));
      
      if (!emailSent) {
        // No provider configured
        console.error('[booking] Email provider not configured');
        return res.status(500).json({ 
          ok: false, 
          error: 'Email provider not configured' 
        });
      }
    } catch (e) {
      console.error('[booking] Email send error:', e);
      return res.status(500).json({ 
        ok: false, 
        error: 'Failed to send notification email' 
      });
    }

    return res.status(200).json({ ok: true });
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
async function sendViaResend(from, to, subject, htmlAdmin, clientEmail) {
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
    console.error('[booking] Resend error:', errorText);
    throw new Error(`Resend error: ${errorText}`);
  }

  return true;
}

async function sendViaSendGrid(from, to, subject, htmlAdmin, clientEmail) {
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
    console.error('[booking] SendGrid error:', errorText);
    throw new Error(`SendGrid error: ${errorText}`);
  }

  return true;
}

function extractEmail(v) {
  return String(v || '').replace(/^.*<|>$/g, '') || v;
}

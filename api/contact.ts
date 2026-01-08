import { parse } from 'node:querystring';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const contactReceiver = process.env.CONTACT_RECEIVER;

const resend = new Resend(resendApiKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Allow', 'POST');
    res.end('Method Not Allowed');
    return;
  }

  if (!resendApiKey || !contactReceiver) {
    res.statusCode = 500;
    res.end('Missing email configuration');
    return;
  }

  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', async () => {
    const data = parse(body);
    const website = String(data.website ?? '');
    if (website) {
      res.statusCode = 204;
      res.end();
      return;
    }

    const name = String(data.name ?? '');
    const email = String(data.email ?? '');
    const subject = String(data.subject ?? '');
    const message = String(data.message ?? '');

    if (!name || !email || !message) {
      res.statusCode = 400;
      res.end('Invalid input');
      return;
    }

    try {
      await resend.emails.send({
        from: 'Portfolio <onboarding@resend.dev>',
        to: contactReceiver,
        replyTo: email,
        subject: subject || `New contact from ${name}`,
        text: message,
      });
    } catch (err) {
      console.error('Contact email failed:', err);
      res.statusCode = 500;
      res.end('Email send failed');
      return;
    }

    res.statusCode = 303;
    res.setHeader('Location', '/message-sent');
    res.end();
  });
}

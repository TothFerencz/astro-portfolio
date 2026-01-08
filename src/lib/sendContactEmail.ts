import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

interface Payload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export async function sendContactEmail({
  name,
  email,
  subject,
  message,
}: Payload) {
  await resend.emails.send({
    from: 'Portfolio <onboarding@resend.dev>',
    to: import.meta.env.CONTACT_RECEIVER,
    replyTo: email,
    subject: subject ?? `New contact from ${name}`,
    text: message,
  });
}

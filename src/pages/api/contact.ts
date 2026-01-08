import type { APIRoute } from 'astro';
import { sendContactEmail } from '../../lib/sendContactEmail';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();

  if (formData.get('website')) {
    return new Response(null, { status: 204 });
  }

  const name = formData.get('name');
  const email = formData.get('email');
  const subject = formData.get('subject');
  const message = formData.get('message');

  if (!name || !email || !message) {
    return new Response('Invalid input', { status: 400 });
  }

  await sendContactEmail({
    name: String(name),
    email: String(email),
    subject: subject ? String(subject) : undefined,
    message: String(message),
  });

  return new Response(null, {
    status: 303,
    headers: { Location: '/message-sent' },
  });
};

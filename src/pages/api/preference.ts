import { type APIRoute } from 'astro';

export const GET: APIRoute = ({ cookies }) => {
  const preference = cookies.get('preference') || {
    theme: 'light',
  };

  return new Response(JSON.stringify(preference));
};

export const PUT: APIRoute = async ({ request, cookies }) => {
  const preference = await request.json();
  cookies.set('preference', JSON.stringify(preference), {
    sameSite: 'lax', // default
  });
  return new Response(JSON.stringify(preference));
};

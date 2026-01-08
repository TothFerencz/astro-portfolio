import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://tothferencz.com',
  output: 'hybrid',
  adapter: vercel({
    webAnalytics: true,
  }),
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});

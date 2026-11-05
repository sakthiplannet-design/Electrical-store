import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://sri-ambica-electricals.web.app',
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'auto' },
});

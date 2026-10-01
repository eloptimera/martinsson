// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Sätt SITE_URL i Vercel (miljövariabel) till sajtens riktiga adress, t.ex. https://jovos.se.
// Den används för kanoniska adresser, delningsbilder och sitemap.
const site = process.env.SITE_URL || "https://example.com";

export default defineConfig({
  site,
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});

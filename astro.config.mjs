import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "static",
  base: process.env.SITE_BASE_PATH || "/",
  site: process.env.SITE_URL || undefined,
  vite: { plugins: [tailwindcss()] },
});

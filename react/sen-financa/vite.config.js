/* eslint-disable no-undef */
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

//* Plugins
import react from "@vitejs/plugin-react";
import postcss from "postcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: "**/*.jsx",
    }),
    postcss(),
    VitePWA({
      manifest: {
        theme_color: "#5616c5",
        background_color: "#191e24",
        display: "standalone",
        scope: "/",
        start_url: "/",
        short_name: "SenFinança",
        description: "Your personal finance management app.",
        name: "SenFinança",
        icons: [
          {
            src: "images/favicon/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "images/favicon/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "images/favicon/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "images/favicon/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  server: {
    hmr: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

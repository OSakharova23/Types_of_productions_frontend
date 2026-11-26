import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ command }) => {
  const base = command === 'build' ? '/Types_of_productions_frontend/' : '/';

  const keyPath = path.resolve(__dirname, 'cert.key');
  const certPath = path.resolve(__dirname, 'cert.crt');
  const hasCerts = fs.existsSync(keyPath) && fs.existsSync(certPath);

  return {
    base,
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true,
        },
        manifest: {
          name: 'Production Types PWA',
          short_name: 'ProdTypes',
          start_url: base,
          scope: base,
          display: 'standalone',
          background_color: '#f9f9f8',
          theme_color: '#8b3a2b',
          orientation: 'portrait-primary',
          icons: [
            {
              src: 'logo192.png',
              type: 'image/png',
              sizes: '192x192',
            },
            {
              src: 'logo512.png',
              type: 'image/png',
              sizes: '512x512',
            },
          ],
        },
      }),
    ],
    server: {
      host: true,
      port: 5173,
      ...(hasCerts
        ? {
            https: {
              key: fs.readFileSync(keyPath),
              cert: fs.readFileSync(certPath),
            },
          }
        : {}),
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        },
        '/production-assets': {
          target: 'http://localhost:9000',
          changeOrigin: true,
        },
      },
    },
  };
});
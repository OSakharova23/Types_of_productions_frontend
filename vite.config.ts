import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// Для GitHub Pages при сборке передаётся VITE_BASE_PATH=/Types_of_productions_frontend/;
// для локального запуска и прокси по умолчанию используется './'
const base = process.env.VITE_BASE_PATH || './';

export default defineConfig({
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
  build: {
    outDir: 'bundle',
    emptyOutDir: true,
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        codeSplitting: false,
        entryFileNames: 'assets/bundle.js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || '';
          if (name.endsWith('.css')) {
            return 'assets/bundle.css';
          }
          return 'assets/[name][extname]';
        },
      },
    },
  },
  server: {
    port: 5173,
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
});
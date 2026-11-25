import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// Для GitHub Pages задайте VITE_BASE_PATH=/<ИмяРепозитория>/ при сборке pages;
// для локального bundle по умолчанию './'
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
        inlineDynamicImports: false,
        manualChunks: undefined,
        entryFileNames: 'assets/bundle.js',
        chunkFileNames: 'assets/bundle.js',
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
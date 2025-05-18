import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: '**/*.svg?react',
      svgrOptions: {},
    }),
  ],
  build: {
    emptyOutDir: true,
    minify: false,
    modulePreload: false,
    commonjsOptions: {
      dynamicRequireTargets: ['node_modules/core/**/*'],
    },
    rollupOptions: {
      input: {
        pop_up: resolve(__dirname, 'pop_up/index.html'),
        diggin_background: resolve(__dirname, 'background/vite_fake_index.html'),
        diggin_content: resolve(__dirname, 'content_scripts/vite_fake_index.html'),
      },
      output: {
        entryFileNames: '[name].js',
        // chunkFileNames: '[name]_chunk.js',
      },
    },
  },
  server: {
    open: './',
  },
});

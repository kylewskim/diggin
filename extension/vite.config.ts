import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
// @ts-ignore - Node.js 타입 문제 해결
import { fileURLToPath } from 'url';
// @ts-ignore - Node.js 타입 문제 해결
import { copyFileSync, existsSync, mkdirSync } from 'fs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// manifest.json과 아이콘 파일들을 복사하는 플러그인
const copyExtensionFiles = () => {
  return {
    name: 'copy-extension-files',
    writeBundle() {
      // dist 폴더가 없으면 생성
      if (!existsSync('dist')) {
        mkdirSync('dist');
      }

      // manifest 파일 복사
      copyFileSync('manifest.json', 'dist/manifest.json');

      // public 폴더의 아이콘 파일들 복사
      if (existsSync('public')) {
        if (!existsSync('dist/public')) {
          mkdirSync('dist/public', { recursive: true });
        }
        // 파일 이름 수정 (하이픈이 있는 정확한 이름으로 변경)
        copyFileSync('public/icon-16.png', 'dist/public/icon-16.png');
        copyFileSync('public/icon-48.png', 'dist/public/icon-48.png');
        copyFileSync('public/icon-128.png', 'dist/public/icon-128.png');
      }
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), copyExtensionFiles()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        background: resolve(__dirname, 'src/background.ts'),
        content: resolve(__dirname, 'src/content.ts')
      },
      output: {
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === 'index' ? 'assets/[name]-[hash].js' : '[name].js';
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        manualChunks: undefined
      }
    },
    target: 'es2015',
    minify: false
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@shared': resolve(__dirname, '../shared/src'),
    },
  },
}); 
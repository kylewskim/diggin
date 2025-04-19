import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { copyFileSync, existsSync, mkdirSync } from 'fs';

// manifest.json과 아이콘 파일들을 복사하는 플러그인
const copyExtensionFiles = () => {
  return {
    name: 'copy-extension-files',
    closeBundle: () => {
      console.log('Copying extension files to dist folder...');
      
      // manifest.json을 dist 폴더로 복사
      copyFileSync(
        resolve(__dirname, 'manifest.json'),
        resolve(__dirname, 'dist/manifest.json')
      );
      
      // 아이콘 파일 복사
      try {
        // public 폴더의 아이콘 파일을 dist 폴더로 복사
        copyFileSync(
          resolve(__dirname, 'public/icon16.png'),
          resolve(__dirname, 'dist/icon-16.png')
        );
        
        copyFileSync(
          resolve(__dirname, 'public/icon48.png'),
          resolve(__dirname, 'dist/icon-48.png')
        );
        
        copyFileSync(
          resolve(__dirname, 'public/icon128.png'),
          resolve(__dirname, 'dist/icon-128.png')
        );
      } catch (error) {
        console.error('Error copying icon files:', error);
      }
      
      console.log('Extension files successfully copied to dist folder');
    }
  };
};

export default defineConfig({
  plugins: [react(), copyExtensionFiles()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'index.html'),
      }
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@shared': resolve(__dirname, '../shared/src'),
    },
  },
}); 
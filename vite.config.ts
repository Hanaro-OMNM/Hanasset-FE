import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['swiper/react', 'swiper'],
  },
  define: {
    global: 'window', // Node.js global 객체를 window로 대체
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'https://naveropenapi.apigw.ntruss.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/real-estate-api': {
        target: 'https://fin.land.naver.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/real-estate-api/, ''),
      },
      '/ws-chat': {
        target: 'http://localhost:8080', // 백엔드 서버
        ws: true,
        changeOrigin: true,
      },
      '/chat': {
        target: 'http://localhost:8080', // 백엔드 서버 URL
        changeOrigin: true,
      },
    },
    port: 5173,
  },
});

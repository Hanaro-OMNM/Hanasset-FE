import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['swiper/react', 'swiper'],
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
    },
  },
});

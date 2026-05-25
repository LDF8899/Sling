import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true, // 添加此选项以强制使用指定端口，如果端口被占用则报错
    proxy: {
      '/api': {
        target: 'http://localhost:8888', // 网关服务地址
        changeOrigin: true,
        // rewrite removed — gateway handles routing, services expect full /api/xxx paths
      },
      '/snake': {
        target: 'http://localhost:8888',
        changeOrigin: true,
      }
    }
  }
})
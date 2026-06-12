import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// SearXNG 实例列表（本地优先，公共实例做备份）
const SEARXNG_INSTANCES = [
  'http://localhost:8080',          // 本地 Docker 实例
  'https://search.sapti.me',       // 公共实例 1
  'https://searx.be',              // 公共实例 2
  'https://search.ononoki.org',    // 公共实例 3
]

const SEARXNG_TIMEOUT = 8000       // 单实例超时 ms

// 带故障转移的 SearXNG 代理插件
function searxngProxyPlugin() {
  return {
    name: 'searxng-failover-proxy',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // 手动匹配 /searxng/search，避免 connect 路径剥离导致的 URL 问题
        const fullPath = req.originalUrl || req.url || ''
        if (!fullPath.startsWith('/searxng/search')) {
          return next()
        }

        // 提取查询字符串（?q=...&format=json...）
        const qIdx = fullPath.indexOf('?')
        const query = qIdx >= 0 ? fullPath.substring(qIdx) : ''
        const errors = []

        for (const instance of SEARXNG_INSTANCES) {
          const targetUrl = `${instance}/search${query}`
          try {
            const controller = new AbortController()
            const timeout = setTimeout(() => controller.abort(), SEARXNG_TIMEOUT)

            const response = await fetch(targetUrl, {
              signal: controller.signal,
              headers: {
                'Accept': 'application/json',
                'User-Agent': 'SlingApp/1.0',
              },
            })
            clearTimeout(timeout)

            if (response.ok) {
              const data = await response.text()
              res.setHeader('Content-Type', 'application/json')
              res.setHeader('Access-Control-Allow-Origin', '*')
              res.statusCode = 200
              res.end(data)
              return
            }
            errors.push(`${instance}: HTTP ${response.status}`)
          } catch (e) {
            errors.push(`${instance}: ${e.message}`)
          }
        }

        // 所有实例都失败，返回空结果（前端会用 mock 数据）
        console.warn('[searxng-proxy] 所有实例失败:', errors)
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.statusCode = 200
        res.end(JSON.stringify({ results: [] }))
      })
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), searxngProxyPlugin()],
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
      },
      // /searxng/search 由上面的插件处理（自动故障转移）
    }
  }
})

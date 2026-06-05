<template>
  <section class="outdoor-news-section">
    <!-- 标题栏 + 刷新状态 -->
    <div class="news-header">
      <h3 class="section-title">
        <SvgIcon name="news" :size="18" />
        户外资讯
      </h3>
      <div class="header-right">
        <span class="last-update" v-if="lastFetchTime">
          {{ formatRelativeTime(lastFetchTime) }}更新
        </span>
        <button class="refresh-btn" :class="{ loading }" @click="() => fetchNews(true)">
          <SvgIcon name="refresh" :size="16" />
        </button>
      </div>
    </div>

    <!-- 分类 Tab -->
    <div class="news-tabs">
      <button
        v-for="tab in newsTabs"
        :key="tab.key"
        class="tab-btn"
        :class="{ active: activeTab === tab.key }"
        @click="switchTab(tab.key)"
      >
        <SvgIcon :name="tab.icon" :size="14" />
        {{ tab.label }}
        <span class="tab-count" v-if="getTabCount(tab.key)">{{ getTabCount(tab.key) }}</span>
      </button>
    </div>

    <!-- 资讯列表 -->
    <div class="news-grid" v-if="pagedList.length">
      <TransitionGroup name="news-item">
        <a
          v-for="item in pagedList"
          :key="item.id"
          class="news-card"
          :class="[`priority-${item.priority}`]"
          :href="item.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          <!-- 紧急标记 -->
          <div class="priority-badge" v-if="item.priority === 'critical'">
            <SvgIcon name="alert" :size="12" />
            紧急
          </div>

          <!-- 图片（仅大卡片显示） -->
          <div class="news-thumb" v-if="(item.priority === 'critical' || item.priority === 'high') && item.imageUrl">
            <img :src="item.imageUrl" :alt="item.title" @error="handleImgError" />
          </div>

          <div class="news-body">
            <div class="news-category-tag" :style="{ background: getCategoryColor(item.category) }">
              {{ getCategoryLabel(item.category) }}
            </div>
            <h4 class="news-title">{{ item.title }}</h4>
            <p class="news-summary">{{ item.summary }}</p>
            <div class="news-meta">
              <span class="meta-source">{{ item.source }}</span>
              <span class="meta-dot">·</span>
              <span class="meta-time">{{ formatRelativeTime(item.publishTime) }}</span>
              <span class="meta-expire" v-if="isExpiringSoon(item)">
                <SvgIcon name="clock" :size="12" />{{ formatExpireDate(item.expiresAt) }}截止
              </span>
            </div>
          </div>

          <SvgIcon name="arrow-right" :size="16" class="news-arrow" />
        </a>
      </TransitionGroup>
    </div>

    <!-- 加载态 -->
    <div class="news-loading" v-else-if="loading">
      <div class="skeleton-card" v-for="i in 3" :key="i">
        <div class="skeleton-thumb"></div>
        <div class="skeleton-body">
          <div class="skeleton-line w60"></div>
          <div class="skeleton-line w100"></div>
          <div class="skeleton-line w40"></div>
        </div>
      </div>
    </div>

    <!-- 空态 -->
    <div class="news-empty" v-else>
      <SvgIcon name="news" :size="32" />
      <p>暂无相关资讯</p>
    </div>

    <!-- 分页 -->
    <div class="pagination" v-if="totalPages > 1">
      <button
        class="page-btn"
        :disabled="currentPage <= 1"
        @click="goToPage(currentPage - 1)"
      >
        <SvgIcon name="arrow-left" :size="14" />
        上一页
      </button>

      <template v-for="p in displayPages" :key="p">
        <button
          v-if="p !== '...'"
          class="page-btn"
          :class="{ active: p === currentPage }"
          @click="goToPage(p)"
        >
          {{ p }}
        </button>
        <span v-else class="page-ellipsis">...</span>
      </template>

      <button
        class="page-btn"
        :disabled="currentPage >= totalPages"
        @click="goToPage(currentPage + 1)"
      >
        下一页
        <SvgIcon name="arrow-right" :size="14" />
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import SvgIcon from './SvgIcon.vue'

// ==================== 配置 ====================
const CACHE_KEY = 'outdoor_news_cache'
const CACHE_TTL = 5 * 60 * 1000
const AUTO_REFRESH_INTERVAL = 5 * 60 * 1000
const PAGE_SIZE = 4

// ==================== Mock 数据 ====================
const MOCK_NEWS = [
  {
    id: 'mock-001',
    title: '中央气象台发布暴雨蓝色预警',
    summary: '6月4日至6日，华南地区将迎来新一轮强降雨，广东中北部、福建南部部分地区有大暴雨。户外活动请密切关注天气变化。',
    imageUrl: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=400&h=240&fit=crop',
    source: '中央气象台',
    publishTime: '2026-06-04',
    category: 'weather',
    url: 'https://www.nmc.cn',
    priority: 'critical',
    expiresAt: '2026-06-06'
  },
  {
    id: 'mock-002',
    title: '深圳梧桐山登山步道临时封闭通知',
    summary: '受连续暴雨影响，梧桐山凌云道部分路段出现山体滑坡隐患，即日起封闭施工，预计6月20日恢复开放。',
    imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=240&fit=crop',
    source: '深圳市城管局',
    publishTime: '2026-06-03',
    category: 'event',
    url: 'https://example.com/wutong',
    priority: 'high',
    expiresAt: '2026-06-20'
  },
  {
    id: 'mock-003',
    title: '惠州大亚湾海域发现水母群，游泳需谨慎',
    summary: '近日大亚湾黄金海岸附近海域出现大量僧帽水母，已有3名游客被蜇伤。海边游玩请留意警示旗帜。',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=240&fit=crop',
    source: '惠州日报',
    publishTime: '2026-06-02',
    category: 'warning',
    url: 'https://example.com/jellyfish',
    priority: 'high',
    expiresAt: '2026-06-30'
  },
  {
    id: 'mock-004',
    title: '广东省发布野外用火管理新规',
    summary: '7月1日起，广东省所有林区及周边500米范围内禁止野外用火，违规者最高罚款3000元。',
    imageUrl: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=400&h=240&fit=crop',
    source: '广东省林业局',
    publishTime: '2026-05-28',
    category: 'policy',
    url: 'https://example.com/fire-ban',
    priority: 'normal',
    expiresAt: '2026-12-31'
  },
  {
    id: 'mock-005',
    title: '广州白云山周末客流量预警',
    summary: '本周末白云山预计接待游客超5万人次，摩星岭、鸣春谷等热门景点可能限流。建议错峰出行。',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=240&fit=crop',
    source: '白云山风景区',
    publishTime: '2026-06-04',
    category: 'event',
    url: 'https://example.com/baiyun',
    priority: 'normal',
    expiresAt: '2026-06-08'
  },
  {
    id: 'mock-006',
    title: '全国蛇伤救治医院地图更新',
    summary: '2026年版全国蛇伤救治医院名录已更新，新增23家定点医院，覆盖所有省份。',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=240&fit=crop',
    source: '中国疾控中心',
    publishTime: '2026-05-20',
    category: 'safety',
    url: 'https://example.com/snake-hospitals',
    priority: 'normal',
    expiresAt: '2026-12-31'
  }
]

// ==================== Tab 配置 ====================
const newsTabs = [
  { key: 'all',     label: '全部',     icon: 'grid' },
  { key: 'weather', label: '天气预警', icon: 'weather' },
  { key: 'event',   label: '活动公告', icon: 'event' },
  { key: 'warning', label: '安全警告', icon: 'warning' },
  { key: 'policy',  label: '政策法规', icon: 'policy' },
  { key: 'safety',  label: '安全知识', icon: 'safety' },
]

const CATEGORY_COLORS = {
  weather: '#0ea5e9',
  event:   '#8b5cf6',
  warning: '#ef4444',
  policy:  '#f59e0b',
  safety:  '#10b981',
}

const CATEGORY_LABELS = {
  weather: '天气预警',
  event:   '活动公告',
  warning: '安全警告',
  policy:  '政策法规',
  safety:  '安全知识',
}

// ==================== 状态 ====================
const activeTab = ref('all')
const allNews = ref([])
const loading = ref(false)
const lastFetchTime = ref(null)
const currentPage = ref(1)
let autoRefreshTimer = null

// ==================== 计算属性 ====================
const sortedList = computed(() => {
  let list = activeTab.value === 'all'
    ? [...allNews.value]
    : allNews.value.filter(n => n.category === activeTab.value)

  const priorityOrder = { critical: 0, high: 1, normal: 2 }
  list.sort((a, b) => (priorityOrder[a.priority] ?? 3) - (priorityOrder[b.priority] ?? 3))
  return list
})

const totalPages = computed(() => Math.ceil(sortedList.value.length / PAGE_SIZE))

const pagedList = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return sortedList.value.slice(start, start + PAGE_SIZE)
})

const displayPages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const pages = []

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    pages.push(1)
    if (current > 3) pages.push('...')
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
      pages.push(i)
    }
    if (current < total - 2) pages.push('...')
    pages.push(total)
  }

  return pages
})

const getTabCount = (key) => {
  if (key === 'all') return allNews.value.length
  return allNews.value.filter(n => n.category === key).length
}

const getCategoryColor = (cat) => CATEGORY_COLORS[cat] || '#64748b'
const getCategoryLabel = (cat) => CATEGORY_LABELS[cat] || cat

const isExpiringSoon = (item) => {
  if (!item.expiresAt) return false
  const diff = new Date(item.expiresAt) - new Date()
  return diff > 0 && diff < 7 * 86400000
}

const formatExpireDate = (dateStr) => {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return `${d.getMonth() + 1}/${d.getDate()}`
}

const formatRelativeTime = (dateStr) => {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr)
    const now = new Date()
    const diffMs = now - d
    const diffMin = Math.floor(diffMs / 60000)
    const diffHour = Math.floor(diffMs / 3600000)
    const diffDay = Math.floor(diffMs / 86400000)

    if (diffMin < 1) return '刚刚'
    if (diffMin < 60) return `${diffMin}分钟前`
    if (diffHour < 24) return `${diffHour}小时前`
    if (diffDay < 7) return `${diffDay}天前`
    return `${d.getMonth() + 1}月${d.getDate()}日`
  } catch {
    return ''
  }
}

const handleImgError = (e) => {
  // 图片加载失败时隐藏
  e.target.style.display = 'none'
  // 也隐藏父容器
  const parent = e.target.closest('.news-thumb')
  if (parent) parent.style.display = 'none'
}

const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
}

const switchTab = (key) => {
  activeTab.value = key
  currentPage.value = 1
}

// ==================== 缓存 ====================
const readCache = () => {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const cached = JSON.parse(raw)
    if (Date.now() - cached.timestamp > CACHE_TTL) return null
    return cached
  } catch {
    return null
  }
}

const writeCache = (data) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data }))
  } catch { /* ignore */ }
}

// ==================== 数据获取 ====================
const mapSeaxngResults = (results, category) =>
  (results || []).map((r, i) => ({
    id: `live-${category}-${i}-${Date.now()}`,
    title: r.title || '',
    summary: (r.content || '').slice(0, 150),
    imageUrl: r.thumbnail || r.img_src || '',  // 可能为空
    source: r.engines?.[0] || r.engine || '网络搜索',
    publishTime: r.publishedDate || new Date().toISOString(),
    category,
    url: r.url || '#',
    priority: 'normal',
    expiresAt: null
  }))

const SEARXNG_QUERIES = {
  weather: '天气预警 暴雨 台风 高温',
  event:   '户外活动 登山 徒步 露营 赛事',
  warning: '自然灾害 山洪 滑坡 泥石流 地质灾害',
  policy:  '户外安全法规 防火令 保护区管理',
  safety:  '户外急救 蛇咬伤 防溺水 安全知识',
}

const fetchNews = async (forceRefresh = false) => {
  // 1. 先检查缓存
  if (!forceRefresh) {
    const cached = readCache()
    if (cached && cached.data && cached.data.length > 0) {
      allNews.value = cached.data
      lastFetchTime.value = cached.timestamp
      return
    }
  }

  loading.value = true
  try {
    const categories = ['weather', 'event', 'warning', 'policy', 'safety']
    const results = await Promise.allSettled(
      categories.map(cat =>
        axios.get('/searxng/search', {
          params: { q: SEARXNG_QUERIES[cat], format: 'json', language: 'zh-CN', time_range: 'month' },
          timeout: 8000,
        }).then(res => mapSeaxngResults(res.data.results, cat))
      )
    )

    const liveItems = results.filter(r => r.status === 'fulfilled').flatMap(r => r.value)

    if (liveItems.length > 0) {
      // 去重
      const seen = new Set()
      const deduped = []
      for (const item of liveItems) {
        const key = item.title.slice(0, 20)
        if (!seen.has(key)) {
          seen.add(key)
          deduped.push(item)
        }
      }
      allNews.value = deduped
    } else {
      // 没有实时数据，使用 mock
      allNews.value = [...MOCK_NEWS]
    }

    lastFetchTime.value = Date.now()
    writeCache(allNews.value)
  } catch (e) {
    console.warn('资讯加载失败，使用 mock 数据:', e)
    // 出错时始终使用 mock 数据
    allNews.value = [...MOCK_NEWS]
    lastFetchTime.value = Date.now()
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchNews()
  autoRefreshTimer = setInterval(() => fetchNews(true), AUTO_REFRESH_INTERVAL)
})

onBeforeUnmount(() => {
  if (autoRefreshTimer) {
    clearInterval(autoRefreshTimer)
    autoRefreshTimer = null
  }
})
</script>

<style scoped>
.outdoor-news-section {
  margin-bottom: var(--space-6);
  min-width: 0;
}

/* ===== 标题栏 ===== */
.news-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-3);
  gap: var(--space-2);
}

.section-title {
  font-size: 16px;
  font-weight: var(--weight-semibold);
  color: var(--text-primary);
  margin: 0;
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.header-right {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-shrink: 0;
}

.last-update {
  font-size: 11px;
  color: var(--text-muted);
  white-space: nowrap;
}

.refresh-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 4px;
  border-radius: var(--radius-sm);
  transition: all var(--transition-base);
  display: flex;
  align-items: center;
  flex-shrink: 0;
}
.refresh-btn:hover { color: var(--accent); background: var(--accent-light); }
.refresh-btn.loading svg { animation: spin 1s linear infinite; }

@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

/* ===== Tab 栏 ===== */
.news-tabs {
  display: flex;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
  overflow-x: auto;
  scrollbar-width: none;
  padding-bottom: var(--space-1);
}
.news-tabs::-webkit-scrollbar { display: none; }

.tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 14px;
  border: 1px solid var(--border-card);
  border-radius: var(--radius-full);
  background: var(--bg-card);
  color: var(--text-secondary);
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap;
  transition: all var(--transition-base);
}
.tab-btn:hover { border-color: var(--accent); color: var(--accent); }
.tab-btn.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

.tab-count {
  font-size: 11px;
  min-width: 16px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  border-radius: 8px;
  background: rgba(0,0,0,0.08);
  padding: 0 4px;
}
.tab-btn.active .tab-count { background: rgba(255,255,255,0.25); }

/* ===== 资讯网格 ===== */
.news-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);
  min-width: 0;
}

.news-card {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  padding: var(--space-4);
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: var(--radius-lg);
  text-decoration: none;
  color: inherit;
  transition: all var(--transition-base);
  cursor: pointer;
  position: relative;
  min-width: 0;
}
.news-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-hover);
}

/* 紧急卡片 */
.news-card.priority-critical {
  border-left: 3px solid var(--danger);
  background: var(--danger-bg);
}
.news-card.priority-high {
  border-left: 3px solid var(--warning);
  background: var(--warning-bg);
}

.priority-badge {
  position: absolute;
  top: 0;
  right: var(--space-3);
  background: var(--danger);
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px 2px 6px;
  border-radius: 0 0 6px 6px;
  display: flex;
  align-items: center;
  gap: 3px;
  animation: pulse-badge 2s ease-in-out infinite;
}
@keyframes pulse-badge { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }

/* 图片 */
.news-thumb {
  width: 90px;
  height: 64px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  flex-shrink: 0;
}
.news-thumb img { width: 100%; height: 100%; object-fit: cover; }

/* 内容区 */
.news-body {
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.news-category-tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 500;
  color: #fff;
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  margin-bottom: var(--space-1);
  white-space: nowrap;
}

.news-title {
  margin: 0 0 var(--space-1);
  font-size: 15px;
  font-weight: var(--weight-semibold);
  color: var(--text-primary);
  line-height: var(--leading-snug);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
}
.priority-critical .news-title,
.priority-high .news-title { -webkit-line-clamp: 2; }

.news-summary {
  margin: 0 0 var(--space-2);
  font-size: 13px;
  color: var(--text-secondary);
  line-height: var(--leading-relaxed);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
}

.news-meta {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 12px;
  color: var(--text-muted);
  flex-wrap: wrap;
}

.meta-dot {
  opacity: 0.4;
  flex-shrink: 0;
}

.meta-source {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
}

.meta-time {
  white-space: nowrap;
}

.meta-expire {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  color: var(--danger);
  font-weight: 500;
  white-space: nowrap;
}

.news-arrow {
  color: var(--text-muted);
  flex-shrink: 0;
  margin-top: var(--space-3);
  transition: all var(--transition-base);
}
.news-card:hover .news-arrow {
  transform: translateX(3px);
  color: var(--accent);
}

/* ===== 分页 ===== */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  margin-top: var(--space-4);
}

.page-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  min-width: 36px;
  height: 36px;
  padding: 0 10px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-card);
  background: var(--bg-card);
  color: var(--text-secondary);
  font-size: 13px;
  cursor: pointer;
  transition: all var(--transition-base);
}
.page-btn:hover:not(:disabled) { border-color: var(--accent); color: var(--accent); }
.page-btn.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}
.page-btn:disabled { opacity: 0.4; cursor: not-allowed; }

.page-ellipsis {
  color: var(--text-muted);
  padding: 0 2px;
  font-size: 13px;
}

/* ===== 加载骨架 ===== */
.news-loading {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.skeleton-card {
  display: flex;
  gap: var(--space-3);
  padding: var(--space-3);
  border: 1px solid var(--border-card);
  border-radius: var(--radius-md);
}

.skeleton-thumb {
  width: 80px;
  height: 56px;
  border-radius: var(--radius-sm);
  background: linear-gradient(90deg, var(--border-card) 25%, var(--bg-card-hover) 50%, var(--border-card) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  flex-shrink: 0;
}

.skeleton-body { flex: 1; display: flex; flex-direction: column; gap: 6px; min-width: 0; }

.skeleton-line {
  height: 12px;
  border-radius: 4px;
  background: linear-gradient(90deg, var(--border-card) 25%, var(--bg-card-hover) 50%, var(--border-card) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
.skeleton-line.w60 { width: 50%; }
.skeleton-line.w100 { width: 100%; }
.skeleton-line.w40 { width: 35%; }

@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

/* ===== 空态 ===== */
.news-empty {
  text-align: center;
  padding: var(--space-8) 0;
  color: var(--text-muted);
}
.news-empty p { margin: var(--space-2) 0 0; font-size: 13px; }

/* ===== 过渡动画 ===== */
.news-item-enter-active { transition: all 0.3s ease; }
.news-item-leave-active { transition: all 0.2s ease; }
.news-item-enter-from { opacity: 0; transform: translateY(-10px); }
.news-item-leave-to { opacity: 0; transform: translateX(-20px); }

/* ===== 响应式 ===== */
@media (max-width: 900px) {
  .news-grid { grid-template-columns: 1fr; }
  .news-card { gap: var(--space-3); }
  .news-arrow { display: none; }
}

@media (max-width: 640px) {
  .outdoor-news-section { margin-bottom: var(--space-4); }
  .news-card { padding: var(--space-3); }
  .news-thumb { width: 80px; height: 56px; }
  .pagination { flex-wrap: wrap; gap: var(--space-1); }
  .page-btn { min-width: 32px; height: 32px; font-size: 13px; }
  .news-tabs { gap: var(--space-1); }
  .tab-btn { padding: 4px 10px; font-size: 12px; }
}
</style>

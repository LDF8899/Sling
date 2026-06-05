<template>
  <section class="outdoor-news-section">
    <h3 class="section-title">户外资讯</h3>
    <div class="news-tabs">
      <el-tag
        v-for="tab in newsTabs"
        :key="tab.key"
        class="news-tab"
        :type="activeTab === tab.key ? 'primary' : ''"
        @click="switchTab(tab.key)"
      >
        <el-icon class="tab-icon"><component :is="tab.icon" /></el-icon>
        {{ tab.label }}
      </el-tag>
    </div>

    <div class="news-list" v-if="!loading && newsList.length">
      <a
        v-for="(item, index) in newsList"
        :key="index"
        class="news-card"
        :href="item.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="news-card-icon" :style="{ background: currentTabColor }">
          <el-icon :size="20"><component :is="currentTabIcon" /></el-icon>
        </div>
        <div class="news-card-body">
          <h4 class="news-title">{{ item.title }}</h4>
          <p class="news-snippet" v-if="item.content">{{ item.content }}</p>
          <div class="news-meta">
            <span class="news-source" v-if="item.engine">{{ item.engine }}</span>
            <span class="news-time" v-if="item.publishedDate">{{ formatDate(item.publishedDate) }}</span>
          </div>
        </div>
        <el-icon class="news-arrow"><ArrowRight /></el-icon>
      </a>
      <div class="news-load-more" v-if="hasMore">
        <el-button :loading="loadingMore" @click="loadMore" plain>加载更多</el-button>
      </div>
    </div>

    <div class="news-loading" v-else-if="loading">
      <el-skeleton :rows="4" animated />
    </div>

    <div class="news-empty" v-else>
      <el-icon :size="32"><WarningFilled /></el-icon>
      <p>暂无相关资讯，请稍后再试</p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { Sunny, WarningFilled, ArrowRight, FirstAidKit } from '@element-plus/icons-vue'

const newsTabs = [
  { key: 'weather', label: '天气预报', icon: Sunny, query: '天气预报 天气预警', color: 'linear-gradient(135deg, #0ea5e9, #0284c7)' },
  { key: 'wildlife', label: '动物保护', icon: WarningFilled, query: '动物保护 野生动物保护', color: 'linear-gradient(135deg, #10b981, #059669)' },
  { key: 'safety', label: '户外安全', icon: FirstAidKit, query: '户外安全 自然灾害预警 防汛', color: 'linear-gradient(135deg, #f59e0b, #d97706)' },
]

const activeTab = ref('weather')
const newsList = ref([])
const loading = ref(false)
const loadingMore = ref(false)
const currentPage = ref(1)
const hasMore = ref(true)

const currentTabConfig = computed(() => newsTabs.find(t => t.key === activeTab.value))
const currentTabColor = computed(() => currentTabConfig.value?.color || newsTabs[0].color)
const currentTabIcon = computed(() => currentTabConfig.value?.icon || Sunny)

const mapResults = (results) =>
  (results || []).map(r => ({
    title: r.title || '',
    content: (r.content || '').slice(0, 120),
    url: r.url || '#',
    engine: r.engines?.[0] || r.engine || '',
    publishedDate: r.publishedDate || null,
  }))

const fetchNews = async (tabKey, page = 1) => {
  const tab = newsTabs.find(t => t.key === tabKey)
  if (!tab) return
  const isLoadMore = page > 1
  if (isLoadMore) loadingMore.value = true
  else { loading.value = true; newsList.value = [] }
  try {
    const { data } = await axios.get('/searxng/search', {
      params: { q: tab.query, format: 'json', language: 'zh-CN', pageno: page },
      timeout: 15000,
    })
    const items = mapResults(data.results)
    if (isLoadMore) newsList.value.push(...items)
    else newsList.value = items
    currentPage.value = page
    hasMore.value = items.length > 0
  } catch (e) {
    console.warn('户外资讯加载失败:', e)
    if (!isLoadMore) newsList.value = []
  } finally {
    loading.value = false
    loadingMore.value = false
  }
}

const loadMore = () => fetchNews(activeTab.value, currentPage.value + 1)

const switchTab = (key) => {
  activeTab.value = key
  hasMore.value = true
  fetchNews(key, 1)
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr)
    const now = new Date()
    const diffMs = now - d
    const diffDays = Math.floor(diffMs / 86400000)
    if (diffDays === 0) return '今天'
    if (diffDays === 1) return '昨天'
    if (diffDays < 7) return `${diffDays}天前`
    return `${d.getMonth() + 1}月${d.getDate()}日`
  } catch {
    return ''
  }
}

onMounted(() => fetchNews('weather'))
</script>

<style scoped>
.outdoor-news-section {
  margin-bottom: var(--space-8);
}

.section-title {
  font-size: var(--text-lg);
  font-weight: var(--weight-semibold);
  color: var(--ink-900);
  margin: 0 0 var(--space-5);
  padding-bottom: var(--space-2);
  border-bottom: 2px solid var(--green-100);
}

.news-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-bottom: var(--space-5);
}

.news-tab {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
}

.tab-icon {
  font-size: 14px;
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.news-card {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  padding: var(--space-4);
  background: var(--surface-white);
  border: 1px solid var(--green-100);
  border-radius: var(--radius-md);
  text-decoration: none;
  color: inherit;
  transition: all var(--transition-base);
  cursor: pointer;
}
.news-card:hover {
  transform: translateX(4px);
  box-shadow: var(--shadow-card);
  border-color: var(--green-200);
}

.news-card-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.news-card-body {
  flex: 1;
  min-width: 0;
}

.news-title {
  margin: 0 0 var(--space-1);
  font-size: var(--text-base);
  font-weight: var(--weight-semibold);
  color: var(--ink-900);
  line-height: var(--leading-snug);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.news-snippet {
  margin: 0 0 var(--space-2);
  font-size: var(--text-sm);
  color: var(--ink-500);
  line-height: var(--leading-relaxed);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-meta {
  display: flex;
  gap: var(--space-3);
  font-size: var(--text-xs);
  color: var(--ink-400);
}

.news-source {
  background: var(--green-50);
  padding: 1px 6px;
  border-radius: var(--radius-sm);
  text-transform: capitalize;
}

.news-arrow {
  color: var(--ink-300);
  flex-shrink: 0;
  margin-top: var(--space-3);
}

.news-loading {
  padding: var(--space-4) 0;
}

.news-empty {
  text-align: center;
  padding: var(--space-10) 0;
  color: var(--ink-500);
}
.news-empty .el-icon {
  margin-bottom: var(--space-3);
}

.news-load-more {
  text-align: center;
  padding: var(--space-4) 0;
}
</style>

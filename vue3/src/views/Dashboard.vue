<template>
  <div class="dashboard-page">
    <!-- ===== 预警横幅 ===== -->
    <WarningAlert />

    <!-- ===== 轮播图 ===== -->
    <div class="banner-carousel" v-if="showBanner">
      <div class="banner-wrapper">
        <el-carousel
          height="300px"
          :interval="4000"
          indicator-position="none"
          arrow="hover"
          trigger="click"
          class="custom-carousel"
          @change="currentBannerIndex = $event"
        >
          <el-carousel-item v-for="(item, index) in bannerList" :key="index">
            <div
              class="banner-item"
              :style="{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${item.image})`,
                backgroundColor: item.bgColor
              }"
              @click="handleBannerClick(item.link)"
            >
              <div class="banner-content">
                <div class="banner-tag" :style="{ backgroundColor: item.tagColor }">{{ item.tag }}</div>
                <h2 class="banner-title">{{ item.title }}</h2>
                <p class="banner-desc">{{ item.description }}</p>
                <el-button type="primary" size="large" class="banner-button" @click.stop="handleBannerClick(item.link)">
                  {{ item.buttonText }}
                </el-button>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>

        <div class="carousel-indicators">
          <div
            v-for="(item, index) in bannerList"
            :key="index"
            class="indicator-item"
            :class="{ active: currentBannerIndex === index }"
            @click="switchBanner(index)"
          >
            <div class="indicator-progress" v-if="currentBannerIndex === index"></div>
          </div>
        </div>

        <div class="banner-close" @click="closeBanner">
          <el-icon><Close /></el-icon>
        </div>
      </div>
    </div>

    <!-- ===== 动态介绍 + 特性卡片 ===== -->
    <section class="intro-section">
      <div class="intro-header">
        <h3>蛇灵(SLING) — 您的智能蛇类安全助手</h3>
      </div>

      <!-- 流动文字 -->
      <div class="flowing-text-container">
        <div class="flowing-text-wrapper">
          <div class="flowing-text" :style="{ animationDuration: `${flowingTexts.length * 4}s` }">
            <span v-for="(text, index) in flowingTexts" :key="index" class="flowing-item">
              <span class="flowing-dot"></span>{{ text }}
            </span>
            <span v-for="(text, index) in flowingTexts" :key="`dup-${index}`" class="flowing-item">
              <span class="flowing-dot"></span>{{ text }}
            </span>
          </div>
        </div>
      </div>

      <!-- 特性卡片 -->
      <div class="features-grid">
        <div class="feature-card" v-for="(f, i) in features" :key="i" @click="navigateTo(f.route)">
          <div class="feature-icon" :style="{ background: f.color }">
            <el-icon :size="22"><component :is="f.iconComp" /></el-icon>
          </div>
          <div class="feature-content">
            <h4>{{ f.title }}</h4>
            <p>{{ f.description }}</p>
          </div>
        </div>
      </div>

      <!-- 统计数字 -->
      <div class="stats-row">
        <div class="stat-item" v-for="(value, key) in stats" :key="key">
          <div class="stat-value">{{ value }}<span class="stat-unit">{{ statUnits[key] }}</span></div>
          <div class="stat-label">{{ statLabels[key] }}</div>
        </div>
      </div>
    </section>

    <!-- ===== 辅助信息 ===== -->
    <section class="auxiliary-section">
      <h3 class="section-title">数据与记录</h3>
      <div class="aux-grid">
        <!-- 知识图谱 -->
        <div class="aux-card">
          <div class="aux-card-header">
            <el-icon color="var(--blue-700)" :size="20"><DataAnalysis /></el-icon>
            <div>
              <h4>蛇类科普知识图谱</h4>
              <p>蛇种 · 科属 · 毒素 · 血清关系</p>
            </div>
          </div>
          <div class="mini-graph-wrap">
            <div ref="miniGraphRef" class="mini-graph-canvas"></div>
            <div class="mini-graph-stats" v-if="miniGraphStats">
              <span>{{ miniGraphStats.snakeCount }} 种蛇</span>
              <span>{{ miniGraphStats.totalNodes }} 节点</span>
              <span>{{ miniGraphStats.totalEdges }} 关系</span>
            </div>
          </div>
          <el-button type="primary" plain class="graph-btn" @click="$router.push('/graph')">
            查看完整交互图谱
          </el-button>
        </div>

        <!-- 最近识别记录 -->
        <div class="aux-card">
          <h4 class="aux-card-title">最近识别记录</h4>
          <div class="record-list">
            <div class="record-item" v-for="record in recentRecords" :key="record.id" @click="goToSnakeDetail(record.snakeName)">
              <div class="record-thumb">
                <img :src="getSnakeImage(record)" :alt="record.snakeName" @error="handleImageError" />
              </div>
              <div class="record-info">
                <h4>{{ record.snakeName }}</h4>
                <p class="toxicity" :class="record.toxicityClass">{{ record.toxicity }}</p>
                <p class="record-time">{{ record.time }}</p>
              </div>
              <el-icon class="record-arrow"><ArrowRight /></el-icon>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== 户外资讯 ===== -->
    <OutdoorNews />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Camera, MapLocation, FirstAidKit, OfficeBuilding, DataAnalysis, ArrowRight, Close } from '@element-plus/icons-vue'
import cytoscape from 'cytoscape'
import axios from 'axios'
import OutdoorNews from '@/components/OutdoorNews.vue'
import WarningAlert from '@/components/WarningAlert.vue'
import { recognitionApi } from '../services/api.js'
import { useUserStore } from '../store/user.js'

const router = useRouter()
const userStore = useUserStore()

// — 轮播图 —
const showBanner = ref(true)
const currentBannerIndex = ref(0)

const bannerList = ref([
  { id: 1, title: '蛇类识别新升级', description: 'AI智能识别，准确率高达98%，支持300+种蛇类识别', image: '/images/banner/banner1.png', bgColor: '#059669', tag: '新功能', tagColor: '#ef4444', buttonText: '立即体验', link: '/recognition' },
  { id: 2, title: '区域预警系统', description: '实时监测周边蛇类活动，智能预警高风险区域', image: '/images/banner/banner2.png', bgColor: '#3b82f6', tag: '安全', tagColor: '#10b981', buttonText: '查看预警', link: '/warning' },
  { id: 3, title: '应急指南手册', description: '被蛇咬伤怎么办？这里有一份详细的急救指南', image: '/images/banner/banner3.png', bgColor: '#f59e0b', tag: '急救', tagColor: '#f97316', buttonText: '学习急救', link: '/emergency' },
  { id: 4, title: '紧急寻医', description: '快速找到最近的蛇伤救治医院，及时获得专业治疗', image: '/images/banner/banner4.png', bgColor: '#6366f1', tag: '医疗', tagColor: '#f97316', buttonText: '紧急寻医', link: '/hospital' }
])

const handleBannerClick = (link) => { if (link) router.push(link) }
const switchBanner = (i) => { currentBannerIndex.value = i }
const closeBanner = () => {
  showBanner.value = false
  localStorage.setItem('hideBanner', 'true')
}

// — 动态文字 —
const flowingTexts = ref([
  'AI智能识别，准确率高达98%', '覆盖300+种蛇类，全国数据库', '实时区域预警，远离危险',
  '一键急救指南，关键时刻救命', '精准寻医，快速找到救治医院', '离线模式，无网络也能用',
  '专业科普，了解蛇类习性', '24小时在线，守护您的安全'
])

// — 特性卡片 —
const features = ref([
  { title: '智能识别', description: '基于深度学习的蛇类识别技术，快速准确识别蛇类品种', color: 'linear-gradient(135deg, #059669, #047857)', route: 'recognition', iconComp: Camera },
  { title: '实时预警', description: '基于地理位置的蛇类活动预警，提前规避风险区域', color: 'linear-gradient(135deg, #0891B2, #0E7490)', route: 'warning', iconComp: MapLocation },
  { title: '应急指导', description: '被蛇咬伤后的标准化急救流程指导，关键时刻能救命', color: 'linear-gradient(135deg, #DC2626, #B91C1C)', route: 'emergency', iconComp: FirstAidKit },
  { title: '精准寻医', description: '全国蛇伤救治医院数据库，快速找到最近的专业医院', color: 'linear-gradient(135deg, #7C3AED, #6D28D9)', route: 'medical', iconComp: OfficeBuilding }
])

// — 统计 —
const stats = ref({ snakeSpecies: 300, hospitals: 1500, users: 500000, accuracy: 98 })
const statLabels = { snakeSpecies: '蛇类识别', hospitals: '合作医院', users: '用户信赖', accuracy: '识别准确率' }
const statUnits = { snakeSpecies: '+', hospitals: '+', users: '+', accuracy: '%' }

// — 最近识别记录 —
const recentRecords = ref([])

const navigateTo = (page) => {
  const m = { recognition: '/recognition', warning: '/warning', emergency: '/emergency', medical: '/hospital', profile: '/profile', settings: '/settings' }
  if (m[page]) router.push(m[page])
  else ElMessage.info('该功能正在开发中，敬请期待！')
}

const goToSnakeDetail = (snakeName) => {
  if (!snakeName) return ElMessage.warning('蛇类名称无效')
  router.push({ path: '/emergency', query: { snakeName, tab: 'name' } })
}

// — 图片映射 —
const IMAGE_FALLBACK_SVG = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23e2e8f0%22 width=%22200%22 height=%22200%22/%3E%3Ctext fill=%22%2394a3b8%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2214%22%3ENo Image%3C/text%3E%3C/svg%3E'

const getSnakeImage = (record) => {
  if (!record.snakeName) return IMAGE_FALLBACK_SVG
  // 用蛇名通过 emergency 代理查图（图片在 tu 目录，由 Python 脚本下载）
  return `/api/emergency/image/local?path=${encodeURIComponent(record.snakeName + '_1.jpg')}`
}

const handleImageError = (e) => {
  if (e.target.src !== IMAGE_FALLBACK_SVG) e.target.src = IMAGE_FALLBACK_SVG
}

// — 知识图谱 —
const miniGraphRef = ref(null)
const miniGraphStats = ref(null)
let miniCy = null

const renderMiniGraph = (graphData) => {
  if (miniCy) { miniCy.stop(); miniCy.destroy(); miniCy = null }
  const nodes = graphData.nodes.filter(n => ['snake','family','toxin','danger'].includes(n.data.type))
  const nodeIds = new Set(nodes.map(n => n.data.id))
  const edges = graphData.edges.filter(e => nodeIds.has(e.data.source) && nodeIds.has(e.data.target))

  miniCy = cytoscape({
    container: miniGraphRef.value,
    elements: [...nodes, ...edges],
    minZoom: 0.3, maxZoom: 2, userZoomingEnabled: false,
    style: [
      { selector: 'node', style: { 'label': 'data(label)', 'text-valign': 'center', 'text-halign': 'center', 'font-size': '8px', 'color': '#fff', 'text-outline-width': 1.5, 'text-outline-color': '#555' } },
      { selector: 'node[type="snake"]', style: { 'background-color': '#409EFF', 'width': 14, 'height': 14, 'font-size': '0px' } },
      { selector: 'node[type="family"]', style: { 'background-color': '#67C23A', 'shape': 'round-rectangle', 'width': 50, 'height': 20, 'font-size': '9px', 'font-weight': 'bold' } },
      { selector: 'node[type="toxin"]', style: { 'background-color': '#F56C6C', 'shape': 'diamond', 'width': 30, 'height': 30, 'font-size': '8px', 'font-weight': 'bold' } },
      { selector: 'node[type="danger"]', style: { 'background-color': '#E6A23C', 'shape': 'star', 'width': 24, 'height': 24, 'font-size': '7px' } },
      { selector: 'edge', style: { 'width': 0.8, 'line-color': '#ccc', 'target-arrow-color': '#ccc', 'target-arrow-shape': 'triangle', 'arrow-scale': 0.5, 'curve-style': 'bezier' } },
      { selector: 'node[danger="重度"]', style: { 'border-width': 2, 'border-color': '#F56C6C' } }
    ],
    layout: { name: 'cose', idealEdgeLength: 80, nodeOverlap: 10, refresh: 10, fit: true, padding: 15, randomize: false, componentSpacing: 60, nodeRepulsion: 4000, edgeElasticity: 100, nestingFactor: 1.0, gravity: 0.3, numIter: 300, animate: false }
  })
  miniGraphStats.value = graphData.stats
}

const loadMiniGraph = async () => {
  try {
    const { data } = await axios.get('/snake/graph/overview')
    if (data.code === 200 && miniGraphRef.value) renderMiniGraph(data.data)
  } catch (e) { console.warn('迷你图谱加载失败:', e) }
}

const loadRecognitionRecords = async () => {
  try {
    const userId = userStore.userInfo?.id || localStorage.getItem('userId')
    if (!userId) return

    const response = await recognitionApi.getRecordsByUser(userId)
    if (response.data.code === 200 && response.data.data?.length > 0) {
      const records = response.data.data.map(record => ({
        id: record.recordId,
        snakeName: record.recognitionResult || '未知蛇类',
        toxicity: '待确认',
        toxicityClass: 'low-toxicity',
        time: record.recognitionTime || '',
        imagePath: record.imagePath || ''
      }))
      recentRecords.value = records.slice(0, 10)
    }
  } catch (e) {
    console.error('加载识别记录失败，使用默认数据:', e)
  }
}

onMounted(() => {
  const hideBanner = localStorage.getItem('hideBanner')
  if (hideBanner === 'true') showBanner.value = false
  loadRecognitionRecords()
  nextTick(() => loadMiniGraph())
})

onBeforeUnmount(() => {
  if (miniCy) { miniCy.stop(); miniCy.destroy(); miniCy = null }
})
</script>

<style scoped>
/* ===== 轮播图 ===== */
.banner-carousel {
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  margin-bottom: var(--space-8);
}

.banner-wrapper {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.custom-carousel { border-radius: var(--radius-lg); overflow: hidden; }
.custom-carousel :deep(.el-carousel__container) { height: 300px !important; border-radius: var(--radius-lg); }
.custom-carousel :deep(.el-carousel__arrow) {
  background-color: rgba(255,255,255,0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.3);
  width: 48px; height: 48px; font-size: 20px;
  transition: all var(--transition-base);
}
.custom-carousel :deep(.el-carousel__arrow:hover) {
  background-color: rgba(255,255,255,0.3);
  transform: scale(1.1);
}

.banner-item {
  height: 100%; width: 100%;
  background-size: cover; background-position: center; background-repeat: no-repeat;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: transform var(--transition-base);
}
.banner-item:hover { transform: scale(1.02); }

.banner-content {
  text-align: center; color: white; padding: var(--space-8);
  max-width: 600px; z-index: 2;
}

.banner-tag {
  display: inline-block; padding: 6px 16px; border-radius: var(--radius-full);
  font-size: var(--text-xs); font-weight: var(--weight-semibold);
  margin-bottom: var(--space-5); letter-spacing: 1px; text-transform: uppercase;
}

.banner-title {
  font-size: var(--text-4xl); font-weight: var(--weight-bold);
  margin-bottom: var(--space-4); line-height: var(--leading-tight);
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.banner-desc {
  font-size: var(--text-lg); margin-bottom: var(--space-6);
  opacity: 0.9; line-height: var(--leading-relaxed);
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

.banner-button {
  padding: var(--space-3) var(--space-8); font-size: var(--text-base); font-weight: var(--weight-semibold);
  border-radius: var(--radius-full);
  background: var(--brand-gradient); border: none;
  box-shadow: var(--shadow-brand);
}
.banner-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-brand-hover);
}

/* 指示器 */
.carousel-indicators {
  position: absolute; bottom: 30px; left: 0; right: 0;
  display: flex; justify-content: center; gap: var(--space-3); z-index: 10;
}

.indicator-item {
  width: 8px; height: 8px; border-radius: 50%;
  background: rgba(255,255,255,0.5); cursor: pointer;
  position: relative; overflow: hidden;
  transition: all var(--transition-base);
}
.indicator-item.active { background: rgba(255,255,255,0.8); transform: scale(1.2); }

.indicator-progress {
  position: absolute; top: 0; left: 0; height: 100%; width: 100%;
  background: var(--green-500);
  animation: progress 4s linear forwards;
}

@keyframes progress {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

.banner-close {
  position: absolute; top: var(--space-4); right: var(--space-4);
  width: 36px; height: 36px; border-radius: 50%;
  background: rgba(0,0,0,0.2); color: white;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; z-index: 10;
  transition: all var(--transition-base);
}
.banner-close:hover { background: rgba(0,0,0,0.4); transform: scale(1.1); }

/* ===== 介绍区 ===== */
.intro-section {
  background: var(--surface-white);
  border: 1px solid var(--green-100);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  margin-bottom: var(--space-8);
}

.intro-header {
  text-align: center;
  margin-bottom: var(--space-6);
}
.intro-header h3 {
  font-size: var(--text-xl); font-weight: var(--weight-semibold);
  color: var(--ink-900);
}

/* 流动文字 */
.flowing-text-container {
  overflow: hidden;
  background: var(--green-50);
  border-radius: var(--radius-md);
  padding: var(--space-3) 0;
  margin-bottom: var(--space-6);
}

.flowing-text-wrapper { width: 100%; overflow: hidden; }

.flowing-text {
  display: flex; white-space: nowrap;
  animation: flowText linear infinite;
}

@keyframes flowText {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.flowing-item {
  display: inline-flex; align-items: center; gap: var(--space-2);
  padding: 0 var(--space-5); font-size: var(--text-sm); color: var(--ink-700);
}

.flowing-dot {
  width: 5px; height: 5px; border-radius: 50%;
  background: var(--green-400); flex-shrink: 0;
}

/* 特性卡片 */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-5);
  margin-bottom: var(--space-8);
}

.feature-card {
  display: flex; align-items: flex-start; gap: var(--space-4);
  padding: var(--space-5);
  background: var(--surface-white);
  border: 1px solid var(--green-100);
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
  cursor: pointer;
}
.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card);
  border-color: var(--green-200);
}

.feature-icon {
  width: 48px; height: 48px; border-radius: var(--radius-md);
  display: flex; align-items: center; justify-content: center;
  color: white; flex-shrink: 0;
}

.feature-content h4 {
  margin: 0 0 var(--space-1); font-size: var(--text-base);
  font-weight: var(--weight-semibold); color: var(--ink-900);
}
.feature-content p {
  margin: 0; font-size: var(--text-sm); color: var(--ink-500); line-height: var(--leading-relaxed);
}

/* 统计数字 */
.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: var(--space-5);
}

.stat-item { text-align: center; }

.stat-value {
  font-size: var(--text-2xl); font-weight: var(--weight-bold);
  color: var(--green-600); margin-bottom: var(--space-1);
}

.stat-unit { font-size: var(--text-base); margin-left: 2px; }

.stat-label {
  font-size: var(--text-sm); color: var(--ink-500);
}

/* ===== 辅助信息 ===== */
.auxiliary-section {
  margin-bottom: var(--space-8);
}

.section-title {
  font-size: var(--text-lg); font-weight: var(--weight-semibold);
  color: var(--ink-900); margin: 0 0 var(--space-5);
  padding-bottom: var(--space-2); border-bottom: 2px solid var(--green-100);
}

.aux-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-5);
}

.aux-card {
  background: var(--surface-white);
  border: 1px solid var(--green-100);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  display: flex; flex-direction: column;
}

.aux-card-header {
  display: flex; align-items: center; gap: var(--space-3);
  margin-bottom: var(--space-4);
}
.aux-card-header h4 {
  margin: 0; font-size: var(--text-base); font-weight: var(--weight-semibold); color: var(--ink-900);
}
.aux-card-header p {
  margin: 0; font-size: var(--text-xs); color: var(--ink-500);
}

.aux-card-title {
  font-size: var(--text-base); font-weight: var(--weight-semibold);
  color: var(--ink-900); margin: 0 0 var(--space-4);
  padding-bottom: var(--space-2); border-bottom: 1px solid var(--green-100);
}

.mini-graph-wrap {
  position: relative; border-radius: var(--radius-md); overflow: hidden;
  margin-bottom: var(--space-3); flex: 1;
}
.mini-graph-canvas { width: 100%; height: 240px; }
.mini-graph-stats {
  position: absolute; bottom: 8px; left: 8px;
  display: flex; gap: var(--space-3);
  font-size: var(--text-xs); color: var(--ink-500);
  background: var(--surface-white); padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-sm);
}
.graph-btn { width: 100%; }

/* 最近记录 */
.record-list {
  display: flex; flex-direction: column; gap: var(--space-3);
  overflow-y: auto; max-height: 380px;
}

.record-item {
  display: flex; align-items: center; gap: var(--space-4);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-base);
}
.record-item:hover {
  transform: translateX(4px);
  box-shadow: var(--shadow-sm);
  background: var(--green-50);
}

.record-thumb {
  width: 60px; height: 60px; border-radius: var(--radius-md); overflow: hidden; flex-shrink: 0;
}
.record-thumb img { width: 100%; height: 100%; object-fit: cover; }

.record-info { flex: 1; }
.record-info h4 {
  margin: 0 0 var(--space-1); font-size: var(--text-sm);
  font-weight: var(--weight-semibold); color: var(--ink-900);
}

.toxicity {
  font-size: var(--text-xs); padding: 2px 6px; border-radius: var(--radius-sm);
  display: inline-block; margin-bottom: var(--space-1);
}
.high-toxicity { background: var(--danger-bg); color: var(--danger); }
.low-toxicity { background: var(--success-bg); color: var(--success); }

.record-time { font-size: var(--text-xs); color: var(--ink-500); margin: 0; }
.record-arrow { color: var(--ink-400); }

</style>

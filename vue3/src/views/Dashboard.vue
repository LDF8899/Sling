<template>
  <div class="dashboard-page">
    <!-- ===== 预警横幅 ===== -->
    <WarningAlert />

    <!-- ===== 功能卡片 ===== -->
    <section class="features-grid">
      <div
        v-for="(f, i) in features"
        :key="i"
        class="feature-card"
        @click="navigateTo(f.route)"
      >
        <div class="feature-card-header">
          <div class="feature-icon" :style="{ background: f.gradient }">
            <SvgIcon :name="f.icon" :size="22" color="#fff" />
          </div>
          <span class="feature-tag" :class="f.tagClass">{{ f.tag }}</span>
        </div>
        <h4 class="feature-title">{{ f.title }}</h4>
        <p class="feature-desc">{{ f.description }}</p>
        <div class="feature-footer">
          <span class="feature-meta">{{ f.meta }}</span>
          <SvgIcon name="arrow-right" :size="16" class="feature-arrow" />
        </div>
      </div>
    </section>

    <!-- ===== 统计数字 ===== -->
    <section class="stats-row">
      <div v-for="(item, key) in statsData" :key="key" class="stat-card">
        <div class="stat-value">{{ item.value }}<span class="stat-unit">{{ item.unit }}</span></div>
        <div class="stat-label">{{ item.label }}</div>
      </div>
    </section>

    <!-- ===== 双栏：图谱 + 记录 ===== -->
    <section class="dual-column">
      <!-- 知识图谱 -->
      <div class="column-card">
        <div class="column-header">
          <SvgIcon name="graph" :size="18" />
          <span>蛇类知识图谱</span>
        </div>
        <div class="graph-container">
          <div ref="miniGraphRef" class="graph-canvas"></div>
          <div class="graph-stats" v-if="miniGraphStats">
            <span>{{ miniGraphStats.snakeCount }} 种蛇</span>
            <span>{{ miniGraphStats.totalNodes }} 节点</span>
            <span>{{ miniGraphStats.totalEdges }} 关系</span>
          </div>
        </div>
        <el-button class="btn-secondary full-width" @click="$router.push('/graph')">
          查看完整交互图谱
        </el-button>
      </div>

      <!-- 识别记录 -->
      <div class="column-card">
        <div class="column-header">
          <SvgIcon name="records" :size="18" />
          <span>识别记录</span>
        </div>
        <div class="record-list" v-if="recentRecords.length">
          <div
            v-for="record in recentRecords.slice(0, 5)"
            :key="record.id"
            class="record-item"
            @click="goToSnakeDetail(record.snakeName)"
          >
            <div class="record-thumb">
              <img :src="getSnakeImage(record)" :alt="record.snakeName" @error="handleImageError" />
            </div>
            <div class="record-info">
              <div class="record-name">{{ record.snakeName }}</div>
              <div class="record-time">{{ record.time }}</div>
            </div>
            <SvgIcon name="arrow-right" :size="14" class="record-arrow" />
          </div>
        </div>
        <div class="record-empty" v-else>
          <SvgIcon name="records" :size="32" />
          <span>暂无识别记录</span>
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
import cytoscape from 'cytoscape'
import axios from 'axios'
import SvgIcon from '@/components/SvgIcon.vue'
import OutdoorNews from '@/components/OutdoorNews.vue'
import WarningAlert from '@/components/WarningAlert.vue'
import { recognitionApi } from '../services/api.js'
import { useUserStore } from '../store/user.js'

const router = useRouter()
const userStore = useUserStore()

// ==================== 功能卡片 ====================
const features = [
  {
    title: '智能识别',
    description: '基于深度学习的蛇类识别技术，快速准确识别蛇类品种',
    icon: 'camera',
    gradient: 'linear-gradient(135deg, #059669, #0288d1)',
    tag: '核心功能',
    tagClass: 'tag-primary',
    meta: '300+ 种蛇类',
    route: 'recognition'
  },
  {
    title: '实时预警',
    description: '基于地理位置的蛇类活动预警，提前规避风险区域',
    icon: 'location',
    gradient: 'linear-gradient(135deg, #0288d1, #7c3aed)',
    tag: '实时',
    tagClass: 'tag-info',
    meta: '已覆盖全国',
    route: 'warning'
  },
  {
    title: '应急指导',
    description: '被蛇咬伤后的标准化急救流程指导，关键时刻能救命',
    icon: 'firstaid',
    gradient: 'linear-gradient(135deg, #dc2626, #e04980)',
    tag: '紧急',
    tagClass: 'tag-danger',
    meta: '黄金30分钟',
    route: 'emergency'
  },
  {
    title: '精准寻医',
    description: '全国蛇伤救治医院数据库，快速找到最近的专业医院',
    icon: 'hospital',
    gradient: 'linear-gradient(135deg, #7c3aed, #a855f7)',
    tag: '精准',
    tagClass: 'tag-purple',
    meta: '1500+ 医院',
    route: 'medical'
  }
]

// ==================== 统计数据 ====================
const statsData = {
  snakeSpecies: { value: '300+', label: '蛇类识别', unit: '' },
  hospitals: { value: '1,500+', label: '合作医院', unit: '' },
  users: { value: '500,000+', label: '用户信赖', unit: '' },
  accuracy: { value: '98', label: '识别准确率', unit: '%' }
}

// ==================== 识别记录 ====================
const recentRecords = ref([])

const IMAGE_FALLBACK_SVG = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23e2e8f0%22 width=%22200%22 height=%22200%22/%3E%3Ctext fill=%22%2394a3b8%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2214%22%3ENo Image%3C/text%3E%3C/svg%3E'

const getSnakeImage = (record) => {
  if (!record.snakeName) return IMAGE_FALLBACK_SVG
  return `/api/emergency/image/local?path=${encodeURIComponent(record.snakeName + '_1.jpg')}`
}

const handleImageError = (e) => {
  if (e.target.src !== IMAGE_FALLBACK_SVG) e.target.src = IMAGE_FALLBACK_SVG
}

const goToSnakeDetail = (snakeName) => {
  if (!snakeName) return ElMessage.warning('蛇类名称无效')
  router.push({ path: '/emergency', query: { snakeName, tab: 'name' } })
}

// ==================== 知识图谱 ====================
const miniGraphRef = ref(null)
const miniGraphStats = ref(null)
let miniCy = null

const renderMiniGraph = (graphData) => {
  if (miniCy) { miniCy.stop(); miniCy.destroy(); miniCy = null }
  const nodes = graphData.nodes.filter(n => ['snake', 'family', 'toxin', 'danger'].includes(n.data.type))
  const nodeIds = new Set(nodes.map(n => n.data.id))
  const edges = graphData.edges.filter(e => nodeIds.has(e.data.source) && nodeIds.has(e.data.target))

  miniCy = cytoscape({
    container: miniGraphRef.value,
    elements: [...nodes, ...edges],
    minZoom: 0.3, maxZoom: 2, userZoomingEnabled: false,
    style: [
      { selector: 'node', style: { 'label': 'data(label)', 'text-valign': 'center', 'text-halign': 'center', 'font-size': '8px', 'color': '#fff', 'text-outline-width': 1.5, 'text-outline-color': '#555' } },
      { selector: 'node[type="snake"]', style: { 'background-color': 'var(--accent)', 'width': 14, 'height': 14, 'font-size': '0px' } },
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

// ==================== 识别记录加载 ====================
const loadRecognitionRecords = async () => {
  try {
    const userId = userStore.userInfo?.id || localStorage.getItem('userId')
    if (!userId) return

    const response = await recognitionApi.getRecordsByUser(userId)
    if (response.data.code === 200 && response.data.data?.length > 0) {
      const records = response.data.data.map(record => ({
        id: record.recordId,
        snakeName: record.recognitionResult || '未知蛇类',
        time: record.recognitionTime || '',
        imagePath: record.imagePath || ''
      }))
      recentRecords.value = records
    }
  } catch (e) {
    console.error('加载识别记录失败:', e)
  }
}

// ==================== 导航 ====================
const navigateTo = (page) => {
  const routeMap = {
    recognition: '/recognition',
    warning: '/warning',
    emergency: '/emergency',
    medical: '/hospital'
  }
  if (routeMap[page]) router.push(routeMap[page])
  else ElMessage.info('该功能正在开发中')
}

// ==================== 生命周期 ====================
onMounted(() => {
  loadRecognitionRecords()
  nextTick(() => loadMiniGraph())
})

onBeforeUnmount(() => {
  if (miniCy) { miniCy.stop(); miniCy.destroy(); miniCy = null }
})
</script>

<style scoped>
.dashboard-page {
  width: 100%;
  padding: var(--space-4);
  min-width: 0;
  overflow-x: hidden;
}

.btn-secondary {
  background: var(--accent-light);
  color: var(--accent);
  border: none;
  border-radius: var(--radius-full);
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 13px;
  padding: 8px 16px;
  white-space: nowrap;
}
.btn-secondary:hover {
  transform: translateY(-2px);
}

.full-width {
  width: 100%;
  justify-content: center;
  font-size: 13px;
  padding: 8px 16px;
}

/* ===== 功能卡片 ===== */
.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-3);
  margin-bottom: var(--space-6);
  min-width: 0;
}

.feature-card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  cursor: pointer;
  transition: all var(--transition-base);
  min-width: 0;
}
.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
  background: var(--bg-card-hover);
}

.feature-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-3);
  gap: var(--space-2);
}

.feature-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.feature-tag {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: var(--radius-full);
  white-space: nowrap;
  flex-shrink: 0;
}
.tag-primary { background: var(--accent-light); color: var(--accent); }
.tag-info { background: rgba(2, 136, 209, 0.1); color: #0288d1; }
.tag-danger { background: var(--danger-bg); color: var(--danger); }
.tag-purple { background: rgba(124, 58, 237, 0.1); color: #7c3aed; }

[data-theme="night"] .tag-info { background: rgba(77, 208, 225, 0.15); color: #4dd0e1; }
[data-theme="night"] .tag-purple { background: rgba(168, 85, 247, 0.15); color: #a855f7; }

.feature-title {
  font-size: 15px;
  font-weight: var(--weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-1);
}

.feature-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-3);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.feature-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
}

.feature-meta {
  font-size: 11px;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.feature-arrow {
  color: var(--text-muted);
  transition: all var(--transition-base);
  flex-shrink: 0;
}
.feature-card:hover .feature-arrow {
  transform: translateX(3px);
  color: var(--accent);
}

/* ===== 统计数字 ===== */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-3);
  margin-bottom: var(--space-6);
  min-width: 0;
}

.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  text-align: center;
  transition: all var(--transition-base);
  min-width: 0;
}
.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-card);
}

.stat-value {
  font-size: var(--text-2xl);
  font-weight: var(--weight-bold);
  color: var(--accent);
  margin-bottom: var(--space-1);
}

.stat-unit {
  font-size: 14px;
  margin-left: 1px;
}

.stat-label {
  font-size: 13px;
  color: var(--text-muted);
}

/* ===== 双栏布局 ===== */
.dual-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
  min-width: 0;
}

.column-card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.column-header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 15px;
  font-weight: var(--weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-3);
  padding-bottom: var(--space-2);
  border-bottom: 1px solid var(--border-light);
}

/* 图谱 */
.graph-container {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  margin-bottom: var(--space-3);
  flex: 1;
  min-height: 200px;
}

.graph-canvas {
  width: 100%;
  height: 200px;
}

.graph-stats {
  position: absolute;
  bottom: 8px;
  left: 8px;
  display: flex;
  gap: var(--space-2);
  font-size: 11px;
  color: var(--text-muted);
  background: var(--bg-card);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-card);
}

/* 记录列表 */
.record-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  flex: 1;
  overflow-y: auto;
  max-height: 280px;
}

.record-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-base);
}
.record-item:hover {
  background: var(--accent-light);
  transform: translateX(4px);
}

.record-thumb {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  overflow: hidden;
  flex-shrink: 0;
  background: var(--bg-tag);
}
.record-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.record-info { flex: 1; min-width: 0; }
.record-name {
  font-size: 13px;
  font-weight: var(--weight-semibold);
  color: var(--text-primary);
}
.record-time {
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 1px;
}

.record-arrow {
  color: var(--text-muted);
  flex-shrink: 0;
  transition: all var(--transition-base);
}
.record-item:hover .record-arrow {
  color: var(--accent);
  transform: translateX(2px);
}

.record-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  color: var(--text-muted);
  font-size: 13px;
  padding: var(--space-4) 0;
}

/* ===== 响应式 ===== */
@media (max-width: 1200px) {
  .features-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 900px) {
  .stats-row { grid-template-columns: repeat(2, 1fr); }
  .dual-column { grid-template-columns: 1fr; }
}

@media (max-width: 640px) {
  .dashboard-page { padding: var(--space-3); }
  .features-grid { grid-template-columns: 1fr; }
  .stats-row { grid-template-columns: 1fr 1fr; }
  .feature-card { padding: var(--space-3); }
  .feature-icon { width: 36px; height: 36px; }
  .stat-card { padding: var(--space-3); }
  .stat-value { font-size: var(--text-xl); }
  .column-card { padding: var(--space-3); }
  .graph-canvas { height: 160px; }
  .record-list { max-height: 200px; }
}
</style>

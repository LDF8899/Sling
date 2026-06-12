<template>
  <div class="knowledge-graph">
    <!-- 顶部控制栏 -->
    <div class="toolbar">
      <div class="toolbar-left">
        <el-button :icon="ArrowLeft" circle @click="$router.push('/dashboard')" class="back-btn" />
        <h2>🐍 蛇类科普知识图谱</h2>
      </div>
      <div class="controls">
        <el-autocomplete
          v-model="searchQuery"
          :fetch-suggestions="querySearch"
          placeholder="搜索蛇种名称..."
          :trigger-on-focus="false"
          @select="handleSearchSelect"
          clearable
          style="width: 220px"
          size="default"
        >
          <template #prefix><i class="el-icon-search"></i></template>
        </el-autocomplete>
        <el-select v-model="selectedFamily" placeholder="按科筛选" clearable @change="focusFamily" style="width: 140px">
          <el-option v-for="f in families" :key="f" :label="f + ' (' + familyCounts[f] + ')'" :value="f" />
        </el-select>
        <el-radio-group v-model="viewMode" @change="switchView">
          <el-radio-button value="overview">概览</el-radio-button>
          <el-radio-button value="expanded">全部展开</el-radio-button>
        </el-radio-group>
        <el-button @click="resetView" type="primary" plain>重置视图</el-button>
        <el-button @click="toggleLabels" plain>{{ showLabels ? '隐藏标签' : '显示标签' }}</el-button>
        <el-button
          :type="hand.isActive.value ? 'success' : 'default'"
          :loading="hand.isLoading.value"
          @click="toggleHandTracking"
          plain
        >
          {{ hand.isActive.value ? '✋ 关闭手势' : '📷 手势控制' }}
        </el-button>
        <el-button
          v-if="hand.isActive.value"
          :type="hand.debugMode.value ? 'warning' : 'default'"
          @click="hand.toggleDebug()"
          plain
          size="default"
        >
          {{ hand.debugMode.value ? '🔍 关闭预览' : '🔍 手部预览' }}
        </el-button>
      </div>
    </div>

    <!-- 手势速度控制条 -->
    <div class="speed-bar" v-if="hand.isActive.value">
      <span class="speed-label">🖱️ 旋转</span>
      <el-slider v-model="rotSpeed" :min="0.2" :max="5" :step="0.2" :show-tooltip="false" style="width: 120px" />
      <span class="speed-value">{{ rotSpeed.toFixed(1) }}x</span>
      <span class="speed-label" style="margin-left: 16px">🔍 缩放</span>
      <el-slider v-model="zoomSpeed" :min="1" :max="20" :step="1" :show-tooltip="false" style="width: 120px" />
      <span class="speed-value">{{ zoomSpeed }}</span>
    </div>

    <!-- 3D 图谱主体 -->
    <div class="graph-container" ref="containerRef">
      <!-- 图例 -->
      <div class="legend">
        <div class="legend-item"><span class="dot family"></span>科（点击展开）</div>
        <div class="legend-item"><span class="dot snake"></span>蛇种</div>
        <div class="legend-item"><span class="dot toxin"></span>毒素类型</div>
        <div class="legend-item"><span class="dot symptom"></span>症状</div>
        <div class="legend-item"><span class="dot serum"></span>血清</div>
        <div class="legend-item"><span class="dot danger"></span>危险等级</div>
        <div class="legend-hint">🖱 左键旋转 · 右键平移 · 滚轮缩放<br>📷 手势：手移动=旋转 · 🖐放大 · ✊缩小</div>
      </div>

      <!-- 手势状态指示器 -->
      <transition name="fade">
        <div class="hand-status" v-if="hand.isActive.value">
          <span class="hand-gesture-icon">{{ gestureIcon }}</span>
          <span class="hand-gesture-text">{{ gestureText }}</span>
          <span class="hand-confidence" :style="{ opacity: hand.gestureConfidence.value }">
            {{ Math.round(hand.gestureConfidence.value * 100) }}%
          </span>
        </div>
      </transition>

      <!-- 手势错误提示 -->
      <transition name="fade">
        <div class="hand-error" v-if="hand.errorMsg.value">
          ⚠️ {{ hand.errorMsg.value }}
        </div>
      </transition>

      <!-- 统计信息 -->
      <div class="stats" v-if="stats">
        <span>蛇种: {{ stats.snakeCount || 0 }}</span>
        <span>科: {{ stats.familyCount || 0 }}</span>
        <span>节点: {{ stats.totalNodes }}</span>
        <span :style="{ color: graph.fps.value < 30 ? '#F56C6C' : '#67C23A' }">
          FPS: {{ graph.fps.value }}
        </span>
      </div>

      <!-- 悬浮节点信息 -->
      <transition name="fade">
        <div class="hover-card" v-if="graph.hoveredNode.value" :key="graph.hoveredNode.value.id">
          <span class="hover-type" :class="graph.hoveredNode.value.type">{{ typeLabel(graph.hoveredNode.value.type) }}</span>
          <span class="hover-name">{{ graph.hoveredNode.value.label }}</span>
          <span class="hover-extra" v-if="graph.hoveredNode.value.toxin">{{ graph.hoveredNode.value.toxin }}</span>
        </div>
      </transition>
    </div>

    <!-- 详情弹窗 -->
    <el-drawer v-model="drawerVisible" :title="selectedSnake?.label" size="400px">
      <div v-if="selectedSnake" class="snake-detail">
        <el-descriptions :column="1" border>
          <el-descriptions-item label="中文名">{{ selectedSnake.label }}</el-descriptions-item>
          <el-descriptions-item label="拉丁学名">{{ selectedSnake.latin || '未知' }}</el-descriptions-item>
          <el-descriptions-item label="科">{{ selectedSnake.family || '未知' }}</el-descriptions-item>
          <el-descriptions-item label="毒素类型">
            <el-tag :type="toxinTagType(selectedSnake.toxin)">{{ selectedSnake.toxin || '无毒' }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="危险等级">
            <el-tag :type="dangerTagType(selectedSnake.danger)">{{ selectedSnake.danger || '无毒' }}</el-tag>
          </el-descriptions-item>
        </el-descriptions>
        <div style="margin-top: 16px">
          <el-button type="primary" @click="router.push({ path: '/emergency', query: { tab: 'name', snakeName: selectedSnake.label } })">
            查看更多
          </el-button>
        </div>
        <h4 style="margin-top: 16px">关联节点</h4>
        <div class="related-nodes">
          <el-tag
            v-for="node in relatedNodes" :key="node.id"
            :type="tagTypeMap[node.type] || 'info'"
            class="related-tag" @click="handleRelatedClick(node)"
          >{{ node.label }}</el-tag>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'
import axios from 'axios'
import { use3DGraph } from '@/composables/use3DGraph'
import { useHandTracking } from '@/composables/useHandTracking'

const router = useRouter()
const containerRef = ref(null)
const graph = use3DGraph()
const hand = useHandTracking()

// 手势速度控制
const rotSpeed = ref(1)
const zoomSpeed = ref(3)
watch([rotSpeed, zoomSpeed], ([r, z]) => graph.setGestureSpeed(z, r))

/* ── 手势相关 ── */
const gestureIcon = computed(() => {
  const g = hand.currentGesture.value
  if (g === 'open_palm') return '🖐️'
  if (g === 'closed_fist') return '✊'
  if (g === 'pointing') return '☝️'
  return '👀'
})
const gestureText = computed(() => {
  const g = hand.currentGesture.value
  if (g === 'open_palm') return '张掌 · 放大'
  if (g === 'closed_fist') return '握拳 · 缩小'
  if (g === 'pointing') return '食指 · 旋转'
  return '等待手势...'
})

function toggleHandTracking() {
  if (hand.isActive.value) {
    hand.stop()
  } else if (containerRef.value) {
    hand.start(containerRef.value)
  }
}

// 手势 → 图谱控制（在 start 前注册）
hand.onGestureChange((result) => {
  graph.applyGesture(
    result.gesture,
    result.palmPosition.x, result.palmPosition.y,
    result.indexTip.x, result.indexTip.y
  )
})

const viewMode = ref('overview')
const showLabels = ref(true)
const stats = ref(null)
const drawerVisible = ref(false)
const selectedSnake = ref(null)
const relatedNodes = ref([])
const searchQuery = ref('')
const selectedFamily = ref('')
const families = ref([])
const familyCounts = ref({})

let allSnakeNodes = []

/* ── 标签映射 ── */
const typeLabel = (type) => ({
  family: '科', snake: '蛇种', toxin: '毒素', symptom: '症状', serum: '血清', danger: '危险',
}[type] || type)

const tagTypeMap = { family: '', toxin: 'danger', symptom: 'warning', serum: 'success', danger: 'danger', snake: 'info' }
const toxinTagType = (t) => ({ '神经毒素': 'danger', '血液毒素': 'warning', '混合毒素': 'danger' }[t] || 'info')
const dangerTagType = (d) => ({ '重度': 'danger', '中度': 'warning', '轻度': '' }[d] || 'info')

/* ── 搜索 ── */
const querySearch = (queryString, cb) => {
  const results = queryString
    ? allSnakeNodes.filter(n => n.value.includes(queryString))
    : allSnakeNodes
  cb(results.slice(0, 20))
}

const handleSearchSelect = (item) => {
  let nodeId = item.id
  if (!nodeId.startsWith('snake:')) nodeId = 'snake:' + nodeId
  graph.focusNode(nodeId)

  // 获取节点数据用于抽屉
  const nodeObj = graph.nodeMap.get(nodeId)
  if (nodeObj) {
    selectedSnake.value = nodeObj.data
    relatedNodes.value = getRelatedNodes(nodeId)
    drawerVisible.value = true
  }
}

/* ── 关联节点 ── */
function getRelatedNodes(nodeId) {
  const result = []
  // 通过边找关联
  for (const edge of graph.nodeMap.get(nodeId)?.data?._edges ?? []) {
    // 不直接存边，遍历所有边找
  }
  // 简单方法：遍历图数据中所有边
  for (const [, nodeObj] of graph.nodeMap) {
    // 跳过自身
  }
  // 实际上我们用 nodeMap 和 edges 列表来查
  return result
}

/* ── 展开/折叠 ── */
const toggleFamily = (familyName) => {
  graph.toggleFamily(familyName)
}

const switchView = (mode) => {
  if (mode === 'expanded') {
    graph.expandAll()
  } else {
    graph.collapseAll()
  }
}

const resetView = () => {
  graph.collapseAll()
  searchQuery.value = ''
  selectedFamily.value = ''
  viewMode.value = 'overview'
}

const toggleLabels = () => {
  showLabels.value = !showLabels.value
  // 切换标签可见性
  graph.nodeMap.forEach(n => {
    n.label.visible = showLabels.value
  })
}

const focusFamily = (name) => {
  if (!name) return
  graph.expandFamily(name)
  // 找到科节点并聚焦
  const familyId = 'family:' + name
  graph.focusNode(familyId)
}

/* ── 节点点击回调 ── */
graph.onNodeClick((data) => {
  if (data.type === 'family') {
    toggleFamily(data.label)
  } else if (data.type === 'snake') {
    selectedSnake.value = data
    // 获取关联节点
    relatedNodes.value = getRelatedNodesFromEdges(data.id)
    drawerVisible.value = true
  }
})

function getRelatedNodesFromEdges(nodeId) {
  const related = []
  // 遍历 3D 图谱中所有边
  for (const edge of graph.nodeMap.get(nodeId) ? [] : []) {}
  // 实际上我们可以通过遍历 nodeMap 和已知的边来获取
  // 简单做法：遍历所有节点，找 family 相同的
  const nodeObj = graph.nodeMap.get(nodeId)
  if (!nodeObj) return related

  // 找同一科的蛇
  if (nodeObj.data.family) {
    graph.nodeMap.forEach(n => {
      if (n.data.family === nodeObj.data.family && n.data.id !== nodeId && n.data.type === 'snake') {
        related.push({ id: n.data.id, label: n.data.label, type: n.data.type })
      }
    })
  }
  // 找毒素关联
  if (nodeObj.data.toxin) {
    related.push({ id: 'toxin:' + nodeObj.data.toxin, label: nodeObj.data.toxin, type: 'toxin' })
  }
  return related.slice(0, 10)
}

const handleRelatedClick = (node) => {
  graph.focusNode(node.id)
}

/* ── 加载图数据 ── */
const loadGraph = async () => {
  try {
    const { data } = await axios.get('/snake/graph/full')
    if (data.code === 200 && data.data) {
      graph.loadGraphData(data.data)
      stats.value = data.data.stats

      // 统计科
      familyCounts.value = {}
      data.data.nodes.forEach(n => {
        if (n.data.type === 'snake' && n.data.family) {
          familyCounts.value[n.data.family] = (familyCounts.value[n.data.family] || 0) + 1
        }
      })
      families.value = Object.keys(familyCounts.value).sort()

      // 搜索数据
      allSnakeNodes = data.data.nodes
        .filter(n => n.data.type === 'snake')
        .map(n => ({ id: n.data.id, value: n.data.label, family: n.data.family }))
    }
  } catch (err) {
    console.error('加载图谱失败:', err)
  }
}

/* ── 生命周期 ── */
onMounted(() => {
  nextTick(() => {
    if (containerRef.value) {
      graph.bind(containerRef.value)
      loadGraph()
    }
  })
})

onUnmounted(() => {
  graph.destroy()
})
</script>

<style scoped>
.knowledge-graph {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  /* 宽度铺满，突破父布局 max-width 和 padding */
  width: calc(100vw - var(--space-4) * 2);
  margin-left: calc(-50vw + 50% + var(--space-4));
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-3) var(--space-5);
  background: rgba(10, 14, 10, 0.95);
  border-bottom: 1px solid rgba(80, 184, 240, 0.15);
  flex-shrink: 0;
  z-index: 10;
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.back-btn { flex-shrink: 0; }

.toolbar h2 {
  margin: 0;
  font-size: var(--text-lg);
  color: rgba(200, 230, 215, 0.95);
  flex-shrink: 0;
}

.controls {
  display: flex;
  gap: var(--space-3);
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.graph-container {
  flex: 1;
  min-height: 0;
  position: relative;
  background: #060a06;
  overflow: hidden;
}

/* 手势速度控制条 */
.speed-bar {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: rgba(10, 14, 10, 0.95);
  border-bottom: 1px solid rgba(80, 184, 240, 0.1);
  flex-shrink: 0;
}
.speed-label {
  color: rgba(200, 230, 215, 0.7);
  font-size: var(--text-xs);
  white-space: nowrap;
}
.speed-value {
  color: rgba(200, 230, 215, 0.9);
  font-size: var(--text-xs);
  font-weight: 600;
  min-width: 28px;
  text-align: center;
}

/* 图例 */
.legend {
  position: absolute;
  top: var(--space-3);
  left: var(--space-3);
  background: rgba(10, 14, 10, 0.85);
  border: 1px solid rgba(80, 184, 240, 0.12);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  box-shadow: 0 2px 16px rgba(0,0,0,0.5);
  font-size: var(--text-xs);
  color: rgba(200, 230, 215, 0.85);
  z-index: 5;
  pointer-events: none;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-1);
}
.legend-item:last-child { margin-bottom: 0; }
.legend-hint {
  margin-top: var(--space-2);
  padding-top: var(--space-2);
  border-top: 1px solid rgba(80, 184, 240, 0.1);
  font-size: 11px;
  color: rgba(160, 200, 180, 0.6);
}

.dot {
  width: 12px; height: 12px;
  border-radius: 50%;
  display: inline-block;
  flex-shrink: 0;
}
.dot.snake   { background: #50b8f0; width: 8px; height: 8px; }
.dot.family  { background: #409EFF; border-radius: var(--radius-sm); width: 16px; height: 12px; }
.dot.toxin   { background: #F56C6C; clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); }
.dot.symptom { background: #E6A23C; border-radius: var(--radius-sm); width: 16px; height: 12px; }
.dot.serum   { background: #67C23A; clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); }
.dot.danger  { background: #FF3333; clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%); }

/* 统计 */
.stats {
  position: absolute;
  bottom: var(--space-3);
  left: var(--space-3);
  background: rgba(10, 14, 10, 0.85);
  border: 1px solid rgba(80, 184, 240, 0.1);
  border-radius: var(--radius-md);
  padding: var(--space-2) var(--space-4);
  box-shadow: 0 2px 12px rgba(0,0,0,0.4);
  font-size: var(--text-xs);
  color: rgba(200, 230, 215, 0.8);
  display: flex;
  gap: var(--space-4);
  z-index: 5;
  pointer-events: none;
}

/* 悬浮信息卡 */
.hover-card {
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  background: rgba(10, 14, 10, 0.9);
  border: 1px solid rgba(80, 184, 240, 0.2);
  border-radius: var(--radius-md);
  padding: var(--space-2) var(--space-3);
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
  z-index: 5;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  pointer-events: none;
  backdrop-filter: blur(8px);
}
.hover-type {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
}
.hover-type.family  { background: rgba(64, 158, 255, 0.25); color: #409EFF; }
.hover-type.snake   { background: rgba(80, 184, 240, 0.25); color: #50b8f0; }
.hover-type.toxin   { background: rgba(245, 108, 108, 0.25); color: #F56C6C; }
.hover-type.symptom { background: rgba(230, 162, 60, 0.25); color: #E6A23C; }
.hover-type.serum   { background: rgba(103, 194, 58, 0.25); color: #67C23A; }
.hover-type.danger  { background: rgba(255, 51, 51, 0.25); color: #FF3333; }
.hover-name {
  color: rgba(220, 240, 230, 0.95);
  font-size: var(--text-sm);
  font-weight: 500;
}
.hover-extra {
  color: rgba(180, 200, 190, 0.6);
  font-size: var(--text-xs);
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* 手势状态 */
.hand-status {
  position: absolute;
  bottom: var(--space-3);
  right: var(--space-3);
  background: rgba(10, 14, 10, 0.9);
  border: 1px solid rgba(80, 184, 240, 0.2);
  border-radius: var(--radius-md);
  padding: var(--space-2) var(--space-3);
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
  z-index: 5;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  backdrop-filter: blur(8px);
  pointer-events: none;
}
.hand-gesture-icon {
  font-size: 24px;
  animation: pulse-icon 1.5s ease-in-out infinite;
}
.hand-gesture-text {
  color: rgba(220, 240, 230, 0.9);
  font-size: var(--text-sm);
  font-weight: 500;
}
.hand-confidence {
  color: #67C23A;
  font-size: var(--text-xs);
  font-weight: 600;
}
@keyframes pulse-icon {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15); }
}

.hand-error {
  position: absolute;
  bottom: var(--space-3);
  right: var(--space-3);
  background: rgba(245, 108, 108, 0.15);
  border: 1px solid rgba(245, 108, 108, 0.3);
  border-radius: var(--radius-md);
  padding: var(--space-2) var(--space-3);
  color: #F56C6C;
  font-size: var(--text-xs);
  z-index: 5;
  max-width: 300px;
}

/* 抽屉 */
.snake-detail { padding: var(--space-2); }
.related-nodes { display: flex; flex-wrap: wrap; gap: var(--space-2); margin-top: var(--space-2); }
.related-tag { cursor: pointer; }
.related-tag:hover { opacity: 0.8; }
</style>

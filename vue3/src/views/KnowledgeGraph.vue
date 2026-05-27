<template>
  <div class="knowledge-graph">
    <!-- 顶部控制栏 -->
    <div class="toolbar">
      <div class="toolbar-left">
        <el-button :icon="ArrowLeft" circle @click="$router.push('/dashboard')" class="back-btn" />
        <h2>蛇类科普知识图谱</h2>
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
      </div>
    </div>

    <!-- 图谱主体 -->
    <div class="graph-container">
      <div ref="graphRef" class="graph-canvas"></div>

      <!-- 图例 -->
      <div class="legend">
        <div class="legend-item"><span class="dot snake"></span>蛇种</div>
        <div class="legend-item"><span class="dot family"></span>科（点击展开）</div>
        <div class="legend-item"><span class="dot toxin"></span>毒素类型</div>
        <div class="legend-item"><span class="dot symptom"></span>症状</div>
        <div class="legend-item"><span class="dot serum"></span>血清</div>
        <div class="legend-item"><span class="dot danger"></span>危险等级</div>
      </div>

      <!-- 统计信息 -->
      <div class="stats" v-if="stats">
        <span>蛇种: {{ stats.snakeCount || 0 }}</span>
        <span>科: {{ stats.familyCount || 0 }}</span>
        <span>节点: {{ stats.totalNodes }}</span>
      </div>
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
            class="related-tag" @click="focusNode(node.id)"
          >{{ node.label }}</el-tag>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'
import cytoscape from 'cytoscape'
import axios from 'axios'

const router = useRouter()
const graphRef = ref(null)
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

let cy = null
let allSnakeNodes = []
let expandedFamilies = new Set()

const FAMILY_COLORS = [
  '#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399',
  '#00D4AA', '#9B59B6', '#3498DB', '#E74C3C', '#1ABC9C',
  '#F39C12', '#8E44AD', '#2ECC71', '#E91E63', '#00BCD4',
  '#FF5722', '#795548', '#607D8B', '#FF9800', '#4CAF50', '#CDDC39',
  '#03A9F4', '#FFC107', '#673AB7'
]
const familyColorMap = {}

const getFamilyColor = (name) => {
  if (!familyColorMap[name]) {
    const idx = Object.keys(familyColorMap).length % FAMILY_COLORS.length
    familyColorMap[name] = FAMILY_COLORS[idx]
  }
  return familyColorMap[name]
}

const tagTypeMap = { family: '', toxin: 'danger', symptom: 'warning', serum: 'success', danger: 'danger', snake: 'info' }
const toxinTagType = (t) => ({ '神经毒素': 'danger', '血液毒素': 'warning', '混合毒素': 'danger' }[t] || 'info')
const dangerTagType = (d) => ({ '重度': 'danger', '中度': 'warning', '轻度': '' }[d] || 'info')

const querySearch = (queryString, cb) => {
  const results = queryString
    ? allSnakeNodes.filter(n => n.value.includes(queryString))
    : allSnakeNodes
  cb(results.slice(0, 20))
}

// ── Manual expand/collapse ──

const toggleFamily = (familyName) => {
  if (!cy) return
  if (expandedFamilies.has(familyName)) {
    collapseFamily(familyName)
  } else {
    expandFamily(familyName)
  }
}

const expandFamily = (familyName) => {
  if (!cy) return
  expandedFamilies.add(familyName)
  cy.batch(() => {
    cy.nodes(`[family="${familyName}"]`).style('display', 'element')
    cy.edges(`[sourceFamily="${familyName}"], [targetFamily="${familyName}"]`).style('display', 'element')
  })
}

const collapseFamily = (familyName) => {
  if (!cy) return
  expandedFamilies.delete(familyName)
  cy.batch(() => {
    cy.nodes(`[family="${familyName}"]`).style('display', 'none')
    cy.edges(`[sourceFamily="${familyName}"], [targetFamily="${familyName}"]`).style('display', 'none')
  })
}

const collapseAllFamilies = () => {
  if (!cy) return
  expandedFamilies.clear()
  cy.batch(() => {
    cy.nodes('[type="snake"]').style('display', 'none')
    cy.edges('[?isFamilyEdge]').style('display', 'none')
  })
}

const expandAllFamilies = () => {
  if (!cy) return
  cy.nodes('[type="family"]').forEach(n => expandedFamilies.add(n.data('label')))
  cy.batch(() => {
    cy.nodes('[type="snake"]').style('display', 'element')
    cy.edges('[?isFamilyEdge]').style('display', 'element')
  })
}

// ── Layout calculation ──

const calcPositions = (graphData) => {
  const positions = {}
  const familyNodes = graphData.nodes.filter(n => n.data.type === 'family')
  const snakeNodes = graphData.nodes.filter(n => n.data.type === 'snake')
  const sharedNodes = graphData.nodes.filter(n => ['toxin', 'symptom', 'serum', 'danger'].includes(n.data.type))

  const centerX = 0
  const centerY = 0

  // Shared nodes in center area
  const sharedSpacing = 180
  sharedNodes.forEach((n, i) => {
    const angle = (i / sharedNodes.length) * Math.PI * 2 - Math.PI / 2
    positions[n.data.id] = {
      x: centerX + Math.cos(angle) * sharedSpacing,
      y: centerY + Math.sin(angle) * sharedSpacing
    }
  })

  // Family nodes on a circle
  const familyRadius = Math.max(350, familyNodes.length * 45)
  familyNodes.forEach((n, i) => {
    const angle = (i / familyNodes.length) * Math.PI * 2 - Math.PI / 2
    positions[n.data.id] = {
      x: centerX + Math.cos(angle) * familyRadius,
      y: centerY + Math.sin(angle) * familyRadius
    }
  })

  // Snake nodes around their family
  const snakesByFamily = {}
  snakeNodes.forEach(n => {
    const fam = n.data.family
    if (!snakesByFamily[fam]) snakesByFamily[fam] = []
    snakesByFamily[fam].push(n)
  })

  familyNodes.forEach((famNode, fi) => {
    const famPos = positions[famNode.data.id]
    const famAngle = Math.atan2(famPos.y - centerY, famPos.x - centerX)
    const snakes = snakesByFamily[famNode.data.label] || []
    const count = snakes.length
    if (count === 0) return

    const fanSpread = Math.min(Math.PI * 0.6, count * 0.15)
    const startAngle = famAngle - fanSpread / 2
    const snakeRadius = 100 + count * 3

    snakes.forEach((sn, si) => {
      const t = count === 1 ? 0 : si / (count - 1)
      const angle = startAngle + t * fanSpread
      positions[sn.data.id] = {
        x: famPos.x + Math.cos(angle) * snakeRadius,
        y: famPos.y + Math.sin(angle) * snakeRadius
      }
    })
  })

  return positions
}

// ── Main logic ──

const handleSearchSelect = (item) => {
  if (!cy) return
  resetHighlight()

  let nodeId = item.id
  if (!nodeId.startsWith('snake:')) nodeId = 'snake:' + nodeId

  const node = cy.getElementById(nodeId)
  if (!node.length) return

  // Expand the family if collapsed
  const fam = node.data('family')
  if (fam && !expandedFamilies.has(fam)) {
    expandFamily(fam)
  }

  const neighborhood = node.neighborhood().add(node)
  cy.elements().style({ 'opacity': 0.12 })
  neighborhood.style({ 'opacity': 1 })
  node.style({ 'border-width': 4, 'border-color': '#F56C6C', 'opacity': 1 })

  cy.animate({ center: { eles: node }, zoom: 1.8 }, { duration: 600 })

  selectedSnake.value = node.data()
  const connected = node.connectedEdges().filter(e => e.style('display') !== 'none').map(e => {
    const sourceId = e.data('source')
    const targetId = e.data('target')
    const otherId = sourceId === nodeId ? targetId : sourceId
    const otherNode = cy.getElementById(otherId).data()
    return { id: otherId, label: otherNode.label, type: otherNode.type }
  })
  relatedNodes.value = connected
  drawerVisible.value = true
}

const resetHighlight = () => {
  if (!cy) return
  cy.elements().style({ 'opacity': 1, 'border-width': 0 })
  cy.nodes('[danger="重度"]').style({ 'border-width': 3, 'border-color': '#F56C6C' })
}

const loadGraph = async () => {
  try {
    const { data } = await axios.get('/snake/graph/full')
    if (data.code === 200 && data.data) {
      renderGraph(data.data)
      stats.value = data.data.stats
      familyCounts.value = {}
      data.data.nodes.forEach(n => {
        if (n.data.type === 'snake' && n.data.family) {
          familyCounts.value[n.data.family] = (familyCounts.value[n.data.family] || 0) + 1
        }
      })
      families.value = Object.keys(familyCounts.value).sort()
      selectedFamily.value = ''
      allSnakeNodes = data.data.nodes
        .filter(n => n.data.type === 'snake')
        .map(n => ({ id: n.data.id.replace('snake:', ''), value: n.data.label, family: n.data.family }))
    }
  } catch (err) {
    console.error('加载图谱失败:', err)
  }
}

const renderGraph = (graphData) => {
  if (cy) { cy.destroy(); cy = null }
  expandedFamilies.clear()

  // Enrich edges with family info for show/hide
  const snakeFamilies = {}
  graphData.nodes.forEach(n => {
    if (n.data.type === 'snake' && n.data.family) {
      snakeFamilies[n.data.id] = n.data.family
    }
  })

  const edges = graphData.edges.map(e => {
    const srcFam = snakeFamilies[e.data.source]
    const tgtFam = snakeFamilies[e.data.target]
    const isFamilyEdge = !!(srcFam || tgtFam)
    e.data.isFamilyEdge = isFamilyEdge
    if (srcFam) e.data.sourceFamily = srcFam
    if (tgtFam) e.data.targetFamily = tgtFam
    return e
  })

  // Enrich family nodes with color
  const nodes = graphData.nodes.map(n => {
    if (n.data.type === 'family') {
      n.data.color = getFamilyColor(n.data.label)
    }
    if (n.data.type === 'snake' && n.data.family) {
      n.data.color = getFamilyColor(n.data.family)
    }
    return n
  })

  const positions = calcPositions(graphData)

  // Apply positions to nodes
  nodes.forEach(n => {
    const pos = positions[n.data.id]
    if (pos) {
      n.position = pos
    }
  })

  cy = cytoscape({
    container: graphRef.value,
    elements: [...nodes, ...edges],
    minZoom: 0.08,
    maxZoom: 6,
    userPanningEnabled: true,
    userZoomingEnabled: true,
    boxSelectionEnabled: false,
    style: [
      {
        selector: 'node',
        style: {
          'label': 'data(label)',
          'text-valign': 'center',
          'text-halign': 'center',
          'font-size': '10px',
          'color': '#fff',
          'text-outline-width': 2,
          'text-outline-color': '#555',
          'width': 25,
          'height': 25,
          'background-color': '#409EFF'
        }
      },
      {
        selector: 'node[type="snake"]',
        style: {
          'background-color': 'data(color)',
          'width': 18,
          'height': 18,
          'font-size': '9px',
          'text-opacity': 1,
          'display': 'none'
        }
      },
      {
        selector: 'node[type="family"]',
        style: {
          'background-color': 'data(color)',
          'shape': 'round-rectangle',
          'width': 60,
          'height': 60,
          'font-size': '13px',
          'font-weight': 'bold',
          'text-valign': 'bottom',
          'text-margin-y': 8,
          'border-width': 2,
          'border-color': '#fff',
          'cursor': 'pointer'
        }
      },
      {
        selector: 'node[type="toxin"]',
        style: {
          'background-color': '#F56C6C',
          'shape': 'diamond',
          'width': 50,
          'height': 50,
          'font-size': '12px',
          'font-weight': 'bold'
        }
      },
      {
        selector: 'node[type="symptom"]',
        style: {
          'background-color': '#E6A23C',
          'shape': 'round-rectangle',
          'width': 85,
          'height': 32,
          'font-size': '8px',
          'text-wrap': 'wrap',
          'text-max-width': '75px'
        }
      },
      {
        selector: 'node[type="serum"]',
        style: {
          'background-color': '#67C23A',
          'shape': 'hexagon',
          'width': 55,
          'height': 55,
          'font-size': '9px',
          'text-wrap': 'wrap',
          'text-max-width': '50px'
        }
      },
      {
        selector: 'node[type="danger"]',
        style: {
          'background-color': '#F56C6C',
          'shape': 'star',
          'width': 45,
          'height': 45,
          'font-size': '11px',
          'font-weight': 'bold'
        }
      },
      {
        selector: 'edge',
        style: {
          'width': 1,
          'line-color': '#bbb',
          'target-arrow-color': '#bbb',
          'target-arrow-shape': 'triangle',
          'arrow-scale': 0.6,
          'curve-style': 'bezier',
          'label': 'data(label)',
          'font-size': '7px',
          'color': '#999',
          'text-rotation': 'autorotate',
          'text-margin-y': -8,
          'opacity': 0.5
        }
      },
      {
        selector: 'edge[?isFamilyEdge]',
        style: { 'display': 'none' }
      },
      {
        selector: 'node[danger="重度"]',
        style: { 'border-width': 3, 'border-color': '#F56C6C' }
      }
    ],
    layout: { name: 'preset' }
  })

  // Center and fit
  cy.fit(undefined, 80)

  // ── Event handlers ──

  // Click family → toggle expand/collapse
  cy.on('tap', 'node[type="family"]', (evt) => {
    toggleFamily(evt.target.data('label'))
  })

  // Click snake → detail drawer
  cy.on('tap', 'node[type="snake"]', (evt) => {
    const node = evt.target
    selectedSnake.value = node.data()
    const connected = node.connectedEdges().filter(e => e.style('display') !== 'none').map(e => {
      const sourceId = e.data('source')
      const targetId = e.data('target')
      const otherId = sourceId === node.id() ? targetId : sourceId
      const otherNode = cy.getElementById(otherId).data()
      return { id: otherId, label: otherNode.label, type: otherNode.type }
    })
    relatedNodes.value = connected
    drawerVisible.value = true
  })

  // Hover snake → highlight edges
  cy.on('mouseover', 'node[type="snake"]', (evt) => {
    evt.target.style('cursor', 'pointer')
    evt.target.connectedEdges().filter(e => e.style('display') !== 'none').style({ 'opacity': 1, 'width': 2, 'line-color': '#666' })
  })
  cy.on('mouseout', 'node[type="snake"]', (evt) => {
    evt.target.connectedEdges().filter(e => e.style('display') !== 'none').style({ 'opacity': 0.5, 'width': 1, 'line-color': '#bbb' })
  })

  // Zoom-adaptive labels
  const updateZoomStyle = () => {
    const zoom = cy.zoom()
    if (zoom < 0.3) {
      cy.style()
        .selector('node').style('label', '')
        .selector('node[type="family"]').style('label', 'data(label)')
        .selector('edge').style({ 'opacity': 0 }).update()
    } else if (zoom < 0.6) {
      cy.style()
        .selector('node[type="snake"]').style({ 'label': '', 'font-size': '1px' })
        .selector('node[type="family"]').style('label', 'data(label)')
        .selector('node[type="toxin"]').style('label', 'data(label)')
        .selector('node[type="danger"]').style('label', 'data(label)')
        .selector('node[type="serum"]').style('label', 'data(label)')
        .selector('node[type="symptom"]').style('label', '')
        .selector('edge').style({ 'opacity': 0.25, 'label': '' })
        .update()
    } else {
      cy.style()
        .selector('node').style('label', 'data(label)')
        .selector('node[type="snake"]').style({ 'font-size': '9px', 'text-opacity': 1 })
        .selector('node[type="symptom"]').style({ 'font-size': '8px', 'text-wrap': 'wrap', 'text-max-width': '75px' })
        .selector('edge').style({ 'opacity': 0.5, 'label': 'data(label)' })
        .update()
    }
  }
  cy.on('zoom', updateZoomStyle)
  updateZoomStyle()

  // Click background → clear highlight
  cy.on('tap', (evt) => {
    if (evt.target === cy) {
      resetHighlight()
      drawerVisible.value = false
    }
  })
}

const focusFamily = (name) => {
  if (!cy || !name) return
  const node = cy.getElementById('family:' + name)
  if (node.length) {
    if (!expandedFamilies.has(name)) expandFamily(name)
    cy.animate({ center: { eles: node }, zoom: 1.2 }, { duration: 500 })
  }
}

const switchView = (mode) => {
  if (!cy) return
  if (mode === 'expanded') {
    expandAllFamilies()
  } else {
    collapseAllFamilies()
    cy.fit(undefined, 80)
  }
}

const resetView = () => {
  if (!cy) return
  resetHighlight()
  searchQuery.value = ''
  selectedFamily.value = ''
  collapseAllFamilies()
  cy.fit(undefined, 80)
  viewMode.value = 'overview'
}

const toggleLabels = () => {
  showLabels.value = !showLabels.value
  if (cy) {
    cy.style()
      .selector('node').style('label', showLabels.value ? 'data(label)' : '')
      .selector('edge').style('label', showLabels.value ? 'data(label)' : '')
      .update()
  }
}

const focusNode = (nodeId) => {
  if (!cy) return
  const node = cy.getElementById(nodeId)
  if (node.length) {
    const fam = node.data('family')
    if (fam && !expandedFamilies.has(fam)) expandFamily(fam)
    cy.animate({ center: { eles: node }, zoom: 1.5 }, { duration: 500 })
  }
}

onMounted(() => { nextTick(() => loadGraph()) })
onUnmounted(() => { if (cy) cy.destroy() })
</script>

<style scoped>
.knowledge-graph {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-3) var(--space-5);
  background: var(--surface-white);
  border-bottom: 1px solid var(--green-100);
  flex-shrink: 0;
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.back-btn {
  flex-shrink: 0;
}

.toolbar h2 {
  margin: 0;
  font-size: var(--text-lg);
  color: var(--ink-900);
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
  background: #f5f7fa;
  overflow: hidden;
}

.graph-canvas {
  width: 100%;
  height: 100%;
}

.legend {
  position: absolute;
  top: var(--space-3);
  left: var(--space-3);
  background: var(--surface-white);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  box-shadow: var(--shadow-sm);
  font-size: var(--text-xs);
}
.legend-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
}
.legend-item:last-child { margin-bottom: 0; }

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  flex-shrink: 0;
}
.dot.snake { background: #409EFF; width: 8px; height: 8px; }
.dot.family { background: #67C23A; border-radius: var(--radius-sm); width: 16px; height: 12px; }
.dot.toxin { background: #F56C6C; clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); }
.dot.symptom { background: #E6A23C; border-radius: var(--radius-sm); width: 16px; height: 12px; }
.dot.serum { background: #67C23A; clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); }
.dot.danger { background: #F56C6C; clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%); }

.stats {
  position: absolute;
  bottom: var(--space-3);
  left: var(--space-3);
  background: var(--surface-white);
  border-radius: var(--radius-md);
  padding: var(--space-2) var(--space-4);
  box-shadow: var(--shadow-sm);
  font-size: var(--text-xs);
  color: var(--ink-700);
  display: flex;
  gap: var(--space-4);
}
.snake-detail { padding: var(--space-2); }
.related-nodes { display: flex; flex-wrap: wrap; gap: var(--space-2); margin-top: var(--space-2); }
.related-tag { cursor: pointer; }
.related-tag:hover { opacity: 0.8; }
</style>

<template>
  <div class="knowledge-graph">
    <!-- 顶部控制栏 -->
    <div class="toolbar">
      <h2>蛇类科普知识图谱</h2>
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
          <template #prefix>
            <i class="el-icon-search"></i>
          </template>
        </el-autocomplete>
        <el-radio-group v-model="filter" @change="loadGraph">
          <el-radio-button value="all">全部</el-radio-button>
          <el-radio-button value="venomous">有毒蛇</el-radio-button>
          <el-radio-button value="severe">剧毒蛇</el-radio-button>
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
        <div class="legend-item"><span class="dot family"></span>科</div>
        <div class="legend-item"><span class="dot toxin"></span>毒素类型</div>
        <div class="legend-item"><span class="dot symptom"></span>症状</div>
        <div class="legend-item"><span class="dot serum"></span>血清</div>
        <div class="legend-item"><span class="dot danger"></span>危险等级</div>
      </div>

      <!-- 统计信息 -->
      <div class="stats" v-if="stats">
        <span>蛇种: {{ stats.snakeCount }}</span>
        <span>节点: {{ stats.totalNodes }}</span>
        <span>关系: {{ stats.totalEdges }}</span>
      </div>
    </div>

    <!-- 蛇种详情弹窗 -->
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

        <h4 style="margin-top: 16px">关联节点</h4>
        <div class="related-nodes">
          <el-tag
            v-for="node in relatedNodes"
            :key="node.id"
            :type="tagTypeMap[node.type] || 'info'"
            class="related-tag"
            @click="focusNode(node.id)"
          >
            {{ node.label }}
          </el-tag>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import cytoscape from 'cytoscape'
import axios from 'axios'

const graphRef = ref(null)
const filter = ref('all')
const showLabels = ref(true)
const stats = ref(null)
const drawerVisible = ref(false)
const selectedSnake = ref(null)
const relatedNodes = ref([])
const searchQuery = ref('')

let cy = null
let allSnakeNodes = []  // 缓存所有蛇种节点用于搜索

const tagTypeMap = {
  family: '',
  toxin: 'danger',
  symptom: 'warning',
  serum: 'success',
  danger: 'danger',
  snake: 'info'
}

// 节点样式配置
const nodeStyles = {
  snake: { bg: '#409EFF', shape: 'ellipse', size: 30 },
  family: { bg: '#67C23A', shape: 'round-rectangle', size: 50 },
  toxin: { bg: '#F56C6C', shape: 'diamond', size: 40 },
  symptom: { bg: '#E6A23C', shape: 'round-rectangle', size: 45 },
  serum: { bg: '#67C23A', shape: 'hexagon', size: 40 },
  danger: { bg: '#F56C6C', shape: 'star', size: 35 }
}

const toxinTagType = (toxin) => {
  const map = { '神经毒素': 'danger', '血液毒素': 'warning', '细胞毒素': '', '混合毒素': 'danger' }
  return map[toxin] || 'info'
}

const dangerTagType = (danger) => {
  const map = { '重度': 'danger', '中度': 'warning', '轻度': '' }
  return map[danger] || 'info'
}

// 搜索：过滤蛇种名称
const querySearch = (queryString, cb) => {
  const results = queryString
    ? allSnakeNodes.filter(n => n.value.includes(queryString))
    : allSnakeNodes
  cb(results.slice(0, 20))
}

// 搜索：选中蛇种后定位并高亮
let highlightTimer = null

const handleSearchSelect = (item) => {
  if (!cy) return
  const nodeId = item.id
  const node = cy.getElementById(nodeId)
  if (!node.length) return

  // 清除旧高亮定时器
  if (highlightTimer) { clearTimeout(highlightTimer); highlightTimer = null }

  // 恢复所有元素默认样式
  resetHighlight()

  // 高亮目标节点及其邻居，淡化其余
  const neighborhood = node.neighborhood().add(node)
  cy.elements().style({ 'opacity': 0.15 })
  neighborhood.style({ 'opacity': 1 })
  node.style({ 'border-width': 4, 'border-color': '#F56C6C', 'opacity': 1 })

  // 定位到目标节点
  cy.animate({ center: { eles: node }, zoom: 2 }, { duration: 500 })

  // 弹出详情
  selectedSnake.value = node.data()
  const connected = node.connectedEdges().map(e => {
    const targetId = e.data('target')
    const targetNode = cy.getElementById(targetId).data()
    return { id: targetId, label: targetNode.label, type: targetNode.type }
  })
  relatedNodes.value = connected
  drawerVisible.value = true

  // 3秒后恢复正常样式
  highlightTimer = setTimeout(() => {
    resetHighlight()
    highlightTimer = null
  }, 3000)
}

const resetHighlight = () => {
  if (!cy) return
  cy.elements().style({ 'opacity': 1, 'border-width': 0 })
  // 恢复重度危险蛇的红色边框
  cy.nodes('[danger="重度"]').style({ 'border-width': 3, 'border-color': '#F56C6C' })
}

// 加载图谱数据
const loadGraph = async () => {
  try {
    const { data } = await axios.get(`/snake/graph/data?filter=${filter.value}`)
    if (data.code === 200) {
      renderGraph(data.data)
      stats.value = data.data.stats
      // 缓存蛇种节点用于搜索
      allSnakeNodes = data.data.nodes
        .filter(n => n.data.type === 'snake')
        .map(n => ({ id: n.data.id, value: n.data.label }))
    }
  } catch (err) {
    console.error('加载图谱失败:', err)
  }
}

// 渲染图谱
const renderGraph = (graphData) => {
  if (cy) {
    cy.stop()       // 停止所有运行中的动画/布局
    cy.destroy()
    cy = null
  }

  const elements = [...graphData.nodes, ...graphData.edges]

  cy = cytoscape({
    container: graphRef.value,
    elements,
    minZoom: 0.1,
    maxZoom: 5,
    style: [
      // 默认节点样式
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
          'width': 30,
          'height': 30,
          'background-color': '#409EFF'
        }
      },
      // 蛇种节点
      {
        selector: 'node[type="snake"]',
        style: {
          'background-color': '#409EFF',
          'width': 25,
          'height': 25,
          'font-size': '9px'
        }
      },
      // 科节点
      {
        selector: 'node[type="family"]',
        style: {
          'background-color': '#67C23A',
          'shape': 'round-rectangle',
          'width': 60,
          'height': 30,
          'font-size': '12px',
          'font-weight': 'bold'
        }
      },
      // 毒素节点
      {
        selector: 'node[type="toxin"]',
        style: {
          'background-color': '#F56C6C',
          'shape': 'diamond',
          'width': 45,
          'height': 45,
          'font-size': '11px',
          'font-weight': 'bold'
        }
      },
      // 症状节点
      {
        selector: 'node[type="symptom"]',
        style: {
          'background-color': '#E6A23C',
          'shape': 'round-rectangle',
          'width': 80,
          'height': 30,
          'font-size': '9px',
          'text-wrap': 'wrap',
          'text-max-width': '70px'
        }
      },
      // 血清节点
      {
        selector: 'node[type="serum"]',
        style: {
          'background-color': '#67C23A',
          'shape': 'hexagon',
          'width': 50,
          'height': 50,
          'font-size': '9px',
          'text-wrap': 'wrap',
          'text-max-width': '45px'
        }
      },
      // 危险等级节点
      {
        selector: 'node[type="danger"]',
        style: {
          'background-color': '#F56C6C',
          'shape': 'star',
          'width': 40,
          'height': 40,
          'font-size': '10px',
          'font-weight': 'bold'
        }
      },
      // 边样式
      {
        selector: 'edge',
        style: {
          'width': 1.5,
          'line-color': '#aaa',
          'target-arrow-color': '#aaa',
          'target-arrow-shape': 'triangle',
          'arrow-scale': 0.8,
          'curve-style': 'bezier',
          'label': 'data(label)',
          'font-size': '8px',
          'color': '#999',
          'text-rotation': 'autorotate',
          'text-margin-y': -8
        }
      },
      // 重度危险蛇种高亮
      {
        selector: 'node[danger="重度"]',
        style: {
          'border-width': 3,
          'border-color': '#F56C6C'
        }
      }
    ],
    layout: {
      name: 'cose',
      idealEdgeLength: 120,
      nodeOverlap: 20,
      refresh: 20,
      fit: true,
      padding: 50,
      randomize: false,
      componentSpacing: 100,
      nodeRepulsion: 8000,
      edgeElasticity: 100,
      nestingFactor: 1.2,
      gravity: 0.25,
      numIter: 500,
      animate: true,
      animationDuration: 500
    }
  })

  // 点击蛇种节点弹出详情
  cy.on('tap', 'node[type="snake"]', (evt) => {
    const node = evt.target.data()
    selectedSnake.value = node
    // 获取关联节点
    const connected = evt.target.connectedEdges().map(e => {
      const targetId = e.data('target')
      const targetNode = cy.getElementById(targetId).data()
      return { id: targetId, label: targetNode.label, type: targetNode.type }
    })
    relatedNodes.value = connected
    drawerVisible.value = true
  })

  // 悬停效果
  cy.on('mouseover', 'node', (evt) => {
    evt.target.style('cursor', 'pointer')
  })
}

// 重置视图
const resetView = () => {
  if (cy) {
    resetHighlight()
    cy.fit(undefined, 50)
    searchQuery.value = ''
  }
}

// 切换标签显示
const toggleLabels = () => {
  showLabels.value = !showLabels.value
  if (cy) {
    cy.style()
      .selector('node')
      .style('label', showLabels.value ? 'data(label)' : '')
      .selector('edge')
      .style('label', showLabels.value ? 'data(label)' : '')
      .update()
  }
}

// 聚焦到指定节点
const focusNode = (nodeId) => {
  if (cy) {
    const node = cy.getElementById(nodeId)
    if (node.length) {
      cy.animate({ center: { eles: node }, zoom: 1.5 }, { duration: 500 })
    }
  }
}

onMounted(() => {
  nextTick(() => {
    loadGraph()
  })
})

onUnmounted(() => {
  if (highlightTimer) clearTimeout(highlightTimer)
  if (cy) {
    cy.destroy()
  }
})
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
}

.toolbar h2 {
  margin: 0;
  font-size: var(--text-lg);
  color: var(--ink-900);
}

.controls {
  display: flex;
  gap: var(--space-3);
  align-items: center;
}

.graph-container {
  flex: 1;
  min-height: 0;
  position: relative;
  background: var(--surface-cool);
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

.legend-item:last-child {
  margin-bottom: 0;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.dot.snake { background: var(--info); }
.dot.family { background: var(--success); }
.dot.toxin { background: var(--danger); }
.dot.symptom { background: var(--warning); }
.dot.serum { background: var(--success); border-radius: 0; clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); }
.dot.danger { background: var(--danger); clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%); }

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

.snake-detail {
  padding: var(--space-2);
}

.related-nodes {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-2);
}

.related-tag {
  cursor: pointer;
}

.related-tag:hover {
  opacity: 0.8;
}
</style>

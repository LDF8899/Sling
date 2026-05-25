<template>
  <div class="rescue-dashboard" :class="{ 'dark-mode': darkMode }">
    <!-- 顶部统计 -->
    <div class="stats-bar">
      <div class="stat-card total" @click="currentFilter = ''">
        <div class="stat-num">{{ stats.total }}</div>
        <div class="stat-label">全部求助</div>
      </div>
      <div class="stat-card pending" @click="currentFilter = 'pending'">
        <div class="stat-num">{{ stats.pending }}</div>
        <div class="stat-label">待处理</div>
      </div>
      <div class="stat-card processing" @click="currentFilter = 'processing'">
        <div class="stat-num">{{ stats.processing }}</div>
        <div class="stat-label">处理中</div>
      </div>
      <div class="stat-card resolved" @click="currentFilter = 'resolved'">
        <div class="stat-num">{{ stats.resolved }}</div>
        <div class="stat-label">已解决</div>
      </div>
    </div>

    <!-- 主内容区 -->
    <div class="main-panels">
      <!-- 左侧列表 -->
      <div class="list-panel">
        <div class="list-header">
          <h3>求助列表</h3>
          <el-tag v-if="currentFilter" type="warning" closable @close="currentFilter = ''">
            {{ statusLabel(currentFilter) }}
          </el-tag>
          <span class="polling-status" :class="{ active: pollingActive }">
            {{ pollingActive ? '实时监控中' : '已暂停' }}
          </span>
        </div>

        <div class="list-body">
          <div v-if="loading" class="loading-wrap">
            <el-icon class="is-loading"><Loading /></el-icon>
            <span>加载中...</span>
          </div>
          <div v-else-if="helpList.length === 0" class="empty-wrap">
            <el-empty description="暂无求助记录" />
          </div>
          <div v-else class="help-items">
            <div
              v-for="item in helpList"
              :key="item.id"
              class="help-item"
              :class="{ active: selectedId === item.id }"
              @click="selectHelp(item)"
            >
              <div class="item-top">
                <el-tag :type="typeColor(item.type)" size="small">{{ typeLabel(item.type) }}</el-tag>
                <el-tag :type="statusColor(item.status)" size="small">{{ statusLabel(item.status) }}</el-tag>
              </div>
              <div class="item-loc">{{ item.location }}</div>
              <div class="item-desc">{{ item.description?.slice(0, 60) }}{{ item.description?.length > 60 ? '...' : '' }}</div>
              <div class="item-time">{{ formatTime(item.createTime) }}</div>
            </div>
          </div>
        </div>

        <!-- 分页 -->
        <div class="list-pagination" v-if="total > pageSize">
          <el-pagination
            v-model:current-page="currentPage"
            :page-size="pageSize"
            :total="total"
            layout="prev, pager, next"
            small
            @current-change="loadList"
          />
        </div>
      </div>

      <!-- 右侧详情/地图 -->
      <div class="detail-panel">
        <div class="detail-tabs">
          <button :class="{ active: rightTab === 'detail' }" @click="rightTab = 'detail'">求助详情</button>
          <button :class="{ active: rightTab === 'map' }" @click="rightTab = 'map'">地图分布</button>
        </div>

        <!-- 详情模式 -->
        <div class="detail-content" v-if="rightTab === 'detail'">
          <div v-if="!selected" class="empty-wrap">
            <el-empty description="请选择一条求助记录" />
          </div>
          <div v-else class="detail-card">
            <div class="detail-header">
              <h4>#{{ selected.id }} — {{ typeLabel(selected.type) }}</h4>
              <el-tag :type="statusColor(selected.status)" size="default">{{ statusLabel(selected.status) }}</el-tag>
            </div>

            <div class="detail-fields">
              <div class="field">
                <label>求助类型</label>
                <span>{{ typeLabel(selected.type) }}</span>
              </div>
              <div class="field">
                <label>位置</label>
                <span>{{ selected.location }}</span>
              </div>
              <div class="field">
                <label>联系电话</label>
                <span>{{ selected.phone }}</span>
              </div>
              <div class="field">
                <label>创建时间</label>
                <span>{{ formatTime(selected.createTime) }}</span>
              </div>
              <div class="field">
                <label>更新时间</label>
                <span>{{ formatTime(selected.updateTime) }}</span>
              </div>
              <div class="field" v-if="selected.alertTime">
                <label>报警时间</label>
                <span>{{ formatTime(selected.alertTime) }}</span>
              </div>
              <div class="field block">
                <label>描述</label>
                <div class="desc-text">{{ selected.description }}</div>
              </div>
            </div>

            <!-- 状态流转按钮 -->
            <div class="action-bar">
              <el-button
                v-if="selected.status === 'pending'"
                type="primary"
                @click="changeStatus('processing')"
                :loading="statusLoading"
              >
                接单处理
              </el-button>
              <el-button
                v-if="selected.status === 'processing'"
                type="success"
                @click="changeStatus('resolved')"
                :loading="statusLoading"
              >
                标记已解决
              </el-button>
              <el-button
                v-if="selected.status === 'resolved'"
                type="warning"
                @click="changeStatus('processing')"
                :loading="statusLoading"
              >
                重新打开
              </el-button>
            </div>
          </div>
        </div>

        <!-- 地图模式 -->
        <div class="map-content" v-if="rightTab === 'map'">
          <div id="rescueMap" class="rescue-map"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { ElMessage, ElNotification } from 'element-plus'
import { Loading } from '@element-plus/icons-vue'
import { emergencyApi } from '../services/api'
import { useUserStore } from '../store/user'

const darkMode = ref(document.body.classList.contains('dark-mode'))
const userStore = useUserStore()
const isAdmin = ref(userStore.isAdmin)

// 统计
const stats = reactive({ total: 0, pending: 0, processing: 0, resolved: 0 })

// 列表
const helpList = ref([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = 10
const total = ref(0)
const currentFilter = ref('')

// 选中项
const selected = ref(null)
const selectedId = ref(null)
const statusLoading = ref(false)

// 右侧Tab
const rightTab = ref('detail')

// 实时轮询
const pollingActive = ref(true)
let pollingTimer = null
let lastPollTime = Date.now()
let knownIds = new Set()
let notificationGranted = false

// 地图
let map = null
let AMap = null

// 格式化类型标签
const typeLabel = (type) => {
  const map = { snake_bite: '蛇咬伤', animal_harm: '动物伤害', other: '其他' }
  return map[type] || type || '未知'
}

// 格式化状态标签
const statusLabel = (status) => {
  const map = { pending: '待处理', processing: '处理中', resolved: '已解决' }
  return map[status] || status || '未知'
}

// 类型颜色
const typeColor = (type) => {
  const map = { snake_bite: 'danger', animal_harm: 'warning', other: 'info' }
  return map[type] || 'info'
}

// 状态颜色
const statusColor = (status) => {
  const map = { pending: 'danger', processing: 'warning', resolved: 'success' }
  return map[status] || 'info'
}

// 格式化时间
const formatTime = (t) => {
  if (!t) return '--'
  return new Date(t).toLocaleString('zh-CN')
}

// 加载统计
const loadStats = async () => {
  try {
    const res = await emergencyApi.getRescueStats()
    if (res.data.code === 200) {
      Object.assign(stats, res.data.data)
    }
  } catch (e) {
    console.error('Failed to load stats', e)
  }
}

// 加载列表
const loadList = async () => {
  loading.value = true
  try {
    const params = { page: currentPage.value, size: pageSize }
    if (currentFilter.value) params.status = currentFilter.value
    const res = await emergencyApi.getRescueList(params)
    if (res.data.code === 200) {
      helpList.value = res.data.data.records || []
      total.value = res.data.data.total || 0
      // Track known IDs for polling
      helpList.value.forEach(item => knownIds.add(item.id))
    }
  } catch (e) {
    console.error('Failed to load list', e)
  } finally {
    loading.value = false
  }
}

// 选中求助
const selectHelp = async (item) => {
  selected.value = item
  selectedId.value = item.id
  rightTab.value = 'detail'
  // 加载完整详情
  try {
    const res = await emergencyApi.getRescueDetail(item.id)
    if (res.data.code === 200) {
      selected.value = res.data.data
    }
  } catch (e) {
    console.error('Failed to load detail', e)
  }
}

// 状态流转
const changeStatus = async (newStatus) => {
  if (!selected.value) return
  statusLoading.value = true
  try {
    const res = await emergencyApi.updateRescueStatus(selected.value.id, newStatus)
    if (res.data.code === 200) {
      ElMessage.success(`状态已更新为: ${statusLabel(newStatus)}`)
      selected.value.status = newStatus
      await loadList()
      await loadStats()
    } else {
      ElMessage.error(res.data.message || '更新失败')
    }
  } catch (e) {
    ElMessage.error('状态更新失败')
  } finally {
    statusLoading.value = false
  }
}

// 实时轮询
const pollLatest = async () => {
  if (!pollingActive.value) return
  try {
    const res = await emergencyApi.getRescueLatest(lastPollTime)
    lastPollTime = Date.now()
    if (res.data.code === 200) {
      const newItems = (res.data.data || []).filter(item => !knownIds.has(item.id))
      if (newItems.length > 0) {
        newItems.forEach(item => knownIds.add(item.id))
        // 浏览器通知
        if (notificationGranted) {
          newItems.forEach(item => {
            new Notification('新求助到达', {
              body: `${typeLabel(item.type)} — ${item.location}`,
              icon: '/favicon.ico',
              tag: `help-${item.id}`
            })
          })
        }
        // 插入到列表顶部
        helpList.value = [...newItems, ...helpList.value]
        total.value += newItems.length
        stats.total += newItems.length
        stats.pending += newItems.filter(i => i.status === 'pending').length
        ElMessage({
          message: `收到 ${newItems.length} 条新求助`,
          type: 'warning',
          duration: 5000
        })
      }
    }
  } catch (e) {
    // silent fail for polling
  }
}

// 请求通知权限
const requestNotification = async () => {
  if (!('Notification' in window)) return
  if (Notification.permission === 'granted') {
    notificationGranted = true
  } else if (Notification.permission !== 'denied') {
    const perm = await Notification.requestPermission()
    notificationGranted = perm === 'granted'
  }
}

// 初始化地图
const initMap = async () => {
  await nextTick()
  try {
    AMap = await loadAMapSDK()
    const mapEl = document.getElementById('rescueMap')
    if (!mapEl) return

    map = new AMap.Map('rescueMap', {
      center: [116.39748, 39.90882],
      zoom: 5
    })

    AMap.plugin(['AMap.Scale'], () => {
      map.addControl(new AMap.Scale())
    })
  } catch (e) {
    console.error('Map init failed', e)
  }
}

// 加载高德地图SDK
const loadAMapSDK = () => {
  return new Promise((resolve, reject) => {
    if (window.AMap) {
      resolve(window.AMap)
      return
    }
    const key = '5b3ed07d3b4e322b48d421a9e84ebd9a'
    const script = document.createElement('script')
    script.src = `https://webapi.amap.com/maps?v=2.0&key=${key}`
    script.onload = () => resolve(window.AMap)
    script.onerror = reject
    document.head.appendChild(script)
  })
}

// 更新地图标记
const updateMapMarkers = () => {
  if (!map || !AMap) return
  map.clearMap()
  const locItems = helpList.value.filter(i => {
    const loc = i.location || ''
    return loc.includes('纬度') && loc.includes('经度')
  })

  if (locItems.length === 0) return

  const markers = locItems.map(item => {
    const latMatch = item.location.match(/纬度[:\s]*([\d.]+)/)
    const lonMatch = item.location.match(/经度[:\s]*([\d.]+)/)
    if (!latMatch || !lonMatch) return null
    const lat = parseFloat(latMatch[1])
    const lon = parseFloat(lonMatch[1])
    const marker = new AMap.Marker({
      position: [lon, lat],
      title: `#${item.id} ${typeLabel(item.type)}`,
      label: {
        content: `${typeLabel(item.type)}`,
        direction: 'top'
      }
    })
    marker.on('click', () => selectHelp(item))
    return marker
  }).filter(Boolean)

  map.add(markers)
  map.setFitView(null, false, [60, 60, 60, 60])
}

// 监听Tab切换到地图
watch(rightTab, (tab) => {
  if (tab === 'map') {
    nextTick(() => {
      if (!map) {
        initMap().then(() => updateMapMarkers())
      } else {
        updateMapMarkers()
      }
    })
  }
})

// 监听筛选条件变化
watch(currentFilter, () => {
  currentPage.value = 1
  loadList()
})

onMounted(async () => {
  await requestNotification()
  await Promise.all([loadStats(), loadList()])
  pollingTimer = setInterval(pollLatest, 5000)
})

onUnmounted(() => {
  if (pollingTimer) clearInterval(pollingTimer)
  if (map) map.destroy()
})
</script>

<style scoped>
.rescue-dashboard {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--surface-cool);
  padding: var(--space-4);
  box-sizing: border-box;
}

/* 统计栏 */
.stats-bar {
  display: flex;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
  flex-shrink: 0;
}

.stat-card {
  flex: 1;
  padding: 14px var(--space-5);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
  text-align: center;
  color: var(--surface-white);
}
.stat-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
.stat-card.total { background: linear-gradient(135deg, #667eea, #764ba2); }
.stat-card.pending { background: linear-gradient(135deg, #f093fb, #f5576c); }
.stat-card.processing { background: linear-gradient(135deg, #4facfe, #00f2fe); }
.stat-card.resolved { background: linear-gradient(135deg, #43e97b, #38f9d7); }

.stat-num { font-size: 28px; font-weight: var(--weight-bold); }
.stat-label { font-size: 13px; opacity: 0.9; margin-top: 2px; }

/* 主面板 */
.main-panels {
  display: flex;
  gap: var(--space-3);
  flex: 1;
  min-height: 0;
}

/* 左侧列表 */
.list-panel {
  width: 380px;
  min-width: 340px;
  background: var(--surface-white);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sm);
}

.list-header {
  padding: 14px var(--space-4);
  border-bottom: 1px solid var(--ink-100);
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}
.list-header h3 { margin: 0; font-size: var(--text-base); }
.polling-status { font-size: var(--text-xs); color: var(--ink-500); margin-left: auto; }
.polling-status.active { color: var(--success); }

.list-body {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
}

.loading-wrap, .empty-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--ink-500);
}

.help-item {
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--ink-100);
  cursor: pointer;
  transition: background var(--transition-fast);
}
.help-item:hover { background: var(--surface-cool); }
.help-item.active { background: var(--info-bg); border-left: 3px solid var(--info); }

.item-top { display: flex; gap: 6px; margin-bottom: 6px; }
.item-loc { font-size: 13px; color: var(--ink-700); margin-bottom: var(--space-1); }
.item-desc { font-size: var(--text-xs); color: var(--ink-500); margin-bottom: var(--space-1); }
.item-time { font-size: 11px; color: var(--ink-400); }

.list-pagination {
  padding: 10px;
  display: flex;
  justify-content: center;
  border-top: 1px solid var(--ink-100);
}

/* 右侧面板 */
.detail-panel {
  flex: 1;
  background: var(--surface-white);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sm);
}

.detail-tabs {
  display: flex;
  border-bottom: 1px solid var(--ink-100);
  flex-shrink: 0;
}
.detail-tabs button {
  flex: 1;
  padding: var(--space-3);
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: var(--text-sm);
  color: var(--ink-500);
  border-bottom: 2px solid transparent;
  transition: all var(--transition-fast);
}
.detail-tabs button.active {
  color: var(--info);
  border-bottom-color: var(--info);
  font-weight: var(--weight-semibold);
}
.detail-tabs button:hover { color: var(--info); }

.detail-content, .map-content {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
}

.detail-card { padding: var(--space-5); }

.detail-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-5);
}
.detail-header h4 { margin: 0; font-size: var(--text-lg); }

.detail-fields { margin-bottom: var(--space-6); }

.field {
  display: flex;
  align-items: flex-start;
  padding: 10px 0;
  border-bottom: 1px solid var(--ink-100);
}
.field.block { flex-direction: column; }
.field label { width: 80px; color: var(--ink-500); font-size: 13px; flex-shrink: 0; }
.field span { color: var(--ink-900); font-size: var(--text-sm); word-break: break-all; }
.field.block label { margin-bottom: 6px; }

.desc-text {
  color: var(--ink-900);
  font-size: var(--text-sm);
  line-height: 1.6;
  white-space: pre-wrap;
}

.action-bar {
  display: flex;
  gap: var(--space-3);
  padding-top: var(--space-4);
  border-top: 1px solid var(--ink-100);
}

/* 地图 */
.rescue-map {
  width: 100%;
  height: 100%;
  min-height: 400px;
}
</style>

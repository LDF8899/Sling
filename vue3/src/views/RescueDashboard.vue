<template>
  <div class="rescue-dashboard" :class="{ 'dark-mode': darkMode }">
    <!-- 顶部操作栏 -->
    <div class="top-bar">
      <el-button :icon="ArrowLeft" circle @click="$router.push('/dashboard')" class="back-btn" />
      <h2>救助调度中心</h2>
      <div class="top-tabs">
        <button :class="{ active: mainTab === 'dispatch' }" @click="mainTab = 'dispatch'">求助调度</button>
        <button :class="{ active: mainTab === 'warning' }" @click="mainTab = 'warning'">预警管理</button>
      </div>
    </div>

    <!-- ===== 求助调度 Tab ===== -->
    <template v-if="mainTab === 'dispatch'">

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

    </template><!-- /dispatch tab -->

    <!-- ===== 预警管理 Tab ===== -->
    <template v-if="mainTab === 'warning'">
    <div class="warning-panels">
      <!-- 左侧：区域树 -->
      <div class="region-tree-panel">
        <div class="region-header">
          <h3>区域管理</h3>
          <el-button type="primary" size="small" @click="showAddRegionDialog">+ 新建</el-button>
        </div>
        <div class="region-tree-body">
          <div v-if="regionTree.length === 0" class="empty-wrap">
            <el-empty description="暂无区域，请先创建大区" :image-size="60" />
          </div>
          <div v-else class="tree-list">
            <div v-for="region in regionTree" :key="region.id" class="tree-group">
              <div class="tree-node level-1" @click="selectRegion(region)" :class="{ active: selectedRegionId === region.id }">
                <span class="tree-arrow" @click.stop="toggleRegionExpand(region.id)">
                  {{ expandedRegions.has(region.id) ? '▼' : '▶' }}
                </span>
                <span class="tree-name">{{ region.name }}</span>
                <el-tag size="small" type="info">大区</el-tag>
              </div>
              <div v-if="expandedRegions.has(region.id) && region.children" class="tree-children">
                <div v-for="province in region.children" :key="province.id" class="tree-group">
                  <div class="tree-node level-2" @click="selectRegion(province)" :class="{ active: selectedRegionId === province.id }">
                    <span class="tree-arrow" @click.stop="toggleRegionExpand(province.id)">
                      {{ expandedRegions.has(province.id) ? '▼' : '▶' }}
                    </span>
                    <span class="tree-name">{{ province.name }}</span>
                    <el-tag size="small" type="warning">省/市</el-tag>
                  </div>
                  <div v-if="expandedRegions.has(province.id) && province.children" class="tree-children">
                    <div v-for="area in province.children" :key="area.id" class="tree-node level-3" @click="selectRegion(area)" :class="{ active: selectedRegionId === area.id }">
                      <span class="tree-name">{{ area.name }}</span>
                      <el-tag size="small" type="danger">区域</el-tag>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧：地图 + 操作 -->
      <div class="warning-main-panel">
        <div class="warning-tabs">
          <button :class="{ active: warningTab === 'map' }" @click="warningTab = 'map'">预警地图</button>
          <button :class="{ active: warningTab === 'areas' }" @click="warningTab = 'areas'">预警区域</button>
          <button :class="{ active: warningTab === 'serum' }" @click="warningTab = 'serum'">血清库存</button>
        </div>

        <!-- 预警地图 -->
        <div v-if="warningTab === 'map'" class="warning-content">
          <div v-if="!selectedRegionId" class="empty-wrap">
            <el-empty description="请先在左侧选择一个具体区域" />
          </div>
          <div v-else>
            <div class="map-toolbar">
              <el-button type="primary" size="small" @click="startDrawPolygon" :disabled="!selectedRegionId">
                绘制预警区域
              </el-button>
              <el-button size="small" @click="clearDraw" v-if="isDrawing">取消绘制</el-button>
              <span class="map-hint" v-if="isDrawing">点击地图绘制多边形，双击完成</span>
            </div>
            <div id="warningMap" class="warning-map"></div>
          </div>
        </div>

        <!-- 预警区域列表 -->
        <div v-if="warningTab === 'areas'" class="warning-content">
          <div class="area-toolbar">
            <span>当前区域：{{ selectedRegionName || '未选择' }}</span>
          </div>
          <el-table :data="warningAreas" stripe style="width: 100%" v-loading="areasLoading">
            <el-table-column prop="areaName" label="区域名称" />
            <el-table-column prop="warningLevel" label="预警等级" width="100">
              <template #default="{ row }">
                <el-tag :type="levelType(row.warningLevel)">{{ levelText(row.warningLevel) }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="creatorRole" label="创建者" width="100">
              <template #default="{ row }">
                {{ row.creatorRole === 'forester' ? '护林员' : row.creatorRole === 'medic' ? '医护' : '管理员' }}
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="180">
              <template #default="{ row }">{{ formatTime(row.createTime) }}</template>
            </el-table-column>
          </el-table>
        </div>

        <!-- 血清库存 -->
        <div v-if="warningTab === 'serum'" class="warning-content">
          <div class="area-toolbar">
            <span>当前区域：{{ selectedRegionName || '未选择' }}</span>
            <el-button type="primary" size="small" @click="showAddSerumDialog" :disabled="!selectedRegionId">+ 新增血清</el-button>
          </div>
          <el-table :data="serumList" stripe style="width: 100%" v-loading="serumLoading">
            <el-table-column prop="hospital_name" label="医院" />
            <el-table-column prop="snake_name" label="蛇种" width="120" />
            <el-table-column prop="serum_name" label="血清名称" />
            <el-table-column prop="stock_count" label="库存" width="80" />
            <el-table-column prop="expiry_date" label="有效期" width="120" />
          </el-table>
        </div>
      </div>
    </div>
    </template><!-- /warning tab -->

    <!-- 预警区域创建对话框 -->
    <el-dialog v-model="areaDialogVisible" title="创建预警区域" width="500px" :close-on-click-modal="false">
      <el-form :model="areaForm" label-width="100px">
        <el-form-item label="区域名称" required>
          <el-input v-model="areaForm.areaName" placeholder="例如：杭州西部山区高风险区" />
        </el-form-item>
        <el-form-item label="预警等级">
          <el-select v-model="areaForm.warningLevel" style="width: 100%">
            <el-option label="低风险" :value="1" />
            <el-option label="中风险" :value="2" />
            <el-option label="高风险" :value="3" />
            <el-option label="极高风险" :value="4" />
          </el-select>
        </el-form-item>
        <el-form-item label="蛇种">
          <el-input v-model="areaForm.snakeSpecies" placeholder="例如：五步蛇、银环蛇" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="areaForm.description" type="textarea" :rows="3" placeholder="预警区域描述..." />
        </el-form-item>
        <el-form-item label="边界坐标">
          <el-input v-model="areaForm.boundaryCoordinates" type="textarea" :rows="2" disabled />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="areaDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitArea" :loading="areaDialogLoading">创建</el-button>
      </template>
    </el-dialog>

    <!-- 新建区域对话框 -->
    <el-dialog v-model="regionDialogVisible" title="新建区域" width="500px" :close-on-click-modal="false">
      <el-form :model="regionForm" label-width="100px">
        <el-form-item label="区域名称" required>
          <el-input v-model="regionForm.name" placeholder="例如：华东地区、浙江、杭州西部山区" />
        </el-form-item>
        <el-form-item label="区域层级">
          <el-select v-model="regionForm.level" style="width: 100%">
            <el-option label="大区" :value="1" />
            <el-option label="省/市" :value="2" />
            <el-option label="具体区域" :value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="父区域ID">
          <el-input-number v-model="regionForm.parentId" :min="0" placeholder="留空表示顶级区域" style="width: 100%" />
        </el-form-item>
        <el-form-item label="中心经度">
          <el-input-number v-model="regionForm.centerLng" :precision="6" :step="0.1" style="width: 100%" />
        </el-form-item>
        <el-form-item label="中心纬度">
          <el-input-number v-model="regionForm.centerLat" :precision="6" :step="0.1" style="width: 100%" />
        </el-form-item>
        <el-form-item label="缩放级别">
          <el-input-number v-model="regionForm.zoomLevel" :min="1" :max="20" style="width: 100%" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="regionDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitRegion" :loading="regionDialogLoading">创建</el-button>
      </template>
    </el-dialog>

    <!-- 血清信息对话框 -->
    <el-dialog v-model="serumDialogVisible" title="新增血清信息" width="500px" :close-on-click-modal="false">
      <el-form :model="serumForm" label-width="100px">
        <el-form-item label="医院名称">
          <el-input v-model="serumForm.hospitalName" placeholder="例如：杭州市第一人民医院" />
        </el-form-item>
        <el-form-item label="蛇种">
          <el-input v-model="serumForm.snakeName" placeholder="例如：五步蛇" />
        </el-form-item>
        <el-form-item label="血清名称" required>
          <el-input v-model="serumForm.serumName" placeholder="例如：抗五步蛇毒血清" />
        </el-form-item>
        <el-form-item label="库存数量">
          <el-input-number v-model="serumForm.stockCount" :min="0" style="width: 100%" />
        </el-form-item>
        <el-form-item label="有效期">
          <el-date-picker v-model="serumForm.expiryDate" type="date" placeholder="选择日期" style="width: 100%" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="serumDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitSerum" :loading="serumDialogLoading">添加</el-button>
      </template>
    </el-dialog>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElNotification, ElMessageBox } from 'element-plus'
import { Loading, ArrowLeft } from '@element-plus/icons-vue'
import AMapLoader from '@amap/amap-jsapi-loader'

const router = useRouter()
import { emergencyApi, rescueRegionApi, rescueWarningApi, rescueSerumApi } from '../services/api'
import { useUserStore } from '../store/user'

// 主Tab
const mainTab = ref('dispatch')

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

// ===== 预警管理状态 =====
const warningTab = ref('map')
const regionTree = ref([])
const expandedRegions = ref(new Set())
const selectedRegionId = ref(null)
const selectedRegionName = ref('')
const warningAreas = ref([])
const areasLoading = ref(false)
const serumList = ref([])
const serumLoading = ref(false)
const isDrawing = ref(false)
let warningMap = null
let warningAMap = null
let mouseTool = null

// 对话框状态
const areaDialogVisible = ref(false)
const areaDialogLoading = ref(false)
const areaForm = reactive({
  areaName: '',
  warningLevel: 1,
  snakeSpecies: '',
  description: '',
  boundaryCoordinates: ''
})

const regionDialogVisible = ref(false)
const regionDialogLoading = ref(false)
const regionForm = reactive({
  name: '',
  parentId: null,
  level: 1,
  centerLng: null,
  centerLat: null,
  zoomLevel: 10
})

const serumDialogVisible = ref(false)
const serumDialogLoading = ref(false)
const serumForm = reactive({
  hospitalName: '',
  snakeName: '',
  serumName: '',
  stockCount: 0,
  expiryDate: ''
})

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
    if (!mapEl) {
      console.warn('Map container not found')
      return
    }

    // 确保容器有尺寸
    if (mapEl.offsetWidth === 0 || mapEl.offsetHeight === 0) {
      console.warn('Map container has no size, retrying...')
      setTimeout(() => initMap(), 200)
      return
    }

    // 销毁旧地图实例
    if (map) {
      map.destroy()
      map = null
    }

    map = new AMap.Map('rescueMap', {
      center: [116.39748, 39.90882],
      zoom: 5,
      resizeEnable: true,
      viewMode: '2D'
    })

    map.on('complete', () => {
      console.log('Map loaded successfully')
    })

    AMap.plugin(['AMap.Scale'], () => {
      if (map) {
        map.addControl(new AMap.Scale())
      }
    })
  } catch (e) {
    console.error('Map init failed:', e)
    ElMessage.warning('地图加载失败，请检查网络连接')
  }
}

// 加载高德地图SDK（使用官方 Loader）
const loadAMapSDK = async () => {
  if (window.AMap && window.AMap.Map) {
    return window.AMap
  }

  try {
    const AMap = await AMapLoader.load({
      key: '5b3ed07d3b4e322b48d421a9e84ebd9a',
      version: '2.0',
      plugins: ['AMap.Scale', 'AMap.MouseTool']
    })
    return AMap
  } catch (e) {
    console.error('Failed to load AMap SDK:', e)
    throw e
  }
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

// ===== 预警管理方法 =====

// 加载区域树
const loadRegionTree = async () => {
  try {
    const res = await rescueRegionApi.getTree()
    if (res.data.code === 200) {
      regionTree.value = res.data.data || []
    }
  } catch (e) {
    console.error('Failed to load region tree', e)
  }
}

// 展开/折叠区域
const toggleRegionExpand = (id) => {
  if (expandedRegions.value.has(id)) {
    expandedRegions.value.delete(id)
  } else {
    expandedRegions.value.add(id)
  }
}

// 选中区域
const selectRegion = async (region) => {
  selectedRegionId.value = region.id
  selectedRegionName.value = region.name

  // 如果是具体区域（level 3），加载预警区域和血清
  if (region.level === 3) {
    await Promise.all([loadWarningAreas(region.id), loadSerumList(region.id)])
    // 如果在地图tab，初始化地图
    if (warningTab.value === 'map') {
      // 延迟初始化，确保容器已渲染
      setTimeout(() => initWarningMap(region), 100)
    }
  }
}

// 加载预警区域
const loadWarningAreas = async (regionId) => {
  areasLoading.value = true
  try {
    const res = await rescueWarningApi.getAreas({ regionId })
    if (res.data.code === 200) {
      warningAreas.value = res.data.data?.list || []
    }
  } catch (e) {
    console.error('Failed to load warning areas', e)
  } finally {
    areasLoading.value = false
  }
}

// 加载血清库存
const loadSerumList = async (regionId) => {
  serumLoading.value = true
  try {
    const res = await rescueSerumApi.getList(regionId)
    if (res.data.code === 200) {
      serumList.value = res.data.data || []
    }
  } catch (e) {
    console.error('Failed to load serum list', e)
  } finally {
    serumLoading.value = false
  }
}

// 预警等级
const levelType = (level) => {
  const map = { 1: 'success', 2: 'warning', 3: 'danger', 4: 'danger' }
  return map[level] || 'info'
}
const levelText = (level) => {
  const map = { 1: '低风险', 2: '中风险', 3: '高风险', 4: '极高' }
  return map[level] || '未知'
}

// 初始化预警地图
const initWarningMap = async (region) => {
  await nextTick()
  try {
    if (!warningAMap) {
      warningAMap = await loadAMapSDK()
    }
    const mapEl = document.getElementById('warningMap')
    if (!mapEl) {
      console.warn('Warning map container not found')
      return
    }

    // 确保容器有尺寸
    if (mapEl.offsetWidth === 0 || mapEl.offsetHeight === 0) {
      console.warn('Warning map container has no size, retrying...')
      setTimeout(() => initWarningMap(region), 200)
      return
    }

    // 销毁旧地图实例
    if (warningMap) {
      warningMap.destroy()
      warningMap = null
    }

    const center = region.centerLng && region.centerLat
      ? [parseFloat(region.centerLng), parseFloat(region.centerLat)]
      : [116.39748, 39.90882]
    const zoom = region.zoomLevel || 12

    warningMap = new warningAMap.Map('warningMap', {
      center,
      zoom,
      mapStyle: 'amap://styles/normal',
      resizeEnable: true,
      viewMode: '2D'
    })

    warningMap.on('complete', () => {
      console.log('Warning map loaded successfully')
      // 绘制已有的预警区域
      drawExistingAreas()
    })

    warningAMap.plugin(['AMap.Scale', 'AMap.MouseTool'], () => {
      if (warningMap) {
        warningMap.addControl(new warningAMap.Scale())
        mouseTool = new warningAMap.MouseTool(warningMap)
      }
    })
  } catch (e) {
    console.error('Warning map init failed:', e)
    ElMessage.warning('预警地图加载失败，请检查网络连接')
  }
}

// 绘制已有的预警区域多边形
const drawExistingAreas = () => {
  if (!warningMap || !warningAMap) return
  warningMap.clearMap()

  warningAreas.value.forEach(area => {
    if (!area.boundaryCoordinates) return
    try {
      const geo = JSON.parse(area.boundaryCoordinates)
      if (geo.type === 'Polygon' && geo.coordinates?.[0]) {
        const path = geo.coordinates[0].map(c => new warningAMap.LngLat(c[0], c[1]))
        const colors = { 1: '#10b981', 2: '#f59e0b', 3: '#ef4444', 4: '#991b1b' }
        const color = colors[area.warningLevel] || '#6b7280'

        const polygon = new warningAMap.Polygon({
          path,
          fillColor: color,
          fillOpacity: 0.25,
          strokeColor: color,
          strokeWeight: 2
        })
        warningMap.add(polygon)
      }
    } catch (e) {
      console.warn('Failed to parse area boundary', area.areaName)
    }
  })

  warningMap.setFitView(null, false, [40, 40, 40, 40])
}

// 开始绘制多边形
const startDrawPolygon = () => {
  if (!mouseTool || !warningAMap) return
  isDrawing.value = true

  mouseTool.polygon({
    fillColor: '#ef4444',
    fillOpacity: 0.25,
    strokeColor: '#ef4444',
    strokeWeight: 2
  })

  mouseTool.on('draw', (event) => {
    isDrawing.value = false
    const polygon = event.obj
    const path = polygon.getPath()
    const coordinates = path.map(p => [p.lng, p.lat])
    coordinates.push(coordinates[0]) // 闭合

    const geoJson = JSON.stringify({
      type: 'Polygon',
      coordinates: [coordinates]
    })

    // 弹出创建预警区域对话框
    openCreateAreaDialog(geoJson)
  })
}

// 取消绘制
const clearDraw = () => {
  isDrawing.value = false
  if (mouseTool) mouseTool.close(true)
}

// 打开创建预警区域对话框
const openCreateAreaDialog = (geoJson) => {
  areaForm.boundaryCoordinates = geoJson
  areaForm.areaName = ''
  areaForm.warningLevel = 1
  areaForm.snakeSpecies = ''
  areaForm.description = ''
  areaDialogVisible.value = true
}

// 提交预警区域
const submitArea = async () => {
  if (!areaForm.areaName.trim()) {
    ElMessage.warning('请输入预警区域名称')
    return
  }

  areaDialogLoading.value = true
  try {
    // 确定当前用户角色
    let creatorRole = 'admin'
    if (userStore.isRescuer) creatorRole = 'rescuer'
    else if (userStore.isAdmin) creatorRole = 'admin'

    const res = await rescueWarningApi.createArea({
      areaName: areaForm.areaName,
      regionId: selectedRegionId.value,
      warningLevel: areaForm.warningLevel,
      snakeSpecies: areaForm.snakeSpecies,
      description: areaForm.description,
      boundaryCoordinates: areaForm.boundaryCoordinates,
      creatorRole: creatorRole,
      secondaryPassword: 'admin123' // 临时硬编码，后续接入二级密码
    })

    if (res.data.code === 200) {
      ElMessage.success('预警区域创建成功，已同步至用户端')
      areaDialogVisible.value = false
      // 重新加载预警区域列表
      await loadWarningAreas(selectedRegionId.value)
      // 重新绘制地图上的区域
      drawExistingAreas()
    } else {
      ElMessage.error(res.data.message || '创建失败')
    }
  } catch (e) {
    ElMessage.error('创建失败：' + (e.message || '网络错误'))
  } finally {
    areaDialogLoading.value = false
  }
}

// 显示新建区域对话框
const showAddRegionDialog = () => {
  // 根据当前选中区域确定新区域的层级和父ID
  if (selectedRegionId.value) {
    const parent = findRegionById(selectedRegionId.value)
    if (parent) {
      regionForm.parentId = parent.id
      regionForm.level = parent.level + 1
    }
  } else {
    regionForm.parentId = null
    regionForm.level = 1
  }
  regionForm.name = ''
  regionForm.centerLng = null
  regionForm.centerLat = null
  regionForm.zoomLevel = 10
  regionDialogVisible.value = true
}

// 提交新区域
const submitRegion = async () => {
  if (!regionForm.name.trim()) {
    ElMessage.warning('请输入区域名称')
    return
  }

  regionDialogLoading.value = true
  try {
    const res = await rescueRegionApi.create({
      name: regionForm.name,
      parentId: regionForm.parentId,
      level: regionForm.level,
      centerLng: regionForm.centerLng,
      centerLat: regionForm.centerLat,
      zoomLevel: regionForm.zoomLevel
    })

    if (res.data.code === 200) {
      ElMessage.success('区域创建成功')
      regionDialogVisible.value = false
      // 重新加载区域树
      await loadRegionTree()
    } else {
      ElMessage.error(res.data.message || '创建失败')
    }
  } catch (e) {
    ElMessage.error('创建失败：' + (e.message || '网络错误'))
  } finally {
    regionDialogLoading.value = false
  }
}

// 显示新增血清对话框
const showAddSerumDialog = () => {
  serumForm.hospitalName = ''
  serumForm.snakeName = ''
  serumForm.serumName = ''
  serumForm.stockCount = 0
  serumForm.expiryDate = ''
  serumDialogVisible.value = true
}

// 提交血清信息
const submitSerum = async () => {
  if (!serumForm.serumName.trim()) {
    ElMessage.warning('请输入血清名称')
    return
  }

  serumDialogLoading.value = true
  try {
    const res = await rescueSerumApi.create({
      regionId: selectedRegionId.value,
      hospitalName: serumForm.hospitalName,
      snakeName: serumForm.snakeName,
      serumName: serumForm.serumName,
      stockCount: serumForm.stockCount,
      expiryDate: serumForm.expiryDate
    })

    if (res.data.code === 200) {
      ElMessage.success('血清信息添加成功')
      serumDialogVisible.value = false
      // 重新加载血清列表
      await loadSerumList(selectedRegionId.value)
    } else {
      ElMessage.error(res.data.message || '添加失败')
    }
  } catch (e) {
    ElMessage.error('添加失败：' + (e.message || '网络错误'))
  } finally {
    serumDialogLoading.value = false
  }
}

// 监听预警Tab切换到地图
watch(warningTab, (tab) => {
  if (tab === 'map' && selectedRegionId.value) {
    const region = findRegionById(selectedRegionId.value)
    if (region) {
      // 延迟初始化，确保容器已渲染
      setTimeout(() => initWarningMap(region), 100)
    }
  }
})

// 在区域树中查找区域
const findRegionById = (id) => {
  for (const r of regionTree.value) {
    if (r.id === id) return r
    if (r.children) {
      for (const c of r.children) {
        if (c.id === id) return c
        if (c.children) {
          const found = c.children.find(a => a.id === id)
          if (found) return found
        }
      }
    }
  }
  return null
}

// 监听Tab切换到地图
watch(rightTab, (tab) => {
  if (tab === 'map') {
    // 延迟初始化，确保容器已渲染
    setTimeout(() => {
      if (!map) {
        initMap().then(() => updateMapMarkers())
      } else {
        map.resize()
        updateMapMarkers()
      }
    }, 100)
  }
})

// 监听筛选条件变化
watch(currentFilter, () => {
  currentPage.value = 1
  loadList()
})

onMounted(async () => {
  await requestNotification()
  await Promise.all([loadStats(), loadList(), loadRegionTree()])
  pollingTimer = setInterval(pollLatest, 5000)
})

onUnmounted(() => {
  if (pollingTimer) clearInterval(pollingTimer)
  if (map) map.destroy()
})
</script>

<style scoped>
.rescue-dashboard {
  width: calc(100% + var(--space-6) * 2);
  height: calc(100vh - 72px);
  margin: calc(-1 * var(--space-6)) calc(-1 * var(--space-6)) 0;
  display: flex;
  flex-direction: column;
  background: var(--surface-cool);
  padding: var(--space-4);
  box-sizing: border-box;
}

.top-bar {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.top-bar h2 {
  margin: 0;
  font-size: var(--text-lg);
  font-weight: var(--weight-semibold);
  color: var(--ink-900);
}

.back-btn {
  flex-shrink: 0;
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
  position: relative;
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
  position: relative;
}

/* ===== 顶部Tab ===== */
.top-tabs {
  display: flex;
  margin-left: var(--space-5);
  gap: 2px;
  background: var(--ink-100);
  border-radius: var(--radius-md);
  padding: 2px;
}
.top-tabs button {
  padding: 6px 20px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: var(--text-sm);
  color: var(--ink-600);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}
.top-tabs button.active {
  background: var(--surface-white);
  color: var(--info);
  font-weight: var(--weight-semibold);
  box-shadow: var(--shadow-sm);
}

/* ===== 预警管理面板 ===== */
.warning-panels {
  display: flex;
  gap: var(--space-3);
  flex: 1;
  min-height: 0;
}

/* 区域树 */
.region-tree-panel {
  width: 280px;
  min-width: 240px;
  background: var(--surface-white);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sm);
}
.region-header {
  padding: 14px var(--space-4);
  border-bottom: 1px solid var(--ink-100);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}
.region-header h3 { margin: 0; font-size: var(--text-base); }
.region-tree-body {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  padding: var(--space-2);
}
.tree-list { font-size: var(--text-sm); }
.tree-group { margin-bottom: 2px; }
.tree-node {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 8px 10px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background var(--transition-fast);
}
.tree-node:hover { background: var(--surface-cool); }
.tree-node.active { background: var(--info-bg); }
.tree-arrow {
  width: 16px;
  text-align: center;
  font-size: 10px;
  color: var(--ink-500);
  cursor: pointer;
}
.tree-name { flex: 1; }
.tree-children { padding-left: 20px; }

/* 预警主面板 */
.warning-main-panel {
  flex: 1;
  background: var(--surface-white);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sm);
}
.warning-tabs {
  display: flex;
  border-bottom: 1px solid var(--ink-100);
  flex-shrink: 0;
}
.warning-tabs button {
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
.warning-tabs button.active {
  color: var(--info);
  border-bottom-color: var(--info);
  font-weight: var(--weight-semibold);
}
.warning-tabs button:hover { color: var(--info); }

.warning-content {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  padding: var(--space-4);
}

/* 地图工具栏 */
.map-toolbar {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}
.map-hint {
  font-size: var(--text-xs);
  color: var(--ink-500);
}

.warning-map {
  width: 100%;
  height: calc(100% - 50px);
  min-height: 400px;
  border-radius: var(--radius-md);
  position: relative;
}

.area-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-3);
  font-size: var(--text-sm);
  color: var(--ink-700);
}
</style>

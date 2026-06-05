<template>
  <div class="snake-warning-system">
    <!-- 顶部导航栏 -->
    <header class="main-header">
      <div class="header-container">
        <div class="logo">
          <el-button :icon="ArrowLeft" circle @click="$router.push('/dashboard')" class="back-btn" />
          <h1>蛇类风险预警系统 v2.0</h1>
        </div>
        <div class="header-actions">
          <div class="network-status" :class="{ online: isOnline }">
            <i class="el-icon-signal"></i>
            {{ isOnline ? '在线' : '离线' }}
          </div>
          <el-button type="primary" @click="refreshAllData" icon="Refresh">
            刷新数据
          </el-button>
        </div>
      </div>
    </header>

    <!-- 核心内容区 -->
    <main class="content-container">
      <!-- 左侧筛选面板 -->
      <aside class="filter-panel">
        <!-- 地区选择器 -->
        <div class="panel-card region-card">
          <div class="panel-header">
            <i class="el-icon-map-location"></i>
            <h3>地区选择</h3>
          </div>
          <div class="region-selector">
            <el-cascader
              v-model="selectedRegionPath"
              :options="regionOptions"
              :props="{ value: 'id', label: 'name', children: 'children', checkStrictly: true }"
              placeholder="选择大区 / 省市 / 区域"
              clearable
              filterable
              style="width: 100%"
              @change="onRegionChange"
            />
            <div class="region-current" v-if="currentRegionInfo">
              <el-tag :type="currentRegionInfo.level === 3 ? 'danger' : 'info'" size="small">
                {{ currentRegionInfo.name }}
              </el-tag>
              <span class="region-level-text">{{ regionLevelText(currentRegionInfo.level) }}</span>
            </div>
          </div>
          <!-- 当前区域预警概要 -->
          <div class="region-warning-summary" v-if="regionWarnings.length > 0">
            <div class="summary-title">该区域预警 ({{ regionWarnings.length }})</div>
            <div v-for="w in regionWarnings" :key="w.areaId" class="summary-item" @click="flyToArea(w)">
              <el-tag :type="getRiskTagType(w.warningLevel)" size="small">{{ getRiskLevelText(w.warningLevel) }}</el-tag>
              <span class="summary-name">{{ w.areaName }}</span>
            </div>
          </div>
        </div>

        <div class="panel-card">
          <div class="panel-header">
            <i class="el-icon-filter"></i>
            <h3>数据筛选</h3>
          </div>

          <!-- 风险等级筛选 -->
          <div class="filter-group">
            <label class="filter-label">风险等级</label>
            <el-checkbox-group v-model="filters.riskLevels">
              <el-checkbox label="1" border>低风险</el-checkbox>
              <el-checkbox label="2" border>中风险</el-checkbox>
              <el-checkbox label="3" border>高风险</el-checkbox>
            </el-checkbox-group>
          </div>

          <!-- 蛇类毒性筛选 -->
          <div class="filter-group">
            <label class="filter-label">蛇类毒性</label>
            <el-checkbox-group v-model="filters.toxicityIds">
              <el-checkbox label="剧毒" border>剧毒</el-checkbox>
              <el-checkbox label="中毒" border>中毒</el-checkbox>
              <el-checkbox label="低毒" border>低毒</el-checkbox>
              <el-checkbox label="无毒" border>无毒</el-checkbox>
            </el-checkbox-group>
          </div>

          <!-- 距离范围筛选 -->
          <div class="filter-group">
            <label class="filter-label">距离范围</label>
            <el-select v-model="filters.distance" placeholder="请选择" id="filter-distance" name="distance">
              <el-option label="1公里内" value="1"></el-option>
              <el-option label="5公里内" value="5"></el-option>
              <el-option label="10公里内" value="10"></el-option>
              <el-option label="20公里内" value="20"></el-option>
            </el-select>
          </div>

          <!-- 最近预警条数 - 修复类型错误 -->
          <div class="filter-group">
            <label class="filter-label">预警展示条数</label>
            <el-input-number
                v-model="filters.limit"
                :min="5"
                :max="20"
                label="条数"
                controls-position="right"
                id="filter-limit"
                name="limit"
            ></el-input-number>
          </div>

          <el-button
              type="primary"
              class="apply-filter-btn"
              @click="applyFilters"
              :loading="filterLoading"
          >
            应用筛选
          </el-button>
        </div>

        <!-- 实时预警触发区 -->
        <div class="panel-card real-time-card">
          <div class="panel-header">
            <i class="el-icon-location"></i>
            <h3>实时预警查询</h3>
          </div>

          <div class="location-info" v-if="userLocation.address">
            <p class="location-label">当前定位：</p>
            <p class="location-value">{{ userLocation.address }}</p>
            <p class="location-coord">
              <i class="el-icon-map-location"></i>
              {{ userLocation.lng || '--' }}, {{ userLocation.lat || '--' }}
            </p>
          </div>

          <el-button
              type="success"
              class="get-location-btn"
              @click="getRealTimeWarning"
              :loading="locating"
              icon="Position"
              :disabled="!isOnline"
          >
            {{ locating ? '定位中...' : '获取位置并查询预警' }}
          </el-button>

          <div class="season-tip">
            <i class="el-icon-calendar"></i>
            当前季节：{{ currentSeason }}
          </div>
        </div>
      </aside>

      <!-- 右侧主内容区 -->
      <section class="main-content">
        <!-- 风险地图区域 -->
        <div class="content-card map-card">
          <div class="card-header">
            <h3>风险区域地图</h3>
            <div class="map-actions">
              <el-button @click="locateUserOnMap" icon="UserFilled" type="text" :disabled="!userLocation.lng">
                定位到我
              </el-button>
              <el-button @click="refreshMap" icon="Refresh" type="text" :disabled="mapLoading">
                刷新地图
              </el-button>
            </div>
          </div>

          <div class="map-container" ref="mapContainer">
            <!-- 高德地图容器 -->
            <div id="amap-container"></div>

            <!-- 地图加载占位 -->
            <div class="map-loading" v-if="mapLoading">
              <el-skeleton active :rows="3" />
            </div>

            <!-- 地图加载失败提示 -->
            <div class="map-error" v-if="mapError">
              <i class="el-icon-circle-close"></i>
              <p>{{ mapErrorMsg }}</p>
              <el-button type="text" @click="initMap">重新加载</el-button>
            </div>
          </div>
        </div>

        <!-- 实时预警结果 -->
        <div class="content-card warning-result-card" v-if="realTimeWarning">
          <div class="card-header">
            <h3>
              <i class="el-icon-warning"></i> 实时蛇类预警结果
            </h3>
            <el-tag type="info" size="small">
              更新时间：{{ realTimeWarning.updateTime }}
            </el-tag>
          </div>

          <div class="warning-result-content">
            <!-- 基础信息 -->
            <div class="basic-info">
              <div class="info-item">
                <label>定位地址：</label>
                <span>{{ realTimeWarning.address || '未知地址' }}</span>
              </div>
              <div class="info-item">
                <label>季节：</label>
                <el-tag :type="getSeasonTagType(realTimeWarning.season)">
                  {{ realTimeWarning.season || currentSeason }}
                </el-tag>
              </div>
              <div class="info-item" v-if="realTimeWarning.matchedArea">
                <label>所在预警区域：</label>
                <el-tag :type="getRiskTagType(realTimeWarning.matchedArea.warningLevel)" size="small">
                  {{ realTimeWarning.matchedArea.areaName }}
                </el-tag>
              </div>
            </div>

            <!-- 命中预警区域详情 -->
            <div class="snake-distribution" v-if="realTimeWarning.matchedArea">
              <h4>
                <i class="el-icon-warning"></i> 预警区域信息
              </h4>
              <div class="matched-area-info">
                <p><strong>区域名称：</strong>{{ realTimeWarning.matchedArea.areaName }}</p>
                <p><strong>风险等级：</strong>
                  <el-tag :type="getRiskTagType(realTimeWarning.matchedArea.warningLevel)" size="small">
                    {{ getRiskLevelText(realTimeWarning.matchedArea.warningLevel) }}
                  </el-tag>
                </p>
                <p v-if="realTimeWarning.matchedArea.description"><strong>描述：</strong>{{ realTimeWarning.matchedArea.description }}</p>
                <p v-if="realTimeWarning.matchedArea.snakeSpecies">
                  <strong>常见蛇种：</strong>{{ parseSnakeSpecies(realTimeWarning.matchedArea.snakeSpecies) }}
                </p>
              </div>
            </div>

            <!-- LLM 分析结果 -->
            <div class="safety-tips">
              <h4>
                <i class="el-icon-safety"></i> AI 智能分析
              </h4>
              <div class="llm-cards" v-if="realTimeWarning.analysis">
                <!-- 蛇类分布 -->
                <div class="llm-card" v-if="realTimeWarning.analysis.snakes && realTimeWarning.analysis.snakes.length">
                  <div class="llm-card-header">
                    <span class="llm-card-icon">🐍</span>
                    <span class="llm-card-title">蛇类分布</span>
                  </div>
                  <div class="llm-card-body">
                    <div class="snake-tag-list">
                      <span v-for="(s, i) in realTimeWarning.analysis.snakes" :key="i"
                            class="snake-tag-item" :class="{ venomous: s.venomous }">
                        <strong>{{ s.name }}</strong>
                        <em v-if="s.note">（{{ s.note }}）</em>
                      </span>
                    </div>
                  </div>
                </div>
                <!-- 活跃度 -->
                <div class="llm-card" v-if="realTimeWarning.analysis.activity">
                  <div class="llm-card-header">
                    <span class="llm-card-icon">📊</span>
                    <span class="llm-card-title">活跃度</span>
                    <el-tag :type="realTimeWarning.analysis.activity.level === '高' ? 'danger' : realTimeWarning.analysis.activity.level === '中' ? 'warning' : 'success'" size="small" style="margin-left:auto">
                      {{ realTimeWarning.analysis.activity.level }}
                    </el-tag>
                  </div>
                  <div class="llm-card-body">
                    <p class="llm-card-text">{{ realTimeWarning.analysis.activity.reason }}</p>
                  </div>
                </div>
                <!-- 安全建议 -->
                <div class="llm-card" v-if="realTimeWarning.analysis.tips && realTimeWarning.analysis.tips.length">
                  <div class="llm-card-header">
                    <span class="llm-card-icon">🛡️</span>
                    <span class="llm-card-title">安全建议</span>
                  </div>
                  <div class="llm-card-body">
                    <ol class="llm-tip-list">
                      <li v-for="(tip, i) in realTimeWarning.analysis.tips" :key="i">{{ tip }}</li>
                    </ol>
                  </div>
                </div>
              </div>
              <!-- fallback: 无结构化数据时显示原始文本 -->
              <div class="llm-response" v-else-if="realTimeWarning.llmResponse">
                <pre class="llm-text">{{ realTimeWarning.llmResponse }}</pre>
              </div>
              <div class="empty-tip" v-else>
                暂无分析数据
              </div>
            </div>
          </div>
        </div>

        <!-- 最近预警列表 -->
        <div class="content-card recent-warning-card">
          <div class="card-header">
            <h3>
              <i class="el-icon-bell"></i> 最近预警信息
            </h3>
            <el-button
                type="text"
                @click="loadRecentWarnings"
                icon="Refresh"
                :loading="loadingRecent"
            >
              刷新列表
            </el-button>
          </div>

          <div class="warning-list">
            <div
                class="warning-item"
                v-for="warning in recentWarnings"
                :key="warning.id"
                @click="viewAreaDetail(warning.areaId)"
                :class="`risk-${warning.level}`"
            >
              <div class="warning-header">
                <h4>{{ warning.areaName || '未知区域' }}</h4>
                <el-tag :type="getRiskTagType(warning.level)">
                  {{ warning.levelText || getRiskLevelText(warning.level) }}
                </el-tag>
              </div>
              <div class="warning-meta">
                <span class="time">
                  <i class="el-icon-clock"></i> {{ warning.warningTime || '未知时间' }}
                </span>
                <span class="distance" v-if="warning.distance">
                  <i class="el-icon-distance"></i> 距您 {{ warning.distance }} 米
                </span>
              </div>
              <p class="warning-desc">{{ warning.warningContent || '暂无预警描述' }}</p>
              <el-button
                  type="text"
                  class="detail-btn"
                  @click.stop="viewAreaDetail(warning.areaId)"
              >
                查看详情
              </el-button>
            </div>

            <!-- 空状态 -->
            <div class="empty-state" v-if="recentWarnings.length === 0 && !loadingRecent">
              <i class="el-icon-info"></i>
              <p>暂无最近预警信息</p>
            </div>

            <!-- 加载状态 -->
            <div class="loading-state" v-if="loadingRecent">
              <el-skeleton active :rows="4" />
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- 风险区域详情弹窗 -->
    <el-dialog
        v-model="detailDialogVisible"
        :title="`${selectedArea?.areaName || '未知区域'} - 风险区域详情`"
        width="600px"
        destroy-on-close
        :close-on-click-modal="false"
    >
      <div v-if="selectedArea" class="area-detail">
        <div class="detail-header">
          <el-tag :type="getRiskTagType(selectedArea.level)" size="large">
            {{ selectedArea.levelText || getRiskLevelText(selectedArea.level) }}
          </el-tag>
          <span class="update-time">
            最后更新：{{ selectedArea.lastUpdate || '未知' }}
          </span>
        </div>

        <div class="detail-content">
          <div class="detail-section">
            <h4>区域信息</h4>
            <p><i class="el-icon-location"></i> 地址：{{ selectedArea.address || '未知' }}</p>
            <p><i class="el-icon-map-location"></i> 经纬度：{{ selectedArea.lng || '--' }}, {{ selectedArea.lat || '--' }}</p>
            <p><i class="el-icon-user"></i> 影响范围：{{ selectedArea.impactRange || '0' }} 平方公里</p>
          </div>

          <div class="detail-section">
            <h4>蛇类信息</h4>
            <p><i class="el-icon-menu"></i> 常见蛇类：{{ selectedArea.commonSnakes || '暂无' }}</p>
            <p><i class="el-icon-data-analysis"></i> 活跃记录：{{ selectedArea.activeRecord || selectedArea.activityRecord || '无数据' }}</p>
            <p><i class="el-icon-danger"></i> 毒性等级：{{ selectedArea.toxicityList || '无数据' }}</p>
          </div>

          <div class="detail-section">
            <h4>防护建议</h4>
            <ul v-if="selectedArea.protectionSuggestion && selectedArea.protectionSuggestion.split('；').length">
              <li v-for="(tip, idx) in (selectedArea.protectionSuggestion?.split('；') || []).filter(t => t && t.trim())" :key="idx">
                {{ tip.trim() }}
              </li>
            </ul>
            <div class="empty-tip" v-else>
              暂无防护建议
            </div>
          </div>

          <div class="detail-section">
            <h4>预警记录</h4>
            <p>{{ selectedArea.activeRecord || selectedArea.activityRecord || '无数据' }}</p>
          </div>
        </div>
      </div>

      <!-- 弹窗加载状态 -->
      <div class="dialog-loading" v-if="!selectedArea">
        <el-skeleton active :rows="6" />
      </div>

      <template #footer>
        <el-button @click="detailDialogVisible = false">关闭</el-button>
        <el-button
            type="primary"
            @click="navigateToAreaOnMap"
            :disabled="!selectedArea?.lng || !selectedArea?.lat"
        >
          在地图中定位
        </el-button>
      </template>
    </el-dialog>

    <!-- 全局加载遮罩 -->
    <div class="global-loading" v-if="globalLoading">
      <el-icon size="32" color="#3b82f6"><Loading /></el-icon>
      <p>数据加载中...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, onErrorCaptured } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Loading, ArrowLeft } from '@element-plus/icons-vue'
import { warningApi } from '@/services/api'

const router = useRouter()

// ========== 高德地图配置（官方1.4.15版本） ==========
// 前往 https://lbs.amap.com/ 申请 Web端(JS API) 密钥
const AMAP_CONFIG = {
  key: '5b3ed07d3b4e322b48d421a9e84ebd9a',
  version: '2.0',
  plugins: 'AMap.Scale,AMap.Zoom,AMap.ToolBar,AMap.InfoWindow,AMap.Geolocation'
}

// ========== 状态管理 ==========
// 修复InputNumber类型错误 - 确保是数字类型
const filters = reactive({
  riskLevels: ['1', '2', '3'],
  toxicityIds: ['剧毒', '中毒', '低毒', '无毒'],
  distance: '5',
  limit: 10,  // 数字类型，解决min/max字符串错误
  riskLevel: ''
})

// 地图相关状态
const mapLoading = ref(true)
const mapError = ref(false)
const mapErrorMsg = ref('地图加载失败，请刷新页面重试')
const mapInstance = ref(null)
let mapScriptLoaded = ref(false) // 标记脚本是否已加载

// 其他状态
const isOnline = ref(navigator.onLine)
const filterLoading = ref(false)
const locating = ref(false)
const loadingRecent = ref(false)
const globalLoading = ref(false)
const detailDialogVisible = ref(false)
const selectedArea = ref(null)
const userLocation = ref({
  lng: '',
  lat: '',
  address: ''
})
const realTimeWarning = ref(null)
const recentWarnings = ref([])

// 计算当前季节
const getCurrentSeason = () => {
  const month = new Date().getMonth() + 1
  if (month >= 3 && month <= 5) return '春季'
  if (month >= 6 && month <= 8) return '夏季'
  if (month >= 9 && month <= 11) return '秋季'
  return '冬季'
}
const currentSeason = ref(getCurrentSeason())

// ========== 地区选择 ==========
const regionOptions = ref([])
const selectedRegionPath = ref([])
const currentRegionInfo = ref(null)
const regionWarnings = ref([])

const regionLevelText = (level) => {
  const map = { 1: '大区', 2: '省/市', 3: '具体区域' }
  return map[level] || ''
}

// 加载区域树
const loadRegionTree = async () => {
  try {
    const res = await warningApi.getRegionTree()
    if (res.data.code === 200) {
      regionOptions.value = buildCascaderOptions(res.data.data || [])
    }
  } catch (e) {
    console.warn('加载区域树失败:', e)
  }
}

// 构建级联选择器数据（过滤空children）
const buildCascaderOptions = (nodes) => {
  return nodes.map(n => ({
    id: n.id,
    name: n.name,
    level: n.level,
    centerLng: n.centerLng,
    centerLat: n.centerLat,
    zoomLevel: n.zoomLevel,
    children: n.children && n.children.length > 0 ? buildCascaderOptions(n.children) : undefined
  }))
}

// 区域选择变化
const onRegionChange = async (path) => {
  if (!path || path.length === 0) {
    currentRegionInfo.value = null
    regionWarnings.value = []
    return
  }

  const regionId = path[path.length - 1]
  // 查找区域信息
  const region = findRegionInTree(regionOptions.value, regionId)
  if (region) {
    currentRegionInfo.value = region

    // 如果是具体区域，加载预警并跳转地图
    if (region.level === 3) {
      await loadRegionWarnings(regionId)
      if (region.centerLng && region.centerLat && mapInstance.value) {
        mapInstance.value.setCenter([parseFloat(region.centerLng), parseFloat(region.centerLat)])
        mapInstance.value.setZoom(region.zoomLevel || 14)
      }
    }
  }
}

// 在树中查找区域
const findRegionInTree = (nodes, id) => {
  for (const n of nodes) {
    if (n.id === id) return n
    if (n.children) {
      const found = findRegionInTree(n.children, id)
      if (found) return found
    }
  }
  return null
}

// 加载某区域的预警
const loadRegionWarnings = async (regionId) => {
  try {
    const res = await warningApi.getWarningByRegion(regionId)
    if (res.data.code === 200) {
      regionWarnings.value = res.data.data || []
    }
  } catch (e) {
    console.warn('加载区域预警失败:', e)
  }
}

// 飞到某个预警区域
const flyToArea = (area) => {
  if (!area.boundaryCoordinates || !mapInstance.value) return
  try {
    const geo = JSON.parse(area.boundaryCoordinates)
    if (geo.coordinates?.[0]?.length > 0) {
      const coords = geo.coordinates[0]
      const centerLng = coords.reduce((s, c) => s + c[0], 0) / coords.length
      const centerLat = coords.reduce((s, c) => s + c[1], 0) / coords.length
      mapInstance.value.setCenter([centerLng, centerLat])
      mapInstance.value.setZoom(15)
    }
  } catch (e) {
    console.warn('解析区域坐标失败')
  }
}

// 有毒蛇类列表
const poisonousSnakes = ['原矛头蝮', '银环蛇', '尖吻蝮', '竹叶青', '眼镜蛇', '金环蛇']

// ========== 官方推荐的异步加载高德地图 ==========
/**
 * 异步加载高德地图API（官方推荐方式）
 */
const loadAMapScript = () => {
  return new Promise((resolve, reject) => {
    // 检查Key是否配置
    if (!AMAP_CONFIG.key || AMAP_CONFIG.key === '请替换为你的高德地图API Key') {
      reject(new Error('请先配置有效的高德地图API Key'))
      return
    }

    // 如果已加载过，直接返回
    if (window.AMap) {
      resolve(window.AMap)
      return
    }

    // 定义回调函数（官方异步加载规范）
    window.initAMapCallback = function() {
      mapScriptLoaded.value = true
      resolve(window.AMap)
    }

    // 创建脚本标签
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.charset = 'utf-8'

    // 构建官方标准的URL（异步加载+回调）
    const url = `https://webapi.amap.com/maps?v=${AMAP_CONFIG.version}&key=${AMAP_CONFIG.key}&plugin=${AMAP_CONFIG.plugins}&callback=initAMapCallback`
    script.src = url

    // 超时处理
    const timeoutTimer = setTimeout(() => {
      reject(new Error('高德地图API加载超时（15秒）'))
    }, 15000)

    // 加载失败处理
    script.onerror = () => {
      clearTimeout(timeoutTimer)
      reject(new Error('高德地图API加载失败，请检查网络连接或API Key是否有效'))
    }

    // 加载完成清理
    script.onload = () => {
      clearTimeout(timeoutTimer)
    }

    // 添加到head（官方推荐）
    document.head.appendChild(script)
  })
}

// ========== 地图初始化（严格按照官方文档） ==========
const initMap = async () => {
  mapLoading.value = true
  mapError.value = false
  mapErrorMsg.value = '地图加载失败，请刷新页面重试'

  try {
    // 1. 检查容器是否存在
    const container = document.getElementById('amap-container')
    if (!container) {
      throw new Error('地图容器不存在')
    }

    // 2. 确保容器有尺寸
    container.style.width = '100%'
    container.style.height = '100%'

    // 3. 异步加载高德地图API（官方方式）
    const AMap = await loadAMapScript()

    // 4. 初始化地图实例（官方标准写法）
    mapInstance.value = new AMap.Map('amap-container', {
      zoom: 14,                // 缩放级别
      center: [107.047983, 27.707961], // 中心点坐标
      resizeEnable: true,      // 允许调整大小
      keyboardEnable: true,    // 允许键盘控制
      dragEnable: true,        // 允许拖拽
      zoomEnable: true         // 允许缩放
    })

    // 5. 地图加载完成后添加控件（官方推荐在complete事件中添加）
    mapInstance.value.on('complete', () => {
      try {
        // 添加比例尺控件
        if (AMap.Scale) {
          mapInstance.value.addControl(new AMap.Scale({
            position: 'bottom-right'
          }))
        }

        // 添加工具条控件
        if (AMap.ToolBar) {
          mapInstance.value.addControl(new AMap.ToolBar({
            position: 'top-left',
            liteStyle: true
          }))
        }

        // 加载风险区域数据
        loadActiveAreaMap()

      } catch (e) {
        console.warn('添加地图控件失败:', e)
      }
    })

  } catch (error) {
    console.error('地图初始化失败:', error)
    mapError.value = true
    mapErrorMsg.value = error.message || '地图加载失败，请检查API Key是否正确'
    ElMessage.error(mapErrorMsg.value)
  } finally {
    mapLoading.value = false
  }
}

// ========== 业务逻辑函数 ==========
/**
 * 加载风险区域数据到地图
 */
const loadActiveAreaMap = async () => {
  if (!mapInstance.value) return

  try {
    const params = new URLSearchParams()
    filters.riskLevels.forEach(v => params.append('riskLevels', v))
    filters.toxicityIds.forEach(v => params.append('toxicityIds', v))
    if (filters.distance) params.append('distance', filters.distance)
    if (userLocation.value.lng) params.append('userLng', userLocation.value.lng)
    if (userLocation.value.lat) params.append('userLat', userLocation.value.lat)

    const res = await warningApi.getActiveAreaMap(params)
    const result = res.data
    if (result.code === 200 && result.data) {
      mapInstance.value.clearMap()

      result.data.forEach(area => {
        const lng = parseFloat(area.lng)
        const lat = parseFloat(area.lat)
        if (isNaN(lng) || isNaN(lat)) return

        const marker = new window.AMap.Marker({
          position: [lng, lat],
          title: area.areaName,
          icon: new window.AMap.Icon({
            size: new window.AMap.Size(30, 30),
            image: getRiskMarkerIcon(area.level),
            imageSize: new window.AMap.Size(30, 30)
          }),
          offset: new window.AMap.Pixel(-15, -15)
        })

        marker.on('click', () => viewAreaDetail(area.id))

        const infoWindow = new window.AMap.InfoWindow({
          content: `<div style="padding: 10px; min-width: 120px;">
            <h5 style="margin:0 0 5px; font-size:14px;">${area.areaName}</h5>
            <p style="margin:0; font-size:12px; color:#666;">风险等级：${area.levelText || getRiskLevelText(area.level)}</p>
            <p style="margin:0; font-size:12px; color:#666;">常见蛇类：${area.commonSnakes || '暂无'}</p>
          </div>`,
          offset: new window.AMap.Pixel(0, -30)
        })

        marker.on('mouseover', () => infoWindow.open(mapInstance.value, marker.getPosition()))
        marker.on('mouseout', () => infoWindow.close())

        mapInstance.value.add(marker)

        // 解析 GeoJSON 边界坐标绘制多边形
        const polygonPath = parseBoundaryCoordinates(area.boundaryCoordinates)
        if (polygonPath) {
          const polygon = new window.AMap.Polygon({
            path: polygonPath,
            fillColor: getRiskFillColor(area.level),
            fillOpacity: 0.3,
            strokeColor: getRiskStrokeColor(area.level),
            strokeWeight: 2,
            strokeOpacity: 0.8
          })
          mapInstance.value.add(polygon)
        }
      })

      // 添加用户位置标记
      if (userLocation.value.lng && userLocation.value.lat) {
        const userMarker = new window.AMap.Marker({
          position: [parseFloat(userLocation.value.lng), parseFloat(userLocation.value.lat)],
          title: '我的位置',
          icon: new window.AMap.Icon({
            size: new window.AMap.Size(25, 25),
            image: 'https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
            imageSize: new window.AMap.Size(25, 25)
          })
        })
        mapInstance.value.add(userMarker)
      }
    }
  } catch (error) {
    console.error('加载风险区域失败:', error)
    ElMessage.error('加载风险区域数据失败')
  }
}

/**
 * 解析 GeoJSON boundaryCoordinates 为 AMap 多边形路径
 */
const parseBoundaryCoordinates = (boundaryCoordinates) => {
  if (!boundaryCoordinates) return null
  try {
    const geo = typeof boundaryCoordinates === 'string' ? JSON.parse(boundaryCoordinates) : boundaryCoordinates
    if (geo.type === 'Polygon' && geo.coordinates && geo.coordinates[0]) {
      return geo.coordinates[0].map(([lng, lat]) => [lng, lat])
    }
  } catch (e) {
    console.warn('解析边界坐标失败:', e)
  }
  return null
}

/**
 * 加载最近预警数据
 */
const loadRecentWarnings = async () => {
  if (!isOnline.value) {
    ElMessage.warning('当前网络离线，无法加载数据')
    return
  }

  loadingRecent.value = true
  try {
    const params = {
      limit: filters.limit,
      riskLevel: filters.riskLevel || undefined
    }
    const res = await warningApi.getRecentWarnings(params)
    const result = res.data
    if (result.code === 200) {
      recentWarnings.value = result.data || []
    }
  } catch (error) {
    console.error('加载最近预警失败:', error)
    ElMessage.error('加载最近预警数据失败')
  } finally {
    loadingRecent.value = false
  }
}

/**
 * 获取实时预警
 */
const getRealTimeWarning = async () => {
  if (!isOnline.value) {
    ElMessage.warning('当前网络离线，无法获取定位和预警信息')
    return
  }

  if (!navigator.geolocation) {
    ElMessage.error('当前浏览器不支持定位功能')
    return
  }

  locating.value = true
  globalLoading.value = true
  realTimeWarning.value = null

  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: false,
        timeout: 10000
      })
    })

    const lng = position.coords.longitude
    const lat = position.coords.latitude
    userLocation.value.lng = lng.toFixed(6)
    userLocation.value.lat = lat.toFixed(6)

    const addrRes = await warningApi.convertLocation({ lng, lat })
    const addrResult = addrRes.data
    if (addrResult.code === 200) {
      userLocation.value.address = addrResult.data.address
    }

    const warningRes = await warningApi.getRealTimeWarning({
      lng,
      lat,
      address: userLocation.value.address,
      season: currentSeason.value
    })

    const warningResult = warningRes.data
    if (warningResult.code === 200) {
      realTimeWarning.value = {
        address: warningResult.data.address || userLocation.value.address,
        season: warningResult.data.season || currentSeason.value,
        analysis: warningResult.data.analysis || null,
        llmResponse: warningResult.data.llmResponse || '',
        updateTime: new Date().toLocaleString()
      }
      ElMessage.success('实时预警信息获取成功')

      // 就近检测 — 判断是否在预警区域内
      try {
        const proxRes = await warningApi.checkProximity({ lng, lat })
        const proxResult = proxRes.data
        if (proxResult.code === 200 && proxResult.data && proxResult.data.length > 0) {
          const topArea = proxResult.data[0]
          realTimeWarning.value.matchedArea = topArea
          realTimeWarning.value.riskLevel = topArea.warningLevel
        }
      } catch {}

      if (mapInstance.value) {
        mapInstance.value.setCenter([lng, lat])
        mapInstance.value.setZoom(15)
        loadActiveAreaMap()
      }
    }
  } catch (error) {
    console.error('获取实时预警失败:', error)
    if (error.code === error.PERMISSION_DENIED) {
      ElMessage.error('位置权限被拒绝，请在浏览器设置中开启定位权限')
    } else if (error.code === error.TIMEOUT) {
      ElMessage.error('定位超时，请重试')
    } else {
      ElMessage.error('获取实时预警信息失败')
    }
  } finally {
    locating.value = false
    globalLoading.value = false
  }
}

/**
 * 查看区域详情
 */
const viewAreaDetail = async (areaId) => {
  if (!isOnline.value) {
    ElMessage.warning('当前网络离线，无法获取区域详情')
    return
  }

  globalLoading.value = true
  selectedArea.value = null
  detailDialogVisible.value = true

  try {
    const res = await warningApi.getActiveAreaDetail(areaId)
    const result = res.data
    if (result.code === 200) {
      selectedArea.value = result.data
    }
  } catch (error) {
    console.error('获取区域详情失败:', error)
    ElMessage.error('获取区域详情失败')
    detailDialogVisible.value = false
  } finally {
    globalLoading.value = false
  }
}

/**
 * 应用筛选条件
 */
const applyFilters = async () => {
  if (!isOnline.value) {
    ElMessage.warning('当前网络离线，无法应用筛选条件')
    return
  }

  filterLoading.value = true
  globalLoading.value = true
  try {
    await loadActiveAreaMap()
    await loadRecentWarnings()
    ElMessage.success('筛选条件已应用')
  } catch (error) {
    ElMessage.error('应用筛选条件失败')
  } finally {
    filterLoading.value = false
    globalLoading.value = false
  }
}

/**
 * 刷新所有数据
 */
const refreshAllData = async () => {
  if (!isOnline.value) {
    ElMessageBox.confirm(
        '当前网络离线，刷新可能无法获取最新数据，是否继续？',
        '提示',
        {
          confirmButtonText: '继续',
          cancelButtonText: '取消',
          type: 'warning'
        }
    ).then(async () => {
      await doRefresh()
    })
    return
  }

  await doRefresh()
}

/**
 * 执行刷新操作
 */
const doRefresh = async () => {
  globalLoading.value = true
  try {
    await loadActiveAreaMap()
    await loadRecentWarnings()
    ElMessage.success('数据已刷新')
  } catch (error) {
    ElMessage.error('数据刷新失败')
  } finally {
    globalLoading.value = false
  }
}

/**
 * 刷新地图
 */
const refreshMap = () => {
  if (mapLoading.value) return
  mapLoading.value = true
  initMap()
}

/**
 * 定位到用户位置
 */
const locateUserOnMap = () => {
  if (userLocation.value.lng && userLocation.value.lat && mapInstance.value) {
    mapInstance.value.setCenter([parseFloat(userLocation.value.lng), parseFloat(userLocation.value.lat)])
    mapInstance.value.setZoom(15)
    ElMessage.success('已定位到您的位置')
  } else {
    ElMessage.warning('请先获取您的位置')
  }
}

/**
 * 在地图中定位选中区域
 */
const navigateToAreaOnMap = () => {
  if (selectedArea.value && mapInstance.value) {
    mapInstance.value.setCenter([parseFloat(selectedArea.value.lng), parseFloat(selectedArea.value.lat)])
    mapInstance.value.setZoom(15)
    detailDialogVisible.value = false
    ElMessage.success('已在地图中定位该区域')
  }
}

// ========== 辅助函数 ==========
/**
 * 获取风险等级标签类型
 */
const getRiskTagType = (level) => {
  if (!level) return 'default'
  switch (String(level)) {
    case '1': return 'success'
    case '2': return 'warning'
    case '3': return 'danger'
    default: return 'default'
  }
}

/**
 * 获取风险等级文本
 */
const getRiskLevelText = (level) => {
  if (!level) return '未知风险'
  switch (String(level)) {
    case '1': return '低风险'
    case '2': return '中风险'
    case '3': return '高风险'
    default: return '未知风险'
  }
}

/**
 * 获取季节标签类型
 */
const getSeasonTagType = (season) => {
  const seasonMap = {
    春季: 'success',
    夏季: 'danger',
    秋季: 'warning',
    冬季: 'info'
  }
  return seasonMap[season] || 'default'
}

/**
 * 判断是否为有毒蛇类
 */
const isPoisonousSnake = (snakeName) => {
  if (!snakeName) return false
  return poisonousSnakes.includes(snakeName)
}

/**
 * 获取活跃度数值
 */
const getActivityLevelValue = (level) => {
  const levelMap = {
    低: 1,
    中: 2,
    高: 3
  }
  return levelMap[level] || 1
}

/**
 * 获取风险标记图标（SVG data URI，不受广告拦截器影响）
 */
const getRiskMarkerIcon = (level) => {
  const colorMap = { 1: '#22c55e', 2: '#eab308', 3: '#ef4444' }
  const color = colorMap[String(level)] || colorMap['1']
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 30 40">
    <path d="M15 0C6.7 0 0 6.7 0 15c0 11.25 15 25 15 25s15-13.75 15-25C30 6.7 23.3 0 15 0z" fill="${color}"/>
    <circle cx="15" cy="14" r="7" fill="white"/>
  </svg>`
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)
}

/**
 * 获取风险填充颜色
 */
const getRiskFillColor = (level) => {
  const colorMap = {
    1: '#48bb78',
    2: '#eab308',
    3: '#ef4444'
  }
  return colorMap[String(level)] || colorMap['1']
}

/**
 * 获取风险描边颜色
 */
const getRiskStrokeColor = (level) => {
  const colorMap = {
    1: '#16a34a',
    2: '#ca8a04',
    3: '#dc2626'
  }
  return colorMap[String(level)] || colorMap['1']
}

/**
 * 解析蛇种 JSON
 */
const parseSnakeSpecies = (species) => {
  if (!species) return '暂无'
  try {
    const arr = typeof species === 'string' ? JSON.parse(species) : species
    return arr.map(s => s.name || s).join('、')
  } catch {
    return species
  }
}

// ========== 错误处理和生命周期 ==========
/**
 * 全局错误捕获
 */
onErrorCaptured((error) => {
  console.error('全局错误捕获:', error)
  // 过滤已知的InputNumber错误
  if (!error.message || !error.message.includes('InputNumber')) {
    ElMessage.error('系统发生错误，请刷新页面重试')
  }
  return false
})

/**
 * 监听网络状态
 */
const updateOnlineStatus = () => {
  isOnline.value = navigator.onLine
  if (isOnline.value) {
    ElMessage.success('网络已恢复，正在同步数据...')
    refreshAllData()
  } else {
    ElMessage.warning('网络已断开，部分功能可能无法使用')
  }
}

/**
 * 挂载生命周期
 */
// Map resize handler (window.innerWidth is not reactive, use event listener)
const handleMapResize = () => {
  if (mapInstance.value) {
    mapInstance.value.resize()
  }
}

onMounted(() => {
  // 初始化地图
  initMap()

  // 加载最近预警
  loadRecentWarnings()

  // 加载区域树
  loadRegionTree()

  // 监听网络状态
  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)

  // 监听窗口大小变化（用于地图resize）
  window.addEventListener('resize', handleMapResize)
})

/**
 * 卸载生命周期
 */
onUnmounted(() => {
  // 移除网络监听
  window.removeEventListener('online', updateOnlineStatus)
  window.removeEventListener('offline', updateOnlineStatus)

  // 移除resize监听
  window.removeEventListener('resize', handleMapResize)

  // 销毁地图实例
  if (mapInstance.value) {
    mapInstance.value.destroy()
    mapInstance.value = null
  }

  // 清理回调函数
  if (window.initAMapCallback) {
    delete window.initAMapCallback
  }
})
</script>

<style scoped>
/* 样式保持不变 */
.snake-warning-system {
  min-height: 100vh;
  background-color: var(--ink-50);
  font-family: var(--font-sans);
}

.main-header {
  background-color: var(--surface-white);
  box-shadow: var(--shadow-sm);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.header-container {
  max-width: 1920px;
  margin: 0 auto;
  padding: 0 var(--space-5);
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.back-btn {
  flex-shrink: 0;
}

.logo i {
  font-size: var(--text-2xl);
  color: var(--danger);
}

.logo h1 {
  font-size: var(--text-lg);
  font-weight: var(--weight-semibold);
  color: var(--ink-700);
  margin: 0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.network-status {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-lg);
  background-color: var(--danger);
  color: var(--surface-white);
  font-size: var(--text-xs);
}

.network-status.online {
  background-color: var(--green-500);
}

.content-container {
  max-width: 1920px;
  margin: 0 auto;
  padding: 84px var(--space-5) var(--space-5);
  display: flex;
  gap: var(--space-5);
}

.filter-panel {
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.panel-card {
  background-color: var(--surface-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.panel-header {
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--ink-100);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.panel-header i {
  color: var(--info);
}

.panel-header h3 {
  font-size: var(--text-base);
  font-weight: var(--weight-semibold);
  color: var(--ink-700);
  margin: 0;
}

/* 地区选择器 */
.region-card {
  border: 1px solid var(--green-200);
}
.region-selector {
  padding: var(--space-4) var(--space-5);
}
.region-current {
  margin-top: var(--space-2);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.region-level-text {
  font-size: var(--text-xs);
  color: var(--ink-500);
}
.region-warning-summary {
  padding: 0 var(--space-5) var(--space-4);
}
.summary-title {
  font-size: var(--text-xs);
  color: var(--ink-500);
  margin-bottom: var(--space-2);
  font-weight: var(--weight-semibold);
}
.summary-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 6px 0;
  cursor: pointer;
  border-bottom: 1px solid var(--ink-50);
  transition: background var(--transition-fast);
}
.summary-item:hover {
  background: var(--surface-cool);
  border-radius: var(--radius-sm);
}
.summary-name {
  font-size: var(--text-sm);
  color: var(--ink-700);
}

.filter-group {
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--ink-50);
}

.filter-group:last-child {
  border-bottom: none;
}

.filter-label {
  display: block;
  margin-bottom: var(--space-2);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--ink-700);
}

.apply-filter-btn {
  width: calc(100% - 40px);
  margin: var(--space-5);
}

.real-time-card {
  padding-bottom: var(--space-5);
}

.location-info {
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--ink-100);
}

.location-label {
  font-size: var(--text-xs);
  color: var(--ink-500);
  margin: 0 0 var(--space-1);
}

.location-value {
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--ink-700);
  margin: 0 0 var(--space-1);
}

.location-coord {
  font-size: var(--text-xs);
  color: var(--ink-500);
  margin: 0;
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.get-location-btn {
  width: calc(100% - 40px);
  margin: var(--space-5);
}

.season-tip {
  text-align: center;
  font-size: var(--text-xs);
  color: var(--ink-500);
  margin-top: -10px;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.content-card {
  background-color: var(--surface-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.card-header {
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--ink-100);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  font-size: var(--text-base);
  font-weight: var(--weight-semibold);
  color: var(--ink-700);
  margin: 0;
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.card-header h3 i {
  color: var(--info);
}

.map-card {
  height: 400px;
}

.map-container {
  width: 100%;
  height: calc(100% - 60px);
  position: relative;
}

#amap-container {
  width: 100%;
  height: 100%;
}

.map-loading, .loading-state {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
}

.map-error {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--danger-bg);
  color: var(--danger);
  gap: var(--space-3);
}

.map-error i {
  font-size: 32px;
}

.warning-result-card {
  padding: 0 var(--space-5) var(--space-5);
}

.warning-result-content {
  padding: var(--space-5) 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.basic-info {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--ink-100);
}

.info-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.info-item label {
  font-weight: var(--weight-medium);
  color: var(--ink-700);
}

.snake-distribution, .activity-level, .safety-tips {
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--ink-100);
}

.snake-distribution:last-child, .activity-level:last-child, .safety-tips:last-child {
  border-bottom: none;
}

.snake-distribution h4, .activity-level h4, .safety-tips h4 {
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  color: var(--ink-700);
  margin: 0 0 var(--space-3);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.snake-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.snake-item {
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-lg);
  background-color: var(--ink-100);
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
}

.snake-item.poisonous {
  background-color: var(--danger-bg);
  color: var(--danger);
}

.snake-tag {
  font-size: 11px;
  padding: 1px 6px;
  border-radius: var(--radius-sm);
  background-color: var(--ink-200);
  color: var(--ink-700);
  margin-left: var(--space-1);
}

.snake-item.poisonous .snake-tag {
  background-color: var(--danger-border);
  color: var(--danger);
}

.activity-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.activity-desc {
  margin: 0;
  color: var(--ink-500);
  font-size: 13px;
}

.safety-tips ul {
  margin: 0;
  padding-left: var(--space-5);
}

.safety-tips li {
  margin-bottom: var(--space-2);
  color: var(--ink-700);
  font-size: var(--text-sm);
}

.safety-tips li:last-child {
  margin-bottom: 0;
}

.empty-tip {
  color: var(--ink-400);
  font-size: 13px;
  padding: var(--space-2) 0;
}

.matched-area-info {
  background: var(--ink-50);
  border-radius: var(--radius-md);
  padding: var(--space-4);
}
.matched-area-info p {
  margin: var(--space-1) 0;
  font-size: var(--text-sm);
  color: var(--ink-700);
}
.matched-area-info strong {
  color: var(--ink-600);
}

.llm-cards {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.llm-card {
  background: var(--surface-white);
  border: 1px solid var(--ink-100);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.llm-card-header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  background: var(--ink-50);
  border-bottom: 1px solid var(--ink-100);
}

.llm-card-icon {
  font-size: 16px;
}

.llm-card-title {
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  color: var(--ink-700);
}

.llm-card-body {
  padding: var(--space-3) var(--space-4);
}

.llm-card-text {
  margin: 0;
  font-size: var(--text-sm);
  color: var(--ink-600);
  line-height: 1.6;
}

/* 蛇类标签列表 */
.snake-tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.snake-tag-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-lg);
  background: var(--ink-50);
  font-size: var(--text-sm);
  color: var(--ink-700);
  border: 1px solid var(--ink-100);
}

.snake-tag-item.venomous {
  background: var(--danger-bg);
  color: var(--danger);
  border-color: var(--danger-border);
}

.snake-tag-item strong {
  font-weight: var(--weight-semibold);
}

.snake-tag-item em {
  font-style: normal;
  font-size: var(--text-xs);
  color: var(--ink-400);
}

.snake-tag-item.venomous em {
  color: var(--danger);
  opacity: 0.7;
}

/* 安全建议列表 */
.llm-tip-list {
  margin: 0;
  padding-left: var(--space-5);
}

.llm-tip-list li {
  font-size: var(--text-sm);
  color: var(--ink-700);
  line-height: 1.7;
  margin-bottom: var(--space-1);
}

.llm-tip-list li:last-child {
  margin-bottom: 0;
}

/* fallback 原始文本 */
.llm-response {
  background: var(--ink-50);
  border-radius: var(--radius-md);
  padding: var(--space-4);
}

.llm-text {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-size: var(--text-sm);
  color: var(--ink-700);
  line-height: 1.6;
}

.recent-warning-card {
  flex: 1;
}

.warning-list {
  padding: var(--space-5);
  max-height: 400px;
  overflow-y: auto;
}

.warning-item {
  padding: var(--space-4);
  border-radius: var(--radius-md);
  background-color: var(--ink-50);
  margin-bottom: var(--space-3);
  cursor: pointer;
  transition: all var(--transition-base);
}

.warning-item:hover {
  background-color: var(--ink-100);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.warning-item.risk-1 {
  border-left: 4px solid var(--green-500);
}

.warning-item.risk-2 {
  border-left: 4px solid var(--warning);
}

.warning-item.risk-3 {
  border-left: 4px solid var(--danger);
}

.warning-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-2);
}

.warning-header h4 {
  font-size: 15px;
  font-weight: var(--weight-semibold);
  color: var(--ink-700);
  margin: 0;
}

.warning-meta {
  display: flex;
  gap: var(--space-4);
  margin-bottom: var(--space-2);
  font-size: var(--text-xs);
  color: var(--ink-500);
}

.warning-meta span {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.warning-desc {
  font-size: 13px;
  color: var(--ink-700);
  margin: 0 0 var(--space-2);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.detail-btn {
  color: var(--info);
  font-size: var(--text-xs);
  padding: 0;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-10) 0;
  color: var(--ink-400);
}

.empty-state i {
  font-size: var(--text-2xl);
  margin-bottom: var(--space-2);
}

.area-detail {
  padding: var(--space-2) 0;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-5);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--ink-100);
}

.update-time {
  font-size: var(--text-xs);
  color: var(--ink-500);
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.detail-section {
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--ink-50);
}

.detail-section:last-child {
  border-bottom: none;
}

.detail-section h4 {
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  color: var(--ink-700);
  margin: 0 0 var(--space-2);
}

.detail-section p {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin: var(--space-1) 0;
  color: var(--ink-700);
}

.detail-section ul {
  margin: var(--space-1) 0 0;
  padding-left: var(--space-5);
}

.detail-section li {
  margin-bottom: var(--space-1);
  color: var(--ink-700);
}

.dialog-loading {
  padding: var(--space-5) 0;
}

.global-loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  gap: var(--space-4);
}

.global-loading p {
  color: var(--ink-700);
  font-size: var(--text-sm);
}

/* 响应式样式 */
@media (max-width: 1200px) {
  .content-container {
    flex-direction: column;
  }

  .filter-panel {
    width: 100%;
    flex-direction: row;
  }

  .panel-card {
    flex: 1;
  }

  .map-card {
    height: 350px;
  }
}

@media (max-width: 768px) {
  .filter-panel {
    flex-direction: column;
  }

  .header-container {
    padding: 0 var(--space-3);
  }

  .logo h1 {
    font-size: var(--text-base);
  }

  .content-container {
    padding: 84px var(--space-3) var(--space-3);
  }

  .basic-info {
    flex-direction: column;
    gap: var(--space-2);
  }

  .warning-meta {
    flex-direction: column;
    gap: var(--space-1);
  }
}
</style>
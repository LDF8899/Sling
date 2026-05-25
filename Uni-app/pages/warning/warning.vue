<template>
  <view class="warning-container">
    <!-- Top navbar -->
    <GlassNavbar
      title="⚠️ 预警信息"
      subtitle="实时蛇类活动风险预警"
    >
      <template #right>
        <view class="refresh-btn-header" @click="loadAllData">🔄</view>
      </template>
    </GlassNavbar>

    <!-- Main content -->
    <scroll-view scroll-y class="main-content">
      <!-- Location and real-time warning card -->
      <view class="location-card glass-card">
        <view class="card-header">
          <view class="header-icon location-icon">📍</view>
          <view class="header-content">
            <text class="header-title">实时预警查询</text>
            <text class="header-subtitle">获取您当前位置的蛇类风险预警</text>
          </view>
        </view>

        <view class="location-content">
          <view class="location-info" v-if="userLocation.address">
            <text class="location-label">📍 当前定位：</text>
            <text class="location-value">{{ userLocation.address }}</text>
            <text class="location-coord">{{ userLocation.lng }}, {{ userLocation.lat }}</text>
          </view>

          <view class="location-actions">
            <button class="action-btn primary-btn" @click="getRealTimeWarning" :loading="locating">
              {{ locating ? '定位中...' : '获取位置并查询预警' }}
            </button>
          </view>

          <view class="season-tip" v-if="currentSeason">
            <text>📅 当前季节：{{ currentSeason }}</text>
          </view>
        </view>
      </view>

      <!-- Risk level display -->
      <view class="risk-level-card glass-card" v-if="currentRiskLevel">
        <view class="card-header">
          <view class="header-icon risk-icon">🚨</view>
          <view class="header-content">
            <text class="header-title">当前风险等级</text>
          </view>
        </view>

        <view class="risk-content">
          <view :class="['level-indicator', currentRiskLevel.level]">
            <text class="level-text">{{ currentRiskLevel.levelText }}</text>
          </view>
          <text class="location-text">📍 {{ currentRiskLevel.location || '当前位置' }}</text>
          <text class="time-text">⏰ 更新时间：{{ currentRiskLevel.updateTime }}</text>

          <view class="risk-tips">
            <text class="tips-title">💡 防护建议：</text>
            <text class="tips-content">{{ currentRiskLevel.advice }}</text>
          </view>
        </view>
      </view>

      <!-- Map display -->
      <view class="map-card glass-card">
        <view class="card-header">
          <view class="header-icon map-icon">🗺️</view>
          <view class="header-content">
            <text class="header-title">风险区域地图</text>
            <text class="header-subtitle">实时蛇类活动风险分布</text>
          </view>
        </view>

        <view class="map-container">
          <map
            id="riskMap"
            class="risk-map"
            :latitude="mapCenter.lat"
            :longitude="mapCenter.lng"
            :scale="14"
            :markers="riskMarkers"
            :show-location="true"
            @markertap="onMarkerTap"
          />

          <view class="map-legend">
            <view class="legend-item">
              <view class="legend-dot high"></view>
              <text>高风险</text>
            </view>
            <view class="legend-item">
              <view class="legend-dot medium"></view>
              <text>中风险</text>
            </view>
            <view class="legend-item">
              <view class="legend-dot low"></view>
              <text>低风险</text>
            </view>
          </view>
        </view>
      </view>

      <!-- Warning detail modal -->
      <view class="modal-mask" v-if="showDetail" @click="closeDetail">
        <view class="detail-modal" @click.stop>
          <view class="modal-header">
            <text class="modal-title">预警详情</text>
            <text class="modal-close" @click="closeDetail">✕</text>
          </view>

          <scroll-view scroll-y class="modal-content">
            <view class="detail-row" v-if="selectedWarning?.title">
              <text class="detail-label">标题</text>
              <text class="detail-value">{{ selectedWarning.title }}</text>
            </view>

            <view class="detail-row">
              <text class="detail-label">发布时间</text>
              <text class="detail-value">{{ selectedWarning.publishTime }}</text>
            </view>

            <view class="detail-row">
              <text class="detail-label">风险等级</text>
              <view :class="['severity-tag modal', selectedWarning.severity || 'low']">
                {{ getSeverityText(selectedWarning.severity) }}
              </view>
            </view>

            <view class="detail-row" v-if="selectedWarning?.location">
              <text class="detail-label">位置</text>
              <text class="detail-value">{{ selectedWarning.location }}</text>
            </view>

            <view class="detail-row" v-if="selectedWarning?.snakeType">
              <text class="detail-label">蛇类类型</text>
              <text class="detail-value">{{ selectedWarning.snakeType }}</text>
            </view>

            <view class="detail-row" v-if="selectedWarning?.description">
              <text class="detail-label">描述</text>
              <text class="detail-value">{{ selectedWarning.description }}</text>
            </view>

            <view class="detail-row" v-if="selectedWarning?.precautions">
              <text class="detail-label">防护措施</text>
              <text class="detail-value precautions">{{ selectedWarning.precautions }}</text>
            </view>

            <view class="detail-row" v-if="selectedWarning?.reportCount">
              <text class="detail-label">报告数量</text>
              <text class="detail-value">{{ selectedWarning.reportCount }} 起</text>
            </view>
          </scroll-view>

          <view class="modal-actions">
            <view class="action-btn secondary" @click="closeDetail">关闭</view>
            <view class="action-btn primary" @click="shareWarning">分享预警</view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { warningApi } from '@/utils/api.js'
import GlassNavbar from '@/components/GlassNavbar.vue'

// Reactive data
const currentRiskLevel = ref(null)
const warnings = ref([])
const showDetail = ref(false)
const selectedWarning = ref(null)

// Map data
const mapCenter = ref({ lng: 116.397428, lat: 39.90923 })
const riskMarkers = ref([])

// Location and real-time warning
const userLocation = ref({ lng: '', lat: '', address: '' })
const locating = ref(false)
const currentSeason = ref('')

// Get current season
const getCurrentSeason = () => {
  const month = new Date().getMonth() + 1
  if (month >= 3 && month <= 5) return '春季'
  if (month >= 6 && month <= 8) return '夏季'
  if (month >= 9 && month <= 11) return '秋季'
  return '冬季'
}

// Get real-time warning (with location)
const getRealTimeWarning = async () => {
  locating.value = true

  try {
    // 1. Get current location
    const res = await uni.getLocation({
      type: 'gcj02',
      highAccuracy: true
    })

    const lng = res.longitude
    const lat = res.latitude
    userLocation.value.lng = lng.toFixed(6)
    userLocation.value.lat = lat.toFixed(6)

    // 2. Call backend for address and real-time warning
    const response = await warningApi.getRealTimeWarning({
      lng: lng,
      lat: lat,
      season: getCurrentSeason()
    })

    if (response && response.data) {
      userLocation.value.address = response.data.address || '未知地址'
      currentSeason.value = response.data.season || getCurrentSeason()

      updateRiskLevelFromRealTime(response.data)

      uni.showToast({ title: '预警信息获取成功', icon: 'success' })
    }
  } catch (error) {
    console.error('获取实时预警失败:', error)
    let errorMsg = '获取失败'

    if (error.errMsg && error.errMsg.includes('auth deny')) {
      errorMsg = '定位权限被拒绝，请在设置中开启'
    } else if (error.errMsg && error.errMsg.includes('timeout')) {
      errorMsg = '定位超时，请重试'
    }

    uni.showToast({ title: errorMsg, icon: 'none', duration: 3000 })
  } finally {
    locating.value = false
  }
}

// Update risk level from real-time warning
const updateRiskLevelFromRealTime = (data) => {
  const activityLevel = data.llmResponse?.includes('高') ? 'high' :
                       data.llmResponse?.includes('中') ? 'medium' : 'low'

  const levelMap = {
    'high': {
      level: 'high', levelText: '高风险',
      advice: '避免前往预警区域，如必须外出请做好防护措施，携带抗蛇毒血清。',
      location: data.address || '当前区域',
      updateTime: new Date().toLocaleString()
    },
    'medium': {
      level: 'medium', levelText: '中风险',
      advice: '注意周围环境，穿着长袖长裤，避免在草丛和树林中长时间停留。',
      location: data.address || '当前区域',
      updateTime: new Date().toLocaleString()
    },
    'low': {
      level: 'low', levelText: '低风险',
      advice: '保持基本警惕，夜间活动使用手电筒照明，注意观察脚下和周围。',
      location: data.address || '当前区域',
      updateTime: new Date().toLocaleString()
    }
  }

  currentRiskLevel.value = levelMap[activityLevel] || levelMap.low

  if (userLocation.value.lng && userLocation.value.lat) {
    mapCenter.value = {
      lng: parseFloat(userLocation.value.lng),
      lat: parseFloat(userLocation.value.lat)
    }
    updateRiskMarkers(data)
  }
}

// Update risk map markers
const updateRiskMarkers = (warningData) => {
  const markers = []

  if (userLocation.value.lng && userLocation.value.lat) {
    markers.push({
      id: 'current',
      latitude: parseFloat(userLocation.value.lat),
      longitude: parseFloat(userLocation.value.lng),
      iconPath: '/static/location-marker.png',
      width: 30,
      height: 30,
      callout: {
        content: '当前位置',
        display: 'ALWAYS',
        padding: 10,
        borderRadius: 5,
        bgColor: '#3b82f6',
        color: '#ffffff'
      }
    })
  }

  if (warningData && warningData.llmResponse) {
    const riskLevel = warningData.llmResponse.includes('高') ? 'high' :
                     warningData.llmResponse.includes('中') ? 'medium' : 'low'

    const riskColor = riskLevel === 'high' ? '#ef4444' :
                     riskLevel === 'medium' ? '#f59e0b' : '#10b981'

    markers.push({
      id: 'risk',
      latitude: parseFloat(userLocation.value.lat) + 0.01,
      longitude: parseFloat(userLocation.value.lng) + 0.01,
      iconPath: '/static/risk-marker.png',
      width: 40,
      height: 40,
      callout: {
        content: `${riskLevel === 'high' ? '高风险' : riskLevel === 'medium' ? '中风险' : '低风险'}区域`,
        display: 'ALWAYS',
        padding: 10,
        borderRadius: 5,
        bgColor: riskColor,
        color: '#ffffff'
      }
    })
  }

  riskMarkers.value = markers
}

// Load all data
const loadAllData = () => {
  loadWarnings()
  if (userLocation.value.lng && userLocation.value.lat) {
    getRealTimeWarning()
  }
}

const getSeverityText = (severity) => {
  const map = { 'high': '高风险', 'medium': '中风险', 'low': '低风险' }
  return map[severity] || '未知'
}

const formatTime = (timeStr) => {
  if (!timeStr) return ''

  const date = new Date(timeStr)
  const now = new Date()
  const diff = now - date

  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 7) return `${days}天前`

  return date.toLocaleDateString('zh-CN')
}

// Load warnings
const loadWarnings = async () => {
  try {
    const response = await warningApi.getRecentWarnings({ limit: 10 })

    if (response && response.data) {
      warnings.value = Array.isArray(response.data) ? response.data : []

      if (warnings.value.length > 0) {
        updateRiskLevel()
      }

      uni.showToast({ title: '加载成功', icon: 'success' })
    } else {
      throw new Error('加载失败')
    }
  } catch (error) {
    console.error('加载预警失败:', error)
    uni.showToast({
      title: '加载失败：' + (error.message || '未知错误'),
      icon: 'none',
      duration: 2000
    })
  }
}

// Update risk level
const updateRiskLevel = () => {
  if (warnings.value.length === 0) {
    currentRiskLevel.value = null
    return
  }

  const recentWarning = warnings.value[0]
  const severity = recentWarning.severity || 'low'

  const levelMap = {
    'high': {
      level: 'high', levelText: '高风险',
      advice: '避免前往预警区域，如必须外出请做好防护措施，携带抗蛇毒血清。',
      location: recentWarning.location || '当前区域',
      updateTime: formatTime(recentWarning.publishTime)
    },
    'medium': {
      level: 'medium', levelText: '中风险',
      advice: '注意周围环境，穿着长袖长裤，避免在草丛和树林中长时间停留。',
      location: recentWarning.location || '当前区域',
      updateTime: formatTime(recentWarning.publishTime)
    },
    'low': {
      level: 'low', levelText: '低风险',
      advice: '保持基本警惕，夜间活动使用手电筒照明，注意观察脚下和周围。',
      location: recentWarning.location || '当前区域',
      updateTime: formatTime(recentWarning.publishTime)
    }
  }

  currentRiskLevel.value = levelMap[severity] || levelMap.low
}

// Show warning detail
const showWarningDetail = (warning) => {
  selectedWarning.value = warning
  showDetail.value = true
}

// Close detail
const closeDetail = () => {
  showDetail.value = false
  selectedWarning.value = null
}

// Map marker tap
const onMarkerTap = (e) => {
  const markerId = e.detail.id
  const marker = riskMarkers.value.find(m => m.id === markerId)

  if (marker && marker.callout?.content) {
    uni.showToast({ title: marker.callout.content, icon: 'none', duration: 3000 })
  }
}

// Share warning
const shareWarning = () => {
  if (!selectedWarning.value) return

  uni.showShareMenu({
    withShareTicket: true,
    showShareItems: ['wechatFriends', 'wechatMoment']
  })

  uni.showToast({ title: '点击右上角分享', icon: 'none' })
}

// Page load
onMounted(() => {
  currentSeason.value = getCurrentSeason()
  loadWarnings()
})
</script>

<style lang="scss" scoped>
.warning-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
}

/* Refresh button in navbar */
.refresh-btn-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 8px 12px;
  font-size: 18px;
}

.refresh-btn {
  font-size: 20px;
  padding: 8px;
  cursor: pointer;
}

.refresh-btn:active {
  transform: rotate(180deg);
}

/* Main content */
.main-content {
  padding-top: 110px;
  padding-bottom: 40px;
}

/* Glass card */
.glass-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  margin: 0 16px 20px;
  animation: fadeInUp 0.6s ease-out;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px 24px 0;
}

.header-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
}

.risk-icon { background: linear-gradient(135deg, #ef4444, #dc2626); }
.warning-list-icon { background: linear-gradient(135deg, #f59e0b, #d97706); }
.map-icon { background: linear-gradient(135deg, #3b82f6, #2563eb); }
.location-icon { background: linear-gradient(135deg, #3b82f6, #2563eb); }

.map-container { padding: 0; position: relative; }

.risk-map {
  width: 100%;
  height: 400px;
  border-radius: 0 0 20px 20px;
}

.map-legend {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 12px 16px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #1e293b;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;

  &.high { background: #ef4444; }
  &.medium { background: #f59e0b; }
  &.low { background: #10b981; }
}

.header-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.header-title { font-size: 18px; font-weight: 700; color: #1e293b; }
.header-subtitle { font-size: 12px; color: #64748b; }

/* Location content */
.location-content { padding: 24px; }

.location-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.location-label { font-size: 14px; color: #1e293b; font-weight: 600; }
.location-value { font-size: 15px; color: #3b82f6; }
.location-coord { font-size: 12px; color: #94a3b8; margin-top: 4px; }

.location-actions { margin: 16px 0; }

.action-btn {
  width: 100%;
  padding: 14px 0;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  transition: all 0.3s ease;
}

.action-btn:active { transform: scale(0.95); }
.action-btn.primary { background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; }
.action-btn.secondary { background: rgba(248, 250, 252, 0.8); color: #1e293b; }

.primary-btn {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
}

.season-tip { margin-top: 12px; }
.season-tip text { font-size: 14px; color: #94a3b8; }

/* Risk level card */
.risk-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.level-indicator {
  padding: 16px;
  border-radius: 12px;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
}

.level-indicator.high { background: linear-gradient(135deg, #ef4444, #dc2626); color: white; }
.level-indicator.medium { background: linear-gradient(135deg, #f59e0b, #d97706); color: white; }
.level-indicator.low { background: linear-gradient(135deg, #10b981, #059669); color: white; }

.level-text { display: block; }
.location-text, .time-text { display: block; font-size: 14px; color: #64748b; }

.risk-tips {
  margin-top: 12px;
  padding: 16px;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 10px;
}

.tips-title {
  display: block;
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.tips-content {
  display: block;
  font-size: 14px;
  color: #64748b;
  line-height: 1.6;
}

/* Warning list */
.warnings-list { padding: 24px; }

.warning-item {
  padding: 16px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  margin-bottom: 12px;
  transition: all 0.3s ease;
}

.warning-item:active { transform: scale(0.98); background: rgba(245, 158, 11, 0.1); }

.warning-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.severity-tag {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
}

.severity-tag.high { background: rgba(239, 68, 68, 0.2); color: #ef4444; }
.severity-tag.medium { background: rgba(245, 158, 11, 0.2); color: #f59e0b; }
.severity-tag.low { background: rgba(16, 185, 129, 0.2); color: #10b981; }
.severity-tag.modal { font-size: 14px; padding: 6px 14px; }

.warning-time { font-size: 12px; color: #94a3b8; }
.warning-title { display: block; font-size: 16px; font-weight: 600; color: #1e293b; margin-bottom: 6px; }
.warning-location, .warning-desc { display: block; font-size: 13px; color: #64748b; margin-bottom: 4px; }

.warning-footer {
  display: flex;
  gap: 12px;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.snake-type, .report-count {
  font-size: 12px;
  color: #64748b;
  padding: 4px 8px;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 4px;
}

/* Empty state */
.empty-state { text-align: center; padding: 40px 20px; }
.empty-icon { font-size: 48px; display: block; margin-bottom: 12px; }
.empty-text { display: block; font-size: 16px; font-weight: 600; color: #1e293b; margin-bottom: 6px; }
.empty-subtext { display: block; font-size: 13px; color: #64748b; }

/* Modal */
.modal-mask {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.detail-modal {
  width: 90%;
  max-height: 80vh;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e2e8f0;
}

.modal-title { font-size: 18px; font-weight: 600; color: #1e293b; }
.modal-close { font-size: 24px; color: #64748b; padding: 4px; }

.modal-content { flex: 1; padding: 20px; max-height: 60vh; }

.detail-row { margin-bottom: 16px; }
.detail-label { display: block; font-size: 13px; color: #64748b; margin-bottom: 6px; font-weight: 500; }
.detail-value { display: block; font-size: 15px; color: #1e293b; line-height: 1.6; }

.detail-value.precautions {
  background: rgba(59, 130, 246, 0.1);
  padding: 12px;
  border-radius: 8px;
}

.modal-actions {
  display: flex;
  gap: 12px;
  padding: 16px 20px;
  border-top: 1px solid #e2e8f0;
}

/* Animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
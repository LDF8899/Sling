<template>
  <view class="hospital-container">
    <!-- Top navbar -->
    <GlassNavbar
      title="🏥 附近医院"
      subtitle="寻找支持蛇毒治疗的医院"
    />

    <!-- Main content -->
    <scroll-view scroll-y class="main-content">
      <!-- Location info card -->
      <view class="location-card glass-card">
        <view class="card-header">
          <view class="header-icon location-icon">📍</view>
          <view class="header-content">
            <text class="header-title">位置信息</text>
            <text class="header-subtitle">设置您的位置以搜索附近医院</text>
          </view>
        </view>

        <view class="location-form">
          <view class="form-item">
            <text class="form-label">📍 位置输入</text>
            <input
              class="form-input"
              v-model="locationInput"
              placeholder="输入地址或经纬度 (如：113.32,23.13)"
              @confirm="searchHospitals"
            />
          </view>

          <view class="form-item">
            <text class="form-label">🔍 搜索半径</text>
            <view class="slider-container">
              <slider
                :value="searchRadius"
                :min="1000"
                :max="20000"
                :step="1000"
                activeColor="#10b981"
                @change="onSliderChange"
              />
              <text class="slider-value">{{ (searchRadius / 1000).toFixed(1) }} km</text>
            </view>
          </view>

          <view class="form-actions">
            <view
              class="action-btn primary"
              :class="{ 'loading': searchLoading }"
              @click="searchHospitals"
            >
              <text v-if="searchLoading">⏳ 搜索中...</text>
              <text v-else>🔍 搜索附近医院</text>
            </view>
            <view
              class="action-btn secondary"
              :class="{ 'loading': locating }"
              @click="getCurrentLocation"
            >
              <text v-if="locating">⏳ 定位中...</text>
              <text v-else>📍 使用当前位置</text>
            </view>
          </view>
        </view>
      </view>

      <!-- Map card -->
      <view class="map-card glass-card" v-if="searchResults.length > 0">
        <view class="card-header">
          <view class="header-icon map-icon">🗺️</view>
          <view class="header-content">
            <text class="header-title">医院位置分布</text>
            <text class="header-subtitle">点击标记查看详情</text>
          </view>
        </view>

        <view class="map-container">
          <map
            id="hospitalMap"
            :latitude="mapCenter.latitude"
            :longitude="mapCenter.longitude"
            :scale="mapScale"
            :markers="mapMarkers"
            :show-location="true"
            class="hospital-map"
            @markertap="onMarkerTap"
          />
        </view>
      </view>

      <!-- Search results list -->
      <view class="results-card glass-card" v-if="searchResults.length > 0">
        <view class="card-header">
          <view class="header-icon result-icon">🏥</view>
          <view class="header-content">
            <text class="header-title">搜索结果</text>
            <text class="header-subtitle">共找到 {{ searchResults.length }} 家医院</text>
          </view>
        </view>

        <view class="results-list">
          <view
            class="result-item"
            v-for="(hospital, index) in searchResults"
            :key="hospital.hospitalId || index"
            @click="selectHospital(hospital)"
          >
            <view class="hospital-info">
              <text class="hospital-name">{{ hospital.hospitalName }}</text>
              <text class="hospital-address">📍 {{ hospital.address }}</text>
              <text class="hospital-contact">📞 {{ hospital.contactInfo || '暂无联系方式' }}</text>
              <view class="hospital-meta">
                <view class="distance-tag">{{ hospital.distanceDesc || '未知距离' }}</view>
                <view class="type-tag">{{ hospital.hospitalType || '医院' }}</view>
              </view>
            </view>
            <view class="arrow-icon">›</view>
          </view>
        </view>
      </view>

      <!-- Hospital detail -->
      <view class="detail-card glass-card" v-if="selectedHospital">
        <view class="card-header">
          <view class="header-icon detail-icon">📋</view>
          <view class="header-content">
            <text class="header-title">医院详情</text>
            <text class="header-subtitle">查看详细信息和导航</text>
          </view>
        </view>

        <view class="detail-content">
          <view class="detail-section">
            <view class="detail-item">
              <text class="detail-label">🏥 医院名称</text>
              <text class="detail-value">{{ selectedHospital.hospitalName }}</text>
            </view>
            <view class="detail-item">
              <text class="detail-label">📍 地址</text>
              <text class="detail-value">{{ selectedHospital.address }}</text>
            </view>
            <view class="detail-item">
              <text class="detail-label">📞 联系电话</text>
              <text class="detail-value">{{ selectedHospital.contactInfo || '暂无' }}</text>
            </view>
            <view class="detail-item">
              <text class="detail-label">📏 距离</text>
              <text class="detail-value">{{ selectedHospital.distanceDesc || '未知' }}</text>
            </view>
            <view class="detail-item">
              <text class="detail-label">🏷️ 类型</text>
              <text class="detail-value">{{ selectedHospital.hospitalType || '未知' }}</text>
            </view>
          </view>

          <view class="detail-actions">
            <view
              class="action-btn primary full-width"
              :class="{ 'loading': navLoading }"
              @click="getNavigationUrl"
            >
              <text v-if="navLoading">⏳ 获取中...</text>
              <text v-else>🧭 获取导航路线</text>
            </view>
            <view
              class="action-btn secondary full-width"
              @click="callHospital"
            >
              📞 拨打电话
            </view>
          </view>
        </view>
      </view>

      <!-- Empty state -->
      <view class="empty-state glass-card" v-if="!searchLoading && searchResults.length === 0 && !selectedHospital">
        <view class="empty-icon">🗺️</view>
        <text class="empty-title">暂无搜索结果</text>
        <text class="empty-subtitle">请点击"搜索附近医院"按钮查找附近的医疗机构</text>
        <view class="empty-tips">
          <view class="tip-item">
            <text>💡</text>
            <text>可以使用当前位置快速定位</text>
          </view>
          <view class="tip-item">
            <text>📍</text>
            <text>也可以手动输入地址查询</text>
          </view>
          <view class="tip-item">
            <text>🔍</text>
            <text>支持调整搜索半径范围</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { hospitalApi } from '@/utils/api.js'
import GlassNavbar from '@/components/GlassNavbar.vue'

// Reactive data
const locationInput = ref('')
const searchRadius = ref(5000)
const searchLoading = ref(false)
const locating = ref(false)
const navLoading = ref(false)
const searchResults = ref([])
const selectedHospital = ref(null)
const currentLocation = reactive({
  latitude: null,
  longitude: null
})

// Map data
const mapCenter = reactive({
  latitude: 27.7254,
  longitude: 106.9272
})
const mapScale = ref(13)
const mapMarkers = ref([])

// Methods
const onSliderChange = (e) => {
  searchRadius.value = e.detail.value
}

// Get current location
const getCurrentLocation = async () => {
  locating.value = true

  try {
    const res = await uni.getLocation({
      type: 'gcj02',
      highAccuracy: true
    })

    currentLocation.latitude = res.latitude
    currentLocation.longitude = res.longitude

    locationInput.value = `${res.longitude.toFixed(4)},${res.latitude.toFixed(4)}`

    uni.showToast({
      title: '定位成功',
      icon: 'success'
    })

    searchHospitals()
  } catch (error) {
    console.error('定位失败:', error)
    uni.showToast({
      title: '定位失败，请检查权限设置',
      icon: 'none',
      duration: 3000
    })
  } finally {
    locating.value = false
  }
}

// Search hospitals
const searchHospitals = async () => {
  if (locationInput.value.trim()) {
    const coords = locationInput.value.trim().split(/[,,\s]+/)
    if (coords.length >= 2) {
      const lon = parseFloat(coords[0])
      const lat = parseFloat(coords[1])

      if (!isNaN(lon) && !isNaN(lat)) {
        currentLocation.longitude = lon
        currentLocation.latitude = lat
        performSearch(lon, lat)
        return
      }
    }

    await geocodeAddress(locationInput.value.trim())
  } else if (currentLocation.latitude && currentLocation.longitude) {
    performSearch(currentLocation.longitude, currentLocation.latitude)
  } else {
    uni.showToast({
      title: '请输入位置信息或使用当前位置',
      icon: 'none'
    })
  }
}

// Geocode
const geocodeAddress = async (address) => {
  searchLoading.value = true

  try {
    const response = await hospitalApi.geocode({ address })

    if (response && response.data) {
      const { longitude, latitude } = response.data
      currentLocation.longitude = longitude
      currentLocation.latitude = latitude

      performSearch(longitude, latitude)
    } else {
      throw new Error('地理编码失败')
    }
  } catch (error) {
    console.error('地理编码失败:', error)
    uni.showToast({
      title: '地址解析失败，请使用经纬度或当前位置',
      icon: 'none',
      duration: 3000
    })
  } finally {
    searchLoading.value = false
  }
}

// Perform search
const performSearch = async (longitude, latitude) => {
  searchLoading.value = true

  try {
    const response = await hospitalApi.searchSnakeVenomHospitals({
      longitude,
      latitude,
      radius: searchRadius.value
    })

    if (response && response.data) {
      searchResults.value = Array.isArray(response.data) ? response.data : []

      if (searchResults.value.length === 0) {
        uni.showToast({ title: '未找到附近的医院', icon: 'none' })
      } else {
        uni.showToast({ title: `找到${searchResults.value.length}家医院`, icon: 'success' })
      }

      selectedHospital.value = null
      updateMapMarkers()
    } else {
      throw new Error('搜索失败')
    }
  } catch (error) {
    console.error('搜索医院失败:', error)
    uni.showToast({
      title: '搜索失败：' + (error.message || '未知错误'),
      icon: 'none',
      duration: 3000
    })
  } finally {
    searchLoading.value = false
  }
}

// Select hospital
const selectHospital = (hospital) => {
  selectedHospital.value = hospital

  uni.pageScrollTo({
    scrollTop: 0,
    duration: 300
  })
}

// Update map markers
const updateMapMarkers = () => {
  if (searchResults.value.length === 0) return

  const markers = searchResults.value.map((hospital, index) => ({
    id: hospital.hospitalId || index,
    latitude: hospital.latitude || mapCenter.latitude,
    longitude: hospital.longitude || mapCenter.longitude,
    iconPath: '/static/map-marker.png',
    width: 30,
    height: 30,
    callout: {
      content: hospital.hospitalName,
      display: 'ALWAYS',
      padding: 10,
      borderRadius: 5,
      bgColor: '#ffffff',
      fontSize: 12
    }
  }))

  mapMarkers.value = markers

  if (searchResults.value.length > 0 && searchResults.value[0].latitude && searchResults.value[0].longitude) {
    mapCenter.latitude = searchResults.value[0].latitude
    mapCenter.longitude = searchResults.value[0].longitude
  }
}

// Marker tap
const onMarkerTap = (e) => {
  const markerId = e.detail.markerId
  const hospital = searchResults.value.find(h => h.hospitalId === markerId)
  if (hospital) {
    selectHospital(hospital)
  }
}

// Get navigation
const getNavigationUrl = async () => {
  if (!selectedHospital.value) {
    uni.showToast({ title: '请先选择医院', icon: 'none' })
    return
  }

  if (!selectedHospital.value.latitude || !selectedHospital.value.longitude) {
    uni.showToast({ title: '该医院暂无位置信息', icon: 'none' })
    return
  }

  navLoading.value = true

  try {
    if (!currentLocation.latitude || !currentLocation.longitude) {
      const locRes = await uni.getLocation({
        type: 'gcj02',
        highAccuracy: true
      })
      currentLocation.latitude = locRes.latitude
      currentLocation.longitude = locRes.longitude
    }

    uni.openLocation({
      latitude: selectedHospital.value.latitude,
      longitude: selectedHospital.value.longitude,
      name: selectedHospital.value.hospitalName || '目的地医院',
      address: selectedHospital.value.address || '未知地址',
      scale: 16
    })

    uni.showToast({ title: '已打开地图，请选择导航 APP', icon: 'success' })
  } catch (error) {
    console.error('打开地图失败:', error)
    uni.showToast({
      title: '打开地图失败：' + (error.message || '未知错误'),
      icon: 'none',
      duration: 3000
    })
  } finally {
    navLoading.value = false
  }
}

// Call hospital
const callHospital = () => {
  if (!selectedHospital.value || !selectedHospital.value.contactInfo) {
    uni.showToast({ title: '暂无联系电话', icon: 'none' })
    return
  }

  const phone = selectedHospital.value.contactInfo.replace(/[^\d+]/g, '')

  if (phone) {
    uni.makePhoneCall({ phoneNumber: phone })
  } else {
    uni.showToast({ title: '无法识别电话号码', icon: 'none' })
  }
}
</script>

<style lang="scss" scoped>
.hospital-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
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

/* Card header */
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

.map-icon { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }
.location-icon { background: linear-gradient(135deg, #3b82f6, #2563eb); }
.result-icon { background: linear-gradient(135deg, #10b981, #059669); }
.detail-icon { background: linear-gradient(135deg, #f59e0b, #d97706); }

.header-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.header-title { font-size: 18px; font-weight: 700; color: #1e293b; }
.header-subtitle { font-size: 12px; color: #64748b; }

/* Location form */
.location-form { padding: 24px; }

.form-item { margin-bottom: 20px; }

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 12px;
  background: rgba(248, 250, 252, 0.8);
  border-radius: 12px;
  font-size: 15px;
  color: #1e293b;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.slider-container { display: flex; align-items: center; gap: 12px; }
.slider-value { font-size: 14px; font-weight: 600; color: #10b981; min-width: 70px; }

.form-actions { display: flex; flex-direction: column; gap: 12px; }

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
.action-btn.primary { background: linear-gradient(135deg, #10b981, #059669); color: white; }
.action-btn.secondary { background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; }
.action-btn.loading { opacity: 0.7; }
.full-width { width: 100%; }

/* Map card */
.map-card { padding: 0; overflow: hidden; }

.map-container { width: 100%; height: 300px; }

.hospital-map { width: 100%; height: 100%; }

/* Search results list */
.results-list { padding: 24px; }

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  margin-bottom: 12px;
  transition: all 0.3s ease;
}

.result-item:active { transform: scale(0.98); background: rgba(16, 185, 129, 0.1); }

.hospital-info { flex: 1; display: flex; flex-direction: column; gap: 6px; }
.hospital-name { font-size: 16px; font-weight: 600; color: #1e293b; }
.hospital-address, .hospital-contact { font-size: 13px; color: #64748b; }

.hospital-meta { display: flex; gap: 8px; margin-top: 4px; }

.distance-tag, .type-tag {
  padding: 4px 10px;
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
}

.arrow-icon { font-size: 24px; color: #94a3b8; margin-left: 12px; }

/* Hospital detail */
.detail-content { padding: 24px; }

.detail-section { margin-bottom: 24px; }

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  background: rgba(248, 250, 252, 0.8);
  border-radius: 10px;
  margin-bottom: 12px;
}

.detail-label { font-size: 12px; color: #64748b; font-weight: 500; }
.detail-value { font-size: 15px; color: #1e293b; font-weight: 600; }

.detail-actions { display: flex; flex-direction: column; gap: 12px; }

/* Empty state */
.empty-state { text-align: center; padding: 60px 20px; }
.empty-icon { font-size: 64px; margin-bottom: 16px; display: block; }
.empty-title { display: block; font-size: 18px; font-weight: 600; color: #1e293b; margin-bottom: 8px; }
.empty-subtitle { display: block; font-size: 14px; color: #64748b; margin-bottom: 24px; }

.empty-tips { display: flex; flex-direction: column; gap: 12px; max-width: 300px; margin: 0 auto; }

.tip-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  background: rgba(59, 130, 246, 0.05);
  border-radius: 8px;
  font-size: 13px;
  color: #64748b;
}

/* Animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
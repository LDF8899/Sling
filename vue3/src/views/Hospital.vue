<template>
  <div class="hospital-container">
    <!-- 头部区域 -->
    <header class="header-container">
      <div class="logo">
        <h1>🏥 医院服务</h1>
        <p>寻找附近支持蛇毒治疗的医院</p>
      </div>
      <div class="status-bar">
        <div class="status-item" :class="{ 'online': isOnline }">
          <i :class="isOnline ? 'el-icon-circle-check' : 'el-icon-circle-close'"></i>
          <span>{{ isOnline ? '在线' : '离线' }}</span>
        </div>
      </div>
    </header>

    <div class="content-container">
      <!-- 左侧筛选面板 -->
      <aside class="filter-panel">
        <div class="panel-card location-card">
          <div class="panel-header">
            <i class="el-icon-location"></i>
            <h3>位置信息</h3>
          </div>
          
          <el-form :model="locationForm" label-width="80px" size="default">
            <el-form-item label="位置输入">
              <el-input 
                v-model="locationForm.userInput" 
                placeholder="输入地址或经纬度(如:113.32,23.13)"
                @keyup.enter="searchHospitals"
              />
            </el-form-item>
            
            <el-form-item label="搜索半径">
              <el-slider 
                v-model="locationForm.radius" 
                :min="1000" 
                :max="20000" 
                :step="1000"
                show-input
                :show-input-controls="false"
                input-size="small"
              />
            </el-form-item>
            
            <div class="form-actions">
              <el-button 
                type="primary" 
                class="search-btn"
                @click="searchHospitals"
                :loading="searchLoading"
                :disabled="!isOnline"
              >
                <i class="el-icon-search"></i>
                搜索附近医院
              </el-button>
              <el-button 
                class="location-btn"
                @click="getCurrentLocation"
                :loading="locating"
                :disabled="!isOnline"
              >
                <i class="el-icon-location"></i>
                使用当前位置
              </el-button>
            </div>
          </el-form>
        </div>

        <!-- 搜索结果列表 -->
        <div class="panel-card results-card" v-if="searchResults.length > 0">
          <div class="panel-header">
            <i class="el-icon-finished"></i>
            <h3>搜索结果 ({{ searchResults.length }}家)</h3>
          </div>
          
          <div class="results-list">
            <div 
              v-for="(hospital, index) in searchResults" 
              :key="hospital.hospitalId || index"
              class="result-item"
              @click="selectHospital(hospital)"
            >
              <div class="hospital-info">
                <h4>{{ hospital.hospitalName }}</h4>
                <p class="hospital-address">{{ hospital.address }}</p>
                <p class="hospital-contact">{{ hospital.contactInfo || '暂无联系方式' }}</p>
                <div class="hospital-meta">
                  <span class="distance-tag">{{ hospital.distanceDesc }}</span>
                  <span class="type-tag">{{ hospital.hospitalType || '医院' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- 右侧地图和内容区域 -->
      <main class="main-content">
        <!-- 地图区域 -->
        <div class="content-card map-card">
          <div class="card-header">
            <i class="el-icon-map-location"></i>
            <h3>医院分布地图</h3>
            <div class="map-controls">
              <el-button 
                size="small" 
                @click="locateOnMap"
                :loading="locating"
                :disabled="!isOnline"
              >
                <i class="el-icon-location"></i>
                定位
              </el-button>
              <el-button 
                size="small" 
                @click="exportHospitals"
                :loading="exportLoading"
                :disabled="searchResults.length === 0"
              >
                <i class="el-icon-download"></i>
                导出Excel
              </el-button>
            </div>
          </div>
          
          <div class="map-container" id="hospital-map-container">
            <div v-if="mapLoading" class="map-loading">
              <i class="el-icon-loading"></i>
              <p>加载地图中...</p>
            </div>
            <div v-else-if="mapError" class="map-error">
              <i class="el-icon-warning"></i>
              <p>{{ mapError }}</p>
              <el-button size="small" @click="initMap">重试</el-button>
            </div>
          </div>
        </div>

        <!-- 医院详情区域 -->
        <div class="content-card detail-card" v-if="selectedHospital">
          <div class="card-header">
            <i class="el-icon-info"></i>
            <h3>医院详情</h3>
          </div>
          
          <div class="detail-content">
            <div class="hospital-detail">
              <h4>{{ selectedHospital.hospitalName }}</h4>
              <div class="detail-section">
                <p><i class="el-icon-location"></i> 地址：{{ selectedHospital.address }}</p>
                <p><i class="el-icon-phone"></i> 电话：{{ selectedHospital.contactInfo || '暂无' }}</p>
                <p><i class="el-icon-timer"></i> 距离：{{ selectedHospital.distanceDesc }}</p>
                <p><i class="el-icon-medal"></i> 类型：{{ selectedHospital.hospitalType || '未知' }}</p>
              </div>
              
              <div class="detail-actions">
                <el-button 
                  type="primary" 
                  @click="getNavigationUrl"
                  :loading="navLoading"
                >
                  <i class="el-icon-position"></i>
                  获取导航
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- 全局加载状态 -->
    <div v-if="globalLoading" class="global-loading">
      <i class="el-icon-loading"></i>
      <p>{{ globalLoadingText }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { ElMessage, ElLoading } from 'element-plus'
import { hospitalApi } from '@/services/api.js'
import LocationService from '@/services/locationService.js'

// ========== 状态变量 ==========
const isOnline = ref(true) // 网络状态
const searchLoading = ref(false) // 搜索加载状态
const exportLoading = ref(false) // 导出加载状态
const locating = ref(false) // 定位加载状态
const navLoading = ref(false) // 导航加载状态
const mapLoading = ref(false) // 地图加载状态
const globalLoading = ref(false) // 全局加载状态
const globalLoadingText = ref('') // 全局加载文本
const mapError = ref('') // 地图错误信息

// 表单数据
const locationForm = reactive({
  userInput: '',
  radius: 5000, // 默认5公里
  mapType: 'AMAP'
})

// 搜索结果
const searchResults = ref([])
const selectedHospital = ref(null) // 选中的医院

// 地图相关
let mapInstance = null
let markers = []
const mapScriptLoaded = ref(false)

// 高德地图配置
const AMAP_CONFIG = {
  key: '6b27e2cf049182541e6f659eacf63d89', // 从后端配置获取
  version: '1.4.15',
  plugins: 'AMAP.Scale,AMAP.Zoom,AMAP.ToolBar,AMAP.InfoWindow,AMAP.Geolocation'
}

// ========== 方法定义 ==========

// 异步加载高德地图API
const loadAMapScript = () => {
  return new Promise((resolve, reject) => {
    // 检查Key是否配置
    if (!AMAP_CONFIG.key || AMAP_CONFIG.key === '6b27e2cf049182541e6f659eacf63d89') {
      reject(new Error('请先配置有效的高德地图API Key'))
      return
    }

    // 如果已加载过，直接返回
    if (window.AMap && mapScriptLoaded.value) {
      resolve(window.AMap)
      return
    }

    // 定义回调函数（官方异步加载规范）
    window.initAMap = function() {
      mapScriptLoaded.value = true
      resolve(window.AMap)
    }

    // 创建脚本标签
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.charset = 'utf-8'

    // 构建官方标准的URL（异步加载+回调）
    const url = `https://webapi.amap.com/maps?v=${AMAP_CONFIG.version}&key=${AMAP_CONFIG.key}&plugin=${AMAP_CONFIG.plugins}&callback=initAMap`
    script.src = url

    // 超时处理
    const timeoutTimer = setTimeout(() => {
      reject(new Error('高德地图API加载超时（15秒）'))
    }, 15000)

    // 加载失败处理
    script.onerror = (error) => {
      clearTimeout(timeoutTimer)
      reject(new Error(`高德地图API加载失败: ${error.message}`))
    }

    // 加载完成清理
    script.onload = () => {
      clearTimeout(timeoutTimer)
    }

    // 添加到head（官方推荐）
    document.head.appendChild(script)
  })
}

// 初始化地图
const initMap = async () => {
  try {
    mapLoading.value = true
    mapError.value = ''
    
    // 1. 检查容器是否存在
    const container = document.getElementById('hospital-map-container')
    if (!container) {
      throw new Error('地图容器不存在')
    }

    // 2. 确保容器有尺寸
    container.style.width = '100%'
    container.style.height = '100%'
    
    // 3. 异步加载高德地图API（官方方式）
    const AMap = await loadAMapScript()

    // 4. 初始化地图实例（官方标准写法）
    mapInstance = new AMap.Map('hospital-map-container', {
      zoom: 14,                // 缩放级别
      center: [107.047983, 27.707961], // 中心点坐标
      resizeEnable: true,      // 允许调整大小
      keyboardEnable: true,    // 允许键盘控制
      dragEnable: true,        // 允许拖拽
      zoomEnable: true,        // 允许缩放
      isHotspot: false,        // 禁用热点功能
      touchZoom: true,         // 允许触屏缩放
      scrollWheel: true,       // 允许滚轮缩放
      defaultCursor: 'pointer' // 默认鼠标样式
    })

    // 5. 地图加载完成后添加控件（官方推荐在complete事件中添加）
    mapInstance.on('complete', () => {
      try {
        // 延迟加载控件，确保插件已加载完成
        setTimeout(() => {
          // 添加比例尺控件
          if (window.AMap && AMap.Scale) {
            mapInstance.addControl(new AMap.Scale({
              position: 'bottom-right'
            }))
          }

          // 添加缩放控件
          if (window.AMap && AMap.Zoom) {
            mapInstance.addControl(new AMap.Zoom({
              position: 'top-right'
            }))
          }

          // 添加工具条控件
          if (window.AMap && AMap.ToolBar) {
            mapInstance.addControl(new AMap.ToolBar({
              position: 'top-left',
              liteStyle: true
            }))
          }

          // 加载医院数据
          loadHospitalMap()
        }, 100)
      } catch (e) {
        console.warn('添加地图控件失败:', e)
      }
    })

  } catch (error) {
    console.error('初始化地图失败:', error)
    mapError.value = error.message
    ElMessage.error(`地图初始化失败: ${error.message}`)
  } finally {
    mapLoading.value = false
  }
}

// 加载医院地图数据
const loadHospitalMap = () => {
  if (!mapInstance || searchResults.value.length === 0) return

  // 清除现有标记
  clearMarkers()

  // 为每个医院添加标记
  searchResults.value.forEach((hospital, index) => {
    if (hospital.longitude && hospital.latitude) {
      // 创建标记点（官方标准写法）
      const marker = new window.AMap.Marker({
        position: [hospital.longitude, hospital.latitude],
        title: hospital.hospitalName,
        icon: new window.AMap.Icon({
          size: new window.AMap.Size(30, 30),
          image: getHospitalMarkerIcon(hospital),
          imageSize: new window.AMap.Size(30, 30)
        }),
        offset: new window.AMap.Pixel(-15, -15)
      })

      // 标记点击事件
      marker.on('click', () => {
        selectHospital(hospital)
      })

      // 创建信息窗口
      const infoWindow = new window.AMap.InfoWindow({
        content: `<div style="padding: 10px; min-width: 120px;">
          <h5 style="margin:0 0 5px; font-size:14px;">${hospital.hospitalName}</h5>
          <p style="margin:0; font-size:12px; color:#666;">${hospital.address}</p>
          <p style="margin:0; font-size:12px; color:#f56c6c;">距离: ${hospital.distanceDesc}</p>
        </div>`,
        offset: new window.AMap.Pixel(0, -30)
      })

      // 鼠标悬停显示信息窗口
      marker.on('mouseover', () => {
        infoWindow.open(mapInstance, marker.getPosition())
      })

      marker.on('mouseout', () => {
        infoWindow.close()
      })

      // 添加标记到地图
      mapInstance.add(marker)
      markers.push(marker)
    }
  })

  // 如果有选中的医院，定位到该医院
  if (selectedHospital.value && selectedHospital.value.longitude && selectedHospital.value.latitude) {
    mapInstance.setCenter([selectedHospital.value.longitude, selectedHospital.value.latitude])
    mapInstance.setZoom(16)
  }
}

// 获取医院标记图标
const getHospitalMarkerIcon = (hospital) => {
  return 'https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png' // 普通 - 蓝色
}

// 清除地图标记
const clearMarkers = () => {
  if (mapInstance && markers.length > 0) {
    mapInstance.remove(markers)
    markers = []
  }
}

// 搜索附近医院
const searchHospitals = async () => {
  if (!locationForm.userInput.trim()) {
    ElMessage.warning('请输入位置信息')
    return
  }

  try {
    searchLoading.value = true
    
    const response = await hospitalApi.searchHospitals({
      userInput: locationForm.userInput,
      radius: locationForm.radius,
      searchType: 'hospital',
      maxResults: 10
    })
    
    if (response.data.code === 200) {
      searchResults.value = response.data.data || []
      ElMessage.success(`找到 ${searchResults.value.length} 家医院`)
      
      // 选中第一个医院
      if (searchResults.value.length > 0) {
        selectHospital(searchResults.value[0])
      }
      
      // 更新地图
      loadHospitalMap()
    } else {
      ElMessage.error(response.data.message || '搜索失败')
      searchResults.value = []
    }
  } catch (error) {
    console.error('搜索医院失败:', error)
    ElMessage.error(error.response?.data?.message || error.message || '搜索失败')
    searchResults.value = []
  } finally {
    searchLoading.value = false
  }
}

// 选择医院
const selectHospital = (hospital) => {
  selectedHospital.value = hospital
  
  // 在地图上定位到该医院
  if (mapInstance && hospital.longitude && hospital.latitude) {
    mapInstance.setCenter([hospital.longitude, hospital.latitude])
    mapInstance.setZoom(16)
  }
}

// 获取当前位置
const getCurrentLocation = async () => {
  try {
    locating.value = true
    const locationData = await LocationService.getCurrentLocationWithLoading()
    locationForm.userInput = LocationService.formatLocationToString(locationData)
    ElMessage.success(`已设置当前位置为搜索点`)
    
    // 自动搜索附近的医院
    searchHospitals()
  } catch (error) {
    console.error('获取位置失败:', error)
  } finally {
    locating.value = false
  }
}

// 在地图上定位
const locateOnMap = async () => {
  if (!mapInstance) {
    ElMessage.error('地图未初始化')
    return
  }

  try {
    locating.value = true
    
    // 使用高德地图的定位插件
    AMap.plugin(['AMap.Geolocation'], () => {
      const geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, // 是否使用高精度定位（GPS）
        timeout: 10000, // 定位超时时间（毫秒）
        zoomToAccuracy: true // 定位成功后自动缩放至定位精度范围
      })
      
      geolocation.getCurrentPosition((status, result) => {
        if (status === 'complete') {
          // 定位成功
          const lng = result.position.getLng()
          const lat = result.position.getLat()
          // Location acquired successfully
          
          // 地图联动：定位到当前位置 + 缩放
          mapInstance.setCenter([lng, lat]) // 设置地图中心点
          mapInstance.setZoom(16) // 缩放级别（1-20，数值越大越详细）
          
          // 添加定位标记点
          const marker = new AMap.Marker({
            position: [lng, lat],
            map: mapInstance,
            title: '我的位置',
            icon: new AMap.Icon({
              size: new AMap.Size(24, 24),
              image: 'https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png',
              imageSize: new AMap.Size(24, 24)
            })
          })
          
          ElMessage.success(`已定位到当前位置：${lng}, ${lat}`)
        } else {
          // 定位失败
          console.error('定位失败：', result)
          ElMessage.error('定位失败，请检查定位权限或网络！')
        }
        locating.value = false
      })
    })
  } catch (error) {
    console.error('地图定位失败:', error)
    ElMessage.error('定位失败：' + error.message)
    locating.value = false
  }
}

// 导出医院信息
const exportHospitals = async () => {
  if (searchResults.value.length === 0) {
    ElMessage.warning('没有可导出的医院数据')
    return
  }

  try {
    exportLoading.value = true
    
    // 创建搜索参数副本
    const exportParams = { ...locationForm }
    
    const response = await hospitalApi.exportSnakeVenomHospitals(exportParams)
    
    // 创建并下载文件
    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `蛇毒治疗医院列表_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.xlsx`
    a.click()
    window.URL.revokeObjectURL(url)
    
    ElMessage.success('导出成功')
  } catch (error) {
    console.error('导出失败:', error)
    ElMessage.error(error.response?.data?.message || error.message || '导出失败')
  } finally {
    exportLoading.value = false
  }
}

// 获取导航链接
const getNavigationUrl = async () => {
  if (!selectedHospital.value || !selectedHospital.value.hospitalId) {
    ElMessage.warning('请选择医院')
    return
  }

  try {
    navLoading.value = true
    
    const response = await hospitalApi.generateNavigationUrl({
      hospitalId: selectedHospital.value.hospitalId,
      userLng: selectedHospital.value.longitude || 107.047983, // 使用选中医院的经度，或默认值
      userLat: selectedHospital.value.latitude || 27.707961
    })
    
    if (response.data.code === 200) {
      // 在新窗口打开导航链接
      window.open(response.data.data, '_blank')
      ElMessage.success('导航链接已打开')
    } else {
      ElMessage.error(response.data.message || '获取导航失败')
    }
  } catch (error) {
    console.error('获取导航失败:', error)
    ElMessage.error(error.response?.data?.message || error.message || '获取导航失败')
  } finally {
    navLoading.value = false
  }
}

// ========== 生命周期 ==========

onMounted(() => {
  // 初始化地图
  initMap()
})

onUnmounted(() => {
  // 销毁地图实例
  if (mapInstance) {
    mapInstance.destroy()
  }
})
</script>

<style scoped>
.hospital-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, var(--surface-cool) 0%, #e4edf5 100%);
}

/* 头部样式 */
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--space-6);
  height: 60px;
  background: var(--surface-white);
  box-shadow: var(--shadow-sm);
  z-index: 100;
}

.logo h1 {
  margin: 0;
  font-size: var(--text-lg);
  font-weight: var(--weight-semibold);
  color: var(--ink-700);
}

.logo p {
  margin: 0;
  font-size: var(--text-xs);
  color: var(--ink-500);
}

.status-bar {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.status-item {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-lg);
  font-size: var(--text-xs);
  background: var(--info-bg);
  color: var(--info);
}

.status-item.online {
  background: var(--info-bg);
  color: var(--success);
}

/* 内容区域 */
.content-container {
  flex: 1;
  display: flex;
  padding: var(--space-3);
  gap: var(--space-3);
  overflow: hidden;
}

/* 左侧筛选面板 */
.filter-panel {
  width: 380px;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.panel-card {
  background: var(--surface-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.panel-header {
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  background: linear-gradient(135deg, var(--ink-50) 0%, var(--ink-200) 100%);
}

.panel-header h3 {
  margin: 0;
  font-size: var(--text-base);
  font-weight: var(--weight-semibold);
  color: var(--ink-700);
}

/* 位置卡片 */
.location-card {
  padding: var(--space-5);
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.search-btn, .location-btn {
  flex: 1;
  padding: var(--space-3) var(--space-5);
  font-weight: var(--weight-medium);
  transition: all var(--transition-base);
  border-radius: var(--radius-sm);
}

.search-btn {
  background: linear-gradient(135deg, var(--info) 0%, var(--blue-700) 100%);
  border: none;
  color: var(--surface-white);
}

.search-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.location-btn {
  background: linear-gradient(135deg, var(--green-500) 0%, var(--green-600) 100%);
  border: none;
  color: var(--surface-white);
}

.location-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-brand);
}

/* 结果列表卡片 */
.results-card {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.results-list {
  flex: 1;
  overflow-y: auto;
  max-height: calc(100vh - 300px);
}

.result-item {
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--ink-50);
  cursor: pointer;
  transition: all var(--transition-base);
  border-radius: var(--radius-sm);
  margin: 0 var(--space-2) var(--space-2) var(--space-2);
}

.result-item:hover {
  background-color: #f1f5f9;
  transform: translateX(4px);
}

.result-item:last-child {
  border-bottom: none;
}

.hospital-info h4 {
  margin: 0 0 var(--space-2) 0;
  font-size: 15px;
  font-weight: var(--weight-semibold);
  color: var(--ink-700);
}

.hospital-address {
  margin: 0 0 var(--space-1) 0;
  font-size: 13px;
  color: var(--ink-500);
}

.hospital-contact {
  margin: 0 0 var(--space-2) 0;
  font-size: 13px;
  color: #6b7280;
}

.hospital-meta {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
  flex-wrap: wrap;
}

.distance-tag, .type-tag {
  font-size: var(--text-xs);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-lg);
  background: var(--ink-200);
  color: #475569;
  font-weight: var(--weight-medium);
}

/* 右侧主内容区域 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.content-card {
  background: var(--surface-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.card-header {
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, var(--ink-50) 0%, var(--ink-200) 100%);
}

.card-header h3 {
  margin: 0;
  font-size: var(--text-base);
  font-weight: var(--weight-semibold);
  color: var(--ink-700);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.map-controls {
  display: flex;
  gap: var(--space-2);
}

/* 地图卡片 */
.map-card {
  height: 400px;
}

.map-container {
  width: 100%;
  height: calc(100% - 60px);
  position: relative;
}

#hospital-map-container {
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
  flex-direction: column;
  background-color: var(--surface-white);
  gap: var(--space-2);
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
  font-size: var(--space-8);
}

/* 详情卡片 */
.detail-card {
  flex: 1;
  overflow-y: auto;
}

.detail-content {
  padding: var(--space-5);
}

.hospital-detail h4 {
  margin: 0 0 var(--space-4) 0;
  font-size: var(--text-lg);
  font-weight: var(--weight-semibold);
  color: var(--ink-700);
}

.detail-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.detail-section p {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  margin: 0;
  color: #475569;
  line-height: 1.5;
  padding: var(--space-2) 0;
  border-bottom: 1px solid #f1f5f9;
}

.detail-section p:last-child {
  border-bottom: none;
}

.detail-actions {
  margin-top: var(--space-5);
  display: flex;
  justify-content: flex-start;
}

.detail-actions .el-button {
  background: linear-gradient(135deg, var(--green-500) 0%, var(--green-600) 100%);
  border: none;
  border-radius: var(--radius-sm);
  padding: var(--space-3) var(--space-6);
  font-weight: var(--weight-medium);
  transition: all var(--transition-base);
}

.detail-actions .el-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-brand);
}

/* 全局加载状态 */
.global-loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: var(--surface-white);
  z-index: 9999;
  gap: var(--space-4);
}

.global-loading i {
  font-size: var(--space-8);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
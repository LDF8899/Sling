<template>
  <div class="hospital-search">
    <div class="search-header">
      <h3>🏥 医院检索</h3>
      <p>搜索附近医院</p>
    </div>
    
    <div class="search-controls">
      <input
        v-model="searchInput"
        type="text"
        placeholder="输入地址或坐标(如:113.32,23.13)"
        @keyup.enter="searchHospitals"
      >
      <input
        v-model="cityInput"
        type="text"
        placeholder="输入城市（可选）"
      >
      <button @click="searchHospitals" :disabled="searchLoading">
        <span v-if="searchLoading">🔍 搜索中...</span>
        <span v-else>🔍 搜索医院</span>
      </button>
      <button @click="getCurrentLocation" :disabled="searchLoading" class="location-btn">
        <span>📍 定位</span>
      </button>
    </div>

    <div class="search-results" v-if="searchResults.length > 0">
      <h4>搜索结果 ({{ searchResults.length }}家)</h4>
      <div class="result-list">
        <div 
          v-for="(hospital, index) in searchResults" 
          :key="index"
          class="result-item"
          @click="selectHospital(hospital)"
        >
          <div class="hospital-info">
            <h5>{{ hospital.hospitalName }}</h5>
            <p class="address">{{ hospital.address }}</p>
            <div class="hospital-meta">
              <span class="distance">📏 {{ hospital.distanceDesc || '未知距离' }}</span>
              <span class="grade">{{ hospital.hospitalType || '未知等级' }}</span>
              <span class="tel">📞 {{ hospital.contactInfo || '暂无' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="loading" v-if="searchLoading">
      🔍 正在搜索附近医院...
    </div>

    <div class="error" v-if="searchError">
      ❌ {{ searchError }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { hospitalApi } from '@/services/api.js'
import LocationService from '@/services/locationService.js'

const props = defineProps({
  AMap: {
    type: Object,
    required: true
  }
})

const emits = defineEmits(['update-markers', 'update-center'])

const searchInput = ref('')
const cityInput = ref('')
const searchResults = ref([])
const searchLoading = ref(false)
const searchError = ref('')

const searchHospitals = async () => {
  if (!searchInput.value.trim()) return

  try {
    searchLoading.value = true
    searchError.value = ''

    // 构造搜索参数
    const searchParams = {
      userInput: searchInput.value,
      radius: 10000,
      searchType: 'hospital',
      maxResults: 10
    }

    const response = await hospitalApi.searchHospitals(searchParams)
    
    if (response.data.code === 200) {
      searchResults.value = response.data.data || []
      
      // 更新地图标记
      const markers = searchResults.value.map(hospital => ({
        name: hospital.hospitalName,
        lon: hospital.longitude ? parseFloat(hospital.longitude) : null,
        lat: hospital.latitude ? parseFloat(hospital.latitude) : null,
        label: hospital.hospitalName
      }))
      
      emits('update-markers', markers)
      
      // 如果输入是坐标格式，更新地图中心点
      if (isValidCoordinate(searchInput.value)) {
        const [lon, lat] = searchInput.value.split(',').map(Number)
        emits('update-center', { lon, lat })
      } else {
        // 如果是地址，尝试获取地理编码
        const params = { address: searchInput.value }
        if (cityInput.value.trim()) {
          params.city = cityInput.value
        }
        
        const geocodeResponse = await hospitalApi.geocode(params)
        if (geocodeResponse.data.code === 200) {
          const { location } = geocodeResponse.data.data
          const [lon, lat] = location.split(',').map(Number)
          emits('update-center', { lon, lat })
        }
      }
    } else {
      searchError.value = response.data.message || '搜索失败'
    }
  } catch (error) {
    console.error('搜索医院失败:', error)
    searchError.value = error.response?.data?.message || error.message || '搜索失败'
  } finally {
    searchLoading.value = false
  }
}

const isValidCoordinate = (input) => {
  const pattern = /^(\d{1,3}\.\d+)\s*[,，\s]\s*(\d{1,3}\.\d+)$/
  return pattern.test(input)
}

const selectHospital = (hospital) => {
  // 更新地图中心到选中医院
  if (hospital.longitude && hospital.latitude) {
    emits('update-center', {
      lon: parseFloat(hospital.longitude),
      lat: parseFloat(hospital.latitude)
    })
  }
}

// 获取当前位置
const getCurrentLocation = async () => {
  try {
    searchLoading.value = true
    searchError.value = ''
    
    const locationData = await LocationService.getCurrentLocation()
    searchInput.value = LocationService.formatLocationToString(locationData)
    
    // 搜索附近的医院
    searchHospitals()
  } catch (error) {
    searchLoading.value = false
    searchError.value = error.message
    console.error('定位失败:', error)
  }
}
</script>

<style scoped>
.hospital-search {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
}

.search-header {
  margin-bottom: 20px;
}

.search-header h3 {
  margin: 0 0 4px 0;
  font-size: 18px;
  color: #334155;
}

.search-header p {
  margin: 0;
  color: #64748b;
  font-size: 14px;
}

.search-controls {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.search-controls input {
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.search-controls input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-controls button {
  padding: 12px 20px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.search-controls button:hover:not(:disabled) {
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.search-controls button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.location-btn {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
}

.location-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.search-results h4 {
  margin: 0 0 16px 0;
  color: #334155;
  font-size: 16px;
}

.result-list {
  max-height: 300px;
  overflow-y: auto;
}

.result-item {
  padding: 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.result-item:hover {
  border-color: #3b82f6;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  transform: translateX(4px);
}

.hospital-info h5 {
  margin: 0 0 8px 0;
  color: #334155;
  font-size: 15px;
}

.hospital-info .address {
  margin: 0 0 8px 0;
  color: #64748b;
  font-size: 13px;
}

.hospital-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 12px;
}

.distance, .grade, .tel {
  padding: 4px 8px;
  border-radius: 4px;
  background: #f1f5f9;
  color: #475569;
}

.loading {
  padding: 16px;
  text-align: center;
  color: #64748b;
}

.error {
  padding: 12px;
  background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%);
  border-radius: 8px;
  color: #dc2626;
  border-left: 4px solid #ef4444;
}
</style>
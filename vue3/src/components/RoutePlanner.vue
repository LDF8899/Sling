<template>
  <div class="route-planner">
    <div class="planner-header">
      <h3>🗺️ 路线规划</h3>
      <p>获取驾车或步行路线</p>
    </div>
    
    <div class="route-controls">
      <div class="input-group">
        <label>出发地</label>
        <input
          v-model="startLocation"
          type="text"
          placeholder="输入出发地地址或坐标"
        >
        <input
          v-model="startCity"
          type="text"
          placeholder="输入出发地城市（可选）"
        >
      </div>
      
      <div class="input-group">
        <label>目的地</label>
        <input
          v-model="endLocation"
          type="text"
          placeholder="输入目的地地址或坐标"
        >
        <input
          v-model="endCity"
          type="text"
          placeholder="输入目的地城市（可选）"
        >
      </div>
      
      <div class="route-options">
        <label>路线类型</label>
        <select v-model="routeType">
          <option value="driving">🚗 驾车</option>
          <option value="walking">🚶 步行</option>
        </select>
      </div>
      
      <div class="driving-options" v-if="routeType === 'driving'">
        <label>驾驶策略</label>
        <select v-model="drivingStrategy">
          <option value="0">默认路线</option>
          <option value="1">高速优先</option>
          <option value="2">国道优先</option>
          <option value="3">不走高速</option>
          <option value="4">避免收费</option>
          <option value="5">不走高速+避免收费</option>
        </select>
      </div>
      
      <button @click="getRoute" :disabled="routeLoading">
        <span v-if="routeLoading">🗺️ 规划中...</span>
        <span v-else>🗺️ 规划路线</span>
      </button>
    </div>

    <div class="route-info" v-if="routeResult.success">
      <h4>路线信息</h4>
      <div class="info-item">
        <span class="label">📏 总距离:</span>
        <span class="value">{{ routeResult.total_distance }}</span>
      </div>
      <div class="info-item">
        <span class="label">⏱️ 预计时间:</span>
        <span class="value">{{ routeResult.total_duration }}</span>
      </div>
      <div class="info-item" v-if="routeResult.strategy">
        <span class="label">🚗 策略:</span>
        <span class="value">{{ routeResult.strategy }}</span>
      </div>
      <div class="info-item" v-if="routeResult.total_toll">
        <span class="label">💰 过路费:</span>
        <span class="value">{{ routeResult.total_toll }}</span>
      </div>
    </div>

    <div class="route-steps" v-if="routeResult.steps && routeResult.steps.length > 0">
      <h4>路线指引</h4>
      <div class="step-list">
        <div 
          v-for="(step, index) in routeResult.steps" 
          :key="index"
          class="step-item"
        >
          <div class="step-index">{{ index + 1 }}.</div>
          <div class="step-content">
            <div class="instruction">{{ step.instruction }}</div>
            <div class="step-meta">
              <span class="distance">📏 {{ step.distance }}米</span>
              <span class="duration">⏱️ {{ step.duration }}秒</span>
              <span v-if="step.road" class="road">🛣️ {{ step.road }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="loading" v-if="routeLoading">
      🗺️ 正在规划路线...
    </div>

    <div class="error" v-if="routeError">
      ❌ {{ routeError }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { hospitalApi } from '@/services/api.js'

const props = defineProps({
  AMap: {
    type: Object,
    required: true
  }
})

const emits = defineEmits(['update-path', 'update-markers'])

const startLocation = ref('')
const startCity = ref('')
const endLocation = ref('')
const endCity = ref('')
const routeType = ref('driving')
const drivingStrategy = ref(0)
const routeResult = ref({})
const routeLoading = ref(false)
const routeError = ref('')

const getRoute = async () => {
  if (!startLocation.value.trim() || !endLocation.value.trim()) {
    routeError.value = '请输入出发地和目的地'
    return
  }

  try {
    routeLoading.value = true
    routeError.value = ''
    routeResult.value = {}

    // 解析出发地坐标
    let startCoords = await parseLocation(startLocation.value, startCity.value)
    if (!startCoords.success) {
      routeError.value = `出发地解析失败: ${startCoords.error}`
      return
    }

    // 解析目的地坐标
    let endCoords = await parseLocation(endLocation.value, endCity.value)
    if (!endCoords.success) {
      routeError.value = `目的地解析失败: ${endCoords.error}`
      return
    }

    // 获取路线
    const routeParams = {
      startLon: startCoords.lon,
      startLat: startCoords.lat,
      endLon: endCoords.lon,
      endLat: endCoords.lat,
      routeType: routeType.value,
      strategy: parseInt(drivingStrategy.value)
    }

    const response = await hospitalApi.getRoute(routeParams)
    
    if (response.data.code === 200) {
      routeResult.value = response.data.data
      
      // 更新地图路径 - 优先使用真实道路轨迹
      if (routeResult.value.path_coords && routeResult.value.path_coords.length > 0) {
        // 转换为高德地图所需的 [lng, lat] 格式
        const path = routeResult.value.path_coords.map(coord => [coord[0], coord[1]])
        emits('update-path', path)
      } else {
        // 降级为两点连线，并提示
        if (!routeError.value) {
          routeError.value = '⚠️ 未获取到详细道路轨迹，显示简易路线'
        }
        const path = [
          [startCoords.lon, startCoords.lat],
          [endCoords.lon, endCoords.lat]
        ]
        emits('update-path', path)
      }
      
      // 统一更新起点/终点标记（避免重复解析）
      const markers = [
        { 
          name: '出发地', 
          lon: routeResult.value.start?.[0] || startCoords.lon, 
          lat: routeResult.value.start?.[1] || startCoords.lat, 
          label: '出发地',
          icon: 'https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png'
        },
        { 
          name: '目的地', 
          lon: routeResult.value.end?.[0] || endCoords.lon, 
          lat: routeResult.value.end?.[1] || endCoords.lat, 
          label: '目的地',
          icon: 'https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png'
        }
      ]
      emits('update-markers', markers)
      
    } else {
      routeError.value = response.data.message || '路线规划失败'
    }
  } catch (error) {
    routeError.value = error.message || '路线规划失败'
  } finally {
    routeLoading.value = false
  }
}

const parseLocation = async (location, city = null) => {
  // 检查是否为坐标格式
  const coordPattern = /^(\d{1,3}\.\d+)\s*[,，\s]\s*(\d{1,3}\.\d+)$/
  if (coordPattern.test(location)) {
    const [lon, lat] = location.split(/[,，\s]+/).map(Number)
    if (!isNaN(lon) && !isNaN(lat)) {
      return { success: true, lon, lat }
    }
  }

  // 如果不是坐标格式，尝试地理编码
  try {
    const params = { address: location }
    if (city && city.trim()) {
      params.city = city
    }
    
    const response = await hospitalApi.geocode(params)
    if (response.data.code === 200) {
      const locationStr = response.data.data.location
      const [lon, lat] = locationStr.split(',').map(Number)
      return { success: true, lon, lat }
    } else {
      return { success: false, error: response.data.message || '地址解析失败' }
    }
  } catch (error) {
    return { success: false, error: error.message || '地址解析失败' }
  }
}
</script>

<style scoped>
.route-planner {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
}

.planner-header {
  margin-bottom: 20px;
}

.planner-header h3 {
  margin: 0 0 4px 0;
  font-size: 18px;
  color: #334155;
}

.planner-header p {
  margin: 0;
  color: #64748b;
  font-size: 14px;
}

.route-controls {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.input-group label {
  font-weight: 500;
  color: #334155;
  font-size: 14px;
}

.input-group input {
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.input-group input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.route-options, .driving-options {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.route-options label, .driving-options label {
  font-weight: 500;
  color: #334155;
  font-size: 14px;
}

.route-options select, .driving-options select {
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
}

button {
  padding: 12px 20px;
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

button:hover:not(:disabled) {
  background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.route-info, .route-steps {
  margin-top: 20px;
  padding: 16px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
}

.route-info h4, .route-steps h4 {
  margin: 0 0 12px 0;
  color: #334155;
  font-size: 16px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid #dbeafe;
}

.info-item:last-child {
  border-bottom: none;
}

.label {
  font-weight: 500;
  color: #475569;
}

.value {
  color: #3b82f6;
  font-weight: 500;
}

.step-list {
  max-height: 300px;
  overflow-y: auto;
}

.step-item {
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #e2e8f0;
}

.step-item:last-child {
  border-bottom: none;
}

.step-index {
  font-weight: bold;
  color: #3b82f6;
  min-width: 24px;
}

.step-content {
  flex: 1;
}

.instruction {
  font-weight: 500;
  color: #334155;
  margin-bottom: 4px;
}

.step-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 12px;
}

.distance, .duration, .road {
  padding: 2px 6px;
  border-radius: 4px;
  background: #e0f2fe;
  color: #0284c7;
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
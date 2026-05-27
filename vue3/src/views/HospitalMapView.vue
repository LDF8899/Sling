<template>
  <div class="hospital-map-view">
    <div class="top-bar">
      <el-button :icon="ArrowLeft" circle @click="$router.push('/dashboard')" class="back-btn" />
      <div class="tabs">
        <button
          :class="{ active: activeTab === 'convert' }"
          @click="activeTab = 'convert'"
        >
          📍 地址转换
        </button>
        <button
          :class="{ active: activeTab === 'hospital' }"
          @click="activeTab = 'hospital'"
        >
          🏥 医院检索
        </button>
        <button
          :class="{ active: activeTab === 'route' }"
          @click="activeTab = 'route'"
        >
          🗺️ 路线规划
        </button>
      </div>
    </div>

    <div class="map-container">
      <MapContainer
        :api-key="amapKey"
        :center="mapCenter"
        :markers="mapMarkers"
        :path="mapPath"
        @map-ready="handleMapReady"
      >
        <template #controls>
          <div class="controls-panel">
            <AddressConverter
              v-if="activeTab === 'convert' && AMap"
              :AMap="AMap"
              @update-center="updateMapCenter"
            />

            <HospitalSearch
              v-if="activeTab === 'hospital' && AMap"
              :AMap="AMap"
              @update-markers="updateMapMarkers"
              @update-center="updateMapCenter"
            />

            <RoutePlanner
              v-if="activeTab === 'route' && AMap"
              :AMap="AMap"
              @update-path="updateMapPath"
              @update-markers="updateMapMarkers"
            />
          </div>
        </template>
      </MapContainer>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ArrowLeft } from '@element-plus/icons-vue'
import MapContainer from '../components/MapContainer.vue'
import AddressConverter from '../components/AddressConverter.vue'
import HospitalSearch from '../components/HospitalSearch.vue'
import RoutePlanner from '../components/RoutePlanner.vue'

// 高德地图API密钥（实际项目中建议从环境变量获取）
const amapKey = ref('5b3ed07d3b4e322b48d421a9e84ebd9a')

// 地图状态
const activeTab = ref('convert')
const AMap = ref(null)
const mapCenter = ref({ lon: 116.39748, lat: 39.90882 })
const mapMarkers = ref([])
const mapPath = ref([])

// 地图初始化完成回调
const handleMapReady = (data) => {
  AMap.value = data.AMap
}

// 更新地图中心
const updateMapCenter = (center) => {
  mapCenter.value = center
}

// 更新地图标记
const updateMapMarkers = (markers) => {
  mapMarkers.value = markers
}

// 更新地图路线
const updateMapPath = (path) => {
  mapPath.value = path
}
</script>

<style scoped>
.hospital-map-view {
  width: calc(100% + var(--space-6) * 2);
  height: calc(100vh - 72px);
  margin: calc(-1 * var(--space-6)) calc(-1 * var(--space-6)) 0;
  display: flex;
  flex-direction: column;
  background: var(--blue-50);
}

.top-bar {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  background: var(--surface-white);
  padding: var(--space-2) var(--space-4);
  box-shadow: var(--shadow-sm);
  z-index: 10;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--green-100);
}

.back-btn {
  flex-shrink: 0;
}

.tabs {
  display: flex;
  flex: 1;
}

.tabs button {
  padding: var(--space-4) var(--space-6);
  background: none;
  border: none;
  cursor: pointer;
  font-size: var(--text-base);
  font-weight: var(--weight-medium);
  color: var(--ink-500);
  position: relative;
  transition: all var(--transition-base);
  border-radius: var(--radius-md) var(--radius-md) 0 0;
}

.tabs button:hover {
  background: var(--green-50);
  color: var(--green-600);
}

.tabs button.active {
  color: var(--green-600);
  background: var(--green-50);
}

.tabs button.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--green-600);
}

.map-container {
  flex: 1;
  position: relative;
}

.controls-panel {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  width: 400px;
  z-index: 10;
  transition: all var(--transition-base);
}

@media (max-width: 768px) {
  .controls-panel {
    width: 300px;
    right: var(--space-2);
    top: var(--space-2);
  }

  .tabs {
    padding: 0 var(--space-2);
  }

  .tabs button {
    padding: var(--space-3) var(--space-4);
    font-size: var(--text-sm);
  }
}
</style>
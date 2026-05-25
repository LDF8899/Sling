<template>
  <div class="map-container">
    <div id="map" class="map"></div>
    <div class="locate-btn-container">
      <button class="locate-btn" @click="locateCurrentPosition" :title="'定位到当前位置'">
        📍 定位
      </button>
    </div>
    <slot name="controls"></slot>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  apiKey: {
    type: String,
    required: true
  },
  center: {
    type: Object,
    default: () => ({ lon: 116.39748, lat: 39.90882 })
  },
  zoom: {
    type: Number,
    default: 13
  },
  markers: {
    type: Array,
    default: () => []
  },
  path: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['map-ready', 'marker-click'])

let map = null
let AMap = null
let markers = []
let polyline = null
let geolocation = null

onMounted(async () => {
  try {
    // Dynamically load AMap SDK
    AMap = await initAMap(props.apiKey)

    map = new AMap.Map('map', {
      center: [props.center.lon, props.center.lat],
      zoom: props.zoom
    })

    // Load and add controls via plugin
    AMap.plugin(['AMap.Scale', 'AMap.ControlBar'], () => {
      if (AMap.Scale) {
        map.addControl(new AMap.Scale())
      }
      if (AMap.ControlBar) {
        const controlBar = new AMap.ControlBar({
          position: { top: '10px', right: '10px' },
          showZoomBar: true,
          showControlButton: true
        })
        map.addControl(controlBar)
      }
    })

    // Initialize geolocation plugin
    AMap.plugin(['AMap.Geolocation'], () => {
      geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,
        timeout: 10000,
        buttonPosition: 'RB',
        buttonOffset: new AMap.Pixel(10, 20),
        zoomToAccuracy: true,
        maximumAge: 0
      })
    })

    emits('map-ready', { map, AMap })
  } catch (error) {
    console.error('Map initialization failed:', error)
  }
})

// Initialize AMap
const initAMap = (key) => {
  return new Promise((resolve, reject) => {
    if (window.AMap) {
      resolve(window.AMap)
      return
    }

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `https://webapi.amap.com/maps?v=2.0&key=${key}&callback=initAMapCallback`
    script.onerror = reject
    document.head.appendChild(script)

    window.initAMapCallback = () => {
      resolve(window.AMap)
    }
  })
}

// Locate current position
const locateCurrentPosition = () => {
  if (!AMap || !map) {
    console.error('Map not initialized')
    return
  }

  if (!geolocation) {
    console.error('Geolocation plugin not initialized')
    return
  }

  geolocation.getCurrentPosition((status, result) => {
    if (status === 'complete') {
      onLocateSuccess(result)
    } else {
      console.error('Location failed:', result)
      onLocateError(result)
    }
  })
}

const onLocateSuccess = (result) => {
  const lng = result.position.getLng()
  const lat = result.position.getLat()

  map.setCenter([lng, lat])
  map.setZoom(16)

  const marker = new AMap.Marker({
    position: [lng, lat],
    map: map,
    title: '我的位置',
    icon: new AMap.Icon({
      size: new AMap.Size(24, 24),
      image: 'https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png',
      imageSize: new AMap.Size(24, 24)
    })
  })

  if (markers && markers.length > 0) {
    map.remove(markers)
  }
  markers = [marker]
}

const onLocateError = (error) => {
  console.error('Location failed:', error)
  alert('定位失败，请检查定位权限或网络！\n错误信息：' + error.info)
}

// Watch center changes
watch(
  () => props.center,
  (newCenter) => {
    if (map && newCenter && newCenter.lon && newCenter.lat) {
      map.setCenter([newCenter.lon, newCenter.lat])
    }
  },
  { deep: true }
)

// Watch zoom changes
watch(
  () => props.zoom,
  (newZoom) => {
    if (map) {
      map.setZoom(newZoom)
    }
  }
)

// Watch markers changes
watch(
  () => props.markers,
  (newMarkers) => {
    if (map && AMap) {
      if (markers && markers.length > 0) {
        map.remove(markers)
      }
      markers = []

      newMarkers.forEach(markerData => {
        const marker = new AMap.Marker({
          position: [markerData.lon, markerData.lat],
          title: markerData.name || '',
          label: {
            content: markerData.label || markerData.name || '',
            offset: new AMap.Pixel(0, 0)
          },
          icon: markerData.icon ? new AMap.Icon({
            size: new AMap.Size(30, 30),
            image: markerData.icon,
            imageSize: new AMap.Size(30, 30)
          }) : undefined
        })
        markers.push(marker)
        map.add(marker)
      })
    }
  },
  { deep: true }
)

// Watch path changes
watch(
  () => props.path,
  (newPath) => {
    if (map && AMap) {
      if (polyline) {
        map.remove(polyline)
        polyline = null
      }

      if (newPath && newPath.length > 1) {
        polyline = new AMap.Polyline({
          path: newPath,
          strokeColor: '#3366FF',
          strokeWeight: 6,
          strokeOpacity: 0.8,
          strokeStyle: 'solid',
          borderWeight: 1
        })
        map.add(polyline)

        map.setFitView([polyline])
      }
    }
  },
  { deep: true }
)
</script>

<style scoped>
.map-container {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.map {
  width: 100%;
  height: 100%;
}

.locate-btn-container {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1000;
}

.locate-btn {
  padding: 8px 16px;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 4px;
}

.locate-btn:hover {
  background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.locate-btn:active {
  transform: translateY(0);
}
</style>

<template>
  <div class="address-converter">
    <div class="input-group">
      <label>📍 地址转坐标</label>
      <input
        v-model="address"
        type="text"
        placeholder="请输入地址"
        @keyup.enter="convertAddress"
      >
      <input
        v-model="city"
        type="text"
        placeholder="请输入城市（可选）"
      >
      <button @click="convertAddress">转换</button>
    </div>

    <div class="result" v-if="addressResult.success">
      <p>🌐 坐标: {{ addressResult.lon }}, {{ addressResult.lat }}</p>
      <p>📍 格式化地址: {{ addressResult.formatted_address }}</p>
      <p>🏙️ 城市: {{ addressResult.city }} {{ addressResult.district }}</p>
    </div>

    <div class="error" v-if="addressResult.error">
      ❌ {{ addressResult.error }}
    </div>

    <div class="input-group">
      <label>🌐 坐标转地址</label>
      <input
        v-model="coordinate"
        type="text"
        placeholder="请输入坐标，格式：经度,纬度"
      >
      <button @click="convertCoordinate">转换</button>
    </div>

    <div class="result" v-if="coordResult.success">
      <p>📍 地址: {{ coordResult.address }}</p>
    </div>

    <div class="error" v-if="coordResult.error">
      ❌ {{ coordResult.error }}
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

const address = ref('')
const city = ref('')
const coordinate = ref('')
const addressResult = ref({})
const coordResult = ref({})

const convertAddress = async () => {
  if (!address.value.trim()) return

  try {
    const params = { address: address.value }
    if (city.value.trim()) {
      params.city = city.value
    }
    
    const response = await hospitalApi.geocode(params)
    if (response.data.code === 200) {
      const data = response.data.data;
      // 解析location字段为lon和lat
      let lon, lat;
      if (data.location) {
        const [lng, latVal] = data.location.split(',');
        lon = parseFloat(lng);
        lat = parseFloat(latVal);
      }
      
      addressResult.value = {
        success: true,
        lon,
        lat,
        province: data.province,
        city: data.city,
        district: data.district,
        formatted_address: data.formatted_address,
        precision: data.precision
      }
      coordResult.value = {}
    } else {
      addressResult.value = {
        success: false,
        error: response.data.message || '地址解析失败'
      }
    }
  } catch (error) {
    addressResult.value = {
      success: false,
      error: error.message || '地址解析失败'
    }
  }
}

const convertCoordinate = async () => {
  if (!coordinate.value.trim()) return

  const [lon, lat] = coordinate.value.split(',').map(Number)
  if (isNaN(lon) || isNaN(lat)) {
    coordResult.value = { success: false, error: '坐标格式错误' }
    return
  }

  try {
    const response = await hospitalApi.reverseGeocode({ lon, lat })
    if (response.data.code === 200) {
      coordResult.value = {
        success: true,
        address: response.data.data.formatted_address || response.data.data.address,
        province: response.data.data.province,
        city: response.data.data.city,
        district: response.data.data.district
      }
      addressResult.value = {}
    } else {
      coordResult.value = {
        success: false,
        error: response.data.message || '坐标解析失败'
      }
    }
  } catch (error) {
    coordResult.value = {
      success: false,
      error: error.message || '坐标解析失败'
    }
  }
}
</script>

<style scoped>
.address-converter {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
}

.input-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #334155;
}

input {
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

button {
  padding: 10px 20px;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

button:hover {
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.result {
  padding: 16px;
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  border-radius: 8px;
  margin-bottom: 16px;
  border-left: 4px solid #22c55e;
}

.result p {
  margin: 8px 0;
  color: #166534;
  font-size: 14px;
}

.error {
  color: #ef4444;
  padding: 12px;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%);
  border-radius: 8px;
  border-left: 4px solid #ef4444;
}
</style>
<template>
  <view class="detail-container">
    <!-- Top navbar -->
    <view class="navbar">
      <view class="navbar-content">
        <text class="back-btn" @click="goBack">‹</text>
        <text class="navbar-title">{{ snakeName }}</text>
        <text class="favorite-btn" @click="toggleFavorite">
          {{ isFavorite ? '★' : '☆' }}
        </text>
      </view>
    </view>

    <scroll-view scroll-y class="main-content">
      <!-- Image display -->
      <view class="image-section">
        <swiper class="image-swiper" indicator-dots autoplay circular>
          <swiper-item v-for="(img, index) in imageList" :key="index">
            <image
              class="snake-image"
              :src="img"
              mode="aspectFill"
              lazy-load
            />
          </swiper-item>
        </swiper>
        <view class="image-count" v-if="imageList.length > 1">
          {{ currentImageIndex + 1 }} / {{ imageList.length }}
        </view>
      </view>

      <!-- Basic info -->
      <view class="info-section">
        <view class="snake-header">
          <text class="snake-name">{{ snakeInfo.snakeName }}</text>
          <text class="snake-alias" v-if="snakeInfo.snakeAlias">{{ snakeInfo.snakeAlias }}</text>
        </view>

        <view class="snake-tags">
          <text
            class="tag venom-tag"
            :class="getVenomClass(snakeInfo.venomType)"
            v-if="snakeInfo.venomType"
          >
            {{ getVenomText(snakeInfo.venomType) }}
          </text>
          <text class="tag region-tag" v-if="snakeInfo.distribution">
            📍 {{ snakeInfo.distribution }}
          </text>
        </view>
      </view>

      <!-- Detailed sections -->
      <view class="detail-section">
        <view class="section-title">📖 形态特征</view>
        <text class="section-content">{{ snakeInfo.morphology || '暂无相关信息' }}</text>
      </view>

      <view class="detail-section">
        <view class="section-title">🏠 分布区域</view>
        <text class="section-content">{{ snakeInfo.distribution || '暂无相关信息' }}</text>
      </view>

      <view class="detail-section">
        <view class="section-title">⚠️ 毒性类型</view>
        <text class="section-content">{{ snakeInfo.toxicology || '暂无相关信息' }}</text>
      </view>

      <view class="detail-section">
        <view class="section-title">💀 中毒症状</view>
        <text class="section-content danger">{{ snakeInfo.symptomDescription || '暂无相关信息' }}</text>
      </view>

      <view class="detail-section">
        <view class="section-title">🚑 应急处理</view>
        <text class="section-content highlight">{{ snakeInfo.emergencyTreatment || '暂无相关信息' }}</text>
      </view>

      <view class="detail-section">
        <view class="section-title">🏥 医疗救治</view>
        <text class="section-content">{{ snakeInfo.medicalAttention || '暂无相关信息' }}</text>
      </view>

      <!-- Bottom action bar -->
      <view class="bottom-bar">
        <button class="action-btn emergency-btn" @click="callEmergency">
          🚨 紧急呼叫
        </button>
        <button class="action-btn favorite-btn-outline" @click="toggleFavorite">
          {{ isFavorite ? '已收藏' : '收藏' }}
        </button>
      </view>

      <!-- Spacer -->
      <view style="height: 100px;"></view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import api from '@/utils/api'
import { getBackendImageUrl } from '@/utils/helpers.js'

const snakeName = ref('')
const snakeInfo = ref({})
const imageList = ref([])
const currentImageIndex = ref(0)
const isFavorite = ref(false)

// Load snake detail
const loadSnakeDetail = async () => {
  try {
    const response = await api.emergency.getDetailedSnakeInfo(snakeName.value)

    if (response && response.data) {
      snakeInfo.value = response.data

      // Process image list
      if (response.data.imageUrls && Array.isArray(response.data.imageUrls) && response.data.imageUrls.length > 0) {
        imageList.value = response.data.imageUrls.map(url => getBackendImageUrl(url))
      } else if (response.data.imageUrl) {
        imageList.value = [getBackendImageUrl(response.data.imageUrl)]
      }

      // Check if favorited
      checkFavorite()
    }
  } catch (error) {
    console.error('加载详情失败:', error)
    uni.showToast({
      title: '加载失败',
      icon: 'none'
    })
  }
}

// Venom class
const getVenomClass = (venomType) => {
  if (!venomType) return ''
  if (venomType.includes('神经')) return 'neurotoxic'
  if (venomType.includes('血循')) return 'hemotoxic'
  if (venomType.includes('混合')) return 'mixed'
  return ''
}

const getVenomText = (venomType) => {
  if (!venomType) return '无毒'
  return venomType
}

// Check favorite
const checkFavorite = () => {
  const favorites = uni.getStorageSync('favorites') || []
  isFavorite.value = favorites.some(item => item.snakeName === snakeName.value)
}

// Toggle favorite
const toggleFavorite = () => {
  const favorites = uni.getStorageSync('favorites') || []

  if (isFavorite.value) {
    const index = favorites.findIndex(item => item.snakeName === snakeName.value)
    if (index !== -1) {
      favorites.splice(index, 1)
      uni.setStorageSync('favorites', favorites)
      uni.showToast({
        title: '已取消收藏',
        icon: 'none'
      })
    }
  } else {
    const favoriteItem = {
      id: snakeInfo.value.id || Date.now(),
      snakeName: snakeInfo.value.snakeName,
      snakeAlias: snakeInfo.value.snakeAlias,
      venomType: snakeInfo.value.venomType,
      distribution: snakeInfo.value.distribution,
      imageUrl: snakeInfo.value.imageUrl,
      createTime: new Date().getTime()
    }
    favorites.push(favoriteItem)
    uni.setStorageSync('favorites', favorites)
    uni.showToast({
      title: '已收藏',
      icon: 'success'
    })
  }

  isFavorite.value = !isFavorite.value
}

// Go back
const goBack = () => {
  uni.navigateBack()
}

// Emergency call
const callEmergency = () => {
  uni.showModal({
    title: '紧急求助',
    content: '是否立即拨打急救电话？',
    confirmText: '拨打 120',
    success: (res) => {
      if (res.confirm) {
        uni.makePhoneCall({
          phoneNumber: '120'
        })
      }
    }
  })
}

onLoad((options) => {
  if (options.snakeName) {
    snakeName.value = decodeURIComponent(options.snakeName)
    uni.setNavigationBarTitle({
      title: snakeName.value
    })
  }
})

onMounted(() => {
  loadSnakeDetail()
})
</script>

<style lang="scss" scoped>
.detail-container {
  min-height: 100vh;
  background: #f5f5f5;
}

/* Top navbar */
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
  padding: 15px;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back-btn {
  font-size: 32px;
  color: #1e293b;
  padding: 0 10px;
}

.navbar-title {
  font-size: 18px;
  font-weight: bold;
  color: #1e293b;
  flex: 1;
  text-align: center;
}

.favorite-btn {
  font-size: 28px;
  color: #fbbf24;
  padding: 0 10px;
}

/* Main content */
.main-content {
  height: calc(100vh - 60px);
}

/* Image section */
.image-section {
  position: relative;
  background: white;
  padding-bottom: 10px;
}

.image-swiper {
  width: 100%;
  height: 300px;
}

.snake-image {
  width: 100%;
  height: 100%;
}

.image-count {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
}

/* Basic info */
.info-section {
  background: white;
  padding: 20px;
  margin-bottom: 15px;
}

.snake-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.snake-name {
  font-size: 24px;
  font-weight: bold;
  color: #1e293b;
}

.snake-alias {
  font-size: 14px;
  color: #64748b;
}

.snake-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 500;
}

.venom-tag {
  &.neurotoxic {
    background: #dbeafe;
    color: #1d4ed8;
  }
  &.hemotoxic {
    background: #fee2e2;
    color: #dc2626;
  }
  &.mixed {
    background: #fef3c7;
    color: #d97706;
  }
}

.region-tag {
  background: #e0e7ff;
  color: #4338ca;
}

/* Detail sections */
.detail-section {
  background: white;
  padding: 20px;
  margin-bottom: 15px;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  color: #1e293b;
  margin-bottom: 12px;
}

.section-content {
  font-size: 14px;
  line-height: 1.8;
  color: #475569;
  display: block;

  &.danger {
    color: #dc2626;
  }

  &.highlight {
    color: #059669;
    font-weight: 500;
  }
}

/* Bottom action bar */
.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 10px 15px;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  display: flex;
  gap: 10px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

.action-btn {
  flex: 1;
  height: 44px;
  border-radius: 22px;
  font-size: 14px;
  font-weight: 500;
  border: none;

  &.emergency-btn {
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: white;
  }

  &.favorite-btn-outline {
    background: white;
    color: #fbbf24;
    border: 2px solid #fbbf24;
  }
}
</style>

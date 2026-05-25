<template>
  <view class="dashboard-container">
    <!-- Top navbar -->
    <view class="top-navbar glass-effect">
      <view class="navbar-content">
        <view class="logo-section">
          <text class="logo-text">🐍 蛇灵 (SLING)</text>
        </view>

        <view class="user-actions">
          <view class="online-indicator" :class="{ 'online': isOnline }">
            {{ isOnline ? '在线' : '离线' }}
          </view>

          <button class="emergency-btn" @click="emergencyCall">
            🚨 紧急求助
          </button>

          <view class="avatar-wrapper" @click="goToProfile">
            <image v-if="userStore.userInfo?.avatar"
              class="avatar"
              :src="userStore.userInfo.avatar"
              mode="aspectFill"
            />
            <view v-else class="avatar-default">
              <text>👤</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- Main content -->
    <scroll-view class="main-content" scroll-y enhanced show-scrollbar>
      <!-- Banner carousel -->
      <view class="banner-carousel" v-if="showBanner">
        <swiper
          class="custom-swiper"
          :interval="4000"
          :indicator-dots="false"
          :autoplay="true"
          @change="onBannerChange"
        >
          <swiper-item v-for="(item, index) in bannerList" :key="index">
            <view
              class="banner-item"
              :style="{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${item.image})`,
                backgroundColor: item.bgColor
              }"
              @click="handleBannerClick(item)"
            >
              <view class="banner-content">
                <view class="banner-tag" :style="{ backgroundColor: item.tagColor }">
                  {{ item.tag }}
                </view>
                <text class="banner-title">{{ item.title }}</text>
                <text class="banner-desc">{{ item.description }}</text>
                <button class="banner-button">
                  {{ item.buttonText }}
                </button>
              </view>
            </view>
          </swiper-item>
        </swiper>

        <!-- Indicators -->
        <view class="carousel-indicators">
          <view
            v-for="(item, index) in bannerList"
            :key="index"
            class="indicator-item"
            :class="{ active: currentBannerIndex === index }"
            @click="switchBanner(index)"
          >
            <view class="indicator-progress" v-if="currentBannerIndex === index"></view>
          </view>
        </view>
      </view>

      <!-- Features section -->
      <view class="features-section">
        <view class="section-header">
          <text class="section-title">核心功能</text>
        </view>

        <view class="features-grid">
          <view
            class="feature-card"
            v-for="(feature, index) in features"
            :key="index"
            @click="navigateTo(feature.path)"
          >
            <view class="feature-icon" :style="{ background: feature.color }">
              <text>{{ feature.icon }}</text>
            </view>
            <view class="feature-content">
              <text class="feature-title">{{ feature.title }}</text>
              <text class="feature-desc">{{ feature.description }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- Exhibition section -->
      <view class="exhibition-section">
        <view class="section-header">
          <text class="section-title">📖 科普展览</text>
          <text class="more-link" @click.stop="navigateTo('/pages/exhibition/exhibition')">更多 ›</text>
        </view>

        <view class="exhibition-list">
          <view
            class="exhibition-card"
            v-for="(snake, index) in exhibitionSnakes"
            :key="snake.id"
            @click="viewSnakeDetail(snake)"
          >
            <image
              class="snake-image"
              :src="getBackendImageUrl(snake.imageUrl) || '/static/banner/banner1.jpg'"
              mode="aspectFill"
              lazy-load
            />
            <view class="snake-info">
              <text class="snake-name">{{ snake.snakeName }}</text>
              <text class="snake-desc">{{ snake.alias || '暂无别名' }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- Bottom spacer -->
      <view style="height: 100px;"></view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/store/user'
import api from '@/utils/api'
import { getBackendImageUrl } from '@/utils/helpers.js'

const userStore = useUserStore()
const isOnline = ref(true)
const showBanner = ref(true)
const currentBannerIndex = ref(0)

// Exhibition data
const exhibitionSnakes = ref([])

// Banner data
const bannerList = ref([
  {
    tag: 'AI 识别',
    title: '智能识蛇',
    description: '拍照上传，3 秒快速识别蛇类品种',
    buttonText: '立即识别',
    link: '/pages/recognition/recognition',
    image: '/static/banner/banner1.jpg',
    bgColor: '#10b981',
    tagColor: '#059669'
  },
  {
    tag: '应急指导',
    title: '急救指南',
    description: '专业蛇咬伤应急处理标准化流程',
    buttonText: '查看指南',
    link: '/pages/emergency/emergency',
    image: '/static/banner/banner2.jpg',
    bgColor: '#ef4444',
    tagColor: '#dc2626'
  },
  {
    tag: '血清查询',
    title: '精准寻医',
    description: '快速找到最近的蛇毒治疗医院和血清',
    buttonText: '查找医院',
    link: '/pages/hospital/hospital',
    image: '/static/banner/banner3.jpg',
    bgColor: '#3b82f6',
    tagColor: '#2563eb'
  }
])

// Features list
const features = ref([
  {
    icon: '🐍',
    title: '蛇类识别',
    description: 'AI 智能识别 300+ 种蛇类',
    color: 'linear-gradient(135deg, #10b981, #059669)',
    path: '/pages/recognition/recognition'
  },
  {
    icon: '📚',
    title: '应急指南',
    description: '专业急救指导流程',
    color: 'linear-gradient(135deg, #ef4444, #dc2626)',
    path: '/pages/emergency/emergency'
  },
  {
    icon: '🏥',
    title: '救治医院',
    description: '附近蛇毒治疗医院',
    color: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    path: '/pages/hospital/hospital'
  },
  {
    icon: '🚨',
    title: '区域预警',
    description: '实时蛇类活动监测',
    color: 'linear-gradient(135deg, #f59e0b, #d97706)',
    path: '/pages/warning/warning'
  }
])

// Banner change
const onBannerChange = (e) => {
  currentBannerIndex.value = e.detail.current
}

const switchBanner = (index) => {
  currentBannerIndex.value = index
}

const handleBannerClick = (item) => {
  if (item.link) {
    navigateTo(item.link)
  }
}

// Navigation (auto-detect switchTab vs navigateTo)
const navigateTo = (path) => {
  const tabbarPages = ['pages/index/index', 'pages/recognition/recognition', 'pages/emergency/emergency', 'pages/hospital/hospital', 'pages/profile/profile']
  const cleanPath = path.replace(/^\/+/, '')

  if (tabbarPages.includes(cleanPath)) {
    uni.switchTab({ url: path })
  } else {
    uni.navigateTo({ url: path })
  }
}

// Emergency call
const emergencyCall = () => {
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

// Go to profile (tabBar page)
const goToProfile = () => {
  uni.switchTab({ url: '/pages/profile/profile' })
}

// View snake detail
const viewSnakeDetail = (snake) => {
  uni.navigateTo({
    url: `/pages/snake-detail/snake-detail?snakeName=${encodeURIComponent(snake.snakeName)}`
  })
}

// Load exhibition data
const loadExhibitionSnakes = async () => {
  try {
    const response = await api.emergency.getAllEmergencyGuides()

    let snakeList = []
    if (response && Array.isArray(response)) {
      snakeList = response
    } else if (response && response.data) {
      snakeList = Array.isArray(response.data) ? response.data : [response.data]
    } else if (response && typeof response === 'object') {
      snakeList = [response]
    }

    if (snakeList.length > 0) {
      exhibitionSnakes.value = snakeList.slice(0, 4)
    } else {
      throw new Error('返回数据为空')
    }
  } catch (error) {
    console.error('加载科普展览数据失败:', error)
    // Fallback data
    exhibitionSnakes.value = [
      { id: 1, snakeName: '银环蛇', alias: '金钱白花蛇', imageUrl: '' },
      { id: 2, snakeName: '金环蛇', alias: '金脚带', imageUrl: '' },
      { id: 3, snakeName: '竹叶青', alias: '青竹蛇', imageUrl: '' },
      { id: 4, snakeName: '蝮蛇', alias: '土虺蛇', imageUrl: '' }
    ]
  }
}

onMounted(() => {
  loadExhibitionSnakes()
})
</script>

<style lang="scss" scoped>
.dashboard-container {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

/* Top navbar */
.top-navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
  padding: 10px 15px;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-text {
  font-size: 20px;
  font-weight: bold;
  color: #10b981;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.online-indicator {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  background: #ef4444;
  color: white;

  &.online {
    background: #10b981;
  }
}

.emergency-btn {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  border: none;
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
}

.avatar-wrapper {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
}

.avatar {
  width: 100%;
  height: 100%;
}

.avatar-default {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

/* Main content */
.main-content {
  height: calc(100vh - 60px);
  padding: 15px;
}

/* Banner carousel */
.banner-carousel {
  margin-bottom: 20px;
  position: relative;
}

.custom-swiper {
  width: 100%;
  height: 200px;
  border-radius: 16px;
  overflow: hidden;
}

.banner-item {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.banner-content {
  text-align: center;
  color: white;
}

.banner-tag {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 10px;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.banner-title {
  display: block;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.banner-desc {
  display: block;
  font-size: 14px;
  margin-bottom: 15px;
  opacity: 0.9;
}

.banner-button {
  background: white;
  color: #667eea;
  border: none;
  border-radius: 20px;
  padding: 8px 24px;
  font-size: 14px;
  font-weight: 600;
}

.carousel-indicators {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.indicator-item {
  width: 30px;
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
  position: relative;

  &.active {
    background: rgba(255, 255, 255, 0.6);
  }
}

.indicator-progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: white;
  width: 100%;
  animation: progress 4s linear infinite;
}

@keyframes progress {
  from { width: 100%; }
  to { width: 0%; }
}

/* Features section */
.features-section {
  margin-bottom: 25px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #1e293b;
}

.more-link {
  color: #3b82f6;
  font-size: 14px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.feature-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:active {
    transform: scale(0.95);
  }
}

.feature-icon {
  width: 50px;
  height: 50px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 12px;
  color: white;
}

.feature-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.feature-title {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
}

.feature-desc {
  font-size: 12px;
  color: #64748b;
}

/* Exhibition */
.exhibition-section {
  margin-bottom: 25px;
}

.exhibition-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.exhibition-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:active {
    transform: scale(0.95);
  }
}

.snake-image {
  width: 100%;
  height: 120px;
  background: #f1f5f9;
}

.snake-info {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.snake-name {
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
}

.snake-desc {
  font-size: 12px;
  color: #64748b;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

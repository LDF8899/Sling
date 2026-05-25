<template>
  <view class="favorites-container">
    <!-- Top navbar -->
    <view class="navbar">
      <view class="navbar-content">
        <text class="back-btn" @click="goBack">‹</text>
        <text class="navbar-title">我的收藏</text>
        <text class="clear-btn" @click="clearAll" v-if="favorites.length > 0">清空</text>
      </view>
    </view>

    <scroll-view scroll-y class="main-content">
      <!-- Empty state -->
      <view class="empty-state" v-if="favorites.length === 0">
        <view class="empty-icon">⭐</view>
        <text class="empty-title">暂无收藏</text>
        <text class="empty-subtitle">快去探索有趣的蛇类知识吧</text>
        <button class="explore-btn" @click="goToExhibition">去逛逛</button>
      </view>

      <!-- Favorites list -->
      <view class="favorites-list" v-else>
        <view
          class="favorite-item"
          v-for="(item, index) in favorites"
          :key="index"
          @click="viewDetail(item)"
        >
          <image
            class="snake-image"
            :src="getBackendImageUrl(item.imageUrl)"
            mode="aspectFill"
            lazy-load
          />
          <view class="snake-info">
            <view class="snake-header">
              <text class="snake-name">{{ item.snakeName }}</text>
              <text class="remove-btn" @click.stop="removeFavorite(index)">✕</text>
            </view>
            <text class="snake-alias" v-if="item.snakeAlias">{{ item.snakeAlias }}</text>
            <view class="snake-tags">
              <text class="tag venom-tag" v-if="item.venomType">
                ⚠️ {{ item.venomType }}
              </text>
              <text class="tag region-tag" v-if="item.distribution">
                📍 {{ item.distribution }}
              </text>
            </view>
            <text class="collect-time">收藏时间：{{ formatTime(item.createTime) }}</text>
          </view>
        </view>
      </view>

      <!-- Spacer -->
      <view style="height: 100px;"></view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getBackendImageUrl } from '@/utils/helpers.js'

const favorites = ref([])

// Load favorites list
const loadFavorites = () => {
  const data = uni.getStorageSync('favorites') || []
  favorites.value = Array.isArray(data) ? data : []
}

// Format time
const formatTime = (timestamp) => {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now - date

  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour

  if (diff < minute) {
    return '刚刚'
  } else if (diff < hour) {
    return Math.floor(diff / minute) + '分钟前'
  } else if (diff < day) {
    return Math.floor(diff / hour) + '小时前'
  } else if (diff < 7 * day) {
    return Math.floor(diff / day) + '天前'
  } else {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }
}

// View detail
const viewDetail = (item) => {
  uni.navigateTo({
    url: `/pages/snake-detail/snake-detail?snakeName=${encodeURIComponent(item.snakeName)}`
  })
}

// Remove single favorite
const removeFavorite = (index) => {
  uni.showModal({
    title: '确认移除',
    content: `确定要移除"${favorites.value[index].snakeName}"吗？`,
    success: (res) => {
      if (res.confirm) {
        favorites.value.splice(index, 1)
        uni.setStorageSync('favorites', favorites.value)
        uni.showToast({
          title: '已移除',
          icon: 'success'
        })
        updateProfileStats()
      }
    }
  })
}

// Clear all favorites
const clearAll = () => {
  uni.showModal({
    title: '确认清空',
    content: '确定要清空所有收藏吗？此操作不可恢复！',
    confirmColor: '#ef4444',
    success: (res) => {
      if (res.confirm) {
        favorites.value = []
        uni.removeStorageSync('favorites')
        uni.showToast({
          title: '已清空',
          icon: 'success'
        })
        updateProfileStats()
      }
    }
  })
}

// Notify profile page to update stats
const updateProfileStats = () => {
  uni.$emit('updateStats')
}

// Go back
const goBack = () => {
  uni.navigateBack()
}

// Navigate to exhibition (NOT a tabBar page)
const goToExhibition = () => {
  uni.navigateTo({
    url: '/pages/exhibition/exhibition'
  })
}

onLoad(() => {
  loadFavorites()
})

onMounted(() => {
  loadFavorites()
})
</script>

<style lang="scss" scoped>
.favorites-container {
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

.clear-btn {
  font-size: 14px;
  color: #ef4444;
  padding: 0 10px;
}

/* Main content */
.main-content {
  height: calc(100vh - 60px);
}

/* Empty state */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
}

.empty-icon {
  font-size: 80px;
  margin-bottom: 20px;
}

.empty-title {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.empty-subtitle {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 30px;
}

.explore-btn {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: none;
  border-radius: 24px;
  padding: 12px 40px;
  font-size: 16px;
  font-weight: 600;
}

/* Favorites list */
.favorites-list {
  padding: 15px;
}

.favorite-item {
  background: white;
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  gap: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
}

.favorite-item:active {
  transform: scale(0.98);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.snake-image {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}

.snake-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.snake-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.snake-name {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
}

.remove-btn {
  font-size: 18px;
  color: #94a3b8;
  padding: 0 8px;
}

.remove-btn:active {
  color: #ef4444;
}

.snake-alias {
  font-size: 13px;
  color: #64748b;
}

.snake-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tag {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 500;
}

.venom-tag {
  background: #fee2e2;
  color: #dc2626;
}

.region-tag {
  background: #dbeafe;
  color: #1d4ed8;
}

.collect-time {
  font-size: 12px;
  color: #94a3b8;
  margin-top: auto;
}
</style>

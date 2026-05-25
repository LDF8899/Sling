<template>
  <view class="exhibition-container">
    <!-- Top navbar -->
    <view class="navbar glass-effect">
      <view class="navbar-content">
        <view class="navbar-left" @click="goBack">
          <text class="back-icon">‹</text>
        </view>
        <text class="navbar-title">📖 科普展览</text>
      </view>
    </view>

    <!-- Main content -->
    <scroll-view class="main-content" scroll-y enhanced show-scrollbar>
      <!-- Search bar -->
      <view class="search-section">
        <view class="search-input-wrapper">
          <text class="search-icon">🔍</text>
          <input
            class="search-input"
            type="text"
            placeholder="搜索蛇类学名或别名"
            v-model="searchKeyword"
            @confirm="handleSearch"
          />
          <text class="search-clear" @click="clearSearch" v-if="searchKeyword">✕</text>
        </view>
      </view>

      <!-- Exhibition list -->
      <view class="exhibition-list">
        <view
          class="snake-card glass-card"
          v-for="(snake, index) in displaySnakes"
          :key="snake.id"
          @click="viewDetail(snake)"
        >
          <image
            class="snake-image"
            :src="getBackendImageUrl(snake.imageUrl) || '/static/banner/banner1.jpg'"
            mode="aspectFill"
            lazy-load
          />
          <view class="snake-info">
            <view class="snake-header">
              <text class="snake-name">{{ snake.snakeName }}</text>
              <text class="snake-alias">{{ snake.alias }}</text>
            </view>
            <view class="snake-tags">
              <text class="tag venom-tag" :class="getVenomClass(snake.venomType)">
                {{ getVenomText(snake.venomType) }}
              </text>
              <text class="tag region-tag">
                {{ snake.distribution || '全国' }}
              </text>
            </view>
            <view class="snake-desc">
              {{ snake.symptomDescription || '暂无详细描述' }}
            </view>
          </view>
        </view>
      </view>

      <!-- Empty state -->
      <view class="empty-state" v-if="displaySnakes.length === 0 && !loading">
        <text class="empty-icon">📚</text>
        <text class="empty-text">暂无展览内容</text>
      </view>

      <!-- Load more -->
      <view class="load-more" v-if="hasMore && !loading">
        <text class="load-text">加载更多...</text>
      </view>

      <!-- Paginator -->
      <view class="pagination" v-if="totalPages > 1">
        <view class="pagination-btn"
          :class="{ disabled: currentPage === 1 }"
          @click="prevPage">
          <text>‹ 上一页</text>
        </view>
        <view class="page-numbers">
          <view
            class="page-number"
            :class="{ active: page === currentPage }"
            v-for="page in displayPages"
            :key="page"
            @click="goToPage(page)"
          >
            {{ page }}
          </view>
        </view>
        <view class="pagination-btn"
          :class="{ disabled: currentPage === totalPages }"
          @click="nextPage">
          <text>下一页 ›</text>
        </view>
      </view>

      <!-- Bottom spacer -->
      <view style="height: 80px;"></view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/utils/api'
import { getBackendImageUrl } from '@/utils/helpers.js'

const searchKeyword = ref('')
const allSnakes = ref([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(8)

// Computed
const displaySnakes = computed(() => {
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    return allSnakes.value.filter(snake =>
      snake.snakeName.toLowerCase().includes(keyword) ||
      (snake.alias && snake.alias.toLowerCase().includes(keyword))
    )
  }

  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return allSnakes.value.slice(start, end)
})

const hasMore = computed(() => {
  return currentPage.value * pageSize.value < allSnakes.value.length
})

const totalPages = computed(() => {
  return Math.ceil(allSnakes.value.length / pageSize.value)
})

const displayPages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - 1 && i <= current + 1)) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...')
    }
  }

  return pages
})

// Methods
const loadAllSnakes = async () => {
  loading.value = true
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
      allSnakes.value = snakeList
    } else {
      throw new Error('返回数据为空')
    }
  } catch (error) {
    console.error('加载数据失败:', error)
    // Use sample data as fallback
    allSnakes.value = [
      { id: 1, snakeName: '银环蛇', alias: '金钱白花蛇', venomType: '神经毒', distribution: '华南地区', symptomDescription: '神经毒素，咬伤后出现眼睑下垂、吞咽困难等症状', imageUrl: '' },
      { id: 2, snakeName: '金环蛇', alias: '金脚带', venomType: '神经毒', distribution: '华南地区', symptomDescription: '神经毒素，症状与银环蛇相似', imageUrl: '' },
      { id: 3, snakeName: '竹叶青', alias: '青竹蛇', venomType: '血循毒', distribution: '长江以南', symptomDescription: '血循毒素，咬伤处剧烈疼痛、肿胀', imageUrl: '' },
      { id: 4, snakeName: '蝮蛇', alias: '土虺蛇', venomType: '混合毒', distribution: '全国各地', symptomDescription: '混合毒素，兼有神经毒和血循毒症状', imageUrl: '' },
      { id: 5, snakeName: '眼镜蛇', alias: '饭铲头', venomType: '混合毒', distribution: '南方地区', symptomDescription: '混合毒素，咬伤后组织坏死严重', imageUrl: '' },
      { id: 6, snakeName: '眼镜王蛇', alias: '过山风', venomType: '混合毒', distribution: '西南地区', symptomDescription: '剧毒，排毒量大，危险性极高', imageUrl: '' },
      { id: 7, snakeName: '五步蛇', alias: '尖吻蝮', venomType: '血循毒', distribution: '南方山区', symptomDescription: '血循毒素，出血不止，组织坏死', imageUrl: '' },
      { id: 8, snakeName: '烙铁头蛇', alias: '龟壳花', venomType: '血循毒', distribution: '南方地区', symptomDescription: '血循毒素，咬伤处剧痛、水疱', imageUrl: '' },
      { id: 9, snakeName: '海蛇', alias: '青灰海蛇', venomType: '神经毒', distribution: '沿海地区', symptomDescription: '神经毒素，肌肉麻痹、呼吸困难', imageUrl: '' },
      { id: 10, snakeName: '蝰蛇', alias: '圆斑蝰', venomType: '血循毒', distribution: '南方地区', symptomDescription: '血循毒素，凝血功能障碍', imageUrl: '' }
    ]
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  currentPage.value = 1
  uni.showToast({
    title: `找到 ${displaySnakes.value.length} 条结果`,
    icon: 'none'
  })
}

const clearSearch = () => {
  searchKeyword.value = ''
  currentPage.value = 1
}

const viewDetail = (snake) => {
  uni.navigateTo({
    url: `/pages/snake-detail/snake-detail?snakeName=${encodeURIComponent(snake.snakeName)}`
  })
}

const goBack = () => {
  uni.navigateBack()
}

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

// Pagination
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page) => {
  if (typeof page === 'number' && page !== currentPage.value) {
    currentPage.value = page
  }
}

onMounted(() => {
  loadAllSnakes()
})
</script>

<style lang="scss" scoped>
.exhibition-container {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
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
  align-items: center;
  justify-content: center;
  position: relative;
}

.navbar-left {
  position: absolute;
  left: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;

  &:active {
    background: rgba(0, 0, 0, 0.1);
    transform: scale(0.9);
  }
}

.back-icon {
  font-size: 24px;
  color: #1e293b;
  font-weight: bold;
  line-height: 1;
}

.navbar-title {
  font-size: 18px;
  font-weight: bold;
  color: #1e293b;
}

/* Main content */
.main-content {
  height: calc(100vh - 60px);
  padding: 15px;
}

/* Search bar */
.search-section {
  margin-bottom: 20px;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 24px;
  padding: 10px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.search-icon {
  font-size: 16px;
  margin-right: 8px;
}

.search-input {
  flex: 1;
  font-size: 14px;
  border: none;
  outline: none;
  background: transparent;
}

.search-clear {
  font-size: 14px;
  color: #94a3b8;
  padding: 4px 8px;
}

/* Exhibition list */
.exhibition-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.snake-card {
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
  height: 140px;
  background: #f1f5f9;
}

.snake-info {
  padding: 12px;
}

.snake-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 8px;
}

.snake-name {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
}

.snake-alias {
  font-size: 12px;
  color: #64748b;
}

.snake-tags {
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
}

.tag {
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 12px;
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

.snake-desc {
  font-size: 12px;
  color: #64748b;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Empty state */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.empty-text {
  font-size: 14px;
  color: #94a3b8;
}

/* Load more */
.load-more {
  text-align: center;
  padding: 20px;
}

.load-text {
  font-size: 13px;
  color: #64748b;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  margin-top: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.pagination-btn {
  padding: 8px 16px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;

  &.disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}

.page-numbers {
  display: flex;
  gap: 6px;
}

.page-number {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f5f9;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  color: #64748b;

  &.active {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
  }
}
</style>

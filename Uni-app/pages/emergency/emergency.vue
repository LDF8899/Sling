<template>
  <view class="emergency-container">
    <!-- Top navbar -->
    <GlassNavbar
      title="🚑 应急处理"
      subtitle="伤口分析 | 问题咨询 | 学名查询"
    />

    <!-- Main content -->
    <scroll-view scroll-y class="main-content">
      <!-- Mode selector -->
      <view class="mode-selector glass-card">
        <view class="mode-tabs">
          <view
            class="mode-tab"
            :class="{ 'active': activeMode === 'image' }"
            @click="switchMode('image')"
          >
            <text class="mode-icon">📷</text>
            <text class="mode-text">图片识别</text>
          </view>
          <view
            class="mode-tab"
            :class="{ 'active': activeMode === 'question' }"
            @click="switchMode('question')"
          >
            <text class="mode-icon">💬</text>
            <text class="mode-text">问题咨询</text>
          </view>
          <view
            class="mode-tab"
            :class="{ 'active': activeMode === 'name' }"
            @click="switchMode('name')"
          >
            <text class="mode-icon">📖</text>
            <text class="mode-text">学名查询</text>
          </view>
        </view>
      </view>

      <!-- Image recognition mode -->
      <view class="mode-content glass-card" v-if="activeMode === 'image'">
        <view class="card-header">
          <view class="header-icon upload-icon">🤕</view>
          <view class="header-content">
            <text class="header-title">伤口图片分析</text>
            <text class="header-subtitle">上传伤口图片，AI 智能分析蛇类</text>
          </view>
        </view>

        <view class="upload-section">
          <view class="upload-area" @click="chooseImage">
            <view class="upload-content" v-if="!uploadedImage">
              <view class="upload-icon-wrapper">
                <text class="upload-icon">🖼️</text>
                <view class="upload-icon-halo"></view>
              </view>
              <text class="upload-title">点击选择伤口图片</text>
              <text class="upload-subtitle">拍照或从相册选择</text>
              <view class="upload-hints">
                <view class="hint-item">
                  <text>📸</text>
                  <text>支持 JPG/PNG</text>
                </view>
                <view class="hint-item">
                  <text>⚡</text>
                  <text>快速分析</text>
                </view>
                <view class="hint-item">
                  <text>🔍</text>
                  <text>智能识别</text>
                </view>
              </view>
            </view>

            <view class="image-preview" v-else>
              <view class="preview-container">
                <image :src="uploadedImage" mode="aspectFill" class="preview-img"></image>
              </view>
              <view class="file-info">
                <text>原始：{{ formatFileSize(rawFileSize) }}</text>
                <text>→</text>
                <text>压缩：{{ formatFileSize(compressedFileSize) }}</text>
              </view>
              <view class="preview-actions">
                <view class="action-btn" @click.stop="retakePhoto">🔄 重选</view>
                <view
                  class="action-btn primary"
                  :class="{ 'loading': analyzing }"
                  @click.stop="analyzeImage"
                >
                  <text v-if="analyzing">⏳ 分析中...</text>
                  <text v-else>🔬 开始分析</text>
                </view>
              </view>
            </view>
          </view>
        </view>

        <!-- Analysis result -->
        <view class="analysis-result glass-card" v-if="analysisResult || analyzing">
          <view class="card-header">
            <view class="header-icon result-icon">📄</view>
            <view class="header-content">
              <text class="header-title">分析结果</text>
              <text class="header-subtitle">查看详细分析信息</text>
            </view>
            <view class="header-badge" v-if="analysisTime && !analyzing">
              <view class="time-tag">⏱️ {{ analysisTime }}s</view>
            </view>
          </view>

          <view class="result-container">
            <!-- Loading -->
            <LoadingSpinner
              v-if="analyzing"
              :progress="analysisProgress"
              title="AI 正在分析中..."
              subtitle="请稍候，系统正在分析伤口图片"
              color="#ef4444"
            />

            <!-- Analysis result -->
            <view class="result-success-card" v-else-if="analysisResult">
              <view class="result-success-header">
                <view class="success-indicator">
                  <text>✅</text>
                  <text>分析成功</text>
                </view>
                <view class="result-meta">
                  <view class="meta-item">
                    <text>⏱️</text>
                    <text>{{ analysisTime }}s</text>
                  </view>
                  <view class="meta-item">
                    <text>🤖</text>
                    <text>AI 分析</text>
                  </view>
                </view>
              </view>

              <view class="markdown-content" v-html="formattedAnalysisResult"></view>

              <view class="result-actions">
                <view class="result-action-btn danger" @click="findMedicalCare">
                  🏥 附近可救治医院
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- Question mode -->
      <view class="mode-content glass-card" v-if="activeMode === 'question'">
        <view class="card-header">
          <view class="header-icon question-icon">💬</view>
          <view class="header-content">
            <text class="header-title">问题咨询</text>
            <text class="header-subtitle">输入问题获取应急处理建议</text>
          </view>
        </view>

        <view class="question-section">
          <view class="question-input-wrapper">
            <textarea
              class="question-input"
              v-model="userQuestion"
              placeholder="请输入您的问题，例如：被眼镜蛇咬了怎么办？"
              maxlength="500"
              :auto-height="true"
            />
          </view>

          <view
            class="ask-btn"
            :class="{ 'disabled': !userQuestion || asking }"
            @click="submitQuestion"
          >
            <text v-if="asking">⏳ 获取答案中...</text>
            <text v-else>💡 获取应急建议</text>
          </view>
        </view>

        <!-- History -->
        <view class="history-section" v-if="questionHistory.length > 0">
          <view class="history-header">
            <text class="history-title">📜 历史记录</text>
            <text class="clear-btn" @click="clearQuestionHistory">🗑️ 清除记录</text>
          </view>
          <view class="history-list">
            <view
              class="history-item"
              v-for="(record, index) in questionHistory"
              :key="index"
              @click="toggleHistoryItem(index)"
            >
              <view class="history-question">
                <text class="question-text">{{ record.question }}</text>
                <text class="toggle-icon">{{ expandedHistory === index ? '▲' : '▼' }}</text>
              </view>
              <view class="history-answer" v-if="expandedHistory === index">
                <text>{{ record.answer }}</text>
              </view>
            </view>
          </view>
        </view>

        <!-- Answer result -->
        <view class="answer-result glass-card" v-if="answerResult">
          <view class="card-header">
            <view class="header-icon answer-icon">📋</view>
            <view class="header-content">
              <text class="header-title">应急处理建议</text>
            </view>
          </view>
          <view class="answer-content">
            <text class="answer-text">{{ answerResult }}</text>
          </view>
          <view class="answer-actions">
            <view class="action-btn small" @click="saveAnswer">💾 保存</view>
            <view class="action-btn small" @click="shareAnswer">📤 分享</view>
          </view>
        </view>
      </view>

      <!-- Name query mode -->
      <view class="mode-content glass-card" v-if="activeMode === 'name'">
        <view class="card-header">
          <view class="header-icon name-icon">📖</view>
          <view class="header-content">
            <text class="header-title">学名查询</text>
            <text class="header-subtitle">输入已知蛇类学名查询应急指南</text>
          </view>
        </view>

        <view class="name-query-section">
          <view class="search-input-wrapper">
            <input
              class="search-input"
              v-model="snakeName"
              placeholder="请输入蛇类学名，如：眼镜蛇"
              @confirm="queryByName"
            />
          </view>

          <view class="search-btn-wrapper">
            <view
              class="search-btn"
              :class="{ 'disabled': !snakeName || querying }"
              @click="queryByName"
            >
              <text v-if="querying">⏳ 查询中...</text>
              <text v-else>🔍 查询</text>
            </view>
          </view>

          <!-- Auto-suggestions -->
          <view class="suggestions" v-if="suggestions.length > 0">
            <view class="suggestion-tags">
              <view
                class="suggestion-tag"
                v-for="suggestion in suggestions"
                :key="suggestion"
                @click="selectSuggestion(suggestion)"
              >
                {{ suggestion }}
              </view>
            </view>
          </view>

          <!-- History -->
          <view class="history-section" v-if="nameHistoryRecords.length > 0">
            <view class="history-header">
              <text class="history-title">📜 历史记录</text>
              <text class="clear-btn" @click="clearNameHistory">🗑️ 清除记录</text>
            </view>
            <view class="history-tags">
              <view
                class="history-tag"
                v-for="record in nameHistoryRecords"
                :key="record.timestamp"
                @click="selectHistory(record)"
              >
                {{ record.snakeName }}
              </view>
            </view>
          </view>
        </view>

        <!-- Emergency guide result -->
        <view class="emergency-guide glass-card" v-if="emergencyGuide">
          <view class="card-header">
            <view class="header-icon guide-icon">📊</view>
            <view class="header-content">
              <text class="header-title">{{ emergencyGuide.snakeName }} 应急指南</text>
            </view>
          </view>

          <view class="guide-content">
            <!-- Snake images -->
            <view class="image-container" v-if="snakeImages && snakeImages.length > 0">
              <view class="image-grid">
                <image
                  v-for="(img, index) in snakeImages"
                  :key="index"
                  :src="img"
                  mode="aspectFill"
                  class="snake-image-display"
                  @load="handleImageLoad(index)"
                  @error="handleImageError(index)"
                />
              </view>
              <view class="image-hint">💡 点击图片可放大查看</view>
            </view>

            <view class="image-fallback" v-else-if="!hasValidImages && imageLoadFailed">
              <text class="fallback-text">🖼️ 暂无图片</text>
              <text class="fallback-subtext">该蛇类的图片资源暂不可用</text>
            </view>

            <view class="guide-info-grid">
              <view class="info-item">
                <text class="info-label">毒液类型</text>
                <text class="info-value">{{ emergencyGuide.venomType || '未知' }}</text>
              </view>
              <view class="info-item">
                <text class="info-label">别名</text>
                <text class="info-value">{{ emergencyGuide.snakeAlias || '无' }}</text>
              </view>
            </view>

            <view class="guide-section">
              <text class="section-title">典型症状</text>
              <text class="section-content">{{ emergencyGuide.symptomDescription || '暂无描述' }}</text>
            </view>

            <view class="guide-section">
              <text class="section-title">紧急处理</text>
              <text class="section-content highlight">{{ emergencyGuide.emergencyTreatment || '暂无描述' }}</text>
            </view>

            <view class="guide-section">
              <text class="section-title">医疗注意</text>
              <text class="section-content">{{ emergencyGuide.medicalAttention || '暂无描述' }}</text>
            </view>
          </view>

          <view class="guide-actions">
            <view class="action-btn" @click="saveGuide">💾 保存指南</view>
            <view class="action-btn" @click="printGuide">🖨️ 打印指南</view>
          </view>
        </view>

        <!-- Error message -->
        <view class="error-message" v-if="errorMessage">
          <text class="error-icon">⚠️</text>
          <text class="error-text">{{ errorMessage }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { emergencyApi } from '@/utils/api.js'
import { getBackendImageUrl, formatFileSize } from '@/utils/helpers.js'
import GlassNavbar from '@/components/GlassNavbar.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

// Reactive data
const activeMode = ref('image')
const userQuestion = ref('')
const asking = ref(false)
const answerResult = ref('')
const emergencyGuide = ref(null)
const snakeName = ref('')
const suggestions = ref([])
const errorMessage = ref('')
const nameHistoryRecords = ref([])
const questionHistory = ref([])
const expandedHistory = ref(null)
const querying = ref(false)
const snakeImages = ref([])
const imageLoadStatus = ref([])
const hasValidImages = ref(false)
const imageLoadFailed = ref(false)

// Image upload related
const uploadedImage = ref(null)
const uploadedImageFile = ref(null)
const rawFileSize = ref(0)
const compressedFileSize = ref(0)
const analyzing = ref(false)
const analysisResult = ref('')
const analysisTime = ref(0)
const analysisProgress = ref(0)
const progressTimer = ref(null)

// Common snake names for suggestions
const commonSnakeNames = [
  '银环蛇', '金环蛇', '竹叶青', '蝮蛇', '五步蛇',
  '眼镜蛇', '眼镜王蛇', '蝰蛇', '烙铁头蛇', '白唇竹叶青'
]

// Computed - formatted analysis result
const formattedAnalysisResult = computed(() => {
  if (!analysisResult.value) return ''

  return analysisResult.value
    .replace(/### (.*?)/g, '<h3>$1</h3>')
    .replace(/## (.*?)/g, '<h2>$1</h2>')
    .replace(/# (.*?)/g, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>')
})

// Methods
const switchMode = (mode) => {
  activeMode.value = mode
  clearResults()
}

const startProgressSimulation = () => {
  analysisProgress.value = 0
  progressTimer.value = setInterval(() => {
    if (analysisProgress.value < 90) {
      analysisProgress.value += Math.random() * 10
      if (analysisProgress.value > 90) {
        analysisProgress.value = 90
      }
    }
  }, 500)
}

// Image recognition methods
const chooseImage = async () => {
  try {
    const res = await uni.chooseImage({
      count: 1,
      sourceType: ['album', 'camera'],
      sizeType: ['compressed']
    })

    const tempFilePath = res.tempFilePaths[0]
    const tempFileSize = res.tempFiles[0].size

    rawFileSize.value = tempFileSize

    const imageInfo = await uni.getImageInfo({
      src: tempFilePath
    })

    compressImage(tempFilePath, imageInfo.width, imageInfo.height)
  } catch (error) {
    console.error('选择图片失败:', error)
    uni.showToast({
      title: '选择图片失败',
      icon: 'none'
    })
  }
}

const compressImage = (filePath, originalWidth, originalHeight) => {
  let width = originalWidth
  let height = originalHeight

  const maxWidth = 1920
  const maxHeight = 1080

  if (width > maxWidth) {
    height = height * (maxWidth / width)
    width = maxWidth
  }
  if (height > maxHeight) {
    width = width * (maxHeight / height)
    height = maxHeight
  }

  let quality = 0.8
  if (rawFileSize.value > 5 * 1024 * 1024) {
    quality = 0.6
  }
  if (rawFileSize.value > 10 * 1024 * 1024) {
    quality = 0.4
  }

  uni.compressImage({
    src: filePath,
    quality: quality * 100,
    success: (res) => {
      const compressedTempFilePath = res.tempFilePath

      uni.getFileInfo({
        filePath: compressedTempFilePath,
        success: (fileInfoRes) => {
          compressedFileSize.value = fileInfoRes.size
          uploadedImage.value = compressedTempFilePath
          uploadedImageFile.value = compressedTempFilePath

          uni.showToast({
            title: '图片已准备就绪',
            icon: 'success'
          })
        }
      })
    },
    fail: () => {
      uploadedImage.value = filePath
      uploadedImageFile.value = filePath
      compressedFileSize.value = rawFileSize.value

      uni.showToast({
        title: '使用原图',
        icon: 'none'
      })
    }
  })
}

const retakePhoto = () => {
  uploadedImage.value = null
  uploadedImageFile.value = null
  rawFileSize.value = 0
  compressedFileSize.value = 0
  analysisResult.value = ''
  analysisTime.value = 0
}

const analyzeImage = async () => {
  if (!uploadedImage.value) {
    uni.showToast({
      title: '请先选择图片',
      icon: 'none'
    })
    return
  }

  analyzing.value = true
  startProgressSimulation()
  const startTime = Date.now()

  try {
    const response = await emergencyApi.analyzeWoundImage(uploadedImageFile.value)

    analysisTime.value = ((Date.now() - startTime) / 1000).toFixed(1)

    if (response && response.data) {
      analysisResult.value = response.data
    } else {
      analysisResult.value = '### 分析完成\n未能获取有效分析结果，请重试。'
    }

    uni.showToast({
      title: '分析完成',
      icon: 'success'
    })
  } catch (error) {
    console.error('分析失败:', error)
    let errorMsg = '分析失败'
    if (error.message && error.message.includes('timeout')) {
      errorMsg = '分析请求超时，请检查网络'
    } else if (error.message) {
      errorMsg += ': ' + error.message
    }

    uni.showToast({
      title: errorMsg,
      icon: 'none',
      duration: 3000
    })
  } finally {
    analyzing.value = false
    analysisProgress.value = 100

    if (progressTimer.value) {
      clearInterval(progressTimer.value)
      progressTimer.value = null
    }

    setTimeout(() => {
      analysisProgress.value = 0
    }, 1000)
  }
}

const findMedicalCare = () => {
  uni.switchTab({
    url: '/pages/hospital/hospital'
  })
}

// Question methods
const submitQuestion = async () => {
  if (!userQuestion.value.trim()) {
    uni.showToast({
      title: '请输入问题',
      icon: 'none'
    })
    return
  }

  asking.value = true

  try {
    const response = await emergencyApi.askEmergencyQuestion({
      question: userQuestion.value
    })

    if (response && response.data) {
      answerResult.value = response.data
      saveQuestionToHistory(userQuestion.value, response.data)

      uni.showToast({
        title: '获取答案成功',
        icon: 'success'
      })
    } else {
      answerResult.value = '未能获取有效答案，请重试。'
    }
  } catch (error) {
    console.error('获取答案失败:', error)
    uni.showToast({
      title: '获取答案失败：' + (error.message || '未知错误'),
      icon: 'none',
      duration: 3000
    })
  } finally {
    asking.value = false
  }
}

const saveQuestionToHistory = (question, answer) => {
  const record = {
    question,
    answer,
    timestamp: new Date().getTime()
  }

  questionHistory.value.unshift(record)

  if (questionHistory.value.length > 10) {
    questionHistory.value = questionHistory.value.slice(0, 10)
  }

  try {
    uni.setStorageSync('emergency_question_history', JSON.stringify(questionHistory.value))
  } catch (e) {
    console.error('保存历史记录失败:', e)
  }
}

const toggleHistoryItem = (index) => {
  expandedHistory.value = expandedHistory.value === index ? null : index
}

const clearQuestionHistory = () => {
  questionHistory.value = []
  try {
    uni.removeStorageSync('emergency_question_history')
    uni.showToast({
      title: '已清除历史记录',
      icon: 'success'
    })
  } catch (e) {
    console.error('清除历史记录失败:', e)
  }
}

const saveAnswer = () => {
  uni.showToast({ title: '保存功能开发中', icon: 'none' })
}

const shareAnswer = () => {
  uni.showToast({ title: '分享功能开发中', icon: 'none' })
}

// Name query methods
const queryByName = async (forceRefresh = false) => {
  if (!snakeName.value.trim()) {
    uni.showToast({
      title: '请输入蛇类学名',
      icon: 'none'
    })
    return
  }

  querying.value = true
  errorMessage.value = ''

  if (forceRefresh) {
    snakeImages.value = []
    emergencyGuide.value = null
  } else {
    snakeImages.value = []
  }

  try {
    const response = await emergencyApi.getEmergencyGuideByName(snakeName.value)

    if (response && response.data) {
      emergencyGuide.value = response.data
      saveNameToHistory(snakeName.value)
      processSnakeImages(response.data)

      uni.showToast({
        title: '查询成功',
        icon: 'success'
      })
    } else {
      errorMessage.value = `未找到${snakeName.value}的相关信息`
    }
  } catch (error) {
    console.error('查询失败:', error)
    errorMessage.value = '查询失败：' + (error.message || '未知错误')
    uni.showToast({
      title: errorMessage.value,
      icon: 'none',
      duration: 3000
    })
  } finally {
    querying.value = false
  }
}

// Process snake images
const processSnakeImages = (data) => {
  const images = []

  // 1. Use imageUrls array
  if (data.imageUrls && Array.isArray(data.imageUrls)) {
    data.imageUrls.forEach((url, index) => {
      if (url) {
        images.push(getBackendImageUrl(url))
      } else {
        images.push(null)
      }
    })
  }

  // 2. Fallback to imageUrl field
  let validImages = images.filter(img => img !== null)
  if (validImages.length === 0 && data.imageUrl) {
    const baseName = data.imageUrl.replace(/(_\d+)?\.\w+$/, '')
    for (let i = 1; i <= 3; i++) {
      const genUrl = `${baseName}_${i}.jpg`
      images.push(getBackendImageUrl(genUrl))
    }
  }

  // 3. Generate from snake name
  validImages = images.filter(img => img !== null)
  if (validImages.length === 0 && data.snakeName) {
    for (let i = 1; i <= 3; i++) {
      const genUrl = `${data.snakeName}_${i}.jpg`
      images.push(getBackendImageUrl(genUrl))
    }
  }

  // 4. Full URL list
  if (images.length === 0 && data.images && Array.isArray(data.images)) {
    data.images.forEach(url => {
      if (url) {
        images.push(getBackendImageUrl(url))
      }
    })
  }

  snakeImages.value = images
  imageLoadStatus.value = new Array(images.length).fill(false)
}

// Image load handlers
const handleImageLoad = (index) => {
  imageLoadStatus.value[index] = true
  hasValidImages.value = true
  imageLoadFailed.value = false
}

const handleImageError = (index) => {
  imageLoadStatus.value[index] = false

  // Check if all images failed
  const allFailed = imageLoadStatus.value.every(status => status === false)
  if (allFailed && snakeImages.value.length > 0) {
    hasValidImages.value = false
    imageLoadFailed.value = true
  }
}

const selectSuggestion = (suggestion) => {
  snakeName.value = suggestion
  suggestions.value = []
  queryByName()
}

const saveNameToHistory = (name) => {
  const record = {
    snakeName: name,
    timestamp: new Date().getTime()
  }

  const exists = nameHistoryRecords.value.some(r => r.snakeName === name)
  if (!exists) {
    nameHistoryRecords.value.unshift(record)

    if (nameHistoryRecords.value.length > 10) {
      nameHistoryRecords.value = nameHistoryRecords.value.slice(0, 10)
    }

    try {
      uni.setStorageSync('emergency_name_history', JSON.stringify(nameHistoryRecords.value))
    } catch (e) {
      console.error('保存历史记录失败:', e)
    }
  }
}

const selectHistory = (record) => {
  snakeName.value = record.snakeName
  queryByName(true)
}

const clearNameHistory = () => {
  nameHistoryRecords.value = []
  try {
    uni.removeStorageSync('emergency_name_history')
    uni.showToast({ title: '已清除历史记录', icon: 'success' })
  } catch (e) {
    console.error('清除历史记录失败:', e)
  }
}

const saveGuide = () => {
  uni.showToast({ title: '保存功能开发中', icon: 'none' })
}

const printGuide = () => {
  uni.showToast({ title: '打印功能开发中', icon: 'none' })
}

// Clear results
const clearResults = () => {
  answerResult.value = ''
  emergencyGuide.value = null
  snakeName.value = ''
  suggestions.value = []
  errorMessage.value = ''
  userQuestion.value = ''
  snakeImages.value = []
  imageLoadStatus.value = []
  hasValidImages.value = false
  imageLoadFailed.value = false

  uploadedImage.value = null
  uploadedImageFile.value = null
  rawFileSize.value = 0
  compressedFileSize.value = 0
  analysisResult.value = ''
  analysisTime.value = 0
}

// Load history
const loadHistory = () => {
  try {
    const history = uni.getStorageSync('emergency_name_history')
    if (history) {
      nameHistoryRecords.value = JSON.parse(history)
    }

    const questionHistoryStr = uni.getStorageSync('emergency_question_history')
    if (questionHistoryStr) {
      questionHistory.value = JSON.parse(questionHistoryStr)
    }
  } catch (e) {
    console.error('加载历史记录失败:', e)
  }
}

// Lifecycle
onUnmounted(() => {
  if (progressTimer.value) {
    clearInterval(progressTimer.value)
  }
})

loadHistory()
</script>

<style lang="scss" scoped>
.emergency-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
}

/* Main content */
.main-content {
  padding-top: 110px;
  padding-bottom: 40px;
}

/* Glass card */
.glass-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  margin: 0 16px 20px;
  animation: fadeInUp 0.6s ease-out;
}

/* Mode selector */
.mode-selector {
  margin: 0 16px 20px;
}

.mode-tabs {
  display: flex;
  gap: 12px;
  padding: 16px;
}

.mode-tab {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.mode-tab:active {
  transform: scale(0.95);
}

.mode-tab.active {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.mode-icon {
  font-size: 24px;
}

.mode-text {
  font-size: 13px;
  font-weight: 500;
}

/* Card header */
.card-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px 24px 0;
}

.header-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
}

.upload-icon { background: linear-gradient(135deg, #ef4444, #dc2626); }
.result-icon { background: linear-gradient(135deg, #10b981, #059669); }
.question-icon { background: linear-gradient(135deg, #3b82f6, #2563eb); }
.name-icon { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }
.answer-icon { background: linear-gradient(135deg, #10b981, #059669); }
.guide-icon { background: linear-gradient(135deg, #f59e0b, #d97706); }

.header-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.header-title {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
}

.header-subtitle {
  font-size: 12px;
  color: #64748b;
}

.header-badge { flex-shrink: 0; }

.time-tag {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

/* Upload area */
.upload-section { padding: 24px; }

.upload-area {
  border: 2px dashed rgba(239, 68, 68, 0.3);
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  transition: all 0.3s ease;
  background: rgba(248, 250, 252, 0.8);
  position: relative;
  overflow: hidden;
}

.upload-area:active {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.05);
  transform: scale(0.98);
}

.upload-icon-wrapper {
  position: relative;
  margin-bottom: 20px;
}

.upload-icon {
  font-size: 48px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
}

.upload-icon-halo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(239, 68, 68, 0.1) 0%, transparent 70%);
  animation: pulse 2s infinite;
}

.upload-title {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  display: block;
  margin-bottom: 8px;
}

.upload-subtitle {
  color: #64748b;
  font-size: 13px;
  display: block;
  margin-bottom: 24px;
}

.upload-hints {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.hint-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  font-size: 12px;
  color: #64748b;
}

/* Image preview */
.image-preview {
  animation: fadeIn 0.5s ease-out;
}

.preview-container {
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.file-info {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #64748b;
  margin-bottom: 16px;
}

.preview-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.action-btn {
  flex: 1;
  padding: 12px 0;
  border-radius: 12px;
  font-weight: 500;
  font-size: 15px;
  background: rgba(248, 250, 252, 0.8);
  color: #1e293b;
  text-align: center;
  transition: all 0.3s ease;
}

.action-btn:active { transform: scale(0.95); }
.action-btn.primary { background: linear-gradient(135deg, #ef4444, #dc2626); color: white; }
.action-btn.danger { background: linear-gradient(135deg, #ef4444, #dc2626); color: white; }
.action-btn.small { padding: 8px 16px; font-size: 13px; }
.action-btn.loading { opacity: 0.7; }

/* Result container */
.result-container { padding: 24px; }

/* Analysis result card */
.result-success-card {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.05), rgba(239, 68, 68, 0.1));
  border-radius: 16px;
  padding: 20px;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.result-success-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(239, 68, 68, 0.2);
}

.success-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #ef4444;
}

.result-meta { display: flex; gap: 12px; }

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #64748b;
  padding: 4px 10px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 6px;
}

.markdown-content {
  background: white;
  border-radius: 12px;
  padding: 16px;
  line-height: 1.8;
  font-size: 14px;
  color: #334155;
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 16px;
}

.result-actions {
  padding-top: 16px;
  border-top: 1px solid rgba(239, 68, 68, 0.2);
}

.result-action-btn {
  width: 100%;
  padding: 10px 0;
  border-radius: 10px;
  font-weight: 500;
  font-size: 14px;
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  text-align: center;
  transition: all 0.3s ease;
}

.result-action-btn:active {
  transform: scale(0.95);
  background: rgba(239, 68, 68, 0.2);
}

/* Question section */
.question-section { padding: 24px; }

.question-input-wrapper { margin-bottom: 16px; }

.question-input {
  width: 100%;
  min-height: 100px;
  padding: 12px;
  background: rgba(248, 250, 252, 0.8);
  border-radius: 12px;
  font-size: 14px;
  color: #1e293b;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.ask-btn {
  width: 100%;
  padding: 14px 0;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  text-align: center;
  transition: all 0.3s ease;
}

.ask-btn:active { transform: scale(0.95); }
.ask-btn.disabled { opacity: 0.5; }

/* History */
.history-section {
  padding: 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.history-title { font-size: 15px; font-weight: 600; color: #1e293b; }
.clear-btn { font-size: 13px; color: #ef4444; padding: 4px 12px; }

.history-list { display: flex; flex-direction: column; gap: 12px; }

.history-item {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  overflow: hidden;
}

.history-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
}

.question-text { font-size: 14px; color: #1e293b; font-weight: 500; }
.toggle-icon { font-size: 12px; color: #64748b; }

.history-answer {
  padding: 12px;
  background: rgba(59, 130, 246, 0.05);
  font-size: 13px;
  color: #64748b;
  line-height: 1.6;
}

/* Answer result */
.answer-result { margin: 0 16px 20px; }

.answer-content { padding: 24px; }

.answer-text {
  font-size: 14px;
  color: #334155;
  line-height: 1.8;
  white-space: pre-wrap;
}

.answer-actions { display: flex; gap: 12px; padding: 0 24px 24px; }

/* Name query section */
.name-query-section { padding: 24px; }

.search-input-wrapper { margin-bottom: 16px; }

.search-input {
  width: 100%;
  padding: 12px;
  background: rgba(248, 250, 252, 0.8);
  border-radius: 12px;
  font-size: 15px;
  color: #1e293b;
  border: 1px solid rgba(139, 92, 246, 0.2);
}

.search-btn-wrapper { margin-bottom: 16px; }

.search-btn {
  width: 100%;
  padding: 14px 0;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
  text-align: center;
  transition: all 0.3s ease;
}

.search-btn:active { transform: scale(0.95); }
.search-btn.disabled { opacity: 0.5; }

/* Suggestion tags */
.suggestions { margin-bottom: 16px; }

.suggestion-tags { display: flex; flex-wrap: wrap; gap: 8px; }

.suggestion-tag {
  padding: 6px 14px;
  background: rgba(139, 92, 246, 0.1);
  color: #8b5cf6;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 500;
}

.suggestion-tag:active { background: rgba(139, 92, 246, 0.2); }

.history-tags { display: flex; flex-wrap: wrap; gap: 8px; }

.history-tag {
  padding: 6px 14px;
  background: rgba(139, 92, 246, 0.1);
  color: #8b5cf6;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 500;
}

.history-tag:active { background: rgba(139, 92, 246, 0.2); }

/* Emergency guide */
.emergency-guide { margin: 0 16px 20px; }

.guide-content { padding: 24px; }

/* Image container */
.image-container { margin-bottom: 20px; }

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-bottom: 12px;
}

.snake-image-display {
  width: 100%;
  height: 200px;
  border-radius: 12px;
  background: rgba(248, 250, 252, 0.8);
  object-fit: cover;
  transition: all 0.3s ease;
}

.snake-image-display:active { transform: scale(0.98); }

.image-hint { text-align: center; font-size: 12px; color: #64748b; padding: 8px; }

.image-fallback {
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, rgba(248, 250, 252, 0.8), rgba(241, 245, 249, 0.6));
  border-radius: 16px;
  margin-bottom: 20px;
  border: 2px dashed rgba(148, 163, 184, 0.3);
}

.fallback-text { display: block; font-size: 16px; color: #94a3b8; margin-bottom: 8px; }
.fallback-subtext { display: block; font-size: 13px; color: #cbd5e1; }

.guide-info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 20px; }

.info-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  background: rgba(248, 250, 252, 0.8);
  border-radius: 10px;
}

.info-label { font-size: 12px; color: #64748b; font-weight: 500; }
.info-value { font-size: 14px; color: #1e293b; font-weight: 600; }

.guide-section { margin-bottom: 16px; }

.section-title {
  display: block;
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 2px solid rgba(245, 158, 11, 0.2);
}

.section-content {
  display: block;
  font-size: 14px;
  color: #64748b;
  line-height: 1.8;
  white-space: pre-wrap;
}

.section-content.highlight {
  color: #ef4444;
  font-weight: 600;
  background: rgba(239, 68, 68, 0.05);
  padding: 12px;
  border-radius: 8px;
}

.guide-actions { display: flex; gap: 12px; padding: 0 24px 24px; }

/* Error message */
.error-message {
  margin: 0 16px 20px;
  padding: 16px;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.error-icon { font-size: 24px; }
.error-text { font-size: 14px; color: #ef4444; font-weight: 500; }

/* Animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes pulse {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
}
</style>
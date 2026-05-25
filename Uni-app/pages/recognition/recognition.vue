<template>
  <view class="recognition-container">
    <!-- Top navbar -->
    <GlassNavbar
      title="📷 蛇类识别"
      subtitle="上传图片，智能识别蛇类信息"
    />

    <!-- Main content -->
    <scroll-view scroll-y class="main-content">
      <view class="upload-section glass-card">
        <view class="card-header">
          <view class="header-icon upload-icon">📤</view>
          <view class="header-content">
            <text class="header-title">图片上传</text>
            <text class="header-subtitle">上传蛇类图片进行识别</text>
          </view>
        </view>

        <view class="upload-container">
          <!-- Upload area -->
          <view
            class="upload-area"
            :class="{ 'dragover': isDragging }"
            @click="chooseImage"
          >
            <view class="upload-content" v-if="!uploadedImage">
              <view class="upload-icon-wrapper">
                <text class="upload-icon">🖼️</text>
                <view class="upload-icon-halo"></view>
              </view>
              <text class="upload-title">点击选择图片</text>
              <text class="upload-subtitle">支持拍照或从相册选择</text>
              <view class="upload-hints">
                <view class="hint-item">
                  <text>📸</text>
                  <text>支持 JPG/PNG</text>
                </view>
                <view class="hint-item">
                  <text>⚡</text>
                  <text>自动压缩优化</text>
                </view>
                <view class="hint-item">
                  <text>🔒</text>
                  <text>安全识别</text>
                </view>
              </view>
            </view>

            <!-- Image preview -->
            <view class="image-preview" v-else>
              <view class="preview-container">
                <image :src="uploadedImage" mode="aspectFill" class="preview-img"></image>
                <view class="preview-overlay">
                  <view class="preview-overlay-content">
                    <text style="color: #10b981; font-size: 48px;">✅</text>
                    <text>图片已准备就绪</text>
                  </view>
                </view>
              </view>

              <view class="file-info-card">
                <view class="info-item">
                  <text class="info-label">原始大小</text>
                  <text class="info-value">{{ formatFileSize(rawFileSize) }}</text>
                </view>
                <view class="info-item">
                  <text class="info-label">压缩后</text>
                  <text class="info-value highlight">{{ formatFileSize(compressedFileSize) }}</text>
                </view>
                <view class="info-item">
                  <text class="info-label">压缩率</text>
                  <text class="info-value success">{{ calculateCompressionRate() }}%</text>
                </view>
              </view>

              <view class="preview-actions">
                <view class="action-btn" @click.stop="retakePhoto">
                  🔄 重新上传
                </view>
                <view
                  class="action-btn primary"
                  :class="{ 'loading': recognizing }"
                  @click.stop="submitForRecognition"
                >
                  <text v-if="recognizing">⏳ 识别中...</text>
                  <text v-else>🔍 开始识别</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- Recognition results -->
      <view class="results-section glass-card" v-if="rawRecognitionText || recognizing">
        <view class="card-header">
          <view class="header-icon result-icon">📄</view>
          <view class="header-content">
            <text class="header-title">识别结果</text>
            <text class="header-subtitle">查看详细识别信息</text>
          </view>
          <view class="header-badge" v-if="recognitionTime && !recognizing">
            <view class="time-tag">⏱️ {{ recognitionTime }}s</view>
          </view>
        </view>

        <view class="result-container">
          <!-- Loading -->
          <LoadingSpinner
            v-if="recognizing"
            :progress="recognitionProgress"
            title="AI 正在分析中..."
            subtitle="请稍候，系统正在识别图片中的蛇类信息"
            color="#10b981"
          />

          <!-- Recognition result -->
          <view class="result-success-card" v-else-if="rawRecognitionText">
            <view class="result-success-header">
              <view class="success-indicator">
                <text>✅</text>
                <text>识别成功</text>
              </view>
              <view class="result-meta">
                <view class="meta-item">
                  <text>⏱️</text>
                  <text>{{ recognitionTime }}s</text>
                </view>
                <view class="meta-item">
                  <text>🤖</text>
                  <text>AI 分析</text>
                </view>
              </view>
            </view>

            <view class="markdown-content" v-html="formattedRecognitionText"></view>

            <view class="result-actions">
              <view class="result-action-btn" @click="saveResult">
                💾 保存结果
              </view>
              <view class="result-action-btn danger" @click="findMedicalCare">
                🚑 紧急救治
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- Placeholder -->
      <view class="placeholder-section glass-card" v-if="!rawRecognitionText && !recognizing">
        <view class="placeholder-animation">
          <text class="placeholder-icon">🔍</text>
          <view class="scan-line"></view>
        </view>
        <view class="placeholder-content">
          <text class="placeholder-title">等待识别</text>
          <text class="placeholder-subtitle">上传图片后，AI 将为您分析蛇类信息</text>
          <view class="placeholder-features">
            <view class="feature-item">
              <text>🏅</text>
              <text>高精度识别</text>
            </view>
            <view class="feature-item">
              <text>⚡</text>
              <text>快速分析</text>
            </view>
            <view class="feature-item">
              <text>📊</text>
              <text>详细报告</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { recognitionApi } from '@/utils/api.js'
import { formatFileSize } from '@/utils/helpers.js'
import GlassNavbar from '@/components/GlassNavbar.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

// Reactive data
const uploadedImage = ref(null)
const uploadedImageFile = ref(null)
const rawFileSize = ref(0)
const compressedFileSize = ref(0)
const recognizing = ref(false)
const rawRecognitionText = ref('')
const recognitionTime = ref(0)
const recognitionProgress = ref(0)
const progressTimer = ref(null)
const isDragging = ref(false)

// Computed - formatted recognition text
const formattedRecognitionText = computed(() => {
  if (!rawRecognitionText.value) return ''

  return rawRecognitionText.value
    .replace(/### (.*?)/g, '<h3>$1</h3>')
    .replace(/## (.*?)/g, '<h2>$1</h2>')
    .replace(/# (.*?)/g, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>')
})

// Methods
const calculateCompressionRate = () => {
  if (rawFileSize.value === 0) return 0
  return Math.round((1 - compressedFileSize.value / rawFileSize.value) * 100)
}

const startProgressSimulation = () => {
  recognitionProgress.value = 0
  progressTimer.value = setInterval(() => {
    if (recognitionProgress.value < 90) {
      recognitionProgress.value += Math.random() * 10
      if (recognitionProgress.value > 90) {
        recognitionProgress.value = 90
      }
    }
  }, 500)
}

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

          const savedPercent = calculateCompressionRate()
          uni.showToast({
            title: `图片压缩完成，节省${savedPercent}%空间`,
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
        title: '图片压缩失败，使用原图',
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
  rawRecognitionText.value = ''
  recognitionTime.value = 0
  recognitionProgress.value = 0
}

const submitForRecognition = async () => {
  if (!uploadedImage.value) {
    uni.showToast({
      title: '请先选择图片',
      icon: 'none'
    })
    return
  }

  recognizing.value = true
  startProgressSimulation()
  const startTime = Date.now()

  try {
    const response = await recognitionApi.identifySnake(uploadedImageFile.value)

    recognitionTime.value = ((Date.now() - startTime) / 1000).toFixed(1)

    if (response && response.data) {
      rawRecognitionText.value = response.data
    } else {
      rawRecognitionText.value = '### 识别完成\n未能获取有效识别结果，请重试。'
    }

    uni.showToast({
      title: '识别完成',
      icon: 'success'
    })
  } catch (error) {
    console.error('识别失败:', error)
    let errorMsg = '识别失败'
    if (error.message && error.message.includes('timeout')) {
      errorMsg = '识别请求超时，请检查网络'
    } else if (error.message) {
      errorMsg += ': ' + error.message
    }

    uni.showToast({
      title: errorMsg,
      icon: 'none',
      duration: 3000
    })
  } finally {
    recognizing.value = false
    recognitionProgress.value = 100

    if (progressTimer.value) {
      clearInterval(progressTimer.value)
      progressTimer.value = null
    }

    setTimeout(() => {
      recognitionProgress.value = 0
    }, 1000)
  }
}

const findMedicalCare = () => {
  uni.switchTab({
    url: '/pages/emergency/emergency'
  })
}

const saveResult = () => {
  uni.showToast({
    title: '保存功能开发中',
    icon: 'none'
  })
}

// Cleanup timer on unmount
onUnmounted(() => {
  if (progressTimer.value) {
    clearInterval(progressTimer.value)
  }
})
</script>

<style lang="scss" scoped>
.recognition-container {
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

.upload-icon { background: linear-gradient(135deg, #3b82f6, #2563eb); }
.result-icon { background: linear-gradient(135deg, #10b981, #059669); }

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
.upload-container { padding: 24px; }

.upload-area {
  border: 2px dashed rgba(59, 130, 246, 0.3);
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  transition: all 0.3s ease;
  background: rgba(248, 250, 252, 0.8);
  position: relative;
  overflow: hidden;
}

.upload-area:active {
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.05);
  transform: scale(0.98);
}

.dragover {
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.05);
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
  background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
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
  height: 250px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(16, 185, 129, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-overlay-content {
  text-align: center;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.file-info-card {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 16px;
  padding: 16px;
  background: rgba(248, 250, 252, 0.8);
  border-radius: 12px;
}

.info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 10px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.6);
  font-size: 12px;
}

.info-label { color: #64748b; }
.info-value { font-weight: 600; color: #1e293b; }
.info-value.highlight { color: #3b82f6; }
.info-value.success { color: #10b981; }

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
.action-btn.primary { background: linear-gradient(135deg, #10b981, #059669); color: white; }
.action-btn.loading { opacity: 0.7; }

/* Results section */
.results-section { margin: 0 16px 20px; }

.result-container { padding: 24px; }

/* Recognition result card */
.result-success-card {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(16, 185, 129, 0.1));
  border-radius: 16px;
  padding: 20px;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.result-success-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(16, 185, 129, 0.2);
}

.success-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #10b981;
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

.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3) {
  color: #10b981;
  margin: 1em 0 0.5em;
  font-weight: 600;
  font-size: 16px;
}

.result-actions {
  display: flex;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid rgba(16, 185, 129, 0.2);
}

.result-action-btn {
  flex: 1;
  padding: 10px 0;
  border-radius: 10px;
  font-weight: 500;
  font-size: 14px;
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  text-align: center;
  transition: all 0.3s ease;
}

.result-action-btn:active { transform: scale(0.95); background: rgba(59, 130, 246, 0.2); }
.result-action-btn.danger { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
.result-action-btn.danger:active { background: rgba(239, 68, 68, 0.2); }

/* Placeholder */
.placeholder-section {
  text-align: center;
  padding: 40px 20px;
}

.placeholder-animation {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 24px;
}

.placeholder-icon {
  font-size: 60px;
  color: rgba(59, 130, 246, 0.3);
  position: relative;
  z-index: 2;
}

.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #3b82f6, transparent);
  animation: scan 2s linear infinite;
}

.placeholder-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.placeholder-title {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
}

.placeholder-subtitle {
  font-size: 13px;
  color: #64748b;
}

.placeholder-features {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
  flex-wrap: wrap;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px;
  background: rgba(59, 130, 246, 0.05);
  border-radius: 10px;
  font-size: 12px;
  color: #64748b;
}

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

@keyframes scan {
  0% { top: 0; }
  50% { top: 100%; }
  100% { top: 0; }
}
</style>
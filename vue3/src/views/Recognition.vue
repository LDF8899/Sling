<template>
  <div class="recognition-container" :class="{ 'dark-mode': darkMode }">
    <div class="main-content">
      <div class="page-header">
        <el-button icon="ArrowLeft" circle @click="$router.push('/dashboard')" class="back-btn" />
        <div class="page-title">
          <h1>
            <i class="el-icon-camera"></i>
            蛇类识别
          </h1>
          <p>上传图片，智能识别蛇类信息</p>
        </div>
      </div>
      <el-row :gutter="32">
        <!-- 图片上传区 -->
        <el-col :xs="24" :lg="12">
          <div class="glass-card upload-section">
            <div class="card-header">
              <div class="header-icon" style="background: linear-gradient(135deg, #3b82f6, #2563eb)">
                <i class="el-icon-upload"></i>
              </div>
              <div class="header-content">
                <h3>图片上传</h3>
                <p>上传蛇类图片进行识别</p>
              </div>
            </div>

            <div class="upload-container">
              <div
                  class="upload-area"
                  @dragover.prevent @drop.prevent="handleDrop"
                  :class="{ 'dragover': isDragging }"
                  @dragenter="isDragging = true"
                  @dragleave="isDragging = false"
              >
                <div class="upload-content" v-if="!uploadedImage">
                  <div class="upload-icon-wrapper">
                    <i class="el-icon-picture-outline upload-icon"></i>
                    <div class="upload-icon-halo"></div>
                  </div>
                  <p class="upload-title">拖拽图片到此处</p>
                  <p class="upload-subtitle">或点击按钮选择文件</p>
                  <el-button
                      type="primary"
                      @click="triggerUpload"
                      class="upload-btn"
                      size="large"
                  >
                    <i class="el-icon-folder-opened"></i> 选择图片
                  </el-button>
                  <div class="upload-hints">
                    <div class="hint-item">
                      <i class="el-icon-picture"></i>
                      <span>支持 JPG、PNG 格式</span>
                    </div>
                    <div class="hint-item">
                      <i class="el-icon-data-analysis"></i>
                      <span>大小不超过 20MB</span>
                    </div>
                    <div class="hint-item">
                      <i class="el-icon-magic-stick"></i>
                      <span>自动压缩优化</span>
                    </div>
                  </div>
                </div>

                <div class="image-preview" v-else>
                  <div class="preview-container">
                    <img :src="uploadedImage" alt="上传的图片" class="preview-img">
                    <div class="preview-overlay">
                      <div class="preview-overlay-content">
                        <i class="el-icon-success" style="color: #10b981; font-size: 48px;"></i>
                        <p>图片已准备就绪</p>
                      </div>
                    </div>
                  </div>

                  <div class="file-info-card">
                    <div class="info-item">
                      <span class="info-label">原始大小</span>
                      <span class="info-value">{{ formatFileSize(rawFileSize) }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">压缩后大小</span>
                      <span class="info-value highlight">{{ formatFileSize(compressedFileSize) }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">压缩率</span>
                      <span class="info-value success">
                        {{ calculateCompressionRate() }}%
                      </span>
                    </div>
                  </div>

                  <div class="preview-actions">
                    <el-button
                        type="info"
                        @click="retakePhoto"
                        size="large"
                        class="action-btn"
                    >
                      <i class="el-icon-refresh"></i> 重新上传
                    </el-button>
                    <el-button
                        type="success"
                        @click="submitForRecognition"
                        :loading="recognizing"
                        size="large"
                        class="action-btn"
                    >
                      <i class="el-icon-search"></i> 开始识别
                    </el-button>
                  </div>
                </div>

                <input
                    type="file"
                    ref="fileInput"
                    accept="image/*"
                    @change="handleFileSelect"
                    style="display: none;"
                >
              </div>
            </div>
          </div>
        </el-col>

        <!-- 识别结果区 -->
        <el-col :xs="24" :lg="12">
          <div class="glass-card results-section">
            <div class="card-header">
              <div class="header-icon" style="background: linear-gradient(135deg, #10b981, #059669)">
                <i class="el-icon-document"></i>
              </div>
              <div class="header-content">
                <h3>识别结果</h3>
                <p>查看详细识别信息</p>
              </div>
              <div class="header-badge" v-if="recognitionTime">
                <el-tag type="success" size="small">
                  <i class="el-icon-time"></i> {{ recognitionTime }}s
                </el-tag>
              </div>
            </div>

            <div class="result-container">
              <div class="result-content" v-if="rawRecognitionText">
                <div class="result-success-card">
                  <div class="result-success-header">
                    <div class="success-indicator">
                      <i class="el-icon-success"></i>
                      <span>识别成功</span>
                    </div>
                    <div class="result-meta">
                      <span class="meta-item">
                        <i class="el-icon-time"></i>
                        {{ recognitionTime }}s
                      </span>
                      <span class="meta-item">
                        <i class="el-icon-data-analysis"></i>
                        AI 分析
                      </span>
                    </div>
                  </div>

                  <div class="markdown-content-wrapper">
                    <div class="markdown-content" v-html="renderedMarkdown"></div>
                  </div>

                  <div class="result-actions">
                    <el-button
                        type="primary"
                        plain
                        size="large"
                        @click="saveResult"
                        class="result-action-btn"
                    >
                      <i class="el-icon-download"></i> 保存结果
                    </el-button>
                    <el-button
                        type="danger"
                        size="large"
                        @click="findMedicalCare"
                        class="result-action-btn"
                    >
                      <i class="el-icon-first-aid-kit"></i> 紧急救治
                    </el-button>
                  </div>
                </div>
              </div>

              <div class="result-placeholder" v-else>
                <div class="placeholder-animation">
                  <div class="scan-line"></div>
                  <i class="el-icon-search placeholder-icon"></i>
                </div>
                <div class="placeholder-content">
                  <h4>等待识别</h4>
                  <p>上传图片后，AI将为您分析蛇类信息</p>
                  <div class="placeholder-features">
                    <div class="feature-item">
                      <i class="el-icon-medal"></i>
                      <span>高精度识别</span>
                    </div>
                    <div class="feature-item">
                      <i class="el-icon-lightning"></i>
                      <span>快速分析</span>
                    </div>
                    <div class="feature-item">
                      <i class="el-icon-info"></i>
                      <span>详细报告</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 加载动画 -->
    <transition name="fade">
      <div class="glass-loading-mask" v-if="recognizing">
        <div class="loading-content">
          <div class="loading-animation">
            <div class="loading-spinner">
              <i class="el-icon-loading"></i>
            </div>
            <div class="loading-waves">
              <div class="wave"></div>
              <div class="wave"></div>
              <div class="wave"></div>
            </div>
          </div>
          <div class="loading-text">
            <h3>AI 正在分析中...</h3>
            <p>请稍候，系统正在识别图片中的蛇类信息</p>
          </div>
          <div class="loading-progress">
            <el-progress
                :percentage="recognitionProgress"
                :stroke-width="6"
                color="linear-gradient(135deg, #10b981, #059669)"
                :show-text="false"
            />
            <div class="progress-text">{{ recognitionProgress }}%</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { recognitionApi } from '../services/api.js'
import { useUserStore } from '../store/user.js'
import MarkdownIt from 'markdown-it'

export default {
  name: 'Recognition',
  data() {
    return {
      darkMode: false,
      uploadedImage: null,
      uploadedImageFile: null,
      rawFileSize: 0,
      compressedFileSize: 0,
      recognizing: false,
      recognitionResult: null,
      rawRecognitionText: '',
      recognitionTime: 0,
      recognitionProgress: 0,
      progressTimer: null,
      isDragging: false
    }
  },
  computed: {
    renderedMarkdown() {
      if (this.rawRecognitionText) {
        const md = new MarkdownIt({
          html: true,
          linkify: true,
          typographer: true,
          breaks: true
        })
        const cleanedText = this.rawRecognitionText.replace(/\n{3,}/g, '\n\n').trim()
        return md.render(cleanedText)
      }
      return ''
    }
  },
  beforeUnmount() {
    if (this.progressTimer) {
      clearInterval(this.progressTimer)
    }
  },
  mounted() {
    this.darkMode = document.body.classList.contains('dark-mode')
  },
  methods: {
    calculateCompressionRate() {
      if (this.rawFileSize === 0) return 0
      return Math.round((1 - this.compressedFileSize / this.rawFileSize) * 100)
    },

    formatFileSize(bytes) {
      if (!bytes || isNaN(bytes)) return '0 B'
      const k = 1024
      const sizes = ['B', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    },

    startProgressSimulation() {
      this.recognitionProgress = 0
      this.progressTimer = setInterval(() => {
        if (this.recognitionProgress < 90) {
          this.recognitionProgress += Math.random() * 10
          if (this.recognitionProgress > 90) {
            this.recognitionProgress = 90
          }
        }
      }, 500)
    },

    toggleTheme(value) {
      document.body.classList.toggle('dark-mode', value)
      this.$message.success(value ? '已切换至暗色模式' : '已切换至亮色模式')
    },

    goBack() {
      this.$router.go(-1)
    },

    triggerUpload() {
      this.$refs.fileInput.click()
    },

    handleFileSelect(event) {
      const file = event.target.files[0]
      if (file) {
        this.rawFileSize = file.size
        this.compressImage(file)
      }
    },

    handleDrop(event) {
      this.isDragging = false
      const file = event.dataTransfer.files[0]
      if (file && file.type.startsWith('image/')) {
        this.rawFileSize = file.size
        this.compressImage(file)
      }
    },

    compressImage(file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onload = (e) => {
        const imgSrc = e.target.result || ''
        const img = new Image()
        img.src = imgSrc

        img.onload = () => {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')

          let width = img.width || 800
          let height = img.height || 600

          const maxWidth = 1920
          const maxHeight = 1080

          if (width > 0 && height > 0) {
            if (width > maxWidth) {
              height = height * (maxWidth / width)
              width = maxWidth
            }
            if (height > maxHeight) {
              width = width * (maxHeight / height)
              height = maxHeight
            }
          }

          canvas.width = Math.round(width)
          canvas.height = Math.round(height)

          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

          let quality = 0.8
          if (file.size > 5 * 1024 * 1024) {
            quality = 0.6
          }
          if (file.size > 10 * 1024 * 1024) {
            quality = 0.4
          }

          canvas.toBlob(
              (blob) => {
                if (!blob) {
                  this.$message.error('图片压缩失败，请重试')
                  return
                }

                this.compressedFileSize = blob.size
                this.uploadedImageFile = new File([blob], file.name, {
                  type: file.type || 'image/jpeg',
                  lastModified: Date.now()
                })

                const previewReader = new FileReader()
                previewReader.onload = (previewEvent) => {
                  this.uploadedImage = previewEvent.target.result
                }
                previewReader.readAsDataURL(blob)

                const savedPercent = this.calculateCompressionRate()
                this.$message.success(`图片压缩完成，节省${savedPercent}%存储空间`)
              },
              file.type || 'image/jpeg',
              quality
          )
        }

        img.onerror = () => {
          this.$message.error('图片加载失败，请选择有效的图片文件')
        }
      }

      reader.onerror = () => {
        this.$message.error('文件读取失败，请重试')
      }
    },

    retakePhoto() {
      this.uploadedImage = null
      this.uploadedImageFile = null
      this.rawFileSize = 0
      this.compressedFileSize = 0
      this.recognitionResult = null
      this.rawRecognitionText = ''
      this.recognitionTime = 0
    },

    async submitForRecognition() {
      if (!this.uploadedImage) {
        this.$message.warning('请先上传图片')
        return
      }

      this.recognizing = true
      this.startProgressSimulation()
      const startTime = Date.now()

      try {
        const formData = new FormData()
        formData.append('image', this.uploadedImageFile)

        // 附加 userId 用于自动保存识别记录
        const userStore = useUserStore()
        const userId = userStore.userInfo?.id || localStorage.getItem('userId')
        if (userId) {
          formData.append('userId', userId)
        }

        const response = await recognitionApi.identifySnake(formData)

        this.recognitionTime = ((Date.now() - startTime) / 1000).toFixed(1)
        const resultData = response.data

        if (resultData && resultData.data) {
          // 后端返回 { result, recordId }
          this.rawRecognitionText = resultData.data.result || resultData.data
        } else {
          this.rawRecognitionText = '### 识别完成\n未能获取有效识别结果，请重试。'
        }

        this.$message.success('识别完成，已自动保存')
      } catch (error) {
        console.error('识别失败:', error)
        let errorMsg = '识别失败'
        if (error.message && error.message.includes('timeout')) {
          errorMsg = '识别请求超时，请检查网络或后端服务'
        } else if (error.response?.data?.message) {
          errorMsg += ': ' + error.response.data.message
        } else if (error.message) {
          errorMsg += ': ' + error.message
        } else {
          errorMsg += ': 未知错误'
        }
        this.$message.error(errorMsg)
      } finally {
        this.recognizing = false
        this.recognitionProgress = 100
        clearInterval(this.progressTimer)
        setTimeout(() => {
          this.recognitionProgress = 0
        }, 1000)
      }
    },

    findMedicalCare() {
      this.$message.info('正在跳转到寻医页面...')
    },

    saveResult() {
      this.$message.success('识别结果已自动保存')
    }
  }
}
</script>

<style scoped>
.recognition-container {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--surface-cool) 0%, var(--ink-200) 100%);
  padding: 0;
  position: relative;
  transition: background var(--transition-base);
}

.page-header {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.page-title h1 {
  margin: 0;
  font-size: 28px;
  font-weight: var(--weight-bold);
  color: var(--ink-900);
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.page-title p {
  margin: var(--space-1) 0 0 0;
  color: var(--ink-500);
  font-size: var(--text-sm);
  font-weight: var(--weight-normal);
}

.back-btn {
  font-size: var(--text-base);
  font-weight: var(--weight-medium);
}

.main-content {
  padding: var(--space-6) var(--space-10) var(--space-10);
  max-width: 1600px;
  margin: 0 auto;
}

.glass-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-radius: var(--radius-xl);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: var(--shadow-card);
  transition: all var(--transition-base);
  animation: fadeInUp 0.6s ease-out;
}

.glass-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.card-header {
  display: flex;
  align-items: center;
  gap: var(--space-5);
  margin-bottom: 30px;
  padding: 30px 30px 0;
}

.header-icon {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--surface-white);
  font-size: 28px;
  flex-shrink: 0;
}

.header-content {
  flex: 1;
}

.header-content h3 {
  margin: 0;
  font-size: var(--text-2xl);
  font-weight: var(--weight-bold);
  color: var(--ink-900);
}

.header-content p {
  margin: var(--space-2) 0 0 0;
  color: var(--ink-500);
  font-size: var(--text-sm);
}

.header-badge {
  flex-shrink: 0;
}

.upload-section, .results-section {
  height: 100%;
  min-height: 600px;
}

.upload-container {
  padding: 0 30px 30px;
}

.upload-area {
  border: 2px dashed rgba(8, 145, 178, 0.3);
  border-radius: var(--radius-xl);
  padding: var(--space-10);
  text-align: center;
  transition: all var(--transition-base);
  background: rgba(248, 250, 252, 0.8);
  position: relative;
  overflow: hidden;
}

.upload-area.dragover {
  border-color: var(--info);
  background: rgba(8, 145, 178, 0.05);
  transform: scale(1.02);
}

.upload-area.dragover .upload-icon {
  color: var(--info);
  transform: scale(1.1);
}

.upload-content {
  position: relative;
  z-index: 2;
}

.upload-icon-wrapper {
  position: relative;
  margin-bottom: var(--space-6);
}

.upload-icon {
  font-size: 64px;
  color: var(--ink-400);
  transition: all var(--transition-base);
  position: relative;
  z-index: 2;
}

.upload-icon-halo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(8, 145, 178, 0.1) 0%, transparent 70%);
  animation: pulse 2s infinite;
}

.upload-title {
  font-size: var(--text-xl);
  font-weight: var(--weight-semibold);
  color: var(--ink-900);
  margin: 0 0 var(--space-2) 0;
}

.upload-subtitle {
  color: var(--ink-500);
  margin: 0 0 var(--space-6) 0;
  font-size: 15px;
}

.upload-btn {
  padding: var(--space-3) var(--space-8);
  border-radius: var(--radius-md);
  font-size: var(--text-base);
  font-weight: var(--weight-medium);
  margin-bottom: var(--space-8);
}

.upload-hints {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
  max-width: 400px;
  margin: 0 auto;
}

.hint-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3);
  background: rgba(255, 255, 255, 0.6);
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
}

.hint-item:hover {
  transform: translateY(-2px);
  background: var(--surface-white);
  box-shadow: var(--shadow-sm);
}

.hint-item i {
  color: var(--info);
  font-size: var(--text-xl);
}

.hint-item span {
  font-size: var(--text-xs);
  color: var(--ink-500);
}

.image-preview {
  animation: fadeIn 0.5s ease-out;
}

.preview-container {
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: var(--space-6);
  box-shadow: var(--shadow-brand);
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
  background: rgba(5, 150, 105, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition-base);
}

.preview-container:hover .preview-overlay {
  opacity: 1;
}

.preview-overlay-content {
  text-align: center;
  color: var(--surface-white);
}

.file-info-card {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
  margin-bottom: var(--space-6);
  padding: var(--space-5);
  background: rgba(248, 250, 252, 0.8);
  border-radius: var(--radius-lg);
}

.info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.6);
  transition: all var(--transition-base);
}

.info-item:hover {
  transform: translateY(-2px);
  background: var(--surface-white);
  box-shadow: var(--shadow-sm);
}

.info-label {
  font-size: var(--text-xs);
  color: var(--ink-500);
}

.info-value {
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  color: var(--ink-900);
}

.info-value.highlight {
  color: var(--info);
}

.info-value.success {
  color: var(--green-500);
}

.preview-actions {
  display: flex;
  gap: var(--space-4);
  justify-content: center;
}

.action-btn {
  padding: var(--space-3) var(--space-8);
  border-radius: var(--radius-md);
  font-weight: var(--weight-medium);
}

.result-container {
  padding: 0 30px 30px;
}

.result-content {
  height: 100%;
}

.result-success-card {
  background: linear-gradient(135deg, rgba(5, 150, 105, 0.05), rgba(5, 150, 105, 0.1));
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  border: 1px solid rgba(5, 150, 105, 0.2);
}

.result-success-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid rgba(5, 150, 105, 0.2);
}

.success-indicator {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-lg);
  font-weight: var(--weight-semibold);
  color: var(--green-500);
}

.success-indicator i {
  font-size: var(--text-2xl);
}

.result-meta {
  display: flex;
  gap: var(--space-4);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--text-sm);
  color: var(--ink-500);
  padding: 6px var(--space-3);
  background: rgba(255, 255, 255, 0.6);
  border-radius: var(--radius-md);
}

.markdown-content-wrapper {
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: var(--space-6);
  padding-right: var(--space-2);
}

.markdown-content {
  background: var(--surface-white);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  line-height: 1.8;
}

.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3) {
  color: var(--green-500);
  margin: 1.5em 0 0.8em;
  font-weight: var(--weight-semibold);
}

.markdown-content :deep(p) {
  margin: 1em 0;
  color: var(--ink-700);
}

.result-actions {
  display: flex;
  gap: var(--space-4);
  padding-top: var(--space-6);
  border-top: 1px solid rgba(5, 150, 105, 0.2);
}

.result-action-btn {
  flex: 1;
  padding: var(--space-3) 0;
  border-radius: var(--radius-md);
  font-weight: var(--weight-medium);
}

.result-placeholder {
  text-align: center;
  padding: 60px var(--space-6);
}

.placeholder-animation {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto var(--space-8);
}

.placeholder-icon {
  font-size: 64px;
  color: rgba(8, 145, 178, 0.3);
  position: relative;
  z-index: 2;
}

.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--info), transparent);
  animation: scan 2s linear infinite;
}

.placeholder-content h4 {
  margin: 0 0 var(--space-3) 0;
  font-size: var(--text-xl);
  font-weight: var(--weight-semibold);
  color: var(--ink-900);
}

.placeholder-content p {
  color: var(--ink-500);
  margin: 0 0 var(--space-8) 0;
}

.placeholder-features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
  max-width: 400px;
  margin: 0 auto;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-4);
  background: rgba(8, 145, 178, 0.05);
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
}

.feature-item:hover {
  transform: translateY(-2px);
  background: rgba(8, 145, 178, 0.1);
}

.feature-item i {
  color: var(--info);
  font-size: var(--text-xl);
}

.feature-item span {
  font-size: var(--text-xs);
  color: var(--ink-500);
}

.glass-loading-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.loading-content {
  text-align: center;
  padding: var(--space-10);
  border-radius: var(--radius-xl);
  background: rgba(255, 255, 255, 0.95);
  box-shadow: var(--shadow-lg);
  min-width: 400px;
}

.loading-animation {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto var(--space-6);
}

.loading-spinner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-spinner i {
  font-size: 48px;
  color: var(--green-500);
  animation: spin 2s linear infinite;
}

.loading-waves {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.wave {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid rgba(5, 150, 105, 0.3);
  border-radius: 50%;
  animation: ripple 1.5s infinite;
}

.wave:nth-child(2) {
  animation-delay: 0.5s;
}

.wave:nth-child(3) {
  animation-delay: 1s;
}

.loading-text h3 {
  margin: 0 0 var(--space-3) 0;
  font-size: var(--text-xl);
  font-weight: var(--weight-semibold);
  color: var(--ink-900);
}

.loading-text p {
  color: var(--ink-500);
  margin: 0 0 var(--space-6) 0;
}

.loading-progress {
  margin-top: var(--space-6);
}

.progress-text {
  margin-top: var(--space-2);
  font-size: var(--text-sm);
  color: var(--green-500);
  font-weight: var(--weight-medium);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(var(--space-5));
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes ripple {
  0% { width: 0; height: 0; opacity: 1; }
  100% { width: 120px; height: 120px; opacity: 0; }
}

@media (max-width: 1200px) {
  .navbar-content {
    padding: 0 var(--space-6);
  }
  .main-content {
    padding: 100px var(--space-6) var(--space-10);
  }
  .upload-hints,
  .placeholder-features {
    grid-template-columns: 1fr;
    max-width: 300px;
  }
}

@media (max-width: 768px) {
  .navbar-content {
    flex-direction: column;
    gap: var(--space-4);
    padding: var(--space-4);
    height: auto;
  }
  .nav-left, .nav-right {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .main-content {
    padding: 140px var(--space-4) var(--space-8);
  }
  .card-header {
    flex-direction: column;
    text-align: center;
    gap: var(--space-4);
  }
  .file-info-card {
    grid-template-columns: 1fr;
  }
  .preview-actions,
  .result-actions {
    flex-direction: column;
  }
  .action-btn,
  .result-action-btn {
    width: 100%;
  }
  .loading-content {
    min-width: 90%;
    margin: 0 var(--space-4);
  }
}
</style>
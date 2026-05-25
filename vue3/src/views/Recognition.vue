<template>
  <div class="recognition-container" :class="{ 'dark-mode': darkMode }">
    <!-- 玻璃态顶部导航栏 -->
    <div class="glass-navbar">
      <div class="navbar-content">
        <div class="nav-left">
          <el-button type="text" icon="ArrowLeft" @click="goBack" class="back-btn">
            返回
          </el-button>
        </div>
        <div class="nav-center">
          <h1 class="app-title">
            <i class="el-icon-camera"></i>
            蛇类识别
          </h1>
          <p class="app-subtitle">上传图片，智能识别蛇类信息</p>
        </div>
        <div class="nav-right">
          <el-switch
              v-model="darkMode"
              active-text="暗色"
              inactive-text="亮色"
              @change="toggleTheme"
              size="large"
          />
        </div>
      </div>
    </div>

    <div class="main-content">
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

        const response = await recognitionApi.identifySnake(formData)

        this.recognitionTime = ((Date.now() - startTime) / 1000).toFixed(1)
        const resultData = response.data

        if (resultData && resultData.data) {
          this.rawRecognitionText = resultData.data
        } else {
          this.rawRecognitionText = '### 识别完成\n未能获取有效识别结果，请重试。'
        }

        this.$message.success('识别完成')
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
      this.$message.info('保存功能开发中')
    }
  }
}
</script>

<style scoped>
.recognition-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 0;
  position: relative;
  transition: background 0.3s ease;
}

.dark-mode .recognition-container {
  background: linear-gradient(135deg, #1e293b, #0f172a);
  color: #f8fafc;
}

/* 顶部导航栏 */
.glass-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 1000;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.dark-mode .glass-navbar {
  background: rgba(15, 23, 42, 0.85);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  height: 100%;
  max-width: 1600px;
  margin: 0 auto;
}

.nav-left, .nav-right {
  flex: 1;
}

.nav-center {
  text-align: center;
}

.app-title {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.dark-mode .app-title {
  color: #f8fafc;
}

.app-subtitle {
  margin: 8px 0 0 0;
  color: #64748b;
  font-size: 14px;
  font-weight: 400;
}

.back-btn {
  font-size: 16px;
  font-weight: 500;
}

/* 主要内容区 */
.main-content {
  padding: 100px 40px 40px;
  max-width: 1600px;
  margin: 0 auto;
}

.glass-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  animation: fadeInUp 0.6s ease-out;
}

.dark-mode .glass-card {
  background: rgba(15, 23, 42, 0.8);
  border-color: rgba(255, 255, 255, 0.1);
}

.glass-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
}

/* 卡片头部 */
.card-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  padding: 30px 30px 0;
}

.header-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 28px;
  flex-shrink: 0;
}

.header-content {
  flex: 1;
}

.header-content h3 {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
}

.dark-mode .header-content h3 {
  color: #f8fafc;
}

.header-content p {
  margin: 8px 0 0 0;
  color: #64748b;
  font-size: 14px;
}

.header-badge {
  flex-shrink: 0;
}

/* 上传区域 */
.upload-section, .results-section {
  height: 100%;
  min-height: 600px;
}

.upload-container {
  padding: 0 30px 30px;
}

.upload-area {
  border: 2px dashed rgba(59, 130, 246, 0.3);
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  transition: all 0.3s ease;
  background: rgba(248, 250, 252, 0.8);
  position: relative;
  overflow: hidden;
}

.dark-mode .upload-area {
  background: rgba(30, 41, 59, 0.8);
  border-color: rgba(59, 130, 246, 0.2);
}

.upload-area.dragover {
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.05);
  transform: scale(1.02);
}

.upload-area.dragover .upload-icon {
  color: #3b82f6;
  transform: scale(1.1);
}

.upload-content {
  position: relative;
  z-index: 2;
}

.upload-icon-wrapper {
  position: relative;
  margin-bottom: 24px;
}

.upload-icon {
  font-size: 64px;
  color: #94a3b8;
  transition: all 0.3s ease;
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
  background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
  animation: pulse 2s infinite;
}

.upload-title {
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 8px 0;
}

.dark-mode .upload-title {
  color: #f8fafc;
}

.upload-subtitle {
  color: #64748b;
  margin: 0 0 24px 0;
  font-size: 15px;
}

.upload-btn {
  padding: 12px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 32px;
}

.upload-hints {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  max-width: 400px;
  margin: 0 auto;
}

.hint-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.dark-mode .hint-item {
  background: rgba(30, 41, 59, 0.6);
}

.hint-item:hover {
  transform: translateY(-2px);
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.dark-mode .hint-item:hover {
  background: rgba(30, 41, 59, 0.9);
}

.hint-item i {
  color: #3b82f6;
  font-size: 20px;
}

.hint-item span {
  font-size: 12px;
  color: #64748b;
}

/* 图片预览 */
.image-preview {
  animation: fadeIn 0.5s ease-out;
}

.preview-container {
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 24px;
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
  opacity: 0;
  transition: opacity 0.3s ease;
}

.preview-container:hover .preview-overlay {
  opacity: 1;
}

.preview-overlay-content {
  text-align: center;
  color: white;
}

.file-info-card {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
  padding: 20px;
  background: rgba(248, 250, 252, 0.8);
  border-radius: 16px;
}

.dark-mode .file-info-card {
  background: rgba(30, 41, 59, 0.8);
}

.info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.6);
  transition: all 0.3s ease;
}

.dark-mode .info-item {
  background: rgba(30, 41, 59, 0.6);
}

.info-item:hover {
  transform: translateY(-2px);
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.dark-mode .info-item:hover {
  background: rgba(30, 41, 59, 0.9);
}

.info-label {
  font-size: 12px;
  color: #64748b;
}

.info-value {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.dark-mode .info-value {
  color: #f8fafc;
}

.info-value.highlight {
  color: #3b82f6;
}

.info-value.success {
  color: #10b981;
}

.preview-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.action-btn {
  padding: 12px 32px;
  border-radius: 12px;
  font-weight: 500;
}

/* 结果区域 */
.result-container {
  padding: 0 30px 30px;
}

.result-content {
  height: 100%;
}

.result-success-card {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(16, 185, 129, 0.1));
  border-radius: 20px;
  padding: 24px;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.dark-mode .result-success-card {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05));
}

.result-success-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(16, 185, 129, 0.2);
}

.success-indicator {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 18px;
  font-weight: 600;
  color: #10b981;
}

.success-indicator i {
  font-size: 24px;
}

.result-meta {
  display: flex;
  gap: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #64748b;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 8px;
}

.dark-mode .meta-item {
  background: rgba(30, 41, 59, 0.6);
}

.markdown-content-wrapper {
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 24px;
  padding-right: 8px;
}

.markdown-content {
  background: white;
  border-radius: 16px;
  padding: 24px;
  line-height: 1.8;
}

.dark-mode .markdown-content {
  background: rgba(30, 41, 59, 0.9);
}

.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3) {
  color: #10b981;
  margin: 1.5em 0 0.8em;
  font-weight: 600;
}

.dark-mode .markdown-content :deep(h1),
.dark-mode .markdown-content :deep(h2),
.dark-mode .markdown-content :deep(h3) {
  color: #10b981;
}

.markdown-content :deep(p) {
  margin: 1em 0;
  color: #334155;
}

.dark-mode .markdown-content :deep(p) {
  color: #cbd5e1;
}

.result-actions {
  display: flex;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid rgba(16, 185, 129, 0.2);
}

.result-action-btn {
  flex: 1;
  padding: 12px 0;
  border-radius: 12px;
  font-weight: 500;
}

/* 结果占位符 */
.result-placeholder {
  text-align: center;
  padding: 60px 24px;
}

.placeholder-animation {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 32px;
}

.placeholder-icon {
  font-size: 64px;
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

.placeholder-content h4 {
  margin: 0 0 12px 0;
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
}

.dark-mode .placeholder-content h4 {
  color: #f8fafc;
}

.placeholder-content p {
  color: #64748b;
  margin: 0 0 32px 0;
}

.placeholder-features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  max-width: 400px;
  margin: 0 auto;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background: rgba(59, 130, 246, 0.05);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-2px);
  background: rgba(59, 130, 246, 0.1);
}

.feature-item i {
  color: #3b82f6;
  font-size: 20px;
}

.feature-item span {
  font-size: 12px;
  color: #64748b;
}

/* 加载动画 */
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

.dark-mode .glass-loading-mask {
  background: rgba(15, 23, 42, 0.9);
}

.loading-content {
  text-align: center;
  padding: 40px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  min-width: 400px;
}

.dark-mode .loading-content {
  background: rgba(30, 41, 59, 0.95);
}

.loading-animation {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 24px;
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
  color: #10b981;
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
  border: 2px solid rgba(16, 185, 129, 0.3);
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
  margin: 0 0 12px 0;
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
}

.dark-mode .loading-text h3 {
  color: #f8fafc;
}

.loading-text p {
  color: #64748b;
  margin: 0 0 24px 0;
}

.loading-progress {
  margin-top: 24px;
}

.progress-text {
  margin-top: 8px;
  font-size: 14px;
  color: #10b981;
  font-weight: 500;
}

/* 动画 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.5;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}

@keyframes scan {
  0% {
    top: 0;
  }
  50% {
    top: 100%;
  }
  100% {
    top: 0;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes ripple {
  0% {
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    width: 120px;
    height: 120px;
    opacity: 0;
  }
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .navbar-content {
    padding: 0 24px;
  }

  .main-content {
    padding: 100px 24px 40px;
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
    gap: 16px;
    padding: 16px;
    height: auto;
  }

  .nav-left, .nav-right {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .main-content {
    padding: 140px 16px 32px;
  }

  .card-header {
    flex-direction: column;
    text-align: center;
    gap: 16px;
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
    margin: 0 16px;
  }
}
</style>
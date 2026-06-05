<template>
  <div class="emergency-container">
    <div class="main-content">
      <div class="page-header">
        <el-button icon="ArrowLeft" @click="$router.push('/dashboard')" circle class="back-btn"></el-button>
        <h2>应急处理</h2>
      </div>
      <el-tabs v-model="activeTab" class="emergency-tabs" @tab-change="handleTabChange">
        <!-- 图片识别模式 Tab -->
        <el-tab-pane label="图片识别" name="image">
          <div class="tab-content">
            <el-row :gutter="24">
              <!-- 图片上传区 -->
              <el-col :span="24" :lg="12">
                <div class="upload-section">
                  <h3>上传伤口图片识别蛇类</h3>
                  <div class="upload-area" @dragover.prevent @drop.prevent="handleDrop">
                    <div class="upload-content" v-if="!uploadedImage">
                      <i class="el-icon-picture-outline upload-icon"></i>
                      <p>拖拽图片到此处或点击上传</p>
                      <el-button type="primary" @click="triggerUpload" class="upload-btn">选择图片</el-button>
                      <p class="hint">支持 JPG、PNG 格式，大小不超过 20MB（自动压缩优化）</p>
                    </div>
                    <div class="image-preview" v-else>
                      <img :src="uploadedImage" alt="上传的图片" class="preview-img">
                      <div class="preview-info">
                        <span class="file-info">
                          原始大小: {{ formatFileSize(rawFileSize) }} → 压缩后: {{ formatFileSize(compressedFileSize) }}
                        </span>
                      </div>
                      <div class="preview-actions">
                        <el-button type="primary" @click="retakePhoto">重新上传</el-button>
                        <el-button type="success" @click="analyzeImage" :loading="analyzing">开始分析</el-button>
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

                  <div class="upload-actions">
                    <el-button type="primary" plain @click="triggerUpload" class="extra-upload-btn">
                      <i class="el-icon-upload2"></i> 上传文件
                    </el-button>
                    <div class="compression-info">
                      <el-tooltip content="系统会自动压缩图片以提升识别速度，不影响识别精度">
                        <i class="el-icon-info"></i> 自动图片优化
                      </el-tooltip>
                    </div>
                  </div>
                </div>
              </el-col>

              <!-- 分析结果区 -->
              <el-col :span="24" :lg="12">
                <div class="results-section">
                  <h3>分析结果</h3>
                  <div class="result-content" v-if="analysisResult">
                    <!-- 分析成功 -->
                    <div class="result-card success-result">
                      <div class="result-header">
                        <el-tag type="success" size="large">分析成功</el-tag>
                        <span class="analysis-time">分析耗时: {{ analysisTime }}s</span>
                      </div>

                      <div class="markdown-result-wrapper">
                        <div class="markdown-result">
                          <!-- Safe template rendering instead of v-html string concat -->
                          <template v-if="Array.isArray(analysisResult)">
                            <div v-if="analysisResult.length === 0">
                              <p>未检测到任何蛇类信息。</p>
                            </div>
                            <div v-for="(snake, index) in analysisResult" :key="index" class="snake-result-item">
                              <h3>{{ index + 1 }}. {{ snake.snakeName || '未知蛇类' }}</h3>
                              <div class="snake-details">
                                <p><strong>毒液类型：</strong>{{ snake.venomType || '未知' }}</p>
                                <p><strong>别名：</strong>{{ snake.snakeAlias || '无' }}</p>
                              </div>
                              <div class="emergency-section">
                                <h4>典型症状：</h4>
                                <div v-html="renderMarkdown(snake.symptomDescription || '暂无症状描述')"></div>
                              </div>
                              <div class="emergency-section">
                                <h4>紧急处理方法：</h4>
                                <div v-html="renderMarkdown(snake.emergencyTreatment || '暂无处理建议')"></div>
                              </div>
                              <div class="emergency-section">
                                <h4>医疗注意事项：</h4>
                                <div v-html="renderMarkdown(snake.medicalAttention || '暂无医疗注意事项')"></div>
                              </div>
                            </div>
                          </template>
                          <template v-else>
                            <div v-html="renderMarkdown(analysisResult)"></div>
                          </template>
                        </div>
                      </div>

                      <div class="find-medical-care">
                        <el-button type="danger" plain size="large" @click="findMedicalCare">
                          <i class="el-icon-office-building"></i> 附近可救治医院
                        </el-button>
                      </div>
                    </div>
                  </div>

                  <div class="result-placeholder" v-else>
                    <div class="placeholder-content">
                      <i class="el-icon-document-copy placeholder-icon"></i>
                      <p>上传图片后将在此显示分析结果</p>
                      <div class="placeholder-tips">
                        <el-tag size="small">提示</el-tag>
                        <span>支持常见图片格式，系统会自动优化图片质量</span>
                      </div>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>

        <!-- 问题咨询模式 Tab -->
        <el-tab-pane label="问题咨询" name="question">
          <div class="tab-content">
            <el-card class="question-mode-card">
              <template #header>
                <div class="card-header">
                  <span>输入问题获取应急处理建议</span>
                </div>
              </template>

              <div class="question-section">
                <el-input
                    v-model="userQuestion"
                    type="textarea"
                    placeholder="请输入您的问题，例如：被眼镜蛇咬了怎么办？"
                    class="question-input"
                    :rows="4"
                    @keyup.enter="submitQuestion"
                />

                <el-button
                    type="primary"
                    @click="submitQuestion"
                    :loading="asking"
                    :disabled="!userQuestion || asking"
                    class="ask-btn"
                >
                  {{ asking ? '获取答案中...' : '获取应急建议' }}
                </el-button>
              </div>

              <!-- 历史记录 -->
              <div class="history-section" v-if="questionHistory.length > 0">
                <div class="history-header">
                  <h4>历史记录</h4>
                  <el-button type="danger" size="small" @click="clearQuestionHistory" plain>清除历史记录</el-button>
                </div>
                <div class="history-list">
                  <el-collapse v-model="activeHistory">
                    <el-collapse-item
                        v-for="(record, index) in questionHistory"
                        :key="index"
                        :name="index"
                    >
                      <template #title>
                        <span class="history-question">{{ record.question }}</span>
                      </template>
                      <div class="history-answer" v-html="renderMarkdown(record.answer)"></div>
                    </el-collapse-item>
                  </el-collapse>
                </div>
              </div>

              <!-- 回答结果展示 -->
              <div v-if="answerResult" class="answer-result">
                <h3>应急处理建议</h3>
                <div class="result-content markdown-rendered" v-html="renderMarkdown(answerResult)"></div>
                <div class="actions">
                  <el-button type="primary" @click="saveAnswerToLocal">保存到本地</el-button>
                  <el-button @click="printAnswer">打印建议</el-button>
                </div>
              </div>
            </el-card>
          </div>
        </el-tab-pane>

        <!-- 学名查询模式 Tab -->
        <el-tab-pane label="学名查询" name="name">
          <div class="tab-content">
            <el-card class="name-mode-card">
              <template #header>
                <div class="card-header">
                  <span>输入已知蛇类学名查询应急指南</span>
                </div>
              </template>

              <div class="name-query-section">
                <el-input
                    v-model="snakeName"
                    placeholder="请输入蛇类学名，如：眼镜蛇"
                    class="snake-name-input"
                    @keyup.enter="queryByName"
                    @input="updateSuggestions"
                >
                  <template #append>
                    <el-button
                        type="primary"
                        @click="queryByName"
                        :loading="querying"
                        :disabled="!snakeName || querying"
                    >
                      查询
                    </el-button>
                  </template>
                </el-input>

                <div class="auto-complete-suggestions" v-if="suggestions.length > 0">
                  <el-tag
                      v-for="suggestion in suggestions"
                      :key="suggestion"
                      @click="selectSuggestion(suggestion)"
                      class="suggestion-tag"
                  >
                    {{ suggestion }}
                  </el-tag>
                </div>

                <!-- 历史记录 -->
                <div class="history-section" v-if="historyRecords.length > 0">
                  <div class="history-header">
                    <h4>历史记录</h4>
                    <el-button type="danger" size="small" @click="clearNameHistory" plain>清除历史记录</el-button>
                  </div>
                  <div class="history-list">
                    <el-tag
                        v-for="record in historyRecords"
                        :key="record.timestamp"
                        @click="selectHistory(record)"
                        class="history-tag"
                    >
                      {{ record.snakeName }}
                    </el-tag>
                  </div>
                </div>
              </div>

              <!-- 学名查询结果展示 -->
              <div v-if="emergencyGuide" class="emergency-guide">
                <!-- 标题区域 -->
                <div class="guide-header">
                  <h2 class="main-title">🦎 {{ emergencyGuide.snakeName }}</h2>
                  <el-button type="default" size="small" @click="refreshQuery" class="refresh-btn">
                    刷新重查
                  </el-button>
                  <div class="header-tags" v-if="emergencyGuide.venomType || emergencyGuide.latinName">
                    <el-tag v-if="emergencyGuide.venomType" :type="getVenomTypeTag(emergencyGuide.venomType)" effect="dark">
                      {{ emergencyGuide.venomType }}
                    </el-tag>
                    <el-tag v-if="emergencyGuide.latinName" type="info" class="latin-tag">
                      {{ emergencyGuide.latinName }}
                    </el-tag>
                  </div>
                </div>

                <div class="guide-content">
                  <!-- 蛇类图片 - 卡片式轮播 -->
                  <div class="image-carousel-section" v-if="getImageUrls().length > 0">
                    <div class="carousel-wrapper">
                      <button class="carousel-btn left" @click="prevImage" :disabled="currentImageIndex === 0">
                        <el-icon><ArrowLeft /></el-icon>
                      </button>
                      <div class="carousel-track" ref="carouselTrack">
                        <div class="carousel-cards" :style="{ transform: `translateX(-${currentImageIndex * 100}%)` }">
                          <div class="image-card" v-for="(imgUrl, index) in getImageUrls()" :key="index" @dblclick="openImageViewer(imgUrl)">
                            <img
                                :src="getImageUrlProxy(imgUrl)"
                                :alt="`${emergencyGuide.snakeName}_${index + 1}`"
                                @load="handleImageLoad"
                                @error="handleImageError($event, index)"
                                :class="{'error': imageLoadErrors[index]}"
                            />
                            <div class="image-indicator">{{ index + 1 }} / {{ getImageUrls().length }}</div>
                            <div class="zoom-hint">双击查看大图</div>
                          </div>
                        </div>
                      </div>
                      <button class="carousel-btn right" @click="nextImage" :disabled="currentImageIndex >= getImageUrls().length - 1">
                        <el-icon><ArrowRight /></el-icon>
                      </button>
                    </div>
                    <div class="carousel-dots">
                      <span
                          v-for="(_, index) in getImageUrls()"
                          :key="index"
                          :class="['dot', { active: currentImageIndex === index }]"
                          @click="currentImageIndex = index"
                      ></span>
                    </div>
                  </div>

                  <!-- 信息网格布局 -->
                  <div class="info-grid">
                    <!-- 毒液类型与属性 -->
                    <div class="info-item full-width highlight" v-if="emergencyGuide.venomType">
                      <div class="item-label"><i class="el-icon-warning-outline"></i> 毒液类型与属性</div>
                      <div class="item-value">
                        {{ emergencyGuide.venomType }}
                        <span class="alias-text">({{ emergencyGuide.snakeAlias || emergencyGuide.snakeName }})</span>
                      </div>
                    </div>

                    <!-- 规范急救流程 -->
                    <div class="info-item full-width flow-card" v-if="emergencyGuide.emergencyTreatment">
                      <div class="item-label"><i class="el-icon-first-aid-kit"></i> 规范急救流程</div>
                      <div class="item-content" v-html="renderNumberedList(emergencyGuide.emergencyTreatment)"></div>
                    </div>

                    <!-- 严禁行为 -->
                    <div class="info-item full-width forbidden-card" v-if="emergencyGuide.forbiddenActions">
                      <div class="item-label"><i class="el-icon-circle-close"></i> 严禁行为 (危险!)</div>
                      <div class="item-content" v-html="renderNumberedList(emergencyGuide.forbiddenActions)"></div>
                    </div>

                    <!-- 血清与就医科室 -->
                    <div class="info-row-flex">
                      <div class="info-item flex-1 serum-card" v-if="emergencyGuide.serumType">
                        <div class="item-label"><i class="el-icon-medicine-box"></i> 推荐血清</div>
                        <div class="item-value">{{ emergencyGuide.serumType }}</div>
                      </div>
                      <div class="info-item flex-1 hospital-card" v-if="emergencyGuide.hospitalDepartment">
                        <div class="item-label"><i class="el-icon-office-building"></i> 建议就医科室</div>
                        <div class="item-value">{{ emergencyGuide.hospitalDepartment }}</div>
                      </div>
                    </div>

                    <!-- 典型症状 -->
                    <div class="info-item full-width symptom-card" v-if="emergencyGuide.symptomDescription">
                      <div class="item-label"><i class="el-icon-info"></i> 典型症状</div>
                      <div class="item-content" v-html="renderMarkdown(emergencyGuide.symptomDescription)"></div>
                    </div>

                    <!-- 医疗注意 -->
                    <div class="info-item full-width medical-card" v-if="emergencyGuide.medicalAttention">
                      <div class="item-label"><i class="el-icon-document"></i> 医疗注意事项</div>
                      <div class="item-content" v-html="renderMarkdown(emergencyGuide.medicalAttention)"></div>
                    </div>
                  </div>

                  <!-- 操作按钮 -->
                  <div class="guide-actions">
                    <el-button type="primary" @click="saveToLocal">保存指南</el-button>
                    <el-button @click="printGuide">打印备份</el-button>
                  </div>
                </div>
              </div>

              <!-- 错误信息展示 -->
              <div v-if="errorMessage" class="error-message">
                <el-alert
                    :title="errorMessage"
                    type="error"
                    show-icon
                    :closable="false"
                />
              </div>
            </el-card>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 加载动画遮罩 -->
    <div class="loading-mask" v-if="analyzing">
      <el-card class="loading-card">
        <div class="loading-content">
          <i class="el-icon-loading" style="font-size: 36px; color: var(--green-500);"></i>
          <p>正在分析中，请稍候...</p>
          <el-progress :percentage="analysisProgress" :stroke-width="8" color="#10b981"></el-progress>
        </div>
      </el-card>
    </div>

    <!-- 图片查看器 -->
    <Teleport to="body">
      <div v-if="showImageViewer" class="image-viewer-overlay" @click="closeImageViewer">
        <div class="image-viewer-content" @click.stop>
          <button class="viewer-close" @click="closeImageViewer">
            <el-icon><Close /></el-icon>
          </button>
          <img :src="viewerImageUrl" class="viewer-image" />
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElNotification } from 'element-plus'
import api from '@/services/api'
import MarkdownIt from 'markdown-it'


// 初始化 Markdown 渲染器
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  xhtmlOut: true
})

// 响应式数据
const activeTab = ref('image')
const userQuestion = ref('')
const asking = ref(false)
const answerResult = ref('')
const querying = ref(false)
const emergencyGuide = ref(null)
const snakeName = ref('')
const suggestions = ref([])
const errorMessage = ref('')
const historyRecords = ref([])
const questionHistory = ref([])
const activeHistory = ref([])
const imageLoadFailed = ref(false)
const imageLoadErrors = ref([])
const currentImageIndex = ref(0)
const currentImageSrc = ref('')
const imageLoading = ref(false)
const showImageViewer = ref(false)
const viewerImageUrl = ref('')
const imageCacheBuster = ref(0) // 刷新时更新，用于绕过浏览器图片缓存

// 图片轮播方法
const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  }
}

const nextImage = () => {
  if (currentImageIndex.value < getImageUrls().length - 1) {
    currentImageIndex.value++
  }
}

// 打开大图查看
const openImageViewer = (imgUrl) => {
  viewerImageUrl.value = getImageUrlProxy(imgUrl)
  showImageViewer.value = true
}

const closeImageViewer = () => {
  showImageViewer.value = false
  viewerImageUrl.value = ''
}

const handleImageError = (event, index) => {
  console.error(`图片 ${index} 加载失败:`, event)
  imageLoadErrors.value[index] = true
  imageLoadFailed.value = true
}

// 图片上传相关数据
const uploadedImage = ref(null)
const uploadedImageFile = ref(null)
const rawFileSize = ref(0)
const compressedFileSize = ref(0)
const analyzing = ref(false)
const analysisResult = ref('')
const analysisTime = ref(0)
const analysisProgress = ref(0)
const progressTimer = ref(null)
const fileInput = ref(null)

// 路由实例
const route = useRoute()
const router = useRouter()

// 常见蛇类名称，用于自动补全
const commonSnakeNames = [
  '银环蛇', '金环蛇', '竹叶青', '蝮蛇', '五步蛇',
  '眼镜蛇', '眼镜王蛇', '蝰蛇', '烙铁头蛇', '白唇竹叶青'
]

// 图片引用
const snakeImage = ref(null)

// 获取图片URL数组
const getImageUrls = () => {
  if (!emergencyGuide.value) {
    return [];
  }

  // 后端返回了 imageUrls 字段（populateImageUrls 填充，校验文件是否存在）
  if ('imageUrls' in emergencyGuide.value) {
    // 字段存在：有数据就用，为空就是真没图，不降级
    return (emergencyGuide.value.imageUrls || []).filter(url => url && url.trim() !== '');
  }

  // 降级：后端没返回 imageUrls 字段时，从主图片URL拼接构造
  if (!emergencyGuide.value.imageUrl) {
    return [];
  }

  const mainImageUrl = emergencyGuide.value.imageUrl;
  const imageUrls = [mainImageUrl];

  const match = mainImageUrl.match(/^(.+?)_(\d+)\.(\w+)$/);
  if (match) {
    const baseName = match[1];
    const ext = match[3];
    for (let i = 2; i <= 3; i++) {
      imageUrls.push(`${baseName}_${i}.${ext}`);
    }
  }

  return imageUrls.filter(url => url && url.trim() !== '');
}

// 获取图片代理URL
const getImageUrlProxy = (imageUrl) => {
  if (!imageUrl) return null;

  const bust = imageCacheBuster.value ? `&_t=${imageCacheBuster.value}` : '';

  // 如果图片URL是在线URL，则使用后端代理接口
  if (imageUrl.startsWith('http')) {
    const encodedUrl = encodeURIComponent(imageUrl)
    return `/api/emergency/image/online?url=${encodedUrl}${bust}`
  } else {
    // 如果是本地图片名称（如 蛇名.jpg），则使用本地图片接口
    const encodedPath = encodeURIComponent(imageUrl);
    return `/api/emergency/image/local?path=${encodedPath}${bust}`;
  }
}

// 获取后端代理的图片URL
const getBackendImageUrl = (emergencyGuide) => {
  if (emergencyGuide && emergencyGuide.imageUrl) {
    const bust = imageCacheBuster.value ? `&_t=${imageCacheBuster.value}` : '';

    // 如果图片URL是在线URL，则使用后端代理接口
    if (emergencyGuide.imageUrl.startsWith('http')) {
      // 使用后端代理接口访问在线图片
      const encodedUrl = encodeURIComponent(emergencyGuide.imageUrl)
      return `/api/emergency/image/online?url=${encodedUrl}${bust}`
    } else {
      // 如果是本地图片名称（如 蛇名.jpg），则使用本地图片接口
      // 提取文件名部分，不包含路径
      let fileName = emergencyGuide.imageUrl;
      if (fileName.includes('/')) {
        // 如果路径中包含斜杠，提取最后一部分作为文件名
        fileName = fileName.split('/').pop();
      }
      const encodedPath = encodeURIComponent(fileName);
      return `/api/emergency/image/local?path=${encodedPath}${bust}`;
    }
  }
  return null
}

// 处理图片加载成功
const handleImageLoad = () => {
  imageLoading.value = false
  imageLoadFailed.value = false
}

// 清空结果并强制重新下载图片
const refreshQuery = async () => {
  if (!snakeName.value.trim()) return
  emergencyGuide.value = null
  errorMessage.value = ''
  imageLoadFailed.value = false
  imageLoadErrors.value = []
  currentImageIndex.value = 0
  showImageViewer.value = false
  imageCacheBuster.value = Date.now() // 绕过浏览器图片缓存

  querying.value = true
  imageLoadFailed.value = false
  currentImageSrc.value = ''
  imageLoading.value = true

  try {
    const response = await api.emergency.refreshEmergencyGuide(snakeName.value.trim())

    if (response.data.code === 200) {
      emergencyGuide.value = response.data.data
      if (emergencyGuide.value && emergencyGuide.value.imageUrl) {
        currentImageSrc.value = getBackendImageUrl(emergencyGuide.value)
      }
      saveNameToHistory(snakeName.value.trim())
      ElMessage.success('已触发图片重新获取，请稍后刷新查看新图片')
    } else {
      errorMessage.value = response.data.message || '未找到该蛇类的应急信息'
      emergencyGuide.value = null
    }
  } catch (error) {
    console.error('刷新查询失败:', error)
    errorMessage.value = '刷新查询失败: ' + (error.message || '未知错误')
    emergencyGuide.value = null
  } finally {
    querying.value = false
    imageLoading.value = false
  }
}

// 加载历史记录
const loadHistory = () => {
  const history = localStorage.getItem('emergency_guide_history')
  if (history) {
    historyRecords.value = JSON.parse(history)
  }

  const questionHistoryStr = localStorage.getItem('emergency_question_history')
  if (questionHistoryStr) {
    questionHistory.value = JSON.parse(questionHistoryStr)
  }
}

// 保存问题咨询历史记录
const saveQuestionToHistory = (question, answer) => {
  const record = {
    question,
    answer,
    timestamp: new Date().getTime(),
    date: new Date().toLocaleString()
  }

  // 添加到历史记录开头
  questionHistory.value.unshift(record)

  // 限制历史记录数量为10条
  if (questionHistory.value.length > 10) {
    questionHistory.value = questionHistory.value.slice(0, 10)
  }

  // 保存到localStorage
  localStorage.setItem('emergency_question_history', JSON.stringify(questionHistory.value))
}

// 保存学名查询历史记录
const saveNameToHistory = (snakeName) => {
  const record = {
    snakeName,
    timestamp: new Date().getTime(),
    date: new Date().toLocaleString()
  }

  // 添加到历史记录开头
  historyRecords.value.unshift(record)

  // 限制历史记录数量为10条
  if (historyRecords.value.length > 10) {
    historyRecords.value = historyRecords.value.slice(0, 10)
  }

  // 保存到localStorage
  localStorage.setItem('emergency_guide_history', JSON.stringify(historyRecords.value))
}

// 处理 Tab 切换
const handleTabChange = () => {
  answerResult.value = ''
  emergencyGuide.value = null
  snakeName.value = ''
  suggestions.value = []
  errorMessage.value = ''
  userQuestion.value = ''
  imageLoadFailed.value = false
  imageLoadErrors.value = []
  currentImageIndex.value = 0
  querying.value = false
}

// 提交问题
const submitQuestion = async () => {
  if (!userQuestion.value.trim()) {
    ElMessage.warning('请输入问题')
    return
  }

  asking.value = true
  try {
    const response = await api.emergency.askEmergencyQuestion(userQuestion.value.trim())

    if (response.data.code === 200) {
      answerResult.value = response.data.data
      saveQuestionToHistory(userQuestion.value.trim(), response.data.data)
      ElMessage.success('获取应急建议成功')
    } else {
      ElMessage.error(response.data.message || '获取应急建议失败')
    }
  } catch (error) {
    console.error('获取应急建议失败:', error)
    ElMessage.error('获取应急建议失败: ' + (error.message || '未知错误'))
  } finally {
    asking.value = false
  }
}

// 根据学名查询
const queryByName = async () => {
  if (!snakeName.value.trim()) {
    ElMessage.warning('请输入蛇类学名')
    return
  }

  querying.value = true
  errorMessage.value = ''
  imageLoadFailed.value = false // 重置图片加载状态
  currentImageSrc.value = ''    // 重置当前图片源
  imageLoading.value = true     // 设置图片加载状态

  try {
    // 首先尝试通过学名查询接口获取完整信息（包括AI生成的内容）
    const response = await api.emergency.getEmergencyGuideByName(snakeName.value.trim())

    if (response.data.code === 200) {
      emergencyGuide.value = response.data.data
      // 初始化图片源
      if (emergencyGuide.value && emergencyGuide.value.imageUrl) {
        currentImageSrc.value = getBackendImageUrl(emergencyGuide.value)
      }
      saveNameToHistory(snakeName.value.trim())
      ElMessage.success('查询成功')
    } else {
      errorMessage.value = response.data.message || '未找到该蛇类的应急信息'
      emergencyGuide.value = null
    }
  } catch (error) {
    console.error('查询失败:', error)
    errorMessage.value = '查询失败: ' + (error.message || '未知错误')
    emergencyGuide.value = null
  } finally {
    querying.value = false
    imageLoading.value = false
  }
}

// 输入学名时更新建议列表
const updateSuggestions = () => {
  if (!snakeName.value.trim()) {
    suggestions.value = []
    return
  }

  const input = snakeName.value.trim()
  suggestions.value = commonSnakeNames.filter(name =>
      name.includes(input) && name !== input
  )
}

// 选择自动补全建议
const selectSuggestion = (suggestion) => {
  snakeName.value = suggestion
  suggestions.value = []
  queryByName()
}

// 选择历史记录
const selectHistory = (record) => {
  snakeName.value = record.snakeName
  queryByName()
}

// 渲染 Markdown 内容
const renderMarkdown = (content) => {
  if (!content) return ''
  if (typeof content !== 'string') {
    content = String(content)
  }
  const cleanedText = content.replace(/\n{3,}/g, '\n\n').trim()
  try {
    return md.render(cleanedText)
  } catch (e) {
    return `<p>${cleanedText}</p>`
  }
}

// 渲染编号列表（处理 "1. xxx" 格式）
const renderNumberedList = (content) => {
  if (!content) return '<p class="no-content">暂无详细信息</p>'
  
  let text = String(content).trim()
  
  // 清理多余的空行
  text = text.replace(/\n{3,}/g, '\n')
  
  // 按行分割并过滤空行
  const lines = text.split('\n').filter(line => line.trim())
  
  if (lines.length === 0) {
    return '<p class="no-content">暂无详细信息</p>'
  }
  
  let html = '<ol class="numbered-flow">'
  
  lines.forEach(line => {
    // 移除行首可能存在的数字序号，由 CSS 控制样式
    const cleanLine = line.replace(/^\d+[.、\s]*/, '').trim()
    if (cleanLine) {
      html += `<li>${cleanLine}</li>`
    }
  })
  
  html += '</ol>'
  return html
}

// 获取毒液类型对应的标签颜色
const getVenomTypeTag = (venomType) => {
  if (!venomType) return 'info'
  if (venomType.includes('神经') || venomType.includes('剧毒')) return 'danger'
  if (venomType.includes('血液') || venomType.includes('有毒')) return 'warning'
  if (venomType.includes('混合')) return 'warning'
  return 'success'
}

// 根据蛇名获取对应的解毒血清
const getSerumType = (snakeName) => {
  const serumMap = {
    '银环蛇': '抗银环蛇毒血清',
    '眼镜蛇': '抗眼镜蛇毒血清',
    '眼镜王蛇': '抗眼镜王蛇毒血清',
    '五步蛇': '抗五步蛇毒血清',
    '竹叶青': '抗竹叶青毒血清',
    '蝮蛇': '抗蝮蛇毒血清',
    '蝰蛇': '抗蝰蛇毒血清',
    '太攀蛇': '抗太攀蛇毒血清',
    '金环蛇': '抗金环蛇毒血清',
    '海蛇': '抗海蛇毒血清'
  }
  return serumMap[snakeName] || '抗蛇毒血清（请遵医嘱）'
}

// 保存答案到本地
const saveAnswerToLocal = () => {
  if (!answerResult.value) {
    ElMessage.warning('请先获取应急建议')
    return
  }

  const answerData = {
    question: userQuestion.value,
    answer: answerResult.value,
    savedAt: new Date().toLocaleString()
  }

  localStorage.setItem(`emergency_answer_${Date.now()}`, JSON.stringify(answerData))
  ElNotification({
    title: '保存成功',
    message: '应急建议已保存到本地',
    type: 'success'
  })
}

// 打印应急建议
const printAnswer = () => {
  if (!answerResult.value) {
    ElMessage.warning('请先获取应急建议')
    return
  }

  const printContent = `
    <html>
      <head>
        <title>应急处理建议</title>
        <style>
          body { font-family: Arial, sans-serif; }
          h1, h2, h3 { color: #333; }
          .section { margin-bottom: 20px; }
          .label { font-weight: bold; }
        </style>
      </head>
      <body>
        <h1>应急处理建议</h1>
        <div class="section">
          <div class="label">问题:</div>
          <div>${userQuestion.value}</div>
        </div>
        <div class="section">
          <div class="label">建议:</div>
          <div>${answerResult.value}</div>
        </div>
      </body>
    </html>
  `

  const printWindow = window.open('', '_blank')
  printWindow.document.write(printContent)
  printWindow.document.close()
  printWindow.print()
}

// 保存指南到本地
const saveToLocal = () => {
  if (!emergencyGuide.value) {
    ElMessage.warning('请先获取应急指南')
    return
  }

  const guideData = {
    ...emergencyGuide.value,
    savedAt: new Date().toLocaleString()
  }

  localStorage.setItem(`emergency_guide_${emergencyGuide.value.snakeName}`, JSON.stringify(guideData))
  ElNotification({
    title: '保存成功',
    message: `${emergencyGuide.value.snakeName} 应急指南已保存到本地`,
    type: 'success'
  })
}

// 打印指南
const printGuide = () => {
  if (!emergencyGuide.value) {
    ElMessage.warning('请先获取应急指南')
    return
  }

  const printContent = `
    <html>
      <head>
        <title>${emergencyGuide.value.snakeName} 应急处理指南</title>
        <style>
          body { font-family: Arial, sans-serif; }
          h1, h2, h3 { color: #333; }
          .section { margin-bottom: 20px; }
          .label { font-weight: bold; }
        </style>
      </head>
      <body>
        <h1>${emergencyGuide.value.snakeName} 应急处理指南</h1>
        <div class="section">
          <div class="label">毒液类型:</div>
          <div>${emergencyGuide.value.venomType}</div>
        </div>
        <div class="section">
          <div class="label">别名:</div>
          <div>${emergencyGuide.value.snakeAlias}</div>
        </div>
        <div class="section">
          <div class="label">典型症状:</div>
          <div>${emergencyGuide.value.symptomDescription}</div>
        </div>
        <div class="section">
          <div class="label">紧急处理:</div>
          <div>${emergencyGuide.value.emergencyTreatment}</div>
        </div>
        <div class="section">
          <div class="label">医疗注意:</div>
          <div>${emergencyGuide.value.medicalAttention}</div>
        </div>
      </body>
    </html>
  `

  const printWindow = window.open('', '_blank')
  printWindow.document.write(printContent)
  printWindow.document.close()
  printWindow.print()
}

// 图片上传相关方法
const formatFileSize = (bytes) => {
  if (!bytes || isNaN(bytes)) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
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

const goBack = () => {
  window.history.go(-1)
}

const triggerUpload = () => {
  fileInput.value.click()
}

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    rawFileSize.value = file.size
    compressImage(file)
  }
}

const handleDrop = (event) => {
  const file = event.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) {
    rawFileSize.value = file.size
    compressImage(file)
  }
}

const compressImage = (file) => {
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
              ElMessage.error('图片压缩失败，请重试')
              return
            }

            compressedFileSize.value = blob.size
            uploadedImageFile.value = new File([blob], file.name, {
              type: file.type || 'image/jpeg',
              lastModified: Date.now()
            })

            const previewReader = new FileReader()
            previewReader.onload = (previewEvent) => {
              uploadedImage.value = previewEvent.target.result
            }
            previewReader.readAsDataURL(blob)

            const savedPercent = Math.round((1 - blob.size / file.size) * 100)
            ElMessage.success(`图片压缩完成，节省${savedPercent}%存储空间`)
          },
          file.type || 'image/jpeg',
          quality
      )
    }

    img.onerror = () => {
      ElMessage.error('图片加载失败，请选择有效的图片文件')
    }
  }

  reader.onerror = () => {
    ElMessage.error('文件读取失败，请重试')
  }
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
    ElMessage.warning('请先上传图片')
    return
  }

  analyzing.value = true
  startProgressSimulation()
  const startTime = Date.now()

  try {
    const formData = new FormData()
    formData.append('image', uploadedImageFile.value)

    const response = await api.emergency.analyzeWoundImage(formData)

    analysisTime.value = ((Date.now() - startTime) / 1000).toFixed(1)
    const resultData = response.data

    if (resultData && resultData.code === 200 && resultData.data) {
      // 确保数据是数组格式
      if (Array.isArray(resultData.data)) {
        analysisResult.value = resultData.data
      } else {
        // 如果不是数组，包装成数组
        analysisResult.value = [resultData.data]
      }
    } else {
      analysisResult.value = []
    }

    ElMessage.success('分析完成')
  } catch (error) {
    console.error('分析失败:', error)
    let errorMsg = '分析失败'
    if (error.message && error.message.includes('timeout')) {
      errorMsg = '分析请求超时，请检查网络或后端服务'
    } else if (error.response?.data?.message) {
      errorMsg += ': ' + error.response.data.message
    } else if (error.message) {
      errorMsg += ': ' + error.message
    } else {
      errorMsg += ': 未知错误'
    }
    ElMessage.error(errorMsg)
  } finally {
    analyzing.value = false
    analysisProgress.value = 100
    clearInterval(progressTimer.value)
    setTimeout(() => {
      analysisProgress.value = 0
    }, 1000)
  }
}

const findMedicalCare = () => {
  ElMessage.info('正在跳转到寻医页面...')
}

// 清除问题咨询历史记录
const clearQuestionHistory = () => {
  questionHistory.value = []
  localStorage.removeItem('emergency_question_history')
  ElMessage.success('问题咨询历史记录已清除')
}

// 清除学名查询历史记录
const clearNameHistory = () => {
  historyRecords.value = []
  localStorage.removeItem('emergency_guide_history')
  ElMessage.success('学名查询历史记录已清除')
}

// 清除所有问答缓存（后端）
const clearAllQaCache = async () => {
  try {
    const response = await api.emergency.clearQaCache()
    if (response.data.code === 200) {
      ElMessage.success('问答缓存已清除')
    } else {
      ElMessage.error(response.data.message || '清除问答缓存失败')
    }
  } catch (error) {
    console.error('清除问答缓存失败:', error)
    ElMessage.error('清除问答缓存失败: ' + (error.message || '未知错误'))
  }
}

// 组件挂载时的操作
onMounted(() => {
  loadHistory()

  // 检查 URL 参数，如果有 snakeName 和 tab 参数，则自动切换到学名查询模式并执行查询
  const { snakeName: urlSnakeName, tab } = route.query

  if (tab === 'name' && urlSnakeName) {
    // 切换到学名查询标签
    activeTab.value = 'name'

    // 设置蛇类名称
    snakeName.value = urlSnakeName

    // 自动执行查询
    queryByName()
  }
})
</script>

<style scoped>
.emergency-container {
  min-height: 100%;
  background: linear-gradient(135deg, var(--ink-50) 0%, var(--ink-100) 100%);
  padding: 0;
  box-sizing: border-box;
  position: relative;
  font-family: var(--font-sans);
}

.page-header {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.page-header h2 {
  margin: 0;
  font-size: var(--text-xl);
  font-weight: var(--weight-semibold);
  color: var(--ink-900);
}

.back-btn {
  flex-shrink: 0;
}

.main-content {
  padding: var(--space-6) var(--space-6) var(--space-10);
  max-width: 1400px;
  margin: 0 auto;
}

.emergency-tabs {
  box-shadow: var(--shadow-sm);
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--surface-white);
}

.tab-content {
  padding: var(--space-5);
}

.question-mode-card,
.name-mode-card {
  border: none;
  box-shadow: var(--shadow-sm);
}

.card-header {
  font-weight: var(--weight-bold);
  font-size: var(--text-base);
  color: var(--ink-900);
}

.question-section {
  max-width: 800px;
  margin: 0 auto var(--space-8);
}

.question-input {
  margin-bottom: var(--space-5);
}

.ask-btn {
  width: 100%;
}

.answer-result {
  margin-top: var(--space-8);
  padding: var(--space-5);
  background-color: var(--surface-cool);
  border-radius: var(--radius-md);
}

.answer-result h3 {
  margin-top: 0;
  color: var(--ink-900);
}

.result-content {
  white-space: normal;
  word-wrap: break-word;
  word-break: break-word;
}

.markdown-rendered {
  line-height: 1.8;
  color: var(--ink-700);
}

.markdown-rendered :deep(h1),
.markdown-rendered :deep(h2),
.markdown-rendered :deep(h3),
.markdown-rendered :deep(h4) {
  color: var(--ink-900);
  margin: 1.2em 0 0.6em;
  font-weight: var(--weight-semibold);
  line-height: 1.4;
}

.markdown-rendered :deep(h1) { font-size: var(--text-xl); }
.markdown-rendered :deep(h2) { font-size: var(--text-lg); }
.markdown-rendered :deep(h3) { font-size: var(--text-base); }
.markdown-rendered :deep(h4) { font-size: 15px; }

.markdown-rendered :deep(p) {
  margin: 0.8em 0;
  line-height: 1.8;
}

.markdown-rendered :deep(ul),
.markdown-rendered :deep(ol) {
  margin: 0.8em 0;
  padding-left: 1.5em;
}

.markdown-rendered :deep(li) {
  margin: 0.4em 0;
  line-height: 1.6;
}

.markdown-rendered :deep(strong) {
  color: var(--ink-900);
  font-weight: var(--weight-semibold);
}

.markdown-rendered :deep(code) {
  background: var(--ink-50);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  font-family: var(--font-mono, monospace);
  font-size: 0.9em;
}

.markdown-rendered :deep(pre) {
  background: var(--ink-50);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  overflow-x: auto;
}

.name-query-section {
  max-width: 600px;
  margin: 0 auto var(--space-8);
}

.snake-name-input {
  margin-bottom: 15px;
}

.auto-complete-suggestions {
  text-align: left;
  margin-bottom: var(--space-5);
}

.suggestion-tag {
  margin-right: var(--space-3);
  margin-bottom: var(--space-3);
  cursor: pointer;
}

.history-section {
  margin-top: var(--space-8);
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-3);
}

.history-header h4 {
  margin: 0;
}

.history-list {
  text-align: left;
}

.history-tag {
  margin-right: var(--space-3);
  margin-bottom: var(--space-3);
  cursor: pointer;
}

.history-question {
  font-weight: var(--weight-bold);
  color: var(--ink-900);
}

.history-answer {
  padding: var(--space-3);
  background-color: var(--ink-50);
  border-radius: var(--radius-sm);
  line-height: 1.8;
}

.history-answer :deep(h1),
.history-answer :deep(h2),
.history-answer :deep(h3),
.history-answer :deep(h4) {
  color: var(--ink-900);
  margin: 1em 0 0.5em;
}

.history-answer :deep(p) {
  margin: 0.6em 0;
  line-height: 1.7;
}

.history-answer :deep(ul),
.history-answer :deep(ol) {
  margin: 0.6em 0;
  padding-left: 1.5em;
}

.history-answer :deep(strong) {
  color: var(--ink-900);
}

.error-message {
  margin-top: var(--space-5);
}

.actions {
  margin-top: var(--space-5);
  text-align: center;
}

.upload-section, .results-section {
  background: var(--surface-white);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  box-shadow: var(--shadow-xs);
  margin-bottom: var(--space-6);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.upload-section:hover, .results-section:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.upload-section h3, .results-section h3 {
  margin-top: 0;
  margin-bottom: var(--space-6);
  font-size: var(--text-lg);
  color: var(--ink-900);
  font-weight: var(--weight-semibold);
  border-bottom: 1px solid var(--ink-50);
  padding-bottom: var(--space-3);
  position: relative;
}

.upload-section h3::after, .results-section h3::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 60px;
  height: 2px;
  background: var(--green-600);
  border-radius: 1px;
}

.upload-area {
  border: 2px dashed var(--ink-200);
  border-radius: var(--radius-lg);
  padding: var(--space-12) var(--space-6);
  text-align: center;
  transition: all var(--transition-base);
  margin-bottom: var(--space-6);
  background: var(--ink-50);
}

.upload-area:hover {
  border-color: var(--green-600);
  background: var(--green-50);
}

.upload-icon {
  font-size: 56px;
  color: var(--ink-400);
  margin-bottom: var(--space-5);
  transition: color var(--transition-base);
}

.upload-area:hover .upload-icon {
  color: var(--green-600);
}

.upload-content p {
  margin: var(--space-3) 0;
  color: var(--ink-700);
  font-size: 15px;
}

.upload-btn {
  margin-top: var(--space-2);
  padding: var(--space-3) var(--space-6);
  font-size: 15px;
  border-radius: var(--radius-md);
  background: var(--green-600);
  border-color: var(--green-600);
}

.hint {
  font-size: var(--text-sm);
  color: var(--ink-500);
  margin-top: var(--space-4) !important;
}

.preview-img {
  max-width: 100%;
  max-height: 320px;
  border-radius: var(--radius-md);
  margin-bottom: var(--space-4);
  box-shadow: var(--shadow-md);
}

.preview-info {
  margin-bottom: var(--space-5);
  font-size: var(--text-sm);
  color: var(--ink-500);
}

.file-info {
  background: var(--ink-50);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
}

.preview-actions {
  display: flex;
  justify-content: center;
  gap: var(--space-4);
  margin-top: var(--space-2);
}

.upload-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--space-4);
  border-top: 1px solid var(--ink-50);
}

.extra-upload-btn {
  padding: 9px var(--space-5);
  border-radius: var(--radius-md);
  border-color: var(--green-600);
  color: var(--green-600);
}

.compression-info {
  font-size: var(--text-sm);
  color: var(--ink-500);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.result-placeholder {
  text-align: center;
  padding: var(--space-16) var(--space-6);
  color: var(--ink-500);
  background: var(--ink-50);
  border-radius: var(--radius-md);
}

.placeholder-content {
  max-width: 400px;
  margin: 0 auto;
}

.placeholder-icon {
  font-size: 64px;
  margin-bottom: var(--space-5);
  color: var(--ink-200);
}

.placeholder-tips {
  margin-top: var(--space-4);
  font-size: var(--text-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
}

.guide-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) var(--space-5);
  background: linear-gradient(135deg, var(--green-50) 0%, var(--success-bg) 100%);
  border-radius: var(--radius-md) var(--radius-md) 0 0;
  border-bottom: 2px solid var(--green-500);
}

.main-title {
  margin: 0;
  font-size: var(--text-2xl);
  color: var(--green-600);
  font-weight: var(--weight-bold);
}

.header-tags {
  display: flex;
  gap: var(--space-2);
  align-items: center;
}

.refresh-btn {
  flex-shrink: 0;
}

.latin-tag {
  font-style: italic;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-5);
}

.info-item {
  padding: 18px var(--space-5);
  border-radius: var(--radius-md);
  background: var(--surface-white);
  box-shadow: var(--shadow-xs);
  transition: box-shadow var(--transition-base);
}

.info-item:hover {
  box-shadow: var(--shadow-sm);
}

.item-label {
  font-weight: var(--weight-semibold);
  font-size: 15px;
  margin-bottom: var(--space-3);
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--ink-700);
}

.item-label i {
  font-size: var(--text-lg);
}

.item-value {
  font-size: 17px;
  font-weight: var(--weight-semibold);
  color: var(--ink-900);
}

.alias-text {
  font-weight: var(--weight-normal);
  color: var(--ink-500);
  font-size: 15px;
}

.item-content {
  color: var(--ink-700);
  line-height: 1.8;
}

.full-width { width: 100%; }
.flex-1 { flex: 1; }

.info-row-flex {
  display: flex;
  gap: var(--space-4);
}

.highlight {
  background: var(--warning-bg);
  border: 1px solid var(--warning-border);
}

.flow-card {
  border-left: 5px solid var(--green-500);
  background: linear-gradient(to right, var(--green-50), var(--surface-white));
}

.flow-card .item-label i { color: var(--green-600); }

.forbidden-card {
  border-left: 5px solid var(--danger);
  background: linear-gradient(to right, var(--danger-bg), var(--surface-white));
}

.forbidden-card .item-label i { color: var(--danger); }

.serum-card {
  background: linear-gradient(135deg, var(--info-bg) 0%, var(--blue-100) 100%);
  border: 1px solid var(--blue-200);
}

.serum-card .item-label i { color: var(--blue-700); }
.serum-card .item-value { color: var(--blue-700); }

.hospital-card {
  background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
  border: 1px solid #c084fc;
}

.hospital-card .item-label i { color: #7c3aed; }
.hospital-card .item-value { color: #6d28d9; }

.symptom-card { background: var(--ink-50); }
.symptom-card .item-label i { color: var(--ink-500); }

.medical-card {
  background: var(--green-50);
  border: 1px solid var(--green-200);
}

.medical-card .item-label i { color: var(--green-600); }

:deep(.numbered-flow) { list-style: none; padding: 0; margin: 0; }

:deep(.numbered-flow li) {
  margin-bottom: var(--space-3);
  padding: var(--space-3) var(--space-4) var(--space-3) var(--space-6);
  position: relative;
  line-height: 1.7;
  background: var(--ink-50);
  border-radius: var(--radius-md);
}

:deep(.numbered-flow li:last-child) { margin-bottom: 0; }

:deep(.numbered-flow li::before) {
  content: '•';
  position: absolute;
  left: 10px;
  color: var(--ink-500);
  font-weight: var(--weight-bold);
}

.flow-card :deep(.numbered-flow li) {
  border-left: 3px solid var(--green-500);
}

.forbidden-card :deep(.numbered-flow li) {
  border-left: 3px solid var(--danger);
  background: var(--danger-bg);
}

.guide-actions {
  display: flex;
  justify-content: center;
  gap: var(--space-4);
  padding: var(--space-5);
  border-top: 1px solid var(--ink-200);
  margin-top: var(--space-2);
}

.guide-actions .el-button {
  padding: var(--space-3) var(--space-6);
  font-size: 15px;
}

:deep(.no-content) {
  color: var(--ink-400);
  font-style: italic;
  text-align: center;
  padding: var(--space-5);
}

/* 轮播图样式优化 */
.image-carousel-section {
  margin: 16px 0;
  position: relative;
}

.carousel-wrapper {
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background: var(--ink-50);
}

.carousel-track {
  width: 100%;
  overflow: hidden;
}

.carousel-cards {
  display: flex;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.image-card {
  min-width: 100%;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: var(--ink-50);
}

.image-card img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.image-indicator {
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.6);
  color: var(--surface-white);
  padding: 4px var(--space-3);
  border-radius: var(--radius-lg);
  font-size: 13px;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
}

.carousel-btn:hover {
  background: var(--surface-white);
  box-shadow: var(--shadow-md);
}

.carousel-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.carousel-btn.left {
  left: 12px;
}

.carousel-btn.right {
  right: 12px;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 12px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--ink-200);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.dot.active {
  background: var(--green-600);
  width: 24px;
  border-radius: 4px;
}

/* 轮播图双击提示 */
.image-card {
  cursor: zoom-in;
}

.zoom-hint {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: var(--surface-white);
  padding: 4px var(--space-3);
  border-radius: var(--radius-md);
  font-size: var(--text-xs);
  opacity: 0;
  transition: opacity var(--transition-base);
  pointer-events: none;
}

.image-card:hover .zoom-hint {
  opacity: 1;
}

/* 图片查看器 */
.image-viewer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  cursor: zoom-out;
}

.image-viewer-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  cursor: default;
}

.viewer-image {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

.viewer-close {
  position: absolute;
  top: -40px;
  right: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  transition: background 0.2s ease;
}

.viewer-close:hover {
  background: rgba(255, 255, 255, 0.3);
}

.emergency-info-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.info-section {
  padding: 20px 24px;
  border-bottom: 1px solid #f1f5f9;
}

.info-section:last-child {
  border-bottom: none;
}

/* 基础信息区 */
.basic-info {
  background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
}

.info-row {
  display: flex;
  align-items: baseline;
  margin-bottom: 12px;
  font-size: 15px;
  line-height: 1.6;
}

.info-row:last-child {
  margin-bottom: 0;
}

.info-label {
  min-width: 140px;
  color: #64748b;
  font-weight: 500;
  flex-shrink: 0;
}

.info-value {
  color: #334155;
  flex: 1;
}

.info-value.italic {
  font-style: italic;
  color: #475569;
}

/* 区块标题样式 */
.section-title {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 1px dashed #e2e8f0;
}

.section-title i {
  margin-right: 8px;
  font-size: 18px;
  color: #059669;
}

.section-title.danger i {
  color: #ef4444;
}

/* 编号列表样式 */
:deep(.numbered-flow) {
  list-style: none;
  padding: 0;
  margin: 0;
}

:deep(.numbered-flow li) {
  position: relative;
  padding: 12px 16px;
  margin-bottom: 10px;
  background: #f8fafc;
  border-radius: 8px;
  border-left: 4px solid #10b981;
  line-height: 1.7;
  color: #334155;
}

:deep(.numbered-flow li:last-child) {
  margin-bottom: 0;
}

:deep(.numbered-flow.danger li) {
  background: #fef2f2;
  border-left-color: #ef4444;
}

/* 急救流程区块 */
.flow-section {
  background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%);
}

.flow-section .section-title i {
  color: #059669;
}

/* 禁止行为区块 */
.forbidden-section {
  background: linear-gradient(135deg, #fef2f2 0%, #ffffff 100%);
}

.forbidden-section .section-title.danger i {
  color: #ef4444;
}

/* 血清区块 */
.serum-section {
  background: linear-gradient(135deg, #eff6ff 0%, #ffffff 100%);
}

.serum-value {
  font-size: 18px;
  font-weight: 600;
  color: #dc2626;
  padding: 12px 16px;
  background: #fef2f2;
  border-radius: 8px;
  border: 1px solid #fecaca;
}

/* 医院区块 */
.hospital-section {
  background: linear-gradient(135deg, #faf5ff 0%, #ffffff 100%);
}

.hospital-value {
  font-size: 16px;
  font-weight: 600;
  color: #7c3aed;
  padding: 12px 16px;
  background: #f5f3ff;
  border-radius: 8px;
  border: 1px solid #ddd6fe;
}

/* 症状区块 */
.symptom-section {
  background: #f8fafc;
}

.symptom-content {
  color: #475569;
  line-height: 1.8;
}

.symptom-content :deep(p) {
  margin: 0.6em 0;
}

.result-card {
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  position: relative;
  overflow: hidden;
}

.success-result {
  background: linear-gradient(135deg, var(--green-50) 0%, var(--success-bg) 100%);
  border: 1px solid var(--green-200);
}

.success-result::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 120px;
  height: 120px;
  background: rgba(16, 185, 129, 0.05);
  border-radius: 50%;
  transform: translate(40%, -40%);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-6);
}

.analysis-time {
  font-size: var(--text-sm);
  color: var(--green-900);
  background: rgba(16, 185, 129, 0.1);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-md);
}

/* — markdown container — */
.markdown-result-wrapper {
  max-height: 400px;
  overflow-y: auto;
  padding-right: var(--space-2);
}

.markdown-result, .analysis-result {
  background: var(--surface-white);
  border-radius: var(--radius-md);
  padding: var(--space-6);
  margin-bottom: var(--space-6);
  box-shadow: var(--shadow-xs);
  line-height: 1.8;
}

.snake-result-item {
  border: 1px solid var(--ink-100);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  margin-bottom: var(--space-4);
  background-color: var(--ink-50);
}

/* — snake result item — */
.snake-result-item h3 {
  color: var(--green-600);
  margin-top: 0;
  border-bottom: 1px solid var(--ink-100);
  padding-bottom: var(--space-2);
}

.snake-details {
  background: var(--green-100);
  padding: var(--space-3);
  border-radius: var(--radius-sm);
  margin: var(--space-3) 0;
}

.emergency-section {
  margin: var(--space-4) 0;
}

.emergency-section h4 {
  color: var(--green-900);
  margin-bottom: var(--space-2);
}

/* — markdown result typography — */
.markdown-result :deep(h1),
.markdown-result :deep(h2),
.markdown-result :deep(h3),
.markdown-result :deep(h4),
.analysis-result :deep(h1),
.analysis-result :deep(h2),
.analysis-result :deep(h3),
.analysis-result :deep(h4) {
  color: var(--green-900);
  margin: 1.5em 0 0.8em;
  font-weight: var(--weight-semibold);
}

.markdown-result :deep(h1) {
  font-size: var(--text-3xl);
  border-bottom: 2px solid var(--ink-100);
  padding-bottom: 0.5em;
}

.markdown-result :deep(h2) {
  font-size: var(--text-2xl);
  border-bottom: 1px solid var(--ink-100);
  padding-bottom: 0.4em;
}

.markdown-result :deep(h3) {
  font-size: var(--text-xl);
}

.markdown-result :deep(p),
.analysis-result :deep(p) {
  margin: 1em 0;
  color: var(--ink-700);
  line-height: 1.8;
}

.markdown-result :deep(strong),
.analysis-result :deep(strong) {
  color: var(--ink-900);
  font-weight: var(--weight-bold);
}

.markdown-result :deep(em),
.analysis-result :deep(em) {
  color: var(--ink-500);
  font-style: italic;
}

.markdown-result :deep(ul),
.markdown-result :deep(ol),
.analysis-result :deep(ul),
.analysis-result :deep(ol) {
  margin: 1em 0;
  padding-left: 2em;
  color: var(--ink-700);
}

.markdown-result :deep(li),
.analysis-result :deep(li) {
  margin: 0.5em 0;
  line-height: 1.8;
}

/* — find medical care — */
.find-medical-care {
  text-align: center;
  padding-top: var(--space-6);
  border-top: 1px solid var(--green-200);
}

.find-medical-care .el-button {
  padding: 10px var(--space-8);
  border-radius: var(--radius-md);
  font-size: var(--text-base);
}

/* — loading mask — */
.loading-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.loading-card {
  width: 400px;
  padding: var(--space-8);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  text-align: center;
  border: none;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

.loading-content p {
  margin: 0;
  color: var(--ink-900);
  font-size: var(--text-base);
  font-weight: var(--weight-medium);
}

/* — responsive — */
@media (max-width: 768px) {
  .navbar-content {
    padding: 0 var(--space-4);
  }

  .main-content {
    padding: var(--space-4) var(--space-4) var(--space-8);
  }

  .upload-section, .results-section {
    padding: var(--space-6) var(--space-4);
  }

  .upload-actions {
    flex-direction: column;
    gap: var(--space-4);
    align-items: flex-start;
  }

  .preview-actions {
    flex-direction: column;
    gap: var(--space-3);
  }

  .preview-actions .el-button {
    width: 100%;
  }

  .loading-card {
    width: 90%;
    max-width: 320px;
  }
}

@media (max-width: 480px) {
  .logo-section h2 {
    font-size: var(--text-xl);
  }

  .upload-area {
    padding: var(--space-8) var(--space-4);
  }

  .upload-icon {
    font-size: 48px;
  }

  .result-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-3);
  }

  .placeholder-icon {
    font-size: 48px;
  }
}

/* — element deep overrides — */
:deep(.el-button) {
  border-radius: var(--radius-md);
  font-weight: var(--weight-medium);
  transition: all var(--transition-fast);
}

:deep(.el-button--primary) {
  background: var(--green-600);
  border-color: var(--green-600);
}

:deep(.el-button--primary:hover) {
  background: var(--green-700);
  border-color: var(--green-700);
  transform: translateY(-1px);
}

:deep(.el-button--success) {
  background: var(--green-500);
  border-color: var(--green-500);
}

:deep(.el-button--success:hover) {
  background: var(--green-600);
  border-color: var(--green-600);
  transform: translateY(-1px);
}

:deep(.el-button--danger) {
  border-color: var(--danger);
}

:deep(.el-button--danger:hover) {
  background: var(--danger);
  border-color: var(--danger);
}

:deep(.el-progress-bar__outer) {
  height: 8px;
  border-radius: 4px;
  background: var(--ink-50);
}

:deep(.el-progress-bar__inner) {
  background: var(--green-600);
  border-radius: 4px;
}

:deep(.el-tag--success) {
  background: var(--success-bg);
  color: var(--green-900);
  border: none;
  padding: 6px var(--space-4);
  border-radius: var(--radius-md);
}

:deep(.el-tooltip__popper) {
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-md);
}

:deep(.numbered-flow.danger li) {
  background: var(--danger-bg);
  border-left-color: var(--danger);
}

.dot:hover:not(.active) {
  background: var(--ink-400);
}
</style>


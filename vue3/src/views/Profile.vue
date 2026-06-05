<template>
  <div class="profile-page">
    <!-- 用户概览区 -->
    <SHero variant="green" class="profile-hero">
      <div class="hero-user-info">
        <div class="avatar-wrapper" @click="triggerAvatarUpload">
          <el-avatar :size="96" :src="userAvatar" class="main-avatar" />
          <div class="avatar-upload-overlay">
            <el-icon><Camera /></el-icon>
          </div>
          <div class="avatar-status" :class="{ online: isOnline }"></div>
        </div>
        <div class="user-details">
          <h2 class="username">{{ userInfo.username }}</h2>
          <p class="user-id">ID: {{ userInfo.id || '--' }}</p>
          <el-tag type="success" effect="dark" size="small">普通用户</el-tag>
        </div>
      </div>

      <div class="hero-stats">
        <SStatCard
          label="识别次数"
          :value="recognitionCount"
          icon-bg="rgba(255,255,255,0.2)"
          icon-color="white"
          class="stat-card-dark"
        >
          <template #icon>
            <el-icon><Camera /></el-icon>
          </template>
        </SStatCard>
        <SStatCard
          label="收藏蛇种"
          :value="favoriteCount"
          icon-bg="rgba(255,255,255,0.2)"
          icon-color="white"
          class="stat-card-dark"
        >
          <template #icon>
            <el-icon><Star /></el-icon>
          </template>
        </SStatCard>
        <SStatCard
          label="使用天数"
          :value="usageDays"
          icon-bg="rgba(255,255,255,0.2)"
          icon-color="white"
          class="stat-card-dark"
        >
          <template #icon>
            <el-icon><Calendar /></el-icon>
          </template>
        </SStatCard>
        <SStatCard
          label="求助记录"
          :value="sosCount"
          icon-bg="rgba(255,255,255,0.2)"
          icon-color="white"
          class="stat-card-dark"
        >
          <template #icon>
            <el-icon><Warning /></el-icon>
          </template>
        </SStatCard>
      </div>

      <template #actions>
        <SButton variant="secondary" @click="activeTab = 'settings'">
          <template #icon><Edit /></template>
          编辑资料
        </SButton>
        <SButton variant="secondary" @click="activeTab = 'security'">
          <template #icon><Lock /></template>
          修改密码
        </SButton>
        <SButton variant="ghost" @click="handleLogout" class="logout-btn">
          <template #icon><SwitchButton /></template>
          退出登录
        </SButton>
      </template>
    </SHero>

    <!-- 主内容区 -->
    <div class="profile-content">
      <el-tabs v-model="activeTab" class="profile-tabs">
        <!-- 概览标签页 -->
        <el-tab-pane label="概览" name="overview">
          <div class="tab-content">
            <SPageHeader title="个人概览" subtitle="查看您的使用情况和最近活动" />

            <!-- 最近识别记录 -->
            <SCard title="最近识别" subtitle="最近 5 次识别记录" class="section-card">
              <template #header>
                <div class="card-header-actions">
                  <SButton variant="ghost" size="sm" @click="activeTab = 'history'">
                    查看全部
                  </SButton>
                </div>
              </template>
              <div class="recent-list" v-if="recentRecords.length > 0">
                <div
                  v-for="record in recentRecords"
                  :key="record.id"
                  class="recent-item"
                >
                  <div class="recent-icon" :style="{ background: getDangerColor(record.dangerLevel) }">
                    <el-icon><Camera /></el-icon>
                  </div>
                  <div class="recent-info">
                    <div class="recent-name">{{ record.snakeName }}</div>
                    <div class="recent-time">{{ formatDate(record.createTime) }}</div>
                  </div>
                  <el-tag :type="getDangerTagType(record.dangerLevel)" size="small">
                    {{ getDangerLabel(record.dangerLevel) }}
                  </el-tag>
                </div>
              </div>
              <div v-else class="empty-state">
                <el-icon :size="48" class="empty-icon"><Camera /></el-icon>
                <p>暂无识别记录</p>
                <SButton variant="primary" size="sm" @click="$router.push('/recognition')">
                  开始识别
                </SButton>
              </div>
            </SCard>

            <!-- 收藏蛇种 -->
            <SCard title="收藏蛇种" subtitle="您收藏的蛇类" class="section-card">
              <div class="favorites-grid" v-if="favoriteSnakes.length > 0">
                <div
                  v-for="snake in favoriteSnakes"
                  :key="snake.id"
                  class="favorite-item"
                >
                  <div class="favorite-image">
                    <img :src="snake.image" :alt="snake.name" />
                  </div>
                  <div class="favorite-info">
                    <div class="favorite-name">{{ snake.name }}</div>
                    <div class="favorite-latin">{{ snake.latinName }}</div>
                  </div>
                </div>
              </div>
              <div v-else class="empty-state">
                <el-icon :size="48" class="empty-icon"><Star /></el-icon>
                <p>暂无收藏</p>
                <SButton variant="primary" size="sm" @click="$router.push('/graph')">
                  浏览蛇种
                </SButton>
              </div>
            </SCard>

            <!-- 安全知识进度 -->
            <SCard title="安全知识" subtitle="学习进度" class="section-card">
              <div class="knowledge-progress">
                <div class="progress-item">
                  <div class="progress-header">
                    <span class="progress-label">蛇类识别</span>
                    <span class="progress-value">{{ knowledgeProgress.identification }}%</span>
                  </div>
                  <el-progress
                    :percentage="knowledgeProgress.identification"
                    :show-text="false"
                    :stroke-width="8"
                    color="var(--green-500)"
                  />
                </div>
                <div class="progress-item">
                  <div class="progress-header">
                    <span class="progress-label">急救知识</span>
                    <span class="progress-value">{{ knowledgeProgress.firstAid }}%</span>
                  </div>
                  <el-progress
                    :percentage="knowledgeProgress.firstAid"
                    :show-text="false"
                    :stroke-width="8"
                    color="var(--blue-500)"
                  />
                </div>
                <div class="progress-item">
                  <div class="progress-header">
                    <span class="progress-label">预防措施</span>
                    <span class="progress-value">{{ knowledgeProgress.prevention }}%</span>
                  </div>
                  <el-progress
                    :percentage="knowledgeProgress.prevention"
                    :show-text="false"
                    :stroke-width="8"
                    color="var(--green-600)"
                  />
                </div>
              </div>
            </SCard>
          </div>
        </el-tab-pane>

        <!-- 识别记录标签页 -->
        <el-tab-pane label="识别记录" name="history">
          <div class="tab-content">
            <SPageHeader title="识别历史" subtitle="查看所有识别记录">
              <template #actions>
                <SButton variant="ghost" size="sm" @click="exportRecords">
                  <template #icon><Download /></template>
                  导出
                </SButton>
              </template>
            </SPageHeader>

            <!-- 筛选栏 -->
            <SCard class="filter-card">
              <div class="filter-row">
                <el-input
                  v-model="searchQuery"
                  placeholder="搜索蛇种名称..."
                  :prefix-icon="Search"
                  clearable
                  class="filter-input"
                />
                <el-select v-model="dangerFilter" placeholder="危险等级" clearable class="filter-select">
                  <el-option label="剧毒" value="high" />
                  <el-option label="有毒" value="medium" />
                  <el-option label="无毒" value="low" />
                </el-select>
                <el-date-picker
                  v-model="dateRange"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  class="filter-date"
                />
              </div>
            </SCard>

            <!-- 记录列表 -->
            <SCard class="records-card">
              <el-table
                :data="filteredRecords"
                stripe
                class="records-table"
                v-loading="isLoading"
              >
                <el-table-column label="蛇种" min-width="150">
                  <template #default="{ row }">
                    <div class="snake-info">
                      <div class="snake-icon" :style="{ background: getDangerColor(row.dangerLevel) }">
                        <el-icon><Camera /></el-icon>
                      </div>
                      <div>
                        <div class="snake-name">{{ row.snakeName }}</div>
                        <div class="snake-latin">{{ row.latinName }}</div>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="危险等级" width="120" align="center">
                  <template #default="{ row }">
                    <el-tag :type="getDangerTagType(row.dangerLevel)" effect="dark">
                      {{ getDangerLabel(row.dangerLevel) }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="识别时间" width="180">
                  <template #default="{ row }">
                    {{ formatDate(row.createTime) }}
                  </template>
                </el-table-column>
                <el-table-column label="置信度" width="120" align="center">
                  <template #default="{ row }">
                    <el-progress
                      :percentage="Math.round(row.confidence * 100)"
                      :stroke-width="6"
                      :show-text="false"
                      :color="getConfidenceColor(row.confidence)"
                    />
                    <span class="confidence-text">{{ Math.round(row.confidence * 100) }}%</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="120" align="center">
                  <template #default="{ row }">
                    <SButton variant="ghost" size="sm" @click="viewRecordDetail(row)">
                      详情
                    </SButton>
                  </template>
                </el-table-column>
              </el-table>

              <div class="pagination-wrapper" v-if="totalRecords > pageSize">
                <el-pagination
                  v-model:current-page="currentPage"
                  :page-size="pageSize"
                  :total="totalRecords"
                  layout="prev, pager, next"
                  @current-change="loadRecords"
                />
              </div>
            </SCard>
          </div>
        </el-tab-pane>

        <!-- 设置标签页 -->
        <el-tab-pane label="设置" name="settings">
          <div class="tab-content">
            <SPageHeader title="账号设置" subtitle="管理您的个人信息和偏好" />

            <SCard title="基本信息" class="section-card">
              <el-form
                :model="editForm"
                :rules="editRules"
                ref="editFormRef"
                label-position="top"
                class="settings-form"
              >
                <div class="form-grid">
                  <el-form-item label="用户名" prop="username">
                    <el-input
                      v-model="editForm.username"
                      placeholder="请输入用户名"
                      :prefix-icon="User"
                      size="large"
                    />
                  </el-form-item>
                  <el-form-item label="邮箱" prop="email">
                    <el-input
                      v-model="editForm.email"
                      placeholder="请输入邮箱"
                      :prefix-icon="Message"
                      size="large"
                    />
                  </el-form-item>
                  <el-form-item label="手机号" prop="phone">
                    <el-input
                      v-model="editForm.phone"
                      placeholder="请输入手机号"
                      :prefix-icon="Phone"
                      size="large"
                      maxlength="11"
                    />
                  </el-form-item>
                </div>
                <div class="form-actions">
                  <SButton variant="primary" :loading="isSubmitting" @click="submitEdit">
                    保存修改
                  </SButton>
                  <SButton variant="ghost" @click="resetForm">
                    重置
                  </SButton>
                </div>
              </el-form>
            </SCard>

            <SCard title="头像设置" class="section-card">
              <div class="avatar-section">
                <div class="avatar-preview">
                  <el-avatar :size="120" :src="userAvatar" />
                  <div class="avatar-actions">
                    <SButton variant="primary" size="sm" @click="triggerAvatarUpload">
                      <template #icon><Camera /></template>
                      更换头像
                    </SButton>
                    <SButton variant="danger" size="sm" @click="resetAvatar">
                      恢复默认
                    </SButton>
                  </div>
                </div>
                <div class="upload-tips">
                  <p><el-icon><InfoFilled /></el-icon> 支持 JPG、PNG、GIF 格式</p>
                  <p><el-icon><InfoFilled /></el-icon> 建议尺寸 200×200 像素</p>
                  <p><el-icon><InfoFilled /></el-icon> 文件大小不超过 20MB</p>
                </div>
              </div>
            </SCard>

            <SCard title="通知偏好" class="section-card">
              <div class="notification-settings">
                <div class="notification-item">
                  <div class="notification-info">
                    <h4>识别结果通知</h4>
                    <p>识别完成后推送通知</p>
                  </div>
                  <el-switch v-model="notificationSettings.recognition" />
                </div>
                <div class="notification-item">
                  <div class="notification-info">
                    <h4>预警通知</h4>
                    <p>接收附近蛇类活动预警</p>
                  </div>
                  <el-switch v-model="notificationSettings.warning" />
                </div>
                <div class="notification-item">
                  <div class="notification-info">
                    <h4>系统通知</h4>
                    <p>接收系统更新和公告</p>
                  </div>
                  <el-switch v-model="notificationSettings.system" />
                </div>
              </div>
            </SCard>
          </div>
        </el-tab-pane>

        <!-- 安全标签页 -->
        <el-tab-pane label="安全" name="security">
          <div class="tab-content">
            <SPageHeader title="安全设置" subtitle="保护您的账户安全" />

            <SCard title="修改密码" class="section-card">
              <el-form
                :model="passwordForm"
                :rules="passwordRules"
                ref="passwordFormRef"
                label-position="top"
                class="password-form"
              >
                <el-form-item label="当前密码" prop="oldPassword">
                  <el-input
                    v-model="passwordForm.oldPassword"
                    type="password"
                    placeholder="请输入当前密码"
                    show-password
                    size="large"
                    :prefix-icon="Lock"
                  />
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                  <el-input
                    v-model="passwordForm.newPassword"
                    type="password"
                    placeholder="请输入新密码（至少6位）"
                    show-password
                    size="large"
                    :prefix-icon="Key"
                  />
                  <div class="password-strength" v-if="passwordForm.newPassword">
                    <div class="strength-bar" :class="getPasswordStrength(passwordForm.newPassword)"></div>
                  </div>
                </el-form-item>
                <el-form-item label="确认新密码" prop="confirmNewPassword">
                  <el-input
                    v-model="passwordForm.confirmNewPassword"
                    type="password"
                    placeholder="请再次输入新密码"
                    show-password
                    size="large"
                    :prefix-icon="Key"
                  />
                </el-form-item>
                <div class="form-actions">
                  <SButton
                    variant="primary"
                    :loading="isSubmitting"
                    :disabled="!isPasswordValid"
                    @click="submitPasswordChange"
                  >
                    确认修改
                  </SButton>
                </div>
              </el-form>
            </SCard>

            <SCard title="紧急联系人" class="section-card">
              <div class="emergency-contacts">
                <div
                  v-for="(contact, index) in emergencyContacts"
                  :key="index"
                  class="contact-item"
                >
                  <div class="contact-info">
                    <div class="contact-avatar">
                      <el-avatar :size="40" :src="contact.avatar" />
                    </div>
                    <div class="contact-details">
                      <div class="contact-name">{{ contact.name }}</div>
                      <div class="contact-phone">{{ contact.phone }}</div>
                    </div>
                  </div>
                  <div class="contact-actions">
                    <SButton variant="ghost" size="sm" @click="editContact(index)">
                      编辑
                    </SButton>
                    <SButton variant="danger" size="sm" @click="deleteContact(index)">
                      删除
                    </SButton>
                  </div>
                </div>
                <SButton variant="secondary" @click="addContact" class="add-contact-btn">
                  <template #icon><Plus /></template>
                  添加联系人
                </SButton>
              </div>
            </SCard>

            <SCard title="隐私设置" class="section-card">
              <div class="privacy-settings">
                <div class="privacy-item">
                  <div class="privacy-info">
                    <h4>公开识别记录</h4>
                    <p>允许其他用户查看您的识别记录</p>
                  </div>
                  <el-switch v-model="privacySettings.publicRecords" />
                </div>
                <div class="privacy-item">
                  <div class="privacy-info">
                    <h4>显示在线状态</h4>
                    <p>允许其他用户看到您的在线状态</p>
                  </div>
                  <el-switch v-model="privacySettings.showOnline" />
                </div>
                <div class="privacy-item">
                  <div class="privacy-info">
                    <h4>数据收集</h4>
                    <p>允许收集匿名使用数据以改进服务</p>
                  </div>
                  <el-switch v-model="privacySettings.dataCollection" />
                </div>
              </div>
            </SCard>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 隐藏的上传组件 -->
    <input
      type="file"
      ref="avatarInput"
      style="display: none"
      accept="image/*"
      @change="handleAvatarChange"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Camera, Star, Calendar, Warning, Edit, Lock, SwitchButton,
  Download, Search, User, Message, Phone, Key, Plus, InfoFilled
} from '@element-plus/icons-vue'
import api, { recognitionApi } from '../services/api'
import { useUserStore } from '../store/user.js'
import SHero from '../components/ui/SHero.vue'
import SStatCard from '../components/ui/SStatCard.vue'
import SCard from '../components/ui/SCard.vue'
import SButton from '../components/ui/SButton.vue'
import SPageHeader from '../components/ui/SPageHeader.vue'

const router = useRouter()
const userStore = useUserStore()

// 基础状态
const activeTab = ref('overview')
const isLoading = ref(false)
const isSubmitting = ref(false)
const isOnline = ref(navigator.onLine)

// 统计数据
const recognitionCount = ref(0)
const favoriteCount = ref(0)
const usageDays = ref(0)
const sosCount = ref(0)

// 用户信息
const userInfo = ref({
  id: null,
  username: '',
  email: '',
  phone: '',
  createTime: '',
  lastLoginTime: '',
  avatar: '',
  avatarUrl: ''
})

const defaultAvatar = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'

// 编辑表单
const editForm = ref({
  username: '',
  email: '',
  phone: ''
})

const editRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  phone: [
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ]
}

// 密码表单
const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: ''
})

const passwordRules = {
  oldPassword: [
    { required: true, message: '请输入当前密码', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少为6位', trigger: 'blur' }
  ],
  confirmNewPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== passwordForm.value.newPassword) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 识别记录相关
const recentRecords = ref([])
const allRecords = ref([])
const searchQuery = ref('')
const dangerFilter = ref('')
const dateRange = ref(null)
const currentPage = ref(1)
const pageSize = ref(10)
const totalRecords = ref(0)

// 收藏蛇种
const favoriteSnakes = ref([])

// 安全知识进度
const knowledgeProgress = ref({
  identification: 0,
  firstAid: 0,
  prevention: 0
})

// 紧急联系人
const emergencyContacts = ref([])

// 通知设置
const notificationSettings = ref({
  recognition: true,
  warning: true,
  system: true
})

// 隐私设置
const privacySettings = ref({
  publicRecords: false,
  showOnline: true,
  dataCollection: true
})

// DOM 引用
const avatarInput = ref(null)
const editFormRef = ref(null)
const passwordFormRef = ref(null)

// 计算属性
const userAvatar = computed(() => {
  return userInfo.value.avatar || userInfo.value.avatarUrl || defaultAvatar
})

const isPasswordValid = computed(() => {
  return passwordForm.value.newPassword.length >= 6 &&
    passwordForm.value.newPassword === passwordForm.value.confirmNewPassword
})

const filteredRecords = computed(() => {
  let records = [...allRecords.value]

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    records = records.filter(r =>
      r.snakeName.toLowerCase().includes(query) ||
      (r.latinName && r.latinName.toLowerCase().includes(query))
    )
  }

  if (dangerFilter.value) {
    records = records.filter(r => r.dangerLevel === dangerFilter.value)
  }

  if (dateRange.value && dateRange.value[0] && dateRange.value[1]) {
    const start = new Date(dateRange.value[0]).getTime()
    const end = new Date(dateRange.value[1]).getTime()
    records = records.filter(r => {
      const time = new Date(r.createTime).getTime()
      return time >= start && time <= end
    })
  }

  totalRecords.value = records.length
  const start = (currentPage.value - 1) * pageSize.value
  return records.slice(start, start + pageSize.value)
})

// 方法
const loadUserInfo = async () => {
  try {
    const userId = userStore.userInfo?.id || parseInt(localStorage.getItem('userId'))
    if (!userId) {
      ElMessage.error('用户未登录')
      router.push('/login')
      return
    }

    const response = await api.user.getUserInfo(userId)
    if (response.data.code === 200) {
      userInfo.value = response.data.data
      editForm.value = {
        username: response.data.data.username,
        email: response.data.data.email,
        phone: response.data.data.phone
      }
    } else {
      ElMessage.error(response.data.message || '获取用户信息失败')
    }
  } catch (error) {
    console.error('获取用户信息失败:', error)
    ElMessage.error('获取用户信息失败')
  }
}

const loadStats = async () => {
  try {
    const userId = userStore.userInfo?.id || localStorage.getItem('userId')
    if (!userId) return

    // 加载识别记录数
    const countResponse = await recognitionApi.getRecordCount(userId)
    if (countResponse.data.code === 200) {
      recognitionCount.value = countResponse.data.data || 0
    }

    // 计算使用天数（从注册时间到现在）
    if (userInfo.value.createTime) {
      const createTime = new Date(userInfo.value.createTime)
      const now = new Date()
      usageDays.value = Math.floor((now - createTime) / (1000 * 60 * 60 * 24))
    }

    // TODO: 从后端获取收藏数和求助记录数
    favoriteCount.value = 0
    sosCount.value = 0
  } catch (error) {
    console.error('获取统计数据失败:', error)
  }
}

const loadRecentRecords = async () => {
  try {
    const userId = userStore.userInfo?.id || localStorage.getItem('userId')
    if (!userId) return

    const response = await recognitionApi.getRecentRecords(userId, 5)
    if (response.data.code === 200) {
      recentRecords.value = response.data.data || []
    }
  } catch (error) {
    console.error('获取最近记录失败:', error)
  }
}

const loadRecords = async () => {
  isLoading.value = true
  try {
    const userId = userStore.userInfo?.id || localStorage.getItem('userId')
    if (!userId) return

    const response = await recognitionApi.getRecordsByUser(userId)
    if (response.data.code === 200) {
      allRecords.value = response.data.data || []
      totalRecords.value = allRecords.value.length
    }
  } catch (error) {
    console.error('获取识别记录失败:', error)
  } finally {
    isLoading.value = false
  }
}

const loadFavoriteSnakes = async () => {
  try {
    const userId = userStore.userInfo?.id || localStorage.getItem('userId')
    if (!userId) return

    // TODO: 调用后端 API 获取收藏蛇种
    // const response = await api.user.getFavoriteSnakes(userId)
    // if (response.data.code === 200) {
    //   favoriteSnakes.value = response.data.data || []
    // }

    // 临时使用模拟数据
    favoriteSnakes.value = [
      { id: 1, name: '眼镜蛇', latinName: 'Naja naja', image: '' },
      { id: 2, name: '竹叶青', latinName: 'Trimeresurus stejnegeri', image: '' },
      { id: 3, name: '银环蛇', latinName: 'Bungarus multicinctus', image: '' }
    ]
    favoriteCount.value = favoriteSnakes.value.length
  } catch (error) {
    console.error('获取收藏蛇种失败:', error)
  }
}

const loadKnowledgeProgress = async () => {
  try {
    // TODO: 从后端获取学习进度
    // 临时使用模拟数据
    knowledgeProgress.value = {
      identification: 65,
      firstAid: 40,
      prevention: 55
    }
  } catch (error) {
    console.error('获取学习进度失败:', error)
  }
}

const loadEmergencyContacts = async () => {
  try {
    // TODO: 从后端获取紧急联系人
    // 临时使用模拟数据
    emergencyContacts.value = [
      { name: '张三', phone: '13800138001', avatar: '' },
      { name: '李四', phone: '13800138002', avatar: '' }
    ]
  } catch (error) {
    console.error('获取紧急联系人失败:', error)
  }
}

const triggerAvatarUpload = () => {
  avatarInput.value?.click()
}

const handleAvatarChange = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    ElMessage.error('请选择图片文件')
    return
  }

  if (file.size > 20 * 1024 * 1024) {
    ElMessage.error('图片大小不能超过20MB')
    return
  }

  const reader = new FileReader()
  reader.onload = async (e) => {
    userInfo.value.avatar = e.target.result

    try {
      const response = await api.user.uploadAvatar({
        file: file,
        userId: userInfo.value.id
      })
      if (response.data.code === 200) {
        ElMessage.success('头像上传成功！')
        const avatarUrl = response.data.data.fullAvatarUrl || response.data.data.avatarUrl
        userInfo.value.avatarUrl = avatarUrl
        userInfo.value.avatar = avatarUrl

        if (userStore.userInfo) {
          userStore.userInfo.avatarUrl = avatarUrl
          userStore.userInfo.avatar = avatarUrl
        }

        event.target.value = ''
      } else {
        ElMessage.error(response.data.message || '头像上传失败')
      }
    } catch (error) {
      console.error('头像上传失败:', error)
      ElMessage.error('头像上传失败：' + error.message)
    }
  }
  reader.readAsDataURL(file)
}

const resetAvatar = () => {
  userInfo.value.avatar = defaultAvatar
  userInfo.value.avatarUrl = ''
  ElMessage.success('已恢复默认头像')
}

const submitEdit = async () => {
  isSubmitting.value = true
  try {
    const updateData = {
      id: userInfo.value.id,
      username: editForm.value.username,
      email: editForm.value.email,
      phone: editForm.value.phone
    }

    const response = await api.user.updateUserInfo(updateData)
    if (response.data.code === 200) {
      ElMessage.success('资料修改成功！')
      userInfo.value.username = editForm.value.username
      userInfo.value.email = editForm.value.email
      userInfo.value.phone = editForm.value.phone

      if (userStore.userInfo) {
        userStore.userInfo.username = editForm.value.username
        userStore.userInfo.email = editForm.value.email
        userStore.userInfo.phone = editForm.value.phone
      }
    } else {
      ElMessage.error(response.data.message || '更新失败')
    }
  } catch (error) {
    console.error('更新用户信息失败:', error)
    ElMessage.error('更新失败：' + error.message)
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  editForm.value = {
    username: userInfo.value.username,
    email: userInfo.value.email,
    phone: userInfo.value.phone
  }
  ElMessage.info('表单已重置')
}

const submitPasswordChange = async () => {
  isSubmitting.value = true
  try {
    if (passwordForm.value.oldPassword === passwordForm.value.newPassword) {
      ElMessage.error('新密码不能与原密码相同')
      return
    }

    const changePasswordData = {
      userId: userInfo.value.id,
      oldPassword: passwordForm.value.oldPassword,
      newPassword: passwordForm.value.newPassword
    }

    const response = await api.user.changePassword(changePasswordData)
    if (response.data.code === 200) {
      ElMessage.success('密码修改成功！')
      passwordForm.value = {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      }
    } else {
      ElMessage.error(response.data.message || '密码修改失败')
    }
  } catch (error) {
    console.error('修改密码失败:', error)
    ElMessage.error('密码修改失败：' + error.message)
  } finally {
    isSubmitting.value = false
  }
}

const getPasswordStrength = (password) => {
  if (!password) return 'weak'
  const strength = password.length
  if (strength < 6) return 'weak'
  if (strength < 10) return 'medium'
  return 'strong'
}

const getDangerColor = (level) => {
  const colors = {
    high: 'var(--danger)',
    medium: 'var(--warning)',
    low: 'var(--success)'
  }
  return colors[level] || 'var(--info)'
}

const getDangerTagType = (level) => {
  const types = {
    high: 'danger',
    medium: 'warning',
    low: 'success'
  }
  return types[level] || 'info'
}

const getDangerLabel = (level) => {
  const labels = {
    high: '剧毒',
    medium: '有毒',
    low: '无毒'
  }
  return labels[level] || '未知'
}

const getConfidenceColor = (confidence) => {
  if (confidence >= 0.9) return 'var(--success)'
  if (confidence >= 0.7) return 'var(--warning)'
  return 'var(--danger)'
}

const formatDate = (dateString) => {
  if (!dateString) return '暂无'
  const date = new Date(dateString)
  return date.toLocaleString('zh-CN')
}

const exportRecords = () => {
  ElMessage.info('导出功能开发中')
}

const viewRecordDetail = (record) => {
  ElMessage.info(`查看记录详情: ${record.snakeName}`)
}

const addContact = () => {
  ElMessage.info('添加联系人功能开发中')
}

const editContact = (index) => {
  ElMessage.info(`编辑联系人: ${emergencyContacts.value[index].name}`)
}

const deleteContact = (index) => {
  ElMessageBox.confirm('确定要删除该联系人吗？', '删除确认', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    emergencyContacts.value.splice(index, 1)
    ElMessage.success('删除成功')
  }).catch(() => {})
}

const handleLogout = () => {
  ElMessageBox.confirm('确定要退出登录吗？', '退出确认', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    userStore.logout()
    ElMessage.success('已退出登录')
    router.push('/login')
  }).catch(() => {})
}

// 生命周期
onMounted(async () => {
  await loadUserInfo()
  await Promise.all([
    loadStats(),
    loadRecentRecords(),
    loadRecords(),
    loadFavoriteSnakes(),
    loadKnowledgeProgress(),
    loadEmergencyContacts()
  ])

  window.addEventListener('online', () => isOnline.value = true)
  window.addEventListener('offline', () => isOnline.value = false)
})
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: var(--surface-cool);
}

.profile-hero {
  border-radius: 0 0 var(--radius-2xl) var(--radius-2xl);
}

.hero-user-info {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  margin-bottom: var(--space-8);
}

.avatar-wrapper {
  position: relative;
  cursor: pointer;
}

.main-avatar {
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.avatar-upload-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  opacity: 0;
  transition: opacity var(--transition-base);
}

.avatar-wrapper:hover .avatar-upload-overlay {
  opacity: 1;
}

.avatar-status {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: var(--danger);
  border: 3px solid white;
}

.avatar-status.online {
  background-color: var(--success);
}

.user-details {
  color: white;
}

.username {
  font-size: var(--text-3xl);
  font-weight: var(--weight-bold);
  margin: 0 0 var(--space-1) 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.user-id {
  font-size: var(--text-sm);
  opacity: 0.8;
  margin: 0 0 var(--space-2) 0;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.stat-card-dark {
  background: rgba(255, 255, 255, 0.15) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  backdrop-filter: blur(10px);
}

.stat-card-dark :deep(.stat-value) {
  color: white !important;
}

.stat-card-dark :deep(.stat-label) {
  color: rgba(255, 255, 255, 0.8) !important;
}

.logout-btn {
  color: rgba(255, 255, 255, 0.8) !important;
}

.logout-btn:hover {
  color: white !important;
  background: rgba(255, 255, 255, 0.1) !important;
}

.profile-content {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: var(--space-6);
}

.profile-tabs {
  background: var(--surface-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.profile-tabs :deep(.el-tabs__header) {
  margin: 0;
  padding: 0 var(--space-6);
  background: var(--surface-white);
  border-bottom: 1px solid var(--green-100);
}

.profile-tabs :deep(.el-tabs__item) {
  height: 56px;
  line-height: 56px;
  font-size: var(--text-base);
  font-weight: var(--weight-medium);
  color: var(--ink-500);
}

.profile-tabs :deep(.el-tabs__item.is-active) {
  color: var(--green-600);
  font-weight: var(--weight-semibold);
}

.profile-tabs :deep(.el-tabs__active-bar) {
  background: var(--brand-gradient);
  height: 3px;
}

.tab-content {
  padding: var(--space-6);
}

.section-card {
  margin-bottom: var(--space-6);
}

.card-header-actions {
  margin-left: auto;
}

/* 最近识别列表 */
.recent-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.recent-item {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4);
  background: var(--surface-warm);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.recent-item:hover {
  background: var(--green-50);
  transform: translateX(4px);
}

.recent-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.recent-info {
  flex: 1;
}

.recent-name {
  font-weight: var(--weight-semibold);
  color: var(--ink-900);
}

.recent-time {
  font-size: var(--text-sm);
  color: var(--ink-500);
  margin-top: 2px;
}

.empty-state {
  text-align: center;
  padding: var(--space-10) 0;
  color: var(--ink-400);
}

.empty-icon {
  margin-bottom: var(--space-4);
  opacity: 0.5;
}

.empty-state p {
  margin: 0 0 var(--space-4) 0;
}

/* 收藏蛇种网格 */
.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--space-4);
}

.favorite-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  background: var(--surface-warm);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.favorite-item:hover {
  background: var(--green-50);
  transform: translateY(-2px);
}

.favorite-image {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--green-100);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.favorite-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.favorite-name {
  font-weight: var(--weight-semibold);
  color: var(--ink-900);
}

.favorite-latin {
  font-size: var(--text-xs);
  color: var(--ink-500);
  font-style: italic;
}

/* 安全知识进度 */
.knowledge-progress {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.progress-item {
  padding: var(--space-4);
  background: var(--surface-warm);
  border-radius: var(--radius-md);
}

.progress-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--space-2);
}

.progress-label {
  font-weight: var(--weight-medium);
  color: var(--ink-700);
}

.progress-value {
  font-weight: var(--weight-semibold);
  color: var(--green-600);
}

/* 筛选栏 */
.filter-card {
  margin-bottom: var(--space-4);
}

.filter-row {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.filter-input {
  flex: 1;
  min-width: 200px;
}

.filter-select {
  width: 150px;
}

.filter-date {
  width: 280px;
}

/* 识别记录表格 */
.snake-info {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.snake-icon {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.snake-name {
  font-weight: var(--weight-semibold);
  color: var(--ink-900);
}

.snake-latin {
  font-size: var(--text-xs);
  color: var(--ink-500);
  font-style: italic;
}

.confidence-text {
  font-size: var(--text-xs);
  color: var(--ink-500);
  margin-top: 4px;
  display: block;
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: var(--space-6);
}

/* 设置表单 */
.settings-form {
  max-width: 600px;
}

.form-grid {
  display: grid;
  gap: var(--space-4);
}

.form-actions {
  display: flex;
  gap: var(--space-3);
  margin-top: var(--space-6);
  padding-top: var(--space-6);
  border-top: 1px solid var(--green-100);
}

/* 头像设置 */
.avatar-section {
  display: flex;
  gap: var(--space-8);
  align-items: flex-start;
}

.avatar-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

.avatar-actions {
  display: flex;
  gap: var(--space-2);
}

.upload-tips {
  flex: 1;
}

.upload-tips p {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin: var(--space-2) 0;
  color: var(--ink-500);
  font-size: var(--text-sm);
}

.upload-tips .el-icon {
  color: var(--green-500);
}

/* 通知设置 */
.notification-settings {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.notification-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4);
  background: var(--surface-warm);
  border-radius: var(--radius-md);
}

.notification-info h4 {
  margin: 0 0 var(--space-1) 0;
  font-weight: var(--weight-semibold);
  color: var(--ink-900);
}

.notification-info p {
  margin: 0;
  font-size: var(--text-sm);
  color: var(--ink-500);
}

/* 密码表单 */
.password-form {
  max-width: 500px;
}

.password-strength {
  margin-top: var(--space-2);
}

.strength-bar {
  height: 4px;
  border-radius: 2px;
  transition: width var(--transition-base);
}

.strength-bar.weak {
  width: 30%;
  background: var(--danger);
}

.strength-bar.medium {
  width: 60%;
  background: var(--warning);
}

.strength-bar.strong {
  width: 100%;
  background: var(--success);
}

/* 紧急联系人 */
.emergency-contacts {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.contact-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4);
  background: var(--surface-warm);
  border-radius: var(--radius-md);
}

.contact-info {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.contact-details {
  display: flex;
  flex-direction: column;
}

.contact-name {
  font-weight: var(--weight-semibold);
  color: var(--ink-900);
}

.contact-phone {
  font-size: var(--text-sm);
  color: var(--ink-500);
}

.contact-actions {
  display: flex;
  gap: var(--space-2);
}

.add-contact-btn {
  align-self: flex-start;
}

/* 隐私设置 */
.privacy-settings {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.privacy-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4);
  background: var(--surface-warm);
  border-radius: var(--radius-md);
}

.privacy-info h4 {
  margin: 0 0 var(--space-1) 0;
  font-weight: var(--weight-semibold);
  color: var(--ink-900);
}

.privacy-info p {
  margin: 0;
  font-size: var(--text-sm);
  color: var(--ink-500);
}

/* 响应式布局 */
@media (max-width: 1024px) {
  .hero-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .favorites-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-user-info {
    flex-direction: column;
    text-align: center;
  }

  .hero-stats {
    grid-template-columns: 1fr;
  }

  .profile-content {
    padding: var(--space-4);
  }

  .filter-row {
    flex-direction: column;
  }

  .filter-input,
  .filter-select,
  .filter-date {
    width: 100%;
  }

  .avatar-section {
    flex-direction: column;
    align-items: center;
  }

  .favorites-grid {
    grid-template-columns: 1fr;
  }
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

.section-card {
  animation: fadeInUp 0.6s ease-out;
}
</style>

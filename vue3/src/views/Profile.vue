<template>
  <div class="profile-container" :class="{ 'dark-mode': darkMode }">
    <!-- 面包屑导航 -->
    <div class="profile-breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 用户概要卡片 -->
    <div class="user-summary-card">
      <div class="summary-backdrop"></div>
      <div class="summary-content">
        <!-- 左侧头像区 -->
        <div class="avatar-section">
          <div class="avatar-wrapper">
            <el-avatar :size="96" :src="userAvatar" class="main-avatar" />
            <div class="avatar-status" :class="{ 'online': isOnline }"></div>
            <div class="avatar-upload-overlay" @click="triggerAvatarUpload">
              <i class="el-icon-camera"></i>
            </div>
          </div>
          <div class="user-basic-info">
            <h3>{{ userInfo.username }}</h3>
            <p class="user-id">ID: {{ userInfo.id || '--' }}</p>
            <el-tag type="success" size="small" class="user-role">普通用户</el-tag>
          </div>
        </div>

        <!-- 右侧统计信息 -->
        <div class="stats-section">
          <div class="stat-item">
            <div class="stat-icon" style="background: linear-gradient(135deg, #10b981, #059669)">
              <i class="el-icon-camera"></i>
            </div>
            <div class="stat-content">
              <div class="stat-value">128</div>
              <div class="stat-label">识别记录</div>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon" style="background: linear-gradient(135deg, #3b82f6, #2563eb)">
              <i class="el-icon-collection"></i>
            </div>
            <div class="stat-content">
              <div class="stat-value">42</div>
              <div class="stat-label">收藏蛇类</div>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon" style="background: linear-gradient(135deg, #8b5cf6, #7c3aed)">
              <i class="el-icon-time"></i>
            </div>
            <div class="stat-content">
              <div class="stat-value">7</div>
              <div class="stat-label">使用天数</div>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon" style="background: linear-gradient(135deg, #ef4444, #dc2626)">
              <i class="el-icon-warning-outline"></i>
            </div>
            <div class="stat-content">
              <div class="stat-value">0</div>
              <div class="stat-label">求助记录</div>
            </div>
          </div>
        </div>

        <!-- 快捷操作 -->
        <div class="quick-actions">
          <el-button type="primary" plain @click="activeTab = '2'">
            <i class="el-icon-edit"></i> 编辑资料
          </el-button>
          <el-button type="success" plain @click="activeTab = '3'">
            <i class="el-icon-lock"></i> 修改密码
          </el-button>
          <el-button type="info" plain @click="handleLogout">
            <i class="el-icon-switch-button"></i> 退出登录
          </el-button>
        </div>
      </div>
    </div>

    <!-- 主体内容区 -->
    <div class="profile-main">
      <!-- 侧边导航 -->
      <div class="profile-sidebar">
        <el-menu
            :default-active="activeTab"
            class="profile-menu"
            @select="handleMenuSelect"
        >
          <el-menu-item index="1">
            <div class="menu-item-content">
              <div class="menu-icon" style="background: linear-gradient(135deg, #10b981, #059669)">
                <i class="el-icon-user"></i>
              </div>
              <span>个人信息</span>
            </div>
          </el-menu-item>
          <el-menu-item index="2">
            <div class="menu-item-content">
              <div class="menu-icon" style="background: linear-gradient(135deg, #3b82f6, #2563eb)">
                <i class="el-icon-edit"></i>
              </div>
              <span>编辑资料</span>
            </div>
          </el-menu-item>
          <el-menu-item index="3">
            <div class="menu-item-content">
              <div class="menu-icon" style="background: linear-gradient(135deg, #8b5cf6, #7c3aed)">
                <i class="el-icon-lock"></i>
              </div>
              <span>修改密码</span>
            </div>
          </el-menu-item>
          <el-menu-item index="4">
            <div class="menu-item-content">
              <div class="menu-icon" style="background: linear-gradient(135deg, #f59e0b, #d97706)">
                <i class="el-icon-setting"></i>
              </div>
              <span>账号设置</span>
            </div>
          </el-menu-item>
          <el-menu-item index="5">
            <div class="menu-item-content">
              <div class="menu-icon" style="background: linear-gradient(135deg, #ef4444, #dc2626)">
                <i class="el-icon-bell"></i>
              </div>
              <span>消息通知</span>
              <el-badge :value="3" class="menu-badge" />
            </div>
          </el-menu-item>
        </el-menu>
      </div>

      <!-- 内容区域 -->
      <div class="profile-content">
        <!-- 个人信息 -->
        <div class="glass-card" v-if="activeTab === '1'">
          <div class="card-header">
            <div class="header-icon" style="background: linear-gradient(135deg, #10b981, #059669)">
              <i class="el-icon-user"></i>
            </div>
            <div class="header-content">
              <h3>个人信息</h3>
              <p>查看和管理您的个人账户信息</p>
            </div>
          </div>

          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">
                <i class="el-icon-user info-icon"></i>
                <span>用户名</span>
              </div>
              <div class="info-value">{{ userInfo.username }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">
                <i class="el-icon-message info-icon"></i>
                <span>邮箱</span>
              </div>
              <div class="info-value">{{ userInfo.email || '未设置' }}</div>
              <el-button type="text" @click="bindEmail" v-if="!userInfo.email">
                <i class="el-icon-link"></i> 绑定
              </el-button>
            </div>
            <div class="info-item">
              <div class="info-label">
                <i class="el-icon-phone info-icon"></i>
                <span>手机号</span>
              </div>
              <div class="info-value">{{ userInfo.phone || '未设置' }}</div>
              <el-button type="text" @click="bindPhone" v-if="!userInfo.phone">
                <i class="el-icon-link"></i> 绑定
              </el-button>
            </div>
            <div class="info-item">
              <div class="info-label">
                <i class="el-icon-time info-icon"></i>
                <span>注册时间</span>
              </div>
              <div class="info-value">{{ formatDate(userInfo.createTime) }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">
                <i class="el-icon-position info-icon"></i>
                <span>最后登录</span>
              </div>
              <div class="info-value">{{ formatDate(userInfo.lastLoginTime) }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">
                <i class="el-icon-ship info-icon"></i>
                <span>账户状态</span>
              </div>
              <div class="info-value">
                <el-tag type="success" effect="plain">正常</el-tag>
              </div>
            </div>
          </div>

          <div class="security-status">
            <h4>安全等级</h4>
            <div class="security-progress">
              <el-progress
                  :percentage="securityLevel"
                  :show-text="false"
                  :stroke-width="8"
                  color="#10b981"
              />
              <div class="security-labels">
                <span>低</span>
                <span>中</span>
                <span>高</span>
              </div>
            </div>
            <div class="security-tips">
              <i class="el-icon-info"></i>
              <span>建议绑定邮箱和手机号提升账户安全</span>
            </div>
          </div>
        </div>

        <!-- 编辑资料 -->
        <div class="glass-card" v-else-if="activeTab === '2'">
          <div class="card-header">
            <div class="header-icon" style="background: linear-gradient(135deg, #3b82f6, #2563eb)">
              <i class="el-icon-edit"></i>
            </div>
            <div class="header-content">
              <h3>编辑资料</h3>
              <p>更新您的个人资料信息</p>
            </div>
          </div>

          <el-form :model="editForm" :rules="editRules" ref="editFormRef" label-width="100px" class="edit-form">
            <div class="form-section">
              <h4>基本信息</h4>
              <div class="form-grid">
                <el-form-item label="用户名" prop="username">
                  <el-input
                      v-model="editForm.username"
                      placeholder="请输入用户名"
                      :prefix-icon="User"
                      size="large"
                      clearable
                  />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input
                      v-model="editForm.email"
                      placeholder="请输入邮箱"
                      :prefix-icon="Message"
                      size="large"
                      clearable
                  />
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                  <el-input
                      v-model="editForm.phone"
                      placeholder="请输入手机号"
                      :prefix-icon="Phone"
                      size="large"
                      clearable
                      maxlength="11"
                  />
                </el-form-item>
              </div>
            </div>

            <div class="form-section">
              <h4>头像设置</h4>
              <div class="avatar-upload-section">
                <div class="avatar-preview">
                  <el-avatar :size="120" :src="userAvatar" />
                  <div class="avatar-actions">
                    <el-button type="primary" @click="triggerAvatarUpload" size="small">
                      <i class="el-icon-camera"></i> 更换头像
                    </el-button>
                    <el-button type="danger" @click="resetAvatar" size="small" plain>
                      <i class="el-icon-refresh"></i> 恢复默认
                    </el-button>
                  </div>
                </div>
                <div class="upload-tips">
                  <p><i class="el-icon-info"></i> 支持 JPG、PNG、GIF 格式</p>
                  <p><i class="el-icon-info"></i> 建议尺寸 200×200 像素</p>
                  <p><i class="el-icon-info"></i> 文件大小不超过 20MB</p>
                </div>
              </div>
            </div>

            <div class="form-actions">
              <el-button type="primary" @click="submitEdit" :loading="isSubmitting" size="large">
                <i class="el-icon-check"></i> 保存修改
              </el-button>
              <el-button @click="resetForm" size="large">
                <i class="el-icon-refresh-right"></i> 重置
              </el-button>
            </div>
          </el-form>

          <!-- 隐藏的上传组件 -->
          <input
              type="file"
              ref="avatarInput"
              style="display: none"
              accept="image/*"
              @change="handleAvatarChange"
          />
        </div>

        <!-- 修改密码 -->
        <div class="glass-card" v-else-if="activeTab === '3'">
          <div class="card-header">
            <div class="header-icon" style="background: linear-gradient(135deg, #8b5cf6, #7c3aed)">
              <i class="el-icon-lock"></i>
            </div>
            <div class="header-content">
              <h3>修改密码</h3>
              <p>定期修改密码有助于保护账户安全</p>
            </div>
          </div>

          <el-form :model="passwordForm" :rules="passwordRules" ref="passwordFormRef" class="password-form">
            <div class="password-inputs">
              <el-form-item prop="oldPassword">
                <template #label>
                  <div class="password-label">
                    <i class="el-icon-key"></i>
                    <span>当前密码</span>
                  </div>
                </template>
                <el-input
                    v-model="passwordForm.oldPassword"
                    type="password"
                    placeholder="请输入当前密码"
                    show-password
                    size="large"
                />
              </el-form-item>

              <el-form-item prop="newPassword">
                <template #label>
                  <div class="password-label">
                    <i class="el-icon-key"></i>
                    <span>新密码</span>
                  </div>
                </template>
                <el-input
                    v-model="passwordForm.newPassword"
                    type="password"
                    placeholder="请输入新密码（至少6位）"
                    show-password
                    size="large"
                />
                <div class="password-strength">
                  <div class="strength-bar" :class="getPasswordStrength(passwordForm.newPassword)"></div>
                </div>
              </el-form-item>

              <el-form-item prop="confirmNewPassword">
                <template #label>
                  <div class="password-label">
                    <i class="el-icon-key"></i>
                    <span>确认新密码</span>
                  </div>
                </template>
                <el-input
                    v-model="passwordForm.confirmNewPassword"
                    type="password"
                    placeholder="请再次输入新密码"
                    show-password
                    size="large"
                />
              </el-form-item>
            </div>

            <div class="password-tips">
              <div class="tip-item">
                <i class="el-icon-success" style="color: #10b981"></i>
                <span>密码至少包含6个字符</span>
              </div>
              <div class="tip-item">
                <i class="el-icon-success" style="color: #10b981"></i>
                <span>建议使用字母、数字和符号组合</span>
              </div>
              <div class="tip-item">
                <i class="el-icon-success" style="color: #10b981"></i>
                <span>定期更换密码更安全</span>
              </div>
            </div>

            <div class="form-actions">
              <el-button
                  type="primary"
                  @click="submitPasswordChange"
                  :loading="isSubmitting"
                  size="large"
                  :disabled="!isPasswordValid"
              >
                <i class="el-icon-check"></i> 确认修改
              </el-button>
            </div>
          </el-form>
        </div>

        <!-- 账号设置 -->
        <div class="glass-card" v-else-if="activeTab === '4'">
          <div class="card-header">
            <div class="header-icon" style="background: linear-gradient(135deg, #f59e0b, #d97706)">
              <i class="el-icon-setting"></i>
            </div>
            <div class="header-content">
              <h3>账号设置</h3>
              <p>管理您的账号和安全设置</p>
            </div>
          </div>

          <div class="settings-grid">
            <div class="setting-item">
              <div class="setting-icon" style="background: rgba(16, 185, 129, 0.1); color: #10b981">
                <i class="el-icon-ship"></i>
              </div>
              <div class="setting-content">
                <h4>账户安全等级</h4>
                <p>根据您的安全设置评估</p>
              </div>
              <div class="setting-action">
                <el-tag type="success" effect="dark">高</el-tag>
              </div>
            </div>

            <div class="setting-item">
              <div class="setting-icon" style="background: rgba(59, 130, 246, 0.1); color: #3b82f6">
                <i class="el-icon-message"></i>
              </div>
              <div class="setting-content">
                <h4>绑定邮箱</h4>
                <p>{{ userInfo.email || '未绑定' }}</p>
              </div>
              <div class="setting-action">
                <el-button type="primary" @click="bindEmail" :disabled="!!userInfo.email" size="small">
                  {{ userInfo.email ? '已绑定' : '立即绑定' }}
                </el-button>
              </div>
            </div>

            <div class="setting-item">
              <div class="setting-icon" style="background: rgba(139, 92, 246, 0.1); color: #8b5cf6">
                <i class="el-icon-phone"></i>
              </div>
              <div class="setting-content">
                <h4>绑定手机</h4>
                <p>{{ userInfo.phone || '未绑定' }}</p>
              </div>
              <div class="setting-action">
                <el-button type="primary" @click="bindPhone" :disabled="!!userInfo.phone" size="small">
                  {{ userInfo.phone ? '已绑定' : '立即绑定' }}
                </el-button>
              </div>
            </div>

            <div class="setting-item">
              <div class="setting-icon" style="background: rgba(239, 68, 68, 0.1); color: #ef4444">
                <i class="el-icon-bell"></i>
              </div>
              <div class="setting-content">
                <h4>消息通知</h4>
                <p>推送设置和偏好</p>
              </div>
              <div class="setting-action">
                <el-switch v-model="notificationEnabled" />
              </div>
            </div>

            <div class="setting-item">
              <div class="setting-icon" style="background: rgba(245, 158, 11, 0.1); color: #f59e0b">
                <i class="el-icon-moon"></i>
              </div>
              <div class="setting-content">
                <h4>主题模式</h4>
                <p>切换亮色/暗色主题</p>
              </div>
              <div class="setting-action">
                <el-switch
                    v-model="darkMode"
                    active-text="暗色"
                    inactive-text="亮色"
                    @change="toggleDarkMode"
                />
              </div>
            </div>

            <div class="setting-item">
              <div class="setting-icon" style="background: rgba(6, 182, 212, 0.1); color: #06b6d4">
                <i class="el-icon-download"></i>
              </div>
              <div class="setting-content">
                <h4>数据导出</h4>
                <p>导出您的个人数据</p>
              </div>
              <div class="setting-action">
                <el-button type="info" @click="exportData" size="small">
                  <i class="el-icon-download"></i> 导出
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部操作栏 -->
    <div class="profile-footer">
      <div class="footer-content">
        <div class="footer-text">
          <i class="el-icon-info"></i>
          <span>蛇灵(SLING) - 您的智能蛇类安全助手</span>
        </div>
        <div class="footer-actions">
          <el-button type="text" @click="showHelp">
            <i class="el-icon-question"></i> 帮助中心
          </el-button>
          <el-divider direction="vertical" />
          <el-button type="text" @click="showFeedback">
            <i class="el-icon-chat-dot-round"></i> 意见反馈
          </el-button>
          <el-divider direction="vertical" />
          <el-button type="text" @click="privacyPolicy">
            <i class="el-icon-document"></i> 隐私政策
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { User, Message, Phone } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import api from '../services/api'
import { useUserStore } from '../store/user.js'

const router = useRouter()
const userStore = useUserStore()

// 基础状态
const activeTab = ref('1')
const isOnline = ref(navigator.onLine)
const darkMode = ref(false)
const securityLevel = ref(70)
const notificationEnabled = ref(true)
const isSubmitting = ref(false)

// DOM引用
const avatarInput = ref(null)
const editFormRef = ref(null)
const passwordFormRef = ref(null)

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

// 计算属性
const userAvatar = computed(() => {
  // 优先使用最新的头像URL，然后是临时预览，最后是默认头像
  return userInfo.value.avatar || userInfo.value.avatarUrl || defaultAvatar
})

const isPasswordValid = computed(() => {
  return passwordForm.value.newPassword.length >= 6 &&
      passwordForm.value.newPassword === passwordForm.value.confirmNewPassword
})

// 方法
const getPasswordStrength = (password) => {
  if (!password) return 'weak'
  const strength = password.length
  if (strength < 6) return 'weak'
  if (strength < 10) return 'medium'
  return 'strong'
}

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

const handleMenuSelect = (key) => {
  activeTab.value = key
}

const triggerAvatarUpload = () => {
  avatarInput.value?.click()
}

const handleAvatarChange = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  // 验证文件类型
  if (!file.type.startsWith('image/')) {
    ElMessage.error('请选择图片文件')
    return
  }

  // 验证文件大小
  if (file.size > 20 * 1024 * 1024) {
    ElMessage.error('图片大小不能超过20MB')
    return
  }

  // 读取图片并更新预览
  const reader = new FileReader()
  reader.onload = async (e) => {
    // 立即更新本地预览
    userInfo.value.avatar = e.target.result
    
    try {
      const response = await api.user.uploadAvatar({
        file: file,
        userId: userInfo.value.id
      })
      if (response.data.code === 200) {
        ElMessage.success('头像上传成功！')
        
        // 确保使用服务器返回的完整URL
        const avatarUrl = response.data.data.fullAvatarUrl || response.data.data.avatarUrl;
        // Avatar URL updated from server response
        
        // 更新用户信息中的头像URL
        userInfo.value.avatarUrl = avatarUrl;
        userInfo.value.avatar = avatarUrl; // 同时更新预览

        // 更新store中的用户信息
        if (userStore.userInfo) {
          userStore.userInfo.avatarUrl = avatarUrl;
          userStore.userInfo.avatar = avatarUrl;
        }
        
        // 清除文件输入，以便下次可以上传同一文件
        event.target.value = '';
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

const bindEmail = () => {
  ElMessage.info('邮箱绑定功能开发中')
}

const bindPhone = () => {
  ElMessage.info('手机绑定功能开发中')
}

const toggleDarkMode = (value) => {
  darkMode.value = value
  document.body.classList.toggle('dark-mode', value)
  ElMessage.success(value ? '已切换至暗色模式' : '已切换至亮色模式')
}

const exportData = () => {
  ElMessage.info('数据导出功能开发中')
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
  })
}

const showHelp = () => {
  ElMessage.info('显示帮助中心')
}

const showFeedback = () => {
  ElMessage.info('显示反馈界面')
}

const privacyPolicy = () => {
  ElMessage.info('显示隐私政策')
}

const formatDate = (dateString) => {
  if (!dateString) return '暂无'
  const date = new Date(dateString)
  return date.toLocaleString('zh-CN')
}

onMounted(() => {
  loadUserInfo()
  window.addEventListener('online', () => isOnline.value = true)
  window.addEventListener('offline', () => isOnline.value = false)

  // 检查暗色模式
  darkMode.value = document.body.classList.contains('dark-mode')
})
</script>

<style scoped>
.profile-container {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--surface-cool) 0%, var(--ink-200) 100%);
  padding: var(--space-5);
  transition: background var(--transition-base);
}

.profile-breadcrumb {
  margin-bottom: var(--space-5);
}

.user-summary-card {
  position: relative;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-lg);
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: var(--shadow-card);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
}

.summary-backdrop {
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background: linear-gradient(135deg, rgba(5, 150, 105, 0.1), rgba(8, 145, 178, 0.1));
  border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
}

.summary-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 30px;
}

.avatar-section {
  display: flex;
  align-items: center;
  gap: var(--space-5);
}

.avatar-wrapper {
  position: relative;
  width: 96px;
  height: 96px;
}

.main-avatar {
  border: 4px solid var(--surface-white);
  box-shadow: var(--shadow-md);
}

.avatar-status {
  position: absolute;
  bottom: var(--space-1);
  right: var(--space-1);
  width: var(--space-4);
  height: var(--space-4);
  border-radius: 50%;
  background-color: var(--danger);
  border: 2px solid var(--surface-white);
}

.avatar-status.online {
  background-color: var(--green-500);
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
  color: var(--surface-white);
  opacity: 0;
  transition: opacity var(--transition-base);
  cursor: pointer;
}

.avatar-wrapper:hover .avatar-upload-overlay {
  opacity: 1;
}

.user-basic-info h3 {
  margin: 0 0 var(--space-2) 0;
  font-size: var(--text-2xl);
  font-weight: var(--weight-semibold);
  color: var(--ink-900);
}

.user-id {
  margin: 0 0 10px 0;
  color: var(--ink-500);
  font-size: var(--text-sm);
}

.user-role {
  font-weight: var(--weight-medium);
}

.stats-section {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px var(--space-5);
  background: rgba(255, 255, 255, 0.9);
  border-radius: var(--radius-md);
  min-width: 160px;
  transition: transform var(--transition-base);
}

.stat-item:hover {
  transform: translateY(-3px);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--surface-white);
  font-size: var(--text-xl);
}

.stat-value {
  font-size: var(--text-2xl);
  font-weight: var(--weight-bold);
  color: var(--ink-900);
  line-height: 1;
}

.stat-label {
  font-size: var(--text-sm);
  color: var(--ink-500);
  margin-top: var(--space-1);
}

.quick-actions {
  display: flex;
  gap: 10px;
  width: 100%;
  margin-top: var(--space-5);
}

.profile-main {
  display: flex;
  gap: var(--space-5);
}

.profile-sidebar {
  width: 260px;
  flex-shrink: 0;
}

.profile-menu {
  border: none;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-lg);
  padding: 10px 0;
}

:deep(.el-menu-item) {
  height: 60px;
  margin: var(--space-1) 10px;
  border-radius: var(--radius-md);
}

:deep(.el-menu-item.is-active) {
  background: linear-gradient(135deg, rgba(5, 150, 105, 0.1), rgba(8, 145, 178, 0.1));
  color: var(--green-500);
  font-weight: var(--weight-medium);
}

.menu-item-content {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  width: 100%;
}

.menu-icon {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--surface-white);
  font-size: var(--text-base);
}

.menu-badge {
  margin-left: auto;
}

.profile-content {
  flex: 1;
}

.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-lg);
  padding: 30px;
  box-shadow: var(--shadow-card);
  margin-bottom: var(--space-5);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
  padding-bottom: var(--space-5);
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
}

.header-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--surface-white);
  font-size: var(--text-2xl);
}

.header-content h3 {
  margin: 0;
  font-size: var(--text-xl);
  font-weight: var(--weight-semibold);
  color: var(--ink-900);
}

.header-content p {
  margin: 5px 0 0 0;
  color: var(--ink-500);
  font-size: var(--text-sm);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-5);
  margin-bottom: 30px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: var(--radius-md);
  transition: background var(--transition-base);
}

.info-label {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-width: 100px;
}

.info-icon {
  color: var(--green-500);
  font-size: var(--text-base);
}

.info-label span {
  font-weight: var(--weight-medium);
  color: var(--ink-700);
}

.info-value {
  flex: 1;
  color: var(--ink-900);
  font-weight: var(--weight-medium);
}

.security-status {
  padding: var(--space-5);
  background: rgba(5, 150, 105, 0.05);
  border-radius: var(--radius-md);
}

.security-status h4 {
  margin: 0 0 15px 0;
  color: var(--ink-900);
}

.security-progress {
  margin-bottom: 15px;
}

.security-labels {
  display: flex;
  justify-content: space-between;
  font-size: var(--text-xs);
  color: var(--ink-500);
  margin-top: var(--space-2);
}

.security-tips {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--ink-500);
  font-size: var(--text-sm);
}

.edit-form {
  margin-top: 30px;
}

.form-section {
  margin-bottom: 30px;
}

.form-section h4 {
  margin: 0 0 var(--space-5) 0;
  color: var(--ink-900);
  font-size: var(--text-base);
  font-weight: var(--weight-semibold);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-5);
}

:deep(.el-form-item__label) {
  font-weight: var(--weight-medium);
  color: var(--ink-700);
}

.avatar-upload-section {
  display: flex;
  gap: 30px;
  align-items: flex-start;
}

.avatar-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.avatar-actions {
  display: flex;
  gap: 10px;
}

.upload-tips {
  flex: 1;
}

.upload-tips p {
  margin: var(--space-2) 0;
  color: var(--ink-500);
  font-size: var(--text-sm);
}

.upload-tips i {
  margin-right: var(--space-2);
  color: var(--green-500);
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: var(--space-10);
  padding-top: var(--space-5);
  border-top: 1px solid rgba(226, 232, 240, 0.5);
}

.password-form {
  margin-top: 30px;
}

.password-inputs {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.password-label {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-weight: var(--weight-medium);
}

.password-strength {
  margin-top: 10px;
}

.strength-bar {
  height: var(--space-1);
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
  background: var(--green-500);
}

.password-tips {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 30px 0;
  padding: var(--space-5);
  background: rgba(5, 150, 105, 0.05);
  border-radius: var(--radius-md);
}

.tip-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--ink-500);
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-5);
  margin-top: 30px;
}

.setting-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: var(--space-5);
  background: rgba(255, 255, 255, 0.5);
  border-radius: var(--radius-md);
  transition: transform var(--transition-base);
}

.setting-item:hover {
  transform: translateY(-3px);
}

.setting-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-xl);
  flex-shrink: 0;
}

.setting-content {
  flex: 1;
}

.setting-content h4 {
  margin: 0 0 5px 0;
  font-size: var(--text-base);
  font-weight: var(--weight-semibold);
  color: var(--ink-900);
}

.setting-content p {
  margin: 0;
  color: var(--ink-500);
  font-size: var(--text-sm);
}

.profile-footer {
  margin-top: var(--space-10);
  padding: var(--space-5);
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-lg);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}

.footer-text {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--ink-500);
  font-size: var(--text-sm);
}

.footer-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

@media (max-width: 1200px) {
  .profile-main {
    flex-direction: column;
  }

  .profile-sidebar {
    width: 100%;
  }

  .summary-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .stats-section {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
  }

  .settings-grid {
    grid-template-columns: 1fr;
  }

  .avatar-upload-section {
    flex-direction: column;
  }

  .footer-content {
    flex-direction: column;
    text-align: center;
  }
}

::-webkit-scrollbar {
  width: var(--space-2);
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: var(--radius-sm);
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.15);
  border-radius: var(--radius-sm);
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.25);
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

.glass-card {
  animation: fadeInUp 0.6s ease-out;
}
</style>
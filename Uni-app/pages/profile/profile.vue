<template>
  <view class="profile-container">
    <!-- 顶部背景 -->
    <view class="profile-header">
      <view class="header-bg"></view>
      
      <!-- 用户信息卡片 -->
      <view class="user-info-card" @click="showEditProfile">
        <view class="avatar-wrapper">
          <image 
            v-if="userInfo.avatar" 
            :src="userInfo.avatar" 
            class="avatar"
            mode="aspectFill"
          />
          <view v-else class="avatar-placeholder">
            {{ userNameFirstChar }}
          </view>
        </view>
        
        <view class="user-details">
          <text class="user-name">{{ userInfo.nickname || userInfo.username || '点击登录' }}</text>
          <text class="user-role">{{ getRoleText(userInfo.role) }}</text>
          <text class="user-phone" v-if="userInfo.phone">📱 {{ userInfo.phone }}</text>
        </view>
        
        <view class="arrow-icon">›</view>
      </view>
    </view>

    <!-- 主要内容区 -->
    <scroll-view scroll-y class="main-content">
      <!-- 统计数据 -->
      <view class="stats-card glass-card">
        <view class="stat-item">
          <text class="stat-value">{{ stats.identificationCount }}</text>
          <text class="stat-label">识别次数</text>
        </view>
        <view class="stat-divider"></view>
        <view class="stat-item">
          <text class="stat-value">{{ stats.emergencyCount }}</text>
          <text class="stat-label">应急咨询</text>
        </view>
        <view class="stat-divider"></view>
        <view class="stat-item">
          <text class="stat-value">{{ stats.favoriteCount }}</text>
          <text class="stat-label">收藏夹</text>
        </view>
      </view>

      <!-- 功能菜单 -->
      <view class="menu-section">
        <view class="menu-group glass-card">
          <text class="group-title">📊 我的数据</text>
          
          <view class="menu-list">
            <view class="menu-item" @click="navigateTo('identification')">
              <view class="menu-icon recognition">🐍</view>
              <view class="menu-content">
                <text class="menu-text">识别记录</text>
                <text class="menu-desc">查看蛇类识别历史</text>
              </view>
              <view class="menu-badge" v-if="stats.identificationCount > 0">{{ stats.identificationCount }}</view>
              <text class="menu-arrow">›</text>
            </view>
            
            <view class="menu-item" @click="navigateTo('emergency')">
              <view class="menu-icon emergency">📚</view>
              <view class="menu-content">
                <text class="menu-text">应急指南</text>
                <text class="menu-desc">蛇类应急处理知识</text>
              </view>
              <view class="menu-badge" v-if="stats.emergencyCount > 0">{{ stats.emergencyCount }}</view>
              <text class="menu-arrow">›</text>
            </view>
            
            <view class="menu-item" @click="navigateTo('warnings')">
              <view class="menu-icon warning">🚨</view>
              <view class="menu-content">
                <text class="menu-text">预警记录</text>
                <text class="menu-desc">蛇类活动区域预警</text>
              </view>
              <text class="menu-arrow">›</text>
            </view>
            
            <view class="menu-item" @click="navigateTo('favorites')">
              <view class="menu-icon favorite">⭐</view>
              <view class="menu-content">
                <text class="menu-text">我的收藏</text>
                <text class="menu-desc">收藏的蛇类信息</text>
              </view>
              <view class="menu-badge" v-if="stats.favoriteCount > 0">{{ stats.favoriteCount }}</view>
              <text class="menu-arrow">›</text>
            </view>
          </view>
        </view>

        <view class="menu-group glass-card">
          <text class="group-title">🏥 医疗服务</text>
          
          <view class="menu-list">
            <view class="menu-item" @click="navigateTo('hospital')">
              <view class="menu-icon hospital">🏥</view>
              <view class="menu-content">
                <text class="menu-text">救治医院</text>
                <text class="menu-desc">附近可救治医院</text>
              </view>
              <text class="menu-arrow">›</text>
            </view>
            
            <view class="menu-item" @click="navigateTo('serum')">
              <view class="menu-icon serum">💉</view>
              <view class="menu-content">
                <text class="menu-text">血清信息</text>
                <text class="menu-desc">抗蛇毒血清查询</text>
              </view>
              <text class="menu-arrow">›</text>
            </view>
          </view>
        </view>

        <view class="menu-group glass-card">
          <text class="group-title">⚙️ 个人设置</text>
          
          <view class="menu-list">
            <view class="menu-item" @click="showEditProfile">
              <view class="menu-icon profile">👤</view>
              <view class="menu-content">
                <text class="menu-text">个人信息</text>
                <text class="menu-desc">管理账户资料</text>
              </view>
              <text class="menu-arrow">›</text>
            </view>
            
            <view class="menu-item" @click="changePassword">
              <view class="menu-icon password">🔐</view>
              <view class="menu-content">
                <text class="menu-text">修改密码</text>
                <text class="menu-desc">保障账户安全</text>
              </view>
              <text class="menu-arrow">›</text>
            </view>
            
            <view class="menu-item" @click="navigateTo('feedback')">
              <view class="menu-icon feedback">💬</view>
              <view class="menu-content">
                <text class="menu-text">意见反馈</text>
                <text class="menu-desc">帮助我们做得更好</text>
              </view>
              <text class="menu-arrow">›</text>
            </view>
            
            <view class="menu-item" @click="navigateTo('about')">
              <view class="menu-icon about">ℹ️</view>
              <view class="menu-content">
                <text class="menu-text">关于蛇灵</text>
                <text class="menu-desc">了解应用信息</text>
              </view>
              <text class="menu-arrow">›</text>
            </view>
          </view>
        </view>

        <!-- 退出登录 -->
        <view class="logout-section" v-if="isLoggedIn">
          <view class="logout-btn" @click="logout">
            <text class="logout-icon">🚪</text>
            <text class="logout-text">退出登录</text>
          </view>
        </view>
      </view>

      <!-- 未登录提示 -->
      <view class="login-prompt glass-card" v-if="!isLoggedIn">
        <view class="prompt-icon">🔒</view>
        <text class="prompt-title">您还未登录</text>
        <text class="prompt-subtitle">登录后可以享受完整的蛇灵服务</text>
        <view class="login-btn" @click="navigateToLogin">立即登录</view>
      </view>
    </scroll-view>

    <!-- 编辑个人信息弹窗 -->
    <view class="modal-mask" v-if="showEditModal" @click="closeEditModal">
      <view class="edit-modal" @click.stop>
        <view class="modal-header">
          <text class="modal-title">编辑个人信息</text>
          <text class="modal-close" @click="closeEditModal">✕</text>
        </view>
        
        <scroll-view scroll-y class="modal-content">
          <view class="form-item">
            <text class="form-label">昵称</text>
            <input 
              class="form-input"
              v-model="editForm.nickname"
              placeholder="请输入昵称"
            />
          </view>
          
          <view class="form-item">
            <text class="form-label">手机号</text>
            <input 
              class="form-input"
              v-model="editForm.phone"
              type="number"
              placeholder="请输入手机号"
            />
          </view>
          
          <view class="form-item">
            <text class="form-label">邮箱</text>
            <input 
              class="form-input"
              v-model="editForm.email"
              placeholder="请输入邮箱"
            />
          </view>
        </scroll-view>
        
        <view class="modal-actions">
          <view class="action-btn secondary" @click="closeEditModal">取消</view>
          <view class="action-btn primary" @click="saveProfile">保存</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { userApi, recognitionApi } from '@/utils/api.js'
import { useUserStore } from '@/store/user.js'

// 响应式数据
const showEditModal = ref(false)
const editForm = ref({
  nickname: '',
  phone: '',
  email: ''
})

// 使用 Pinia 状态管理
const userStore = useUserStore()

// 计算属性 - 直接使用 store 的 getter
const isLoggedIn = computed(() => userStore.isLoggedIn)
const userInfo = computed(() => userStore.userInfo || {})
const userNameFirstChar = computed(() => {
  const name = userInfo.value.nickname || userInfo.value.username || ''
  return name ? name.charAt(0).toUpperCase() : '用'
})

const stats = ref({
  identificationCount: 0,
  emergencyCount: 0,
  favoriteCount: 0
})

// 方法
const getRoleText = (role) => {
  const roleMap = {
    'ADMIN': '管理员',
    'USER': '普通用户',
    'VIP': 'VIP 用户'
  }
  return roleMap[role] || '用户'
}

const navigateTo = async (page) => {
  if (!isLoggedIn.value) {
    navigateToLogin()
    return
  }
  
  // Navigate based on page type
  switch(page) {
    case 'identification':
      uni.showToast({ title: '识别记录功能开发中', icon: 'none' })
      break
    case 'emergency':
      uni.switchTab({ url: '/pages/emergency/emergency' })
      break
    case 'warnings':
      uni.showToast({ title: '预警记录功能开发中', icon: 'none' })
      break
    case 'favorites':
      uni.navigateTo({ url: '/pages/favorites/favorites' })
      break
    case 'hospital':
      uni.switchTab({ url: '/pages/hospital/hospital' })
      break
    case 'serum':
      uni.showToast({ title: '血清查询功能开发中', icon: 'none' })
      break
    case 'settings':
      uni.showToast({ title: '设置功能开发中', icon: 'none' })
      break
    case 'feedback':
      uni.showToast({ title: '意见反馈功能开发中', icon: 'none' })
      break
    case 'about':
      uni.showModal({
        title: '关于蛇灵',
        content: '蛇灵 - 智能蛇类识别与应急指导系统\n\n版本：v1.0.0\n\n提供蛇类识别、应急处理指南、血清查询等功能，帮助您安全应对蛇类相关紧急情况。',
        showCancel: false
      })
      break
    default:
      uni.showToast({ title: `${page}功能开发中`, icon: 'none' })
  }
}

const navigateToLogin = () => {
  uni.reLaunch({
    url: '/pages/login/login'
  })
}

const showEditProfile = () => {
  if (!isLoggedIn.value) {
    navigateToLogin()
    return
  }
  
  editForm.value = {
    nickname: userInfo.value.nickname || '',
    phone: userInfo.value.phone || '',
    email: userInfo.value.email || ''
  }
  
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
}

const saveProfile = async () => {
  try {
    await userApi.updateUserInfo({
      id: userInfo.value.id,
      ...editForm.value
    })
    
    // 更新本地存储
    userStore.setUserInfo({
      ...userInfo.value,
      ...editForm.value
    })
    
    uni.showToast({
      title: '保存成功',
      icon: 'success'
    })
    
    closeEditModal()
  } catch (error) {
    console.error('保存失败:', error)
    uni.showToast({
      title: '保存失败：' + (error.message || '未知错误'),
      icon: 'none',
      duration: 3000
    })
  }
}

const changePassword = () => {
  if (!isLoggedIn.value) {
    navigateToLogin()
    return
  }
  
  uni.showModal({
    title: '修改密码',
    editable: true,
    placeholderText: '请输入新密码',
    success: async (res) => {
      if (res.confirm && res.content) {
        try {
          await userApi.changePassword({
            userId: userInfo.value.id,
            newPassword: res.content
          })
          
          uni.showToast({
            title: '修改成功',
            icon: 'success'
          })
        } catch (error) {
          console.error('修改密码失败:', error)
          uni.showToast({
            title: '修改失败：' + (error.message || '未知错误'),
            icon: 'none',
            duration: 3000
          })
        }
      }
    }
  })
}

const logout = () => {
  uni.showModal({
    title: '确认退出',
    content: '确定要退出登录吗？',
    success: async (res) => {
      if (res.confirm) {
        userStore.logout()
        
        uni.showToast({
          title: '已退出登录',
          icon: 'success'
        })
        
        // 延迟跳转到登录页
        setTimeout(() => {
          uni.reLaunch({
            url: '/pages/login/login'
          })
        }, 1500)
      }
    }
  })
}

const loadStats = async () => {
  if (!isLoggedIn.value) return

  try {
    const userId = userInfo.value.id

    // Query recognition count via API module
    let recognitionCount = 0
    try {
      const recognitionRes = await recognitionApi.getRecordsByUser(userId)
      recognitionCount = Array.isArray(recognitionRes?.data) ? recognitionRes.data.length : (Array.isArray(recognitionRes) ? recognitionRes.length : 0)
    } catch (e) {
      console.error('Failed to load recognition records:', e)
    }

    // Emergency inquiry count (from local history)
    const emergencyHistory = uni.getStorageSync('emergency_name_history') || []
    const emergencyCount = Array.isArray(emergencyHistory) ? emergencyHistory.length : 0

    // Favorites count (from local storage)
    const favorites = uni.getStorageSync('favorites') || []
    const favoriteCount = Array.isArray(favorites) ? favorites.length : 0

    stats.value = {
      identificationCount: recognitionCount,
      emergencyCount: emergencyCount,
      favoriteCount: favoriteCount
    }
  } catch (error) {
    console.error('加载统计数据失败:', error)
    const emergencyHistory = uni.getStorageSync('emergency_name_history') || []
    const favorites = uni.getStorageSync('favorites') || []
    stats.value = {
      identificationCount: 0,
      emergencyCount: Array.isArray(emergencyHistory) ? emergencyHistory.length : 0,
      favoriteCount: Array.isArray(favorites) ? favorites.length : 0
    }
  }
}

// 生命周期
onMounted(() => {
  if (isLoggedIn.value) {
    loadStats()
  }
})
</script>

<style lang="scss" scoped>
.profile-container {
  min-height: 100vh;
  background: linear-gradient(180deg, #3b82f6 0%, #1e40af 30%, #f5f7fa 30%);
  position: relative;
}

.header-bg {
  height: 200px;
  background: linear-gradient(135deg, #3b82f6, #1e40af);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

/* 用户信息卡片 */
.user-info-card {
  position: relative;
  margin: 60px 16px 0;
  padding: 24px;
  background: white;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.user-info-card:active {
  transform: scale(0.98);
}

.avatar-wrapper {
  flex-shrink: 0;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 600;
}

.user-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.user-name {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
}

.user-role {
  font-size: 13px;
  color: #64748b;
  padding: 2px 8px;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 4px;
  align-self: flex-start;
}

.user-phone {
  font-size: 13px;
  color: #64748b;
}

.arrow-icon {
  font-size: 24px;
  color: #94a3b8;
}

/* 主要内容区 */
.main-content {
  padding-top: 20px;
  padding-bottom: 40px;
}

/* 玻璃态卡片 */
.glass-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  margin: 0 16px 20px;
}

/* 统计卡片 */
.stats-card {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 24px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #3b82f6;
}

.stat-label {
  font-size: 13px;
  color: #64748b;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(0, 0, 0, 0.1);
}

/* 菜单区域 */
.menu-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.menu-group {
  padding: 16px;
}

.group-title {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 12px;
  padding-left: 8px;
}

.menu-list {
  display: flex;
  flex-direction: column;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 8px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.menu-item:active {
  background: rgba(59, 130, 246, 0.05);
  border-radius: 8px;
}

.menu-item.logout {
  color: #ef4444;
}

.menu-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}

.menu-icon.recognition {
  background: rgba(59, 130, 246, 0.1);
}

.menu-icon.emergency {
  background: rgba(239, 68, 68, 0.1);
}

.menu-icon.hospital {
  background: rgba(16, 185, 129, 0.1);
}

.menu-icon.serum {
  background: rgba(239, 68, 68, 0.1);
}

.menu-icon.profile {
  background: rgba(139, 92, 246, 0.1);
}

.menu-icon.password {
  background: rgba(245, 158, 11, 0.1);
}

.menu-icon.settings {
  background: rgba(99, 102, 241, 0.1);
}

.menu-icon.feedback {
  background: rgba(59, 130, 246, 0.1);
}

.menu-icon.about {
  background: rgba(16, 185, 129, 0.1);
}

.menu-icon.logout {
  background: rgba(239, 68, 68, 0.1);
}

.menu-icon.warning {
  background: rgba(245, 158, 11, 0.1);
}

.menu-icon.favorite {
  background: rgba(234, 179, 8, 0.1);
}

.menu-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.menu-text {
  font-size: 15px;
  color: #1e293b;
  font-weight: 500;
}

.menu-desc {
  font-size: 12px;
  color: #94a3b8;
}

.menu-arrow {
  font-size: 20px;
  color: #94a3b8;
}

.menu-badge {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  min-width: 20px;
  text-align: center;
}

/* 退出登录按钮 */
.logout-section {
  margin-top: 20px;
}

.logout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-btn:active {
  background: rgba(239, 68, 68, 0.2);
}

.logout-icon {
  font-size: 20px;
}

.logout-text {
  font-size: 15px;
  font-weight: 600;
  color: #ef4444;
}

/* 未登录提示 */
.login-prompt {
  text-align: center;
  padding: 40px 20px;
}

.prompt-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 12px;
}

.prompt-title {
  display: block;
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 6px;
}

.prompt-subtitle {
  display: block;
  font-size: 14px;
  color: #64748b;
  margin-bottom: 20px;
}

.login-btn {
  display: inline-block;
  padding: 12px 32px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

.login-btn:active {
  transform: scale(0.95);
}

/* 弹窗 */
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.edit-modal {
  width: 90%;
  max-height: 70vh;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e2e8f0;
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
}

.modal-close {
  font-size: 24px;
  color: #64748b;
  padding: 4px;
  cursor: pointer;
}

.modal-content {
  flex: 1;
  padding: 20px;
  max-height: 50vh;
}

.form-item {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 12px;
  background: rgba(248, 250, 252, 0.8);
  border-radius: 10px;
  font-size: 15px;
  color: #1e293b;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.modal-actions {
  display: flex;
  gap: 12px;
  padding: 16px 20px;
  border-top: 1px solid #e2e8f0;
}

.action-btn {
  flex: 1;
  padding: 12px 0;
  border-radius: 12px;
  font-weight: 600;
  font-size: 15px;
  text-align: center;
  transition: all 0.3s ease;
}

.action-btn:active {
  transform: scale(0.95);
}

.action-btn.primary {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
}

.action-btn.secondary {
  background: rgba(248, 250, 252, 0.8);
  color: #1e293b;
}
</style>

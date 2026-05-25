<template>
  <view class="login-container">
    <!-- Background decoration -->
    <view class="background-overlay"></view>

    <!-- Main login box -->
    <view class="login-main">
      <!-- Brand section -->
      <view class="login-brand">
        <view class="brand-content">
          <view class="brand-logo">
            <text class="logo-icon">🐍</text>
            <text class="brand-name">蛇灵 (SLING)</text>
          </view>

          <view class="brand-slogan">
            <text class="slogan-title">您的智能蛇类安全助手</text>
            <text class="slogan-desc">AI 智能识别 • 实时区域预警 • 应急指导 • 精准寻医</text>
          </view>

          <!-- Feature display -->
          <view class="brand-features">
            <view class="feature-item">
              <view class="feature-icon" style="background: linear-gradient(135deg, #10b981, #059669)">
                <text>📸</text>
              </view>
              <view class="feature-text">
                <text class="feature-title">智能识别</text>
                <text class="feature-desc">300+ 种蛇类识别</text>
              </view>
            </view>

            <view class="feature-item">
              <view class="feature-icon" style="background: linear-gradient(135deg, #3b82f6, #2563eb)">
                <text>🗺️</text>
              </view>
              <view class="feature-text">
                <text class="feature-title">实时预警</text>
                <text class="feature-desc">地理活动监测</text>
              </view>
            </view>

            <view class="feature-item">
              <view class="feature-icon" style="background: linear-gradient(135deg, #ef4444, #dc2626)">
                <text>🚨</text>
              </view>
              <view class="feature-text">
                <text class="feature-title">应急指导</text>
                <text class="feature-desc">标准化急救流程</text>
              </view>
            </view>
          </view>

          <!-- Stats -->
          <view class="brand-stats">
            <view class="stat-item">
              <text class="stat-value">98%</text>
              <text class="stat-label">识别准确率</text>
            </view>
            <view class="stat-item">
              <text class="stat-value">24/7</text>
              <text class="stat-label">全天候服务</text>
            </view>
            <view class="stat-item">
              <text class="stat-value">500K+</text>
              <text class="stat-label">服务用户</text>
            </view>
          </view>
        </view>
      </view>

      <!-- Login form -->
      <view class="login-form-wrapper">
        <view class="glass-card">
          <view class="form-header">
            <view class="header-icon">
              <text>👤</text>
            </view>
            <view class="header-content">
              <text class="welcome-title">欢迎回来</text>
              <text class="welcome-desc">请登录您的账户继续使用</text>
            </view>
          </view>

          <!-- Login form -->
          <view class="auth-form">
            <view class="form-item">
              <view class="input-with-icon">
                <text class="input-icon">👤</text>
                <input
                  class="custom-input"
                  v-model="loginForm.username"
                  placeholder="用户名/邮箱/手机号"
                  type="text"
                />
              </view>
            </view>

            <view class="form-item">
              <view class="input-with-icon">
                <text class="input-icon">🔒</text>
                <input
                  class="custom-input"
                  v-model="loginForm.password"
                  placeholder="密码"
                  type="password"
                />
              </view>
            </view>

            <!-- Login button -->
            <button
              class="auth-button gradient-btn"
              :disabled="loading"
              @click="handleLogin"
            >
              <text v-if="!loading">🔓 登录</text>
              <text v-else>登录中...</text>
            </button>
          </view>

          <!-- Divider -->
          <view class="divider-section">
            <view class="divider-line"></view>
            <text class="divider-text">快速登录</text>
            <view class="divider-line"></view>
          </view>

          <!-- Social login -->
          <view class="social-login">
            <button class="social-btn wechat" @click="handleWechatLogin">
              <text>💬 微信登录</text>
            </button>
          </view>

          <!-- Footer links -->
          <view class="auth-footer">
            <text class="footer-text">还没有账户？</text>
            <text class="auth-link" @click="goToRegister">立即注册</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/store/user'
import api from '@/utils/api'

const userStore = useUserStore()
const loading = ref(false)
const loginForm = ref({
  username: '',
  password: ''
})

// Account/password login
const handleLogin = async () => {
  // Validate form
  if (!loginForm.value.username || !loginForm.value.password) {
    uni.showToast({ title: '请输入账号密码', icon: 'none' })
    return
  }

  loading.value = true

  try {
    const response = await api.user.login(loginForm.value)

    if (response.code === 200) {
      // Save user info and roles via store (which handles token persistence)
      userStore.setUserInfo(response.data.user)
      userStore.setUserRoles(response.data.roles || [])

      // Set token via store if present
      if (response.data.token) {
        userStore.setToken(response.data.token)
      }

      uni.showToast({ title: '登录成功', icon: 'success' })

      // Delay redirect to ensure state updates complete
      setTimeout(() => {
        // Admin dashboard page does not exist; redirect to index for all users
        uni.reLaunch({ url: '/pages/index/index' })
      }, 500)
    } else {
      uni.showToast({ title: response.message || '登录失败', icon: 'none' })
    }
  } catch (error) {
    console.error('Login error:', error)
    uni.showToast({ title: '账号或密码错误', icon: 'none' })
  } finally {
    loading.value = false
  }
}

// WeChat quick login
const handleWechatLogin = async () => {
  loading.value = true

  try {
    // Step 1: Get WeChat code
    const loginRes = await uni.login({ provider: 'weixin' })

    // Step 2: Send code to backend
    const response = await api.user.wechatLogin({
      code: loginRes.code
    })

    if (response.code === 200) {
      // Same login flow as password login
      userStore.setUserInfo(response.data.user)
      userStore.setUserRoles(response.data.roles || [])

      if (response.data.token) {
        userStore.setToken(response.data.token)
      }

      uni.showToast({ title: '微信登录成功', icon: 'success' })

      setTimeout(() => {
        uni.reLaunch({ url: '/pages/index/index' })
      }, 500)
    } else {
      uni.showToast({ title: response.message || '微信登录失败', icon: 'none' })
    }
  } catch (err) {
    console.error('WeChat login error:', err)
    uni.showToast({ title: '微信登录失败', icon: 'none' })
  } finally {
    loading.value = false
  }
}

// Navigate to register (page not yet created, show message)
const goToRegister = () => {
  uni.showToast({
    title: '注册功能开发中，请使用微信登录',
    icon: 'none',
    duration: 2000
  })
}

onMounted(() => {
  // Check if user is already logged in and redirect
  if (userStore.isLoggedIn) {
    uni.reLaunch({ url: '/pages/index/index' })
  }
})
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

/* Background decoration */
.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.15) 0%, transparent 50%);
  animation: pulse 15s ease-in-out infinite alternate;
}

@keyframes pulse {
  0% { opacity: 0.8; }
  100% { opacity: 1; }
}

/* Main container */
.login-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  gap: 40px;
  z-index: 1;
  position: relative;
}

@media (max-width: 768px) {
  .login-main {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

/* Brand section */
.login-brand {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  animation: slideInLeft 0.8s ease-out;
}

.brand-content {
  max-width: 500px;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
}

.logo-icon {
  font-size: 48px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.brand-name {
  font-size: 36px;
  font-weight: 700;
  background: linear-gradient(135deg, #fff, #e2e8f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.brand-slogan {
  margin-bottom: 40px;
}

.slogan-title {
  display: block;
  font-size: 28px;
  font-weight: 600;
  line-height: 1.3;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  margin-bottom: 15px;
}

.slogan-desc {
  display: block;
  font-size: 16px;
  opacity: 0.9;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
}

/* Feature display */
.brand-features {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 40px 0;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.feature-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.feature-text {
  flex: 1;
}

.feature-title {
  display: block;
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin-bottom: 5px;
}

.feature-desc {
  display: block;
  font-size: 14px;
  opacity: 0.8;
  color: rgba(255, 255, 255, 0.9);
}

/* Stats */
.brand-stats {
  display: flex;
  gap: 20px;
  margin-top: 40px;
}

.stat-item {
  flex: 1;
  text-align: center;
  padding: 15px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-value {
  display: block;
  font-size: 24px;
  font-weight: 700;
  color: #10b981;
  margin-bottom: 5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.stat-label {
  display: block;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Form section */
.login-form-wrapper {
  animation: slideInRight 0.8s ease-out 0.2s both;
}

.glass-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 30px 25px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  box-sizing: border-box;
}

.form-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid rgba(16, 185, 129, 0.2);
}

.header-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 28px;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.header-content {
  flex: 1;
}

.welcome-title {
  display: block;
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.2;
  margin-bottom: 8px;
}

.welcome-desc {
  display: block;
  font-size: 14px;
  color: #64748b;
}

/* Form styles */
.auth-form {
  margin-top: 20px;
}

.form-item {
  margin-bottom: 20px;
}

.input-with-icon {
  position: relative;
  width: 100%;
  box-sizing: border-box;
}

.input-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  font-size: 20px;
  z-index: 2;
}

.custom-input {
  width: 100%;
  height: 50px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(226, 232, 240, 0.8);
  padding-left: 50px;
  font-size: 15px;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.custom-input:focus {
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

/* Login button */
.auth-button {
  width: 100%;
  height: 50px;
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-sizing: border-box;
}

/* Gradient button style */
.gradient-btn {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
  transition: all 0.3s ease;
}

.gradient-btn:active {
  transform: scale(0.98);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
}

.gradient-btn[disabled] {
  background: linear-gradient(135deg, #9ca3af 0%, #6b7280 100%);
  opacity: 0.7;
  cursor: not-allowed;
}

/* Divider */
.divider-section {
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 25px 0;
}

.divider-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(226, 232, 240, 0.8), transparent);
}

.divider-text {
  color: #64748b;
  font-size: 13px;
  white-space: nowrap;
}

/* Social login */
.social-login {
  margin-bottom: 20px;
}

.social-btn {
  width: 100%;
  height: 45px;
  border-radius: 12px;
  background: #07c160;
  color: white;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  margin-bottom: 10px;
}

/* Footer links */
.auth-footer {
  text-align: center;
  padding-top: 15px;
  border-top: 1px solid rgba(226, 232, 240, 0.8);
}

.footer-text {
  color: #64748b;
  font-size: 14px;
}

.auth-link {
  color: #3b82f6;
  font-weight: 600;
  margin-left: 5px;
}

/* Animations */
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>

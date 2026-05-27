<!-- Login.vue — 全屏滚动交互官网风格 -->
<template>
  <div class="login-page" :class="{ dark: isDarkMode }">
    <!-- 固定背景 -->
    <div class="fixed-bg">
      <img src="/images/banner/sy.png" alt="" class="bg-img" />
      <div class="bg-overlay"></div>
    </div>

    <!-- 导航栏 -->
    <nav class="top-nav" :class="{ scrolled: scrollY > 50 }">
      <div class="nav-inner">
        <div class="nav-logo">
          <img src="/sling-logo.svg" alt="SLING" class="nav-logo-img" />
          <span class="nav-brand">SLING <span class="nav-cn">蛇灵</span></span>
        </div>
        <div class="nav-links">
          <a href="#hero" class="nav-link" :class="{ active: currentSection === 0 }">首页</a>
          <a href="#features" class="nav-link" :class="{ active: currentSection === 1 }">功能</a>
          <a href="#data" class="nav-link" :class="{ active: currentSection === 2 }">数据</a>
          <a href="#login" class="nav-link nav-login-btn" :class="{ active: currentSection === 3 }">登录</a>
        </div>
      </div>
    </nav>

    <!-- 滚动提示 -->
    <div class="scroll-indicator" v-show="scrollY < 100">
      <div class="scroll-mouse">
        <div class="scroll-wheel"></div>
      </div>
      <span>向下滚动探索</span>
    </div>

    <!-- 第一屏：Hero -->
    <section id="hero" class="section section-hero">
      <div class="hero-content" :class="{ visible: sectionVisible[0] }">
        <div class="hero-badge">
          <i class="el-icon-camera"></i>
          <span>AI 驱动 · 智能守护</span>
        </div>
        <h1 class="hero-title">
          <span class="title-line">青山蓝水</span>
          <span class="title-line title-accent">安全随行</span>
        </h1>
        <p class="hero-desc">
          智能蛇类识别 · 实时区域预警 · 标准化急救指导 · 精准寻医导航
        </p>
        <div class="hero-actions">
          <a href="#login" class="hero-btn hero-btn-primary">
            <span>开始使用</span>
            <i class="el-icon-arrow-right"></i>
          </a>
          <a href="#features" class="hero-btn hero-btn-ghost">
            <span>了解更多</span>
          </a>
        </div>
      </div>
    </section>

    <!-- 第二屏：功能介绍 -->
    <section id="features" class="section section-features">
      <div class="features-content" :class="{ visible: sectionVisible[1] }">
        <div class="section-badge">核心功能</div>
        <h2 class="section-title">四大核心能力</h2>
        <div class="features-grid">
          <div class="feature-card glass-card" v-for="(f, i) in features" :key="i" :style="{ '--delay': i * 0.1 + 's' }">
            <div class="feature-icon" :style="{ background: f.bg }">
              <i :class="f.icon"></i>
            </div>
            <h3>{{ f.title }}</h3>
            <p>{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 第三屏：数据展示 -->
    <section id="data" class="section section-data">
      <div class="data-content" :class="{ visible: sectionVisible[2] }">
        <div class="section-badge">数据支撑</div>
        <h2 class="section-title">实时数据监控</h2>
        <div class="stats-row">
          <div class="stat-card glass-card" v-for="(s, i) in stats" :key="i" :style="{ '--delay': i * 0.15 + 's' }">
            <div class="stat-value">{{ s.value }}</div>
            <div class="stat-label">{{ s.label }}</div>
            <div class="stat-bar">
              <div class="stat-bar-fill" :style="{ width: s.percent + '%' }"></div>
            </div>
          </div>
        </div>
        <div class="data-features">
          <div class="data-feat" v-for="(d, i) in dataFeatures" :key="i">
            <i class="el-icon-check"></i>
            <span>{{ d }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 第四屏：登录 -->
    <section id="login" class="section section-login">
      <div class="login-content" :class="{ visible: sectionVisible[3] }">
        <div class="login-card glass-card-strong">
          <!-- 登录头部 -->
          <div class="form-head">
            <div class="head-icon" :style="{ background: roleIconBg }">
              <i :class="roleIcon"></i>
            </div>
            <div>
              <h2>欢迎回来</h2>
              <p>{{ roleSubtitle }}</p>
            </div>
          </div>

          <!-- 角色选择 -->
          <div class="role-tabs">
            <button
              v-for="r in roles" :key="r.key"
              class="role-tab"
              :class="{ active: selectedRole === r.key }"
              @click="selectedRole = r.key"
            >
              <i :class="r.icon"></i>
              <span>{{ r.label }}</span>
            </button>
          </div>

          <!-- 登录表单 -->
          <el-form :model="loginForm" :rules="rules" ref="loginFormRef" class="login-form">
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                placeholder="用户名 / 邮箱 / 手机号"
                size="large"
                :prefix-icon="User"
                @keyup.enter="handleLogin"
              />
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="密码"
                size="large"
                :prefix-icon="Lock"
                show-password
                @keyup.enter="handleLogin"
              />
            </el-form-item>

            <div class="form-row">
              <el-checkbox v-model="rememberMe" label="记住我" />
              <router-link to="/forgot-password" class="forgot-link">忘记密码？</router-link>
            </div>

            <el-button
              type="primary"
              size="large"
              class="login-btn"
              :loading="loading"
              @click="handleLogin"
              round
            >
              <template v-if="!loading">登 录</template>
              <template v-else>登录中...</template>
            </el-button>
          </el-form>

          <div class="divider"><span>快速登录</span></div>

          <div class="social-row">
            <el-button class="social-btn wechat-btn" round @click="handleWechatLogin">
              <i class="el-icon-chat-line-round"></i>微信登录
            </el-button>
            <el-button class="social-btn phone-btn" round @click="handlePhoneLogin">
              <i class="el-icon-phone"></i>手机验证
            </el-button>
          </div>

          <div class="form-foot">
            <p>还没有账户？<router-link to="/register">立即注册</router-link></p>
          </div>
        </div>
      </div>
    </section>

    <!-- 暗黑切换 -->
    <button class="theme-btn" @click="toggleTheme">
      <el-icon :size="18"><Moon v-if="!isDarkMode" /><Sunny v-else /></el-icon>
    </button>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import api, { adminApi } from '../services/api'
import { useUserStore } from '../store/user'

const router = useRouter()
const userStore = useUserStore()
const loginFormRef = ref(null)

const loading = ref(false)
const rememberMe = ref(false)
const isDarkMode = ref(false)
const selectedRole = ref('USER')
const scrollY = ref(0)
const currentSection = ref(0)
const sectionVisible = reactive([false, false, false, false])

const loginForm = ref({
  username: '',
  password: ''
})

const features = [
  {
    icon: 'el-icon-camera',
    title: '智能识别',
    desc: '基于深度学习的 AI 模型，支持 300+ 种蛇类精准识别，拍照即可获得结果',
    bg: 'linear-gradient(135deg, #10B981, #059669)'
  },
  {
    icon: 'el-icon-location',
    title: '实时预警',
    desc: '地理位置活动监测，根据用户位置实时推送蛇类活动预警信息',
    bg: 'linear-gradient(135deg, #3B82F6, #2563EB)'
  },
  {
    icon: 'el-icon-first-aid-kit',
    title: '应急指导',
    desc: '标准化急救流程指引，被蛇咬伤后提供专业、及时的急救指导',
    bg: 'linear-gradient(135deg, #EF4444, #DC2626)'
  },
  {
    icon: 'el-icon-map-location',
    title: '精准寻医',
    desc: '导航至最近的抗蛇毒血清医院，提供最优路线规划',
    bg: 'linear-gradient(135deg, #8B5CF6, #7C3AED)'
  }
]

const stats = [
  { value: '300+', label: '收录蛇种', percent: 85 },
  { value: '98.5%', label: '识别准确率', percent: 98 },
  { value: '24/7', label: '全天候服务', percent: 100 },
  { value: '50万+', label: '用户信赖', percent: 75 },
]

const dataFeatures = [
  '实时更新蛇类分布数据',
  '基于位置的智能预警',
  '专家审核的急救指南',
  '医院血清库存实时查询'
]

const roles = [
  { key: 'USER', label: '普通用户', icon: 'el-icon-user' },
  { key: 'RESCUER', label: '救助人员', icon: 'el-icon-s-help' },
  { key: 'ADMIN', label: '管理员', icon: 'el-icon-setting' },
]

const roleIcon = computed(() => {
  const icons = { USER: 'el-icon-user', RESCUER: 'el-icon-s-help', ADMIN: 'el-icon-setting' }
  return icons[selectedRole.value] || 'el-icon-user'
})
const roleIconBg = computed(() => {
  const bgs = {
    USER: 'linear-gradient(135deg, #10B981, #059669)',
    RESCUER: 'linear-gradient(135deg, #F59E0B, #D97706)',
    ADMIN: 'linear-gradient(135deg, #6B7280, #4B5563)'
  }
  return bgs[selectedRole.value] || bgs.USER
})
const roleSubtitle = computed(() => {
  const subs = {
    USER: '普通用户登录，使用识别与应急服务',
    RESCUER: '救助人员登录，处理紧急求助调度',
    ADMIN: '管理员登录，管理系统与数据'
  }
  return subs[selectedRole.value] || '请登录您的账户继续使用'
})

const rules = {
  username: [{ required: true, message: '请输入用户名、邮箱或手机号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

// 滚动处理 — 仅用于导航栏和滚动提示
const handleScroll = () => {
  scrollY.value = window.scrollY
  const vh = window.innerHeight
  const sections = document.querySelectorAll('.section')
  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect()
    if (rect.top <= vh * 0.5 && rect.bottom >= vh * 0.5) {
      currentSection.value = index
    }
  })
}

// 登录处理
const handleLogin = async () => {
  if (!loginFormRef.value) return
  try {
    await loginFormRef.value.validate(async (valid) => {
      if (valid) {
        loading.value = true
        try {
          const loginData = {
            username: loginForm.value.username,
            password: loginForm.value.password,
            role: selectedRole.value
          }
          if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginForm.value.username)) {
            loginData.email = loginForm.value.username
          } else if (/^1[3-9]\d{9}$/.test(loginForm.value.username)) {
            loginData.phone = loginForm.value.username
          }

          let response
          let loginSuccess = false
          if (selectedRole.value === 'ADMIN') {
            response = await adminApi.login({ username: loginForm.value.username, password: loginForm.value.password })
            loginSuccess = response.data.success === true
          } else {
            response = await api.user.login(loginData)
            loginSuccess = response.data.code === 200
          }

          if (loginSuccess) {
            let token, user, roles
            if (selectedRole.value === 'ADMIN') {
              token = response.data.token
              user = response.data.user
              roles = [{ roleCode: 'SUPER_ADMIN', roleName: '超级管理员' }]
            } else {
              user = response.data.data?.user
              token = response.data.data?.token
              roles = response.data.data?.roles || []
            }

            ElMessage.success({ message: '登录成功', duration: 1500, showClose: true })
            userStore.setUserInfo(user)
            userStore.setUserRoles(roles)

            if (rememberMe.value) {
              localStorage.setItem('rememberMe', 'true')
              localStorage.setItem('username', loginForm.value.username)
            } else {
              localStorage.removeItem('rememberMe')
              localStorage.removeItem('username')
            }
            if (token) localStorage.setItem('token', token)

            await new Promise(resolve => setTimeout(resolve, 100))

            if (selectedRole.value === 'ADMIN') router.push('/admin')
            else if (selectedRole.value === 'RESCUER') router.push('/rescue')
            else router.push('/dashboard')
          } else {
            const msg = selectedRole.value === 'ADMIN'
              ? (response.data.message || '登录失败')
              : (response.data.message || '用户名或密码错误')
            ElMessage.error({ message: msg, duration: 3000, showClose: true })
          }
        } catch (error) {
          console.error('登录错误:', error)
          let msg = '登录失败'
          if (error.response) {
            const map = { 401: '用户名或密码错误', 403: '账户已被禁用', 404: '用户不存在', 500: '服务器错误' }
            msg = map[error.response.status] || error.response.data?.message || msg
          } else if (error.request) {
            msg = '网络错误，请检查网络连接'
          }
          ElMessage.error({ message: msg, duration: 3000, showClose: true })
        } finally {
          loading.value = false
        }
      }
    })
  } catch (error) {
    console.error('表单验证错误:', error)
    ElMessage.error('表单验证失败')
  }
}

const handleWechatLogin = () => ElMessage.info('微信登录功能开发中')
const handlePhoneLogin = () => ElMessage.info('手机验证登录功能开发中')
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark', isDarkMode.value)
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
}

let observer = null

onMounted(() => {
  const saved = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  if (saved === 'dark' || (!saved && prefersDark)) {
    isDarkMode.value = true
    document.documentElement.classList.add('dark')
  }
  if (localStorage.getItem('rememberMe') === 'true') {
    rememberMe.value = true
    const u = localStorage.getItem('username')
    if (u) loginForm.value.username = u
  }
  window.addEventListener('scroll', handleScroll, { passive: true })

  // IntersectionObserver 检测 section 进入视口
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Number(entry.target.dataset.sectionIndex)
        if (!isNaN(idx)) sectionVisible[idx] = true
      }
    })
  }, { threshold: 0.15 })

  document.querySelectorAll('.section').forEach((el, i) => {
    el.dataset.sectionIndex = i
    observer.observe(el)
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  observer?.disconnect()
})
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  font-family: var(--font-sans);
  overflow-x: hidden;
}

/* 固定背景 */
.fixed-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
}
.bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.bg-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0,0,0,0.3) 0%,
    rgba(0,0,0,0.1) 30%,
    rgba(0,0,0,0.2) 70%,
    rgba(0,0,0,0.6) 100%
  );
}
.dark .bg-overlay {
  background: linear-gradient(
    180deg,
    rgba(0,0,0,0.5) 0%,
    rgba(0,0,0,0.4) 30%,
    rgba(0,0,0,0.5) 70%,
    rgba(0,0,0,0.8) 100%
  );
}

/* 导航栏 */
.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 20px 0;
  transition: all 0.3s ease;
}
.top-nav.scrolled {
  padding: 12px 0;
  background: rgba(0,0,0,0.3);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-logo {
  display: flex;
  align-items: center;
  gap: 10px;
}
.nav-logo-img {
  width: 36px;
  height: 36px;
}
.nav-brand {
  font-size: 22px;
  font-weight: 700;
  color: white;
  letter-spacing: -0.5px;
}
.nav-cn {
  font-weight: 300;
  opacity: 0.8;
  margin-left: 4px;
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 8px;
}
.nav-link {
  padding: 8px 16px;
  color: rgba(255,255,255,0.8);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s ease;
}
.nav-link:hover,
.nav-link.active {
  color: white;
  background: rgba(255,255,255,0.1);
}
.nav-login-btn {
  background: rgba(16,185,129,0.9) !important;
  color: white !important;
}
.nav-login-btn:hover {
  background: rgba(16,185,129,1) !important;
  transform: translateY(-1px);
}

/* 滚动提示 */
.scroll-indicator {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: rgba(255,255,255,0.7);
  font-size: 13px;
  animation: bounce 2s infinite;
}
.scroll-mouse {
  width: 26px;
  height: 40px;
  border: 2px solid rgba(255,255,255,0.5);
  border-radius: 13px;
  display: flex;
  justify-content: center;
  padding-top: 8px;
}
.scroll-wheel {
  width: 4px;
  height: 8px;
  background: white;
  border-radius: 2px;
  animation: scroll-wheel 1.5s infinite;
}
@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-10px); }
}
@keyframes scroll-wheel {
  0% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(8px); }
}

/* 通用 Section */
.section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  padding: 100px 40px;
}

/* Hero Section */
.section-hero {
  padding-top: 120px;
}
.hero-content {
  text-align: center;
  color: white;
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.hero-content.visible {
  opacity: 1;
  transform: translateY(0);
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  border-radius: 50px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 32px;
  border: 1px solid rgba(255,255,255,0.2);
}
.hero-title {
  font-size: 72px;
  font-weight: 800;
  line-height: 1.1;
  margin: 0 0 24px;
  letter-spacing: -2px;
}
.title-line {
  display: block;
}
.title-accent {
  background: linear-gradient(135deg, #34D399, #60E5CA);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-desc {
  font-size: 20px;
  opacity: 0.85;
  margin: 0 0 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}
.hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
}
.hero-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}
.hero-btn-primary {
  background: linear-gradient(135deg, #10B981, #059669);
  color: white;
  box-shadow: 0 8px 30px rgba(16,185,129,0.4);
}
.hero-btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(16,185,129,0.5);
}
.hero-btn-ghost {
  background: rgba(255,255,255,0.1);
  color: white;
  border: 1px solid rgba(255,255,255,0.3);
  backdrop-filter: blur(10px);
}
.hero-btn-ghost:hover {
  background: rgba(255,255,255,0.2);
  transform: translateY(-2px);
}

/* Section Badge & Title */
.section-badge {
  display: inline-block;
  padding: 6px 16px;
  background: rgba(16,185,129,0.2);
  color: #34D399;
  border-radius: 50px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 16px;
}
.section-title {
  font-size: 48px;
  font-weight: 700;
  color: white;
  margin: 0 0 48px;
  letter-spacing: -1px;
}

/* 毛玻璃卡片 */
.glass-card {
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.15);
  padding: 32px;
}
.glass-card-strong {
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(30px);
  border-radius: 24px;
  border: 1px solid rgba(255,255,255,0.2);
}

/* Features Section */
.section-features {
  padding-top: 60px;
}
.features-content {
  text-align: center;
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.features-content.visible {
  opacity: 1;
  transform: translateY(0);
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
}
.feature-card {
  text-align: left;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(30px);
}
.features-content.visible .feature-card {
  opacity: 1;
  transform: translateY(0);
  transition-delay: var(--delay);
}
.feature-card:hover {
  transform: translateY(-8px);
  background: rgba(255,255,255,0.15);
  border-color: rgba(255,255,255,0.3);
}
.feature-icon {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  margin-bottom: 20px;
}
.feature-card h3 {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 600;
  color: white;
}
.feature-card p {
  margin: 0;
  font-size: 14px;
  color: rgba(255,255,255,0.7);
  line-height: 1.6;
}

/* Data Section */
.section-data {
  padding-bottom: 60px;
}
.data-content {
  text-align: center;
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.data-content.visible {
  opacity: 1;
  transform: translateY(0);
}
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  max-width: 1000px;
  margin: 0 auto 48px;
}
.stat-card {
  text-align: center;
  opacity: 0;
  transform: translateY(30px);
}
.data-content.visible .stat-card {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--delay);
}
.stat-card:hover {
  transform: translateY(-5px);
  background: rgba(255,255,255,0.15);
}
.stat-value {
  font-size: 42px;
  font-weight: 800;
  color: #34D399;
  margin-bottom: 8px;
}
.stat-label {
  font-size: 14px;
  color: rgba(255,255,255,0.7);
  margin-bottom: 16px;
}
.stat-bar {
  height: 4px;
  background: rgba(255,255,255,0.1);
  border-radius: 2px;
  overflow: hidden;
}
.stat-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #10B981, #34D399);
  border-radius: 2px;
  transition: width 1s ease 0.5s;
}
.data-features {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  max-width: 800px;
  margin: 0 auto;
}
.data-feat {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255,255,255,0.8);
  font-size: 15px;
}
.data-feat i {
  color: #34D399;
  font-size: 18px;
}

/* Login Section */
.section-login {
  padding-top: 80px;
  padding-bottom: 80px;
}
.login-content {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.login-content.visible {
  opacity: 1;
  transform: translateY(0);
}
.login-card {
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
  padding: 40px 36px;
}

/* 表单头部 */
.form-head {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255,255,255,0.15);
}
.head-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 22px;
  flex-shrink: 0;
}
.form-head h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: white;
}
.form-head p {
  margin: 4px 0 0;
  font-size: 14px;
  color: rgba(255,255,255,0.6);
}

/* 角色标签 */
.role-tabs {
  display: flex;
  gap: 6px;
  margin-bottom: 24px;
  padding: 4px;
  background: rgba(255,255,255,0.08);
  border-radius: 12px;
}
.role-tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 6px;
  border-radius: 10px;
  border: none;
  background: transparent;
  color: rgba(255,255,255,0.6);
  font-size: 13px;
  font-family: var(--font-sans);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}
.role-tab:hover {
  color: white;
  background: rgba(255,255,255,0.1);
}
.role-tab.active {
  color: white;
  font-weight: 600;
}
.role-tab:nth-child(1).active {
  background: linear-gradient(135deg, #10B981, #059669);
}
.role-tab:nth-child(2).active {
  background: linear-gradient(135deg, #F59E0B, #D97706);
}
.role-tab:nth-child(3).active {
  background: linear-gradient(135deg, #6B7280, #4B5563);
}

/* 表单 */
.login-form {
  margin-top: 24px;
}
.login-form :deep(.el-form-item) {
  margin-bottom: 20px;
}
.login-form :deep(.el-input__wrapper) {
  height: 48px;
  border-radius: 10px;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  box-shadow: none !important;
  padding-left: 12px;
}
.login-form :deep(.el-input__wrapper:hover) {
  border-color: rgba(52,211,153,0.5);
}
.login-form :deep(.el-input__wrapper.is-focus) {
  border-color: #10B981;
  box-shadow: 0 0 0 3px rgba(16,185,129,0.2) !important;
}
.login-form :deep(.el-input__inner) {
  color: white;
  font-size: 15px;
}
.login-form :deep(.el-input__inner::placeholder) {
  color: rgba(255,255,255,0.5);
}
.login-form :deep(.el-input__prefix .el-icon) {
  color: rgba(255,255,255,0.5);
}

.form-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
}
.form-row :deep(.el-checkbox__label) {
  font-size: 14px;
  color: rgba(255,255,255,0.7);
}
.form-row :deep(.el-checkbox__inner) {
  background: rgba(255,255,255,0.1);
  border-color: rgba(255,255,255,0.3);
}
.form-row :deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: #10B981;
  border-color: #10B981;
}
.forgot-link {
  font-size: 14px;
  color: #34D399;
  text-decoration: none;
  font-weight: 500;
}
.forgot-link:hover {
  color: #6EE7B7;
  text-decoration: underline;
}

.login-btn {
  width: 100%;
  height: 48px;
  font-size: 16px;
  font-weight: 600;
  background: linear-gradient(135deg, #10B981, #059669);
  border: none;
  border-radius: 50px;
  box-shadow: 0 8px 30px rgba(16,185,129,0.4);
  letter-spacing: 4px;
}
.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(16,185,129,0.5);
}

.divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 28px 0;
}
.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(255,255,255,0.15);
}
.divider span {
  font-size: 13px;
  color: rgba(255,255,255,0.5);
  white-space: nowrap;
}

.social-row {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}
.social-btn {
  flex: 1;
  height: 44px;
  border: 1px solid rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.05);
  color: white;
  font-weight: 500;
}
.social-btn:hover {
  background: rgba(255,255,255,0.1);
  border-color: rgba(255,255,255,0.3);
  transform: translateY(-1px);
}
.wechat-btn:hover {
  border-color: #07C160;
  color: #07C160;
}
.phone-btn:hover {
  border-color: #3B82F6;
  color: #3B82F6;
}

.form-foot {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid rgba(255,255,255,0.1);
}
.form-foot p {
  font-size: 14px;
  color: rgba(255,255,255,0.6);
  margin: 0;
}
.form-foot a {
  color: #34D399;
  font-weight: 600;
  text-decoration: none;
}
.form-foot a:hover {
  color: #6EE7B7;
  text-decoration: underline;
}

/* 主题按钮 */
.theme-btn {
  position: fixed;
  top: 28px;
  right: 28px;
  z-index: 1100;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.25);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}
.theme-btn:hover {
  background: rgba(255,255,255,0.25);
  transform: scale(1.08);
}

/* 响应式 */
@media (max-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .stats-row {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 768px) {
  .section {
    padding: 80px 20px;
  }
  .hero-title {
    font-size: 48px;
  }
  .hero-desc {
    font-size: 16px;
  }
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  .section-title {
    font-size: 36px;
  }
  .features-grid {
    grid-template-columns: 1fr;
  }
  .stats-row {
    grid-template-columns: repeat(2, 1fr);
  }
  .nav-links {
    display: none;
  }
  .login-card {
    padding: 32px 24px;
  }
  .stat-value {
    font-size: 32px;
  }
}
</style>

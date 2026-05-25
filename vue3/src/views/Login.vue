<!-- Login.vue — 杉林溪水重设计 -->
<template>
  <div class="login-page" :class="{ dark: isDarkMode }">
    <div class="login-bg">
      <div class="bg-shape bg-shape-1"></div>
      <div class="bg-shape bg-shape-2"></div>
      <div class="bg-shape bg-shape-3"></div>
    </div>

    <div class="login-shell">
      <!-- 左侧品牌 -->
      <div class="login-brand">
        <div class="brand-inner">
          <div class="brand-logo">
            <span class="logo-icon">🐍</span>
            <div>
              <h1>SLING <span class="logo-cn">蛇灵</span></h1>
            </div>
          </div>
          <h2 class="brand-tagline">青山蓝水，安全随行</h2>
          <p class="brand-desc">AI 智能识别 · 实时区域预警 · 标准化急救指导 · 精准寻医导航</p>

          <div class="brand-cards">
            <div class="b-card">
              <div class="b-card-icon" style="background: var(--brand-gradient)">
                <el-icon :size="22"><Camera /></el-icon>
              </div>
              <div>
                <h4>智能识别</h4>
                <p>300+ 种蛇类精准识别</p>
              </div>
            </div>
            <div class="b-card">
              <div class="b-card-icon" style="background: var(--blue-700)">
                <el-icon :size="22"><MapLocation /></el-icon>
              </div>
              <div>
                <h4>实时预警</h4>
                <p>地理位置活动监测</p>
              </div>
            </div>
            <div class="b-card">
              <div class="b-card-icon" style="background: var(--danger)">
                <el-icon :size="22"><FirstAidKit /></el-icon>
              </div>
              <div>
                <h4>应急指导</h4>
                <p>标准化急救流程</p>
              </div>
            </div>
          </div>

          <div class="brand-stats">
            <div class="stat" v-for="s in stats" :key="s.label">
              <span class="stat-val">{{ s.value }}</span>
              <span class="stat-lbl">{{ s.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧表单 -->
      <div class="login-form-side">
        <div class="form-card">
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
    </div>

    <!-- 暗黑切换 -->
    <button class="theme-btn" @click="toggleTheme">
      <el-icon :size="18"><Moon v-if="!isDarkMode" /><Sunny v-else /></el-icon>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
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

const loginForm = ref({
  username: '',
  password: ''
})

const stats = [
  { value: '98%', label: '识别准确率' },
  { value: '24/7', label: '全天候服务' },
  { value: '204', label: '收录蛇种' },
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
    USER: 'var(--brand-gradient)',
    RESCUER: 'linear-gradient(135deg, #F59E0B, #D97706)',
    ADMIN: 'linear-gradient(135deg, var(--green-900), var(--green-600))'
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

const handleKeyPress = (event) => {
  if (event.key === 'Enter' && loginForm.value.username && loginForm.value.password) handleLogin()
}

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
  window.addEventListener('keypress', handleKeyPress)
})

onUnmounted(() => {
  window.removeEventListener('keypress', handleKeyPress)
})
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(160deg, var(--green-900) 0%, #047857 30%, var(--blue-700) 70%, var(--blue-900) 100%);
  position: relative;
  overflow: hidden;
  font-family: var(--font-sans);
}
.login-page.dark {
  background: linear-gradient(160deg, #051410 0%, #0A1F17 40%, #0C2A22 100%);
}

/* 背景装饰 */
.login-bg { position: absolute; inset: 0; pointer-events: none; }
.bg-shape {
  position: absolute; border-radius: 50%;
  background: radial-gradient(circle, rgba(52,211,153,0.12) 0%, transparent 70%);
  animation: float 20s infinite linear;
}
.bg-shape-1 { width: 500px; height: 500px; top: -150px; left: -200px; }
.bg-shape-2 { width: 400px; height: 400px; bottom: -100px; right: -150px; animation-delay: 5s; animation-direction: reverse; }
.bg-shape-3 { width: 300px; height: 300px; top: 40%; left: 50%; animation-delay: 10s; }

@keyframes float {
  0%, 100% { transform: translate(0,0) scale(1); }
  50% { transform: translate(30px,-30px) scale(1.1); }
}

/* 主体布局 */
.login-shell {
  display: grid;
  grid-template-columns: 1fr 480px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
  gap: 60px;
  z-index: 1;
  position: relative;
}

/* 左侧品牌 */
.login-brand {
  display: flex; align-items: center;
  color: white;
  animation: fadeInLeft 0.8s ease-out;
}
@keyframes fadeInLeft { from { opacity:0; transform:translateX(-30px); } to { opacity:1; transform:translateX(0); } }

.brand-logo { display:flex; align-items:center; gap:12px; margin-bottom:24px; }
.logo-icon { font-size:44px; }
.brand-logo h1 { font-size:36px; font-weight:700; margin:0; letter-spacing:-0.5px; }
.logo-cn { font-weight:300; opacity:0.9; margin-left:4px; }

.brand-tagline { font-size:24px; font-weight:600; margin:0 0 12px; }
.brand-desc { font-size:15px; opacity:0.85; margin:0 0 36px; line-height:1.6; }

.brand-cards { display:flex; flex-direction:column; gap:14px; margin-bottom:36px; }
.b-card {
  display:flex; align-items:center; gap:14px;
  padding:16px 20px;
  background:rgba(255,255,255,0.1); backdrop-filter:blur(8px);
  border-radius:14px; border:1px solid rgba(255,255,255,0.15);
  transition:all var(--transition-fast);
  cursor:default;
}
.b-card:hover { background:rgba(255,255,255,0.16); transform:translateX(6px); }
.b-card-icon {
  width:48px; height:48px; border-radius:12px;
  display:flex; align-items:center; justify-content:center;
  color:white; flex-shrink:0;
  box-shadow:0 4px 12px rgba(0,0,0,0.2);
}
.b-card h4 { margin:0 0 2px; font-size:16px; font-weight:600; color:white; }
.b-card p { margin:0; font-size:13px; opacity:0.8; }

.brand-stats { display:flex; gap:16px; }
.brand-stats .stat {
  flex:1; text-align:center; padding:14px 8px;
  background:rgba(255,255,255,0.08); border-radius:12px;
  border:1px solid rgba(255,255,255,0.1);
}
.stat-val { display:block; font-size:22px; font-weight:700; color:var(--green-400); }
.stat-lbl { display:block; font-size:11px; opacity:0.7; margin-top:4px; text-transform:uppercase; letter-spacing:1px; }

/* 右侧表单 */
.login-form-side { animation: fadeInRight 0.8s ease-out 0.15s both; }
@keyframes fadeInRight { from { opacity:0; transform:translateX(30px); } to { opacity:1; transform:translateX(0); } }

.form-card {
  background:var(--surface-white);
  border-radius:20px; padding:44px 36px;
  box-shadow:var(--shadow-xl);
  border:1px solid var(--green-100);
}
.dark .form-card { background:var(--dark-surface); border-color:var(--dark-border); box-shadow:0 20px 50px rgba(0,0,0,0.3); }

.form-head { display:flex; align-items:center; gap:16px; margin-bottom:28px; padding-bottom:20px; border-bottom:2px solid var(--green-100); }
.head-icon {
  width:56px; height:56px; border-radius:14px;
  display:flex; align-items:center; justify-content:center;
  color:white; font-size:24px; flex-shrink:0;
}
.form-head h2 { margin:0; font-size:26px; font-weight:700; color:var(--ink-900); }
.form-head p { margin:4px 0 0; font-size:14px; color:var(--ink-500); }
.dark .form-head h2 { color:var(--dark-ink); }
.dark .form-head p { color:var(--dark-ink-mute); }

/* 角色标签 */
.role-tabs {
  display:flex; gap:6px; margin-bottom:24px;
  padding:4px; background:var(--green-50); border-radius:12px;
}
.dark .role-tabs { background:var(--dark-bg); }
.role-tab {
  flex:1; display:flex; align-items:center; justify-content:center; gap:6px;
  padding:10px 6px; border-radius:10px; border:none;
  background:transparent; color:var(--ink-500);
  font-size:13px; font-family:var(--font-sans); font-weight:500; cursor:pointer;
  transition:all var(--transition-fast);
}
.role-tab:hover { color:var(--ink-700); }
.role-tab.active { color:white; font-weight:600; box-shadow:var(--shadow-sm); }
.role-tab:nth-child(1).active { background:var(--brand-gradient); }
.role-tab:nth-child(2).active { background:linear-gradient(135deg,#F59E0B,#D97706); }
.role-tab:nth-child(3).active { background:linear-gradient(135deg,var(--green-900),var(--green-600)); }

/* 表单 */
.login-form { margin-top:24px; }
.login-form :deep(.el-form-item) { margin-bottom:20px; }
.login-form :deep(.el-input__wrapper) {
  height:48px; border-radius:10px;
  background:var(--surface-white); border:1px solid var(--ink-200);
  box-shadow:none !important; padding-left:12px;
}
.dark .login-form :deep(.el-input__wrapper) {
  background:var(--dark-bg); border-color:var(--dark-border);
}
.login-form :deep(.el-input__wrapper:hover) { border-color:var(--green-400); }
.login-form :deep(.el-input__wrapper.is-focus) {
  border-color:var(--green-600);
  box-shadow:0 0 0 3px rgba(5,150,105,0.1) !important;
}
.login-form :deep(.el-input__inner) { color:var(--ink-900); font-size:15px; }
.dark .login-form :deep(.el-input__inner) { color:var(--dark-ink); }

.form-row { display:flex; justify-content:space-between; align-items:center; margin-bottom:28px; }
.form-row :deep(.el-checkbox__label) { font-size:14px; color:var(--ink-500); }
.form-row :deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color:var(--green-600); border-color:var(--green-600);
}
.forgot-link { font-size:14px; color:var(--blue-700); text-decoration:none; font-weight:500; }
.forgot-link:hover { color:var(--blue-900); }

.login-btn {
  width:100%; height:48px; font-size:16px; font-weight:600;
  background:var(--brand-gradient); border:none;
  border-radius:var(--radius-full);
  box-shadow:var(--shadow-brand);
  letter-spacing:4px;
}
.login-btn:hover { box-shadow:var(--shadow-brand-hover); transform:translateY(-1px); }

.divider { display:flex; align-items:center; gap:12px; margin:28px 0; }
.divider::before, .divider::after { content:''; flex:1; height:1px; background:var(--ink-100); }
.divider span { font-size:13px; color:var(--ink-400); white-space:nowrap; }

.social-row { display:flex; gap:12px; margin-bottom:24px; }
.social-btn { flex:1; height:44px; border:1.5px solid var(--ink-100); background:transparent; font-weight:500; }
.social-btn:hover { transform:translateY(-1px); }
.wechat-btn { color:#07C160; border-color:rgba(7,193,96,0.3); }
.wechat-btn:hover { background:rgba(7,193,96,0.06); border-color:#07C160; }
.phone-btn { color:var(--blue-700); border-color:rgba(8,145,178,0.3); }
.phone-btn:hover { background:rgba(8,145,178,0.06); border-color:var(--blue-700); }

.form-foot { text-align:center; padding-top:20px; border-top:1px solid var(--ink-100); }
.dark .form-foot { border-color:var(--dark-border); }
.form-foot p { font-size:14px; color:var(--ink-500); margin:0; }
.form-foot a { color:var(--green-600); font-weight:600; text-decoration:none; }
.form-foot a:hover { color:var(--green-700); }

/* 主题按钮 */
.theme-btn {
  position:fixed; top:28px; right:28px; z-index:100;
  width:44px; height:44px; border-radius:50%;
  background:rgba(255,255,255,0.15); backdrop-filter:blur(8px);
  border:1.5px solid rgba(255,255,255,0.25);
  color:white; cursor:pointer;
  display:flex; align-items:center; justify-content:center;
  transition:all var(--transition-fast);
}
.theme-btn:hover { background:rgba(255,255,255,0.25); transform:scale(1.08); }

@media (max-width: 900px) {
  .login-shell { grid-template-columns:1fr; padding:20px; gap:30px; max-width:480px; }
  .login-brand { display:none; }
  .form-card { padding:32px 24px; }
}
@media (min-width: 1400px) {
  .login-shell { max-width:1300px; }
}
</style>

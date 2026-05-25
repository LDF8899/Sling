<!-- Register.vue — 杉林溪水重设计 -->
<template>
  <div class="register-page" :class="{ dark: isDarkMode }">
    <div class="reg-bg">
      <div class="bg-shape bg-shape-1"></div>
      <div class="bg-shape bg-shape-2"></div>
    </div>

    <div class="reg-shell">
      <!-- 左侧品牌 -->
      <div class="reg-brand">
        <div class="brand-inner">
          <div class="brand-logo">
            <span class="logo-icon">🐍</span>
            <div>
              <h1>SLING <span class="logo-cn">蛇灵</span></h1>
            </div>
          </div>
          <h2 class="brand-tagline">加入安全社区</h2>
          <p class="brand-desc">注册即可享受智能蛇类识别、实时预警等多项服务</p>

          <div class="benefit-list">
            <div class="benefit" v-for="b in benefits" :key="b">
              <el-icon :size="18" color="#34D399"><CircleCheck /></el-icon>
              <span>{{ b }}</span>
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
      <div class="reg-form-side">
        <div class="form-card">
          <div class="form-head">
            <div class="head-icon">
              <el-icon :size="24"><Edit /></el-icon>
            </div>
            <div>
              <h2>创建账户</h2>
              <p>请填写您的注册信息</p>
            </div>
          </div>

          <el-form :model="registerForm" :rules="rules" ref="registerFormRef" class="reg-form">
            <el-form-item prop="username">
              <el-input
                v-model="registerForm.username"
                placeholder="用户名（2-20个字符）"
                size="large"
                :prefix-icon="User"
              />
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                v-model="registerForm.password"
                type="password"
                placeholder="密码"
                size="large"
                :prefix-icon="Lock"
                show-password
              />
              <div class="strength-bar-row" v-if="registerForm.password">
                <span class="strength-label">密码强度：{{ getPasswordStrengthText(registerForm.password) }}</span>
                <div class="strength-dots">
                  <span v-for="i in 5" :key="i" class="dot" :class="{ active: getPasswordStrength(registerForm.password) >= i }"></span>
                </div>
              </div>
            </el-form-item>

            <el-form-item prop="confirmPassword">
              <el-input
                v-model="registerForm.confirmPassword"
                type="password"
                placeholder="确认密码"
                size="large"
                :prefix-icon="Lock"
                show-password
              />
            </el-form-item>

            <el-form-item prop="email">
              <el-input
                v-model="registerForm.email"
                placeholder="邮箱（选填）"
                size="large"
                :prefix-icon="Message"
              />
            </el-form-item>

            <el-form-item prop="phone">
              <el-input
                v-model="registerForm.phone"
                placeholder="手机号（选填）"
                size="large"
                :prefix-icon="Phone"
              />
            </el-form-item>

            <div class="agree-row">
              <el-checkbox v-model="agreementAccepted">
                我已阅读并同意《用户协议》和《隐私政策》
              </el-checkbox>
            </div>

            <el-button
              type="primary" size="large" class="reg-btn"
              :loading="loading" :disabled="!agreementAccepted"
              @click="handleRegister" round
            >
              <template v-if="!loading">注 册 账 户</template>
              <template v-else>注册中...</template>
            </el-button>
          </el-form>

          <div class="form-foot">
            <p>已有账户？<router-link to="/login">立即登录</router-link></p>
          </div>
        </div>
      </div>
    </div>

    <button class="theme-btn" @click="toggleTheme">
      <el-icon :size="18"><Moon v-if="!isDarkMode" /><Sunny v-else /></el-icon>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock, Message, Phone, Edit, CircleCheck } from '@element-plus/icons-vue'
import api from '../services/api'

const router = useRouter()
const registerFormRef = ref(null)

const loading = ref(false)
const agreementAccepted = ref(false)
const isDarkMode = ref(false)

const registerForm = ref({
  username: '',
  password: '',
  confirmPassword: '',
  email: '',
  phone: ''
})

const benefits = ['智能蛇类识别服务', '区域蛇类活动预警', '专业急救指导手册', '附近医院一键导航', '蛇类知识科普资料']
const stats = [
  { value: '500K+', label: '注册用户' },
  { value: '300+', label: '蛇类识别' },
  { value: '1500+', label: '合作医院' },
]

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '用户名长度在2到20个字符', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '只能包含字母、数字和下划线', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== registerForm.value.password) callback(new Error('两次输入的密码不一致'))
        else callback()
      },
      trigger: 'blur'
    }
  ],
  email: [
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
  ],
  phone: [
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ]
}

const getPasswordStrength = (password) => {
  if (!password) return 0
  let s = 0
  if (password.length >= 8) s++
  if (password.length >= 12) s++
  if (/[a-z]/.test(password)) s++
  if (/[A-Z]/.test(password)) s++
  if (/\d/.test(password)) s++
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) s++
  return Math.min(s, 5)
}

const getPasswordStrengthText = (password) => {
  const texts = ['弱', '较弱', '中等', '较强', '强', '非常强']
  return texts[Math.min(getPasswordStrength(password), 5)]
}

const handleRegister = async () => {
  if (!registerFormRef.value) return
  try {
    await registerFormRef.value.validate(async (valid) => {
      if (valid && agreementAccepted.value) {
        loading.value = true
        try {
          const { confirmPassword, ...registerData } = registerForm.value
          const response = await api.user.register(registerData)
          if (response.data.code === 200) {
            ElMessage.success('注册成功，请登录')
            router.push('/login')
          } else {
            ElMessage.error(response.data.message || '注册失败')
          }
        } catch (error) {
          console.error('注册错误:', error)
          ElMessage.error('注册失败: ' + (error.response?.data?.message || error.message))
        } finally {
          loading.value = false
        }
      } else if (!agreementAccepted.value) {
        ElMessage.warning('请阅读并同意用户协议和隐私政策')
      }
    })
  } catch (error) {
    console.error('表单验证错误:', error)
  }
}

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark', isDarkMode.value)
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  if (saved === 'dark' || (!saved && prefersDark)) {
    isDarkMode.value = true
    document.documentElement.classList.add('dark')
  }
})
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(160deg, var(--green-900) 0%, #047857 30%, var(--blue-700) 70%, var(--blue-900) 100%);
  position: relative;
  overflow: hidden;
  font-family: var(--font-sans);
}
.register-page.dark {
  background: linear-gradient(160deg, #051410 0%, #0A1F17 40%, #0C2A22 100%);
}

.reg-bg { position: absolute; inset: 0; pointer-events: none; }
.bg-shape {
  position: absolute; border-radius: 50%;
  background: radial-gradient(circle, rgba(52,211,153,0.12) 0%, transparent 70%);
  animation: float 20s infinite linear;
}
.bg-shape-1 { width: 500px; height: 500px; top: -150px; left: -200px; }
.bg-shape-2 { width: 400px; height: 400px; bottom: -100px; right: -150px; animation-delay: 7s; animation-direction: reverse; }

@keyframes float {
  0%, 100% { transform: translate(0,0) scale(1); }
  50% { transform: translate(30px,-30px) scale(1.1); }
}

.reg-shell {
  display: grid;
  grid-template-columns: 1fr 500px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
  gap: 60px;
  z-index: 1;
  position: relative;
}

.reg-brand {
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
.brand-desc { font-size:15px; opacity:0.85; margin:0 0 32px; line-height:1.6; }

.benefit-list { display:flex; flex-direction:column; gap:10px; margin-bottom:36px; }
.benefit {
  display:flex; align-items:center; gap:10px;
  font-size:15px; opacity:0.9;
}

.brand-stats { display:flex; gap:16px; }
.brand-stats .stat {
  flex:1; text-align:center; padding:14px 8px;
  background:rgba(255,255,255,0.08); border-radius:12px;
  border:1px solid rgba(255,255,255,0.1);
}
.stat-val { display:block; font-size:22px; font-weight:700; color:var(--green-400); }
.stat-lbl { display:block; font-size:11px; opacity:0.7; margin-top:4px; text-transform:uppercase; letter-spacing:1px; }

/* 表单 */
.reg-form-side { animation: fadeInRight 0.8s ease-out 0.15s both; }
@keyframes fadeInRight { from { opacity:0; transform:translateX(30px); } to { opacity:1; transform:translateX(0); } }

.form-card {
  background:var(--surface-white);
  border-radius:20px; padding:40px 36px;
  box-shadow:var(--shadow-xl);
  border:1px solid var(--green-100);
}
.dark .form-card { background:var(--dark-surface); border-color:var(--dark-border); box-shadow:0 20px 50px rgba(0,0,0,0.3); }

.form-head { display:flex; align-items:center; gap:16px; margin-bottom:24px; padding-bottom:20px; border-bottom:2px solid var(--green-100); }
.head-icon {
  width:56px; height:56px; border-radius:14px;
  display:flex; align-items:center; justify-content:center;
  color:white; font-size:24px; flex-shrink:0;
  background:var(--brand-gradient);
}
.form-head h2 { margin:0; font-size:26px; font-weight:700; color:var(--ink-900); }
.form-head p { margin:4px 0 0; font-size:14px; color:var(--ink-500); }
.dark .form-head h2 { color:var(--dark-ink); }
.dark .form-head p { color:var(--dark-ink-mute); }

.reg-form :deep(.el-form-item) { margin-bottom:16px; }
.reg-form :deep(.el-input__wrapper) {
  height:46px; border-radius:10px;
  background:var(--surface-white); border:1px solid var(--ink-200);
  box-shadow:none !important; padding-left:12px;
}
.dark .reg-form :deep(.el-input__wrapper) {
  background:var(--dark-bg); border-color:var(--dark-border);
}
.reg-form :deep(.el-input__wrapper:hover) { border-color:var(--green-400); }
.reg-form :deep(.el-input__wrapper.is-focus) {
  border-color:var(--green-600);
  box-shadow:0 0 0 3px rgba(5,150,105,0.1) !important;
}
.reg-form :deep(.el-input__inner) { color:var(--ink-900); font-size:14px; }
.dark .reg-form :deep(.el-input__inner) { color:var(--dark-ink); }

.strength-bar-row { display:flex; align-items:center; gap:8px; margin-top:6px; }
.strength-label { font-size:12px; color:var(--ink-500); }
.strength-dots { display:flex; gap:3px; }
.dot { width:24px; height:4px; border-radius:2px; background:var(--ink-100); transition:background var(--transition-fast); }
.dot.active:nth-child(1) { background:var(--danger); }
.dot.active:nth-child(2) { background:var(--warning); }
.dot.active:nth-child(3) { background:var(--warning); }
.dot.active:nth-child(4) { background:var(--green-500); }
.dot.active:nth-child(5) { background:var(--green-600); }

.agree-row { margin:8px 0 24px; }
.agree-row :deep(.el-checkbox__label) { font-size:13px; color:var(--ink-500); }
.agree-row :deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color:var(--green-600); border-color:var(--green-600);
}

.reg-btn {
  width:100%; height:48px; font-size:16px; font-weight:600;
  background:var(--brand-gradient); border:none;
  border-radius:var(--radius-full);
  box-shadow:var(--shadow-brand);
  letter-spacing:4px;
}
.reg-btn:hover:not(:disabled) { box-shadow:var(--shadow-brand-hover); transform:translateY(-1px); }

.form-foot { text-align:center; margin-top:20px; padding-top:20px; border-top:1px solid var(--ink-100); }
.dark .form-foot { border-color:var(--dark-border); }
.form-foot p { font-size:14px; color:var(--ink-500); margin:0; }
.form-foot a { color:var(--green-600); font-weight:600; text-decoration:none; }
.form-foot a:hover { color:var(--green-700); }

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
  .reg-shell { grid-template-columns:1fr; padding:20px; gap:30px; max-width:500px; }
  .reg-brand { display:none; }
  .form-card { padding:28px 20px; }
}
</style>

<template>
  <div class="forgot-password-container">
    <div class="forgot-password-card">
      <div class="card-header">
        <h2>找回密码</h2>
        <p>请输入您的邮箱地址，我们将发送重置密码链接</p>
      </div>
      
      <el-form :model="form" :rules="rules" ref="formRef" class="reset-form">
        <el-form-item prop="email">
          <el-input 
            v-model="form.email" 
            placeholder="请输入注册邮箱"
            size="large"
            prefix-icon="el-icon-message"
          />
        </el-form-item>
        
        <el-form-item>
          <el-button 
            type="primary" 
            @click="handleResetRequest"
            :loading="loading"
            size="large"
            class="submit-button"
            style="width: 100%"
          >
            {{ loading ? '发送中...' : '发送重置链接' }}
          </el-button>
        </el-form-item>
      </el-form>
      
      <div class="form-footer">
        <router-link to="/login" class="back-to-login">
          <i class="el-icon-arrow-left"></i>
          返回登录
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()
const formRef = ref(null)

const form = ref({
  email: ''
})

const loading = ref(false)

const rules = {
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
  ]
}

const handleResetRequest = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate(async (valid) => {
      if (valid) {
        loading.value = true
        
        try {
          const response = await api.user.requestPasswordReset(form.value.email)
          if (response.data.code === 200) {
            ElMessage.success('密码重置链接已发送到您的邮箱，请查收！')
            router.push('/login')
          } else {
            ElMessage.error(response.data.message || '请求失败，请稍后重试')
          }
        } catch (error) {
          console.error('密码重置请求失败:', error)
          let errorMessage = '请求失败，请稍后重试'
          
          if (error.response) {
            switch (error.response.status) {
              case 404:
                errorMessage = '该邮箱未注册，请检查邮箱地址'
                break
              case 500:
                errorMessage = '服务器错误，请稍后重试'
                break
              default:
                errorMessage = error.response.data?.message || '请求失败'
            }
          }
          
          ElMessage.error(errorMessage)
        } finally {
          loading.value = false
        }
      }
    })
  } catch (error) {
    console.error('表单验证失败:', error)
  }
}
</script>

<style scoped>
.forgot-password-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--brand-gradient);
  padding: var(--space-5);
}

.forgot-password-card {
  width: 100%;
  max-width: 450px;
  background: var(--surface-white);
  backdrop-filter: blur(20px);
  border-radius: var(--radius-xl);
  padding: var(--space-10);
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--green-100);
}

.card-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.card-header h2 {
  font-size: var(--text-3xl);
  color: var(--ink-900);
  margin-bottom: var(--space-3);
  font-weight: var(--weight-bold);
}

.card-header p {
  color: var(--ink-500);
  font-size: var(--text-base);
  margin: 0;
}

.reset-form {
  margin-top: var(--space-5);
}

.reset-form :deep(.el-form-item) {
  margin-bottom: var(--space-6);
}

.reset-form :deep(.el-input__wrapper) {
  height: 56px;
  border-radius: var(--radius-md);
  background: var(--surface-white);
  border: 2px solid var(--ink-100);
  transition: all var(--transition-base);
}

.reset-form :deep(.el-input__wrapper:hover) {
  border-color: var(--green-500);
  transform: translateY(-2px);
  box-shadow: var(--shadow-brand) !important;
}

.reset-form :deep(.el-input__wrapper.is-focus) {
  border-color: var(--green-500);
  box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.12) !important;
}

.submit-button {
  height: 56px;
  font-size: var(--text-base);
  font-weight: var(--weight-semibold);
  background: var(--brand-gradient);
  border: none;
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
}

.submit-button:hover:not(.is-disabled) {
  transform: translateY(-3px);
  box-shadow: var(--shadow-brand-hover);
  background: var(--brand-gradient-hover);
}

.form-footer {
  text-align: center;
  margin-top: var(--space-6);
}

.back-to-login {
  color: var(--ink-500);
  text-decoration: none;
  font-size: var(--text-sm);
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  transition: all var(--transition-base);
}

.back-to-login:hover {
  color: var(--green-600);
  transform: translateX(-3px);
}
</style>
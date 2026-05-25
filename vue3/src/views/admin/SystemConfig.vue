<template>
  <div class="system-config-container">
    <div class="page-header">
      <div class="header-title">
        <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
        <div>
          <h2>系统配置</h2>
          <p class="header-subtitle">管理平台的各项配置参数</p>
        </div>
      </div>
    </div>

    <el-tabs v-model="activeTab" class="config-tabs" @tab-change="handleTabChange">
      <!-- 基础设置 -->
      <el-tab-pane name="basic">
        <template #label>
          <span class="tab-label">
            <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
            基础设置
          </span>
        </template>
        <div class="tab-content">
          <div class="form-section">
            <div class="section-title">
              <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
              <span>站点基本信息</span>
            </div>
            <el-form :model="basic" label-width="140px" class="config-form">
              <div class="form-item">
                <label class="form-label">网站名称</label>
                <div class="form-control">
                  <el-input v-model="basic.site_name" placeholder="请输入网站名称" size="large" />
                  <p class="form-hint">显示在浏览器标签页和页面标题中</p>
                </div>
              </div>
              <div class="form-item">
                <label class="form-label">网站描述</label>
                <div class="form-control">
                  <el-input v-model="basic.site_description" type="textarea" :rows="3" placeholder="请输入网站描述" size="large" />
                  <p class="form-hint">用于SEO和网站简介，简要描述平台功能</p>
                </div>
              </div>
              <div class="form-item">
                <label class="form-label">最大上传大小</label>
                <div class="form-control">
                  <el-input-number v-model="basic.max_upload_size" :min="1" :max="1024" :step="1" controls-position="right" size="large" style="width: 220px;" />
                  <span class="unit-suffix">MB</span>
                  <p class="form-hint">限制单次文件上传的最大尺寸</p>
                </div>
              </div>
              <div class="form-item">
                <label class="form-label">维护模式</label>
                <div class="form-control">
                  <el-switch v-model="basic.maintenance_mode" size="large" active-text="开启" inactive-text="关闭" />
                  <p class="form-hint">开启后仅管理员可访问，普通用户将看到维护页面</p>
                </div>
              </div>
              <div class="form-actions">
                <el-button type="primary" size="large" :loading="savingBasic" @click="saveBasic">
                  <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  保存设置
                </el-button>
                <el-button size="large" :loading="loadingBasic" @click="loadConfigs">
                  <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="23 4 23 10 17 10"/>
                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                  </svg>
                  重置
                </el-button>
              </div>
            </el-form>
          </div>
        </div>
      </el-tab-pane>

      <!-- 安全设置 -->
      <el-tab-pane name="security">
        <template #label>
          <span class="tab-label">
            <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            安全设置
          </span>
        </template>
        <div class="tab-content">
          <div class="form-section">
            <div class="section-title">
              <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span>登录与认证安全</span>
            </div>
            <el-form :model="security" label-width="140px" class="config-form">
              <div class="form-item">
                <label class="form-label">最大登录尝试次数</label>
                <div class="form-control">
                  <el-input-number v-model="security.max_login_attempts" :min="1" :max="20" :step="1" controls-position="right" size="large" style="width: 220px;" />
                  <span class="unit-suffix">次</span>
                  <p class="form-hint">超过此次数后账户将被临时锁定</p>
                </div>
              </div>
              <div class="form-item">
                <label class="form-label">锁定持续时间</label>
                <div class="form-control">
                  <el-input-number v-model="security.lockout_duration" :min="1" :max="1440" :step="1" controls-position="right" size="large" style="width: 220px;" />
                  <span class="unit-suffix">分钟</span>
                  <p class="form-hint">账户锁定后自动解锁的等待时间</p>
                </div>
              </div>
              <div class="form-item">
                <label class="form-label">密码策略</label>
                <div class="form-control">
                  <el-select v-model="security.password_policy" placeholder="请选择密码策略" size="large" style="width: 220px;">
                    <el-option label="基础" value="basic">
                      <div class="select-option">
                        <span class="option-label">基础</span>
                        <span class="option-desc">最少6位字符</span>
                      </div>
                    </el-option>
                    <el-option label="中等" value="medium">
                      <div class="select-option">
                        <span class="option-label">中等</span>
                        <span class="option-desc">至少8位，含字母和数字</span>
                      </div>
                    </el-option>
                    <el-option label="强" value="strong">
                      <div class="select-option">
                        <span class="option-label">强</span>
                        <span class="option-desc">至少10位，含大小写字母、数字和特殊字符</span>
                      </div>
                    </el-option>
                  </el-select>
                  <p class="form-hint">决定用户密码的复杂度要求等级</p>
                </div>
              </div>
              <div class="form-item">
                <label class="form-label">会话超时时间</label>
                <div class="form-control">
                  <el-input-number v-model="security.session_timeout" :min="5" :max="1440" :step="5" controls-position="right" size="large" style="width: 220px;" />
                  <span class="unit-suffix">分钟</span>
                  <p class="form-hint">用户无操作后自动登出的时间</p>
                </div>
              </div>
              <div class="form-item">
                <label class="form-label">双因素认证</label>
                <div class="form-control">
                  <el-switch v-model="security.two_factor_enabled" size="large" active-text="开启" inactive-text="关闭" />
                  <p class="form-hint">开启后用户登录需额外验证（如短信/邮箱验证码）</p>
                </div>
              </div>
              <div class="form-actions">
                <el-button type="primary" size="large" :loading="savingSecurity" @click="saveSecurity">
                  <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  保存设置
                </el-button>
                <el-button size="large" :loading="loadingSecurity" @click="loadConfigs">
                  <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="23 4 23 10 17 10"/>
                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                  </svg>
                  重置
                </el-button>
              </div>
            </el-form>
          </div>
        </div>
      </el-tab-pane>

      <!-- 邮件设置 -->
      <el-tab-pane name="email">
        <template #label>
          <span class="tab-label">
            <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            邮件设置
          </span>
        </template>
        <div class="tab-content">
          <div class="form-section">
            <div class="section-title">
              <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <span>SMTP 邮件服务</span>
            </div>
            <el-form :model="email" label-width="140px" class="config-form">
              <div class="form-item">
                <label class="form-label">SMTP 服务器</label>
                <div class="form-control">
                  <el-input v-model="email.smtp_host" placeholder="例如: smtp.gmail.com" size="large" />
                  <p class="form-hint">邮件发送服务器的地址</p>
                </div>
              </div>
              <div class="form-item">
                <label class="form-label">SMTP 端口</label>
                <div class="form-control">
                  <el-input-number v-model="email.smtp_port" :min="1" :max="65535" :step="1" controls-position="right" size="large" style="width: 220px;" />
                  <p class="form-hint">常见端口: 25, 465(SSL), 587(TLS)</p>
                </div>
              </div>
              <div class="form-item">
                <label class="form-label">SMTP 用户名</label>
                <div class="form-control">
                  <el-input v-model="email.smtp_username" placeholder="请输入SMTP用户名" size="large" />
                  <p class="form-hint">通常为完整的邮箱地址</p>
                </div>
              </div>
              <div class="form-item">
                <label class="form-label">SMTP 密码</label>
                <div class="form-control">
                  <el-input v-model="email.smtp_password" type="password" show-password placeholder="请输入SMTP密码或授权码" size="large" />
                  <p class="form-hint">第三方邮箱服务需使用授权码而非登录密码</p>
                </div>
              </div>
              <div class="form-item">
                <label class="form-label">发件人名称</label>
                <div class="form-control">
                  <el-input v-model="email.sender_name" placeholder="例如: 蛇灵系统通知" size="large" />
                  <p class="form-hint">邮件中显示的发件人名称</p>
                </div>
              </div>
              <div class="form-item">
                <label class="form-label">启用 SSL</label>
                <div class="form-control">
                  <el-switch v-model="email.smtp_ssl" size="large" active-text="开启" inactive-text="关闭" />
                  <p class="form-hint">使用SSL加密连接到SMTP服务器</p>
                </div>
              </div>
              <div class="form-actions">
                <el-button type="primary" size="large" :loading="savingEmail" @click="saveEmail">
                  <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  保存设置
                </el-button>
                <el-button size="large" :loading="loadingEmail" @click="loadConfigs">
                  <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="23 4 23 10 17 10"/>
                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                  </svg>
                  重置
                </el-button>
              </div>
            </el-form>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { adminApi } from '@/services/api'

const activeTab = ref('basic')

// Loading states
const loadingBasic = ref(false)
const loadingSecurity = ref(false)
const loadingEmail = ref(false)
const savingBasic = ref(false)
const savingSecurity = ref(false)
const savingEmail = ref(false)

// Form data
const basic = reactive({
  site_name: '',
  site_description: '',
  max_upload_size: 20,
  maintenance_mode: false
})

const security = reactive({
  max_login_attempts: 5,
  lockout_duration: 30,
  password_policy: 'medium',
  session_timeout: 120,
  two_factor_enabled: false
})

const email = reactive({
  smtp_host: '',
  smtp_port: 587,
  smtp_username: '',
  smtp_password: '',
  sender_name: '',
  smtp_ssl: true
})

// Cached configs for reset
const cachedConfigs = ref(null)

// Load all configs
// Helper to convert string numbers to actual numbers (for API responses that return strings)
const toNumber = (val) => (val !== undefined && val !== null && val !== '' ? Number(val) : val)

const loadConfigs = async () => {
  const currentTab = activeTab.value
  if (currentTab === 'basic') loadingBasic.value = true
  else if (currentTab === 'security') loadingSecurity.value = true
  else if (currentTab === 'email') loadingEmail.value = true

  try {
    const res = await adminApi.getConfigs()
    if (res.data.code === 200) {
      const data = res.data.data
      cachedConfigs.value = JSON.parse(JSON.stringify(data))

      if (data.basic) {
        Object.keys(basic).forEach(key => {
          if (data.basic[key] !== undefined) basic[key] = toNumber(data.basic[key])
        })
      }
      if (data.security) {
        Object.keys(security).forEach(key => {
          if (data.security[key] !== undefined) security[key] = toNumber(data.security[key])
        })
      }
      if (data.email) {
        Object.keys(email).forEach(key => {
          if (data.email[key] !== undefined) email[key] = toNumber(data.email[key])
        })
      }
      ElMessage.success('配置加载成功')
    } else {
      ElMessage.error(res.data.message || '加载配置失败')
    }
  } catch (e) {
    ElMessage.error('加载配置失败，请检查网络连接')
  } finally {
    loadingBasic.value = false
    loadingSecurity.value = false
    loadingEmail.value = false
  }
}

// Save basic config
const saveBasic = async () => {
  savingBasic.value = true
  try {
    const res = await adminApi.saveConfigs('basic', { ...basic })
    if (res.data.code === 200) {
      ElMessage.success('基础设置保存成功')
    } else {
      ElMessage.error(res.data.message || '保存失败')
    }
  } catch (e) {
    ElMessage.error('保存失败，请检查网络连接')
  } finally {
    savingBasic.value = false
  }
}

// Save security config
const saveSecurity = async () => {
  savingSecurity.value = true
  try {
    const res = await adminApi.saveConfigs('security', { ...security })
    if (res.data.code === 200) {
      ElMessage.success('安全设置保存成功')
    } else {
      ElMessage.error(res.data.message || '保存失败')
    }
  } catch (e) {
    ElMessage.error('保存失败，请检查网络连接')
  } finally {
    savingSecurity.value = false
  }
}

// Save email config
const saveEmail = async () => {
  savingEmail.value = true
  try {
    const res = await adminApi.saveConfigs('email', { ...email })
    if (res.data.code === 200) {
      ElMessage.success('邮件设置保存成功')
    } else {
      ElMessage.error(res.data.message || '保存失败')
    }
  } catch (e) {
    ElMessage.error('保存失败，请检查网络连接')
  } finally {
    savingEmail.value = false
  }
}

// Tab change handler
const handleTabChange = () => {
  // No-op; configs are already loaded globally on mount
}

onMounted(() => {
  loadConfigs()
})
</script>

<style scoped>
.system-config-container {
  padding: 24px;
  min-height: calc(100vh - 60px);
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

/* Page Header */
.page-header {
  margin-bottom: 24px;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-icon {
  width: 40px;
  height: 40px;
  color: #3b82f6;
  background: linear-gradient(135deg, rgba(59,130,246,0.1), rgba(59,130,246,0.05));
  padding: 8px;
  border-radius: 12px;
  flex-shrink: 0;
}

.header-title h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.02em;
}

.header-subtitle {
  margin: 2px 0 0;
  font-size: 13px;
  color: #94a3b8;
}

/* Tabs */
.config-tabs {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03);
}

:deep(.el-tabs__header) {
  margin-bottom: 28px;
}

:deep(.el-tabs__nav-wrap::after) {
  height: 1px;
  background-color: #f1f5f9;
}

:deep(.el-tabs__item) {
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  height: 44px;
  line-height: 44px;
  padding: 0 24px;
  transition: color 0.2s;
}

:deep(.el-tabs__item.is-active) {
  color: #3b82f6;
  font-weight: 600;
}

:deep(.el-tabs__active-bar) {
  height: 2px;
  background: linear-gradient(90deg, #3b82f6, #6366f1);
  border-radius: 1px;
}

.tab-label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tab-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

/* Tab Content */
.tab-content {
  min-height: 400px;
}

/* Form Section */
.form-section {
  max-width: 720px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 600;
  color: #334155;
  margin-bottom: 28px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f1f5f9;
}

.section-icon {
  width: 18px;
  height: 18px;
  color: #3b82f6;
}

/* Form Items */
.config-form {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.form-item {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  padding: 20px 0;
  border-bottom: 1px solid #f8fafc;
}

.form-item:last-of-type {
  border-bottom: none;
}

.form-label {
  width: 140px;
  flex-shrink: 0;
  font-size: 14px;
  font-weight: 500;
  color: #475569;
  line-height: 40px;
  text-align: right;
}

.form-control {
  flex: 1;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.form-control :deep(.el-input),
.form-control :deep(.el-textarea),
.form-control :deep(.el-select) {
  max-width: 420px;
}

.form-hint {
  width: 100%;
  margin: 4px 0 0;
  font-size: 12px;
  color: #94a3b8;
  line-height: 1.4;
}

.unit-suffix {
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
  margin-left: 4px;
}

.select-option {
  display: flex;
  flex-direction: column;
}

.option-label {
  font-size: 14px;
  color: #1e293b;
}

.option-desc {
  font-size: 11px;
  color: #94a3b8;
  margin-top: 1px;
}

/* Form Actions */
.form-actions {
  display: flex;
  gap: 12px;
  padding-top: 28px;
  margin-top: 4px;
}

.btn-icon {
  width: 16px;
  height: 16px;
  margin-right: 6px;
  flex-shrink: 0;
}

/* Refined input styling */
:deep(.el-input__wrapper) {
  border-radius: 10px;
  box-shadow: 0 0 0 1px #e2e8f0 inset;
  transition: box-shadow 0.2s;
}

:deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #cbd5e1 inset;
}

:deep(.el-input.is-focus .el-input__wrapper) {
  box-shadow: 0 0 0 1px #3b82f6 inset, 0 0 0 3px rgba(59,130,246,0.1);
}

:deep(.el-textarea__inner) {
  border-radius: 10px;
  font-size: 14px;
}

:deep(.el-input-number .el-input__wrapper) {
  border-radius: 10px;
}

:deep(.el-select .el-input__wrapper) {
  border-radius: 10px;
}

:deep(.el-switch.is-checked .el-switch__core) {
  background-color: #3b82f6;
  border-color: #3b82f6;
}

:deep(.el-button--primary) {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  border: none;
  border-radius: 10px;
  font-weight: 500;
  padding: 10px 24px;
  transition: all 0.2s;
}

:deep(.el-button--primary:hover) {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(37,99,235,0.3);
}

:deep(.el-button--default) {
  border-radius: 10px;
  font-weight: 500;
  padding: 10px 24px;
}

/* Responsive */
@media (max-width: 768px) {
  .system-config-container {
    padding: 12px;
  }

  .config-tabs {
    padding: 16px;
    border-radius: 12px;
  }

  .form-item {
    flex-direction: column;
    gap: 8px;
    padding: 16px 0;
  }

  .form-label {
    width: 100%;
    text-align: left;
    line-height: 1.4;
  }

  .form-control :deep(.el-input),
  .form-control :deep(.el-textarea),
  .form-control :deep(.el-select) {
    max-width: 100%;
  }

  .form-actions {
    flex-direction: column;
  }

  .form-actions .el-button {
    width: 100%;
    justify-content: center;
  }
}
</style>
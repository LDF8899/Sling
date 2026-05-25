<template>
  <div class="admin-user-mgmt">
    <!-- Search Bar -->
    <div class="panel-card search-panel">
      <div class="search-bar">
        <div class="search-input-wrap">
          <svg class="search-icon-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input v-model="searchKeyword" placeholder="搜索用户名 / 姓名 / 邮箱 / 手机号" class="search-input" @keyup.enter="handleSearch" />
          <svg v-if="searchKeyword" class="clear-icon" @click="searchKeyword='';handleSearch()" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6m0-6 6 6"/></svg>
        </div>
        <button class="btn btn-primary" @click="handleSearch">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          搜索
        </button>
        <button class="btn btn-outline" @click="searchKeyword='';handleSearch()">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
          重置
        </button>
        <button class="btn btn-success" @click="openCreateDialog">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          新增管理员
        </button>
      </div>
    </div>

    <!-- Data Table -->
    <div class="panel-card table-panel">
      <el-table
        :data="list"
        v-loading="loading"
        style="width:100%"
        row-key="id"
        :header-cell-style="{ background:'#f8fafc', fontWeight:'600', color:'#475569' }"
        stripe
      >
        <el-table-column prop="username" label="用户名" min-width="120">
          <template #default="{row}"><span class="cell-username">{{ row.username }}</span></template>
        </el-table-column>
        <el-table-column prop="realName" label="姓名" min-width="100">
          <template #default="{row}">{{ row.realName || '-' }}</template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="180">
          <template #default="{row}"><span class="cell-secondary">{{ row.email || '-' }}</span></template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" min-width="130">
          <template #default="{row}"><span class="cell-secondary">{{ row.phone || '-' }}</span></template>
        </el-table-column>
        <el-table-column prop="department" label="部门" min-width="110">
          <template #default="{row}">{{ row.department || '-' }}</template>
        </el-table-column>
        <el-table-column prop="position" label="职位" min-width="100">
          <template #default="{row}">{{ row.position || '-' }}</template>
        </el-table-column>
        <el-table-column label="状态" width="90" align="center">
          <template #default="{row}">
            <el-switch v-model="row.status" :active-value="1" :inactive-value="0" @change="(val) => toggleStatus(row, val)" size="small" />
          </template>
        </el-table-column>
        <el-table-column label="角色" min-width="150">
          <template #default="{row}">
            <div class="role-tags">
              <el-tag v-for="r in (row.roles||[])" :key="r.roleName||r.name||r" size="small" effect="light" type="" class="role-tag">{{ r.roleName || r.name || r }}</el-tag>
              <span v-if="!row.roles||!row.roles.length" class="cell-secondary">无</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="最后登录" width="170">
          <template #default="{row}">{{ formatTime(row.lastLoginTime) }}</template>
        </el-table-column>
        <el-table-column label="操作" width="240" align="center" fixed="right">
          <template #default="{row}">
            <div class="action-btns">
              <el-tooltip content="编辑" placement="top">
                <button class="icon-btn icon-edit" @click="openEditDialog(row)"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
              </el-tooltip>
              <el-tooltip content="修改密码" placement="top">
                <button class="icon-btn icon-warning" @click="openPasswordDialog(row)"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></button>
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
                <button class="icon-btn icon-danger" @click="confirmDelete(row)"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg></button>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- Pagination -->
      <div class="pagination-wrap">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10,20,50,100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          background
          @size-change="loadList"
          @current-change="loadList"
        />
      </div>
    </div>

    <!-- Create / Edit Dialog -->
    <el-dialog v-model="dialogVisible" :title="isEdit?'编辑管理员':'新增管理员'" width="600px" destroy-on-close :close-on-click-modal="false" class="form-dialog">
      <el-form :model="form" :rules="formRules" ref="formRef" label-width="80px" label-position="right">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="form.username" :disabled="isEdit" placeholder="请输入用户名" size="large" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="!isEdit" label="密码" prop="password">
              <el-input v-model="form.password" type="password" placeholder="请输入密码" size="large" show-password />
            </el-form-item>
            <el-form-item v-else label="手机号" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入手机号" size="large" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" placeholder="请输入邮箱" size="large" />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="!isEdit">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入手机号" size="large" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="姓名" prop="realName">
              <el-input v-model="form.realName" placeholder="请输入真实姓名" size="large" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门" prop="department">
              <el-input v-model="form.department" placeholder="请输入部门" size="large" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="职位" prop="position">
              <el-input v-model="form.position" placeholder="请输入职位" size="large" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="角色分配" prop="roleIds">
          <div class="role-checkboxes">
            <el-checkbox-group v-model="form.roleIds">
              <el-checkbox v-for="r in roles" :key="r.id || r.roleName || r.name || r" :label="r.id || r.roleName || r.name || r" :value="r.id || r.roleName || r.name || r">{{ r.roleName || r.name || r }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible=false" size="large">取消</el-button>
        <el-button type="primary" @click="submitForm" :loading="saving" size="large">{{ isEdit?'保存':'创建' }}</el-button>
      </template>
    </el-dialog>

    <!-- Change Password Dialog -->
    <el-dialog v-model="passwordDialogVisible" title="修改密码" width="440px" destroy-on-close :close-on-click-modal="false" class="form-dialog">
      <el-form :model="pwdForm" :rules="pwdRules" ref="pwdFormRef" label-width="100px" label-position="right" @submit.prevent>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="pwdForm.newPassword" type="password" placeholder="请输入新密码" size="large" show-password />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="pwdForm.confirmPassword" type="password" placeholder="请再次输入新密码" size="large" show-password />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="passwordDialogVisible=false" size="large">取消</el-button>
        <el-button type="primary" @click="submitPassword" :loading="saving" size="large">确认修改</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { adminApi } from '@/services/api'

// State
const list = ref([])
const loading = ref(false)
const saving = ref(false)
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)
const roles = ref([])
const searchKeyword = ref('')

// Create/Edit dialog
const dialogVisible = ref(false)
const isEdit = ref(false)
const formRef = ref(null)
const form = reactive({ id: null, username: '', password: '', email: '', phone: '', realName: '', department: '', position: '', roleIds: [] })

const formRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }, { min: 3, max: 20, message: '3-20个字符', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }, { min: 6, message: '至少6位', trigger: 'blur' }],
  email: [{ type: 'email', message: '邮箱格式不正确', trigger: 'blur' }],
  roleIds: [{ type: 'array', min: 1, message: '请至少分配一个角色', trigger: 'change' }]
}

// Password dialog
const passwordDialogVisible = ref(false)
const pwdFormRef = ref(null)
const pwdForm = reactive({ adminId: null, newPassword: '', confirmPassword: '' })
const pwdRules = {
  newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }, { min: 6, message: '至少6位', trigger: 'blur' }],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: (rule, val, cb) => { if (val !== pwdForm.newPassword) cb(new Error('两次输入不一致')); else cb() }, trigger: 'blur' }
  ]
}

// Load data
const loadList = async () => {
  loading.value = true
  try {
    const { data } = await adminApi.getAdminUsers({ page: currentPage.value - 1, size: pageSize.value, keyword: searchKeyword.value || undefined })
    if (data.code === 200) {
      list.value = data.data?.list || []
      total.value = data.data?.total || 0
    }
  } catch { /* handled by interceptor */ } finally { loading.value = false }
}

const loadRoles = async () => {
  try {
    const { data } = await adminApi.getAdminRoles()
    if (data.code === 200) roles.value = data.data || []
  } catch { /* ignore */ }
}

const handleSearch = () => { currentPage.value = 1; loadList() }

// Toggle status
const toggleStatus = async (row, val) => {
  try {
    const { data } = await adminApi.toggleAdminStatus(row.id, { status: val })
    if (data.code === 200) { ElMessage.success(val === 1 ? '已启用' : '已禁用') }
  } catch { row.status = val === 1 ? 0 : 1 /* revert on failure */ }
}

// Delete
const confirmDelete = (row) => {
  ElMessageBox.confirm(`确定要删除管理员 "${row.username}" 吗？`, '删除确认', { confirmButtonText: '确定删除', cancelButtonText: '取消', type: 'error' }).then(async () => {
    try {
      const { data } = await adminApi.deleteAdminUser(row.id)
      if (data.code === 200) { ElMessage.success('删除成功'); loadList() }
    } catch { /* handled */ }
  }).catch(() => {})
}

// Create dialog
const openCreateDialog = () => {
  isEdit.value = false
  form.id = null; form.username = ''; form.password = ''; form.email = ''; form.phone = ''; form.realName = ''; form.department = ''; form.position = ''; form.roleIds = []
  dialogVisible.value = true
}

// Edit dialog
const openEditDialog = async (row) => {
  isEdit.value = true
  try {
    const { data } = await adminApi.getAdminUser(row.id)
    if (data.code === 200) {
      const detail = data.data
      form.id = detail.user?.id || row.id
      form.username = detail.user?.username || row.username
      form.email = detail.user?.email || row.email || ''
      form.phone = detail.user?.phone || row.phone || ''
      form.realName = detail.user?.realName || row.realName || ''
      form.department = detail.user?.department || row.department || ''
      form.position = detail.user?.position || row.position || ''
      form.roleIds = (detail.roles || row.roles || []).map(r => r.id || r.roleName || r.name || r)
      form.password = ''
    }
  } catch {
    form.id = row.id; form.username = row.username; form.email = row.email || ''; form.phone = row.phone || ''; form.realName = row.realName || ''; form.department = row.department || ''; form.position = row.position || ''; form.roleIds = (row.roles || []).map(r => r.id || r.roleName || r.name || r); form.password = ''
  }
  dialogVisible.value = true
}

// Submit form
const submitForm = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (!valid) return
    saving.value = true
    try {
      const payload = { username: form.username, email: form.email, phone: form.phone, realName: form.realName, department: form.department, position: form.position, roleIds: form.roleIds }
      if (!isEdit.value) payload.password = form.password
      if (isEdit.value) {
        const { data } = await adminApi.updateAdminUser(form.id, payload)
        if (data.code === 200) { ElMessage.success('更新成功'); dialogVisible.value = false; loadList() }
      } else {
        const { data } = await adminApi.createAdminUser(payload)
        if (data.code === 200) { ElMessage.success('创建成功'); dialogVisible.value = false; loadList() }
      }
    } catch { /* handled */ } finally { saving.value = false }
  })
}

// Password dialog
const openPasswordDialog = (row) => {
  pwdForm.adminId = row.id
  pwdForm.newPassword = ''
  pwdForm.confirmPassword = ''
  passwordDialogVisible.value = true
}

const submitPassword = async () => {
  if (!pwdFormRef.value) return
  await pwdFormRef.value.validate(async (valid) => {
    if (!valid) return
    saving.value = true
    try {
      const { data } = await adminApi.changeAdminPassword(pwdForm.adminId, { newPassword: pwdForm.newPassword })
      if (data.code === 200) { ElMessage.success('密码修改成功'); passwordDialogVisible.value = false }
    } catch { /* handled */ } finally { saving.value = false }
  })
}

// Helpers
const formatTime = (t) => { if (!t) return '-'; return new Date(t).toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) }

onMounted(() => { loadList(); loadRoles() })
</script>

<style scoped>
.admin-user-mgmt { padding: 20px; max-width: 1400px; }

/* Panel */
.panel-card { background: #fff; border-radius: 10px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); margin-bottom: 16px; }

/* Search */
.search-bar { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
.search-input-wrap { flex: 1; min-width: 220px; position: relative; display: flex; align-items: center; }
.search-icon-svg { position: absolute; left: 12px; color: #94a3b8; pointer-events: none; }
.search-input { width: 100%; height: 40px; padding: 0 36px 0 38px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 14px; outline: none; transition: border-color 0.2s; background: #fff; color: #1e293b; }
.search-input:focus { border-color: #3b82f6; }
.search-input::placeholder { color: #94a3b8; }
.clear-icon { position: absolute; right: 10px; color: #94a3b8; cursor: pointer; }
.clear-icon:hover { color: #ef4444; }

/* Buttons */
.btn { display: inline-flex; align-items: center; gap: 6px; height: 40px; padding: 0 18px; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; border: none; transition: all 0.15s; white-space: nowrap; }
.btn-primary { background: #3b82f6; color: #fff; }
.btn-primary:hover { background: #2563eb; }
.btn-outline { background: #fff; color: #475569; border: 1px solid #e2e8f0; }
.btn-outline:hover { background: #f8fafc; border-color: #cbd5e1; }
.btn-success { background: #10b981; color: #fff; }
.btn-success:hover { background: #059669; }

/* Table */
.cell-username { font-weight: 600; color: #1e293b; }
.cell-secondary { color: #64748b; font-size: 13px; }
.role-tags { display: flex; gap: 4px; flex-wrap: wrap; }
.role-tag { margin: 0; }

/* Action buttons */
.action-btns { display: flex; gap: 6px; justify-content: center; }
.icon-btn { width: 30px; height: 30px; border-radius: 6px; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.15s; }
.icon-edit { background: #ecfdf5; color: #10b981; }
.icon-edit:hover { background: #d1fae5; }
.icon-warning { background: #fffbeb; color: #f59e0b; }
.icon-warning:hover { background: #fef3c7; }
.icon-danger { background: #fef2f2; color: #ef4444; }
.icon-danger:hover { background: #fee2e2; }

/* Pagination */
.pagination-wrap { display: flex; justify-content: flex-end; margin-top: 20px; padding-top: 16px; border-top: 1px solid #f1f5f9; }

/* Dialog */
.form-dialog :deep(.el-dialog__header) { border-bottom: 1px solid #f1f5f9; padding: 20px 24px; }
.form-dialog :deep(.el-dialog__body) { padding: 24px; }
.form-dialog :deep(.el-dialog__footer) { border-top: 1px solid #f1f5f9; padding: 16px 24px; }
.role-checkboxes { display: flex; flex-wrap: wrap; gap: 12px; padding: 12px; background: #f8fafc; border-radius: 8px; }
</style>

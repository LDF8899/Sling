<template>
  <div class="user-mgmt">
    <!-- Stats Row -->
    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-icon" style="background: linear-gradient(135deg, #3b82f6, #2563eb)">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ total }}</div>
          <div class="stat-label">用户总数</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: linear-gradient(135deg, #10b981, #059669)">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ activeCount }}</div>
          <div class="stat-label">活跃用户</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: linear-gradient(135deg, #f59e0b, #d97706)">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ newToday }}</div>
          <div class="stat-label">今日新增</div>
        </div>
      </div>
    </div>

    <!-- Search + Filter -->
    <div class="panel-card search-panel">
      <div class="search-bar">
        <div class="search-input-wrap">
          <svg class="search-icon-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input v-model="searchForm.keyword" placeholder="搜索用户名 / 邮箱 / 手机号" class="search-input" @keyup.enter="handleSearch" />
          <svg v-if="searchForm.keyword" class="clear-icon" @click="searchForm.keyword='';handleSearch()" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6m0-6 6 6"/></svg>
        </div>
        <el-select v-model="searchForm.role" placeholder="全部角色" clearable size="large" style="width:160px" @change="handleSearch">
          <el-option v-for="r in allRoles" :key="r.roleName || r.name || r" :label="r.roleName || r.name || r" :value="r.roleName || r.name || r" />
        </el-select>
        <button class="btn btn-primary" @click="handleSearch">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          搜索
        </button>
        <button class="btn btn-outline" @click="handleReset">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
          重置
        </button>
        <button class="btn btn-success" @click="openCreateDialog">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          新增用户
        </button>
      </div>
    </div>

    <!-- Batch Actions -->
    <div v-if="selectedRows.length" class="batch-bar">
      <span>已选择 <strong>{{ selectedRows.length }}</strong> 项</span>
      <button class="btn btn-danger-sm" @click="batchDelete">批量删除</button>
      <button class="btn btn-success-sm" @click="batchEnable">批量启用</button>
      <button class="btn btn-warning-sm" @click="batchDisable">批量禁用</button>
      <button class="btn btn-text" @click="clearSelection">取消选择</button>
    </div>

    <!-- Data Table -->
    <div class="panel-card table-panel">
      <el-table
        :data="userList"
        v-loading="loading"
        style="width:100%"
        @selection-change="onSelectionChange"
        :header-cell-style="{ background:'#f8fafc', fontWeight:'600', color:'#475569' }"
        stripe
        row-key="id"
        ref="tableRef"
      >
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column prop="username" label="用户名" min-width="130">
          <template #default="{row}"><span class="cell-username">{{ row.username }}</span></template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="180">
          <template #default="{row}"><span class="cell-secondary">{{ row.email || '-' }}</span></template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" min-width="140">
          <template #default="{row}"><span class="cell-secondary">{{ row.phone || '-' }}</span></template>
        </el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template #default="{row}">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'" size="small" effect="plain">
              {{ row.status === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="角色" min-width="160">
          <template #default="{row}">
            <div class="role-tags">
              <el-tag v-for="r in (row.roles || [])" :key="r" size="small" effect="light" type="warning" class="role-tag">{{ getRoleLabel(r) }}</el-tag>
              <span v-if="!row.roles || !row.roles.length" class="cell-secondary">无</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="170">
          <template #default="{row}">{{ formatTime(row.createTime) }}</template>
        </el-table-column>
        <el-table-column label="操作" width="220" align="center" fixed="right">
          <template #default="{row}">
            <div class="action-btns">
              <el-tooltip content="查看详情" placement="top">
                <button class="icon-btn icon-view" @click="viewDetail(row)"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
              </el-tooltip>
              <el-tooltip content="编辑" placement="top">
                <button class="icon-btn icon-edit" @click="openEditDialog(row)"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
              </el-tooltip>
              <el-tooltip :content="row.status===1?'禁用':'启用'" placement="top">
                <button class="icon-btn" :class="row.status===1?'icon-warning':'icon-success'" @click="toggleStatus(row)">
                  <svg v-if="row.status===1" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                  <svg v-else viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                </button>
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
    <el-dialog v-model="dialogVisible" :title="isEdit?'编辑用户':'新增用户'" width="560px" destroy-on-close :close-on-click-modal="false" class="form-dialog">
      <el-form :model="form" :rules="formRules" ref="formRef" label-width="80px" label-position="right">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" :disabled="isEdit" placeholder="请输入用户名" size="large" />
        </el-form-item>
        <el-form-item v-if="!isEdit" label="密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" size="large" show-password />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" size="large" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" size="large" />
        </el-form-item>
        <el-form-item v-if="isEdit" label="角色分配">
          <div class="role-checkboxes">
            <el-checkbox-group v-model="form.roleIds">
              <el-checkbox v-for="r in allRoles" :key="r.roleName || r.name || r" :label="r.roleName || r.name || r" :value="r.roleName || r.name || r">{{ r.roleName || r.name || r }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible=false" size="large">取消</el-button>
        <el-button type="primary" @click="submitForm" :loading="saving" size="large">{{ isEdit?'保存':'创建' }}</el-button>
      </template>
    </el-dialog>

    <!-- Detail Dialog -->
    <el-dialog v-model="detailVisible" title="用户详情" width="600px" destroy-on-close class="form-dialog">
      <div v-if="detail" class="detail-body">
        <div class="detail-section">
          <h4><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> 基本信息</h4>
          <div class="detail-row"><span class="dt-label">用户名</span><span class="dt-value">{{ detail.username }}</span></div>
          <div class="detail-row"><span class="dt-label">邮箱</span><span class="dt-value">{{ detail.email || '-' }}</span></div>
          <div class="detail-row"><span class="dt-label">手机号</span><span class="dt-value">{{ detail.phone || '-' }}</span></div>
          <div class="detail-row"><span class="dt-label">状态</span><span class="dt-value"><el-tag :type="detail.status===1?'success':'danger'" size="small">{{ detail.status===1?'启用':'禁用' }}</el-tag></span></div>
          <div class="detail-row"><span class="dt-label">注册时间</span><span class="dt-value">{{ formatTime(detail.createTime) }}</span></div>
        </div>
        <div class="detail-section">
          <h4><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg> 角色权限</h4>
          <div class="role-tags">
            <el-tag v-for="r in (detail.roles||[])" :key="r" size="small" type="warning" effect="dark">{{ getRoleLabel(r) }}</el-tag>
            <span v-if="!detail.roles||!detail.roles.length" class="cell-secondary">无角色</span>
          </div>
        </div>
      </div>
      <template #footer>
        <el-button @click="detailVisible=false" size="large">关闭</el-button>
        <el-button type="primary" @click="detailVisible=false;openEditDialog(detail)" size="large">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          编辑用户
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { userApi, adminApi } from '@/services/api'

// State
const userList = ref([])
const loading = ref(false)
const saving = ref(false)
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)
const activeCount = ref(0)
const newToday = ref(0)
const allRoles = ref([])
const selectedRows = ref([])
const tableRef = ref(null)

// Search
const searchForm = reactive({ keyword: '', role: '' })

// Dialog
const dialogVisible = ref(false)
const detailVisible = ref(false)
const isEdit = ref(false)
const form = reactive({ id: null, username: '', password: '', email: '', phone: '', roleIds: [] })
const formRef = ref(null)
const detail = ref(null)

const formRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }, { min: 3, max: 20, message: '3-20个字符', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }, { min: 6, message: '至少6位', trigger: 'blur' }],
  email: [{ type: 'email', message: '邮箱格式不正确', trigger: 'blur' }]
}

// Load data
const loadList = async () => {
  loading.value = true
  try {
    const { data } = await userApi.getUserList({ page: currentPage.value - 1, size: pageSize.value, keyword: searchForm.keyword || undefined, role: searchForm.role || undefined })
    if (data.code === 200) {
      userList.value = data.data?.list || []
      total.value = data.data?.total || 0
      activeCount.value = data.data?.activeCount || 0
      newToday.value = data.data?.newToday || 0
    }
  } catch { /* handled by interceptor */ } finally { loading.value = false }
}

const loadRoles = async () => {
  try {
    const { data } = await userApi.getAllRoles()
    if (data.code === 200) allRoles.value = data.data || []
  } catch { /* ignore */ }
}

const handleSearch = () => { currentPage.value = 1; loadList() }
const handleReset = () => { searchForm.keyword = ''; searchForm.role = ''; handleSearch() }

// Selection
const onSelectionChange = (val) => { selectedRows.value = val }
const clearSelection = () => { tableRef.value?.clearSelection(); selectedRows.value = [] }

// Batch
const batchDelete = () => {
  if (!selectedRows.value.length) return
  ElMessageBox.confirm(`确定要删除选中的 ${selectedRows.value.length} 个用户吗？`, '批量删除', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(async () => {
    try {
      const { data } = await userApi.batchDeleteUsers(selectedRows.value.map(u => u.id))
      if (data.code === 200) { ElMessage.success('批量删除成功'); clearSelection(); loadList() }
    } catch { /* handled */ }
  }).catch(() => {})
}
const batchEnable = () => {
  ElMessage.info('批量启用功能开发中')
}
const batchDisable = () => {
  ElMessage.info('批量禁用功能开发中')
}

// Toggle status
const toggleStatus = async (row) => {
  const newStatus = row.status === 1 ? 0 : 1
  try {
    const { data } = await userApi.updateUser({ ...row, status: newStatus })
    if (data.code === 200) { ElMessage.success(newStatus === 1 ? '已启用' : '已禁用'); row.status = newStatus }
  } catch { /* handled */ }
}

// Delete
const confirmDelete = (row) => {
  ElMessageBox.confirm(`确定要删除用户 "${row.username}" 吗？此操作不可恢复。`, '删除确认', { confirmButtonText: '确定删除', cancelButtonText: '取消', type: 'error' }).then(async () => {
    try {
      const { data } = await userApi.deleteUser(row.id)
      if (data.code === 200) { ElMessage.success('删除成功'); loadList() }
    } catch { /* handled */ }
  }).catch(() => {})
}

// Detail
const viewDetail = async (row) => {
  try {
    const [infoRes, rolesRes] = await Promise.allSettled([userApi.getUserInfo(row.id), userApi.getUserRoles(row.id)])
    const info = infoRes.status === 'fulfilled' && infoRes.value.data.code === 200 ? infoRes.value.data.data : row
    const roles = rolesRes.status === 'fulfilled' && rolesRes.value.data.code === 200 ? (rolesRes.value.data.data || []).map(r => r.roleName || r) : (row.roles || [])
    detail.value = { ...info, roles }
    detailVisible.value = true
  } catch { detail.value = row; detailVisible.value = true }
}

// Dialogs
const openCreateDialog = () => {
  isEdit.value = false
  form.id = null; form.username = ''; form.password = ''; form.email = ''; form.phone = ''; form.roleIds = []
  dialogVisible.value = true
}

const openEditDialog = async (row) => {
  isEdit.value = true
  try {
    const [infoRes, rolesRes] = await Promise.allSettled([userApi.getUserInfo(row.id), userApi.getUserRoles(row.id)])
    const info = infoRes.status === 'fulfilled' && infoRes.value.data.code === 200 ? infoRes.value.data.data : row
    const roles = rolesRes.status === 'fulfilled' && rolesRes.value.data.code === 200 ? (rolesRes.value.data.data || []).map(r => r.roleName || r) : (row.roles || [])
    form.id = info.id || row.id; form.username = info.username || row.username; form.email = info.email || row.email || ''; form.phone = info.phone || row.phone || ''; form.roleIds = roles
    form.password = ''
  } catch {
    form.id = row.id; form.username = row.username; form.email = row.email || ''; form.phone = row.phone || ''; form.roleIds = row.roles || []
    form.password = ''
  }
  dialogVisible.value = true
}

const submitForm = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (!valid) return
    saving.value = true
    try {
      if (isEdit.value) {
        const { data } = await userApi.updateUser({ id: form.id, username: form.username, email: form.email, phone: form.phone })
        if (data.code === 200) {
          if (form.roleIds.length) await userApi.assignUserRoles(form.id, form.roleIds).catch(() => {})
          ElMessage.success('更新成功'); dialogVisible.value = false; loadList()
        }
      } else {
        const { data } = await userApi.createUser({ username: form.username, password: form.password, email: form.email, phone: form.phone })
        if (data.code === 200) {
          ElMessage.success('创建成功'); dialogVisible.value = false; loadList()
        }
      }
    } catch { /* handled */ } finally { saving.value = false }
  })
}

// Helpers
const formatTime = (t) => { if (!t) return '-'; return new Date(t).toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) }
const getRoleLabel = (r) => { const map = { ADMIN: '管理员', SUPER_ADMIN: '超级管理员', USER_ADMIN: '用户管理员', CONTENT_ADMIN: '内容管理员', VIP: 'VIP', USER: '普通用户' }; return map[r] || r }

onMounted(() => { loadList(); loadRoles() })
</script>

<style scoped>
.user-mgmt { padding: 20px; max-width: 1400px; }

/* Stats */
.stats-row { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; margin-bottom: 20px; }
.stat-card { background: #fff; border-radius: 10px; padding: 20px 24px; display: flex; align-items: center; gap: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); transition: transform 0.15s, box-shadow 0.15s; cursor: default; border-top: 3px solid transparent; }
.stat-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
.stat-icon { width: 52px; height: 52px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #fff; flex-shrink: 0; }
.stat-value { font-size: 28px; font-weight: 700; color: #1e293b; line-height: 1.1; }
.stat-label { font-size: 13px; color: #64748b; margin-top: 4px; }

/* Panel */
.panel-card { background: #fff; border-radius: 10px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); margin-bottom: 16px; }

/* Search */
.search-bar { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
.search-input-wrap { flex: 1; min-width: 200px; position: relative; display: flex; align-items: center; }
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
.btn-danger-sm { background: #fff; color: #ef4444; border: 1px solid #fecaca; height: 32px; padding: 0 14px; border-radius: 6px; font-size: 13px; cursor: pointer; }
.btn-danger-sm:hover { background: #fef2f2; }
.btn-success-sm { background: #fff; color: #10b981; border: 1px solid #a7f3d0; height: 32px; padding: 0 14px; border-radius: 6px; font-size: 13px; cursor: pointer; }
.btn-success-sm:hover { background: #ecfdf5; }
.btn-warning-sm { background: #fff; color: #f59e0b; border: 1px solid #fde68a; height: 32px; padding: 0 14px; border-radius: 6px; font-size: 13px; cursor: pointer; }
.btn-warning-sm:hover { background: #fffbeb; }
.btn-text { background: none; border: none; color: #64748b; font-size: 13px; cursor: pointer; padding: 4px 8px; }
.btn-text:hover { color: #3b82f6; }

/* Batch bar */
.batch-bar { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 10px 16px; margin-bottom: 16px; display: flex; align-items: center; gap: 12px; font-size: 13px; color: #475569; }

/* Table */
.cell-username { font-weight: 600; color: #1e293b; }
.cell-secondary { color: #64748b; font-size: 13px; }
.role-tags { display: flex; gap: 4px; flex-wrap: wrap; }
.role-tag { margin: 0; }

/* Action buttons */
.action-btns { display: flex; gap: 6px; justify-content: center; }
.icon-btn { width: 30px; height: 30px; border-radius: 6px; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.15s; }
.icon-view { background: #eff6ff; color: #3b82f6; }
.icon-view:hover { background: #dbeafe; }
.icon-edit { background: #ecfdf5; color: #10b981; }
.icon-edit:hover { background: #d1fae5; }
.icon-warning { background: #fffbeb; color: #f59e0b; }
.icon-warning:hover { background: #fef3c7; }
.icon-success { background: #ecfdf5; color: #10b981; }
.icon-success:hover { background: #d1fae5; }
.icon-danger { background: #fef2f2; color: #ef4444; }
.icon-danger:hover { background: #fee2e2; }

/* Pagination */
.pagination-wrap { display: flex; justify-content: flex-end; margin-top: 20px; padding-top: 16px; border-top: 1px solid #f1f5f9; }

/* Dialog */
.form-dialog :deep(.el-dialog__header) { border-bottom: 1px solid #f1f5f9; padding: 20px 24px; }
.form-dialog :deep(.el-dialog__body) { padding: 24px; }
.form-dialog :deep(.el-dialog__footer) { border-top: 1px solid #f1f5f9; padding: 16px 24px; }
.role-checkboxes { display: flex; flex-wrap: wrap; gap: 12px; padding: 12px; background: #f8fafc; border-radius: 8px; }

/* Detail */
.detail-body { display: flex; flex-direction: column; gap: 20px; }
.detail-section h4 { font-size: 14px; font-weight: 600; color: #1e293b; margin: 0 0 12px; display: flex; align-items: center; gap: 8px; }
.detail-row { display: flex; align-items: center; padding: 8px 0; border-bottom: 1px solid #f1f5f9; }
.detail-row:last-child { border-bottom: none; }
.dt-label { width: 80px; color: #94a3b8; font-size: 13px; flex-shrink: 0; }
.dt-value { color: #1e293b; font-size: 14px; font-weight: 500; }
</style>

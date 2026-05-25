<template>
  <div class="log-management-container">
    <!-- Page Header -->
    <div class="page-header">
      <div class="header-title">
        <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
        <div>
          <h2>操作日志</h2>
          <p class="header-subtitle">查看和审计系统操作记录</p>
        </div>
      </div>
      <div class="header-actions">
        <el-button size="large" @click="refreshLogs" :loading="loading">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="23 4 23 10 17 10"/>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
          </svg>
          刷新
        </el-button>
      </div>
    </div>

    <!-- Filter Card -->
    <div class="filter-card">
      <div class="filter-header">
        <svg class="filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
        </svg>
        <span>筛选条件</span>
      </div>
      <div class="filter-row">
        <div class="filter-item">
          <label class="filter-label">操作用户</label>
          <el-input
            v-model="filters.username"
            placeholder="输入用户名"
            clearable
            size="large"
            @keyup.enter="handleSearch"
          />
        </div>
        <div class="filter-item">
          <label class="filter-label">操作类型</label>
          <el-select v-model="filters.operationType" placeholder="全部类型" clearable size="large">
            <el-option label="登录" value="login" />
            <el-option label="登出" value="logout" />
            <el-option label="查询" value="query" />
            <el-option label="修改" value="modify" />
            <el-option label="删除" value="delete" />
            <el-option label="配置" value="config" />
          </el-select>
        </div>
        <div class="filter-item">
          <label class="filter-label">结果状态</label>
          <el-select v-model="filters.resultStatus" placeholder="全部状态" clearable size="large">
            <el-option label="成功" value="success" />
            <el-option label="失败" value="failed" />
          </el-select>
        </div>
        <div class="filter-item filter-date-item">
          <label class="filter-label">开始日期</label>
          <el-date-picker
            v-model="filters.startDate"
            type="date"
            placeholder="选择开始日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            size="large"
          />
        </div>
        <div class="filter-item filter-date-item">
          <label class="filter-label">结束日期</label>
          <el-date-picker
            v-model="filters.endDate"
            type="date"
            placeholder="选择结束日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            size="large"
          />
        </div>
        <div class="filter-item filter-actions">
          <label class="filter-label">&nbsp;</label>
          <div class="action-buttons">
            <el-button type="primary" size="large" @click="handleSearch">
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              搜索
            </el-button>
            <el-button size="large" @click="resetFilters">
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="1 4 1 10 7 10"/>
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
              </svg>
              重置
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- Table Card -->
    <div class="table-card">
      <el-table
        :data="logList"
        v-loading="loading"
        style="width: 100%"
        stripe
        @sort-change="handleSortChange"
        :header-cell-style="{
          background: '#fafbfc',
          color: '#475569',
          fontWeight: '600',
          fontSize: '13px',
          borderBottom: '2px solid #f1f5f9'
        }"
      >
        <el-table-column prop="logId" label="日志ID" width="100" align="center">
          <template #default="{ row }">
            <span class="log-id">#{{ row.logId }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="username" label="用户名" width="130">
          <template #default="{ row }">
            <div class="user-cell">
              <svg class="user-avatar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span>{{ row.username }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="operationType" label="操作类型" width="110" align="center">
          <template #default="{ row }">
            <span class="type-badge" :class="'type-' + row.operationType">
              {{ getOperationTypeLabel(row.operationType) }}
            </span>
          </template>
        </el-table-column>

        <el-table-column prop="operationDesc" label="操作描述" min-width="220" show-overflow-tooltip>
          <template #default="{ row }">
            <span class="desc-text">{{ row.operationDesc }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="operationResult" label="操作结果" width="100" align="center">
          <template #default="{ row }">
            <span class="result-badge" :class="'result-' + row.operationResult">
              <svg v-if="row.operationResult === 'success'" class="result-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <svg v-else class="result-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              {{ getResultLabel(row.operationResult) }}
            </span>
          </template>
        </el-table-column>

        <el-table-column prop="ipAddress" label="IP地址" width="150" align="center">
          <template #default="{ row }">
            <code class="ip-code">{{ row.ipAddress }}</code>
          </template>
        </el-table-column>

        <el-table-column prop="operationTime" label="操作时间" width="180" sortable="custom" align="center">
          <template #default="{ row }">
            <div class="time-cell">
              <span class="time-main">{{ formatDateTime(row.operationTime) }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="100" fixed="right" align="center">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              plain
              @click="showDetail(row.logId)"
            >
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              详情
            </el-button>
          </template>
        </el-table-column>

        <template #empty>
          <div class="empty-state">
            <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            <p>暂无日志记录</p>
          </div>
        </template>
      </el-table>

      <!-- Pagination -->
      <div class="pagination-section">
        <div class="pagination-info">
          共 <strong>{{ pagination.total }}</strong> 条记录
        </div>
        <el-pagination
          v-model:current-page="pagination.page"
          v-model:page-size="pagination.size"
          :page-sizes="[10, 20, 50, 100]"
          :total="pagination.total"
          layout="sizes, prev, pager, next, jumper"
          background
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
        />
      </div>
    </div>

    <!-- Detail Dialog -->
    <el-dialog
      v-model="detailVisible"
      title="日志详情"
      width="720px"
      top="5vh"
      destroy-on-close
      class="detail-dialog"
    >
      <template #header>
        <div class="dialog-header">
          <svg class="dialog-header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
          <span>日志详情</span>
        </div>
      </template>

      <div v-if="detail" class="detail-body">
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-label">日志ID</span>
            <span class="detail-value">#{{ detail.logId }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">操作用户</span>
            <span class="detail-value">{{ detail.username }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">操作类型</span>
            <span class="type-badge" :class="'type-' + detail.operationType">
              {{ getOperationTypeLabel(detail.operationType) }}
            </span>
          </div>
          <div class="detail-item">
            <span class="detail-label">操作结果</span>
            <span class="result-badge" :class="'result-' + detail.operationResult">
              {{ getResultLabel(detail.operationResult) }}
            </span>
          </div>
          <div class="detail-item detail-full">
            <span class="detail-label">操作描述</span>
            <span class="detail-value">{{ detail.operationDesc }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">IP地址</span>
            <code class="ip-code">{{ detail.ipAddress }}</code>
          </div>
          <div class="detail-item">
            <span class="detail-label">操作时间</span>
            <span class="detail-value">{{ formatDateTime(detail.operationTime) }}</span>
          </div>
          <div class="detail-item detail-full">
            <span class="detail-label">User Agent</span>
            <span class="detail-value detail-mono">{{ detail.userAgent || '未知' }}</span>
          </div>
        </div>

        <div class="detail-section">
          <div class="detail-section-title">
            <svg class="detail-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="16 18 22 12 16 6"/>
              <polyline points="8 6 2 12 8 18"/>
            </svg>
            操作参数
          </div>
          <pre class="params-block"><code>{{ formatParams(detail.operationParams) }}</code></pre>
        </div>
      </div>

      <div v-else v-loading="detailLoading" class="detail-loading">
        <p>加载中...</p>
      </div>

      <template #footer>
        <el-button size="large" @click="detailVisible = false">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
          关闭
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { adminApi } from '@/services/api'

// State
const logList = ref([])
const loading = ref(false)
const detailVisible = ref(false)
const detailLoading = ref(false)
const detail = ref(null)

// Filters
const filters = reactive({
  username: '',
  operationType: '',
  resultStatus: '',
  startDate: '',
  endDate: ''
})

// Pagination
const pagination = reactive({
  page: 1,
  size: 20,
  total: 0,
  sortBy: 'operationTime',
  sortOrder: 'descending'
})

// Operation type label map
const operationTypeLabels = {
  login: '登录',
  logout: '登出',
  query: '查询',
  modify: '修改',
  delete: '删除',
  config: '配置'
}

const getOperationTypeLabel = (type) => {
  return operationTypeLabels[type] || type || '未知'
}

// Result label
const getResultLabel = (result) => {
  if (result === 'success') return '成功'
  if (result === 'failed') return '失败'
  return result || '未知'
}

// Format datetime
const formatDateTime = (val) => {
  if (!val) return '--'
  const parts = String(val).split(' ')
  if (parts.length >= 2) {
    return parts[0] + ' ' + parts[1]
  }
  const d = new Date(val)
  if (isNaN(d.getTime())) return val
  const Y = d.getFullYear()
  const M = String(d.getMonth() + 1).padStart(2, '0')
  const D = String(d.getDate()).padStart(2, '0')
  const h = String(d.getHours()).padStart(2, '0')
  const m = String(d.getMinutes()).padStart(2, '0')
  const s = String(d.getSeconds()).padStart(2, '0')
  return `${Y}-${M}-${D} ${h}:${m}:${s}`
}

// Format params JSON
const formatParams = (params) => {
  if (!params) return '无参数'
  try {
    if (typeof params === 'string') {
      return JSON.stringify(JSON.parse(params), null, 2)
    }
    return JSON.stringify(params, null, 2)
  } catch (e) {
    return String(params)
  }
}

// Build API params
const buildParams = () => {
  const p = {
    page: pagination.page,
    size: pagination.size,
    sortBy: pagination.sortBy,
    sortOrder: pagination.sortOrder
  }
  if (filters.username) p.username = filters.username
  if (filters.operationType) p.operationType = filters.operationType
  if (filters.resultStatus) p.resultStatus = filters.resultStatus
  if (filters.startDate) p.startDate = filters.startDate + ' 00:00:00'
  if (filters.endDate) p.endDate = filters.endDate + ' 23:59:59'
  return p
}

// Fetch log list
const getLogList = async () => {
  loading.value = true
  try {
    const res = await adminApi.getLogs(buildParams())
    if (res.data.code === 200) {
      const data = res.data.data
      logList.value = data.list || []
      pagination.total = data.total || 0
    } else {
      ElMessage.error(res.data.message || '获取日志列表失败')
    }
  } catch (e) {
    ElMessage.error('获取日志列表失败')
  } finally {
    loading.value = false
  }
}

// Search
const handleSearch = () => {
  pagination.page = 1
  getLogList()
}

// Reset filters
const resetFilters = () => {
  filters.username = ''
  filters.operationType = ''
  filters.resultStatus = ''
  filters.startDate = ''
  filters.endDate = ''
  pagination.page = 1
  getLogList()
}

// Refresh
const refreshLogs = () => {
  getLogList()
}

// Pagination handlers
const handlePageChange = (page) => {
  pagination.page = page
  getLogList()
}

const handleSizeChange = (size) => {
  pagination.size = size
  pagination.page = 1
  getLogList()
}

// Sort handler
const handleSortChange = ({ prop, order }) => {
  if (prop && order) {
    pagination.sortBy = prop
    pagination.sortOrder = order === 'ascending' ? 'ascending' : 'descending'
  } else {
    pagination.sortBy = 'operationTime'
    pagination.sortOrder = 'descending'
  }
  pagination.page = 1
  getLogList()
}

// Show detail
const showDetail = async (logId) => {
  detailVisible.value = true
  detail.value = null
  detailLoading.value = true
  try {
    const res = await adminApi.getLogDetail(logId)
    if (res.data.code === 200) {
      detail.value = res.data.data
    } else {
      ElMessage.error(res.data.message || '获取日志详情失败')
    }
  } catch (e) {
    ElMessage.error('获取日志详情失败')
  } finally {
    detailLoading.value = false
  }
}

onMounted(() => {
  getLogList()
})
</script>

<style scoped>
.log-management-container {
  padding: 24px;
  min-height: calc(100vh - 60px);
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

/* Page Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  color: #6366f1;
  background: linear-gradient(135deg, rgba(99,102,241,0.1), rgba(99,102,241,0.05));
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

.header-actions {
  display: flex;
  gap: 10px;
}

.btn-icon {
  width: 16px;
  height: 16px;
  margin-right: 6px;
  flex-shrink: 0;
}

/* Filter Card */
.filter-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03);
}

.filter-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 600;
  color: #334155;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f1f5f9;
}

.filter-icon {
  width: 18px;
  height: 18px;
  color: #6366f1;
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-end;
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 160px;
}

.filter-date-item {
  min-width: 200px;
  flex: 1.2;
}

.filter-actions {
  min-width: auto;
  flex: 0 0 auto;
}

.filter-label {
  font-size: 13px;
  font-weight: 500;
  color: #64748b;
  line-height: 1;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.filter-item :deep(.el-input__wrapper) {
  border-radius: 10px;
  box-shadow: 0 0 0 1px #e2e8f0 inset;
}

.filter-item :deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #cbd5e1 inset;
}

.filter-item :deep(.el-select) {
  width: 100%;
}

/* Table Card */
.table-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03);
}

/* Table customizations */
:deep(.el-table) {
  border-radius: 12px;
  overflow: hidden;
}

:deep(.el-table th.el-table__cell) {
  background-color: #fafbfc !important;
}

:deep(.el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell) {
  background-color: #fafbfc;
}

:deep(.el-table__body tr:hover > td.el-table__cell) {
  background-color: #f0f4ff;
}

.log-id {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 13px;
  color: #6366f1;
  font-weight: 500;
}

.user-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-avatar-icon {
  width: 18px;
  height: 18px;
  color: #94a3b8;
  flex-shrink: 0;
}

/* Type Badges */
.type-badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.01em;
  white-space: nowrap;
}

.type-login {
  background: rgba(59,130,246,0.1);
  color: #2563eb;
}

.type-logout {
  background: rgba(148,163,184,0.12);
  color: #64748b;
}

.type-query {
  background: rgba(16,185,129,0.1);
  color: #059669;
}

.type-modify {
  background: rgba(245,158,11,0.1);
  color: #d97706;
}

.type-delete {
  background: rgba(239,68,68,0.1);
  color: #dc2626;
}

.type-config {
  background: rgba(139,92,246,0.1);
  color: #7c3aed;
}

/* Result Badges */
.result-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.result-success {
  background: rgba(16,185,129,0.1);
  color: #059669;
}

.result-failed {
  background: rgba(239,68,68,0.1);
  color: #dc2626;
}

.result-icon {
  width: 13px;
  height: 13px;
  flex-shrink: 0;
}

.desc-text {
  font-size: 13px;
  color: #475569;
}

.ip-code {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 12px;
  background: #f1f5f9;
  padding: 2px 8px;
  border-radius: 4px;
  color: #475569;
}

.time-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.time-main {
  font-size: 13px;
  color: #475569;
}

/* Empty state */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 0;
  color: #94a3b8;
}

.empty-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 12px;
  opacity: 0.4;
}

.empty-state p {
  margin: 0;
  font-size: 14px;
}

/* Pagination */
.pagination-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #f1f5f9;
}

.pagination-info {
  font-size: 13px;
  color: #94a3b8;
}

.pagination-info strong {
  color: #475569;
}

/* Detail Dialog */
:deep(.detail-dialog .el-dialog) {
  border-radius: 16px;
  overflow: hidden;
}

:deep(.detail-dialog .el-dialog__header) {
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  margin: 0;
  padding: 20px 24px;
}

.dialog-header {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
}

.dialog-header-icon {
  width: 20px;
  height: 20px;
}

:deep(.detail-dialog .el-dialog__headerbtn .el-dialog__close) {
  color: #ffffff;
}

:deep(.detail-dialog .el-dialog__headerbtn .el-dialog__close:hover) {
  color: #e0e7ff;
}

:deep(.detail-dialog .el-dialog__body) {
  padding: 24px;
}

:deep(.detail-dialog .el-dialog__footer) {
  padding: 16px 24px;
  border-top: 1px solid #f1f5f9;
}

/* Detail Body */
.detail-body {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 16px;
  background: #f8fafc;
  border-radius: 10px;
}

.detail-full {
  grid-column: 1 / -1;
}

.detail-label {
  font-size: 12px;
  font-weight: 500;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.detail-value {
  font-size: 14px;
  color: #1e293b;
  font-weight: 500;
  word-break: break-all;
}

.detail-mono {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 12px;
  color: #64748b;
}

/* Detail Params Section */
.detail-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #334155;
}

.detail-section-icon {
  width: 16px;
  height: 16px;
  color: #6366f1;
}

.params-block {
  background: #1e293b;
  color: #e2e8f0;
  padding: 20px;
  border-radius: 12px;
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
  font-size: 13px;
  line-height: 1.7;
  max-height: 360px;
  overflow-y: auto;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-all;
}

.params-block code {
  font-family: inherit;
  color: inherit;
}

.detail-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: #94a3b8;
  font-size: 14px;
}

/* Button styles */
:deep(.el-button--primary) {
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  border: none;
  border-radius: 10px;
  font-weight: 500;
  padding: 10px 24px;
  transition: all 0.2s;
}

:deep(.el-button--primary:hover) {
  background: linear-gradient(135deg, #4f46e5, #4338ca);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(79,70,229,0.3);
}

:deep(.el-button--primary.is-plain) {
  background: rgba(99,102,241,0.08);
  color: #6366f1;
  border: 1px solid rgba(99,102,241,0.2);
}

:deep(.el-button--primary.is-plain:hover) {
  background: rgba(99,102,241,0.15);
  color: #4f46e5;
  border-color: rgba(99,102,241,0.4);
}

:deep(.el-button--default) {
  border-radius: 10px;
  font-weight: 500;
  padding: 10px 24px;
  border-color: #e2e8f0;
}

:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background-color: #6366f1;
}

/* Column sort icon */
:deep(.el-table .caret-wrapper) {
  color: #94a3b8;
}

:deep(.el-table .ascending .sort-caret.ascending) {
  border-bottom-color: #6366f1;
}

:deep(.el-table .descending .sort-caret.descending) {
  border-top-color: #6366f1;
}

/* Responsive */
@media (max-width: 768px) {
  .log-management-container {
    padding: 12px;
  }

  .page-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .filter-row {
    flex-direction: column;
  }

  .filter-item {
    min-width: 100%;
  }

  .filter-date-item {
    min-width: 100%;
  }

  .filter-actions {
    width: 100%;
  }

  .action-buttons {
    width: 100%;
  }

  .action-buttons .el-button {
    flex: 1;
    justify-content: center;
  }

  .table-card {
    padding: 12px;
    border-radius: 12px;
  }

  .pagination-section {
    flex-direction: column;
    gap: 12px;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }
}
</style>
<template>
  <div class="sos-management">
    <!-- Stats Row -->
    <div class="stats-grid">
      <div class="stat-card pending">
        <div class="stat-icon-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
        </div>
        <div class="stat-info">
          <div class="stat-value">{{ stats.pending }}</div>
          <div class="stat-label">待处理</div>
        </div>
      </div>
      <div class="stat-card processing">
        <div class="stat-icon-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M12 20h9"/>
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
          </svg>
        </div>
        <div class="stat-info">
          <div class="stat-value">{{ stats.processing }}</div>
          <div class="stat-label">处理中</div>
        </div>
      </div>
      <div class="stat-card resolved">
        <div class="stat-icon-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
        <div class="stat-info">
          <div class="stat-value">{{ stats.resolved }}</div>
          <div class="stat-label">已解决</div>
        </div>
      </div>
      <div class="stat-card total">
        <div class="stat-icon-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <div class="stat-info">
          <div class="stat-value">{{ stats.total }}</div>
          <div class="stat-label">总计</div>
        </div>
      </div>
    </div>

    <!-- Filter & Actions -->
    <div class="card filter-card">
      <div class="filter-row">
        <div class="filter-group">
          <span class="filter-label">状态筛选</span>
          <el-select v-model="filterStatus" placeholder="全部状态" clearable class="status-select" @change="onFilterChange">
            <el-option label="待处理" value="pending" />
            <el-option label="处理中" value="processing" />
            <el-option label="已解决" value="resolved" />
          </el-select>
        </div>
        <div class="filter-actions">
          <span v-if="autoRefresh" class="auto-refresh-tag">
            <svg class="pulse-dot" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="4"/>
            </svg>
            自动刷新中 (30s)
          </span>
          <button class="btn btn-ghost" @click="manualRefresh">
            <svg class="btn-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :class="{ spinning: listLoading }">
              <polyline points="23 4 23 10 17 10"/>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
            刷新
          </button>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="card table-card">
      <el-table :data="list" v-loading="listLoading" stripe class="premium-table" empty-text="暂无SOS记录">
        <el-table-column prop="id" label="ID" width="70" />
        <el-table-column prop="type" label="类型" width="100">
          <template #default="{ row }">
            <el-tag size="small" type="info">{{ row.type || '-' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="location" label="位置" min-width="160">
          <template #default="{ row }">
            <span class="truncate-text" :title="row.location">{{ row.location || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" min-width="180">
          <template #default="{ row }">
            <span class="truncate-text" :title="row.description">{{ row.description || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="联系电话" width="140" />
        <el-table-column label="状态" width="100" align="center">
          <template #default="{ row }">
            <span :class="['status-badge', 'status-' + row.status]">
              {{ statusLabel(row.status) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="170" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <div class="action-btns">
              <button class="action-btn view-btn" @click="openDetail(row)" title="查看详情">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </button>
              <el-select
                :model-value="row.status"
                class="inline-status-select"
                placeholder="状态"
                size="small"
                @change="(val) => handleStatusChange(row, val)"
              >
                <el-option label="待处理" value="pending" />
                <el-option label="处理中" value="processing" />
                <el-option label="已解决" value="resolved" />
              </el-select>
              <button class="action-btn alert-btn" @click="handleTriggerAlert(row)" title="发送预警">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
              </button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-wrap">
        <el-pagination
          v-model:current-page="pager.page"
          v-model:page-size="pager.size"
          :total="pager.total"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="fetchList"
          @size-change="fetchList"
        />
      </div>
    </div>

    <!-- Detail Dialog -->
    <el-dialog v-model="detailVisible" title="SOS 详情" width="580px" destroy-on-close class="premium-dialog">
      <div class="detail-grid" v-if="detail">
        <div class="detail-item">
          <span class="detail-label">ID</span>
          <span class="detail-value">{{ detail.id }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">类型</span>
          <span class="detail-value">{{ detail.type || '-' }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">位置</span>
          <span class="detail-value">{{ detail.location || '-' }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">联系电话</span>
          <span class="detail-value">{{ detail.phone || '-' }}</span>
        </div>
        <div class="detail-item full-width">
          <span class="detail-label">描述</span>
          <span class="detail-value">{{ detail.description || '-' }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">状态</span>
          <span :class="['status-badge', 'status-' + detail.status]">{{ statusLabel(detail.status) }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">创建时间</span>
          <span class="detail-value">{{ detail.createTime || '-' }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">是否公开</span>
          <span class="detail-value">{{ detail.isPublic ? '是' : '否' }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">已发送预警</span>
          <span class="detail-value">{{ detail.isAlerted ? '是' : '否' }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">预警时间</span>
          <span class="detail-value">{{ detail.alertTime || '-' }}</span>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <button class="btn btn-cancel" @click="detailVisible = false">关闭</button>
          <button v-if="detail && !detail.isAlerted" class="btn btn-warning" @click="handleTriggerAlert(detail); detailVisible = false">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            发送预警
          </button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import { sosAdminApi } from '@/services/api'

// ── Stats ──
const stats = reactive({ pending: 0, processing: 0, resolved: 0, total: 0 })

// ── Filters & List ──
const filterStatus = ref('')
const list = ref([])
const listLoading = ref(false)
const pager = reactive({ page: 1, size: 10, total: 0 })

// ── Auto-refresh ──
const autoRefresh = ref(true)
let refreshTimer = null

// ── Detail ──
const detailVisible = ref(false)
const detail = ref(null)

// ── Helpers ──
function statusLabel(s) {
  const map = { pending: '待处理', processing: '处理中', resolved: '已解决' }
  return map[s] || s || '-'
}

// ── Data Fetching ──
async function fetchStats() {
  try {
    const res = await sosAdminApi.getStats()
    if (res.code === 200) {
      Object.assign(stats, res.data)
    }
  } catch {
    // silently fail for stats
  }
}

async function fetchList() {
  listLoading.value = true
  try {
    const res = await sosAdminApi.getList({
      status: filterStatus.value || undefined,
      page: pager.page,
      size: pager.size,
    })
    if (res.code === 200) {
      list.value = res.data.records || res.data || []
      pager.total = res.data.total || 0
    } else {
      ElMessage.error(res.message || '获取列表失败')
    }
  } catch {
    ElMessage.error('获取列表失败')
  } finally {
    listLoading.value = false
  }
}

async function fetchAll() {
  await Promise.all([fetchStats(), fetchList()])
}

function onFilterChange() {
  pager.page = 1
  fetchList()
}

function manualRefresh() {
  fetchAll()
}

// ── Actions ──
async function handleStatusChange(row, newStatus) {
  try {
    const res = await sosAdminApi.updateStatus(row.id, newStatus)
    if (res.code === 200) {
      ElMessage.success(`状态已更新为「${statusLabel(newStatus)}」`)
      row.status = newStatus
      fetchStats()
    } else {
      ElMessage.error(res.message || '状态更新失败')
    }
  } catch {
    ElMessage.error('状态更新失败')
  }
}

async function handleTriggerAlert(row) {
  try {
    const res = await sosAdminApi.triggerAlert(row.id)
    if (res.code === 200) {
      ElMessage.success('预警已发送')
      row.isAlerted = true
      row.alertTime = new Date().toLocaleString()
    } else {
      ElMessage.error(res.message || '预警发送失败')
    }
  } catch {
    ElMessage.error('预警发送失败')
  }
}

async function openDetail(row) {
  try {
    const res = await sosAdminApi.getDetail(row.id)
    if (res.code === 200) {
      detail.value = res.data
      detailVisible.value = true
    } else {
      ElMessage.error(res.message || '获取详情失败')
    }
  } catch {
    ElMessage.error('获取详情失败')
  }
}

// ── Auto-refresh ──
function startAutoRefresh() {
  stopAutoRefresh()
  refreshTimer = setInterval(() => {
    if (autoRefresh.value) {
      fetchAll()
    }
  }, 30000)
}

function stopAutoRefresh() {
  if (refreshTimer) {
    clearInterval(refreshTimer)
    refreshTimer = null
  }
}

onMounted(() => {
  fetchAll()
  startAutoRefresh()
})

onUnmounted(() => {
  stopAutoRefresh()
})
</script>

<style scoped>
/* ── Variables ── */
.sos-management {
  --primary: #4f46e5;
  --primary-light: #eef2ff;
  --surface: #fff;
  --border: #e5e7eb;
  --text: #1f2937;
  --text-secondary: #6b7280;
  --danger: #ef4444;
  --danger-bg: #fef2f2;
  --warning: #f59e0b;
  --warning-bg: #fffbeb;
  --success: #10b981;
  --success-bg: #ecfdf5;
  --orange: #f97316;
  --orange-bg: #fff7ed;
  --radius: 12px;
  --radius-sm: 8px;
  --shadow-sm: 0 1px 2px rgba(0,0,0,.04);
  --shadow: 0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04);
}

/* ── Stats Grid ── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}
.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px 24px;
  box-shadow: var(--shadow);
  transition: box-shadow .2s, transform .2s;
}
.stat-card:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,.08); }
.stat-icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--radius-sm);
  flex-shrink: 0;
}
.stat-icon-box svg { width: 24px; height: 24px; }
.stat-card.pending .stat-icon-box { background: var(--danger-bg); color: var(--danger); }
.stat-card.processing .stat-icon-box { background: var(--orange-bg); color: var(--orange); }
.stat-card.resolved .stat-icon-box { background: var(--success-bg); color: var(--success); }
.stat-card.total .stat-icon-box { background: var(--primary-light); color: var(--primary); }
.stat-info { min-width: 0; }
.stat-value { font-size: 28px; font-weight: 700; color: var(--text); line-height: 1.2; }
.stat-label { font-size: 13px; color: var(--text-secondary); margin-top: 2px; }

/* ── Filter Card ── */
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}
.filter-card { margin-bottom: 16px; padding: 16px 20px; }
.table-card { padding: 0; overflow: hidden; }
.filter-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}
.filter-group { display: flex; align-items: center; gap: 10px; }
.filter-label { font-size: 13px; font-weight: 500; color: var(--text-secondary); white-space: nowrap; }
.status-select { width: 160px; }
.filter-actions { display: flex; align-items: center; gap: 12px; }

.auto-refresh-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--success);
  font-weight: 500;
}
.pulse-dot { width: 8px; height: 8px; animation: pulse 2s ease-in-out infinite; }
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: .3; }
}

/* ── Buttons ── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 18px;
  border: none;
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all .15s;
  white-space: nowrap;
}
.btn-cancel { background: #f3f4f6; color: var(--text-secondary); }
.btn-cancel:hover { background: #e5e7eb; }
.btn-ghost { background: transparent; color: var(--text-secondary); padding: 6px 12px; font-size: 13px; }
.btn-ghost:hover { background: #f3f4f6; color: var(--text); }
.btn-warning { background: var(--orange); color: #fff; }
.btn-warning:hover { background: #ea580c; }
.btn-icon { width: 16px; height: 16px; }
.btn-icon-sm { width: 14px; height: 14px; }
.spinning { animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Table ── */
.premium-table { width: 100%; }
.premium-table :deep(.el-table__header th) {
  background: #f9fafb;
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: .05em;
  border-bottom: 2px solid var(--border);
}
.truncate-text {
  display: block;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ── Status Badges ── */
.status-badge {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .03em;
}
.status-pending { background: var(--danger-bg); color: var(--danger); }
.status-processing { background: var(--orange-bg); color: var(--orange); }
.status-resolved { background: var(--success-bg); color: var(--success); }

/* ── Action Buttons ── */
.action-btns {
  display: flex;
  align-items: center;
  gap: 6px;
}
.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid transparent;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  transition: all .15s;
  flex-shrink: 0;
}
.action-btn svg { width: 15px; height: 15px; }
.view-btn { color: var(--primary); }
.view-btn:hover { background: var(--primary-light); border-color: var(--primary); }
.alert-btn { color: var(--warning); }
.alert-btn:hover { background: var(--warning-bg); border-color: var(--warning); }

.inline-status-select {
  width: 100px;
}
.inline-status-select :deep(.el-input__wrapper) {
  padding: 0 8px;
  height: 30px;
  font-size: 12px;
}

/* ── Pagination ── */
.pagination-wrap {
  display: flex;
  justify-content: flex-end;
  padding: 16px 20px;
  border-top: 1px solid var(--border);
}

/* ── Detail Dialog ── */
.premium-dialog :deep(.el-dialog__header) {
  border-bottom: 1px solid var(--border);
  padding: 20px 24px;
  margin: 0;
}
.premium-dialog :deep(.el-dialog__title) { font-size: 16px; font-weight: 600; }
.premium-dialog :deep(.el-dialog__body) { padding: 24px; }

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 24px;
}
.detail-item { display: flex; flex-direction: column; gap: 4px; }
.detail-item.full-width { grid-column: 1 / -1; }
.detail-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: .05em;
}
.detail-value { font-size: 14px; color: var(--text); word-break: break-all; }

.dialog-footer { display: flex; justify-content: flex-end; gap: 8px; padding-top: 8px; }

/* ── Responsive ── */
@media (max-width: 900px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 500px) {
  .stats-grid { grid-template-columns: 1fr; }
}
</style>

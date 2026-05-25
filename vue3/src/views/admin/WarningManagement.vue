<template>
  <div class="warning-management">
    <!-- Tab Header -->
    <div class="tab-header">
      <div class="tab-row">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          :class="['tab-btn', { active: activeTab === tab.key }]"
          @click="activeTab = tab.key; onTabSwitch(tab.key)"
        >
          <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" v-html="tab.icon"></svg>
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- ==================== Tab 1: Warning Areas ==================== -->
    <template v-if="activeTab === 'areas'">
      <div class="card table-card">
        <div class="section-header">
          <h3 class="section-title">预警区域列表</h3>
          <button class="btn btn-primary" @click="openAreaDialog()">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            新增区域
          </button>
        </div>
        <el-table :data="areaList" v-loading="areaLoading" stripe class="premium-table" empty-text="暂无预警区域">
          <el-table-column prop="areaName" label="区域名称" min-width="140">
            <template #default="{ row }">
              <span class="fw-600">{{ row.areaName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="预警等级" width="100" align="center">
            <template #default="{ row }">
              <span :class="['level-badge', 'level-' + row.warningLevel]">
                {{ levelLabel(row.warningLevel) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="描述" min-width="200">
            <template #default="{ row }">
              <span class="truncate-text" :title="row.description">{{ row.description || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="snakeSpecies" label="蛇种" width="140" />
          <el-table-column prop="createTime" label="创建时间" width="170" />
          <el-table-column label="操作" width="160" fixed="right">
            <template #default="{ row }">
              <div class="action-btns">
                <button class="action-btn edit-btn" @click="openAreaDialog(row)" title="编辑">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                    <path d="m15 5 4 4"/>
                  </svg>
                </button>
                <button class="action-btn delete-btn" @click="confirmDeleteArea(row)" title="删除">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                    <line x1="10" y1="11" x2="10" y2="17"/>
                    <line x1="14" y1="11" x2="14" y2="17"/>
                  </svg>
                </button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-wrap">
          <el-pagination
            v-model:current-page="areaPager.page"
            v-model:page-size="areaPager.size"
            :total="areaPager.total"
            :page-sizes="[10, 20, 50]"
            layout="total, sizes, prev, pager, next, jumper"
            @current-change="fetchAreaList"
            @size-change="fetchAreaList"
          />
        </div>
      </div>

      <!-- Area CRUD Dialog -->
      <el-dialog
        v-model="areaDialogVisible"
        :title="areaFormMode === 'create' ? '新增预警区域' : '编辑预警区域'"
        width="560px"
        destroy-on-close
        class="premium-dialog"
      >
        <el-form ref="areaFormRef" :model="areaForm" :rules="areaRules" label-width="100px" class="premium-form">
          <el-form-item label="区域名称" prop="areaName">
            <el-input v-model="areaForm.areaName" placeholder="请输入区域名称" />
          </el-form-item>
          <el-form-item label="预警等级" prop="warningLevel">
            <el-select v-model="areaForm.warningLevel" placeholder="请选择预警等级" style="width:100%">
              <el-option label="一级预警 (低)" :value="1" />
              <el-option label="二级预警 (中)" :value="2" />
              <el-option label="三级预警 (高)" :value="3" />
              <el-option label="四级预警 (严重)" :value="4" />
            </el-select>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="areaForm.description" type="textarea" :rows="3" placeholder="请输入区域描述" />
          </el-form-item>
          <el-form-item label="蛇种" prop="snakeSpecies">
            <el-input v-model="areaForm.snakeSpecies" placeholder="请输入蛇种名称" />
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <button class="btn btn-cancel" @click="areaDialogVisible = false">取消</button>
            <button class="btn btn-primary" @click="submitAreaForm">保存</button>
          </div>
        </template>
      </el-dialog>
    </template>

    <!-- ==================== Tab 2: Warning Records ==================== -->
    <template v-if="activeTab === 'records'">
      <div class="card table-card">
        <div class="section-header">
          <h3 class="section-title">预警记录</h3>
          <button class="btn btn-ghost" @click="fetchRecordList">
            <svg class="btn-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :class="{ spinning: recordLoading }">
              <polyline points="23 4 23 10 17 10"/>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
            刷新
          </button>
        </div>
        <el-table :data="recordList" v-loading="recordLoading" stripe class="premium-table" empty-text="暂无预警记录">
          <el-table-column prop="areaName" label="区域名称" min-width="140" />
          <el-table-column prop="warningContent" label="预警内容" min-width="220">
            <template #default="{ row }">
              <span class="truncate-text" :title="row.warningContent">{{ row.warningContent || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="warningTime" label="预警时间" width="170" />
          <el-table-column label="有效性" width="90" align="center">
            <template #default="{ row }">
              <span :class="['status-tag', row.isValid ? 'valid' : 'invalid']">
                {{ row.isValid ? '有效' : '无效' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="等级" width="90" align="center">
            <template #default="{ row }">
              <span :class="['level-badge-sm', 'level-' + row.level]">
                {{ levelLabel(row.level) }}
              </span>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-wrap">
          <el-pagination
            v-model:current-page="recordPager.page"
            v-model:page-size="recordPager.size"
            :total="recordPager.total"
            :page-sizes="[10, 20, 50]"
            layout="total, sizes, prev, pager, next, jumper"
            @current-change="fetchRecordList"
            @size-change="fetchRecordList"
          />
        </div>
      </div>
    </template>

    <!-- ==================== Tab 3: Warning Rules ==================== -->
    <template v-if="activeTab === 'rules'">
      <div class="card table-card">
        <div class="section-header">
          <h3 class="section-title">预警规则</h3>
          <button class="btn btn-ghost" @click="fetchRuleList">
            <svg class="btn-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :class="{ spinning: ruleLoading }">
              <polyline points="23 4 23 10 17 10"/>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
            刷新
          </button>
        </div>
        <el-table :data="ruleList" v-loading="ruleLoading" stripe class="premium-table" empty-text="暂无预警规则">
          <el-table-column prop="snakeName" label="蛇种" width="160" />
          <el-table-column prop="activeThreshold" label="活跃阈值" width="120" align="center">
            <template #default="{ row }">
              <span class="threshold-value">{{ row.activeThreshold }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="warningMessage" label="预警消息" min-width="280">
            <template #default="{ row }">
              <span class="truncate-text" :title="row.warningMessage">{{ row.warningMessage || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" fixed="right">
            <template #default="{ row }">
              <button class="action-btn edit-btn" @click="openRuleDialog(row)" title="编辑阈值">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                  <path d="m15 5 4 4"/>
                </svg>
              </button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-wrap">
          <el-pagination
            v-model:current-page="rulePager.page"
            v-model:page-size="rulePager.size"
            :total="rulePager.total"
            :page-sizes="[10, 20, 50]"
            layout="total, sizes, prev, pager, next, jumper"
            @current-change="fetchRuleList"
            @size-change="fetchRuleList"
          />
        </div>
      </div>

      <!-- Rule Edit Dialog -->
      <el-dialog v-model="ruleDialogVisible" title="编辑预警规则" width="500px" destroy-on-close class="premium-dialog">
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="ruleRules" label-width="100px" class="premium-form">
          <el-form-item label="活跃阈值" prop="activeThreshold">
            <el-input-number v-model="ruleForm.activeThreshold" :min="0" :step="1" style="width:100%" placeholder="请输入阈值" />
          </el-form-item>
          <el-form-item label="预警消息" prop="warningMessage">
            <el-input v-model="ruleForm.warningMessage" type="textarea" :rows="3" placeholder="请输入预警消息内容" />
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <button class="btn btn-cancel" @click="ruleDialogVisible = false">取消</button>
            <button class="btn btn-primary" @click="submitRuleForm">保存</button>
          </div>
        </template>
      </el-dialog>
    </template>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { warningAdminApi } from '@/services/api'

// ── Tab State ──
const activeTab = ref('areas')
const tabs = [
  {
    key: 'areas',
    label: '预警区域',
    icon: '<path d="M21 10.5V5l-9-4-9 4v5.5a9 9 0 0 0 9 9.5 9 9 0 0 0 9-9.5Z"/>',
  },
  {
    key: 'records',
    label: '预警记录',
    icon: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  },
  {
    key: 'rules',
    label: '预警规则',
    icon: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  },
]

function levelLabel(level) {
  const map = { 1: '一级', 2: '二级', 3: '三级', 4: '四级' }
  return map[level] || '未知'
}

function onTabSwitch(key) {
  if (key === 'areas') fetchAreaList()
  else if (key === 'records') fetchRecordList()
  else if (key === 'rules') fetchRuleList()
}

// ════════════════════════════════════════
// Tab 1: Warning Areas
// ════════════════════════════════════════
const areaList = ref([])
const areaLoading = ref(false)
const areaPager = reactive({ page: 1, size: 10, total: 0 })

const areaDialogVisible = ref(false)
const areaFormMode = ref('create')
const areaFormRef = ref(null)
const areaForm = reactive({
  id: null,
  areaName: '',
  warningLevel: 1,
  description: '',
  snakeSpecies: '',
})

const areaRules = {
  areaName: [{ required: true, message: '请输入区域名称', trigger: 'blur' }],
  warningLevel: [{ required: true, message: '请选择预警等级', trigger: 'change' }],
}

function resetAreaForm() {
  Object.assign(areaForm, { id: null, areaName: '', warningLevel: 1, description: '', snakeSpecies: '' })
  areaFormRef.value?.resetFields()
}

async function fetchAreaList() {
  areaLoading.value = true
  try {
    const res = await warningAdminApi.getAreas({ page: areaPager.page, size: areaPager.size })
    if (res.code === 200) {
      areaList.value = res.data.records || res.data || []
      areaPager.total = res.data.total || 0
    } else {
      ElMessage.error(res.message || '获取区域列表失败')
    }
  } catch {
    ElMessage.error('获取区域列表失败')
  } finally {
    areaLoading.value = false
  }
}

async function openAreaDialog(row) {
  resetAreaForm()
  if (row && row.id) {
    areaFormMode.value = 'edit'
    try {
      const res = await warningAdminApi.getArea(row.id)
      if (res.code === 200) {
        const d = res.data
        Object.assign(areaForm, {
          id: d.id,
          areaName: d.areaName || '',
          warningLevel: d.warningLevel || 1,
          description: d.description || '',
          snakeSpecies: d.snakeSpecies || '',
        })
      } else {
        ElMessage.error(res.message || '获取区域详情失败')
        return
      }
    } catch {
      ElMessage.error('获取区域详情失败')
      return
    }
  } else {
    areaFormMode.value = 'create'
  }
  areaDialogVisible.value = true
}

async function submitAreaForm() {
  try { await areaFormRef.value.validate() } catch { return }
  try {
    const payload = {
      areaName: areaForm.areaName,
      warningLevel: areaForm.warningLevel,
      description: areaForm.description,
      snakeSpecies: areaForm.snakeSpecies,
    }
    let res
    if (areaFormMode.value === 'create') {
      res = await warningAdminApi.createArea(payload)
    } else {
      res = await warningAdminApi.updateArea(areaForm.id, payload)
    }
    if (res.code === 200) {
      ElMessage.success(areaFormMode.value === 'create' ? '新增成功' : '更新成功')
      areaDialogVisible.value = false
      fetchAreaList()
    } else {
      ElMessage.error(res.message || '操作失败')
    }
  } catch {
    ElMessage.error('操作失败')
  }
}

async function confirmDeleteArea(row) {
  try {
    await ElMessageBox.confirm(`确定要删除区域「${row.areaName}」吗？`, '确认删除', {
      confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning',
    })
  } catch { return }
  try {
    const res = await warningAdminApi.deleteArea(row.id)
    if (res.code === 200) {
      ElMessage.success('删除成功')
      fetchAreaList()
    } else {
      ElMessage.error(res.message || '删除失败')
    }
  } catch {
    ElMessage.error('删除失败')
  }
}

// ════════════════════════════════════════
// Tab 2: Warning Records
// ════════════════════════════════════════
const recordList = ref([])
const recordLoading = ref(false)
const recordPager = reactive({ page: 1, size: 10, total: 0 })

async function fetchRecordList() {
  recordLoading.value = true
  try {
    const res = await warningAdminApi.getRecords({ page: recordPager.page, size: recordPager.size })
    if (res.code === 200) {
      recordList.value = res.data.records || res.data || []
      recordPager.total = res.data.total || 0
    } else {
      ElMessage.error(res.message || '获取记录列表失败')
    }
  } catch {
    ElMessage.error('获取记录列表失败')
  } finally {
    recordLoading.value = false
  }
}

// ════════════════════════════════════════
// Tab 3: Warning Rules
// ════════════════════════════════════════
const ruleList = ref([])
const ruleLoading = ref(false)
const rulePager = reactive({ page: 1, size: 10, total: 0 })

const ruleDialogVisible = ref(false)
const ruleFormRef = ref(null)
const ruleForm = reactive({ id: null, activeThreshold: null, warningMessage: '' })

const ruleRules = {
  activeThreshold: [{ required: true, message: '请输入活跃阈值', trigger: 'blur' }],
  warningMessage: [{ required: true, message: '请输入预警消息', trigger: 'blur' }],
}

async function fetchRuleList() {
  ruleLoading.value = true
  try {
    const res = await warningAdminApi.getRules({ page: rulePager.page, size: rulePager.size })
    if (res.code === 200) {
      ruleList.value = res.data.records || res.data || []
      rulePager.total = res.data.total || 0
    } else {
      ElMessage.error(res.message || '获取规则列表失败')
    }
  } catch {
    ElMessage.error('获取规则列表失败')
  } finally {
    ruleLoading.value = false
  }
}

function openRuleDialog(row) {
  ruleForm.id = row.id
  ruleForm.activeThreshold = row.activeThreshold ?? null
  ruleForm.warningMessage = row.warningMessage || ''
  ruleFormRef.value?.resetFields()
  ruleDialogVisible.value = true
}

async function submitRuleForm() {
  try { await ruleFormRef.value.validate() } catch { return }
  try {
    const res = await warningAdminApi.updateRule(ruleForm.id, {
      activeThreshold: ruleForm.activeThreshold,
      warningMessage: ruleForm.warningMessage,
    })
    if (res.code === 200) {
      ElMessage.success('更新成功')
      ruleDialogVisible.value = false
      fetchRuleList()
    } else {
      ElMessage.error(res.message || '更新失败')
    }
  } catch {
    ElMessage.error('更新失败')
  }
}

onMounted(() => {
  fetchAreaList()
})
</script>

<style scoped>
/* ── Variables ── */
.warning-management {
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
  --radius: 12px;
  --radius-sm: 8px;
  --shadow-sm: 0 1px 2px rgba(0,0,0,.04);
  --shadow: 0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04);
}

/* ── Tab Header ── */
.tab-header { margin-bottom: 20px; }
.tab-row {
  display: flex;
  gap: 4px;
  background: #f3f4f6;
  padding: 4px;
  border-radius: var(--radius);
}
.tab-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
  border-radius: calc(var(--radius) - 4px);
  cursor: pointer;
  transition: all .2s;
}
.tab-btn:hover { color: var(--text); }
.tab-btn.active {
  background: var(--surface);
  color: var(--primary);
  box-shadow: var(--shadow-sm);
}
.tab-icon { width: 18px; height: 18px; flex-shrink: 0; }

/* ── Cards ── */
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}
.table-card { padding: 0; overflow: hidden; }
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px 12px;
}
.section-title { font-size: 15px; font-weight: 600; color: var(--text); margin: 0; }

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
.btn-primary { background: var(--primary); color: #fff; }
.btn-primary:hover { background: #4338ca; }
.btn-cancel { background: #f3f4f6; color: var(--text-secondary); }
.btn-cancel:hover { background: #e5e7eb; }
.btn-ghost { background: transparent; color: var(--text-secondary); padding: 6px 12px; font-size: 13px; }
.btn-ghost:hover { background: #f3f4f6; color: var(--text); }
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
.fw-600 { font-weight: 600; color: var(--text); }
.truncate-text {
  display: block;
  max-width: 260px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ── Level Badges ── */
.level-badge {
  display: inline-block;
  padding: 3px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}
.level-badge-sm {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
}
.level-1 { background: #dbeafe; color: #2563eb; }
.level-2 { background: #fef3c7; color: #d97706; }
.level-3 { background: #ffedd5; color: #ea580c; }
.level-4 { background: #fee2e2; color: #dc2626; }

.status-tag {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}
.status-tag.valid { background: var(--success-bg); color: var(--success); }
.status-tag.invalid { background: #f3f4f6; color: var(--text-secondary); }

.threshold-value { font-weight: 700; font-size: 15px; color: var(--text); }

/* ── Action Buttons ── */
.action-btns { display: flex; gap: 4px; }
.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px; height: 32px;
  border: 1px solid transparent;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  transition: all .15s;
}
.action-btn svg { width: 15px; height: 15px; }
.edit-btn { color: var(--primary); }
.edit-btn:hover { background: var(--primary-light); border-color: var(--primary); }
.delete-btn { color: var(--danger); }
.delete-btn:hover { background: var(--danger-bg); border-color: var(--danger); }

/* ── Pagination ── */
.pagination-wrap {
  display: flex;
  justify-content: flex-end;
  padding: 16px 20px;
  border-top: 1px solid var(--border);
}

/* ── Dialog ── */
.premium-dialog :deep(.el-dialog__header) {
  border-bottom: 1px solid var(--border);
  padding: 20px 24px;
  margin: 0;
}
.premium-dialog :deep(.el-dialog__title) { font-size: 16px; font-weight: 600; }
.premium-dialog :deep(.el-dialog__body) { padding: 24px; }
.dialog-footer { display: flex; justify-content: flex-end; gap: 8px; padding-top: 8px; }
.premium-form :deep(.el-form-item__label) { font-weight: 500; color: var(--text-secondary); font-size: 13px; }
</style>

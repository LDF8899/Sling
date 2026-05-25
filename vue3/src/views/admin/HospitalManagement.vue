<template>
  <div class="hospital-management">
    <!-- Tab Header -->
    <div class="tab-header">
      <div class="tab-row">
        <button
          :class="['tab-btn', { active: activeTab === 'hospital' }]"
          @click="activeTab = 'hospital'"
        >
          <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z"/>
            <path d="M12 8v8"/>
            <path d="M8 12h8"/>
          </svg>
          医院管理
        </button>
        <button
          :class="['tab-btn', { active: activeTab === 'serum' }]"
          @click="activeTab = 'serum'; fetchSerumList()"
        >
          <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M12 2L9 7l-5 .74L7 11.5l-1 5.5 6-3 6 3-1-5.5 3-3.76L15 7z"/>
          </svg>
          血清库存
        </button>
      </div>
    </div>

    <!-- ==================== Tab 1: Hospital Management ==================== -->
    <template v-if="activeTab === 'hospital'">
      <!-- Search & Actions -->
      <div class="card search-card">
        <div class="search-row">
          <div class="search-inputs">
            <el-input
              v-model="hospitalSearch.keyword"
              placeholder="搜索医院名称或地址..."
              clearable
              class="search-input"
              @keyup.enter="fetchHospitalList"
            >
              <template #prefix>
                <svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
              </template>
            </el-input>
            <el-select v-model="hospitalSearch.hospitalType" placeholder="医院类型" clearable class="type-select">
              <el-option label="综合医院" value="综合医院" />
              <el-option label="专科医院" value="专科医院" />
              <el-option label="社区卫生中心" value="社区卫生中心" />
              <el-option label="急救中心" value="急救中心" />
            </el-select>
          </div>
          <button class="btn btn-primary" @click="openHospitalDialog()">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            新增医院
          </button>
        </div>
      </div>

      <!-- Hospital Table -->
      <div class="card table-card">
        <el-table :data="hospitalList" v-loading="hospitalLoading" stripe class="premium-table" empty-text="暂无医院数据">
          <el-table-column prop="hospitalName" label="医院名称" min-width="160">
            <template #default="{ row }">
              <span class="hospital-name">{{ row.hospitalName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="地址" min-width="200">
            <template #default="{ row }">
              <span class="truncate-text" :title="row.address">{{ row.address || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="hospitalType" label="类型" width="120">
            <template #default="{ row }">
              <el-tag size="small" type="info">{{ row.hospitalType || '-' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="contactInfo" label="联系方式" width="150">
            <template #default="{ row }">
              <span>{{ row.contactInfo || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="抗蛇毒血清" width="100" align="center">
            <template #default="{ row }">
              <span :class="['badge-dot', row.serpentAvailability === 1 ? 'badge-yes' : 'badge-no']">
                {{ row.serpentAvailability === 1 ? '有' : '无' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="蛇伤救治" width="100" align="center">
            <template #default="{ row }">
              <span :class="['badge-dot', row.snakeVenomTreatment === 1 ? 'badge-yes' : 'badge-no']">
                {{ row.snakeVenomTreatment === 1 ? '是' : '否' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="160" fixed="right">
            <template #default="{ row }">
              <div class="action-btns">
                <button class="action-btn edit-btn" @click="openHospitalDialog(row)" title="编辑">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                    <path d="m15 5 4 4"/>
                  </svg>
                </button>
                <button class="action-btn delete-btn" @click="confirmDeleteHospital(row)" title="删除">
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
            v-model:current-page="hospitalPager.page"
            v-model:page-size="hospitalPager.size"
            :total="hospitalPager.total"
            :page-sizes="[10, 20, 50]"
            layout="total, sizes, prev, pager, next, jumper"
            @current-change="fetchHospitalList"
            @size-change="fetchHospitalList"
          />
        </div>
      </div>

      <!-- Hospital CRUD Dialog -->
      <el-dialog
        v-model="hospitalDialogVisible"
        :title="hospitalFormMode === 'create' ? '新增医院' : '编辑医院信息'"
        width="640px"
        destroy-on-close
        class="premium-dialog"
      >
        <el-form ref="hospitalFormRef" :model="hospitalForm" :rules="hospitalRules" label-width="110px" class="premium-form">
          <el-form-item label="医院名称" prop="hospitalName">
            <el-input v-model="hospitalForm.hospitalName" placeholder="请输入医院名称" />
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="hospitalForm.address" placeholder="请输入地址" />
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="经度" prop="latitude">
                <el-input v-model.number="hospitalForm.latitude" placeholder="纬度" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="纬度" prop="longitude">
                <el-input v-model.number="hospitalForm.longitude" placeholder="经度" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="联系方式" prop="contactInfo">
            <el-input v-model="hospitalForm.contactInfo" placeholder="电话或其他联系方式" />
          </el-form-item>
          <el-form-item label="医院类型" prop="hospitalType">
            <el-select v-model="hospitalForm.hospitalType" placeholder="请选择医院类型" style="width:100%">
              <el-option label="综合医院" value="综合医院" />
              <el-option label="专科医院" value="专科医院" />
              <el-option label="社区卫生中心" value="社区卫生中心" />
              <el-option label="急救中心" value="急救中心" />
            </el-select>
          </el-form-item>
          <el-form-item label="急诊科">
            <el-checkbox v-model="hospitalForm.emergencyDepartment">该医院设有急诊科</el-checkbox>
          </el-form-item>
          <el-form-item label="蛇毒关键词">
            <el-input
              v-model="hospitalForm.snakeVenomKeywords"
              type="textarea"
              :rows="2"
              placeholder="多个关键词用逗号分隔"
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <button class="btn btn-cancel" @click="hospitalDialogVisible = false">取消</button>
            <button class="btn btn-primary" @click="submitHospitalForm">保存</button>
          </div>
        </template>
      </el-dialog>
    </template>

    <!-- ==================== Tab 2: Serum Inventory ==================== -->
    <template v-if="activeTab === 'serum'">
      <div class="card table-card">
        <div class="section-header">
          <h3 class="section-title">血清库存列表</h3>
          <button class="btn btn-ghost" @click="fetchSerumList">
            <svg class="btn-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :class="{ spinning: serumLoading }">
              <polyline points="23 4 23 10 17 10"/>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
            刷新
          </button>
        </div>
        <el-table :data="serumList" v-loading="serumLoading" stripe class="premium-table" empty-text="暂无血清库存数据">
          <el-table-column prop="hospitalName" label="医院名称" min-width="160" />
          <el-table-column prop="snakeName" label="蛇种" min-width="140" />
          <el-table-column prop="serumAmount" label="库存数量" width="120" align="center">
            <template #default="{ row }">
              <span :class="['serum-amount', { 'low-stock': row.serumAmount < 10 }]">{{ row.serumAmount }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="serumExpiryDate" label="有效期" width="140" align="center">
            <template #default="{ row }">
              <span>{{ row.serumExpiryDate || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" fixed="right">
            <template #default="{ row }">
              <button class="action-btn edit-btn" @click="openSerumDialog(row)" title="编辑库存">
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
            v-model:current-page="serumPager.page"
            v-model:page-size="serumPager.size"
            :total="serumPager.total"
            :page-sizes="[10, 20, 50]"
            layout="total, sizes, prev, pager, next, jumper"
            @current-change="fetchSerumList"
            @size-change="fetchSerumList"
          />
        </div>
      </div>

      <!-- Serum Edit Dialog -->
      <el-dialog v-model="serumDialogVisible" title="编辑血清库存" width="480px" destroy-on-close class="premium-dialog">
        <el-form ref="serumFormRef" :model="serumForm" :rules="serumRules" label-width="100px" class="premium-form">
          <el-form-item label="库存数量" prop="serumAmount">
            <el-input-number v-model="serumForm.serumAmount" :min="0" style="width:100%" />
          </el-form-item>
          <el-form-item label="有效期" prop="serumExpiryDate">
            <el-date-picker
              v-model="serumForm.serumExpiryDate"
              type="date"
              placeholder="选择日期"
              value-format="YYYY-MM-DD"
              style="width:100%"
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <button class="btn btn-cancel" @click="serumDialogVisible = false">取消</button>
            <button class="btn btn-primary" @click="submitSerumForm">保存</button>
          </div>
        </template>
      </el-dialog>
    </template>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { hospitalAdminApi } from '@/services/api'

// ── Tab State ──
const activeTab = ref('hospital')

// ════════════════════════════════════════
// Tab 1: Hospital Management
// ════════════════════════════════════════
const hospitalList = ref([])
const hospitalLoading = ref(false)
const hospitalPager = reactive({ page: 1, size: 10, total: 0 })
const hospitalSearch = reactive({ keyword: '', hospitalType: '' })

const hospitalDialogVisible = ref(false)
const hospitalFormMode = ref('create')
const hospitalFormRef = ref(null)
const hospitalForm = reactive({
  id: null,
  hospitalName: '',
  address: '',
  latitude: null,
  longitude: null,
  contactInfo: '',
  hospitalType: '',
  emergencyDepartment: false,
  snakeVenomKeywords: '',
})

const hospitalRules = {
  hospitalName: [{ required: true, message: '请输入医院名称', trigger: 'blur' }],
  address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
  hospitalType: [{ required: true, message: '请选择医院类型', trigger: 'change' }],
}

function resetHospitalForm() {
  Object.assign(hospitalForm, {
    id: null,
    hospitalName: '',
    address: '',
    latitude: null,
    longitude: null,
    contactInfo: '',
    hospitalType: '',
    emergencyDepartment: false,
    snakeVenomKeywords: '',
  })
  hospitalFormRef.value?.resetFields()
}

async function fetchHospitalList() {
  hospitalLoading.value = true
  try {
    const res = await hospitalAdminApi.getList({
      page: hospitalPager.page,
      size: hospitalPager.size,
      keyword: hospitalSearch.keyword || undefined,
      hospitalType: hospitalSearch.hospitalType || undefined,
    })
    if (res.code === 200) {
      hospitalList.value = res.data.records || res.data || []
      hospitalPager.total = res.data.total || 0
    } else {
      ElMessage.error(res.message || '获取医院列表失败')
    }
  } catch {
    ElMessage.error('网络错误，获取医院列表失败')
  } finally {
    hospitalLoading.value = false
  }
}

async function openHospitalDialog(row) {
  resetHospitalForm()
  if (row && row.id) {
    hospitalFormMode.value = 'edit'
    try {
      const res = await hospitalAdminApi.getHospital(row.id)
      if (res.code === 200) {
        const d = res.data
        Object.assign(hospitalForm, {
          id: d.id,
          hospitalName: d.hospitalName || '',
          address: d.address || '',
          latitude: d.latitude ?? null,
          longitude: d.longitude ?? null,
          contactInfo: d.contactInfo || '',
          hospitalType: d.hospitalType || '',
          emergencyDepartment: !!d.emergencyDepartment,
          snakeVenomKeywords: d.snakeVenomKeywords || '',
        })
      } else {
        ElMessage.error(res.message || '获取医院详情失败')
        return
      }
    } catch {
      ElMessage.error('获取医院详情失败')
      return
    }
  } else {
    hospitalFormMode.value = 'create'
  }
  hospitalDialogVisible.value = true
}

async function submitHospitalForm() {
  try {
    await hospitalFormRef.value.validate()
  } catch { return }
  try {
    const payload = {
      hospitalName: hospitalForm.hospitalName,
      address: hospitalForm.address,
      latitude: hospitalForm.latitude,
      longitude: hospitalForm.longitude,
      contactInfo: hospitalForm.contactInfo,
      hospitalType: hospitalForm.hospitalType,
      emergencyDepartment: hospitalForm.emergencyDepartment ? 1 : 0,
      snakeVenomKeywords: hospitalForm.snakeVenomKeywords,
    }
    let res
    if (hospitalFormMode.value === 'create') {
      res = await hospitalAdminApi.createHospital(payload)
    } else {
      res = await hospitalAdminApi.updateHospital(hospitalForm.id, payload)
    }
    if (res.code === 200) {
      ElMessage.success(hospitalFormMode.value === 'create' ? '新增成功' : '更新成功')
      hospitalDialogVisible.value = false
      fetchHospitalList()
    } else {
      ElMessage.error(res.message || '操作失败')
    }
  } catch {
    ElMessage.error('操作失败')
  }
}

async function confirmDeleteHospital(row) {
  try {
    await ElMessageBox.confirm(`确定要删除医院「${row.hospitalName}」吗？此操作为软删除。`, '确认删除', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
  } catch { return }
  try {
    const res = await hospitalAdminApi.deleteHospital(row.id)
    if (res.code === 200) {
      ElMessage.success('删除成功')
      fetchHospitalList()
    } else {
      ElMessage.error(res.message || '删除失败')
    }
  } catch {
    ElMessage.error('删除失败')
  }
}

// ════════════════════════════════════════
// Tab 2: Serum Inventory
// ════════════════════════════════════════
const serumList = ref([])
const serumLoading = ref(false)
const serumPager = reactive({ page: 1, size: 10, total: 0 })

const serumDialogVisible = ref(false)
const serumFormRef = ref(null)
const serumForm = reactive({ inventoryId: null, serumAmount: 0, serumExpiryDate: '' })

const serumRules = {
  serumAmount: [{ required: true, message: '请输入库存数量', trigger: 'blur' }],
}

async function fetchSerumList() {
  serumLoading.value = true
  try {
    const res = await hospitalAdminApi.getSerumList({
      page: serumPager.page,
      size: serumPager.size,
    })
    if (res.code === 200) {
      serumList.value = res.data.records || res.data || []
      serumPager.total = res.data.total || 0
    } else {
      ElMessage.error(res.message || '获取血清库存列表失败')
    }
  } catch {
    ElMessage.error('获取血清库存列表失败')
  } finally {
    serumLoading.value = false
  }
}

function openSerumDialog(row) {
  serumForm.inventoryId = row.inventoryId ?? row.id
  serumForm.serumAmount = row.serumAmount ?? 0
  serumForm.serumExpiryDate = row.serumExpiryDate || ''
  serumFormRef.value?.resetFields()
  serumDialogVisible.value = true
}

async function submitSerumForm() {
  try {
    await serumFormRef.value.validate()
  } catch { return }
  try {
    const res = await hospitalAdminApi.updateSerum(serumForm.inventoryId, {
      serumAmount: serumForm.serumAmount,
      serumExpiryDate: serumForm.serumExpiryDate,
    })
    if (res.code === 200) {
      ElMessage.success('更新成功')
      serumDialogVisible.value = false
      fetchSerumList()
    } else {
      ElMessage.error(res.message || '更新失败')
    }
  } catch {
    ElMessage.error('更新失败')
  }
}

onMounted(() => {
  fetchHospitalList()
})
</script>

<style scoped>
/* ── Variables ── */
.hospital-management {
  --primary: #4f46e5;
  --primary-light: #eef2ff;
  --surface: #fff;
  --border: #e5e7eb;
  --text: #1f2937;
  --text-secondary: #6b7280;
  --danger: #ef4444;
  --danger-bg: #fef2f2;
  --success: #10b981;
  --success-bg: #ecfdf5;
  --radius: 12px;
  --radius-sm: 8px;
  --shadow-sm: 0 1px 2px rgba(0,0,0,.04);
  --shadow: 0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04);
}

/* ── Tab Header ── */
.tab-header {
  margin-bottom: 20px;
}
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
  padding: 20px;
  box-shadow: var(--shadow);
}
.search-card { margin-bottom: 16px; }
.table-card { padding: 0; overflow: hidden; }

/* ── Search ── */
.search-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.search-inputs {
  display: flex;
  gap: 12px;
  flex: 1;
  min-width: 0;
}
.search-input { flex: 1; min-width: 200px; }
.type-select { width: 180px; flex-shrink: 0; }

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
.btn-ghost {
  background: transparent;
  color: var(--text-secondary);
  padding: 6px 12px;
  font-size: 13px;
}
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
.hospital-name { font-weight: 600; color: var(--text); }
.truncate-text {
  display: block;
  max-width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ── Badges ── */
.badge-dot {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}
.badge-dot::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
.badge-yes { background: var(--success-bg); color: var(--success); }
.badge-yes::before { background: var(--success); }
.badge-no { background: var(--danger-bg); color: var(--danger); }
.badge-no::before { background: var(--danger); }

.serum-amount { font-weight: 600; }
.serum-amount.low-stock { color: var(--danger); }

/* ── Action Buttons ── */
.action-btns { display: flex; gap: 4px; }
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

/* ── Section Header ── */
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px 12px;
}
.section-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text);
  margin: 0;
}

/* ── Dialog ── */
.premium-dialog :deep(.el-dialog__header) {
  border-bottom: 1px solid var(--border);
  padding: 20px 24px;
  margin: 0;
}
.premium-dialog :deep(.el-dialog__title) {
  font-size: 16px;
  font-weight: 600;
}
.premium-dialog :deep(.el-dialog__body) { padding: 24px; }
.dialog-footer { display: flex; justify-content: flex-end; gap: 8px; padding-top: 8px; }
.premium-form :deep(.el-form-item__label) {
  font-weight: 500;
  color: var(--text-secondary);
  font-size: 13px;
}

/* ── SVG icon in inputs ── */
.svg-icon { width: 16px; height: 16px; color: #9ca3af; }
</style>

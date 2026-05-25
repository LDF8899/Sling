<template>
  <div class="snake-mgmt-container" :class="{ 'dark-mode': darkMode }">
    <!-- Breadcrumb -->
    <div class="breadcrumb-section">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/admin' }">管理后台</el-breadcrumb-item>
        <el-breadcrumb-item>蛇类百科管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- Stats Row -->
    <div class="stats-overview">
      <div class="glass-card stat-card">
        <div class="stat-icon" style="background: linear-gradient(135deg, #3b82f6, #2563eb)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="28" height="28">
            <path d="M12 20V10" /><path d="M18 20V4" /><path d="M6 20v-4" />
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-number">{{ total }}</div>
          <div class="stat-label">蛇类物种总数</div>
          <div class="stat-trend"><span>已收录毒蛇与无毒蛇</span></div>
        </div>
      </div>
      <div class="glass-card stat-card">
        <div class="stat-icon" style="background: linear-gradient(135deg, #10b981, #059669)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="28" height="28">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-number">{{ families.length }}</div>
          <div class="stat-label">涵盖科属</div>
          <div class="stat-trend"><span>系统化分类管理</span></div>
        </div>
      </div>
      <div class="glass-card stat-card">
        <div class="stat-icon" style="background: linear-gradient(135deg, #f59e0b, #d97706)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="28" height="28">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-number">{{ currentPageSpecies }}</div>
          <div class="stat-label">当前页物种</div>
          <div class="stat-trend"><span>第 {{ currentPage }} 页</span></div>
        </div>
      </div>
    </div>

    <!-- Filter & Control Bar -->
    <div class="glass-card control-section">
      <div class="control-header">
        <div class="header-left">
          <h3>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            </svg>
            蛇类搜索与筛选
          </h3>
          <p class="subtitle">支持多条件组合查询</p>
        </div>
        <div class="header-right">
          <el-button type="success" @click="openCreateDialog" size="large" class="add-btn">
            <span class="btn-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </span>
            新增蛇类
          </el-button>
        </div>
      </div>

      <el-form :model="searchForm" class="filter-form">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="8" :lg="6">
            <el-form-item label="关键词搜索" class="search-item">
              <el-input
                v-model="searchForm.keyword"
                placeholder="名称/拉丁名/科/属"
                clearable
                @keyup.enter="handleSearch"
                size="large"
              >
                <template #prefix>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" style="margin-top:9px">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                  </svg>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6">
            <el-form-item label="毒性等级" class="search-item">
              <el-select v-model="searchForm.toxicityLevel" placeholder="全部" clearable size="large" style="width:100%">
                <el-option label="无毒" :value="0" />
                <el-option label="轻度毒性" :value="1" />
                <el-option label="中度毒性" :value="2" />
                <el-option label="重度毒性" :value="3" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6">
            <el-form-item label="科属筛选" class="search-item">
              <el-select v-model="searchForm.family" placeholder="全部科属" clearable size="large" style="width:100%">
                <el-option
                  v-for="f in families"
                  :key="f"
                  :label="f"
                  :value="f"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6">
            <el-form-item class="search-item" label-width="0">
              <div class="form-actions">
                <el-button type="primary" @click="handleSearch" size="large" class="search-btn" :loading="loading">
                  <span class="btn-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
                      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                    </svg>
                  </span>
                  搜索
                </el-button>
                <el-button @click="handleReset" size="large" class="reset-btn">
                  <span class="btn-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
                      <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                    </svg>
                  </span>
                  重置
                </el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!-- Data Table -->
    <div class="glass-card table-section">
      <div class="table-header">
        <div class="table-title">
          <h3>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            蛇类数据列表
          </h3>
        </div>
        <div class="table-count">
          <span class="count-badge">共 {{ total }} 条记录</span>
        </div>
      </div>

      <el-table
        :data="tableData"
        v-loading="loading"
        stripe
        :header-cell-style="tableHeaderStyle"
        :cell-style="tableCellStyle"
        style="width: 100%"
        size="large"
        :default-sort="{ prop: 'dangerLevel', order: 'descending' }"
      >
        <el-table-column prop="snakeName" label="中文名" min-width="130" fixed="left">
          <template #default="{ row }">
            <div class="snake-name-cell">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" class="snake-icon">
                <path d="M3 12c0-5 2-7 5-9 0 2 2 3 4 5s4 3 7 1c1 2 2 3 2 3" />
                <circle cx="5" cy="10" r="1.5" fill="currentColor" stroke="none" />
              </svg>
              <strong>{{ row.snakeName }}</strong>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="family" label="科" min-width="100" />
        <el-table-column prop="genus" label="属" min-width="100" />
        <el-table-column prop="latinName" label="拉丁名" min-width="150">
          <template #default="{ row }">
            <span class="latin-name">{{ row.latinName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="toxicityLevel" label="毒性等级" min-width="120" align="center">
          <template #default="{ row }">
            <span :class="['toxicity-badge', toxicityClass(row.toxicityLevel)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <line v-if="row.toxicityLevel === 0" x1="9" y1="12" x2="15" y2="12" />
                <line v-else-if="row.toxicityLevel === 1" x1="12" y1="8" x2="12" y2="16" />
                <template v-else-if="row.toxicityLevel === 2">
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                </template>
                <template v-else>
                  <line x1="8" y1="8" x2="16" y2="16" />
                  <line x1="16" y1="8" x2="8" y2="16" />
                </template>
              </svg>
              {{ toxicityLabel(row.toxicityLevel) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="dangerLevel" label="危险等级" min-width="100" align="center" sortable>
          <template #default="{ row }">
            <el-rate
              v-model="row.dangerLevel"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}级"
              :max="5"
              size="small"
            />
          </template>
        </el-table-column>
        <el-table-column prop="distribution" label="分布区域" min-width="180">
          <template #default="{ row }">
            <div class="distribution-cell">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" style="flex-shrink:0;margin-top:1px">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{{ row.distribution || '-' }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" fixed="right" align="center">
          <template #default="{ row }">
            <div class="action-btns">
              <el-tooltip content="查看详情" placement="top">
                <el-button type="primary" link size="small" @click="openViewDialog(row)">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </el-button>
              </el-tooltip>
              <el-tooltip content="编辑" placement="top">
                <el-button type="warning" link size="small" @click="openEditDialog(row)">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </el-button>
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
                <el-button type="danger" link size="small" @click="confirmDelete(row)">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </el-button>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- Pagination -->
      <div class="pagination-section">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          background
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
        />
      </div>
    </div>

    <!-- Create / Edit Dialog -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="720px"
      :close-on-click-modal="false"
      destroy-on-close
      class="snake-dialog"
    >
      <template #header>
        <div class="dialog-custom-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
          </svg>
          <span>{{ dialogTitle }}</span>
        </div>
      </template>
      <el-form
        ref="formRef"
        :model="form"
        :rules="formRules"
        label-width="100px"
        label-position="right"
        class="snake-form"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="中文名称" prop="snakeName">
              <el-input v-model="form.snakeName" placeholder="请输入蛇类中文名称" maxlength="100" show-word-limit />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="拉丁名" prop="latinName">
              <el-input v-model="form.latinName" placeholder="请输入拉丁学名" maxlength="200" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="科" prop="family">
              <el-input v-model="form.family" placeholder="请输入科名" maxlength="100" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="属" prop="genus">
              <el-input v-model="form.genus" placeholder="请输入属名" maxlength="100" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="毒性等级" prop="toxicityLevel">
              <el-select v-model="form.toxicityLevel" placeholder="请选择毒性等级" style="width:100%">
                <el-option :value="0" label="无毒">
                  <div class="select-option">
                    <span class="toxicity-dot green"></span>
                    <span>无毒</span>
                  </div>
                </el-option>
                <el-option :value="1" label="轻度毒性">
                  <div class="select-option">
                    <span class="toxicity-dot yellow"></span>
                    <span>轻度毒性</span>
                  </div>
                </el-option>
                <el-option :value="2" label="中度毒性">
                  <div class="select-option">
                    <span class="toxicity-dot orange"></span>
                    <span>中度毒性</span>
                  </div>
                </el-option>
                <el-option :value="3" label="重度毒性">
                  <div class="select-option">
                    <span class="toxicity-dot red"></span>
                    <span>重度毒性</span>
                  </div>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="毒素类型" prop="toxinType">
              <el-input v-model="form.toxinType" placeholder="请输入毒素类型" maxlength="100" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="危险等级" prop="dangerLevel">
              <el-input-number v-model="form.dangerLevel" :min="1" :max="5" :step="1" style="width:100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="保护状态" prop="conservationStatus">
              <el-input v-model="form.conservationStatus" placeholder="如：无危、近危、易危" maxlength="50" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="分布区域" prop="distribution">
          <el-input v-model="form.distribution" placeholder="请输入分布区域" maxlength="500" />
        </el-form-item>
        <el-form-item label="形态特征" prop="characteristics">
          <el-input
            v-model="form.characteristics"
            type="textarea"
            :rows="3"
            placeholder="请输入蛇类形态特征描述"
            maxlength="2000"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="栖息环境" prop="habitatInfo">
          <el-input
            v-model="form.habitatInfo"
            type="textarea"
            :rows="3"
            placeholder="请输入栖息环境信息"
            maxlength="2000"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false" size="large">取消</el-button>
          <el-button type="primary" @click="submitForm" size="large" :loading="saving">
            {{ isEdit ? '保存修改' : '确认创建' }}
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- View Detail Dialog -->
    <el-dialog
      v-model="viewVisible"
      title="蛇类详情"
      width="640px"
      class="snake-dialog"
    >
      <template #header>
        <div class="dialog-custom-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <span>蛇类详情 — {{ viewData.snakeName }}</span>
        </div>
      </template>
      <div v-if="viewData.id" class="detail-body">
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-label">中文名称</span>
            <span class="detail-value">{{ viewData.snakeName || '-' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">拉丁名</span>
            <span class="detail-value latin-text">{{ viewData.latinName || '-' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">科</span>
            <span class="detail-value">{{ viewData.family || '-' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">属</span>
            <span class="detail-value">{{ viewData.genus || '-' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">毒性等级</span>
            <span :class="['toxicity-badge', toxicityClass(viewData.toxicityLevel)]">
              {{ toxicityLabel(viewData.toxicityLevel) }}
            </span>
          </div>
          <div class="detail-item">
            <span class="detail-label">毒素类型</span>
            <span class="detail-value">{{ viewData.toxinType || '-' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">危险等级</span>
            <span class="detail-value">
              <el-rate v-model="viewData.dangerLevel" disabled :max="5" size="small" />
            </span>
          </div>
          <div class="detail-item">
            <span class="detail-label">保护状态</span>
            <span class="detail-value">{{ viewData.conservationStatus || '-' }}</span>
          </div>
          <div class="detail-item full-width">
            <span class="detail-label">分布区域</span>
            <span class="detail-value">{{ viewData.distribution || '-' }}</span>
          </div>
          <div class="detail-item full-width">
            <span class="detail-label">形态特征</span>
            <span class="detail-value detail-text">{{ viewData.characteristics || '-' }}</span>
          </div>
          <div class="detail-item full-width">
            <span class="detail-label">栖息环境</span>
            <span class="detail-value detail-text">{{ viewData.habitatInfo || '-' }}</span>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="viewVisible = false" size="large">关闭</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { snakeAdminApi } from '@/services/api'

// ── Theme ──
const darkMode = ref(false)

// ── Reactive state ──
const tableData = ref([])
const loading = ref(false)
const saving = ref(false)
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)
const families = ref([])

const searchForm = reactive({
  keyword: '',
  toxicityLevel: null,
  family: ''
})

const formRef = ref(null)
const dialogVisible = ref(false)
const isEdit = ref(false)
const editingId = ref(null)

const form = reactive({
  snakeName: '',
  family: '',
  genus: '',
  latinName: '',
  toxicityLevel: null,
  toxinType: '',
  dangerLevel: 1,
  characteristics: '',
  habitatInfo: '',
  distribution: '',
  conservationStatus: ''
})

const formRules = {
  snakeName: [{ required: true, message: '请输入中文名称', trigger: 'blur' }],
  latinName: [{ required: true, message: '请输入拉丁名', trigger: 'blur' }],
  family: [{ required: true, message: '请输入科名', trigger: 'blur' }],
  genus: [{ required: true, message: '请输入属名', trigger: 'blur' }],
  toxicityLevel: [{ required: true, message: '请选择毒性等级', trigger: 'change' }],
  dangerLevel: [{ required: true, message: '请选择危险等级', trigger: 'change' }]
}

const viewVisible = ref(false)
const viewData = ref({})

const currentPageSpecies = computed(() => tableData.value.length)

const dialogTitle = computed(() => isEdit.value ? '编辑蛇类信息' : '新增蛇类')

// ── Toxicity helpers ──
function toxicityLabel(level) {
  const map = { 0: '无毒', 1: '轻度', 2: '中度', 3: '重度' }
  return map[level] ?? '未知'
}

function toxicityClass(level) {
  const map = { 0: 'toxicity-safe', 1: 'toxicity-low', 2: 'toxicity-medium', 3: 'toxicity-high' }
  return map[level] ?? ''
}

// ── Table style ──
function tableHeaderStyle() {
  return {
    background: darkMode.value ? '#1e293b' : '#f8fafc',
    color: darkMode.value ? '#e2e8f0' : '#334155',
    fontWeight: 600,
    fontSize: '14px',
    borderBottom: '2px solid ' + (darkMode.value ? '#334155' : '#e2e8f0')
  }
}

function tableCellStyle({ column }) {
  if (column.property === 'snakeName') {
    return { fontWeight: 600, color: darkMode.value ? '#93c5fd' : '#1e40af' }
  }
  return {}
}

// ── Data fetching ──
async function fetchList() {
  loading.value = true
  try {
    const res = await snakeAdminApi.getList({
      page: currentPage.value,
      size: pageSize.value,
      keyword: searchForm.keyword || undefined,
      toxicityLevel: searchForm.toxicityLevel !== null && searchForm.toxicityLevel !== '' ? searchForm.toxicityLevel : undefined,
      family: searchForm.family || undefined
    })
    if (res.data.code === 200) {
      tableData.value = res.data.data.list || []
      total.value = res.data.data.total || 0
    }
  } catch (e) {
    // error handled by interceptor
  } finally {
    loading.value = false
  }
}

async function fetchFamilies() {
  try {
    const res = await snakeAdminApi.getFamilies()
    if (res.data.code === 200) {
      families.value = res.data.data || []
    }
  } catch (e) {
    // silent
  }
}

// ── Search / Reset ──
function handleSearch() {
  currentPage.value = 1
  fetchList()
}

function handleReset() {
  searchForm.keyword = ''
  searchForm.toxicityLevel = null
  searchForm.family = ''
  currentPage.value = 1
  fetchList()
}

function handlePageChange(page) {
  currentPage.value = page
  fetchList()
}

function handleSizeChange(size) {
  pageSize.value = size
  currentPage.value = 1
  fetchList()
}

// ── CRUD ──
function resetForm() {
  form.snakeName = ''
  form.family = ''
  form.genus = ''
  form.latinName = ''
  form.toxicityLevel = null
  form.toxinType = ''
  form.dangerLevel = 1
  form.characteristics = ''
  form.habitatInfo = ''
  form.distribution = ''
  form.conservationStatus = ''
  formRef.value?.clearValidate()
}

function openCreateDialog() {
  isEdit.value = false
  editingId.value = null
  resetForm()
  dialogVisible.value = true
}

function openEditDialog(row) {
  isEdit.value = true
  editingId.value = row.id
  Object.assign(form, {
    snakeName: row.snakeName || '',
    family: row.family || '',
    genus: row.genus || '',
    latinName: row.latinName || '',
    toxicityLevel: row.toxicityLevel ?? null,
    toxinType: row.toxinType || '',
    dangerLevel: row.dangerLevel || 1,
    characteristics: row.characteristics || '',
    habitatInfo: row.habitatInfo || '',
    distribution: row.distribution || '',
    conservationStatus: row.conservationStatus || ''
  })
  formRef.value?.clearValidate()
  dialogVisible.value = true
}

async function submitForm() {
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  saving.value = true
  try {
    const payload = { ...form }
    let res
    if (isEdit.value) {
      res = await snakeAdminApi.updateSnake(editingId.value, payload)
    } else {
      res = await snakeAdminApi.createSnake(payload)
    }
    if (res.data.code === 200) {
      ElMessage.success(isEdit.value ? '蛇类信息更新成功' : '蛇类新增成功')
      dialogVisible.value = false
      fetchList()
    }
  } catch (e) {
    // error handled by interceptor
  } finally {
    saving.value = false
  }
}

function confirmDelete(row) {
  ElMessageBox.confirm(
    `确定要删除蛇类「${row.snakeName}」吗？此操作不可恢复。`,
    '删除确认',
    {
      confirmButtonText: '确认删除',
      cancelButtonText: '取消',
      type: 'warning',
      confirmButtonClass: 'el-button--danger'
    }
  ).then(async () => {
    try {
      const res = await snakeAdminApi.deleteSnake(row.id)
      if (res.data.code === 200) {
        ElMessage.success('删除成功')
        if (tableData.value.length === 1 && currentPage.value > 1) {
          currentPage.value--
        }
        fetchList()
      }
    } catch (e) {
      // error handled by interceptor
    }
  }).catch(() => {})
}

function openViewDialog(row) {
  viewData.value = row
  viewVisible.value = true
}

// ── Init ──
onMounted(() => {
  darkMode.value = document.body.classList.contains('dark-mode')
  fetchFamilies()
  fetchList()
})
</script>

<style scoped>
.snake-mgmt-container {
  padding: 20px;
  min-height: calc(100vh - 60px);
  transition: background-color 0.3s ease;
}

.dark-mode .snake-mgmt-container {
  background: linear-gradient(135deg, #1e293b, #0f172a);
  color: #f8fafc;
}

/* Breadcrumb */
.breadcrumb-section {
  margin-bottom: 20px;
}
.dark-mode :deep(.el-breadcrumb__inner) {
  color: #cbd5e1;
}
.dark-mode :deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner) {
  color: #f8fafc;
}

/* Stats */
.stats-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.stat-card {
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
}
.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0,0,0,0.12);
}
.dark-mode .stat-card {
  border-color: rgba(255,255,255,0.06);
}

.stat-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: 32px;
  font-weight: 800;
  color: #1e293b;
  line-height: 1;
  margin-bottom: 8px;
}
.dark-mode .stat-number {
  color: #f8fafc;
}

.stat-label {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 6px;
}

.stat-trend {
  font-size: 12px;
  color: #94a3b8;
}

/* Control Section */
.control-section {
  padding: 30px;
  margin-bottom: 20px;
  border-radius: 16px;
  animation: fadeInUp 0.5s ease-out;
}

.control-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.header-left h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 10px;
}
.dark-mode .header-left h3 {
  color: #f8fafc;
}

.subtitle {
  margin: 5px 0 0 0;
  color: #64748b;
  font-size: 14px;
}

.add-btn {
  border-radius: 10px;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.btn-icon {
  display: flex;
  align-items: center;
}

.filter-form {
  margin-top: 8px;
}

.search-item :deep(.el-form-item__label) {
  font-weight: 500;
  color: #475569;
}
.dark-mode .search-item :deep(.el-form-item__label) {
  color: #cbd5e1;
}

.form-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.search-btn, .reset-btn {
  padding: 12px 24px;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* Glass Card */
.glass-card {
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.04);
}
.dark-mode .glass-card {
  background: rgba(30,41,59,0.7);
  border-color: rgba(255,255,255,0.06);
}

/* Table Section */
.table-section {
  padding: 30px;
  border-radius: 16px;
  animation: fadeInUp 0.5s ease-out 0.15s both;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.table-title h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 10px;
}
.dark-mode .table-title h3 {
  color: #f8fafc;
}

.count-badge {
  background: #eff6ff;
  color: #3b82f6;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
}
.dark-mode .count-badge {
  background: rgba(59,130,246,0.15);
  color: #93c5fd;
}

.snake-name-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}
.snake-icon {
  color: #94a3b8;
  flex-shrink: 0;
}

.latin-name {
  font-style: italic;
  color: #64748b;
  font-size: 13px;
}
.dark-mode .latin-name {
  color: #94a3b8;
}

/* Toxicity Badges */
.toxicity-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}

.toxicity-safe {
  background: #ecfdf5;
  color: #059669;
  border: 1px solid #a7f3d0;
}
.dark-mode .toxicity-safe {
  background: rgba(5,150,105,0.15);
  color: #34d399;
  border-color: rgba(5,150,105,0.3);
}

.toxicity-low {
  background: #fefce8;
  color: #ca8a04;
  border: 1px solid #fde68a;
}
.dark-mode .toxicity-low {
  background: rgba(202,138,4,0.15);
  color: #fbbf24;
  border-color: rgba(202,138,4,0.3);
}

.toxicity-medium {
  background: #fff7ed;
  color: #ea580c;
  border: 1px solid #fed7aa;
}
.dark-mode .toxicity-medium {
  background: rgba(234,88,12,0.15);
  color: #fb923c;
  border-color: rgba(234,88,12,0.3);
}

.toxicity-high {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}
.dark-mode .toxicity-high {
  background: rgba(220,38,38,0.15);
  color: #f87171;
  border-color: rgba(220,38,38,0.3);
}

.distribution-cell {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  color: #64748b;
  font-size: 13px;
}
.dark-mode .distribution-cell {
  color: #94a3b8;
}

/* Action Buttons */
.action-btns {
  display: flex;
  gap: 4px;
  justify-content: center;
}

/* Pagination */
.pagination-section {
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
}

/* Dialog */
.snake-dialog :deep(.el-dialog__header) {
  padding: 20px 24px 16px;
  border-bottom: 1px solid #f1f5f9;
}
.dark-mode .snake-dialog :deep(.el-dialog__header) {
  border-bottom-color: #334155;
}

.dialog-custom-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
}
.dark-mode .dialog-custom-header {
  color: #f8fafc;
}

.snake-form {
  padding-top: 8px;
}

.snake-form :deep(.el-form-item__label) {
  font-weight: 500;
  color: #475569;
}
.dark-mode .snake-form :deep(.el-form-item__label) {
  color: #cbd5e1;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* Select option with colored dot */
.select-option {
  display: flex;
  align-items: center;
  gap: 8px;
}
.toxicity-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}
.toxicity-dot.green { background: #22c55e; }
.toxicity-dot.yellow { background: #eab308; }
.toxicity-dot.orange { background: #f97316; }
.toxicity-dot.red { background: #ef4444; }

/* Detail View */
.detail-body {
  padding: 8px 0;
}
.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.detail-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.detail-item.full-width {
  grid-column: 1 / -1;
}
.detail-label {
  font-size: 13px;
  color: #64748b;
  font-weight: 500;
}
.dark-mode .detail-label {
  color: #94a3b8;
}
.detail-value {
  font-size: 15px;
  color: #1e293b;
}
.dark-mode .detail-value {
  color: #e2e8f0;
}
.latin-text {
  font-style: italic;
}
.detail-text {
  background: #f8fafc;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.7;
  color: #475569;
}
.dark-mode .detail-text {
  background: #0f172a;
  color: #cbd5e1;
}

/* Dark mode overrides for El-Table */
.dark-mode :deep(.el-table) {
  --el-table-bg-color: transparent;
  --el-table-tr-bg-color: transparent;
}
.dark-mode :deep(.el-table__body-wrapper .el-table__row--striped td.el-table__cell) {
  background: rgba(51,65,85,0.3);
}
.dark-mode :deep(.el-table td.el-table__cell),
.dark-mode :deep(.el-table th.el-table__cell) {
  border-bottom-color: #334155;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Dialog dark mode */
.dark-mode :deep(.el-dialog) {
  background: #1e293b;
  border: 1px solid #334155;
}
.dark-mode :deep(.el-dialog__title) {
  color: #f8fafc;
}
</style>

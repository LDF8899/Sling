<template>
  <div class="emergency-mgmt-container" :class="{ 'dark-mode': darkMode }">
    <!-- Breadcrumb -->
    <div class="breadcrumb-section">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/admin' }">管理后台</el-breadcrumb-item>
        <el-breadcrumb-item>急救信息管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- Stats Row -->
    <div class="stats-overview">
      <div class="glass-card stat-card">
        <div class="stat-icon" style="background: linear-gradient(135deg, #ef4444, #dc2626)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="28" height="28">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="9" y1="9" x2="15" y2="15" /><line x1="15" y1="9" x2="9" y2="15" />
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-number">{{ total }}</div>
          <div class="stat-label">急救方案总数</div>
          <div class="stat-trend"><span>毒蛇咬伤急救指南</span></div>
        </div>
      </div>
      <div class="glass-card stat-card">
        <div class="stat-icon" style="background: linear-gradient(135deg, #8b5cf6, #7c3aed)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="28" height="28">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-number">{{ venomTypes }}</div>
          <div class="stat-label">毒液类型</div>
          <div class="stat-trend"><span>神经毒/血循毒/混合毒</span></div>
        </div>
      </div>
      <div class="glass-card stat-card">
        <div class="stat-icon" style="background: linear-gradient(135deg, #10b981, #059669)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="28" height="28">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-number">{{ currentPageCount }}</div>
          <div class="stat-label">当前页记录</div>
          <div class="stat-trend"><span>第 {{ currentPage }} 页</span></div>
        </div>
      </div>
    </div>

    <!-- Search & Control Bar -->
    <div class="glass-card control-section">
      <div class="control-header">
        <div class="header-left">
          <h3>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
            急救信息搜索
          </h3>
          <p class="subtitle">按蛇类名称快速检索急救方案</p>
        </div>
        <div class="header-right">
          <el-button type="success" @click="openCreateDialog" size="large" class="add-btn">
            <span class="btn-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </span>
            新增急救方案
          </el-button>
        </div>
      </div>

      <div class="search-bar-row">
        <el-input
          v-model="searchKeyword"
          placeholder="输入蛇类名称搜索急救信息..."
          clearable
          @keyup.enter="handleSearch"
          size="large"
          class="search-input-main"
        >
          <template #prefix>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" style="margin-top:9px">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            </svg>
          </template>
          <template #append>
            <el-button @click="handleSearch" :loading="loading" icon="">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
              </svg>
            </el-button>
          </template>
        </el-input>
        <el-button @click="handleReset" size="large" class="reset-btn">
          <span class="btn-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
              <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
          </span>
          重置
        </el-button>
      </div>
    </div>

    <!-- Data Table -->
    <div class="glass-card table-section">
      <div class="table-header">
        <div class="table-title">
          <h3>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            急救方案列表
          </h3>
        </div>
        <div class="table-count">
          <span class="count-badge">共 {{ total }} 条方案</span>
        </div>
      </div>

      <el-table
        :data="tableData"
        v-loading="loading"
        stripe
        :header-cell-style="tableHeaderStyle"
        style="width: 100%"
        size="large"
      >
        <el-table-column label="#" type="index" width="60" align="center" />
        <el-table-column prop="snakeName" label="蛇类名称" min-width="140" fixed="left">
          <template #default="{ row }">
            <div class="snake-name-cell">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" class="snake-icon">
                <path d="M3 12c0-5 2-7 5-9 0 2 2 3 4 5s4 3 7 1c1 2 2 3 2 3" />
              </svg>
              <strong>{{ row.snakeName }}</strong>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="snakeAlias" label="别名" min-width="120">
          <template #default="{ row }">
            <span class="alias-text">{{ row.snakeAlias || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="venomType" label="毒液类型" min-width="120" align="center">
          <template #default="{ row }">
            <span :class="['venom-badge', venomClass(row.venomType)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14">
                <path d="M20.91 8.84 8.56 2.23a1.93 1.93 0 0 0-1.81 0L3.1 4.53a2.08 2.08 0 0 0-.96 1.45c-.5 2.83.16 6.72 2.39 10.3 2.26 3.6 5.44 5.85 7.32 6.72a.39.39 0 0 0 .3 0c1.88-.87 5.06-3.12 7.32-6.72 2.23-3.58 2.89-7.47 2.39-10.3a2.08 2.08 0 0 0-.96-1.44Z" />
              </svg>
              {{ row.venomType || '-' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="serumType" label="抗蛇毒血清" min-width="160">
          <template #default="{ row }">
            <div class="serum-cell">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15">
                <path d="M12 4V2m0 20v-2" />
                <path d="M6 12H2m20 0h-4" />
                <path d="M2.93 8.93l1.41 1.41m15.32 0 1.41-1.41" />
                <path d="M2.93 15.07l1.41-1.41m15.32 0 1.41 1.41" />
                <circle cx="12" cy="12" r="4" />
              </svg>
              <span>{{ row.serumType || '-' }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="hospitalDepartment" label="就诊科室" min-width="140">
          <template #default="{ row }">
            <div class="dept-cell">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
              <span>{{ row.hospitalDepartment || '-' }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right" align="center">
          <template #default="{ row }">
            <div class="action-btns">
              <el-tooltip content="查看详情" placement="top">
                <el-button type="primary" link size="small" @click="openDetailDialog(row)">
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
      class="emergency-dialog"
    >
      <template #header>
        <div class="dialog-custom-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="9" y1="9" x2="15" y2="15" /><line x1="15" y1="9" x2="9" y2="15" />
          </svg>
          <span>{{ dialogTitle }}</span>
        </div>
      </template>
      <el-form
        ref="formRef"
        :model="form"
        :rules="formRules"
        label-width="110px"
        label-position="right"
        class="emergency-form"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="蛇类名称" prop="snakeName">
              <el-input v-model="form.snakeName" placeholder="请输入蛇类名称" maxlength="100" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="别名" prop="snakeAlias">
              <el-input v-model="form.snakeAlias" placeholder="请输入蛇类别名" maxlength="200" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="毒液类型" prop="venomType">
              <el-select v-model="form.venomType" placeholder="请选择毒液类型" style="width:100%">
                <el-option label="神经毒" value="神经毒" />
                <el-option label="血循毒" value="血循毒" />
                <el-option label="混合毒" value="混合毒" />
                <el-option label="细胞毒" value="细胞毒" />
                <el-option label="无毒" value="无毒" />
              </el-select>
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
            <el-form-item label="血清类型" prop="serumType">
              <el-select v-model="form.serumType" placeholder="请选择抗蛇毒血清" style="width:100%" filterable allow-create>
                <el-option label="抗蝮蛇毒血清" value="抗蝮蛇毒血清" />
                <el-option label="抗五步蛇毒血清" value="抗五步蛇毒血清" />
                <el-option label="抗银环蛇毒血清" value="抗银环蛇毒血清" />
                <el-option label="抗眼镜蛇毒血清" value="抗眼镜蛇毒血清" />
                <el-option label="抗蝰蛇毒血清" value="抗蝰蛇毒血清" />
                <el-option label="多价抗蛇毒血清" value="多价抗蛇毒血清" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="就诊科室" prop="hospitalDepartment">
              <el-input v-model="form.hospitalDepartment" placeholder="如：急诊科" maxlength="100" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="中毒症状" prop="symptomDescription">
          <el-input
            v-model="form.symptomDescription"
            type="textarea"
            :rows="3"
            placeholder="请输入中毒症状描述"
            maxlength="3000"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="急救措施" prop="emergencyTreatment">
          <el-input
            v-model="form.emergencyTreatment"
            type="textarea"
            :rows="3"
            placeholder="请输入急救处理措施"
            maxlength="3000"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="医疗救治" prop="medicalAttention">
          <el-input
            v-model="form.medicalAttention"
            type="textarea"
            :rows="3"
            placeholder="请输入医疗救治建议"
            maxlength="3000"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="禁忌事项" prop="forbiddenActions">
          <el-input
            v-model="form.forbiddenActions"
            type="textarea"
            :rows="3"
            placeholder="请输入禁止采取的行为"
            maxlength="3000"
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

    <!-- Detail View Dialog -->
    <el-dialog
      v-model="detailVisible"
      title="急救方案详情"
      width="700px"
      class="emergency-dialog"
    >
      <template #header>
        <div class="dialog-custom-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
          <span>急救方案 — {{ detailData.snakeName }}</span>
        </div>
      </template>
      <div v-if="detailData.id" class="detail-body">
        <!-- Header Info -->
        <div class="detail-header-card">
          <div class="detail-header-row">
            <div class="dh-item">
              <span class="dh-label">蛇类名称</span>
              <span class="dh-value name-value">{{ detailData.snakeName || '-' }}</span>
            </div>
            <div class="dh-item">
              <span class="dh-label">别名</span>
              <span class="dh-value">{{ detailData.snakeAlias || '-' }}</span>
            </div>
            <div class="dh-item">
              <span class="dh-label">拉丁名</span>
              <span class="dh-value latin-text">{{ detailData.latinName || '-' }}</span>
            </div>
          </div>
          <div class="detail-tags-row">
            <span v-if="detailData.venomType" :class="['venom-badge', venomClass(detailData.venomType)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15">
                <path d="M20.91 8.84 8.56 2.23a1.93 1.93 0 0 0-1.81 0L3.1 4.53a2.08 2.08 0 0 0-.96 1.45c-.5 2.83.16 6.72 2.39 10.3 2.26 3.6 5.44 5.85 7.32 6.72a.39.39 0 0 0 .3 0c1.88-.87 5.06-3.12 7.32-6.72 2.23-3.58 2.89-7.47 2.39-10.3a2.08 2.08 0 0 0-.96-1.44Z" />
              </svg>
              {{ detailData.venomType }}
            </span>
            <span class="info-tag serum-tag">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14">
                <path d="M12 4V2m0 20v-2M6 12H2m20 0h-4M2.93 8.93l1.41 1.41m15.32 0 1.41-1.41M2.93 15.07l1.41-1.41m15.32 0 1.41 1.41" />
                <circle cx="12" cy="12" r="4" />
              </svg>
              {{ detailData.serumType || '未指定血清' }}
            </span>
            <span class="info-tag dept-tag">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
              {{ detailData.hospitalDepartment || '未指定科室' }}
            </span>
          </div>
        </div>

        <!-- Detail Sections -->
        <div class="detail-sections">
          <div class="detail-section">
            <div class="section-header">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
                <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span>中毒症状</span>
            </div>
            <div class="section-content">{{ detailData.symptomDescription || '暂无记录' }}</div>
          </div>

          <div class="detail-section">
            <div class="section-header emergency-header">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="9" y1="9" x2="15" y2="15" /><line x1="15" y1="9" x2="9" y2="15" />
              </svg>
              <span>急救措施</span>
            </div>
            <div class="section-content">{{ detailData.emergencyTreatment || '暂无记录' }}</div>
          </div>

          <div class="detail-section">
            <div class="section-header medical-header">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span>医疗救治</span>
            </div>
            <div class="section-content">{{ detailData.medicalAttention || '暂无记录' }}</div>
          </div>

          <div class="detail-section">
            <div class="section-header forbidden-header">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
                <circle cx="12" cy="12" r="10" />
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
              </svg>
              <span>禁忌事项</span>
            </div>
            <div class="section-content">{{ detailData.forbiddenActions || '暂无记录' }}</div>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="detailVisible = false" size="large">关闭</el-button>
          <el-button type="warning" @click="openEditFromDetail" size="large" v-if="detailData.id">
            <span class="btn-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </span>
            编辑此方案
          </el-button>
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
const searchKeyword = ref('')

const formRef = ref(null)
const dialogVisible = ref(false)
const isEdit = ref(false)
const editingId = ref(null)

const form = reactive({
  snakeName: '',
  snakeAlias: '',
  venomType: '',
  symptomDescription: '',
  emergencyTreatment: '',
  medicalAttention: '',
  forbiddenActions: '',
  serumType: '',
  hospitalDepartment: '',
  latinName: ''
})

const formRules = {
  snakeName: [{ required: true, message: '请输入蛇类名称', trigger: 'blur' }],
  venomType: [{ required: true, message: '请选择毒液类型', trigger: 'change' }],
  symptomDescription: [{ required: true, message: '请输入中毒症状', trigger: 'blur' }],
  emergencyTreatment: [{ required: true, message: '请输入急救措施', trigger: 'blur' }]
}

const detailVisible = ref(false)
const detailData = ref({})

const currentPageCount = computed(() => tableData.value.length)

const dialogTitle = computed(() => isEdit.value ? '编辑急救方案' : '新增急救方案')

// ── Computed stats ──
const venomTypes = computed(() => {
  const types = new Set()
  tableData.value.forEach(item => {
    if (item.venomType) types.add(item.venomType)
  })
  return types.size
})

// ── Venom helpers ──
function venomClass(type) {
  if (!type) return ''
  if (type.includes('神经')) return 'venom-neuro'
  if (type.includes('血循')) return 'venom-hemo'
  if (type.includes('混合')) return 'venom-mixed'
  if (type.includes('细胞')) return 'venom-cyto'
  if (type.includes('无毒')) return 'venom-none'
  return ''
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

// ── Data fetching ──
async function fetchList() {
  loading.value = true
  try {
    const res = await snakeAdminApi.getEmergencyList({
      page: currentPage.value,
      size: pageSize.value,
      keyword: searchKeyword.value || undefined
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

// ── Search / Reset ──
function handleSearch() {
  currentPage.value = 1
  fetchList()
}

function handleReset() {
  searchKeyword.value = ''
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
  form.snakeAlias = ''
  form.venomType = ''
  form.symptomDescription = ''
  form.emergencyTreatment = ''
  form.medicalAttention = ''
  form.forbiddenActions = ''
  form.serumType = ''
  form.hospitalDepartment = ''
  form.latinName = ''
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
    snakeAlias: row.snakeAlias || '',
    venomType: row.venomType || '',
    symptomDescription: row.symptomDescription || '',
    emergencyTreatment: row.emergencyTreatment || '',
    medicalAttention: row.medicalAttention || '',
    forbiddenActions: row.forbiddenActions || '',
    serumType: row.serumType || '',
    hospitalDepartment: row.hospitalDepartment || '',
    latinName: row.latinName || ''
  })
  formRef.value?.clearValidate()
  dialogVisible.value = true
}

function openEditFromDetail() {
  detailVisible.value = false
  openEditDialog(detailData.value)
}

async function submitForm() {
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  saving.value = true
  try {
    const payload = { ...form }
    let res
    if (isEdit.value) {
      res = await snakeAdminApi.updateEmergency(editingId.value, payload)
    } else {
      res = await snakeAdminApi.createEmergency(payload)
    }
    if (res.data.code === 200) {
      ElMessage.success(isEdit.value ? '急救方案更新成功' : '急救方案新增成功')
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
    `确定要删除「${row.snakeName}」的急救方案吗？（软删除，设置 delFlag=1）`,
    '删除确认',
    {
      confirmButtonText: '确认删除',
      cancelButtonText: '取消',
      type: 'warning',
      confirmButtonClass: 'el-button--danger'
    }
  ).then(async () => {
    try {
      const res = await snakeAdminApi.deleteEmergency(row.id)
      if (res.data.code === 200) {
        ElMessage.success('急救方案已标记删除')
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

async function openDetailDialog(row) {
  loading.value = true
  try {
    const res = await snakeAdminApi.getEmergency(row.id)
    if (res.data.code === 200) {
      detailData.value = res.data.data || row
    } else {
      detailData.value = row
    }
    detailVisible.value = true
  } catch (e) {
    detailData.value = row
    detailVisible.value = true
  } finally {
    loading.value = false
  }
}

// ── Init ──
onMounted(() => {
  darkMode.value = document.body.classList.contains('dark-mode')
  fetchList()
})
</script>

<style scoped>
.emergency-mgmt-container {
  padding: 20px;
  min-height: calc(100vh - 60px);
  transition: background-color 0.3s ease;
}

.dark-mode .emergency-mgmt-container {
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
  margin-bottom: 20px;
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

.search-bar-row {
  display: flex;
  gap: 12px;
  align-items: center;
}
.search-input-main {
  flex: 1;
  max-width: 500px;
}
.reset-btn {
  padding: 12px 24px;
  display: flex;
  align-items: center;
  gap: 6px;
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
  background: #fef2f2;
  color: #ef4444;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
}
.dark-mode .count-badge {
  background: rgba(239,68,68,0.15);
  color: #fca5a5;
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

.alias-text {
  color: #64748b;
  font-size: 13px;
}
.dark-mode .alias-text {
  color: #94a3b8;
}

.serum-cell,
.dept-cell {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #475569;
  font-size: 13px;
}
.dark-mode .serum-cell,
.dark-mode .dept-cell {
  color: #cbd5e1;
}

/* Venom Badges */
.venom-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}

.venom-neuro {
  background: #eef2ff;
  color: #4338ca;
  border: 1px solid #c7d2fe;
}
.dark-mode .venom-neuro {
  background: rgba(67,56,202,0.15);
  color: #a5b4fc;
  border-color: rgba(67,56,202,0.3);
}

.venom-hemo {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}
.dark-mode .venom-hemo {
  background: rgba(220,38,38,0.15);
  color: #fca5a5;
  border-color: rgba(220,38,38,0.3);
}

.venom-mixed {
  background: #fff7ed;
  color: #ea580c;
  border: 1px solid #fed7aa;
}
.dark-mode .venom-mixed {
  background: rgba(234,88,12,0.15);
  color: #fdba74;
  border-color: rgba(234,88,12,0.3);
}

.venom-cyto {
  background: #fdf4ff;
  color: #a21caf;
  border: 1px solid #f0abfc;
}
.dark-mode .venom-cyto {
  background: rgba(162,28,175,0.15);
  color: #e879f9;
  border-color: rgba(162,28,175,0.3);
}

.venom-none {
  background: #ecfdf5;
  color: #059669;
  border: 1px solid #a7f3d0;
}
.dark-mode .venom-none {
  background: rgba(5,150,105,0.15);
  color: #34d399;
  border-color: rgba(5,150,105,0.3);
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
.emergency-dialog :deep(.el-dialog__header) {
  padding: 20px 24px 16px;
  border-bottom: 1px solid #f1f5f9;
}
.dark-mode .emergency-dialog :deep(.el-dialog__header) {
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

.emergency-form {
  padding-top: 8px;
}

.emergency-form :deep(.el-form-item__label) {
  font-weight: 500;
  color: #475569;
}
.dark-mode .emergency-form :deep(.el-form-item__label) {
  color: #cbd5e1;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* Detail View */
.detail-body {
  padding: 4px 0;
}

.detail-header-card {
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  border-radius: 12px;
  padding: 20px 24px;
  margin-bottom: 20px;
  border: 1px solid #e2e8f0;
}
.dark-mode .detail-header-card {
  background: linear-gradient(135deg, #1e293b, #0f172a);
  border-color: #334155;
}

.detail-header-row {
  display: flex;
  gap: 32px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.dh-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.dh-label {
  font-size: 12px;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.dh-value {
  font-size: 15px;
  color: #1e293b;
  font-weight: 500;
}
.dark-mode .dh-value {
  color: #e2e8f0;
}

.name-value {
  font-size: 20px;
  font-weight: 700;
  color: #1e40af;
}
.dark-mode .name-value {
  color: #93c5fd;
}

.latin-text {
  font-style: italic;
}

.detail-tags-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.info-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
}

.serum-tag {
  background: #eff6ff;
  color: #2563eb;
  border: 1px solid #bfdbfe;
}
.dark-mode .serum-tag {
  background: rgba(37,99,235,0.15);
  color: #93c5fd;
  border-color: rgba(37,99,235,0.3);
}

.dept-tag {
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}
.dark-mode .dept-tag {
  background: rgba(22,163,74,0.15);
  color: #86efac;
  border-color: rgba(22,163,74,0.3);
}

/* Detail Sections */
.detail-sections {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail-section {
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  overflow: hidden;
}
.dark-mode .detail-section {
  border-color: #334155;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #fefce8;
  font-weight: 600;
  font-size: 14px;
  color: #854d0e;
  border-bottom: 1px solid #fef08a;
}
.dark-mode .section-header {
  background: rgba(133,77,14,0.15);
  color: #fde68a;
  border-bottom-color: rgba(133,77,14,0.3);
}

.section-header.emergency-header {
  background: #fef2f2;
  color: #991b1b;
  border-bottom-color: #fecaca;
}
.dark-mode .section-header.emergency-header {
  background: rgba(153,27,27,0.15);
  color: #fca5a5;
  border-bottom-color: rgba(153,27,27,0.3);
}

.section-header.medical-header {
  background: #eff6ff;
  color: #1e40af;
  border-bottom-color: #bfdbfe;
}
.dark-mode .section-header.medical-header {
  background: rgba(30,64,175,0.15);
  color: #93c5fd;
  border-bottom-color: rgba(30,64,175,0.3);
}

.section-header.forbidden-header {
  background: #fef2f2;
  color: #b91c1c;
  border-bottom-color: #fecaca;
}
.dark-mode .section-header.forbidden-header {
  background: rgba(185,28,28,0.15);
  color: #fca5a5;
  border-bottom-color: rgba(185,28,28,0.3);
}

.section-content {
  padding: 16px;
  font-size: 14px;
  line-height: 1.8;
  color: #475569;
  white-space: pre-wrap;
}
.dark-mode .section-content {
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

<template>
  <div class="rescue-dashboard">
    <!-- 顶部操作栏 -->
    <div class="top-bar">
      <div class="top-bar-left">
        <SButton variant="ghost" size="sm" @click="$router.push('/dashboard')">
          <template #icon><el-icon><ArrowLeft /></el-icon></template>
        </SButton>
        <div class="top-title">
          <h2>救助调度中心</h2>
          <span class="top-subtitle">蛇伤救助 · 预警管理 · 血清调度</span>
        </div>
      </div>
      <div class="top-tabs">
        <button :class="{ active: mainTab === 'dispatch' }" @click="mainTab = 'dispatch'">
          <el-icon><Location /></el-icon> 求助调度
        </button>
        <button :class="{ active: mainTab === 'warning' }" @click="mainTab = 'warning'">
          <el-icon><Warning /></el-icon> 预警管理
        </button>
      </div>
      <div class="role-badge" v-if="roleVerified">
        <el-tag :type="verifiedRole === 'forester' ? 'success' : 'warning'" effect="dark" round>
          {{ ROLES[verifiedRole]?.label }}
        </el-tag>
      </div>
    </div>

    <!-- ===== 求助调度 Tab ===== -->
    <template v-if="mainTab === 'dispatch'">

    <!-- 顶部统计 -->
    <div class="stats-bar">
      <SStatCard label="全部求助" :value="stats.total" clickable icon-bg="var(--green-100)" icon-color="var(--green-600)" @click="currentFilter = ''">
        <template #icon><el-icon size="22"><Document /></el-icon></template>
      </SStatCard>
      <SStatCard label="待处理" :value="stats.pending" clickable icon-bg="var(--danger-bg)" icon-color="var(--danger)" @click="currentFilter = 'pending'">
        <template #icon><el-icon size="22"><Warning /></el-icon></template>
      </SStatCard>
      <SStatCard label="处理中" :value="stats.processing" clickable icon-bg="var(--warning-bg)" icon-color="var(--warning)" @click="currentFilter = 'processing'">
        <template #icon><el-icon size="22"><Loading /></el-icon></template>
      </SStatCard>
      <SStatCard label="已解决" :value="stats.resolved" clickable icon-bg="var(--blue-100, #E0F2FE)" icon-color="var(--blue-700)" @click="currentFilter = 'resolved'">
        <template #icon><el-icon size="22"><FirstAidKit /></el-icon></template>
      </SStatCard>
    </div>

    <!-- 主内容区 -->
    <div class="main-panels">
      <!-- 左侧列表 -->
      <SCard class="list-panel">
        <template #header>
          <div class="list-header">
            <h3>求助列表</h3>
            <el-tag v-if="currentFilter" type="warning" closable @close="currentFilter = ''" size="small">
              {{ statusLabel(currentFilter) }}
            </el-tag>
            <span class="polling-status" :class="{ active: wsConnected || pollingActive }">
              <span class="polling-dot" :class="{ active: wsConnected || pollingActive }"></span>
              {{ wsConnected ? 'WebSocket 实时' : pollingActive ? '轮询中' : '已暂停' }}
            </span>
          </div>
        </template>

        <div class="list-body">
          <div v-if="loading" class="loading-wrap">
            <el-icon class="is-loading" size="24"><Loading /></el-icon>
            <span>加载中...</span>
          </div>
          <div v-else-if="helpList.length === 0" class="empty-wrap">
            <el-empty description="暂无求助记录" />
          </div>
          <div v-else class="help-items">
            <div
              v-for="item in helpList"
              :key="item.id"
              class="help-item"
              :class="{ active: selectedId === item.id, [statusColor(item.status)]: true }"
              @click="selectHelp(item)"
            >
              <div class="item-top">
                <el-tag :type="typeColor(item.type)" size="small" round>{{ typeLabel(item.type) }}</el-tag>
                <el-tag :type="statusColor(item.status)" size="small" effect="plain" round>{{ statusLabel(item.status) }}</el-tag>
              </div>
              <div class="item-loc">{{ item.location }}</div>
              <div class="item-desc">{{ item.description?.slice(0, 60) }}{{ item.description?.length > 60 ? '...' : '' }}</div>
              <div class="item-time">{{ formatTime(item.createTime) }}</div>
            </div>
          </div>
        </div>

        <!-- 分页 -->
        <template #footer>
          <div class="list-pagination" v-if="total > pageSize">
            <el-pagination
              v-model:current-page="currentPage"
              :page-size="pageSize"
              :total="total"
              layout="prev, pager, next"
              small
              @current-change="loadList"
            />
          </div>
        </template>
      </SCard>

      <!-- 右侧详情/地图 -->
      <SCard class="detail-panel" :style="{ padding: '0' }">
        <template #header>
          <div class="detail-tabs">
            <button :class="{ active: rightTab === 'detail' }" @click="rightTab = 'detail'">
              <el-icon><Document /></el-icon> 求助详情
            </button>
            <button :class="{ active: rightTab === 'map' }" @click="rightTab = 'map'">
              <el-icon><Location /></el-icon> 地图分布
            </button>
          </div>
        </template>

        <!-- 详情模式 -->
        <div class="detail-content" v-if="rightTab === 'detail'">
          <div v-if="!selected" class="empty-wrap">
            <el-empty description="请选择一条求助记录" />
          </div>
          <div v-else class="detail-card">
            <div class="detail-header">
              <h4>#{{ selected.id }} — {{ typeLabel(selected.type) }}</h4>
              <el-tag :type="statusColor(selected.status)" effect="dark" round>{{ statusLabel(selected.status) }}</el-tag>
            </div>

            <div class="detail-fields">
              <div class="field">
                <label>求助类型</label>
                <span>{{ typeLabel(selected.type) }}</span>
              </div>
              <div class="field">
                <label>位置</label>
                <span>{{ selected.location }}</span>
              </div>
              <div class="field">
                <label>联系电话</label>
                <span>{{ selected.phone }}</span>
              </div>
              <div class="field">
                <label>创建时间</label>
                <span>{{ formatTime(selected.createTime) }}</span>
              </div>
              <div class="field">
                <label>更新时间</label>
                <span>{{ formatTime(selected.updateTime) }}</span>
              </div>
              <div class="field" v-if="selected.alertTime">
                <label>报警时间</label>
                <span>{{ formatTime(selected.alertTime) }}</span>
              </div>
              <div class="field block">
                <label>描述</label>
                <div class="desc-text">{{ selected.description }}</div>
              </div>
            </div>

            <!-- 识别信息（如果有） -->
            <div class="recognition-info" v-if="selected.snakeName">
              <h4>🐍 识别信息</h4>
              <div class="info-grid">
                <div class="info-item">
                  <label>蛇种</label>
                  <span class="snake-name">{{ selected.snakeName }}</span>
                </div>
                <div class="info-item" v-if="selected.toxicityLevel !== null">
                  <label>毒性等级</label>
                  <span :class="'toxicity-' + selected.toxicityLevel">
                    {{ getToxicityText(selected.toxicityLevel) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- 急救信息（如果有） -->
            <div class="emergency-info" v-if="emergencyDetail">
              <h4>⚠️ 急救信息</h4>
              <div class="info-section" v-if="emergencyDetail.venom_type">
                <label>毒液类型</label>
                <span>{{ emergencyDetail.venom_type }}</span>
              </div>
              <div class="info-section" v-if="emergencyDetail.emergency_treatment">
                <label>急救措施</label>
                <div class="treatment-text">{{ emergencyDetail.emergency_treatment }}</div>
              </div>
              <div class="info-section forbidden" v-if="emergencyDetail.forbidden_actions">
                <label>❌ 严格禁止</label>
                <div class="forbidden-text">{{ emergencyDetail.forbidden_actions }}</div>
              </div>
            </div>

            <!-- 推荐医院（如果有） -->
            <div class="hospital-recommend" v-if="hospitalList.length > 0">
              <h4>🏥 推荐医院</h4>
              <div class="hospital-item" v-for="hospital in hospitalList" :key="hospital.hospitalId">
                <div class="hospital-name">{{ hospital.hospitalName }}</div>
                <div class="hospital-meta">
                  <span v-if="hospital.serumAmount">💉 库存: {{ hospital.serumAmount }}支</span>
                  <span v-if="hospital.emergencyDepartment">🚑 有急诊</span>
                </div>
              </div>
            </div>

            <!-- 状态流转按钮 -->
            <div class="action-bar">
              <SButton
                v-if="selected.status === 'pending'"
                variant="primary"
                @click="changeStatus('processing')"
                :loading="statusLoading"
              >
                接单处理
              </SButton>
              <SButton
                v-if="selected.status === 'processing'"
                variant="primary"
                @click="changeStatus('resolved')"
                :loading="statusLoading"
              >
                标记已解决
              </SButton>
              <SButton
                v-if="selected.status === 'resolved'"
                variant="secondary"
                @click="changeStatus('processing')"
                :loading="statusLoading"
              >
                重新打开
              </SButton>
            </div>
          </div>
        </div>

        <!-- 地图模式 -->
        <div class="map-content" v-if="rightTab === 'map'">
          <div id="rescueMap" class="rescue-map"></div>
        </div>
      </SCard>
    </div>

    </template><!-- /dispatch tab -->

    <!-- AI 决策建议弹窗 -->
    <el-dialog
      v-model="decisionDialogVisible"
      title="🤖 AI 决策建议"
      width="560px"
      :close-on-click-modal="false"
      destroy-on-close
    >
      <div v-if="agentDecision" class="decision-card">
        <div class="decision-header">
          <el-tag :type="agentDecision.severity === 'critical' ? 'danger' : agentDecision.severity === 'high' ? 'warning' : 'info'" effect="dark" round size="large">
            {{ { critical: '致命级', high: '高危', medium: '中等', low: '低风险' }[agentDecision.severity] || agentDecision.severity }}
          </el-tag>
          <span class="decision-snake">🐍 {{ agentDecision.snakeName || '待确认' }}</span>
          <span v-if="agentDecision.venomType" class="decision-venom">毒液: {{ agentDecision.venomType }}</span>
        </div>

        <div class="decision-section">
          <h4>📋 决策摘要</h4>
          <p class="decision-summary">{{ agentDecision.summary }}</p>
        </div>

        <div class="decision-section" v-if="agentDecision.hospitals?.length">
          <h4>🏥 推荐医院</h4>
          <div class="decision-hospital" v-for="(h, i) in agentDecision.hospitals" :key="h.hospitalId">
            <div class="hospital-rank">{{ i === 0 ? '⭐ 推荐' : i + 1 }}</div>
            <div class="hospital-info">
              <div class="hospital-name">{{ h.hospitalName }}</div>
              <div class="hospital-meta">
                <span v-if="h.serumAmount > 0">血清 {{ h.serumAmount }} 支</span>
                <span v-if="h.distanceKm">距离 {{ h.distanceKm }}km</span>
                <span v-if="h.etaMinutes">预计 {{ h.etaMinutes }} 分钟</span>
              </div>
              <div class="hospital-addr" v-if="h.address">{{ h.address }}</div>
            </div>
          </div>
        </div>

        <div class="decision-section" v-if="agentDecision.firstAidGuide">
          <h4>🩹 急救指导</h4>
          <div class="decision-guide">{{ agentDecision.firstAidGuide }}</div>
        </div>
      </div>

      <template #footer>
        <el-button @click="decisionDialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="decisionDialogVisible = false">确认收到</el-button>
      </template>
    </el-dialog>

    <!-- ===== 预警管理 Tab ===== -->
    <template v-if="mainTab === 'warning'">
    <div class="warning-panels">
      <!-- 左侧：区域树 -->
      <SCard class="region-tree-panel">
        <template #header>
          <div class="region-header">
            <h3>区域管理</h3>
            <SButton variant="primary" size="sm" @click="showAddRegionDialog">+ 新建</SButton>
          </div>
        </template>
        <div class="region-tree-body">
          <div v-if="regionTree.length === 0" class="empty-wrap">
            <el-empty description="暂无区域，请先创建大区" :image-size="60" />
          </div>
          <div v-else class="tree-list">
            <div v-for="region in regionTree" :key="region.id" class="tree-group">
              <div class="tree-node level-1" @click="selectRegion(region)" :class="{ active: selectedRegionId === region.id }">
                <span class="tree-arrow" @click.stop="toggleRegionExpand(region.id)">
                  {{ expandedRegions.has(region.id) ? '▼' : '▶' }}
                </span>
                <span class="tree-name">{{ region.name }}</span>
                <el-tag size="small" type="info">大区</el-tag>
              </div>
              <div v-if="expandedRegions.has(region.id) && region.children" class="tree-children">
                <div v-for="province in region.children" :key="province.id" class="tree-group">
                  <div class="tree-node level-2" @click="selectRegion(province)" :class="{ active: selectedRegionId === province.id }">
                    <span class="tree-arrow" @click.stop="toggleRegionExpand(province.id)">
                      {{ expandedRegions.has(province.id) ? '▼' : '▶' }}
                    </span>
                    <span class="tree-name">{{ province.name }}</span>
                    <el-tag size="small" type="warning">省/市</el-tag>
                  </div>
                  <div v-if="expandedRegions.has(province.id) && province.children" class="tree-children">
                    <div v-for="area in province.children" :key="area.id" class="tree-node level-3" @click="selectRegion(area)" :class="{ active: selectedRegionId === area.id }">
                      <span class="tree-name">{{ area.name }}</span>
                      <el-tag size="small" type="danger">区域</el-tag>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SCard>

      <!-- 右侧：地图 + 操作 -->
      <SCard class="warning-main-panel" :style="{ padding: '0' }">
        <template #header>
          <div class="warning-tabs">
            <button :class="{ active: warningTab === 'map' }" @click="warningTab = 'map'">预警地图</button>
            <button :class="{ active: warningTab === 'areas' }" @click="warningTab = 'areas'">预警区域</button>
            <button :class="{ active: warningTab === 'serum' }" @click="warningTab = 'serum'">血清库存</button>
          </div>
        </template>

        <!-- 预警地图 -->
        <div v-show="warningTab === 'map'" class="warning-content">
          <div v-if="!selectedRegionId" class="empty-wrap">
            <el-empty description="请先在左侧选择一个具体区域" />
          </div>
          <div v-else>
            <div class="map-toolbar">
              <template v-if="verifiedRole === 'forester'">
                <el-button type="primary" size="small" @click="startDrawPolygon" :disabled="!selectedRegionId" v-if="!isDrawing">
                  绘制预警区域
                </el-button>
                <el-button size="small" @click="clearDraw" v-if="isDrawing">取消绘制</el-button>
                <span class="map-hint" v-if="isDrawing">点击地图绘制多边形，双击完成</span>
                <template v-if="selectedAreaId && !isDrawing">
                  <el-button size="small" @click="openEditAreaDialog(warningAreas.find(a => a.id === selectedAreaId))">编辑信息</el-button>
                  <el-button type="warning" size="small" @click="redrawSelectedArea">重绘边界</el-button>
                  <el-button type="danger" size="small" @click="deleteSelectedArea" :loading="areaDeleting">删除</el-button>
                  <el-button size="small" @click="selectedAreaId = null">取消选择</el-button>
                </template>
              </template>
              <span v-else class="map-hint">当前角色仅可查看预警区域，林业员可编辑</span>
            </div>
            <div id="warningMap" class="warning-map"></div>
          </div>
        </div>

        <!-- 预警区域列表 -->
        <div v-if="warningTab === 'areas'" class="warning-content">
          <div class="area-toolbar">
            <span>当前区域：{{ selectedRegionName || '未选择' }}</span>
          </div>
          <el-table :data="warningAreas" stripe style="width: 100%" v-loading="areasLoading">
            <el-table-column prop="areaName" label="区域名称" />
            <el-table-column prop="warningLevel" label="预警等级" width="100">
              <template #default="{ row }">
                <el-tag :type="levelType(row.warningLevel)">{{ levelText(row.warningLevel) }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="creatorRole" label="创建者" width="100">
              <template #default="{ row }">
                {{ row.creatorRole === 'forester' ? '护林员' : row.creatorRole === 'medic' ? '医护' : '管理员' }}
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="180">
              <template #default="{ row }">{{ formatTime(row.createTime) }}</template>
            </el-table-column>
            <el-table-column label="操作" width="200" v-if="verifiedRole === 'forester'">
              <template #default="{ row }">
                <el-button size="small" @click="openEditAreaDialog(row)">编辑</el-button>
                <el-button type="warning" size="small" @click="goRedrawArea(row)">重绘</el-button>
                <el-button type="danger" size="small" @click="deleteAreaFromTable(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- 血清库存 -->
        <div v-if="warningTab === 'serum'" class="warning-content">
          <div class="area-toolbar">
            <span>当前区域：{{ selectedRegionName || '未选择' }}</span>
            <SButton variant="primary" size="sm" @click="showAddSerumDialog" :disabled="!selectedRegionId" v-if="verifiedRole === 'medic'">+ 新增血清</SButton>
            <span v-if="verifiedRole === 'forester'" style="font-size: 12px; color: var(--ink-400)">医护人员可编辑血清信息</span>
          </div>
          <el-table :data="serumList" stripe style="width: 100%" v-loading="serumLoading">
            <el-table-column prop="hospital_name" label="医院" />
            <el-table-column prop="snake_name" label="蛇种" width="120" />
            <el-table-column prop="serum_name" label="血清名称" />
            <el-table-column prop="stock_count" label="库存" width="80" />
            <el-table-column prop="expiry_date" label="有效期" width="120" />
          </el-table>
        </div>
      </SCard>
    </div>
    </template><!-- /warning tab -->

    <!-- 预警区域 创建/编辑 对话框 -->
    <el-dialog v-model="areaDialogVisible" :title="editingAreaId ? '编辑预警区域' : '创建预警区域'" width="500px" :close-on-click-modal="false">
      <el-form :model="areaForm" label-width="100px">
        <el-form-item label="区域名称" required>
          <el-input v-model="areaForm.areaName" placeholder="例如：杭州西部山区高风险区" />
        </el-form-item>
        <el-form-item label="预警等级">
          <el-select v-model="areaForm.warningLevel" style="width: 100%">
            <el-option label="低风险" :value="1" />
            <el-option label="中风险" :value="2" />
            <el-option label="高风险" :value="3" />
            <el-option label="极高风险" :value="4" />
          </el-select>
        </el-form-item>
        <el-form-item label="蛇种">
          <el-input v-model="areaForm.snakeSpecies" placeholder="例如：五步蛇、银环蛇" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="areaForm.description" type="textarea" :rows="3" placeholder="预警区域描述..." />
        </el-form-item>
        <el-form-item label="边界坐标" v-if="!editingAreaId">
          <el-input v-model="areaForm.boundaryCoordinates" type="textarea" :rows="2" disabled />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="areaDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitArea" :loading="areaDialogLoading">
          {{ editingAreaId ? '保存修改' : '创建' }}
        </el-button>
      </template>
    </el-dialog>

    <!-- 新建区域对话框 -->
    <el-dialog v-model="regionDialogVisible" title="新建区域" width="500px" :close-on-click-modal="false">
      <el-form :model="regionForm" label-width="100px">
        <el-form-item label="区域名称" required>
          <el-input v-model="regionForm.name" placeholder="例如：华东地区、浙江、杭州西部山区" />
        </el-form-item>
        <el-form-item label="区域层级">
          <el-select v-model="regionForm.level" style="width: 100%">
            <el-option label="大区" :value="1" />
            <el-option label="省/市" :value="2" />
            <el-option label="具体区域" :value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="父区域ID">
          <el-input-number v-model="regionForm.parentId" :min="0" placeholder="留空表示顶级区域" style="width: 100%" />
        </el-form-item>
        <el-form-item label="中心经度">
          <el-input-number v-model="regionForm.centerLng" :precision="6" :step="0.1" style="width: 100%" />
        </el-form-item>
        <el-form-item label="中心纬度">
          <el-input-number v-model="regionForm.centerLat" :precision="6" :step="0.1" style="width: 100%" />
        </el-form-item>
        <el-form-item label="缩放级别">
          <el-input-number v-model="regionForm.zoomLevel" :min="1" :max="20" style="width: 100%" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="regionDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitRegion" :loading="regionDialogLoading">创建</el-button>
      </template>
    </el-dialog>

    <!-- 血清信息对话框 -->
    <el-dialog v-model="serumDialogVisible" title="新增血清信息" width="500px" :close-on-click-modal="false">
      <el-form :model="serumForm" label-width="100px">
        <el-form-item label="医院名称">
          <el-input v-model="serumForm.hospitalName" placeholder="例如：杭州市第一人民医院" />
        </el-form-item>
        <el-form-item label="蛇种">
          <el-input v-model="serumForm.snakeName" placeholder="例如：五步蛇" />
        </el-form-item>
        <el-form-item label="血清名称" required>
          <el-input v-model="serumForm.serumName" placeholder="例如：抗五步蛇毒血清" />
        </el-form-item>
        <el-form-item label="库存数量">
          <el-input-number v-model="serumForm.stockCount" :min="0" style="width: 100%" />
        </el-form-item>
        <el-form-item label="有效期">
          <el-date-picker v-model="serumForm.expiryDate" type="date" placeholder="选择日期" style="width: 100%" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="serumDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitSerum" :loading="serumDialogLoading">添加</el-button>
      </template>
    </el-dialog>

    <!-- 进页面角色验证对话框 -->
    <el-dialog v-model="roleDialogVisible" title="身份验证" width="440px"
      :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <div style="margin-bottom: 16px; color: var(--ink-600); font-size: 13px;">
        请选择您的角色并输入二级密码，验证通过后方可操作救助调度中心。
      </div>
      <el-form @submit.prevent="confirmRoleVerify">
        <el-form-item label="角色">
          <div class="role-select">
            <div
              v-for="(info, key) in ROLES"
              :key="key"
              class="role-option"
              :class="{ active: selectedRole === key }"
              @click="selectedRole = key"
            >
              <div class="role-option-label">{{ info.label }}</div>
              <div class="role-option-desc">{{ info.desc }}</div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="二级密码">
          <el-input v-model="rolePassword" type="password" show-password placeholder="请输入对应角色的二级密码" @keyup.enter="confirmRoleVerify" />
        </el-form-item>
      </el-form>
      <div v-if="roleError" style="color: #ef4444; font-size: 12px; margin-top: -8px;">{{ roleError }}</div>
      <template #footer>
        <el-button @click="$router.push('/dashboard')">返回首页</el-button>
        <el-button type="primary" @click="confirmRoleVerify" :loading="roleLoading">
          验证并进入
        </el-button>
      </template>
    </el-dialog>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElNotification, ElMessageBox } from 'element-plus'
import { Loading, ArrowLeft, Warning, FirstAidKit, Location, Document } from '@element-plus/icons-vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import SCard from '../components/ui/SCard.vue'
import SButton from '../components/ui/SButton.vue'
import SStatCard from '../components/ui/SStatCard.vue'

const router = useRouter()
import { emergencyApi, rescueRegionApi, rescueWarningApi, rescueSerumApi } from '../services/api'
import { useUserStore } from '../store/user'
import { useWebSocket } from '../composables/useWebSocket'

// 主Tab
const mainTab = ref('dispatch')

const darkMode = ref(document.body.classList.contains('dark-mode'))
const userStore = useUserStore()
const isAdmin = ref(userStore.isAdmin)

// 统计
const stats = reactive({ total: 0, pending: 0, processing: 0, resolved: 0 })

// 列表
const helpList = ref([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = 10
const total = ref(0)
const currentFilter = ref('')

// 选中项
const selected = ref(null)
const selectedId = ref(null)
const statusLoading = ref(false)

// 识别信息相关
const emergencyDetail = ref(null)
const hospitalList = ref([])

// 右侧Tab
const rightTab = ref('detail')

// 实时轮询
const pollingActive = ref(true)
let pollingTimer = null
let lastPollTime = Date.now()
let knownIds = new Set()
let notificationGranted = false

// WebSocket 连接
const { connected: wsConnected, onMessage: onWsMessage } = useWebSocket()

// AI 决策建议
const agentDecision = ref(null)
const decisionDialogVisible = ref(false)

// 地图
let map = null
let AMap = null

// ===== 预警管理状态 =====
const warningTab = ref('map')
const regionTree = ref([])
const expandedRegions = ref(new Set())
const selectedRegionId = ref(null)
const selectedRegionName = ref('')
const warningAreas = ref([])
const areasLoading = ref(false)
const serumList = ref([])
const serumLoading = ref(false)
const isDrawing = ref(false)
const selectedAreaId = ref(null) // 地图上选中的预警区域
const areaDeleting = ref(false)
let warningMap = null
let warningAMap = null
let mouseTool = null

// 对话框状态
const areaDialogVisible = ref(false)
const areaDialogLoading = ref(false)
const areaForm = reactive({
  areaName: '',
  warningLevel: 1,
  snakeSpecies: '',
  description: '',
  boundaryCoordinates: ''
})

// 编辑预警区域信息
const editingAreaId = ref(null)

const regionDialogVisible = ref(false)
const regionDialogLoading = ref(false)
const regionForm = reactive({
  name: '',
  parentId: null,
  level: 1,
  centerLng: null,
  centerLat: null,
  zoomLevel: 10
})

const serumDialogVisible = ref(false)
const serumDialogLoading = ref(false)
const serumForm = reactive({
  hospitalName: '',
  snakeName: '',
  serumName: '',
  stockCount: 0,
  expiryDate: ''
})

// ===== 角色验证（进页面必须先验证） =====
const roleDialogVisible = ref(false)
const selectedRole = ref('forester')
const rolePassword = ref('')
const roleError = ref('')
const roleLoading = ref(false)
const verifiedRole = ref('')      // 验证通过后存储角色
const verifiedPassword = ref('')   // 验证通过后存储密码
const roleVerified = ref(false)    // 是否已验证

const ROLES = {
  forester: { label: '林业员', desc: '可编辑预警区域、预警等级' },
  medic:    { label: '医护人员', desc: '可编辑血清库存、医疗信息' }
}

// 进页面弹出验证
const initRoleVerify = () => {
  roleDialogVisible.value = true
  selectedRole.value = 'forester'
  rolePassword.value = ''
  roleError.value = ''
}

const confirmRoleVerify = async () => {
  if (!rolePassword.value.trim()) {
    roleError.value = '请输入二级密码'
    return
  }
  roleLoading.value = true
  roleError.value = ''
  try {
    const res = await rescueWarningApi.verifyPassword({
      role: selectedRole.value,
      password: rolePassword.value
    })
    if (res.data.code === 200 && res.data.data?.valid) {
      verifiedRole.value = selectedRole.value
      verifiedPassword.value = rolePassword.value
      roleVerified.value = true
      roleDialogVisible.value = false
      ElMessage.success(`已以「${ROLES[selectedRole.value].label}」身份进入`)
    } else {
      roleError.value = res.data.message || '密码错误'
    }
  } catch (e) {
    roleError.value = '验证失败：' + (e.response?.data?.message || e.message || '网络错误')
  } finally {
    roleLoading.value = false
  }
}

// 格式化类型标签
const typeLabel = (type) => {
  const map = { snake_bite: '蛇咬伤', animal_harm: '动物伤害', other: '其他' }
  return map[type] || type || '未知'
}

// 格式化状态标签
const statusLabel = (status) => {
  const map = { pending: '待处理', processing: '处理中', resolved: '已解决' }
  return map[status] || status || '未知'
}

// 类型颜色
const typeColor = (type) => {
  const map = { snake_bite: 'danger', animal_harm: 'warning', other: 'info' }
  return map[type] || 'info'
}

// 状态颜色
const statusColor = (status) => {
  const map = { pending: 'danger', processing: 'warning', resolved: 'success' }
  return map[status] || 'info'
}

// 格式化时间
const formatTime = (t) => {
  if (!t) return '--'
  return new Date(t).toLocaleString('zh-CN')
}

// 加载统计
const loadStats = async () => {
  try {
    const res = await emergencyApi.getRescueStats()
    if (res.data.code === 200) {
      Object.assign(stats, res.data.data)
    }
  } catch (e) {
    console.error('Failed to load stats', e)
  }
}

// 加载列表
const loadList = async () => {
  loading.value = true
  try {
    const params = { page: currentPage.value, size: pageSize }
    if (currentFilter.value) params.status = currentFilter.value
    const res = await emergencyApi.getRescueList(params)
    if (res.data.code === 200) {
      helpList.value = res.data.data.records || []
      total.value = res.data.data.total || 0
      // Track known IDs for polling
      helpList.value.forEach(item => knownIds.add(item.id))
    }
  } catch (e) {
    console.error('Failed to load list', e)
  } finally {
    loading.value = false
  }
}

// 选中求助
const selectHelp = async (item) => {
  selected.value = item
  selectedId.value = item.id
  rightTab.value = 'detail'
  emergencyDetail.value = null
  hospitalList.value = []

  // 加载完整详情
  try {
    const res = await emergencyApi.getRescueDetail(item.id)
    if (res.data.code === 200) {
      selected.value = res.data.data

      // 如果有蛇名，加载急救信息和医院列表
      if (selected.value.snakeName) {
        await loadEmergencyInfo(selected.value.snakeName)
        if (selected.value.snakeId) {
          await loadHospitalList(selected.value.snakeId)
        }
      }
    }
  } catch (e) {
    console.error('Failed to load detail', e)
  }
}

// 加载急救信息
const loadEmergencyInfo = async (snakeName) => {
  try {
    const res = await emergencyApi.getEmergencyGuideByName(snakeName)
    if (res.data.code === 200) {
      emergencyDetail.value = res.data.data
    }
  } catch (e) {
    console.error('Failed to load emergency info', e)
  }
}

// 加载医院列表
const loadHospitalList = async (snakeId) => {
  try {
    const res = await rescueSerumApi.getHospitalsWithSerum(snakeId)
    if (res.data.code === 200) {
      hospitalList.value = res.data.data || []
    }
  } catch (e) {
    console.error('Failed to load hospital list', e)
  }
}

// 获取毒性等级文本
const getToxicityText = (level) => {
  if (level >= 3) return '剧毒'
  if (level >= 2) return '有毒'
  if (level >= 1) return '低毒'
  return '无毒'
}

// 状态流转
const changeStatus = async (newStatus) => {
  if (!selected.value) return
  statusLoading.value = true
  try {
    const res = await emergencyApi.updateRescueStatus(selected.value.id, newStatus)
    if (res.data.code === 200) {
      ElMessage.success(`状态已更新为: ${statusLabel(newStatus)}`)
      selected.value.status = newStatus
      await loadList()
      await loadStats()
    } else {
      ElMessage.error(res.data.message || '更新失败')
    }
  } catch (e) {
    ElMessage.error('状态更新失败')
  } finally {
    statusLoading.value = false
  }
}

// 声音警报
const playAlertSound = (type) => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    if (type === 'snake_bite') {
      // 蛇咬伤：高频急促警报
      oscillator.type = 'square'
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1)
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2)
      gainNode.gain.setValueAtTime(0.5, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)
    } else {
      // 普通求助：低频平缓
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(400, audioContext.currentTime)
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.3)
    }
  } catch (e) {
    console.warn('播放警报声音失败:', e)
  }
}

// 实时轮询
const pollLatest = async () => {
  if (!pollingActive.value) return
  try {
    const res = await emergencyApi.getRescueLatest(lastPollTime)
    lastPollTime = Date.now()
    if (res.data.code === 200) {
      const newItems = (res.data.data || []).filter(item => !knownIds.has(item.id))
      if (newItems.length > 0) {
        newItems.forEach(item => knownIds.add(item.id))

        // 检查是否有蛇咬伤求助
        const hasSnakeBite = newItems.some(item => item.type === 'snake_bite')

        // 播放警报声音
        playAlertSound(hasSnakeBite ? 'snake_bite' : 'normal')

        // 浏览器通知
        if (notificationGranted) {
          newItems.forEach(item => {
            new Notification(hasSnakeBite ? '⚠️ 蛇咬伤求助！' : '新求助到达', {
              body: `${typeLabel(item.type)} — ${item.location}`,
              icon: '/favicon.ico',
              tag: `help-${item.id}`,
              requireInteraction: hasSnakeBite // 蛇咬伤通知不自动关闭
            })
          })
        }

        // 插入到列表顶部
        helpList.value = [...newItems, ...helpList.value]
        total.value += newItems.length
        stats.total += newItems.length
        stats.pending += newItems.filter(i => i.status === 'pending').length
        ElMessage({
          message: hasSnakeBite ? `⚠️ 收到蛇咬伤求助！` : `收到 ${newItems.length} 条新求助`,
          type: hasSnakeBite ? 'error' : 'warning',
          duration: hasSnakeBite ? 0 : 5000 // 蛇咬伤消息不自动关闭
        })
      }
    }
  } catch (e) {
    // silent fail for polling
  }
}

// WebSocket 事件处理
const initWebSocket = () => {
  // 新 SOS 到达
  onWsMessage('/topic/sos/new', (msg) => {
    const event = msg.data
    if (!event || knownIds.has(event.helpId)) return
    knownIds.add(event.helpId)

    // 构造列表项
    const newItem = {
      id: event.helpId,
      type: event.type,
      location: event.location,
      description: event.description,
      phone: event.phone,
      snakeName: event.snakeName,
      status: 'pending',
      createTime: event.eventTime ? new Date(event.eventTime) : new Date()
    }

    helpList.value = [newItem, ...helpList.value]
    total.value += 1
    stats.total += 1
    stats.pending += 1

    const isSnakeBite = event.type === 'snake_bite'
    playAlertSound(isSnakeBite ? 'snake_bite' : 'normal')

    if (notificationGranted) {
      new Notification(isSnakeBite ? '⚠️ 蛇咬伤求助！' : '新求助到达', {
        body: `${typeLabel(event.type)} — ${event.location}`,
        icon: '/favicon.ico',
        tag: `help-${event.helpId}`,
        requireInteraction: isSnakeBite
      })
    }

    ElMessage({
      message: isSnakeBite ? `⚠️ 收到蛇咬伤求助！` : `收到新求助`,
      type: isSnakeBite ? 'error' : 'warning',
      duration: isSnakeBite ? 0 : 5000
    })
  })

  // Agent 决策结果
  onWsMessage('/topic/agent/decision', (msg) => {
    const decision = msg.data
    if (!decision) return
    agentDecision.value = decision
    decisionDialogVisible.value = true

    // 更新列表中对应 SOS 的状态
    const idx = helpList.value.findIndex(h => h.id === decision.helpId)
    if (idx >= 0) {
      helpList.value[idx].status = 'processing'
      stats.pending = Math.max(0, stats.pending - 1)
      stats.processing += 1
    }

    ElNotification({
      title: '🤖 AI 决策建议',
      message: decision.summary || '新的决策建议已生成',
      type: 'info',
      duration: 0
    })
  })

  // SOS 状态变更
  onWsMessage('/topic/sos/status', (msg) => {
    const event = msg.data
    if (!event) return
    const idx = helpList.value.findIndex(h => h.id === event.helpId)
    if (idx >= 0) {
      const oldStatus = helpList.value[idx].status
      helpList.value[idx].status = event.status
      // 更新统计
      if (oldStatus !== event.status) {
        stats[oldStatus] = Math.max(0, (stats[oldStatus] || 0) - 1)
        stats[event.status] = (stats[event.status] || 0) + 1
      }
    }
  })
}

// 请求通知权限
const requestNotification = async () => {
  if (!('Notification' in window)) return
  if (Notification.permission === 'granted') {
    notificationGranted = true
  } else if (Notification.permission !== 'denied') {
    const perm = await Notification.requestPermission()
    notificationGranted = perm === 'granted'
  }
}

// 初始化地图
const initMap = async () => {
  await nextTick()
  try {
    AMap = await loadAMapSDK()
    const mapEl = document.getElementById('rescueMap')
    if (!mapEl) {
      console.warn('Map container not found')
      return
    }

    // 确保容器有尺寸
    if (mapEl.offsetWidth === 0 || mapEl.offsetHeight === 0) {
      console.warn('Map container has no size, retrying...')
      setTimeout(() => initMap(), 200)
      return
    }

    // 销毁旧地图实例
    if (map) {
      map.destroy()
      map = null
    }

    map = new AMap.Map('rescueMap', {
      center: [116.39748, 39.90882],
      zoom: 5,
      resizeEnable: true,
      viewMode: '2D'
    })

    map.on('complete', () => {
      console.log('Map loaded successfully')
    })

    AMap.plugin(['AMap.Scale'], () => {
      if (map) {
        map.addControl(new AMap.Scale())
      }
    })
  } catch (e) {
    console.error('Map init failed:', e)
    ElMessage.warning('地图加载失败，请检查网络连接')
  }
}

// 加载高德地图SDK（使用官方 Loader）
const loadAMapSDK = async () => {
  if (window.AMap && window.AMap.Map) {
    return window.AMap
  }

  try {
    const AMap = await AMapLoader.load({
      key: '5b3ed07d3b4e322b48d421a9e84ebd9a',
      version: '2.0',
      plugins: ['AMap.Scale', 'AMap.MouseTool']
    })
    return AMap
  } catch (e) {
    console.error('Failed to load AMap SDK:', e)
    throw e
  }
}

// 更新地图标记
const updateMapMarkers = () => {
  if (!map || !AMap) return
  map.clearMap()
  const locItems = helpList.value.filter(i => {
    const loc = i.location || ''
    return loc.includes('纬度') && loc.includes('经度')
  })

  if (locItems.length === 0) return

  const markers = locItems.map(item => {
    const latMatch = item.location.match(/纬度[:\s]*([\d.]+)/)
    const lonMatch = item.location.match(/经度[:\s]*([\d.]+)/)
    if (!latMatch || !lonMatch) return null
    const lat = parseFloat(latMatch[1])
    const lon = parseFloat(lonMatch[1])
    const marker = new AMap.Marker({
      position: [lon, lat],
      title: `#${item.id} ${typeLabel(item.type)}`,
      label: {
        content: `${typeLabel(item.type)}`,
        direction: 'top'
      }
    })
    marker.on('click', () => selectHelp(item))
    return marker
  }).filter(Boolean)

  map.add(markers)
  map.setFitView(null, false, [60, 60, 60, 60])
}

// ===== 预警管理方法 =====

// 加载区域树
const loadRegionTree = async () => {
  try {
    const res = await rescueRegionApi.getTree()
    if (res.data.code === 200) {
      regionTree.value = res.data.data || []
    }
  } catch (e) {
    console.error('Failed to load region tree', e)
  }
}

// 展开/折叠区域
const toggleRegionExpand = (id) => {
  if (expandedRegions.value.has(id)) {
    expandedRegions.value.delete(id)
  } else {
    expandedRegions.value.add(id)
  }
}

// 选中区域
const selectRegion = async (region) => {
  selectedRegionId.value = region.id
  selectedRegionName.value = region.name
  selectedAreaId.value = null // 切换区域时清除选中的预警区域

  // level 3 具体区域：加载预警区域和血清
  if (region.level === 3) {
    await Promise.all([loadWarningAreas(region.id), loadSerumList(region.id)])
  }

  // 所有级别都更新地图中心
  if (warningTab.value === 'map') {
    setTimeout(() => updateWarningMapCenter(region), 100)
  }
}

// 更新预警地图中心（不销毁重建，直接移动）
const updateWarningMapCenter = async (region) => {
  const center = region.centerLng && region.centerLat
    ? [parseFloat(region.centerLng), parseFloat(region.centerLat)]
    : [116.39748, 39.90882]
  const zoom = region.zoomLevel || (region.level === 1 ? 5 : region.level === 2 ? 8 : 12)

  if (warningMap) {
    // 已有实例，直接移动，秒级响应
    warningMap.setCenter(center)
    warningMap.setZoom(zoom, false, 300) // 300ms 动画
    // level 3 时重绘区域
    if (region.level === 3) {
      drawExistingAreas()
    }
  } else {
    // 首次初始化
    await initWarningMap(region)
  }
}

// 加载预警区域
const loadWarningAreas = async (regionId) => {
  areasLoading.value = true
  try {
    const res = await rescueWarningApi.getAreas({ regionId })
    if (res.data.code === 200) {
      warningAreas.value = res.data.data?.list || []
    }
  } catch (e) {
    console.error('Failed to load warning areas', e)
  } finally {
    areasLoading.value = false
  }
}

// 加载血清库存
const loadSerumList = async (regionId) => {
  serumLoading.value = true
  try {
    const res = await rescueSerumApi.getList(regionId)
    if (res.data.code === 200) {
      serumList.value = res.data.data || []
    }
  } catch (e) {
    console.error('Failed to load serum list', e)
  } finally {
    serumLoading.value = false
  }
}

// 预警等级
const levelType = (level) => {
  const map = { 1: 'success', 2: 'warning', 3: 'danger', 4: 'danger' }
  return map[level] || 'info'
}
const levelText = (level) => {
  const map = { 1: '低风险', 2: '中风险', 3: '高风险', 4: '极高' }
  return map[level] || '未知'
}

// 初始化预警地图（仅首次创建实例，后续用 updateWarningMapCenter 移动）
const initWarningMap = async (region) => {
  await nextTick()
  try {
    if (!warningAMap) {
      warningAMap = await loadAMapSDK()
    }
    const mapEl = document.getElementById('warningMap')
    if (!mapEl) {
      console.warn('Warning map container not found')
      return
    }

    // 确保容器有尺寸
    if (mapEl.offsetWidth === 0 || mapEl.offsetHeight === 0) {
      console.warn('Warning map container has no size, retrying...')
      setTimeout(() => initWarningMap(region), 200)
      return
    }

    // 如果已有实例，只移动不重建
    if (warningMap) {
      updateWarningMapCenter(region)
      return
    }

    const center = region.centerLng && region.centerLat
      ? [parseFloat(region.centerLng), parseFloat(region.centerLat)]
      : [116.39748, 39.90882]
    const zoom = region.zoomLevel || (region.level === 1 ? 5 : region.level === 2 ? 8 : 12)

    warningMap = new warningAMap.Map('warningMap', {
      center,
      zoom,
      mapStyle: 'amap://styles/normal',
      resizeEnable: true,
      viewMode: '2D'
    })

    warningMap.on('complete', () => {
      console.log('Warning map loaded successfully')
      drawExistingAreas()
    })

    warningAMap.plugin(['AMap.Scale', 'AMap.MouseTool'], () => {
      if (warningMap) {
        warningMap.addControl(new warningAMap.Scale())
        mouseTool = new warningAMap.MouseTool(warningMap)
      }
    })
  } catch (e) {
    console.error('Warning map init failed:', e)
    ElMessage.warning('预警地图加载失败，请检查网络连接')
  }
}

// 绘制已有的预警区域多边形
const drawExistingAreas = () => {
  if (!warningMap || !warningAMap) return
  warningMap.clearMap()

  warningAreas.value.forEach(area => {
    if (!area.boundaryCoordinates) return
    try {
      const geo = JSON.parse(area.boundaryCoordinates)
      if (geo.type === 'Polygon' && geo.coordinates?.[0]) {
        const path = geo.coordinates[0].map(c => new warningAMap.LngLat(c[0], c[1]))
        const colors = { 1: '#10b981', 2: '#f59e0b', 3: '#ef4444', 4: '#991b1b' }
        const color = colors[area.warningLevel] || '#6b7280'
        const isSelected = selectedAreaId.value === area.id

        const polygon = new warningAMap.Polygon({
          path,
          fillColor: color,
          fillOpacity: isSelected ? 0.45 : 0.25,
          strokeColor: isSelected ? '#3b82f6' : color,
          strokeWeight: isSelected ? 3 : 2,
          cursor: 'pointer'
        })

        // 存储关联的 area id
        polygon.setExtData({ areaId: area.id, areaName: area.areaName })

        polygon.on('click', () => {
          selectedAreaId.value = area.id
          // 重绘以更新高亮
          drawExistingAreas()
        })

        warningMap.add(polygon)
      }
    } catch (e) {
      console.warn('Failed to parse area boundary', area.areaName)
    }
  })

  // 选中区域时添加标签
  if (selectedAreaId.value) {
    const sel = warningAreas.value.find(a => a.id === selectedAreaId.value)
    if (sel?.boundaryCoordinates) {
      try {
        const geo = JSON.parse(sel.boundaryCoordinates)
        if (geo.coordinates?.[0]?.length > 0) {
          const coords = geo.coordinates[0]
          const centerLng = coords.reduce((s, c) => s + c[0], 0) / coords.length
          const centerLat = coords.reduce((s, c) => s + c[1], 0) / coords.length
          const label = new warningAMap.Marker({
            position: [centerLng, centerLat],
            label: {
              content: `<div style="background:#3b82f6;color:#fff;padding:2px 8px;border-radius:4px;font-size:12px;white-space:nowrap">${sel.areaName}</div>`,
              direction: 'top'
            },
            offset: new warningAMap.Pixel(0, -10)
          })
          warningMap.add(label)
        }
      } catch (e) { /* ignore */ }
    }
  }

  warningMap.setFitView(null, false, [40, 40, 40, 40])
}

// 开始绘制多边形
const startDrawPolygon = () => {
  if (!mouseTool || !warningAMap) return
  isDrawing.value = true

  mouseTool.polygon({
    fillColor: '#ef4444',
    fillOpacity: 0.25,
    strokeColor: '#ef4444',
    strokeWeight: 2
  })

  mouseTool.on('draw', (event) => {
    isDrawing.value = false
    const polygon = event.obj
    const path = polygon.getPath()
    const coordinates = path.map(p => [p.lng, p.lat])
    coordinates.push(coordinates[0]) // 闭合

    const geoJson = JSON.stringify({
      type: 'Polygon',
      coordinates: [coordinates]
    })

    // 弹出创建预警区域对话框
    openCreateAreaDialog(geoJson)
  })
}

// 取消绘制
const clearDraw = () => {
  isDrawing.value = false
  if (mouseTool) mouseTool.close(true)
}

// 删除地图上选中的预警区域
const deleteSelectedArea = async () => {
  if (!selectedAreaId.value) return
  const area = warningAreas.value.find(a => a.id === selectedAreaId.value)
  if (!area) return

  try {
    await ElMessageBox.confirm(
      `确定删除预警区域「${area.areaName}」？此操作不可撤销。`,
      '删除确认',
      { confirmButtonText: '删除', cancelButtonText: '取消', type: 'warning' }
    )
  } catch {
    return // 用户取消
  }

  areaDeleting.value = true
  try {
    const res = await rescueWarningApi.deleteArea(area.id, { secondaryPassword: verifiedPassword.value, role: verifiedRole.value })
    if (res.data.code === 200) {
      ElMessage.success('已删除')
      selectedAreaId.value = null
      await loadWarningAreas(selectedRegionId.value)
      drawExistingAreas()
    } else {
      ElMessage.error(res.data.message || '删除失败')
    }
  } catch (e) {
    ElMessage.error('删除失败：' + (e.message || '网络错误'))
  } finally {
    areaDeleting.value = false
  }
}

// 重绘地图上选中的预警区域（删除旧的，开始绘制新的）
const redrawSelectedArea = async () => {
  if (!selectedAreaId.value) return
  const area = warningAreas.value.find(a => a.id === selectedAreaId.value)
  if (!area) return

  try {
    await ElMessageBox.confirm(
      `确定重绘「${area.areaName}」？旧边界将被替换。`,
      '重绘确认',
      { confirmButtonText: '开始重绘', cancelButtonText: '取消', type: 'warning' }
    )
  } catch {
    return
  }

  // 删除旧区域
  areaDeleting.value = true
  try {
    const res = await rescueWarningApi.deleteArea(area.id, { secondaryPassword: verifiedPassword.value, role: verifiedRole.value })
    if (res.data.code === 200) {
      selectedAreaId.value = null
      await loadWarningAreas(selectedRegionId.value)
      drawExistingAreas()
      // 预填表单信息，开始绘制
      areaForm.areaName = area.areaName
      areaForm.warningLevel = area.warningLevel
      areaForm.snakeSpecies = area.snakeSpecies || ''
      areaForm.description = area.description || ''
      ElMessage.info('请在地图上绘制新的边界，双击完成')
      startDrawPolygon()
    } else {
      ElMessage.error(res.data.message || '操作失败')
    }
  } catch (e) {
    ElMessage.error('操作失败：' + (e.message || '网络错误'))
  } finally {
    areaDeleting.value = false
  }
}

// 从表格跳转到地图重绘
const goRedrawArea = (area) => {
  selectedAreaId.value = area.id
  warningTab.value = 'map'
  // watcher 会触发地图初始化，等一下再重绘
  setTimeout(() => redrawSelectedArea(), 300)
}

// 从表格删除
const deleteAreaFromTable = async (area) => {
  try {
    await ElMessageBox.confirm(
      `确定删除预警区域「${area.areaName}」？此操作不可撤销。`,
      '删除确认',
      { confirmButtonText: '删除', cancelButtonText: '取消', type: 'warning' }
    )
  } catch {
    return
  }

  try {
    const res = await rescueWarningApi.deleteArea(area.id, { secondaryPassword: verifiedPassword.value, role: verifiedRole.value })
    if (res.data.code === 200) {
      ElMessage.success('已删除')
      await loadWarningAreas(selectedRegionId.value)
      drawExistingAreas()
    } else {
      ElMessage.error(res.data.message || '删除失败')
    }
  } catch (e) {
    ElMessage.error('删除失败：' + (e.message || '网络错误'))
  }
}

// 打开创建预警区域对话框
const openCreateAreaDialog = (geoJson) => {
  editingAreaId.value = null
  areaForm.boundaryCoordinates = geoJson
  areaForm.areaName = ''
  areaForm.warningLevel = 1
  areaForm.snakeSpecies = ''
  areaForm.description = ''
  areaDialogVisible.value = true
}

// 打开编辑预警区域信息对话框
const openEditAreaDialog = (area) => {
  editingAreaId.value = area.id
  areaForm.areaName = area.areaName || ''
  areaForm.warningLevel = area.warningLevel || 1
  areaForm.snakeSpecies = area.snakeSpecies || ''
  areaForm.description = area.description || ''
  areaForm.boundaryCoordinates = area.boundaryCoordinates || ''
  areaDialogVisible.value = true
}

// 提交预警区域（创建或编辑）
const submitArea = async () => {
  if (!areaForm.areaName.trim()) {
    ElMessage.warning('请输入预警区域名称')
    return
  }

  areaDialogLoading.value = true
  try {
    let res
    if (editingAreaId.value) {
      // 编辑模式
      res = await rescueWarningApi.updateArea(editingAreaId.value, {
        areaName: areaForm.areaName,
        warningLevel: areaForm.warningLevel,
        snakeSpecies: areaForm.snakeSpecies,
        description: areaForm.description,
        creatorRole: verifiedRole.value,
        secondaryPassword: verifiedPassword.value
      })
    } else {
      // 创建模式
      res = await rescueWarningApi.createArea({
        areaName: areaForm.areaName,
        regionId: selectedRegionId.value,
        warningLevel: areaForm.warningLevel,
        snakeSpecies: areaForm.snakeSpecies,
        description: areaForm.description,
        boundaryCoordinates: areaForm.boundaryCoordinates,
        creatorRole: verifiedRole.value,
        secondaryPassword: verifiedPassword.value
      })
    }

    if (res.data.code === 200) {
      ElMessage.success(editingAreaId.value ? '修改成功' : '预警区域创建成功，已同步至用户端')
      areaDialogVisible.value = false
      editingAreaId.value = null
      await loadWarningAreas(selectedRegionId.value)
      drawExistingAreas()
    } else {
      ElMessage.error(res.data.message || '操作失败')
    }
  } catch (e) {
    ElMessage.error('操作失败：' + (e.message || '网络错误'))
  } finally {
    areaDialogLoading.value = false
  }
}

// 显示新建区域对话框
const showAddRegionDialog = () => {
  // 根据当前选中区域确定新区域的层级和父ID
  if (selectedRegionId.value) {
    const parent = findRegionById(selectedRegionId.value)
    if (parent) {
      regionForm.parentId = parent.id
      regionForm.level = parent.level + 1
    }
  } else {
    regionForm.parentId = null
    regionForm.level = 1
  }
  regionForm.name = ''
  regionForm.centerLng = null
  regionForm.centerLat = null
  regionForm.zoomLevel = 10
  regionDialogVisible.value = true
}

// 提交新区域
const submitRegion = async () => {
  if (!regionForm.name.trim()) {
    ElMessage.warning('请输入区域名称')
    return
  }

  regionDialogLoading.value = true
  try {
    const res = await rescueRegionApi.create({
      name: regionForm.name,
      parentId: regionForm.parentId,
      level: regionForm.level,
      centerLng: regionForm.centerLng,
      centerLat: regionForm.centerLat,
      zoomLevel: regionForm.zoomLevel
    })

    if (res.data.code === 200) {
      ElMessage.success('区域创建成功')
      regionDialogVisible.value = false
      // 重新加载区域树
      await loadRegionTree()
    } else {
      ElMessage.error(res.data.message || '创建失败')
    }
  } catch (e) {
    ElMessage.error('创建失败：' + (e.message || '网络错误'))
  } finally {
    regionDialogLoading.value = false
  }
}

// 显示新增血清对话框
const showAddSerumDialog = () => {
  serumForm.hospitalName = ''
  serumForm.snakeName = ''
  serumForm.serumName = ''
  serumForm.stockCount = 0
  serumForm.expiryDate = ''
  serumDialogVisible.value = true
}

// 提交血清信息
const submitSerum = async () => {
  if (!serumForm.serumName.trim()) {
    ElMessage.warning('请输入血清名称')
    return
  }

  serumDialogLoading.value = true
  try {
    const res = await rescueSerumApi.create({
      regionId: selectedRegionId.value,
      hospitalName: serumForm.hospitalName,
      snakeName: serumForm.snakeName,
      serumName: serumForm.serumName,
      stockCount: serumForm.stockCount,
      expiryDate: serumForm.expiryDate,
      creatorRole: verifiedRole.value,
      secondaryPassword: verifiedPassword.value
    })

    if (res.data.code === 200) {
      ElMessage.success('血清信息添加成功')
      serumDialogVisible.value = false
      await loadSerumList(selectedRegionId.value)
    } else {
      ElMessage.error(res.data.message || '添加失败')
    }
  } catch (e) {
    ElMessage.error('添加失败：' + (e.message || '网络错误'))
  } finally {
    serumDialogLoading.value = false
  }
}

// 监听预警Tab切换到地图
watch(warningTab, (tab) => {
  if (tab === 'map' && selectedRegionId.value) {
    const region = findRegionById(selectedRegionId.value)
    if (region) {
      setTimeout(() => {
        if (warningMap) {
          // v-show 保留了 DOM，只需 resize 让地图重新计算尺寸
          warningMap.resize()
          updateWarningMapCenter(region)
        } else {
          initWarningMap(region)
        }
      }, 100)
    }
  }
})

// 在区域树中查找区域
const findRegionById = (id) => {
  for (const r of regionTree.value) {
    if (r.id === id) return r
    if (r.children) {
      for (const c of r.children) {
        if (c.id === id) return c
        if (c.children) {
          const found = c.children.find(a => a.id === id)
          if (found) return found
        }
      }
    }
  }
  return null
}

// 监听Tab切换到地图
watch(rightTab, (tab) => {
  if (tab === 'map') {
    // 延迟初始化，确保容器已渲染
    setTimeout(() => {
      if (!map) {
        initMap().then(() => updateMapMarkers())
      } else {
        map.resize()
        updateMapMarkers()
      }
    }, 100)
  }
})

// 监听筛选条件变化
watch(currentFilter, () => {
  currentPage.value = 1
  loadList()
})

onMounted(async () => {
  initRoleVerify()
  await requestNotification()
  await Promise.all([loadStats(), loadList(), loadRegionTree()])
  initWebSocket()
  // 保留轮询作为 WebSocket 断开时的降级方案
  pollingTimer = setInterval(pollLatest, 10000)
})

onUnmounted(() => {
  if (pollingTimer) clearInterval(pollingTimer)
  if (map) map.destroy()
  if (warningMap) { warningMap.destroy(); warningMap = null }
})
</script>

<style scoped>
.rescue-dashboard {
  width: calc(100% + var(--space-6) * 2);
  height: calc(100vh - 72px);
  margin: calc(-1 * var(--space-6)) calc(-1 * var(--space-6)) 0;
  display: flex;
  flex-direction: column;
  background: var(--surface-cool);
  padding: var(--space-4);
  box-sizing: border-box;
}

.top-bar {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.top-bar h2 {
  margin: 0;
  font-size: var(--text-lg);
  font-weight: var(--weight-semibold);
  color: var(--ink-900);
}

.back-btn {
  flex-shrink: 0;
}

.role-badge {
  margin-left: auto;
}

/* 角色选择 */
.role-select {
  display: flex;
  gap: var(--space-3);
  width: 100%;
}
.role-option {
  flex: 1;
  padding: var(--space-4);
  border: 2px solid var(--green-100);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  background: var(--surface-white);
}
.role-option:hover {
  border-color: var(--green-300);
  background: var(--green-50);
}
.role-option.active {
  border-color: var(--green-600);
  background: var(--green-50);
  box-shadow: 0 0 0 1px var(--green-600);
}
.role-option-label {
  font-weight: var(--weight-semibold);
  color: var(--ink-900);
  font-size: var(--text-base);
  margin-bottom: var(--space-1);
}
.role-option-desc {
  font-size: var(--text-xs);
  color: var(--ink-500);
  line-height: var(--leading-normal);
}

/* 统计栏 */
.stats-bar {
  display: flex;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
  flex-shrink: 0;
}

.stat-card {
  flex: 1;
  padding: 14px var(--space-5);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
  text-align: center;
  color: var(--surface-white);
}
.stat-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
.stat-card.total { background: linear-gradient(135deg, #667eea, #764ba2); }
.stat-card.pending { background: linear-gradient(135deg, #f093fb, #f5576c); }
.stat-card.processing { background: linear-gradient(135deg, #4facfe, #00f2fe); }
.stat-card.resolved { background: linear-gradient(135deg, #43e97b, #38f9d7); }

.stat-num { font-size: 28px; font-weight: var(--weight-bold); }
.stat-label { font-size: 13px; opacity: 0.9; margin-top: 2px; }

/* 主面板 */
.main-panels {
  display: flex;
  gap: var(--space-3);
  flex: 1;
  min-height: 0;
}

/* 左侧列表 */
.list-panel {
  width: 380px;
  min-width: 340px;
  background: var(--surface-white);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sm);
}

.list-header {
  padding: 14px var(--space-4);
  border-bottom: 1px solid var(--ink-100);
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}
.list-header h3 { margin: 0; font-size: var(--text-base); }
.polling-status { font-size: var(--text-xs); color: var(--ink-500); margin-left: auto; }
.polling-status.active { color: var(--success); }

.list-body {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
}

.loading-wrap, .empty-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--ink-500);
}

.help-item {
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--ink-100);
  cursor: pointer;
  transition: background var(--transition-fast);
}
.help-item:hover { background: var(--surface-cool); }
.help-item.active { background: var(--info-bg); border-left: 3px solid var(--info); }

.item-top { display: flex; gap: 6px; margin-bottom: 6px; }
.item-loc { font-size: 13px; color: var(--ink-700); margin-bottom: var(--space-1); }
.item-desc { font-size: var(--text-xs); color: var(--ink-500); margin-bottom: var(--space-1); }
.item-time { font-size: 11px; color: var(--ink-400); }

.list-pagination {
  padding: 10px;
  display: flex;
  justify-content: center;
  border-top: 1px solid var(--ink-100);
}

/* 右侧面板 */
.detail-panel {
  flex: 1;
  background: var(--surface-white);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sm);
}

.detail-tabs {
  display: flex;
  border-bottom: 1px solid var(--ink-100);
  flex-shrink: 0;
}
.detail-tabs button {
  flex: 1;
  padding: var(--space-3);
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: var(--text-sm);
  color: var(--ink-500);
  border-bottom: 2px solid transparent;
  transition: all var(--transition-fast);
}
.detail-tabs button.active {
  color: var(--info);
  border-bottom-color: var(--info);
  font-weight: var(--weight-semibold);
}
.detail-tabs button:hover { color: var(--info); }

.detail-content, .map-content {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  position: relative;
}

.detail-card { padding: var(--space-5); }

.detail-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-5);
}
.detail-header h4 { margin: 0; font-size: var(--text-lg); }

.detail-fields { margin-bottom: var(--space-6); }

.field {
  display: flex;
  align-items: flex-start;
  padding: 10px 0;
  border-bottom: 1px solid var(--ink-100);
}
.field.block { flex-direction: column; }
.field label { width: 80px; color: var(--ink-500); font-size: 13px; flex-shrink: 0; }
.field span { color: var(--ink-900); font-size: var(--text-sm); word-break: break-all; }
.field.block label { margin-bottom: 6px; }

.desc-text {
  color: var(--ink-900);
  font-size: var(--text-sm);
  line-height: 1.6;
  white-space: pre-wrap;
}

.action-bar {
  display: flex;
  gap: var(--space-3);
  padding-top: var(--space-4);
  border-top: 1px solid var(--ink-100);
}

/* 地图 */
.rescue-map {
  width: 100%;
  height: 100%;
  min-height: 400px;
  position: relative;
}

/* ===== 顶部Tab ===== */
.top-tabs {
  display: flex;
  margin-left: var(--space-5);
  gap: 2px;
  background: var(--ink-100);
  border-radius: var(--radius-md);
  padding: 2px;
}
.top-tabs button {
  padding: 6px 20px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: var(--text-sm);
  color: var(--ink-600);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}
.top-tabs button.active {
  background: var(--surface-white);
  color: var(--info);
  font-weight: var(--weight-semibold);
  box-shadow: var(--shadow-sm);
}

/* ===== 预警管理面板 ===== */
.warning-panels {
  display: flex;
  gap: var(--space-3);
  flex: 1;
  min-height: 0;
}

/* 区域树 */
.region-tree-panel {
  width: 280px;
  min-width: 240px;
  background: var(--surface-white);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sm);
}
.region-header {
  padding: 14px var(--space-4);
  border-bottom: 1px solid var(--ink-100);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}
.region-header h3 { margin: 0; font-size: var(--text-base); }
.region-tree-body {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  padding: var(--space-2);
}
.tree-list { font-size: var(--text-sm); }
.tree-group { margin-bottom: 2px; }
.tree-node {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 8px 10px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background var(--transition-fast);
}
.tree-node:hover { background: var(--surface-cool); }
.tree-node.active { background: var(--info-bg); }
.tree-arrow {
  width: 16px;
  text-align: center;
  font-size: 10px;
  color: var(--ink-500);
  cursor: pointer;
}
.tree-name { flex: 1; }
.tree-children { padding-left: 20px; }

/* 预警主面板 */
.warning-main-panel {
  flex: 1;
  background: var(--surface-white);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sm);
}
.warning-tabs {
  display: flex;
  border-bottom: 1px solid var(--ink-100);
  flex-shrink: 0;
}
.warning-tabs button {
  flex: 1;
  padding: var(--space-3);
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: var(--text-sm);
  color: var(--ink-500);
  border-bottom: 2px solid transparent;
  transition: all var(--transition-fast);
}
.warning-tabs button.active {
  color: var(--info);
  border-bottom-color: var(--info);
  font-weight: var(--weight-semibold);
}
.warning-tabs button:hover { color: var(--info); }

.warning-content {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  padding: var(--space-4);
}

/* 地图工具栏 */
.map-toolbar {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}
.map-hint {
  font-size: var(--text-xs);
  color: var(--ink-500);
}

.warning-map {
  width: 100%;
  height: calc(100% - 50px);
  min-height: 400px;
  border-radius: var(--radius-md);
  position: relative;
}

.area-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-3);
  font-size: var(--text-sm);
  color: var(--ink-700);
}

/* 识别信息样式 */
.recognition-info,
.emergency-info,
.hospital-recommend {
  margin-top: var(--space-4);
  padding: var(--space-4);
  background: var(--surface-white);
  border-radius: var(--radius-md);
  border: 1px solid var(--green-100);
}

.recognition-info h4,
.emergency-info h4,
.hospital-recommend h4 {
  margin: 0 0 var(--space-3) 0;
  font-size: var(--text-base);
  font-weight: var(--weight-semibold);
  color: var(--ink-900);
  padding-bottom: var(--space-2);
  border-bottom: 1px solid var(--green-100);
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3);
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.info-item label {
  font-size: var(--text-xs);
  color: var(--ink-500);
}

.info-item .snake-name {
  font-size: var(--text-base);
  font-weight: var(--weight-semibold);
  color: var(--ink-900);
}

.toxicity-3 { color: var(--red-600); font-weight: var(--weight-bold); }
.toxicity-2 { color: var(--orange-600); font-weight: var(--weight-semibold); }
.toxicity-1 { color: var(--yellow-600); }
.toxicity-0 { color: var(--green-600); }

.info-section {
  margin-bottom: var(--space-3);
}

.info-section label {
  display: block;
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  color: var(--ink-700);
  margin-bottom: var(--space-1);
}

.info-section span {
  font-size: var(--text-sm);
  color: var(--ink-900);
}

.treatment-text,
.forbidden-text {
  font-size: var(--text-sm);
  color: var(--ink-900);
  line-height: 1.6;
  white-space: pre-wrap;
}

.info-section.forbidden {
  background: rgba(239, 68, 68, 0.05);
  padding: var(--space-3);
  border-radius: var(--radius-sm);
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.forbidden-text {
  color: var(--red-600);
}

.hospital-item {
  padding: var(--space-3);
  background: var(--surface-cool);
  border-radius: var(--radius-sm);
  margin-bottom: var(--space-2);
}

.hospital-item:last-child {
  margin-bottom: 0;
}

.hospital-name {
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  color: var(--ink-900);
  margin-bottom: var(--space-1);
}

.hospital-meta {
  display: flex;
  gap: var(--space-3);
  font-size: var(--text-xs);
  color: var(--ink-500);
}

/* AI 决策卡片 */
.decision-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.decision-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--border-light);
}
.decision-snake {
  font-size: var(--text-lg);
  font-weight: var(--weight-bold);
  color: var(--ink-900);
}
.decision-venom {
  font-size: var(--text-sm);
  color: var(--ink-500);
  margin-left: auto;
}
.decision-section h4 {
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  color: var(--ink-700);
  margin-bottom: var(--space-2);
}
.decision-summary {
  font-size: var(--text-base);
  color: var(--ink-900);
  line-height: var(--leading-relaxed);
  background: var(--green-50, #f0fdf4);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--green-600);
}
.decision-hospital {
  display: flex;
  gap: var(--space-3);
  padding: var(--space-3);
  background: var(--surface-cool);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-2);
}
.decision-hospital:first-child {
  border: 1px solid var(--green-600);
  background: var(--green-50, #f0fdf4);
}
.hospital-rank {
  font-size: var(--text-sm);
  font-weight: var(--weight-bold);
  color: var(--green-700);
  min-width: 48px;
}
.decision-hospital .hospital-info {
  flex: 1;
}
.decision-hospital .hospital-name {
  font-weight: var(--weight-semibold);
  color: var(--ink-900);
  margin-bottom: var(--space-1);
}
.decision-hospital .hospital-meta {
  display: flex;
  gap: var(--space-3);
  font-size: var(--text-xs);
  color: var(--ink-500);
}
.decision-hospital .hospital-addr {
  font-size: var(--text-xs);
  color: var(--ink-400);
  margin-top: var(--space-1);
}
.decision-guide {
  font-size: var(--text-sm);
  color: var(--ink-700);
  line-height: var(--leading-relaxed);
  padding: var(--space-3);
  background: var(--warning-bg, #fef3c7);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--warning);
}
</style>

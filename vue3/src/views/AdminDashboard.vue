<template>
  <div class="admin-dashboard">
    <!-- 统计卡片 — Stripe 风格 -->
    <div class="stats-grid">
      <div
        v-for="card in statCards"
        :key="card.label"
        class="stat-card"
      >
        <div class="stat-top">
          <div class="stat-icon-box" :style="{ background: card.color + '18', color: card.color }">
            <span v-html="card.icon"></span>
          </div>
        </div>
        <div class="stat-value">{{ card.value }}</div>
        <div class="stat-label">{{ card.label }}</div>
        <div class="stat-bottom">
          <span class="stat-sub" :style="{ color: card.color }">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5m-7 7l7-7 7 7"/></svg>
            查看详情
          </span>
        </div>
      </div>
    </div>

    <!-- 双栏面板 -->
    <div class="dashboard-grid">
      <div class="dash-panel">
        <div class="panel-header">系统概览</div>
        <div class="panel-body">
          <div class="info-row" v-for="item in systemInfo" :key="item.label">
            <span class="info-label">{{ item.label }}</span>
            <span class="info-value">{{ item.value }}</span>
          </div>
        </div>
      </div>

      <div class="dash-panel">
        <div class="panel-header">应急状态</div>
        <div class="panel-body">
          <div class="status-item" :class="{ urgent: stats.pendingSosCount > 0 }">
            <span class="status-dot"></span>
            <span>待处理SOS: {{ stats.pendingSosCount || 0 }} 条</span>
          </div>
          <div class="status-item">
            <span class="status-dot active"></span>
            <span>活跃预警区域: {{ stats.activeWarningAreas || 0 }} 个</span>
          </div>
          <div class="status-item">
            <span class="status-dot info"></span>
            <span>血清总库存: {{ stats.serumStockTotal || 0 }} 剂</span>
          </div>
        </div>
      </div>

      <div class="dash-panel wide">
        <div class="panel-header">快捷操作</div>
        <div class="quick-actions">
          <button
            v-for="action in quickActions"
            :key="action.label"
            @click="$router.push(action.path)"
            class="quick-btn"
          >
            <span v-html="action.icon"></span>
            <span>{{ action.label }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { adminApi } from '@/services/api'

const stats = ref({})

const statCards = computed(() => [
  { label: '注册用户', value: stats.value.userCount || 0, color: '#059669', icon: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>' },
  { label: '管理员', value: stats.value.adminCount || 0, color: '#D97706', icon: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2l3 7 7 1-5 4 2 7-7-4-7 4 2-7-5-4 7-1z"/></svg>' },
  { label: '蛇类数据', value: stats.value.snakeCount || 0, color: '#0891B2', icon: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3c-3 0-7 2-7 8 0 5 3 10 7 12 4-2 7-7 7-12 0-6-4-8-7-8z"/></svg>' },
  { label: '医院', value: stats.value.hospitalCount || 0, color: '#DC2626', icon: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 21h18M5 21V7l7-3 7 3v14M9 21v-6h6v6M10 10h4m-2-2v4"/></svg>' },
  { label: '识别记录', value: stats.value.recognitionCount || 0, color: '#7C3AED', icon: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/></svg>' },
  { label: 'SOS求助', value: stats.value.sosCount || 0, color: '#0891B2', icon: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3m0 4h0"/></svg>' },
  { label: '预警记录', value: stats.value.warningCount || 0, color: '#D97706', icon: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-1L13.71 3.86a2 2 0 00-3.42 0zM12 9v4m0 4h0"/></svg>' },
  { label: '急救信息', value: stats.value.emergencyInfoCount || 0, color: '#059669', icon: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' }
])

const systemInfo = computed(() => [
  { label: '数据库', value: 'MySQL 8.0' },
  { label: '后端框架', value: 'Spring Cloud + Nacos' },
  { label: '缓存', value: 'Redis' },
  { label: '网关端口', value: '8888' }
])

const quickActions = [
  { label: '管理蛇类', path: '/admin/snakes', icon: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3c-3 0-7 2-7 8 0 5 3 10 7 12 4-2 7-7 7-12 0-6-4-8-7-8z"/></svg>' },
  { label: '管理医院', path: '/admin/hospitals', icon: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M5 21V7l7-3 7 3v14M9 21v-6h6v6"/></svg>' },
  { label: '管理用户', path: '/admin/users', icon: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>' },
  { label: 'SOS求助', path: '/admin/sos', icon: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/></svg>' },
  { label: '预警管理', path: '/admin/warnings', icon: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-1L13.71 3.86a2 2 0 00-3.42 0z"/></svg>' },
  { label: '系统配置', path: '/admin/config', icon: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>' }
]

onMounted(async () => {
  try {
    const { data } = await adminApi.getDashboard()
    if (data.code === 200) stats.value = data.data
  } catch (e) { /* use defaults */ }
})
</script>

<style scoped>
.admin-dashboard {
  max-width: 1400px;
}

/* — 统计卡片网格 — */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.stat-card {
  background: var(--surface-white);
  border: 1px solid var(--green-100);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  transition: all var(--transition-base);
}

.stat-card:hover {
  box-shadow: var(--shadow-card);
  transform: translateY(-2px);
  border-color: var(--green-200);
}

.stat-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-3);
}

.stat-icon-box {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-value {
  font-size: var(--text-3xl);
  font-weight: var(--weight-bold);
  color: var(--ink-900);
  line-height: var(--leading-tight);
  margin-bottom: 2px;
}

.stat-label {
  font-size: var(--text-sm);
  color: var(--ink-500);
  margin-bottom: var(--space-3);
}

.stat-bottom {
  padding-top: var(--space-3);
  border-top: 1px solid var(--green-100);
}

.stat-sub {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  cursor: pointer;
  transition: opacity var(--transition-fast);
}

.stat-sub:hover {
  opacity: 0.75;
}

/* — 双栏 — */
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

.dash-panel {
  background: var(--surface-white);
  border: 1px solid var(--green-100);
  border-radius: var(--radius-lg);
}

.dash-panel.wide {
  grid-column: 1 / -1;
}

.panel-header {
  padding: var(--space-4) var(--space-5);
  font-size: var(--text-base);
  font-weight: var(--weight-semibold);
  color: var(--ink-900);
  border-bottom: 1px solid var(--green-100);
}

.panel-body {
  padding: var(--space-4) var(--space-5);
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: var(--space-3) 0;
}

.info-row + .info-row {
  border-top: 1px solid var(--green-50);
}

.info-label {
  color: var(--ink-500);
  font-size: var(--text-sm);
}

.info-value {
  color: var(--ink-900);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
}

/* 状态 */
.status-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) 0;
  font-size: var(--text-sm);
  color: var(--ink-700);
}

.status-item + .status-item {
  border-top: 1px solid var(--green-50);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--ink-200);
  flex-shrink: 0;
}

.status-dot.active {
  background: var(--success);
}

.status-dot.info {
  background: var(--info);
}

.status-item.urgent .status-dot {
  background: var(--danger);
  animation: pulse 1.5s infinite;
}

.status-item.urgent {
  color: var(--danger);
  font-weight: var(--weight-medium);
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

/* 快捷操作 */
.quick-actions {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.quick-btn {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) 18px;
  border: 1px solid var(--green-100);
  border-radius: var(--radius-md);
  background: var(--surface-white);
  color: var(--ink-700);
  font-size: var(--text-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.quick-btn:hover {
  background: var(--green-50);
  border-color: var(--green-400);
  color: var(--green-600);
}
</style>

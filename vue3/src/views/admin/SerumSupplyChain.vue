<template>
  <div class="serum-supply-chain">
    <!-- 页面标题 -->
    <div class="page-header">
      <div>
        <h2>血清供应链智能</h2>
        <p class="header-desc">库存监控 · 预警分析 · 调拨建议</p>
      </div>
      <div class="header-actions">
        <el-button @click="refreshData" :loading="loading">
          <el-icon><Refresh /></el-icon> 刷新
        </el-button>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-icon" style="background: #dbeafe; color: #2563eb">💉</div>
        <div class="stat-body">
          <div class="stat-value">{{ stats.totalStock }}</div>
          <div class="stat-label">总库存（支）</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: #fef3c7; color: #d97706">⚠️</div>
        <div class="stat-body">
          <div class="stat-value">{{ stats.lowStockCount }}</div>
          <div class="stat-label">低库存蛇种</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: #fee2e2; color: #dc2626">🕐</div>
        <div class="stat-body">
          <div class="stat-value">{{ stats.expiringCount }}</div>
          <div class="stat-label">临期血清</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: #d1fae5; color: #059669">🏥</div>
        <div class="stat-body">
          <div class="stat-value">{{ stats.hospitalCount }}</div>
          <div class="stat-label">储备医院</div>
        </div>
      </div>
    </div>

    <!-- 低库存预警 -->
    <div class="section" v-if="lowStockItems.length > 0">
      <h3 class="section-title">⚠️ 低库存预警</h3>
      <div class="alert-list">
        <div v-for="item in lowStockItems" :key="item.snakeId" class="alert-item warning">
          <div class="alert-left">
            <span class="alert-snake">{{ item.snakeName }}</span>
            <span class="alert-detail">当前库存: {{ item.totalStock }} 支</span>
          </div>
          <div class="alert-right">
            <el-tag type="warning" size="small">低于安全阈值</el-tag>
          </div>
        </div>
      </div>
    </div>

    <!-- 临期预警 -->
    <div class="section" v-if="expiringItems.length > 0">
      <h3 class="section-title">🕐 临期血清（30天内过期）</h3>
      <div class="alert-list">
        <div v-for="item in expiringItems" :key="item.inventoryId" class="alert-item danger">
          <div class="alert-left">
            <span class="alert-snake">{{ item.snakeName }} — {{ item.hospitalName }}</span>
            <span class="alert-detail">库存: {{ item.serumAmount }} 支，过期: {{ item.expiryDate }}</span>
          </div>
          <div class="alert-right">
            <el-tag type="danger" size="small">临期</el-tag>
          </div>
        </div>
      </div>
    </div>

    <!-- 调拨建议 -->
    <div class="section" v-if="transferSuggestions.length > 0">
      <h3 class="section-title">🔄 调拨建议</h3>
      <div class="suggestion-list">
        <div v-for="(s, i) in transferSuggestions" :key="i" class="suggestion-item">
          <div class="suggestion-flow">
            <span class="from">{{ s.fromHospital }}</span>
            <span class="arrow">→</span>
            <span class="to">{{ s.toHospital }}</span>
          </div>
          <div class="suggestion-detail">
            {{ s.snakeName }} 血清 {{ s.amount }} 支 · 距离 {{ s.distance }}km
          </div>
        </div>
      </div>
    </div>

    <!-- 详细库存表格 -->
    <div class="section">
      <h3 class="section-title">📊 库存明细</h3>
      <el-table :data="inventoryList" stripe v-loading="loading" style="width: 100%">
        <el-table-column prop="hospitalName" label="医院" width="180" />
        <el-table-column prop="snakeName" label="蛇种" width="150" />
        <el-table-column prop="serumAmount" label="库存（支）" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.serumAmount <= 3 ? 'danger' : row.serumAmount <= 10 ? 'warning' : 'success'" size="small">
              {{ row.serumAmount }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="expiryDate" label="过期日期" width="120" />
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <span v-if="isExpiringSoon(row.expiryDate)" style="color: #dc2626; font-size: 12px">临期</span>
            <span v-else-if="row.serumAmount <= 3" style="color: #d97706; font-size: 12px">低库存</span>
            <span v-else style="color: #059669; font-size: 12px">正常</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { Refresh } from '@element-plus/icons-vue'
import { rescueSerumApi } from '../../services/api'

const loading = ref(false)
const inventoryList = ref([])

const stats = reactive({
  totalStock: 0,
  lowStockCount: 0,
  expiringCount: 0,
  hospitalCount: 0
})

// 低库存项
const lowStockItems = computed(() => {
  const bySnake = {}
  inventoryList.value.forEach(item => {
    if (!bySnake[item.snakeId]) {
      bySnake[item.snakeId] = { snakeId: item.snakeId, snakeName: item.snakeName, totalStock: 0 }
    }
    bySnake[item.snakeId].totalStock += item.serumAmount || 0
  })
  return Object.values(bySnake).filter(s => s.totalStock <= 5)
})

// 临期项
const expiringItems = computed(() => {
  const now = new Date()
  const threshold = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
  return inventoryList.value.filter(item => {
    if (!item.expiryDate) return false
    return new Date(item.expiryDate) <= threshold
  })
})

// 调拨建议（简化版：同蛇种，A 库存多 B 库存少 → 建议调拨）
const transferSuggestions = computed(() => {
  const suggestions = []
  const bySnake = {}
  inventoryList.value.forEach(item => {
    const key = item.snakeId
    if (!bySnake[key]) bySnake[key] = []
    bySnake[key].push(item)
  })
  Object.entries(bySnake).forEach(([snakeId, items]) => {
    if (items.length < 2) return
    const sorted = [...items].sort((a, b) => (b.serumAmount || 0) - (a.serumAmount || 0))
    const rich = sorted[0]
    const poor = sorted[sorted.length - 1]
    if (rich.serumAmount > 10 && poor.serumAmount <= 3) {
      suggestions.push({
        snakeName: rich.snakeName,
        fromHospital: rich.hospitalName,
        toHospital: poor.hospitalName,
        amount: Math.min(5, Math.floor(rich.serumAmount / 3)),
        distance: '-'
      })
    }
  })
  return suggestions
})

function isExpiringSoon(dateStr) {
  if (!dateStr) return false
  const threshold = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  return new Date(dateStr) <= threshold
}

async function refreshData() {
  loading.value = true
  try {
    const res = await rescueSerumApi.getAll()
    if (res.data?.code === 200) {
      inventoryList.value = res.data.data || []
      computeStats()
    }
  } catch (e) {
    console.error('加载血清数据失败:', e)
  } finally {
    loading.value = false
  }
}

function computeStats() {
  const list = inventoryList.value
  stats.totalStock = list.reduce((sum, i) => sum + (i.serumAmount || 0), 0)
  stats.lowStockCount = lowStockItems.value.length
  stats.expiringCount = expiringItems.value.length
  stats.hospitalCount = new Set(list.map(i => i.hospitalId)).size
}

onMounted(() => refreshData())
</script>

<style scoped>
.serum-supply-chain {
  padding: var(--space-4);
}
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-5);
}
.page-header h2 {
  font-size: 20px;
  font-weight: 700;
  color: var(--ink-900);
}
.header-desc {
  font-size: 13px;
  color: var(--ink-500);
  margin-top: 4px;
}
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-3);
  margin-bottom: var(--space-5);
}
.stat-card {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  background: var(--surface-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}
.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}
.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--ink-900);
}
.stat-label {
  font-size: 12px;
  color: var(--ink-500);
}
.section {
  margin-bottom: var(--space-5);
}
.section-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--ink-900);
  margin-bottom: var(--space-3);
}
.alert-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.alert-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
}
.alert-item.warning {
  background: #fef3c7;
  border-left: 3px solid #f59e0b;
}
.alert-item.danger {
  background: #fee2e2;
  border-left: 3px solid #dc2626;
}
.alert-snake {
  font-weight: 600;
  color: var(--ink-900);
  font-size: 14px;
}
.alert-detail {
  font-size: 12px;
  color: var(--ink-500);
  margin-top: 2px;
}
.suggestion-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.suggestion-item {
  padding: var(--space-3) var(--space-4);
  background: var(--surface-white);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-light);
}
.suggestion-flow {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-weight: 600;
  color: var(--ink-900);
}
.suggestion-flow .arrow {
  color: var(--green-600);
  font-size: 18px;
}
.suggestion-detail {
  font-size: 12px;
  color: var(--ink-500);
  margin-top: 4px;
}
</style>

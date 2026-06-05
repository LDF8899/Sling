<template>
  <div v-if="visible" class="warning-alert-banner" :class="levelClass">
    <div class="alert-icon">
      <el-icon :size="24"><WarningFilled /></el-icon>
    </div>
    <div class="alert-body">
      <div class="alert-title">
        <span class="level-tag">{{ levelText }}</span>
        {{ topArea.areaName }}
      </div>
      <div class="alert-desc">
        <span v-if="topArea.snakeSpecies">常见蛇种：{{ parseSnakes(topArea.snakeSpecies) }}</span>
        <span v-if="topArea.description"> — {{ topArea.description }}</span>
      </div>
    </div>
    <div class="alert-actions">
      <el-button type="primary" size="small" @click="goToWarning">查看详情</el-button>
      <el-button text size="small" @click="dismiss">关闭</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { WarningFilled } from '@element-plus/icons-vue'
import { warningApi } from '@/services/api'

const router = useRouter()
const visible = ref(false)
const matchedAreas = ref([])

const DISMISS_KEY = 'warning_alert_dismissed'

const topArea = computed(() => matchedAreas.value[0] || {})

const levelClass = computed(() => {
  const lv = topArea.value.warningLevel
  if (lv >= 3) return 'level-high'
  if (lv === 2) return 'level-medium'
  return 'level-low'
})

const levelText = computed(() => {
  const lv = topArea.value.warningLevel
  if (lv >= 4) return '极高风险'
  if (lv === 3) return '高风险'
  if (lv === 2) return '中风险'
  return '低风险'
})

function parseSnakes(species) {
  if (!species) return ''
  try {
    const arr = typeof species === 'string' ? JSON.parse(species) : species
    return arr.map(s => s.name || s).join('、')
  } catch {
    return species
  }
}

function goToWarning() {
  router.push('/warning')
}

function dismiss() {
  visible.value = false
  sessionStorage.setItem(DISMISS_KEY, '1')
}

onMounted(async () => {
  if (sessionStorage.getItem(DISMISS_KEY)) return

  try {
    // 获取用户位置
    const pos = await new Promise((resolve, reject) => {
      if (!navigator.geolocation) return reject(new Error('no geo'))
      navigator.geolocation.getCurrentPosition(
        p => resolve({ lng: p.coords.longitude, lat: p.coords.latitude }),
        reject,
        { timeout: 5000 }
      )
    })

    const { data } = await warningApi.checkProximity({ lng: pos.lng, lat: pos.lat })
    if (data.code === 200 && data.data && data.data.length > 0) {
      matchedAreas.value = data.data
      visible.value = true
    }
  } catch {
    // GPS 权限拒绝或网络错误，静默降级
  }
})
</script>

<style scoped>
.warning-alert-banner {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  border-radius: var(--radius-md);
  margin-bottom: var(--space-4);
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.level-high {
  background: var(--danger-bg);
  border: 1px solid var(--danger-border);
}
.level-medium {
  background: var(--warning-bg);
  border: 1px solid var(--warning-border);
}
.level-low {
  background: var(--accent-light);
  border: 1px solid var(--accent);
}

.alert-icon {
  flex-shrink: 0;
  color: inherit;
}
.level-high .alert-icon { color: var(--danger); }
.level-medium .alert-icon { color: var(--warning); }
.level-low .alert-icon { color: var(--accent); }

.alert-body {
  flex: 1;
  min-width: 0;
}
.alert-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 8px;
}
.level-tag {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
  color: #fff;
  flex-shrink: 0;
}
.level-high .level-tag { background: var(--danger); }
.level-medium .level-tag { background: var(--warning); }
.level-low .level-tag { background: var(--accent); }

.alert-desc {
  font-size: 13px;
  color: var(--text-secondary);
  margin-top: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.alert-actions {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 4px;
}

@media (max-width: 640px) {
  .warning-alert-banner {
    flex-wrap: wrap;
    padding: 10px 12px;
  }
  .alert-actions {
    width: 100%;
    justify-content: flex-end;
    margin-top: 8px;
  }
}
</style>

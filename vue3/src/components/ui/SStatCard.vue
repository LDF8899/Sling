<template>
  <div class="s-stat-card" :class="{ clickable }" @click="clickable && $emit('click')">
    <div class="stat-icon" :style="{ background: iconBg, color: iconColor }">
      <slot name="icon" />
    </div>
    <div class="stat-info">
      <div class="stat-value">{{ value }}</div>
      <div class="stat-label">{{ label }}</div>
    </div>
    <div v-if="trend" class="stat-trend" :class="trend > 0 ? 'up' : 'down'">
      <el-icon><CaretTop v-if="trend > 0" /><CaretBottom v-else /></el-icon>
      {{ Math.abs(trend) }}%
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  trend: { type: Number, default: 0 },  // positive = up, negative = down, 0 = hide
  iconBg: { type: String, default: 'var(--green-100)' },
  iconColor: { type: String, default: 'var(--green-600)' },
  clickable: { type: Boolean, default: false },
})
defineEmits(['click'])
</script>

<style scoped>
.s-stat-card {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  background: var(--surface-white);
  border: 1px solid var(--green-100);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  transition: all var(--transition-fast);
}
.s-stat-card.clickable {
  cursor: pointer;
}
.s-stat-card.clickable:hover {
  border-color: var(--green-300);
  box-shadow: var(--shadow-sm);
}

.stat-icon {
  width: 48px; height: 48px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 22px;
}

.stat-value {
  font-size: var(--text-2xl);
  font-weight: var(--weight-bold);
  color: var(--ink-900);
  line-height: var(--leading-tight);
}

.stat-label {
  font-size: var(--text-sm);
  color: var(--ink-500);
  margin-top: 2px;
}

.stat-trend {
  margin-left: auto;
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  display: flex;
  align-items: center;
  gap: 2px;
}
.stat-trend.up { color: var(--success); }
.stat-trend.down { color: var(--danger); }
</style>

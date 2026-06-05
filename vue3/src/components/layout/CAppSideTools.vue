<template>
  <div class="side-tools">
    <button class="tool-btn" :title="isNight ? '白天模式' : '夜间模式'" @click="$emit('toggle-theme')">
      <SvgIcon :name="isNight ? 'sun' : 'moon'" :size="18" />
    </button>
    <button class="tool-btn sos-float" title="SOS 急救" @click="$emit('sos')">
      <SvgIcon name="firstaid" :size="18" />
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useThemeStore } from '@/store/theme'
import SvgIcon from '@/components/SvgIcon.vue'

defineEmits(['toggle-theme', 'feedback', 'sos'])

const themeStore = useThemeStore()
const isNight = computed(() => themeStore.mode === 'night')
</script>

<style scoped>
.side-tools {
  position: fixed;
  right: var(--space-6);
  bottom: 120px;
  z-index: 900;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.tool-btn {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  border: 1px solid var(--border-card);
  background: var(--bg-card);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-card);
}
.tool-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
  box-shadow: var(--shadow-hover);
  transform: translateY(-1px);
}

.sos-float {
  background: var(--danger);
  border-color: var(--danger);
  color: white;
  animation: pulse-sos 2s infinite;
}
.sos-float:hover {
  background: #B91C1C;
  color: white;
}

@keyframes pulse-sos {
  0%, 100% { box-shadow: 0 0 0 0 rgba(220,38,38,0.4); }
  50% { box-shadow: 0 0 0 12px rgba(220,38,38,0); }
}

@media (max-width: 640px) {
  .side-tools {
    right: var(--space-3);
    bottom: 80px;
  }
  .tool-btn {
    width: 36px;
    height: 36px;
  }
}
</style>

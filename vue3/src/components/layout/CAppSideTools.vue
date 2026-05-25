<template>
  <div class="side-tools">
    <button class="tool-btn" title="暗黑模式" @click="$emit('toggle-dark')">
      <el-icon :size="18"><Sunny v-if="dark" /><Moon v-else /></el-icon>
    </button>
    <button class="tool-btn" title="意见反馈" @click="$emit('feedback')">
      <el-icon :size="18"><ChatDotSquare /></el-icon>
    </button>
    <button class="tool-btn sos-float" title="SOS 急救" @click="$emit('sos')">
      <el-icon :size="18"><Warning /></el-icon>
    </button>
  </div>
</template>

<script setup>
defineProps({ dark: { type: Boolean, default: false } })
defineEmits(['toggle-dark', 'feedback', 'sos'])
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
  width: 40px; height: 40px;
  border-radius: var(--radius-full);
  border: 1px solid var(--green-100);
  background: var(--surface-white);
  color: var(--ink-500);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-sm);
}
.tool-btn:hover {
  border-color: var(--green-400);
  color: var(--green-600);
  box-shadow: var(--shadow-md);
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
</style>

<template>
  <button
    class="s-btn"
    :class="[variant, size]"
    :disabled="disabled || loading"
    @click="$emit('click')"
  >
    <el-icon v-if="loading" class="icon-spin"><Loading /></el-icon>
    <slot name="icon" v-else-if="!loading" />
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: { type: String, default: 'primary' }, // primary | secondary | danger | ghost
  size: { type: String, default: 'md' },         // sm | md | lg
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
})
defineEmits(['click'])
</script>

<style scoped>
.s-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: none;
  border-radius: var(--radius-full);
  font-family: var(--font-sans);
  font-weight: var(--weight-semibold);
  cursor: pointer;
  transition: all var(--transition-fast);
  user-select: none;
  white-space: nowrap;
}

/* Sizes */
.sm { padding: 5px 14px; font-size: var(--text-sm); height: 32px; }
.md { padding: 8px 20px; font-size: var(--text-sm); height: 40px; }
.lg { padding: 10px 26px; font-size: var(--text-base); height: 48px; }

/* Primary */
.primary {
  background: var(--brand-gradient);
  color: white;
  box-shadow: var(--shadow-brand);
}
.primary:hover { box-shadow: var(--shadow-brand-hover); transform: translateY(-1px); }
.primary:active { transform: translateY(0); }

/* Secondary */
.secondary {
  background: transparent;
  color: var(--green-600);
  border: 1.5px solid var(--green-300);
}
.secondary:hover { background: var(--green-50); border-color: var(--green-500); }

/* Danger */
.danger {
  background: var(--danger);
  color: white;
}
.danger:hover { background: #B91C1C; }

/* Ghost */
.ghost {
  background: transparent;
  color: var(--ink-500);
}
.ghost:hover { background: var(--green-50); color: var(--green-600); }

/* Disabled */
.s-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.icon-spin {
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>

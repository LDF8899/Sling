<template>
  <div class="s-page-header" :class="{ withBorder }">
    <div class="page-header-left">
      <h2 class="page-title">{{ title }}</h2>
      <p v-if="subtitle" class="page-subtitle">{{ subtitle }}</p>
    </div>
    <div v-if="$slots.actions" class="page-header-right">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  withBorder: { type: Boolean, default: true },
})
</script>

<style scoped>
.s-page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding-bottom: var(--space-6);
  margin-bottom: var(--space-6);
  gap: var(--space-4);
}
.s-page-header.withBorder {
  border-bottom: 1px solid var(--green-100);
}

.page-title {
  font-size: var(--text-2xl);
  font-weight: var(--weight-bold);
  color: var(--ink-900);
  line-height: var(--leading-tight);
}
.page-subtitle {
  font-size: var(--text-sm);
  color: var(--ink-500);
  margin-top: var(--space-1);
}
</style>

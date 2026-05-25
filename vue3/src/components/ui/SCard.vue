<template>
  <div class="s-card" :class="{ hover: hover, ['shadow-'+shadow]: shadow }">
    <div v-if="$slots.header || title" class="s-card-header">
      <slot name="header">
        <h3 class="s-card-title">{{ title }}</h3>
        <p v-if="subtitle" class="s-card-subtitle">{{ subtitle }}</p>
      </slot>
    </div>
    <div class="s-card-body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="s-card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  hover: { type: Boolean, default: false },
  shadow: { type: String, default: 'sm' }, // none | sm | md
})
</script>

<style scoped>
.s-card {
  background: var(--surface-white);
  border: 1px solid var(--green-100);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  transition: all var(--transition-base);
}
.s-card.shadow-sm { box-shadow: var(--shadow-sm); }
.s-card.shadow-md { box-shadow: var(--shadow-md); }

.s-card.hover:hover {
  box-shadow: var(--shadow-card);
  transform: translateY(-2px);
  border-color: var(--green-200);
}

.s-card-header { margin-bottom: var(--space-4); }
.s-card-title {
  font-size: var(--text-lg);
  font-weight: var(--weight-semibold);
  color: var(--ink-900);
  line-height: var(--leading-tight);
}
.s-card-subtitle {
  font-size: var(--text-sm);
  color: var(--ink-500);
  margin-top: var(--space-1);
}

.s-card-footer {
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid var(--green-100);
}
</style>

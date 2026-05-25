<template>
  <section class="s-hero" :class="{ dark }" :style="heroStyle">
    <div class="hero-overlay" />
    <div class="hero-content">
      <h1 v-if="title" class="hero-title">{{ title }}</h1>
      <p v-if="subtitle" class="hero-subtitle">{{ subtitle }}</p>
      <div v-if="$slots.default" class="hero-actions">
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  variant: { type: String, default: 'green' }, // green | blue | mix
  dark: { type: Boolean, default: false },
})

const gradients = {
  green: 'linear-gradient(160deg, #065F46 0%, #059669 40%, #047857 100%)',
  blue: 'linear-gradient(160deg, #0E7490 0%, #0891B2 40%, #06B6D4 100%)',
  mix: 'linear-gradient(160deg, #065F46 0%, #059669 30%, #0891B2 70%, #0E7490 100%)',
}

const heroStyle = computed(() => ({
  background: gradients[props.variant] || gradients.mix,
}))
</script>

<style scoped>
.s-hero {
  position: relative;
  padding: var(--space-16) var(--space-6);
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 30% 50%, rgba(52,211,153,0.15) 0%, transparent 60%),
    radial-gradient(ellipse at 70% 30%, rgba(34,211,238,0.15) 0%, transparent 60%);
}

.hero-content {
  position: relative;
  max-width: var(--container-max);
  margin: 0 auto;
  text-align: center;
}

.hero-title {
  font-size: var(--text-5xl);
  font-weight: var(--weight-bold);
  color: white;
  line-height: var(--leading-tight);
  letter-spacing: -0.5px;
  margin-bottom: var(--space-4);
}

.hero-subtitle {
  font-size: var(--text-lg);
  color: rgba(255,255,255,0.8);
  max-width: 600px;
  margin: 0 auto var(--space-6);
  line-height: var(--leading-relaxed);
}

.hero-actions {
  display: flex;
  gap: var(--space-3);
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .s-hero { padding: var(--space-10) var(--space-4); }
  .hero-title { font-size: var(--text-3xl); }
}
</style>

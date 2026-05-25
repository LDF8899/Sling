<template>
  <footer class="c-footer" :class="{ dark }">
    <div class="footer-inner">
      <div class="footer-links">
        <router-link to="/dashboard">首页</router-link>
        <router-link to="/recognition">蛇类识别</router-link>
        <router-link to="/emergency">急救指南</router-link>
        <router-link to="/warning">风险预警</router-link>
        <router-link to="/hospital">附近医院</router-link>
      </div>
      <div class="footer-copy">
        &copy; 2026 SLING 蛇灵 — 智能蛇类识别与应急响应平台
      </div>
    </div>
  </footer>
</template>

<script setup>
defineProps({ dark: { type: Boolean, default: false } })
</script>

<style scoped>
.c-footer {
  border-top: 1px solid var(--green-100);
  background: var(--surface-warm);
  padding: var(--space-6) var(--space-6);
}
.c-footer.dark {
  background: var(--dark-bg);
  border-color: var(--dark-border);
}

.footer-inner {
  max-width: var(--container-max);
  margin: 0 auto;
  text-align: center;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: var(--space-6);
  margin-bottom: var(--space-4);
  flex-wrap: wrap;
}
.footer-links a {
  color: var(--ink-500);
  font-size: var(--text-sm);
  transition: color var(--transition-fast);
}
.footer-links a:hover { color: var(--green-600); }

.footer-copy {
  font-size: var(--text-xs);
  color: var(--ink-400);
}
</style>

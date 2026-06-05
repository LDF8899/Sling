<template>
  <footer class="c-footer">
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
</script>

<style scoped>
.c-footer {
  border-top: 1px solid var(--border-card);
  background: var(--bg-card);
  padding: var(--space-6) var(--space-4);
  min-width: 0;
}

.footer-inner {
  max-width: var(--container-max);
  margin: 0 auto;
  text-align: center;
  min-width: 0;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
  flex-wrap: wrap;
}
.footer-links a {
  color: var(--text-muted);
  font-size: 13px;
  transition: color var(--transition-fast);
  white-space: nowrap;
}
.footer-links a:hover { color: var(--accent); }

.footer-copy {
  font-size: 12px;
  color: var(--text-muted);
}

@media (max-width: 640px) {
  .footer-links { gap: var(--space-3); }
  .footer-links a { font-size: 13px; }
}
</style>

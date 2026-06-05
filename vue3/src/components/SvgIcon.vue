<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="['svg-icon', `svg-icon--${name}`]"
  >
    <!-- 蛇 -->
    <template v-if="name === 'snake'">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.85 0 3.58-.5 5.07-1.38" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M17 8c0-2.5 2-4 4-4s3 1.5 3 3-1.5 3-3 3h-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <circle cx="8.5" cy="10" r="1.2" fill="currentColor"/>
      <circle cx="12" cy="10" r="1.2" fill="currentColor"/>
      <path d="M7 14.5c0 0 1.5 2 5 2s5-2 5-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </template>

    <!-- 相机/识别 -->
    <template v-if="name === 'camera'">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <circle cx="12" cy="13" r="4" stroke="currentColor" stroke-width="1.8"/>
    </template>

    <!-- 定位/预警 -->
    <template v-if="name === 'location'">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" stroke-width="1.8"/>
      <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="1.8"/>
    </template>

    <!-- 急救/医疗 -->
    <template v-if="name === 'firstaid'">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </template>

    <!-- 医院 -->
    <template v-if="name === 'hospital'">
      <path d="M3 21h18M3 7v14M21 7v14M6 7V4a1 1 0 011-1h10a1 1 0 011 1v3M9 21v-4h6v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 11v4M10 13h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </template>

    <!-- 地图 -->
    <template v-if="name === 'map'">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <line x1="8" y1="2" x2="8" y2="18" stroke="currentColor" stroke-width="1.8"/>
      <line x1="16" y1="6" x2="16" y2="22" stroke="currentColor" stroke-width="1.8"/>
    </template>

    <!-- 警告 -->
    <template v-if="name === 'warning'">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <circle cx="12" cy="17" r="0.5" fill="currentColor" stroke="currentColor" stroke-width="1"/>
    </template>

    <!-- 天气/太阳 -->
    <template v-if="name === 'weather'">
      <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="1.8"/>
      <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </template>

    <!-- 用户 -->
    <template v-if="name === 'user'">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="1.8"/>
    </template>

    <!-- 月亮 -->
    <template v-if="name === 'moon'">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    </template>

    <!-- 太阳 -->
    <template v-if="name === 'sun'">
      <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="1.8"/>
      <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </template>

    <!-- 知识图谱/网络 -->
    <template v-if="name === 'graph'">
      <circle cx="12" cy="5" r="2.5" stroke="currentColor" stroke-width="1.8"/>
      <circle cx="5" cy="19" r="2.5" stroke="currentColor" stroke-width="1.8"/>
      <circle cx="19" cy="19" r="2.5" stroke="currentColor" stroke-width="1.8"/>
      <path d="M12 7.5v5M7.3 17.5l2.7-3M16.7 17.5l-2.7-3" stroke="currentColor" stroke-width="1.8"/>
    </template>

    <!-- 记录/列表 -->
    <template v-if="name === 'records'">
      <line x1="8" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="8" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="8" y1="18" x2="21" y2="18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="3" y1="6" x2="3.01" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="3" y1="12" x2="3.01" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="3" y1="18" x2="3.01" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </template>

    <!-- 资讯/新闻 -->
    <template v-if="name === 'news'">
      <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" stroke-width="1.8"/>
      <line x1="2" y1="10" x2="22" y2="10" stroke="currentColor" stroke-width="1.8"/>
      <line x1="7" y1="6" x2="7.01" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="11" y1="6" x2="15" y2="6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </template>

    <!-- 箭头右 -->
    <template v-if="name === 'arrow-right'">
      <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <polyline points="12 5 19 12 12 19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </template>

    <!-- 箭头左 -->
    <template v-if="name === 'arrow-left'">
      <line x1="19" y1="12" x2="5" y2="12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <polyline points="12 19 5 12 12 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </template>

    <!-- 刷新 -->
    <template v-if="name === 'refresh'">
      <polyline points="23 4 23 10 17 10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </template>

    <!-- 时钟 -->
    <template v-if="name === 'clock'">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.8"/>
      <polyline points="12 6 12 12 16 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </template>

    <!-- 紧急/警报 -->
    <template v-if="name === 'alert'">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </template>

    <!-- 活动/公告 -->
    <template v-if="name === 'event'">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="1.8"/>
      <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="1.8"/>
    </template>

    <!-- 政策/文档 -->
    <template v-if="name === 'policy'">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <polyline points="14 2 14 8 20 8" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <line x1="9" y1="13" x2="15" y2="13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="9" y1="17" x2="13" y2="17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </template>

    <!-- 安全/盾牌 -->
    <template v-if="name === 'safety'">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <polyline points="9 12 11 14 15 10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </template>

    <!-- 全部/网格 -->
    <template v-if="name === 'grid'">
      <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.8"/>
      <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.8"/>
      <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.8"/>
      <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.8"/>
    </template>

    <!-- 关闭 -->
    <template v-if="name === 'close'">
      <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </template>
  </svg>
</template>

<script setup>
defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 20 }
})
</script>

<style scoped>
.svg-icon {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}
</style>

<template>
  <div class="admin-layout">
    <aside class="admin-sidebar">
      <div class="sidebar-brand" @click="$router.push('/admin')">
        <svg viewBox="0 0 24 24" class="brand-icon" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
        <span class="brand-text">蛇灵管理</span>
      </div>

      <nav class="sidebar-nav">
        <div v-for="group in menuGroups" :key="group.title" class="nav-group">
          <div class="nav-group-title">{{ group.title }}</div>
          <router-link
            v-for="item in group.items"
            :key="item.path"
            :to="item.path"
            class="nav-item"
            :class="{ active: isActive(item.path) }"
          >
            <span class="nav-icon" v-html="item.icon"></span>
            <span class="nav-label">{{ item.label }}</span>
          </router-link>
        </div>
      </nav>

      <div class="sidebar-footer">
        <router-link to="/dashboard" class="back-link">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          <span>返回前台</span>
        </router-link>
      </div>
    </aside>

    <main class="admin-main">
      <div class="admin-topbar">
        <div class="topbar-left">
          <div class="topbar-breadcrumb">
            <span class="breadcrumb-root">仪表盘</span>
            <template v-if="currentTitle !== '仪表盘'">
              <span class="breadcrumb-sep">/</span>
              <span class="breadcrumb-current">{{ currentTitle }}</span>
            </template>
          </div>
        </div>
        <div class="topbar-actions">
          <span class="admin-user">{{ username }}</span>
          <button class="btn-logout" @click="logout">退出</button>
        </div>
      </div>
      <div class="admin-content">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const username = computed(() => userStore.username || '管理员')

const isActive = (path) => route.path === path || route.path.startsWith(path + '/')

const currentTitle = computed(() => {
  for (const group of menuGroups) {
    for (const item of group.items) {
      if (isActive(item.path)) return item.label
    }
  }
  return '仪表盘'
})

const menuGroups = [
  {
    title: '概览',
    items: [
      { path: '/admin', label: '仪表盘', icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>' }
    ]
  },
  {
    title: '用户管理',
    items: [
      { path: '/admin/users', label: 'C端用户', icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="7" r="3"/><circle cx="17" cy="7" r="3"/><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/><path d="M13 21v-2a4 4 0 014-4h1a3 3 0 013 3v3"/></svg>' },
      { path: '/admin/admins', label: '管理员', icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 15v-3m0 0V9m0 3H9m3 0h3"/><circle cx="12" cy="7" r="4"/><path d="M5 21v-2a4 4 0 014-4h6a4 4 0 014 4v2"/><circle cx="12" cy="12" r="10"/></svg>' }
    ]
  },
  {
    title: '数据管理',
    items: [
      { path: '/admin/snakes', label: '蛇类百科', icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3c-3 0-7 2-7 8 0 5 3 10 7 12 4-2 7-7 7-12 0-6-4-8-7-8z"/><path d="M12 7a2 2 0 100 4 2 2 0 000-4z"/><path d="M12 12v3"/></svg>' },
      { path: '/admin/emergency', label: '急救信息', icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' },
      { path: '/admin/hospitals', label: '医院管理', icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 21h18"/><path d="M5 21V7l7-3 7 3v14"/><path d="M9 21v-6h6v6"/><path d="M10 10h4m-2-2v4"/></svg>' },
      { path: '/admin/warnings', label: '预警管理', icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-1L13.71 3.86a2 2 0 00-3.42 0z"/><path d="M12 9v4m0 4h0"/></svg>' }
    ]
  },
  {
    title: '应急处理',
    items: [
      { path: '/admin/sos', label: 'SOS求助', icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><path d="M12 17h0"/></svg>' }
    ]
  },
  {
    title: '系统',
    items: [
      { path: '/admin/config', label: '系统配置', icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>' },
      { path: '/admin/logs', label: '操作日志', icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>' }
    ]
  }
]

function logout() {
  userStore.logout()
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: var(--surface-cool);
}

/* — 侧边栏 — */
.admin-sidebar {
  width: 240px;
  background: linear-gradient(180deg, #064E40 0%, #0A2D1F 100%);
  color: var(--green-200);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
  overflow-y: auto;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: var(--space-5) 18px;
  cursor: pointer;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.brand-icon {
  width: 28px;
  height: 28px;
  color: var(--green-400);
}

.brand-text {
  font-size: var(--text-lg);
  font-weight: var(--weight-semibold);
  color: #e8f5ee;
  letter-spacing: 0.5px;
}

/* 导航 */
.sidebar-nav {
  flex: 1;
  padding: var(--space-3) 0;
  overflow-y: auto;
}

.nav-group {
  margin-bottom: var(--space-2);
}

.nav-group-title {
  padding: var(--space-2) 18px var(--space-1);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: rgba(110, 231, 183, 0.4);
  font-weight: var(--weight-semibold);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 18px;
  margin: 2px var(--space-2);
  border-radius: var(--radius-sm);
  color: var(--green-200);
  text-decoration: none;
  font-size: var(--text-sm);
  transition: all var(--transition-fast);
}

.nav-item:hover {
  background: rgba(255,255,255,0.06);
  color: #e8f5ee;
}

.nav-item.active {
  background: rgba(5, 150, 105, 0.25);
  color: var(--green-400);
  font-weight: var(--weight-medium);
}

.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

/* 底部 */
.sidebar-footer {
  padding: var(--space-3) 18px;
  border-top: 1px solid rgba(255,255,255,0.06);
}

.back-link {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: rgba(110, 231, 183, 0.45);
  text-decoration: none;
  font-size: var(--text-sm);
  transition: color var(--transition-fast);
}

.back-link:hover {
  color: var(--green-400);
}

/* — 主区域 — */
.admin-main {
  flex: 1;
  margin-left: 240px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.admin-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--space-8);
  height: 56px;
  background: var(--surface-white);
  border-bottom: 1px solid var(--green-100);
  position: sticky;
  top: 0;
  z-index: 50;
}

.topbar-breadcrumb {
  font-size: var(--text-sm);
  color: var(--ink-500);
}

.breadcrumb-sep {
  margin: 0 var(--space-2);
  color: var(--ink-200);
}

.breadcrumb-current {
  color: var(--ink-900);
  font-weight: var(--weight-semibold);
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.admin-user {
  font-size: var(--text-sm);
  color: var(--ink-500);
}

.btn-logout {
  background: none;
  border: 1px solid var(--ink-200);
  padding: var(--space-1) 14px;
  border-radius: var(--radius-sm);
  font-size: var(--text-sm);
  color: var(--ink-500);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-logout:hover {
  background: var(--danger-bg);
  color: var(--danger);
  border-color: var(--danger-border);
}

.admin-content {
  flex: 1;
  padding: var(--space-6) var(--space-8);
}
</style>

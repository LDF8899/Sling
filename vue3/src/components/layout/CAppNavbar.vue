<template>
  <nav class="c-navbar" :class="{ scrolled, dark }">
    <div class="nav-inner">
      <div class="nav-left">
        <router-link to="/dashboard" class="nav-brand">
          <img src="/sling-logo.svg" alt="SLING" class="brand-icon" />
          <span class="brand-text">SLING</span>
          <span class="brand-sub">蛇灵</span>
        </router-link>
      </div>

      <div class="nav-center">
        <slot name="center" />
      </div>

      <div class="nav-right">
        <button class="nav-btn sos-btn" @click="$emit('sos')">
          <el-icon><Warning /></el-icon>
          <span>SOS 急救</span>
        </button>

        <button class="nav-btn icon-btn" @click="$emit('toggle-dark')" :title="dark ? '亮色模式' : '暗色模式'">
          <el-icon><Sunny v-if="dark" /><Moon v-else /></el-icon>
        </button>

        <el-dropdown trigger="click" v-if="user">
          <button class="nav-btn user-btn">
            <el-avatar :size="32" :src="user.avatarUrl" />
            <span class="user-name">{{ user.username || '用户' }}</span>
            <el-icon class="arrow"><ArrowDown /></el-icon>
          </button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="$router.push('/profile')">
                <el-icon><User /></el-icon>个人中心
              </el-dropdown-item>
              <el-dropdown-item divided @click="$emit('logout')">
                <el-icon><SwitchButton /></el-icon>退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <router-link v-else to="/login" class="nav-btn login-btn">登录</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  user: { type: Object, default: null },
  dark: { type: Boolean, default: false }
})
defineEmits(['toggle-dark', 'sos', 'logout'])

const scrolled = ref(false)
const onScroll = () => { scrolled.value = window.scrollY > 20 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.c-navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  height: 56px;
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid transparent;
  transition: all var(--transition-base);
}
.c-navbar.scrolled {
  border-bottom-color: var(--green-100);
  box-shadow: var(--shadow-sm);
}
.c-navbar.dark {
  background: rgba(10,31,23,0.85);
}
.c-navbar.dark.scrolled {
  border-bottom-color: var(--dark-border);
}

.nav-inner {
  max-width: var(--container-max);
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-6);
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  text-decoration: none;
  color: var(--ink-900);
}
.brand-icon { width: 32px; height: 32px; }
.brand-text { font-size: var(--text-lg); font-weight: var(--weight-bold); letter-spacing: -0.5px; }
.brand-sub { font-size: var(--text-xs); color: var(--ink-500); font-weight: var(--weight-normal); }

.nav-center {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.nav-link {
  padding: 6px 14px;
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--ink-600);
  text-decoration: none;
  transition: all var(--transition-fast);
  white-space: nowrap;
}
.nav-link:hover { background: var(--green-50); color: var(--green-600); }
.nav-link.router-link-active { background: var(--green-50); color: var(--green-600); font-weight: var(--weight-semibold); }

.nav-right {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  padding: 6px 14px;
  border: none;
  border-radius: var(--radius-full);
  background: transparent;
  color: var(--ink-700);
  font-size: var(--text-sm);
  font-family: var(--font-sans);
  cursor: pointer;
  transition: all var(--transition-fast);
  height: 36px;
}
.nav-btn:hover { background: var(--green-50); color: var(--green-600); }

.sos-btn {
  background: var(--danger);
  color: white;
  font-weight: var(--weight-semibold);
}
.sos-btn:hover { background: #B91C1C; color: white; }

.icon-btn {
  width: 36px;
  padding: 0;
  justify-content: center;
  font-size: 18px;
}

.user-btn { padding: 2px 8px 2px 2px; gap: var(--space-2); height: 40px; }
.user-btn:hover { background: var(--green-50); }
.user-name { font-weight: var(--weight-medium); }
.arrow { font-size: 12px; color: var(--ink-400); }

.login-btn {
  background: var(--brand-gradient);
  color: white;
  font-weight: var(--weight-semibold);
  padding: 6px 20px;
}
.login-btn:hover { box-shadow: var(--shadow-brand); color: white; }
</style>

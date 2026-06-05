<template>
  <nav class="c-navbar" :class="{ scrolled }">
    <div class="nav-inner">
      <div class="nav-left">
        <router-link to="/dashboard" class="nav-brand">
          <img src="/sling-logo.svg" alt="SLING" class="brand-logo" />
          <span class="brand-text">蛇灵</span>
          <span class="brand-sub">SLING</span>
        </router-link>
      </div>

      <div class="nav-center">
        <slot name="center" />
      </div>

      <div class="nav-right">
        <button class="nav-btn sos-btn" @click="$emit('sos')">
          <SvgIcon name="firstaid" :size="16" />
          <span>SOS 急救</span>
        </button>

        <button
          class="nav-btn icon-btn"
          @click="$emit('toggle-theme')"
          :title="isNight ? '切换白天模式' : '切换夜间模式'"
        >
          <SvgIcon :name="isNight ? 'sun' : 'moon'" :size="18" />
        </button>

        <el-dropdown trigger="click" v-if="user">
          <button class="nav-btn user-btn">
            <el-avatar :size="32" :src="user.avatarUrl" />
            <span class="user-name">{{ user.username || '用户' }}</span>
            <SvgIcon name="arrow-right" :size="12" class="arrow" />
          </button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="$router.push('/profile')">
                <SvgIcon name="user" :size="16" />
                个人中心
              </el-dropdown-item>
              <el-dropdown-item divided @click="$emit('logout')">
                <SvgIcon name="close" :size="16" />
                退出登录
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useThemeStore } from '@/store/theme'
import SvgIcon from '@/components/SvgIcon.vue'

const props = defineProps({
  user: { type: Object, default: null }
})
defineEmits(['toggle-theme', 'sos', 'logout'])

const themeStore = useThemeStore()
const isNight = computed(() => themeStore.mode === 'night')

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
  background: var(--bg-nav);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid transparent;
  transition: all var(--transition-base);
  min-width: 0;
}
.c-navbar.scrolled {
  border-bottom-color: var(--border-card);
  box-shadow: var(--shadow-card);
}

.nav-inner {
  max-width: var(--container-max);
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-6);
  min-width: 0;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  text-decoration: none;
  color: var(--text-accent);
  flex-shrink: 0;
}
.brand-logo {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}
.brand-text {
  font-size: var(--text-lg);
  font-weight: var(--weight-bold);
  white-space: nowrap;
}
.brand-sub {
  font-size: var(--text-xs);
  color: var(--text-muted);
  font-weight: var(--weight-normal);
  white-space: nowrap;
}

.nav-center {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-shrink: 0;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  padding: 6px 14px;
  border: none;
  border-radius: var(--radius-full);
  background: transparent;
  color: var(--text-secondary);
  font-size: 13px;
  font-family: var(--font-sans);
  cursor: pointer;
  transition: all var(--transition-fast);
  height: 36px;
  white-space: nowrap;
}
.nav-btn:hover {
  background: var(--accent-light);
  color: var(--accent);
}

.sos-btn {
  background: var(--danger);
  color: white;
  font-weight: var(--weight-semibold);
  flex-shrink: 0;
}
.sos-btn:hover { background: #B91C1C; color: white; }

.icon-btn {
  width: 36px;
  padding: 0;
  justify-content: center;
  flex-shrink: 0;
}

.user-btn {
  padding: 2px 8px 2px 2px;
  gap: var(--space-2);
  height: 40px;
  flex-shrink: 0;
}
.user-name { font-weight: var(--weight-medium); }
.arrow {
  color: var(--text-muted);
  transform: rotate(90deg);
  flex-shrink: 0;
}

.login-btn {
  background: linear-gradient(135deg, var(--accent), var(--accent-blue));
  color: white;
  font-weight: var(--weight-semibold);
  padding: 6px 20px;
  flex-shrink: 0;
}
.login-btn:hover { box-shadow: var(--shadow-hover); color: white; }

@media (max-width: 640px) {
  .nav-inner { padding: 0 var(--space-3); }
  .brand-sub { display: none; }
  .sos-btn span { display: none; }
  .sos-btn { padding: 6px 10px; }
  .user-name { display: none; }
}
</style>

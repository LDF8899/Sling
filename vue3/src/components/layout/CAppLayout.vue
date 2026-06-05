<template>
  <div class="c-app-layout" :data-theme="themeStore.mode">
    <CAppNavbar
      :user="user"
      @toggle-theme="themeStore.toggle"
      @sos="onSos"
      @logout="onLogout"
    >
      <template #center><slot name="nav-center" /></template>
    </CAppNavbar>

    <main class="main-content">
      <RouterView />
    </main>

    <CAppFooter />
    <CAppSideTools
      @toggle-theme="themeStore.toggle"
      @feedback="onFeedback"
      @sos="onSos"
    />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { useThemeStore } from '@/store/theme'
import CAppNavbar from './CAppNavbar.vue'
import CAppFooter from './CAppFooter.vue'
import CAppSideTools from './CAppSideTools.vue'

const router = useRouter()
const userStore = useUserStore()
const themeStore = useThemeStore()

const user = computed(() => userStore.userInfo)

const onSos = () => {
  router.push('/emergency')
}

const onLogout = () => {
  userStore.logout()
  router.push('/login')
}

const onFeedback = () => {
  // placeholder
}
</script>

<style scoped>
.c-app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--bg-page);
  transition: background var(--transition-base);
  overflow-x: hidden;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: var(--container-max);
  width: 100%;
  margin: 0 auto;
  padding: 72px var(--space-4) var(--space-6);
  min-width: 0;
}

@media (max-width: 640px) {
  .main-content {
    padding: 64px var(--space-3) var(--space-4);
  }
}
</style>

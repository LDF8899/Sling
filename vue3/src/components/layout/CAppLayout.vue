<template>
  <div class="c-app-layout" :class="{ dark }">
    <CAppNavbar
      :user="user"
      :dark="dark"
      @toggle-dark="toggleDark"
      @sos="onSos"
      @logout="onLogout"
    >
      <template #center><slot name="nav-center" /></template>
    </CAppNavbar>

    <main class="main-content">
      <RouterView />
    </main>

    <CAppFooter :dark="dark" />
    <CAppSideTools
      :dark="dark"
      @toggle-dark="toggleDark"
      @feedback="onFeedback"
      @sos="onSos"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import CAppNavbar from './CAppNavbar.vue'
import CAppFooter from './CAppFooter.vue'
import CAppSideTools from './CAppSideTools.vue'

const emit = defineEmits(['sos', 'logout', 'toggle-dark'])

const router = useRouter()
const userStore = useUserStore()
const dark = ref(false)

const user = computed(() => userStore.userInfo)

const toggleDark = () => {
  dark.value = !dark.value
  document.documentElement.classList.toggle('dark', dark.value)
  localStorage.setItem('theme', dark.value ? 'dark' : 'light')
  emit('toggle-dark', dark.value)
}

const onSos = () => {
  emit('sos')
  router.push('/emergency')
}

const onLogout = () => {
  userStore.logout()
  router.push('/login')
  emit('logout')
}

const onFeedback = () => {
  // placeholder
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    dark.value = true
    document.documentElement.classList.add('dark')
  }
})
</script>

<style scoped>
.c-app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--surface-warm);
  transition: background var(--transition-base);
}
.c-app-layout.dark {
  background: var(--dark-bg);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: var(--container-max);
  width: 100%;
  margin: 0 auto;
  padding: 72px var(--space-6) var(--space-8);
}
</style>

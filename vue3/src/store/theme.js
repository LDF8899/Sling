import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const THEME_KEY = 'sling_theme_mode'

  // 从 localStorage 读取，或根据时间自动判断
  const getInitialTheme = () => {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved) return saved

    // 根据时间自动判断：6:00-18:00 白天，其他夜间
    const hour = new Date().getHours()
    return (hour >= 6 && hour < 18) ? 'day' : 'night'
  }

  const mode = ref(getInitialTheme())

  // 应用到 DOM
  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme)
  }

  // 切换主题
  const toggle = () => {
    mode.value = mode.value === 'day' ? 'night' : 'day'
  }

  // 设置指定主题
  const setTheme = (theme) => {
    mode.value = theme
  }

  // 监听变化并持久化
  watch(mode, (newMode) => {
    localStorage.setItem(THEME_KEY, newMode)
    applyTheme(newMode)
  }, { immediate: true })

  return {
    mode,
    toggle,
    setTheme
  }
})

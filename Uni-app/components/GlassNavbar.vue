<template>
  <view class="glass-navbar">
    <view class="navbar-content">
      <view class="nav-left">
        <view v-if="showBack" class="back-btn" @click="handleBack">
          <text class="iconfont">❮</text>
          <text>返回</text>
        </view>
      </view>
      <view class="nav-center">
        <text class="app-title">{{ title }}</text>
        <text class="app-subtitle">{{ subtitle }}</text>
      </view>
      <view class="nav-right">
        <slot name="right"></slot>
      </view>
    </view>
  </view>
</template>

<script setup>
import { goBack } from '@/utils/helpers.js'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  showBack: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['back'])

const handleBack = () => {
  emit('back')
  goBack()
}
</script>

<style lang="scss" scoped>
.glass-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 1000;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 100%;
}

.nav-left, .nav-right {
  flex: 1;
}

.nav-center {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  color: #1e293b;
  padding: 8px 12px;
}

.app-title {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
}

.app-subtitle {
  font-size: 12px;
  color: #64748b;
}
</style>

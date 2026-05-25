<template>
  <view class="loading-state">
    <view class="loading-animation">
      <view class="loading-spinner" :style="{ color: spinnerColor }">⏳</view>
      <view class="loading-waves">
        <view class="wave" :style="{ borderColor: waveColor }"></view>
        <view class="wave" :style="{ borderColor: waveColor }"></view>
        <view class="wave" :style="{ borderColor: waveColor }"></view>
      </view>
    </view>
    <view class="loading-text">
      <text class="loading-title">{{ title }}</text>
      <text class="loading-subtitle">{{ subtitle }}</text>
    </view>
    <view class="loading-progress">
      <view class="progress-bar" :style="{ background: progressBgColor }">
        <view class="progress-fill" :style="{ width: progress + '%', background: progressFillColor }"></view>
      </view>
      <text class="progress-text" :style="{ color: spinnerColor }">{{ Math.round(progress) }}%</text>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  progress: {
    type: Number,
    default: 0
  },
  title: {
    type: String,
    default: 'AI 正在分析中...'
  },
  subtitle: {
    type: String,
    default: '请稍候，系统正在处理数据'
  },
  color: {
    type: String,
    default: '#10b981' // green accent
  }
})

const spinnerColor = computed(() => props.color)
const waveColor = computed(() => {
  // Convert hex to rgba for waves
  const hex = props.color.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, 0.3)`
})
const progressBgColor = computed(() => {
  const hex = props.color.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, 0.2)`
})
const progressFillColor = computed(() => {
  // Slightly lighter gradient
  return `linear-gradient(90deg, ${props.color}, ${props.color})`
})
</script>

<style lang="scss" scoped>
.loading-state {
  text-align: center;
  padding: 40px 20px;
}

.loading-animation {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 20px;
}

.loading-spinner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: #10b981;
  animation: spin 2s linear infinite;
}

.loading-waves {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.wave {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid rgba(16, 185, 129, 0.3);
  border-radius: 50%;
  animation: ripple 1.5s infinite;
}

.wave:nth-child(2) {
  animation-delay: 0.5s;
}

.wave:nth-child(3) {
  animation-delay: 1s;
}

.loading-text {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.loading-title {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
}

.loading-subtitle {
  font-size: 13px;
  color: #64748b;
}

.loading-progress {
  margin-top: 16px;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: rgba(16, 185, 129, 0.2);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #10b981, #059669);
  transition: width 0.3s ease;
}

.progress-text {
  display: block;
  margin-top: 8px;
  font-size: 13px;
  color: #10b981;
  font-weight: 500;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes ripple {
  0% {
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    width: 100px;
    height: 100px;
    opacity: 0;
  }
}
</style>

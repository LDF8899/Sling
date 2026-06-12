/**
 * useHandTracking — MediaPipe 手势识别 composable
 *
 * 从 hand-particles 项目移植简化。只识别两个手势：
 * - open_palm（🖐 张开手掌）→ 放大
 * - closed_fist（✊ 握拳）→ 缩小
 */
import { ref, onUnmounted } from 'vue'
import { HandLandmarker, FilesetResolver } from '@mediapipe/tasks-vision'

/* ── 类型 ── */
interface Vec3 { x: number; y: number; z: number }
export type HandGesture = 'none' | 'open_palm' | 'closed_fist'

export interface HandTrackingResult {
  gesture: HandGesture
  confidence: number
  palmPosition: Vec3
  handedness: 'left' | 'right'
  /** 食指尖位置 (归一化 0~1)，pointing 时有效 */
  indexTip: Vec3
}

/* ── 工具函数（移植自 hand-particles/staticGestures.ts） ── */

function dist(a: Vec3, b: Vec3): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2)
}

function getPalmCenter(lm: Vec3[]): Vec3 {
  const ids = [0, 5, 9, 13, 17]
  let x = 0, y = 0, z = 0
  for (const i of ids) { x += lm[i].x; y += lm[i].y; z += lm[i].z }
  const n = ids.length
  return { x: x / n, y: y / n, z: z / n }
}

function fingerExtended(lm: Vec3[], tipIdx: number, pipIdx: number, ratio: number): boolean {
  const palm = getPalmCenter(lm)
  const tipD = dist(lm[tipIdx], palm)
  const pipD = dist(lm[pipIdx], palm)
  return tipD > pipD * ratio
}

function thumbExtended(lm: Vec3[]): boolean {
  const tip = lm[4], ip = lm[3], indexMcp = lm[5]
  return dist(tip, indexMcp) > dist(ip, indexMcp) * 1.05
}

function matchCount(lm: Vec3[], expected: Record<string, boolean>): number {
  let count = 0
  if (thumbExtended(lm) === expected.thumb) count++
  if (fingerExtended(lm, 8, 6, 0.9) === expected.index) count++
  if (fingerExtended(lm, 12, 10, 0.9) === expected.middle) count++
  if (fingerExtended(lm, 16, 14, 0.9) === expected.ring) count++
  if (fingerExtended(lm, 20, 18, 0.9) === expected.pinky) count++
  return count
}

/* ── 主 composable ── */
export function useHandTracking() {
  const isActive = ref(false)
  const isLoading = ref(false)
  const currentGesture = ref<HandGesture>('none')
  const gestureConfidence = ref(0)
  const errorMsg = ref('')
  const debugMode = ref(false)

  let canvasEl: HTMLCanvasElement | null = null
  let canvasCtx: CanvasRenderingContext2D | null = null
  let lastLandmarks: Vec3[] | null = null

  let handLandmarker: HandLandmarker | null = null
  let videoEl: HTMLVideoElement | null = null
  let stream: MediaStream | null = null
  let animFrameId: number | null = null
  let lastDetectionTime = 0

  // 手势回调
  let gestureCallback: ((result: HandTrackingResult) => void) | null = null

  // 手势平滑
  let pendingGesture: HandGesture = 'none'
  let pendingCount = 0
  const SMOOTH_FRAMES = 2
  const DETECTION_INTERVAL_MS = 25 // ~40fps 检测，渲染 60fps 插值补帧

  // 防重复调用锁
  let starting = false

  /* ── 初始化摄像头 + MediaPipe ── */
  async function start(container: HTMLElement) {
    if (isActive.value || isLoading.value || starting) return
    starting = true
    isLoading.value = true
    errorMsg.value = ''

    // 强制清理旧的 stream（防止摄像头残留占用）
    cleanup()

    console.log('[HandTracking] 开始初始化...')

    try {
      // 创建隐藏的 video 元素
      videoEl = document.createElement('video')
      videoEl.setAttribute('playsinline', '')
      videoEl.setAttribute('autoplay', '')
      videoEl.style.position = 'absolute'
      videoEl.style.top = '0'
      videoEl.style.left = '0'
      videoEl.style.width = '1px'
      videoEl.style.height = '1px'
      videoEl.style.opacity = '0'
      videoEl.style.pointerEvents = 'none'
      container.appendChild(videoEl)

      // 请求摄像头 — 逐个尝试，跳过被占用的设备
      console.log('[HandTracking] 请求摄像头...')
      const devices = await navigator.mediaDevices.enumerateDevices()
      const cameras = devices.filter(d => d.kind === 'videoinput')
      console.log('[HandTracking] 可用摄像头:', cameras.map(c => `${c.label} (${c.deviceId.slice(0,8)}...)`))

      // 排序：优先集成摄像头
      const sorted = [...cameras].sort((a, b) => {
        const la = a.label.toLowerCase(), lb = b.label.toLowerCase()
        const pa = la.includes('integrated') || la.includes('hd webcam') || la.includes('facetime') ? -1 : 0
        const pb = lb.includes('integrated') || lb.includes('hd webcam') || lb.includes('facetime') ? -1 : 0
        return pa - pb
      })

      // 逐个尝试
      let lastErr: any = null
      for (const cam of sorted) {
        try {
          console.log(`[HandTracking] 尝试摄像头: ${cam.label}`)
          stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 640, height: 480, deviceId: { exact: cam.deviceId } },
          })
          console.log(`[HandTracking] ✅ 摄像头成功: ${cam.label}`)
          break
        } catch (e: any) {
          console.warn(`[HandTracking] ⚠️ ${cam.label} 失败: ${e.name}`)
          lastErr = e
          stream = null
          continue
        }
      }

      // 所有设备都失败，尝试不指定 deviceId
      if (!stream) {
        try {
          console.log('[HandTracking] 尝试默认摄像头...')
          stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } })
        } catch (e: any) {
          throw lastErr || e
        }
      }

      if (!stream) throw lastErr || new Error('没有可用的摄像头')
      videoEl.srcObject = stream
      await videoEl.play()
      console.log('[HandTracking] 摄像头已启动')

      // 加载 MediaPipe WASM + 模型（本地文件，无需翻墙）
      console.log('[HandTracking] 加载本地 MediaPipe WASM...')
      const vision = await FilesetResolver.forVisionTasks('/mediapipe/')
      console.log('[HandTracking] WASM 加载完成')

      console.log('[HandTracking] 创建 HandLandmarker...')
      handLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: '/mediapipe/hand_landmarker.task',
          delegate: 'GPU',
        },
        runningMode: 'VIDEO',
        numHands: 1,
        minHandDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      })
      console.log('[HandTracking] HandLandmarker 创建成功')

      isActive.value = true
      isLoading.value = false
      starting = false
      console.log('[HandTracking] ✅ 初始化完成，开始检测循环')
      startDetectionLoop()
    } catch (err: any) {
      console.error('[HandTracking] ❌ 初始化失败:', err)
      if (err?.name === 'NotReadableError') {
        errorMsg.value = '摄像头被占用，请关闭其他使用摄像头的应用后重试'
      } else if (err?.name === 'NotAllowedError') {
        errorMsg.value = '摄像头权限被拒绝，请在浏览器设置中允许访问'
      } else {
        errorMsg.value = err?.message || '摄像头或模型加载失败'
      }
      isLoading.value = false
      starting = false
      cleanup()
    }
  }

  /* ── 检测循环 ── */
  let detectCount = 0
  let lastLogTime = 0

  function startDetectionLoop() {
    function loop(now: number) {
      animFrameId = requestAnimationFrame(loop)
      if (!handLandmarker || !videoEl || videoEl.readyState < 2) return
      if (now - lastDetectionTime < DETECTION_INTERVAL_MS) return
      lastDetectionTime = now

      try {
        const result = handLandmarker.detectForVideo(videoEl, now)

        // 每 2 秒打印一次检测状态
        detectCount++
        if (now - lastLogTime > 2000) {
          lastLogTime = now
          console.log(`[HandTracking] 检测中... 检测到 ${result.landmarks.length} 只手`)
        }

        if (result.landmarks.length === 0) {
          if (currentGesture.value !== 'none') {
            pendingCount++
            if (pendingCount > 10) {
              setGesture('none', 0, { x: 0.5, y: 0.5, z: 0 }, 'right')
            }
          }
          return
        }

        const lm = result.landmarks[0] as Vec3[]
        lastLandmarks = lm
        if (debugMode.value) drawDebug(lm)
        const handedness = (result.handednesses?.[0]?.[0]?.categoryName === 'Left') ? 'left' : 'right'
        const palm = getPalmCenter(lm)
        const indexTip = lm[8] // 食指尖

        // 判断各手指是否伸展
        const indexUp = fingerExtended(lm, 8, 6, 0.9)
        const middleUp = fingerExtended(lm, 12, 10, 0.9)
        const ringUp = fingerExtended(lm, 16, 14, 0.9)
        const pinkyUp = fingerExtended(lm, 20, 18, 0.9)
        const thumbUp = thumbExtended(lm)

        const extendedCount = [thumbUp, indexUp, middleUp, ringUp, pinkyUp].filter(Boolean).length

        // 优先级：pointing > open_palm > closed_fist > none
        let detected: HandGesture = 'none'

        // ☝️ 食指指向：只有 index 伸展（1 根），其他弯曲
        if (indexUp && !middleUp && !ringUp && !pinkyUp) {
          detected = 'pointing'
        }
        // 🖐 张掌：5 根全伸
        else if (extendedCount >= 5) {
          detected = 'open_palm'
        }
        // ✊ 握拳：0 根伸展
        else if (extendedCount <= 1 && !indexUp) {
          detected = 'closed_fist'
        }

        setGesture(detected, 0.9, palm, handedness, indexTip)

        if (candidates.length > 0) {
          candidates.sort((a, b) => b.confidence - a.confidence)
          const best = candidates[0]
          setGesture(best.gesture, best.confidence, palm, handedness, pinchStrength, palmRotX, palmTiltY)
        } else {
          setGesture('none', 0, palm, handedness)
        }
      } catch {
        // 静默忽略
      }
    }
    animFrameId = requestAnimationFrame(loop)
  }

  /* ── 手势平滑 ── */
  let lastIndexTip: Vec3 = { x: 0.5, y: 0.5, z: 0 }

  function setGesture(
    gesture: HandGesture, confidence: number, palm: Vec3, handedness: 'left' | 'right',
    indexTip: Vec3 = { x: 0.5, y: 0.5, z: 0 }
  ) {
    lastIndexTip = indexTip
    if (gesture !== currentGesture.value) {
      if (gesture === pendingGesture) {
        pendingCount++
      } else {
        pendingGesture = gesture
        pendingCount = 1
      }
      if (pendingCount >= SMOOTH_FRAMES) {
        console.log(`[HandTracking] 🔄 手势切换: ${currentGesture.value} → ${gesture}`)
        currentGesture.value = gesture
        gestureConfidence.value = confidence
        gestureCallback?.({ gesture, confidence, palmPosition: palm, handedness, indexTip: lastIndexTip })
      }
    } else {
      pendingCount = 0
      gestureConfidence.value = confidence
      gestureCallback?.({ gesture, confidence, palmPosition: palm, handedness, indexTip: lastIndexTip })
    }
  }

  /* ── 调试模式 ── */
  function toggleDebug() {
    debugMode.value = !debugMode.value
    if (debugMode.value) {
      showDebugOverlay()
    } else {
      hideDebugOverlay()
    }
  }

  function showDebugOverlay() {
    if (!videoEl || !videoEl.parentElement) return
    const parent = videoEl.parentElement

    // 显示视频
    videoEl.style.width = '320px'
    videoEl.style.height = '240px'
    videoEl.style.opacity = '1'
    videoEl.style.zIndex = '100'
    videoEl.style.borderRadius = '8px'
    videoEl.style.border = '2px solid rgba(80,184,240,0.4)'
    videoEl.style.transform = 'scaleX(-1)' // 镜像
    videoEl.style.bottom = '60px'
    videoEl.style.right = '10px'
    videoEl.style.top = 'auto'
    videoEl.style.left = 'auto'

    // 创建 canvas 覆盖层
    if (!canvasEl) {
      canvasEl = document.createElement('canvas')
      canvasEl.width = 320
      canvasEl.height = 240
      canvasEl.style.position = 'absolute'
      canvasEl.style.bottom = '60px'
      canvasEl.style.right = '10px'
      canvasEl.style.width = '320px'
      canvasEl.style.height = '240px'
      canvasEl.style.zIndex = '101'
      canvasEl.style.pointerEvents = 'none'
      canvasEl.style.transform = 'scaleX(-1)'
      canvasEl.style.borderRadius = '8px'
      canvasCtx = canvasEl.getContext('2d')
      parent.appendChild(canvasEl)
    }
  }

  function hideDebugOverlay() {
    if (videoEl) {
      videoEl.style.width = '1px'
      videoEl.style.height = '1px'
      videoEl.style.opacity = '0'
      videoEl.style.zIndex = ''
      videoEl.style.transform = ''
      videoEl.style.bottom = ''
      videoEl.style.right = ''
      videoEl.style.top = '0'
      videoEl.style.left = '0'
    }
    if (canvasEl) {
      canvasEl.remove()
      canvasEl = null
      canvasCtx = null
    }
  }

  // 手部骨骼连接
  const HAND_CONNECTIONS = [
    [0,1],[1,2],[2,3],[3,4],       // 拇指
    [0,5],[5,6],[6,7],[7,8],       // 食指
    [5,9],[9,10],[10,11],[11,12],  // 中指
    [9,13],[13,14],[14,15],[15,16],// 无名指
    [13,17],[17,18],[18,19],[19,20],// 小指
    [0,17]                         // 手掌
  ]

  function drawDebug(lm: Vec3[]) {
    if (!canvasCtx || !canvasEl) return
    const ctx = canvasCtx
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)

    // 画骨骼连线
    ctx.strokeStyle = 'rgba(0, 255, 150, 0.6)'
    ctx.lineWidth = 2
    for (const [a, b] of HAND_CONNECTIONS) {
      ctx.beginPath()
      ctx.moveTo(lm[a].x * 320, lm[a].y * 240)
      ctx.lineTo(lm[b].x * 320, lm[b].y * 240)
      ctx.stroke()
    }

    // 画关键点
    for (let i = 0; i < lm.length; i++) {
      const x = lm[i].x * 320
      const y = lm[i].y * 240
      // 食指尖(8) 画大一点，红色
      if (i === 8) {
        ctx.fillStyle = '#FF4444'
        ctx.beginPath()
        ctx.arc(x, y, 6, 0, Math.PI * 2)
        ctx.fill()
      } else {
        ctx.fillStyle = 'rgba(80, 200, 255, 0.9)'
        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // 左上角显示当前手势
    ctx.fillStyle = 'rgba(0,0,0,0.5)'
    ctx.fillRect(0, 0, 120, 24)
    ctx.fillStyle = '#fff'
    ctx.font = '14px monospace'
    const g = currentGesture.value
    ctx.fillText(g === 'pointing' ? '☝️ pointing' : g === 'open_palm' ? '🖐 open' : g === 'closed_fist' ? '✊ fist' : '👀 none', 6, 17)
  }

  /* ── 注册回调 ── */
  function onGestureChange(cb: (result: HandTrackingResult) => void) {
    gestureCallback = cb
    console.log('[HandTracking] 回调已注册')
  }

  /* ── 停止 ── */
  function stop() {
    console.log('[HandTracking] 停止')
    cleanup()
    isActive.value = false
    currentGesture.value = 'none'
    gestureConfidence.value = 0
  }

  function cleanup() {
    if (animFrameId !== null) {
      cancelAnimationFrame(animFrameId)
      animFrameId = null
    }
    if (stream) {
      console.log('[HandTracking] 释放摄像头 stream')
      stream.getTracks().forEach(t => {
        t.stop()
        console.log('[HandTracking] track stopped:', t.kind, t.label)
      })
      stream = null
    }
    if (videoEl) {
      videoEl.srcObject = null
      videoEl.remove()
      videoEl = null
    }
    handLandmarker?.close()
    handLandmarker = null
  }

  // 页面关闭/刷新时强制释放摄像头
  const onBeforeUnload = () => cleanup()
  window.addEventListener('beforeunload', onBeforeUnload)

  onUnmounted(() => {
    stop()
    window.removeEventListener('beforeunload', onBeforeUnload)
  })

  return {
    isActive,
    isLoading,
    currentGesture,
    gestureConfidence,
    errorMsg,
    debugMode,
    start,
    stop,
    toggleDebug,
    onGestureChange,
  }
}

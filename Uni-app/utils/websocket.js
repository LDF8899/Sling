/**
 * WebSocket 客户端 — 用于接收实时 SOS 状态推送
 * 基于 uni.connectSocket API，适配微信小程序
 */

import { getBaseUrl } from './api'

let socketTask = null
let isConnected = false
let reconnectTimer = null
let reconnectCount = 0
const MAX_RECONNECT = 10
const RECONNECT_INTERVAL = 5000

// 消息回调列表
const listeners = []

/**
 * 连接 WebSocket
 */
export function connectWebSocket() {
  if (isConnected && socketTask) return

  const baseUrl = getBaseUrl()
  // 将 http:// 转为 ws://
  const wsUrl = baseUrl.replace(/^http/, 'ws') + '/ws/websocket'

  console.log('[WS] 连接:', wsUrl)

  socketTask = uni.connectSocket({
    url: wsUrl,
    success: () => console.log('[WS] 连接请求已发送'),
    fail: (err) => console.error('[WS] 连接失败:', err)
  })

  socketTask.onOpen(() => {
    console.log('[WS] 已连接')
    isConnected = true
    reconnectCount = 0

    // 发送 STOMP CONNECT 帧
    const connectFrame = 'CONNECT\naccept-version:1.1,1.0\nheart-beat:10000,10000\n\n\0'
    socketTask.send({ data: connectFrame })
  })

  socketTask.onMessage((res) => {
    const data = res.data
    if (typeof data !== 'string') return

    // 处理 STOMP 帧
    if (data.startsWith('CONNECTED')) {
      console.log('[WS] STOMP 已连接')
      // 订阅频道
      subscribe('/topic/sos/new')
      subscribe('/topic/sos/status')
      subscribe('/topic/agent/decision')
      return
    }

    // 解析 STOMP MESSAGE 帧
    if (data.startsWith('MESSAGE')) {
      try {
        const bodyStart = data.indexOf('\n\n') + 2
        const bodyEnd = data.indexOf('\0')
        const body = data.substring(bodyStart, bodyEnd > 0 ? bodyEnd : undefined)
        const msg = JSON.parse(body)

        // 分发给所有监听器
        listeners.forEach(cb => {
          try { cb(msg) } catch (e) { console.error('[WS] 回调错误:', e) }
        })
      } catch (e) {
        console.error('[WS] 消息解析失败:', e)
      }
    }
  })

  socketTask.onClose(() => {
    console.log('[WS] 已断开')
    isConnected = false
    socketTask = null
    tryReconnect()
  })

  socketTask.onError((err) => {
    console.error('[WS] 错误:', err)
    isConnected = false
  })
}

/**
 * 订阅 STOMP 频道
 */
function subscribe(destination) {
  if (!socketTask || !isConnected) return
  const frame = `SUBSCRIBE\nid:sub-${destination}\ndestination:${destination}\n\n\0`
  socketTask.send({ data: frame })
  console.log('[WS] 订阅:', destination)
}

/**
 * 自动重连
 */
function tryReconnect() {
  if (reconnectCount >= MAX_RECONNECT) {
    console.log('[WS] 已达最大重连次数，停止重连')
    return
  }
  reconnectCount++
  console.log(`[WS] ${RECONNECT_INTERVAL / 1000}s 后重连 (${reconnectCount}/${MAX_RECONNECT})`)
  reconnectTimer = setTimeout(() => {
    connectWebSocket()
  }, RECONNECT_INTERVAL)
}

/**
 * 注册消息监听器
 * @param {Function} callback - 回调函数，参数为 { type, data, timestamp }
 * @returns {Function} 取消监听的函数
 */
export function onWsMessage(callback) {
  listeners.push(callback)
  return () => {
    const idx = listeners.indexOf(callback)
    if (idx >= 0) listeners.splice(idx, 1)
  }
}

/**
 * 断开连接
 */
export function disconnectWebSocket() {
  if (reconnectTimer) {
    clearTimeout(reconnectTimer)
    reconnectTimer = null
  }
  reconnectCount = MAX_RECONNECT // 阻止自动重连
  if (socketTask) {
    socketTask.close({})
    socketTask = null
  }
  isConnected = false
  listeners.length = 0
}

/**
 * 获取连接状态
 */
export function isWsConnected() {
  return isConnected
}

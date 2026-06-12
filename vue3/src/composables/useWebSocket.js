import { ref, onMounted, onUnmounted } from 'vue'
import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client/dist/sockjs'

/**
 * WebSocket STOMP 组合式函数 — 连接 agent-service 实时推送
 *
 * @param {string} wsUrl - WebSocket 端点地址
 * @returns {{ connected, onMessage, disconnect }}
 */
export function useWebSocket(wsUrl = 'http://localhost:8888/ws') {
  const connected = ref(false)
  const subscriptions = []
  let client = null

  /**
   * 连接 WebSocket
   */
  function connect() {
    client = new Client({
      webSocketFactory: () => new SockJS(wsUrl),
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,

      onConnect: () => {
        connected.value = true
        console.log('[WS] 已连接到指挥中心')
        // 自动订阅已注册的频道
        subscriptions.forEach(sub => {
          sub.subscription = client.subscribe(sub.destination, (message) => {
            try {
              const body = JSON.parse(message.body)
              sub.callback(body)
            } catch (e) {
              console.error('[WS] 消息解析失败:', e)
            }
          })
        })
      },

      onDisconnect: () => {
        connected.value = false
        console.log('[WS] 已断开')
      },

      onStompError: (frame) => {
        console.error('[WS] STOMP 错误:', frame.headers?.message)
        connected.value = false
      }
    })

    client.activate()
  }

  /**
   * 订阅频道
   * @param {string} destination - STOMP 目标地址，如 /topic/sos/new
   * @param {function} callback - 消息回调
   */
  function onMessage(destination, callback) {
    const sub = { destination, callback, subscription: null }
    subscriptions.push(sub)
    // 如果已连接，立即订阅
    if (client && connected.value) {
      sub.subscription = client.subscribe(destination, (message) => {
        try {
          const body = JSON.parse(message.body)
          callback(body)
        } catch (e) {
          console.error('[WS] 消息解析失败:', e)
        }
      })
    }
    return () => {
      sub.subscription?.unsubscribe()
      const idx = subscriptions.indexOf(sub)
      if (idx >= 0) subscriptions.splice(idx, 1)
    }
  }

  /**
   * 断开连接
   */
  function disconnect() {
    subscriptions.forEach(sub => sub.subscription?.unsubscribe())
    subscriptions.length = 0
    client?.deactivate()
    connected.value = false
  }

  onMounted(() => connect())
  onUnmounted(() => disconnect())

  return { connected, onMessage, disconnect }
}

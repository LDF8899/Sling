package com.sling.agent.service;

import com.sling.agent.dto.WsMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

/**
 * WebSocket 推送服务 — 向指挥中心和用户端推送实时消息
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class WebSocketNotificationService {

    private final SimpMessagingTemplate messagingTemplate;

    /**
     * 推送新 SOS 通知到指挥中心
     */
    public <T> void pushNewSos(T data) {
        WsMessage<T> msg = WsMessage.of("sos_new", data);
        messagingTemplate.convertAndSend("/topic/sos/new", msg);
        log.info("[WS] 推送新 SOS 到指挥中心");
    }

    /**
     * 推送 SOS 状态变更
     */
    public <T> void pushSosStatus(Long sosId, T data) {
        WsMessage<T> msg = WsMessage.of("sos_status", data);
        messagingTemplate.convertAndSend("/topic/sos/" + sosId + "/status", msg);
        messagingTemplate.convertAndSend("/topic/sos/status", msg);
        log.info("[WS] 推送 SOS #{} 状态变更", sosId);
    }

    /**
     * 推送 Agent 决策结果到指挥中心
     */
    public <T> void pushAgentDecision(T data) {
        WsMessage<T> msg = WsMessage.of("agent_decision", data);
        messagingTemplate.convertAndSend("/topic/agent/decision", msg);
        log.info("[WS] 推送 Agent 决策结果");
    }

    /**
     * 推送实时统计更新
     */
    public <T> void pushStatsUpdate(T data) {
        WsMessage<T> msg = WsMessage.of("stats_update", data);
        messagingTemplate.convertAndSend("/topic/stats", msg);
    }
}

package com.sling.agent.service;

import com.sling.agent.dto.AgentDecision;
import com.sling.agent.dto.SosEvent;
import com.sling.agent.feign.EmergencyFeignClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * Agent 编排引擎 — 协调决策、推送、状态更新的全链路
 * <p>
 * 流程：收到 SOS 事件 → 生成决策 → 推送指挥中心 → 更新状态 → 写入事件溯源
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AgentOrchestrator {

    private final DispatchService dispatchService;
    private final WebSocketNotificationService wsNotification;
    private final EmergencyFeignClient emergencyFeignClient;
    private final EventSourcingService eventSourcing;

    /**
     * 处理新 SOS 事件 — 全链路编排
     */
    public AgentDecision handleNewSos(SosEvent event) {
        Long helpId = event.getHelpId();
        long start = System.currentTimeMillis();
        log.info("========== Agent 编排开始: SOS #{} ==========", helpId);

        // 记录：SOS 创建事件
        eventSourcing.record(helpId, "sos_created", "recognition", Map.of(
                "type", event.getType() != null ? event.getType() : "unknown",
                "snakeName", event.getSnakeName() != null ? event.getSnakeName() : "unknown",
                "location", event.getLocation() != null ? event.getLocation() : ""
        ));

        // Step 1: 推送"新 SOS"通知到指挥中心（即时）
        wsNotification.pushNewSos(event);
        log.info("[Step 1/4] 新 SOS 通知已推送");

        // Step 2: 生成 AI 决策
        AgentDecision decision = dispatchService.makeDecision(event);
        log.info("[Step 2/4] 决策完成: severity={}, hospitals={}",
                decision.getSeverity(), decision.getHospitals() != null ? decision.getHospitals().size() : 0);

        // 记录：Agent 决策
        Map<String, Object> decisionPayload = new HashMap<>();
        decisionPayload.put("severity", decision.getSeverity());
        decisionPayload.put("hospitalCount", decision.getHospitals() != null ? decision.getHospitals().size() : 0);
        decisionPayload.put("summary", decision.getSummary());
        eventSourcing.record(helpId, "agent_decision", "dispatch", decisionPayload);

        // Step 3: 推送决策结果到指挥中心
        wsNotification.pushAgentDecision(decision);
        log.info("[Step 3/4] 决策结果已推送");

        // 记录：通知发送
        eventSourcing.record(helpId, "notification_sent", "notify", Map.of(
                "target", "command_center",
                "type", "agent_decision"
        ));

        // Step 4: 更新 SOS 状态为 processing
        try {
            emergencyFeignClient.updateStatus(helpId, "processing");
            log.info("[Step 4/4] SOS 状态已更新为 processing");

            eventSourcing.record(helpId, "status_changed", "track", Map.of(
                    "oldStatus", "pending",
                    "newStatus", "processing"
            ));
        } catch (Exception e) {
            log.warn("[Step 4/4] 更新 SOS 状态失败: {}", e.getMessage());
            eventSourcing.record(helpId, "status_change_failed", "track",
                    Map.of("error", e.getMessage()),
                    System.currentTimeMillis() - start, "fail", e.getMessage());
        }

        long elapsed = System.currentTimeMillis() - start;
        log.info("========== Agent 编排完成: SOS #{}，耗时 {}ms ==========", helpId, elapsed);

        // 记录：编排完成
        eventSourcing.record(helpId, "orchestration_complete", "complete",
                Map.of("durationMs", elapsed, "severity", decision.getSeverity()),
                elapsed, "success", null);

        return decision;
    }

    /**
     * 处理 SOS 状态变更
     */
    public void handleStatusChanged(SosEvent event) {
        log.info("SOS #{} 状态变更: {}", event.getHelpId(), event.getEventType());
        wsNotification.pushSosStatus(event.getHelpId(), event);

        eventSourcing.record(event.getHelpId(), "status_changed", "track", Map.of(
                "newStatus", event.getStatus() != null ? event.getStatus() : "unknown"
        ));
    }
}

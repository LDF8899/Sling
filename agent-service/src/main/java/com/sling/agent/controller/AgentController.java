package com.sling.agent.controller;

import com.sling.agent.dto.AgentDecision;
import com.sling.agent.dto.SosEvent;
import com.sling.agent.entity.EventLog;
import com.sling.agent.service.AgentOrchestrator;
import com.sling.agent.service.DispatchService;
import com.sling.agent.service.EventSourcingService;
import com.sling.common.utils.Result;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Agent 服务 REST API — 决策触发 + 事件溯源回放
 */
@Slf4j
@RestController
@RequestMapping("/api/agent")
@RequiredArgsConstructor
public class AgentController {

    private final AgentOrchestrator agentOrchestrator;
    private final DispatchService dispatchService;
    private final EventSourcingService eventSourcing;

    /**
     * 手动触发 Agent 决策（调试用）
     */
    @PostMapping("/decide")
    public Result<AgentDecision> manualDecide(@RequestBody SosEvent event) {
        log.info("手动触发 Agent 决策: helpId={}", event.getHelpId());
        try {
            AgentDecision decision = dispatchService.makeDecision(event);
            return Result.success(decision);
        } catch (Exception e) {
            log.error("Agent 决策失败", e);
            return Result.fail("决策失败: " + e.getMessage());
        }
    }

    /**
     * 事件溯源回放 — 查看某个 SOS 的完整事件链
     */
    @GetMapping("/replay/{helpId}")
    public Result<List<EventLog>> replay(@PathVariable Long helpId) {
        log.info("事件溯源回放: helpId={}", helpId);
        try {
            List<EventLog> events = eventSourcing.replay(helpId);
            return Result.success(events);
        } catch (Exception e) {
            log.error("事件回放失败", e);
            return Result.fail("回放失败: " + e.getMessage());
        }
    }

    /**
     * 查询最近的事件
     */
    @GetMapping("/events/recent")
    public Result<List<EventLog>> recentEvents() {
        try {
            return Result.success(eventSourcing.getRecentEvents());
        } catch (Exception e) {
            return Result.fail("查询失败: " + e.getMessage());
        }
    }

    /**
     * 健康检查
     */
    @GetMapping("/health")
    public Result<String> health() {
        return Result.success("Agent 服务运行正常");
    }
}

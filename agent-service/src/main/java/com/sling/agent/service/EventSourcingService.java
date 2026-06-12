package com.sling.agent.service;

import com.sling.agent.entity.EventLog;
import com.sling.agent.repository.EventLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * 事件溯源服务 — 记录 + 查询 + 回放
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class EventSourcingService {

    private final EventLogRepository eventLogRepository;

    /**
     * 记录事件
     */
    public EventLog record(Long helpId, String eventType, String stage, Map<String, Object> payload) {
        EventLog eventLog = EventLog.of(helpId, eventType, stage, payload);
        EventLog saved = eventLogRepository.save(eventLog);
        log.debug("[事件溯源] helpId={}, type={}, stage={}", helpId, eventType, stage);
        return saved;
    }

    /**
     * 记录事件（带耗时和结果）
     */
    public EventLog record(Long helpId, String eventType, String stage,
                           Map<String, Object> payload, long durationMs, String result, String errorMessage) {
        EventLog eventLog = EventLog.of(helpId, eventType, stage, payload);
        eventLog.setDurationMs(durationMs);
        eventLog.setResult(result);
        eventLog.setErrorMessage(errorMessage);
        return eventLogRepository.save(eventLog);
    }

    /**
     * 回放某个 SOS 的完整事件链
     */
    public List<EventLog> replay(Long helpId) {
        return eventLogRepository.findByHelpIdOrderByEventTimeAsc(helpId);
    }

    /**
     * 查询最近的事件
     */
    public List<EventLog> getRecentEvents() {
        return eventLogRepository.findTop50ByOrderByEventTimeDesc();
    }

    /**
     * 查询某段时间的事件
     */
    public List<EventLog> getEventsByTimeRange(Date start, Date end) {
        return eventLogRepository.findByEventTimeBetweenOrderByEventTimeAsc(start, end);
    }
}

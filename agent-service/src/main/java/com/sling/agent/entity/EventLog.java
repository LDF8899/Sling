package com.sling.agent.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.Map;

/**
 * 事件溯源日志 — 存储在 MongoDB
 * <p>
 * 每个 SOS 全链路事件（创建、决策、状态变更、完成）都记录为一条文档，
 * 支持事后回放和分析。
 */
@Data
@Document(collection = "event_logs")
public class EventLog {

    @Id
    private String id;

    /** 关联的 SOS 求助 ID */
    private Long helpId;

    /** 事件类型: sos_created / agent_decision / status_changed / sos_completed */
    private String eventType;

    /** 事件阶段: recognition / dispatch / notify / track / complete */
    private String stage;

    /** 事件数据（JSON） */
    private Map<String, Object> payload;

    /** 事件发生时间 */
    private Date eventTime;

    /** 处理耗时（毫秒） */
    private Long durationMs;

    /** 处理结果: success / fail / timeout */
    private String result;

    /** 错误信息（如果失败） */
    private String errorMessage;

    public EventLog() {
        this.eventTime = new Date();
        this.result = "success";
    }

    public static EventLog of(Long helpId, String eventType, String stage, Map<String, Object> payload) {
        EventLog log = new EventLog();
        log.setHelpId(helpId);
        log.setEventType(eventType);
        log.setStage(stage);
        log.setPayload(payload);
        return log;
    }
}

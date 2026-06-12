package com.sling.agent.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

/**
 * WebSocket 推送消息通用 DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WsMessage<T> implements Serializable {

    private static final long serialVersionUID = 1L;

    /** 消息类型：sos_new / sos_status / agent_decision */
    private String type;

    /** 消息数据 */
    private T data;

    /** 时间戳 */
    private Date timestamp;

    public static <T> WsMessage<T> of(String type, T data) {
        return new WsMessage<>(type, data, new Date());
    }
}

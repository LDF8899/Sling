package com.sling.agent.service;

import com.sling.agent.entity.EventLog;
import com.sling.agent.repository.EventLogRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Date;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("事件溯源服务测试")
class EventSourcingServiceTest {

    @Mock
    private EventLogRepository eventLogRepository;

    @InjectMocks
    private EventSourcingService eventSourcingService;

    @Test
    @DisplayName("记录事件并保存到 MongoDB")
    void testRecord_Success() {
        EventLog savedLog = new EventLog();
        savedLog.setId("abc123");
        savedLog.setHelpId(100L);
        savedLog.setEventType("sos_created");
        savedLog.setStage("recognition");
        when(eventLogRepository.save(any(EventLog.class))).thenReturn(savedLog);

        EventLog result = eventSourcingService.record(100L, "sos_created", "recognition",
                Map.of("type", "snake_bite"));

        assertNotNull(result);
        assertEquals("abc123", result.getId());
        assertEquals(100L, result.getHelpId());
        verify(eventLogRepository).save(any(EventLog.class));
    }

    @Test
    @DisplayName("回放返回按时间排序的事件列表")
    void testReplay_ReturnsInOrder() {
        EventLog e1 = new EventLog();
        e1.setEventType("sos_created");
        e1.setEventTime(new Date(1000));
        EventLog e2 = new EventLog();
        e2.setEventType("agent_decision");
        e2.setEventTime(new Date(2000));
        EventLog e3 = new EventLog();
        e3.setEventType("status_changed");
        e3.setEventTime(new Date(3000));

        when(eventLogRepository.findByHelpIdOrderByEventTimeAsc(100L))
                .thenReturn(List.of(e1, e2, e3));

        List<EventLog> events = eventSourcingService.replay(100L);

        assertEquals(3, events.size());
        assertEquals("sos_created", events.get(0).getEventType());
        assertEquals("agent_decision", events.get(1).getEventType());
        assertEquals("status_changed", events.get(2).getEventType());
    }

    @Test
    @DisplayName("查询最近事件")
    void testGetRecentEvents() {
        when(eventLogRepository.findTop50ByOrderByEventTimeDesc())
                .thenReturn(List.of(new EventLog(), new EventLog()));

        List<EventLog> events = eventSourcingService.getRecentEvents();

        assertEquals(2, events.size());
        verify(eventLogRepository).findTop50ByOrderByEventTimeDesc();
    }
}

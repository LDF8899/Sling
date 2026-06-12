package com.sling.emergency.service;

import com.sling.emergency.entity.EmergencyHelp;
import com.sling.emergency.event.SosEventPublisher;
import com.sling.emergency.mapper.EmergencyHelpMapper;
import com.sling.emergency.service.impl.EmergencyHelpServiceImpl;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("急救求助服务测试")
class EmergencyHelpServiceImplTest {

    @Mock
    private EmergencyHelpMapper emergencyHelpMapper;

    @Mock
    private SosEventPublisher sosEventPublisher;

    @InjectMocks
    private EmergencyHelpServiceImpl emergencyHelpService;

    @Test
    @DisplayName("保存成功后调用 sosEventPublisher.publishSosCreated")
    void testSaveEmergencyHelp_PublishesEvent() {
        EmergencyHelp help = createTestHelp();
        when(emergencyHelpMapper.insert(any(EmergencyHelp.class))).thenReturn(1);

        boolean result = emergencyHelpService.saveEmergencyHelp(help);

        assertTrue(result);
        verify(sosEventPublisher).publishSosCreated(help);
    }

    @Test
    @DisplayName("事件发布失败不影响保存结果")
    void testSaveEmergencyHelp_EventPublishFails_SaveStillSucceeds() {
        EmergencyHelp help = createTestHelp();
        when(emergencyHelpMapper.insert(any(EmergencyHelp.class))).thenReturn(1);
        doThrow(new RuntimeException("MQ 不可用")).when(sosEventPublisher).publishSosCreated(any());

        boolean result = emergencyHelpService.saveEmergencyHelp(help);

        assertTrue(result);
        verify(sosEventPublisher).publishSosCreated(help);
    }

    @Test
    @DisplayName("保存失败时不发布事件")
    void testSaveEmergencyHelp_SaveFails_NoEventPublished() {
        EmergencyHelp help = createTestHelp();
        when(emergencyHelpMapper.insert(any(EmergencyHelp.class))).thenReturn(0);

        boolean result = emergencyHelpService.saveEmergencyHelp(help);

        assertFalse(result);
        verify(sosEventPublisher, never()).publishSosCreated(any());
    }

    @Test
    @DisplayName("状态更新后发布事件")
    void testUpdateStatus_PublishesStatusEvent() {
        EmergencyHelp help = createTestHelp();
        help.setStatus("pending");
        when(emergencyHelpMapper.selectById(100L)).thenReturn(help);
        when(emergencyHelpMapper.updateById(any(EmergencyHelp.class))).thenReturn(1);

        boolean result = emergencyHelpService.updateStatus(100L, "processing");

        assertTrue(result);
        verify(sosEventPublisher).publishSosStatusChanged(help);
        assertEquals("processing", help.getStatus());
    }

    private EmergencyHelp createTestHelp() {
        EmergencyHelp help = new EmergencyHelp();
        help.setId(100L);
        help.setType("snake_bite");
        help.setLocation("深圳南山");
        help.setSnakeName("银环蛇");
        help.setLongitude(113.93);
        help.setLatitude(22.52);
        return help;
    }
}

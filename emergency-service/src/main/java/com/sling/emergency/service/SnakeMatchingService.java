package com.sling.emergency.service;

import com.sling.emergency.entity.SnakeEmergencyInfo;

import java.util.List;

public interface SnakeMatchingService {
    /**
     * 根据症状描述匹配可能的蛇种
     * @param symptoms 症状描述
     * @return 可能的蛇种列表
     */
    List<SnakeEmergencyInfo> matchSnakesBySymptoms(String symptoms);
    
    /**
     * 验证蛇类学名是否存在
     * @param snakeName 蛇类学名
     * @return 是否存在
     */
    boolean validateSnakeName(String snakeName);
    
    /**
     * 根据AI分析的症状描述智能匹配蛇种
     * @param symptoms AI分析的症状描述
     * @return 匹配的蛇种列表
     */
    List<SnakeEmergencyInfo> intelligentMatch(String symptoms);
}
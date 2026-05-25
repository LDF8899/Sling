package com.sling.emergency.service;

import com.sling.emergency.entity.EmergencyQaCache;
import java.util.List;

public interface EmergencyQaCacheService {
    /**
     * 根据问题获取缓存的答案
     * @param question 用户问题
     * @return 缓存的答案，如果没有则返回null
     */
    EmergencyQaCache getAnswerByQuestion(String question);

    /**
     * 保存问答缓存
     * @param qaCache 问答缓存对象
     * @return 是否保存成功
     */
    boolean saveQaCache(EmergencyQaCache qaCache);

    /**
     * 获取所有缓存的问答
     * @return 问答列表
     */
    List<EmergencyQaCache> listAll();
    
    /**
     * 清除所有问答缓存
     * @return 是否清除成功
     */
    boolean clearAllCache();
}
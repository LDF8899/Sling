package com.sling.emergency.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sling.emergency.entity.EmergencyQaCache;
import com.sling.emergency.mapper.EmergencyQaCacheMapper;
import com.sling.emergency.service.EmergencyQaCacheService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Implementation of {@link EmergencyQaCacheService} using MyBatis-Plus.
 */
@Slf4j
@Service
public class EmergencyQaCacheServiceImpl
        extends ServiceImpl<EmergencyQaCacheMapper, EmergencyQaCache>
        implements EmergencyQaCacheService {

    @Override
    public EmergencyQaCache getAnswerByQuestion(String question) {
        QueryWrapper<EmergencyQaCache> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("question", question);
        return getOne(queryWrapper);
    }

    @Override
    public boolean saveQaCache(EmergencyQaCache qaCache) {
        EmergencyQaCache existingCache = getAnswerByQuestion(qaCache.getQuestion());
        if (existingCache != null) {
            existingCache.setAnswer(qaCache.getAnswer());
            return updateById(existingCache);
        }
        return save(qaCache);
    }

    @Override
    public List<EmergencyQaCache> listAll() {
        return list();
    }

    @Override
    public boolean clearAllCache() {
        return remove(new QueryWrapper<>());
    }
}

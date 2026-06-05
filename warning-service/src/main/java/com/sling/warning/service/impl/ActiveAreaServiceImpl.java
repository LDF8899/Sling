package com.sling.warning.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sling.warning.entity.ActiveArea;
import com.sling.warning.mapper.ActiveAreaMapper;
import com.sling.warning.service.ActiveAreaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 风险区域服务实现
 *
 * <p>提供风险区域的查询功能。
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ActiveAreaServiceImpl extends ServiceImpl<ActiveAreaMapper, ActiveArea> implements ActiveAreaService {

    private final ActiveAreaMapper activeAreaMapper;

    @Override
    public List<ActiveArea> getAllActiveAreas() {
        return activeAreaMapper.selectAllActiveAreas();
    }
}

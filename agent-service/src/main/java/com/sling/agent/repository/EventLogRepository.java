package com.sling.agent.repository;

import com.sling.agent.entity.EventLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

/**
 * 事件溯源日志 Repository
 */
@Repository
public interface EventLogRepository extends MongoRepository<EventLog, String> {

    /** 查询某个 SOS 的全部事件（按时间排序） */
    List<EventLog> findByHelpIdOrderByEventTimeAsc(Long helpId);

    /** 查询某个 SOS 的特定类型事件 */
    List<EventLog> findByHelpIdAndEventTypeOrderByEventTimeAsc(Long helpId, String eventType);

    /** 查询某段时间内的事件 */
    List<EventLog> findByEventTimeBetweenOrderByEventTimeAsc(Date start, Date end);

    /** 查询最近 N 条事件 */
    List<EventLog> findTop50ByOrderByEventTimeDesc();

    /** 按阶段统计事件数量 */
    long countByStage(String stage);
}

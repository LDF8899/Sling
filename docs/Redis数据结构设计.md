# 蛇灵 (SLING) Redis 数据结构设计

> 最后更新：2026-05-11
> Redis 版本：7.2-alpine（Docker）
> 端口：6379
> 容器名：redis

---

## 一、Redis 在系统中的角色

```
用户请求 → Gateway → 识别服务 → AI 返回蛇名
                                    ↓
                              Redis Hash 查急救卡片（1-5ms）
                                    ↓
                              返回急救指南 + 附近医院
```

**核心价值：** 将"识别到急救指南"的响应从 MySQL 的 50-100ms 压到 1-5ms。

---

## 二、数据结构设计

### 2.1 蛇类急救热点数据 — Hash

**Key 格式：** `sling:snake:info:{snake_id}`
**类型：** Hash
**用途：** 存储蛇类核心信息，识别后秒级返回急救卡片

```
HSET sling:snake:info:1
  name        "银环蛇"
  latin_name  "Bungarus multicinctus"
  family      "眼镜蛇科"
  genus       "环蛇属"
  toxin_type  "神经毒素"
  danger_level "重度"
  toxicity    "3"
  alias       "金钱白花蛇,银甲带,白节黑"
  symptoms    "局部无明显疼痛肿胀，数小时后出现眼睑下垂、吞咽困难、呼吸肌麻痹"
  first_aid   "1.立即制动患肢 2.勿切开/吸毒 3.记录咬伤时间 4.尽快送医注射抗银环蛇血清"
  forbidden   "禁止切开伤口、禁止饮酒、禁止奔跑"
  serum_type  "抗银环蛇蛇毒血清"
  department  "急诊科/蛇伤专科"
  image_url   "/images/snakes/bungarus_multicinctus.jpg"
```

**数据量：** 189 条（当前），目标 355 条
**单条大小：** ~1KB
**总内存：** ~200KB（极小）

### 2.2 蛇类名称索引 — String

**Key 格式：** `sling:snake:name:{snake_name}`
**类型：** String（值为 snake_id）
**用途：** 通过蛇名快速查 ID，再用 ID 取 Hash

```
SET sling:snake:name:银环蛇 "1"
SET sling:snake:name:眼镜蛇 "2"
SET sling:snake:name:Bungarus_multicinctus "1"  # 拉丁学名也能查
```

**数据量：** ~500 条（中文名 + 拉丁学名 + 别名）

### 2.3 血清医院空间索引 — Geo

**Key 格式：** `sling:hospital:serum`
**类型：** Sorted Set（Geo 底层实现）
**用途：** 根据用户坐标查找最近的血清医院

```
GEOADD sling:hospital:serum 113.2644 23.1291 "hospital:1"   # 广州某医院
GEOADD sling:hospital:serum 114.0579 22.5431 "hospital:2"   # 深圳某医院
GEOADD sling:hospital:serum 110.3493 21.2707 "hospital:3"   # 湛江某医院
```

**查询：**
```
GEORADIUS sling:hospital:serum 113.26 23.12 50 km ASC COUNT 5
# 返回用户坐标 50km 内最近的 5 家医院
```

**数据量：** 当前 5 家，目标全国 24 小时急诊血清医院

### 2.4 蛇类分类索引 — Set

**Key 格式：** `sling:snake:family:{科名}` / `sling:snake:danger:{等级}`
**类型：** Set
**用途：** 按科属或危险等级批量查询

```
SADD sling:snake:family:蝰科 75 76 77 80 81 82 ...
SADD sling:snake:family:眼镜蛇科 1 2 3 16 ...
SADD sling:snake:danger:重度 1 2 3 4 6 11 ...
SADD sling:snake:danger:中度 5 12 13 ...
```

### 2.5 数据版本控制 — String

**Key 格式：** `sling:data:version`
**类型：** String
**用途：** 数据更新时广播版本号，各服务对比后决定是否刷新本地缓存

```
SET sling:data:version "20260511001"
```

---

## 三、Key 命名规范

```
sling:{模块}:{实体}:{标识}
```

| 前缀 | 模块 | 示例 |
|------|------|------|
| sling:snake:info:{id} | 蛇类信息 | sling:snake:info:1 |
| sling:snake:name:{name} | 名称索引 | sling:snake:name:银环蛇 |
| sling:snake:family:{科} | 科分类索引 | sling:snake:family:蝰科 |
| sling:snake:danger:{等级} | 危险等级索引 | sling:snake:danger:重度 |
| sling:hospital:serum | 血清医院 Geo | sling:hospital:serum |
| sling:data:version | 数据版本 | sling:data:version |

---

## 四、Spring Boot 集成方案

### 4.1 依赖（pom.xml）

```xml
<!-- Redis -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>

<!-- 连接池 -->
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
</dependency>
```

### 4.2 配置（application.yml）

```yaml
spring:
  redis:
    host: localhost
    port: 6379
    database: 0
    timeout: 3000ms
    lettuce:
      pool:
        max-active: 20
        max-idle: 10
        min-idle: 5
        max-wait: 3000ms
```

### 4.3 数据同步策略

```
MySQL (主存储) ──启动时/数据更新时──→ Redis (高速缓存)
                     ↓
              Redis Pub/Sub 通知各服务刷新
```

**同步时机：**
1. 服务启动时：全量同步 MySQL → Redis
2. 后台管理修改数据时：增量更新对应 Hash
3. Python 脚本更新数据后：通过 Pub/Sub 广播 `sling:data:version`

---

## 五、接入顺序

| 阶段 | 服务 | 操作 |
|------|------|------|
| P0 | snake-info-service | 启动时加载 snake_info → Redis Hash |
| P1 | recognition-service | AI 识别后从 Redis 取急救卡片 |
| P2 | hospital-service | Geo 查询附近血清医院 |
| P3 | admin-service | 数据变更时更新 Redis |

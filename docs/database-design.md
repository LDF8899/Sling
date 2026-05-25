# Sling 项目数据库设计

## 1. 数据库概述

### 1.1 基本信息
- **数据库类型**: MySQL 8.0
- **字符集**: utf8mb4
- **数据库名称**: sling_db
- **初始化脚本**: [database/sling_complete.sql](file:///c:/Users/Asuka/Desktop/1/Sling/database/sling_complete.sql)

### 1.2 设计原则
- 遵循第三范式（3NF）设计原则
- 适当反规范化提升查询性能
- 使用索引优化查询速度
- 数据一致性与完整性保障

## 2. 核心业务表设计

### 2.1 用户相关表

#### user_info（用户信息表）
| 字段名 | 类型 | 主键 | 非空 | 描述 |
|-------|------|------|------|------|
| id | BIGINT | √ | √ | 用户ID，自增主键 |
| username | VARCHAR(50) | | √ | 用户名 |
| phone | VARCHAR(20) | | | 手机号 |
| email | VARCHAR(100) | | | 邮箱 |
| password | VARCHAR(255) | | √ | 密码（加密） |
| avatar | VARCHAR(255) | | | 头像URL |
| nickname | VARCHAR(50) | | | 昵称 |
| gender | TINYINT | | | 性别（0:未知 1:男 2:女） |
| status | TINYINT | | √ | 状态（0:禁用 1:启用） |
| create_time | DATETIME | | √ | 创建时间 |
| update_time | DATETIME | | √ | 更新时间 |

#### role（角色表）
| 字段名 | 类型 | 主键 | 非空 | 描述 |
|-------|------|------|------|------|
| id | BIGINT | √ | √ | 角色ID，自增主键 |
| role_name | VARCHAR(50) | | √ | 角色名称 |
| role_code | VARCHAR(50) | | √ | 角色代码 |
| description | VARCHAR(255) | | | 角色描述 |
| status | TINYINT | | √ | 状态（0:禁用 1:启用） |
| create_time | DATETIME | | √ | 创建时间 |
| update_time | DATETIME | | √ | 更新时间 |

#### user_role（用户角色关联表）
| 字段名 | 类型 | 主键 | 非空 | 描述 |
|-------|------|------|------|------|
| id | BIGINT | √ | √ | 主键ID |
| user_id | BIGINT | | √ | 用户ID |
| role_id | BIGINT | | √ | 角色ID |
| create_time | DATETIME | | √ | 创建时间 |

### 2.2 蛇类信息相关表

#### snake_info（蛇类基本信息表）
| 字段名 | 类型 | 主键 | 非空 | 描述 |
|-------|------|------|------|------|
| id | BIGINT | √ | √ | 蛇类ID，自增主键 |
| chinese_name | VARCHAR(100) | | √ | 中文名称 |
| english_name | VARCHAR(200) | | | 英文名称 |
| scientific_name | VARCHAR(200) | | | 学名 |
| family | VARCHAR(100) | | | 科目 |
| genus | VARCHAR(100) | | | 属 |
| characteristics | TEXT | | | 形态特征 |
| distribution | TEXT | | | 分布区域 |
| habitat_info | TEXT | | | 栖息环境 |
| toxicity_level | TINYINT | | | 毒性等级（1-5） |
| toxin_type | VARCHAR(100) | | | 毒素类型 |
| conservation_status | VARCHAR(50) | | | 保护等级 |
| image_urls | TEXT | | | 图片URL集合，JSON格式 |
| description | TEXT | | | 详细描述 |
| status | TINYINT | | √ | 状态（0:禁用 1:启用） |
| create_time | DATETIME | | √ | 创建时间 |
| update_time | DATETIME | | √ | 更新时间 |

#### snake_emergency_info（蛇类急救信息表）
| 字段名 | 类型 | 主键 | 非空 | 描述 |
|-------|------|------|------|------|
| id | BIGINT | √ | √ | 急救信息ID，自增主键 |
| snake_id | BIGINT | | √ | 蛇类ID（外键） |
| symptoms | TEXT | | | 咬伤症状 |
| first_aid | TEXT | | | 急救措施 |
| forbidden | TEXT | | | 禁忌事项 |
| serum_type | VARCHAR(200) | | | 血清类型 |
| treatment_hospital | VARCHAR(500) | | | 推荐治疗医院 |
| severity_level | TINYINT | | | 严重程度（1-5） |
| status | TINYINT | | √ | 状态（0:禁用 1:启用） |
| create_time | DATETIME | | √ | 创建时间 |
| update_time | DATETIME | | √ | 更新时间 |

### 2.3 识别记录相关表

#### recognition_record（识别记录表）
| 字段名 | 类型 | 主键 | 非空 | 描述 |
|-------|------|------|------|------|
| id | BIGINT | √ | √ | 记录ID，自增主键 |
| user_id | BIGINT | | | 用户ID |
| image_url | VARCHAR(500) | | | 上传图片URL |
| recognized_snake_id | BIGINT | | | 识别出的蛇类ID |
| confidence | DECIMAL(5,2) | | | 置信度（0-100） |
| recognition_result | TEXT | | | 识别结果详情 |
| location | VARCHAR(200) | | | 识别地点 |
| latitude | DECIMAL(10,8) | | | 纬度 |
| longitude | DECIMAL(11,8) | | | 经度 |
| create_time | DATETIME | | √ | 创建时间 |

### 2.4 医院相关表

#### hospital_info（医院信息表）
| 字段名 | 类型 | 主键 | 非空 | 描述 |
|-------|------|------|------|------|
| id | BIGINT | √ | √ | 医院ID，自增主键 |
| hospital_name | VARCHAR(200) | | √ | 医院名称 |
| address | VARCHAR(500) | | √ | 医院地址 |
| phone | VARCHAR(50) | | | 联系电话 |
| level | VARCHAR(20) | | | 医院等级 |
| department_info | TEXT | | | 相关科室信息 |
| latitude | DECIMAL(10,8) | | | 纬度 |
| longitude | DECIMAL(11,8) | | | 经度 |
| status | TINYINT | | √ | 状态（0:关闭 1:营业） |
| create_time | DATETIME | | √ | 创建时间 |
| update_time | DATETIME | | √ | 更新时间 |

#### serum_info（血清库存表）
| 字段名 | 类型 | 主键 | 非空 | 描述 |
|-------|------|------|------|------|
| id | BIGINT | √ | √ | 血清ID，自增主键 |
| hospital_id | BIGINT | | √ | 医院ID（外键） |
| serum_name | VARCHAR(200) | | √ | 血清名称 |
| snake_type | VARCHAR(200) | | √ | 适用蛇类 |
| quantity | INT | | √ | 库存数量 |
| manufacturer | VARCHAR(200) | | | 生产厂家 |
| expiry_date | DATE | | | 过期日期 |
| status | TINYINT | | √ | 状态（0:缺货 1:有货） |
| create_time | DATETIME | | √ | 创建时间 |
| update_time | DATETIME | | √ | 更新时间 |

### 2.5 预警相关表

#### warning_info（预警信息表）
| 字段名 | 类型 | 主键 | 非空 | 描述 |
|-------|------|------|------|------|
| id | BIGINT | √ | √ | 预警ID，自增主键 |
| warning_title | VARCHAR(200) | | √ | 预警标题 |
| warning_content | TEXT | | √ | 预警内容 |
| warning_level | TINYINT | | √ | 预警等级（1-5） |
| warning_area | VARCHAR(500) | | | 预警区域 |
| latitude | DECIMAL(10,8) | | | 纬度范围起点 |
| longitude | DECIMAL(11,8) | | | 经度范围起点 |
| end_latitude | DECIMAL(10,8) | | | 纬度范围终点 |
| end_longitude | DECIMAL(11,8) | | | 经度范围终点 |
| start_time | DATETIME | | √ | 预警开始时间 |
| end_time | DATETIME | | √ | 预警结束时间 |
| publisher_id | BIGINT | | √ | 发布者ID |
| status | TINYINT | | √ | 状态（0:已取消 1:生效中 2:已过期） |
| create_time | DATETIME | | √ | 创建时间 |
| update_time | DATETIME | | √ | 更新时间 |

### 2.6 应急服务相关表

#### emergency_service（应急服务表）
| 字段名 | 类型 | 主键 | 非空 | 描述 |
|-------|------|------|------|------|
| id | BIGINT | √ | √ | 应急服务ID，自增主键 |
| user_id | BIGINT | | √ | 用户ID |
| location | VARCHAR(500) | | √ | 求助位置 |
| latitude | DECIMAL(10,8) | | | 纬度 |
| longitude | DECIMAL(11,8) | | | 经度 |
| emergency_desc | TEXT | | | 应急描述 |
| contact_info | VARCHAR(100) | | √ | 联系方式 |
| status | TINYINT | | √ | 状态（0:已取消 1:待处理 2:处理中 3:已完成） |
| handler_id | BIGINT | | | 处理者ID |
| handle_time | DATETIME | | | 处理时间 |
| create_time | DATETIME | | √ | 创建时间 |
| update_time | DATETIME | | √ | 更新时间 |

## 3. 索引设计

### 3.1 主要索引
- `idx_username` on user_info(username) - 用户名索引
- `idx_phone` on user_info(phone) - 手机号索引
- `idx_chinese_name` on snake_info(chinese_name) - 蛇类中文名索引
- `idx_recognition_time` on recognition_record(create_time) - 识别记录时间索引
- `idx_location` on hospital_info(latitude, longitude) - 医院地理位置索引
- `idx_serum_status` on serum_info(status) - 血清状态索引
- `idx_warning_time` on warning_info(start_time, end_time) - 预警时间范围索引

### 3.2 复合索引
- `idx_snake_toxin` on serum_info(snake_type, status) - 血清适用蛇类和状态复合索引
- `idx_emergency_status` on emergency_service(status, create_time) - 应急服务状态和时间复合索引

## 4. 数据库优化建议

### 4.1 查询优化
- 对经常用于WHERE子句的字段建立索引
- 对JOIN操作关联的字段建立索引
- 避免在WHERE子句中对字段进行函数操作
- 使用LIMIT限制结果集大小

### 4.2 表结构优化
- 定期清理历史数据，如超过一定时间的识别记录
- 对大文本字段考虑压缩存储
- 根据访问频率对表进行分区

### 4.3 读写分离
- 针对查询密集型操作考虑读写分离
- 对于报表统计类查询，可考虑建立专门的数据汇总表
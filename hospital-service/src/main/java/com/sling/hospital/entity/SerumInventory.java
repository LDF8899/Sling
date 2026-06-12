package com.sling.hospital.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDate;

/**
 * 血清库存实体
 */
@Data
@TableName("serum_inventory")
public class SerumInventory {

    @TableId(type = IdType.AUTO)
    private Long inventoryId;

    /**
     * 医院ID
     */
    private Long hospitalId;

    /**
     * 蛇类ID
     */
    private Long snakeId;

    /**
     * 血清库存数量
     */
    private Integer serumAmount;

    /**
     * 血清过期日期
     */
    private LocalDate serumExpiryDate;

    /**
     * 库存额外元数据 (JSON)
     */
    private String inventoryMetadata;
}

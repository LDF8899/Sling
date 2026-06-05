package com.sling.recognition.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("recognition_record")
public class RecognitionRecord {

    @TableId(value = "record_id", type = IdType.AUTO)
    private Long recordId;

    @TableField("user_id")
    private Long userId;

    @TableField("snake_id")
    private Long snakeId;

    @TableField("image_path")
    private String imagePath;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @TableField("recognition_time")
    private LocalDateTime recognitionTime;

    @TableField("recognition_result")
    private String recognitionResult;

    @TableField("recognition_metadata")
    private String recognitionMetadata;
}

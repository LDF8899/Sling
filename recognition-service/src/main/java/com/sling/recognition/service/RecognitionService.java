package com.sling.recognition.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sling.recognition.entity.RecognitionRecord;
import com.sling.recognition.entity.RecognitionVO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface RecognitionService extends IService<RecognitionRecord> {

    String identifySnake(MultipartFile image) throws Exception;

    RecognitionRecord saveRecord(Long userId, MultipartFile image, String aiResult);

    List<RecognitionRecord> getByUserId(Long userId);

    int getCountByUserId(Long userId);

    /**
     * 获取完整的识别结果（包含蛇类信息、急救信息、医院列表）
     */
    RecognitionVO getIdentifyResult(Long userId, MultipartFile image) throws Exception;
}

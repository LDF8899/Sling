package com.sling.snakeinfo.controller;

import com.sling.common.utils.Result;
import com.sling.snakeinfo.entity.SnakeInfo;
import com.sling.snakeinfo.service.SnakeInfoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 蛇类信息控制器 — 提供蛇类百科查询接口
 */
@Slf4j
@RestController
@RequestMapping("/snake")
@RequiredArgsConstructor
public class SnakeInfoController {

    private final SnakeInfoService snakeInfoService;

    /** 获取全部蛇类列表 */
    @GetMapping("/list")
    public Result<List<SnakeInfo>> list() {
        return Result.success(snakeInfoService.list());
    }

    /** 根据 ID 获取蛇类详情 */
    @GetMapping("/{id}")
    public Result<SnakeInfo> getById(@PathVariable Long id) {
        SnakeInfo info = snakeInfoService.getById(id);
        if (info == null) {
            return Result.fail(404, "蛇类信息不存在");
        }
        return Result.success(info);
    }

    /** 根据蛇名精确查询 */
    @GetMapping("/by-name/{name}")
    public Result<SnakeInfo> getByName(@PathVariable String name) {
        SnakeInfo info = snakeInfoService.getByName(name);
        if (info == null) {
            return Result.fail(404, "蛇类信息不存在");
        }
        return Result.success(info);
    }

    /** 按名称模糊搜索 */
    @GetMapping("/search")
    public Result<List<SnakeInfo>> search(@RequestParam String keyword) {
        return Result.success(snakeInfoService.searchByName(keyword));
    }

    /** 按毒性等级筛选 */
    @GetMapping("/toxicity/{level}")
    public Result<List<SnakeInfo>> getByToxicityLevel(@PathVariable Integer level) {
        return Result.success(snakeInfoService.getByToxicityLevel(level));
    }

    /** 按保护状态筛选 */
    @GetMapping("/conservation/{status}")
    public Result<List<SnakeInfo>> getByConservationStatus(@PathVariable String status) {
        return Result.success(snakeInfoService.getByConservationStatus(status));
    }
}

package com.sling.snakeinfo.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sling.common.utils.Result;
import com.sling.snakeinfo.entity.SnakeInfo;
import com.sling.snakeinfo.service.SnakeInfoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Map;

@RestController
@RequestMapping("/api/snake/admin")
public class SnakeAdminController {

    private static final Logger log = LoggerFactory.getLogger(SnakeAdminController.class);

    private final SnakeInfoService snakeInfoService;
    private final DataSource dataSource;

    public SnakeAdminController(SnakeInfoService snakeInfoService, DataSource dataSource) {
        this.snakeInfoService = snakeInfoService;
        this.dataSource = dataSource;
    }

    @GetMapping("/list")
    public Result getList(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "20") Integer size,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Integer toxicityLevel,
            @RequestParam(required = false) String family) {
        Page<SnakeInfo> pageInfo = new Page<>(page, size);
        QueryWrapper<SnakeInfo> wrapper = new QueryWrapper<>();
        if (keyword != null && !keyword.trim().isEmpty()) {
            wrapper.and(w -> w.like("snake_name", keyword)
                    .or().like("latin_name", keyword)
                    .or().like("family", keyword)
                    .or().like("genus", keyword));
        }
        if (toxicityLevel != null) {
            wrapper.eq("toxicity_level", toxicityLevel);
        }
        if (family != null && !family.trim().isEmpty()) {
            wrapper.eq("family", family);
        }
        wrapper.orderByAsc("snake_name");
        Page<SnakeInfo> result = snakeInfoService.page(pageInfo, wrapper);
        log.info("Snake list query: total={}, records={}, page={}, size={}",
                result.getTotal(), result.getRecords().size(), page, size);
        return Result.success(Map.of(
                "list", result.getRecords(),
                "total", result.getTotal(),
                "page", page, "size", size, "pages", result.getPages()));
    }

    @GetMapping("/count")
    public Result getCount() {
        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT COUNT(*) FROM snake_info")) {
            long rawTotal = rs.next() ? rs.getLong(1) : 0;
            long mpTotal = snakeInfoService.count();
            log.info("RAW SQL count={}, MP count()={}", rawTotal, mpTotal);
            return Result.success(Map.of("rawTotal", rawTotal, "mpTotal", mpTotal));
        } catch (Exception e) {
            return Result.fail("计数查询失败: " + e.getMessage());
        }
    }

    @GetMapping("/families")
    public Result getFamilies() {
        var families = snakeInfoService.list().stream()
                .map(SnakeInfo::getFamily).distinct().sorted().toList();
        return Result.success(families);
    }

    @GetMapping("/{id}")
    public Result getSnake(@PathVariable Long id) {
        SnakeInfo snake = snakeInfoService.getById(id);
        if (snake != null) return Result.success(snake);
        return Result.fail("蛇类不存在");
    }

    @PostMapping
    public Result createSnake(@RequestBody SnakeInfo snake) {
        snakeInfoService.save(snake);
        return Result.success("创建成功", snake);
    }

    @PutMapping("/{id}")
    public Result updateSnake(@PathVariable Long id, @RequestBody SnakeInfo snake) {
        SnakeInfo existing = snakeInfoService.getById(id);
        if (existing == null) return Result.fail("蛇类不存在");
        snake.setSnakeId(id);
        snakeInfoService.updateById(snake);
        return Result.success("更新成功");
    }

    @DeleteMapping("/{id}")
    public Result deleteSnake(@PathVariable Long id) {
        snakeInfoService.removeById(id);
        return Result.success("删除成功");
    }
}

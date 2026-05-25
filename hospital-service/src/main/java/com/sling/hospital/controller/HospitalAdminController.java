package com.sling.hospital.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sling.common.utils.Result;
import com.sling.hospital.entity.HospitalInfo;
import com.sling.hospital.mapper.HospitalInfoMapper;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.*;

@RestController
@RequestMapping("/api/hospital/admin")
public class HospitalAdminController {

    private final HospitalInfoMapper hospitalMapper;
    private final DataSource dataSource;

    public HospitalAdminController(HospitalInfoMapper hospitalMapper, DataSource dataSource) {
        this.hospitalMapper = hospitalMapper;
        this.dataSource = dataSource;
    }

    @GetMapping("/list")
    public Result getList(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "20") Integer size,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String hospitalType) {
        Page<HospitalInfo> pageInfo = new Page<>(page, size);
        QueryWrapper<HospitalInfo> wrapper = new QueryWrapper<>();
        wrapper.eq("del_flag", 0);
        if (keyword != null && !keyword.trim().isEmpty()) {
            wrapper.and(w -> w.like("hospital_name", keyword).or().like("address", keyword));
        }
        if (hospitalType != null && !hospitalType.trim().isEmpty()) {
            wrapper.eq("hospital_type", hospitalType);
        }
        wrapper.orderByAsc("hospital_name");
        Page<HospitalInfo> result = hospitalMapper.selectPage(pageInfo, wrapper);
        return Result.success(Map.of(
                "list", result.getRecords(), "total", result.getTotal(),
                "page", page, "size", size, "pages", result.getPages()));
    }

    @GetMapping("/{id}")
    public Result getHospital(@PathVariable Long id) {
        HospitalInfo h = hospitalMapper.selectById(id);
        return h != null ? Result.success(h) : Result.fail("医院不存在");
    }

    @PostMapping
    public Result create(@RequestBody HospitalInfo hospital) {
        hospitalMapper.insert(hospital);
        return Result.success("创建成功", hospital);
    }

    @PutMapping("/{id}")
    public Result update(@PathVariable Long id, @RequestBody HospitalInfo hospital) {
        HospitalInfo existing = hospitalMapper.selectById(id);
        if (existing == null) return Result.fail("医院不存在");
        hospital.setHospitalId(id);
        hospitalMapper.updateById(hospital);
        return Result.success("更新成功");
    }

    @DeleteMapping("/{id}")
    public Result delete(@PathVariable Long id) {
        HospitalInfo h = hospitalMapper.selectById(id);
        if (h == null) return Result.fail("医院不存在");
        h.setDelFlag(true);
        hospitalMapper.updateById(h);
        return Result.success("删除成功");
    }

    @GetMapping("/serum/list")
    public Result getSerumList(@RequestParam(defaultValue = "1") Integer page,
                                @RequestParam(defaultValue = "20") Integer size) {
        try (Connection conn = dataSource.getConnection()) {
            long total;
            try (Statement stmt = conn.createStatement();
                 ResultSet rs = stmt.executeQuery("SELECT COUNT(*) FROM serum_inventory")) {
                total = rs.next() ? rs.getLong(1) : 0;
            }
            List<Map<String, Object>> list = new ArrayList<>();
            String sql = "SELECT si.*, hi.hospital_name, sn.snake_name FROM serum_inventory si " +
                    "LEFT JOIN hospital_info hi ON si.hospital_id = hi.hospital_id " +
                    "LEFT JOIN snake_info sn ON si.snake_id = sn.snake_id " +
                    "LIMIT " + ((page - 1) * size) + "," + size;
            try (Statement stmt = conn.createStatement(); ResultSet rs = stmt.executeQuery(sql)) {
                var meta = rs.getMetaData();
                while (rs.next()) {
                    Map<String, Object> row = new LinkedHashMap<>();
                    for (int i = 1; i <= meta.getColumnCount(); i++)
                        row.put(meta.getColumnName(i), rs.getObject(i));
                    list.add(row);
                }
            }
            return Result.success(Map.of("list", list, "total", total, "page", page, "size", size));
        } catch (Exception e) {
            return Result.fail("查询失败: " + e.getMessage());
        }
    }

    @PutMapping("/serum/{inventoryId}")
    public Result updateSerum(@PathVariable Long inventoryId, @RequestBody Map<String, Object> body) {
        try (Connection conn = dataSource.getConnection()) {
            StringBuilder set = new StringBuilder();
            for (Map.Entry<String, Object> e : body.entrySet()) {
                if (set.length() > 0) set.append(",");
                set.append(e.getKey()).append("='").append(e.getValue().toString().replace("'", "''")).append("'");
            }
            String sql = "UPDATE serum_inventory SET " + set + " WHERE inventory_id = " + inventoryId;
            try (Statement stmt = conn.createStatement()) {
                int rows = stmt.executeUpdate(sql);
                return rows > 0 ? Result.success("更新成功") : Result.fail("数据不存在");
            }
        } catch (Exception e) {
            return Result.fail("更新失败: " + e.getMessage());
        }
    }
}

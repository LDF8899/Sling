package com.sling.admin.controller;

import com.sling.admin.entity.AdminUser;
import com.sling.admin.entity.AdminRole;
import com.sling.admin.entity.AdminUserRole;
import com.sling.admin.service.AdminUserService;
import com.sling.admin.service.AdminRoleService;
import com.sling.admin.service.AdminUserRoleService;
import com.sling.common.utils.Result;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminUserController {

    private final AdminUserService adminUserService;
    private final AdminRoleService adminRoleService;
    private final AdminUserRoleService adminUserRoleService;
    private final PasswordEncoder passwordEncoder;

    public AdminUserController(AdminUserService adminUserService,
                               AdminRoleService adminRoleService,
                               AdminUserRoleService adminUserRoleService,
                               PasswordEncoder passwordEncoder) {
        this.adminUserService = adminUserService;
        this.adminRoleService = adminRoleService;
        this.adminUserRoleService = adminUserRoleService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/users")
    public Result getAdminUsers(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "20") Integer size,
            @RequestParam(required = false) String keyword) {
        Map<String, Object> result = adminUserService.listAdmins(page, size, keyword);
        @SuppressWarnings("unchecked")
        List<AdminUser> users = (List<AdminUser>) result.get("list");
        for (AdminUser user : users) {
            List<Map<String, Object>> roles = adminUserRoleService.getUserRoleDetails(user.getAdminId());
            user.setPassword(null);
            user.setRoles(roles.stream().map(r -> {
                java.util.HashMap<String, Object> mapped = new java.util.HashMap<>();
                mapped.put("id", r.get("role_id"));
                mapped.put("roleName", r.get("role_name"));
                mapped.put("name", r.get("role_name"));
                return mapped;
            }).collect(java.util.stream.Collectors.toList()));
        }
        result.put("list", users);
        return Result.success(result);
    }

    @GetMapping("/users/{id}")
    public Result getAdminUser(@PathVariable Long id) {
        AdminUser user = adminUserService.getById(id);
        if (user != null) {
            user.setPassword(null);
            List<AdminUserRole> userRoles = adminUserRoleService.getUserRoles(id);
            List<AdminRole> allRoles = adminRoleService.getAllActiveRoles();
            Map<String, Object> data = new HashMap<>();
            data.put("user", user);
            data.put("roles", userRoles);
            data.put("allRoles", allRoles);
            return Result.success(data);
        }
        return Result.fail("管理员不存在");
    }

    @PostMapping("/users")
    public Result createAdminUser(@RequestBody Map<String, Object> body) {
        String username = (String) body.get("username");
        String password = (String) body.get("password");
        if (username == null || password == null) {
            return Result.fail("用户名和密码不能为空");
        }
        if (adminUserService.findByUsername(username) != null) {
            return Result.fail("用户名已存在");
        }
        AdminUser user = new AdminUser();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setEmail((String) body.get("email"));
        user.setPhone((String) body.get("phone"));
        user.setRealName((String) body.get("realName"));
        user.setDepartment((String) body.get("department"));
        user.setPosition((String) body.get("position"));
        user.setStatus(1);
        adminUserService.save(user);

        @SuppressWarnings("unchecked")
        List<Integer> roleIds = (List<Integer>) body.get("roleIds");
        if (roleIds != null) {
            for (Integer roleId : roleIds) {
                adminUserRoleService.assignRoleToUser(user.getAdminId(), roleId.longValue());
            }
        }
        return Result.success("创建成功");
    }

    @PutMapping("/users/{id}")
    public Result updateAdminUser(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        AdminUser user = adminUserService.getById(id);
        if (user == null) {
            return Result.fail("管理员不存在");
        }
        if (body.containsKey("email")) user.setEmail((String) body.get("email"));
        if (body.containsKey("phone")) user.setPhone((String) body.get("phone"));
        if (body.containsKey("realName")) user.setRealName((String) body.get("realName"));
        if (body.containsKey("department")) user.setDepartment((String) body.get("department"));
        if (body.containsKey("position")) user.setPosition((String) body.get("position"));
        if (body.containsKey("status")) user.setStatus((Integer) body.get("status"));

        adminUserService.updateById(user);

        @SuppressWarnings("unchecked")
        List<Integer> roleIds = (List<Integer>) body.get("roleIds");
        if (roleIds != null) {
            adminUserRoleService.removeAllRolesForUser(id);
            for (Integer roleId : roleIds) {
                adminUserRoleService.assignRoleToUser(id, roleId.longValue());
            }
        }
        return Result.success("更新成功");
    }

    @DeleteMapping("/users/{id}")
    public Result deleteAdminUser(@PathVariable Long id) {
        AdminUser user = adminUserService.getById(id);
        if (user == null) {
            return Result.fail("管理员不存在");
        }
        user.setDelFlag(1);
        adminUserService.updateById(user);
        return Result.success("删除成功");
    }

    @PutMapping("/users/{id}/password")
    public Result changePassword(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String newPassword = body.get("newPassword");
        if (newPassword == null || newPassword.length() < 6) {
            return Result.fail("密码不能少于6位");
        }
        adminUserService.changePassword(id, passwordEncoder.encode(newPassword));
        return Result.success("密码修改成功");
    }

    @GetMapping("/roles")
    public Result getAdminRoles() {
        return Result.success(adminRoleService.getAllActiveRoles());
    }

    @PutMapping("/users/{id}/status")
    public Result toggleStatus(@PathVariable Long id, @RequestBody Map<String, Integer> body) {
        Integer status = body.get("status");
        if (status == null || (status != 0 && status != 1)) {
            return Result.fail("状态值无效");
        }
        adminUserService.toggleStatus(id, status);
        return Result.success("状态更新成功");
    }
}

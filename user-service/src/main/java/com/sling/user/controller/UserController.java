package com.sling.user.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.sling.common.security.JwtUtil;
import com.sling.common.utils.Result;
import com.sling.user.entity.User;
import com.sling.user.entity.UserPermission;
import com.sling.user.entity.Role;
import com.sling.user.entity.UserRole;
import com.sling.user.service.UserService;
import com.sling.user.service.UserPermissionService;
import com.sling.user.service.UserRoleService;
import com.sling.user.service.RoleService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;

import javax.servlet.http.HttpServletRequest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * User controller handling registration, login, profile management,
 * and user administration endpoints.
 */
@Slf4j
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
    private final UserPermissionService userPermissionService;
    private final UserRoleService userRoleService;
    private final RoleService roleService;
    private final JwtUtil jwtUtil;

    @Value("${app.gateway.url:http://localhost:8888}")
    private String gatewayUrl;

    public UserController(UserService userService,
                          UserPermissionService userPermissionService,
                          UserRoleService userRoleService,
                          RoleService roleService,
                          JwtUtil jwtUtil) {
        this.userService = userService;
        this.userPermissionService = userPermissionService;
        this.userRoleService = userRoleService;
        this.roleService = roleService;
        this.jwtUtil = jwtUtil;
    }

    /**
     * Register a new user account.
     * Passwords are stored in plaintext for development convenience.
     *
     * @param user the user to register
     * @return result with the created user data
     */
    @PostMapping("/register")
    public Result<Map<String, Object>> register(@RequestBody User user) {
        log.info("Received registration request for username: {}", user.getUsername());

        // Check if username already exists
        User existingUser = userService.getOne(new QueryWrapper<User>()
                .eq("username", user.getUsername()));

        if (existingUser != null) {
            log.warn("Registration failed: username already exists: {}", user.getUsername());
            return Result.fail("用户名已存在");
        }

        // Password stored as plaintext (no encoding)
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            user.setPassword("defaultPassword");
        }

        // Assign default USER role to new users
        boolean saved = userService.save(user);
        if (saved) {
            log.info("User registered successfully: {}", user.getUsername());
            Map<String, Object> result = new HashMap<>();
            result.put("user", user);
            return Result.success("注册成功", result);
        } else {
            log.error("Failed to register user: {}", user.getUsername());
            return Result.fail("注册失败");
        }
    }

    /**
     * Authenticate a user with username and password.
     * Optionally validates the user has the requested role.
     *
     * @param loginData map with username, password, and optional role
     * @return result with user info, permissions, and roles
     */
    @PostMapping("/login")
    public Result<Map<String, Object>> login(@RequestBody Map<String, Object> loginData) {
        String username = (String) loginData.get("username");
        String password = (String) loginData.get("password");
        String selectedRole = (String) loginData.get("role");

        log.info("Received login request for username: {}, role: {}", username, selectedRole);

        // Find user by username
        User dbUser = userService.getOne(new QueryWrapper<User>()
                .eq("username", username));

        if (dbUser != null && password != null
                && password.equals(dbUser.getPassword())) {

            // Get user roles
            List<Role> roles = userRoleService.getRolesByUserId(dbUser.getId());

            // If a specific role was selected, validate the user has it
            if (selectedRole != null && !selectedRole.isEmpty()) {
                boolean hasRole = roles.stream()
                        .anyMatch(r -> r.getRoleName().equalsIgnoreCase(selectedRole));
                if (!hasRole) {
                    log.warn("Login failed: user {} does not have role {}", username, selectedRole);
                    return Result.fail("您没有" + getRoleLabel(selectedRole) + "权限");
                }
            }

            log.info("User logged in successfully: {}", username);
            List<UserPermission> permissions = userPermissionService.getPermissionsByUserId(dbUser.getId());

            // Update last login time
            dbUser.setLastLoginTime(new java.util.Date());
            userService.updateById(dbUser);

            Map<String, Object> result = new HashMap<>();
            result.put("user", dbUser);
            result.put("permissions", permissions);
            result.put("roles", roles);
            return Result.success("登录成功", result);
        } else {
            log.warn("Login failed for username: {}", username);
            return Result.fail("用户名或密码错误");
        }
    }

    private String getRoleLabel(String roleName) {
        switch (roleName.toUpperCase()) {
            case "ADMIN": return "管理员";
            case "RESCUER": return "救助人员";
            case "USER": return "普通用户";
            default: return roleName;
        }
    }

    /**
     * WeChat mini-program login endpoint.
     * Accepts a WeChat code, exchanges it for an openid, and auto-registers/binds the user.
     *
     * @param params request body containing code, encryptedData, and iv
     * @return result with user data
     */
    @PostMapping("/wechat-login")
    public Result<Map<String, Object>> wechatLogin(@RequestBody Map<String, String> params) {
        String code = params.get("code");
        String encryptedData = params.get("encryptedData");
        String iv = params.get("iv");

        log.info("Received WeChat login request, code: {}", code);

        if (code == null || code.isEmpty()) {
            log.warn("微信登录失败：缺少 code 参数");
            return Result.fail("缺少 code 参数");
        }

        try {
            // Step 1: Exchange code for openid
            // TODO: Call WeChat API with appid and secret
            // https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code

            // Temporarily simulate an openid
            String openid = "mock_wechat_openid_" + code;
            String unionid = null;

            log.info("获取到微信 openid: {}, unionid: {}", openid, unionid);

            // Step 2: Check if this openid is already bound to a user
            User existingUser = userService.getOne(new QueryWrapper<User>().eq("wechat_openid", openid));

            if (existingUser != null) {
                // Case 1: Returning user
                log.info("微信老用户登录成功，user_id: {}", existingUser.getId());

                existingUser.setLastLoginTime(new java.util.Date());
                userService.updateById(existingUser);

                List<UserPermission> permissions = userPermissionService.getPermissionsByUserId(existingUser.getId());
                List<Role> roles = userRoleService.getRolesByUserId(existingUser.getId());

                Map<String, Object> result = new HashMap<>();
                result.put("user", existingUser);
                result.put("permissions", permissions);
                result.put("roles", roles);

                return Result.success("微信登录成功", result);

            } else {
                // Case 2: New user, auto-register
                log.info("微信新用户，准备自动注册，openid: {}", openid);

                User newUser = new User();
                newUser.setUsername("wx_" + System.currentTimeMillis());
                newUser.setPassword("");
                newUser.setWechatOpenid(openid);
                newUser.setWechatUnionid(unionid);
                newUser.setCreateTime(new java.util.Date());

                // If encryptedData is available, decrypt to get nickname and avatar
                if (encryptedData != null && !encryptedData.isEmpty()) {
                    // TODO: Decrypt WeChat data
                }

                boolean saved = userService.save(newUser);
                if (saved) {
                    log.info("微信用户自动注册成功，user_id: {}", newUser.getId());

                    // Assign default USER role
                    Role defaultRole = roleService.getOne(new QueryWrapper<Role>().eq("role_name", "USER"));
                    if (defaultRole != null) {
                        UserRole userRole = new UserRole();
                        userRole.setUserId(newUser.getId());
                        userRole.setRoleId(defaultRole.getId());
                        userRoleService.save(userRole);
                        log.info("为用户分配默认角色：USER");
                    }

                    List<UserPermission> permissions = userPermissionService.getPermissionsByUserId(newUser.getId());
                    List<Role> roles = userRoleService.getRolesByUserId(newUser.getId());

                    Map<String, Object> result = new HashMap<>();
                    result.put("user", newUser);
                    result.put("permissions", permissions);
                    result.put("roles", roles);

                    return Result.success("微信登录成功", result);

                } else {
                    log.error("微信用户自动注册失败，openid: {}", openid);
                    return Result.fail("注册失败");
                }
            }

        } catch (Exception e) {
            log.error("微信登录失败：{}", e.getMessage(), e);
            return Result.fail("微信登录失败：" + e.getMessage());
        }
    }

    /**
     * Get user info by user ID.
     *
     * @param id the user ID
     * @return user data
     */
    @GetMapping("/info/{id}")
    public Result<User> getUserInfo(@PathVariable Long id) {
        log.info("Fetching user info for ID: {}", id);
        User user = userService.getById(id);
        if (user != null) {
            log.info("User info fetched successfully for ID: {}", id);
            return Result.success(user);
        } else {
            log.warn("User not found for ID: {}", id);
            return Result.fail("用户不存在");
        }
    }

    /**
     * Get permissions for a specific user.
     *
     * @param userId the user ID
     * @return list of permissions
     */
    @GetMapping("/permissions/{userId}")
    public Result<List<UserPermission>> getUserPermissions(@PathVariable Long userId) {
        log.info("Fetching permissions for user ID: {}", userId);
        List<UserPermission> permissions = userPermissionService.getPermissionsByUserId(userId);
        log.info("Permissions fetched successfully for user ID: {}", userId);
        return Result.success(permissions);
    }

    /**
     * Get roles for a specific user.
     *
     * @param userId the user ID
     * @return list of roles
     */
    @GetMapping("/roles/{userId}")
    public Result<List<Role>> getUserRoles(@PathVariable Long userId) {
        log.info("Fetching roles for user ID: {}", userId);
        List<Role> roles = userRoleService.getRolesByUserId(userId);
        log.info("Roles fetched successfully for user ID: {}", userId);
        return Result.success(roles);
    }

    /**
     * Update user profile information.
     * Only non-sensitive fields are updateable via this endpoint.
     *
     * @param user the user data to update
     * @return result message
     */
    @PutMapping("/update")
    public Result<String> updateUser(@RequestBody User user) {
        log.info("Updating user info for ID: {}", user.getId());

        User existingUser = userService.getById(user.getId());
        if (existingUser == null) {
            log.warn("Attempt to update non-existing user with ID: {}", user.getId());
            return Result.fail("用户不存在");
        }

        // Only update allowed fields
        existingUser.setUsername(user.getUsername());
        existingUser.setEmail(user.getEmail());
        existingUser.setPhone(user.getPhone());
        existingUser.setAvatarUrl(user.getAvatarUrl());
        existingUser.setUpdateTime(new java.util.Date());

        boolean updated = userService.updateById(existingUser);
        if (updated) {
            log.info("User info updated successfully for ID: {}", user.getId());
            return Result.success("用户信息更新成功");
        } else {
            log.error("Failed to update user info for ID: {}", user.getId());
            return Result.fail("用户信息更新失败");
        }
    }

    /**
     * Change user password.
     * Uses plaintext password comparison and storage.
     *
     * @param passwordData map containing userId, oldPassword, and newPassword
     * @return result message
     */
    @PutMapping("/change-password")
    public Result<String> changePassword(@RequestBody Map<String, String> passwordData) {
        log.info("Changing password for user");

        String userIdStr = passwordData.get("userId");
        String oldPassword = passwordData.get("oldPassword");
        String newPassword = passwordData.get("newPassword");

        if (userIdStr == null || oldPassword == null || newPassword == null) {
            return Result.fail("参数不完整");
        }

        Long userId = Long.valueOf(userIdStr);
        User existingUser = userService.getById(userId);

        if (existingUser == null) {
            log.warn("Attempt to change password for non-existing user with ID: {}", userId);
            return Result.fail("用户不存在");
        }

        // Verify old password (plaintext comparison)
        if (!oldPassword.equals(existingUser.getPassword())) {
            log.warn("Incorrect old password for user ID: {}", userId);
            return Result.fail("原密码错误");
        }

        // Store new password as plaintext
        existingUser.setPassword(newPassword);
        boolean updated = userService.updateById(existingUser);

        if (updated) {
            log.info("Password changed successfully for user ID: {}", userId);
            return Result.success("密码修改成功");
        } else {
            log.error("Failed to change password for user ID: {}", userId);
            return Result.fail("密码修改失败");
        }
    }

    /**
     * Upload user avatar image.
     * Saves the file to the local filesystem and updates the user's avatar URL.
     *
     * @param avatar  the multipart image file
     * @param userId  the user ID
     * @param request the HTTP request
     * @return result with avatar URL
     */
    @PostMapping(value = "/upload-avatar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Result<Map<String, Object>> uploadAvatar(@RequestParam(value = "avatar", required = true) MultipartFile avatar,
                                                     @RequestParam(value = "userId", required = true) Long userId,
                                                     HttpServletRequest request) {
        log.info("Request URL: {}", request.getRequestURL());
        log.info("Server Name: {}", request.getServerName());
        log.info("Server Port: {}", request.getServerPort());
        log.info("开始上传头像，用户ID: {}", userId);

        if (avatar.isEmpty()) {
            log.warn("上传失败：未选择文件");
            return Result.fail("请选择文件");
        }

        try {
            User user = userService.getById(userId);
            if (user == null) {
                log.warn("上传失败：用户不存在，用户ID: {}", userId);
                return Result.fail("用户不存在");
            }

            // Validate file type
            String contentType = avatar.getContentType();
            if (contentType == null || !contentType.toLowerCase().startsWith("image/")) {
                log.warn("上传失败：不支持的文件类型 {}", contentType);
                return Result.fail("只支持图片格式的文件");
            }

            // Check file size (limit 20MB)
            long maxSize = 20 * 1024 * 1024; // 20MB
            if (avatar.getSize() > maxSize) {
                log.warn("上传失败：文件大小超过限制，当前大小: {} bytes, 限制: {} bytes", avatar.getSize(), maxSize);
                return Result.fail("文件大小不能超过20MB");
            }

            // Generate unique filename
            String originalFilename = avatar.getOriginalFilename();
            String extension = ".jpg";
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf('.'));
            }
            String newFilename = "avatar_" + userId + "_" + System.currentTimeMillis() + extension;

            // Define upload directory under the project root
            String baseDir = System.getProperty("user.dir");
            String uploadDir = baseDir + "/uploads/avatar/";
            log.info("上传目录路径: {}", uploadDir);
            java.io.File uploadPath = new java.io.File(uploadDir);
            if (!uploadPath.exists()) {
                boolean created = uploadPath.mkdirs();
                if (!created) {
                    log.error("创建上传目录失败: {}", uploadDir);
                    return Result.fail("创建上传目录失败");
                } else {
                    log.info("成功创建上传目录: {}", uploadDir);
                }
            }

            // Check if upload directory is writable
            if (!uploadPath.canWrite()) {
                log.error("上传目录不可写: {}", uploadDir);
                return Result.fail("上传目录不可写");
            }

            // Save file
            java.io.File file = new java.io.File(uploadPath, newFilename);
            log.info("保存文件路径: {}", file.getAbsolutePath());
            avatar.transferTo(file);
            log.info("文件保存成功，文件大小: {} bytes", file.length());
            log.info("文件是否存在: {}", file.exists());

            // Verify file was saved
            if (!file.exists()) {
                log.error("文件保存后不存在: {}", file.getAbsolutePath());
                return Result.fail("文件保存后不存在");
            }

            // Build avatar URL using configurable gateway URL
            String avatarUrl = "/uploads/avatar/" + newFilename;
            String fullAvatarUrl = gatewayUrl + avatarUrl;

            log.info("头像访问URL: {}", fullAvatarUrl);

            // Update database with relative path
            user.setAvatarUrl(avatarUrl);
            boolean updated = userService.updateById(user);

            if (!updated) {
                log.error("更新用户头像URL失败: 用户ID {}", userId);
                // Clean up saved file
                if (file.exists()) {
                    file.delete();
                }
                return Result.fail("更新用户信息失败");
            }

            log.info("头像上传成功，用户ID: {}, 头像URL: {}", userId, avatarUrl);

            // Build response matching frontend expectations
            Map<String, Object> responseData = new HashMap<>();
            responseData.put("avatarUrl", avatarUrl);
            responseData.put("fullAvatarUrl", fullAvatarUrl);
            responseData.put("userId", userId);
            responseData.put("message", "头像上传成功");
            return Result.success("头像上传成功", responseData);
        } catch (Exception e) {
            log.error("上传头像失败: {}", e.getMessage(), e);
            return Result.fail("上传失败: " + e.getMessage());
        }
    }

    /**
     * Get paginated user list with optional filters.
     *
     * @param page     page number (0-based)
     * @param size     page size
     * @param username optional username filter
     * @param email    optional email filter
     * @param phone    optional phone filter
     * @param role     optional role filter
     * @return paginated user list
     */
    @GetMapping("/list")
    public Result<Map<String, Object>> getUserList(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size,
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String phone,
            @RequestParam(required = false) String role) {

        log.info("获取用户列表，页码: {}，大小: {}，筛选条件 - 用户名: {}，邮箱: {}，手机: {}，角色: {}",
                page, size, username, email, phone, role);

        QueryWrapper<User> queryWrapper = new QueryWrapper<>();

        if (username != null && !username.isEmpty()) {
            queryWrapper.like("username", username);
        }
        if (email != null && !email.isEmpty()) {
            queryWrapper.like("email", email);
        }
        if (phone != null && !phone.isEmpty()) {
            queryWrapper.eq("phone", phone);
        }

        int offset = page * size;

        int total = (int) userService.count(queryWrapper);

        // Stats
        long activeCount = userService.count(new QueryWrapper<User>().eq("status", 1));
        long newToday = userService.count(new QueryWrapper<User>()
                .ge("create_time", new java.sql.Date(System.currentTimeMillis()).toString()));

        queryWrapper.last("LIMIT " + offset + "," + size);
        List<User> users = userService.list(queryWrapper);

        Map<String, Object> result = new HashMap<>();
        result.put("list", users);
        result.put("total", total);
        result.put("page", page);
        result.put("size", size);
        result.put("activeCount", activeCount);
        result.put("newToday", newToday);

        return Result.success(result);
    }

    /**
     * Create a new user (admin function).
     * Password stored as plaintext.
     *
     * @param user the user to create
     * @return result message
     */
    @PostMapping("/create")
    @Transactional
    public Result<String> createUser(@RequestBody User user) {
        log.info("创建用户: {}", user.getUsername());

        // Check if username already exists
        User existingUser = userService.getOne(new QueryWrapper<User>().eq("username", user.getUsername()));
        if (existingUser != null) {
            log.warn("创建用户失败：用户名已存在: {}", user.getUsername());
            return Result.fail("用户名已存在");
        }

        // If password is empty, set a default password
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            user.setPassword("defaultPassword");
        }

        // Set creation time
        user.setCreateTime(new java.util.Date());

        boolean saved = userService.save(user);
        if (saved) {
            log.info("用户创建成功: {}", user.getUsername());
            return Result.success("用户创建成功");
        } else {
            log.error("用户创建失败: {}", user.getUsername());
            return Result.fail("用户创建失败");
        }
    }

    /**
     * Delete a user by ID.
     */
    @DeleteMapping("/delete/{id}")
    @Transactional
    public Result<String> deleteUser(@PathVariable Long id) {
        User existingUser = userService.getById(id);
        if (existingUser == null) {
            return Result.fail("用户不存在");
        }
        userService.removeById(id);
        return Result.success("用户删除成功");
    }

    /**
     * Batch delete users by user IDs.
     */
    @PostMapping("/batch-delete")
    @Transactional
    public Result<String> batchDeleteUsers(@RequestBody Map<String, Object> request) {
        @SuppressWarnings("unchecked")
        List<Integer> userIdsRaw = (List<Integer>) request.get("userIds");
        if (userIdsRaw == null || userIdsRaw.isEmpty()) {
            return Result.fail("用户ID列表不能为空");
        }
        List<Long> userIds = userIdsRaw.stream().map(Long::valueOf).collect(java.util.stream.Collectors.toList());
        userService.removeByIds(userIds);
        return Result.success("批量删除成功，共删除 " + userIds.size() + " 个用户");
    }

    /**
     * Get all available roles.
     *
     * @return list of all roles
     */
    @GetMapping("/roles")
    public Result<List<Role>> getAllRoles() {
        log.info("获取所有角色");

        List<Role> roles = roleService.list();
        log.info("返回角色列表，总数: {}", roles.size());
        return Result.success(roles);
    }

    /**
     * Assign roles to a user. Existing roles for the user are cleared first.
     *
     * @param request map containing userId and list of role names
     * @return result message
     */
    @PostMapping("/assign-roles")
    @Transactional
    public Result<String> assignUserRoles(@RequestBody Map<String, Object> request) {
        log.info("分配用户角色: {}", request);

        try {
            Long userId = Long.valueOf(request.get("userId").toString());
            @SuppressWarnings("unchecked")
            List<String> roleNames = (List<String>) request.get("roles");

            // Verify user exists
            User user = userService.getById(userId);
            if (user == null) {
                log.warn("分配角色失败：用户不存在，ID: {}", userId);
                return Result.fail("用户不存在");
            }

            // Remove existing roles
            QueryWrapper<UserRole> userRoleQuery = new QueryWrapper<>();
            userRoleQuery.eq("user_id", userId);
            userRoleService.remove(userRoleQuery);

            // Assign new roles
            if (roleNames != null && !roleNames.isEmpty()) {
                for (String roleName : roleNames) {
                    QueryWrapper<Role> roleQuery = new QueryWrapper<>();
                    roleQuery.eq("role_name", roleName);
                    Role role = roleService.getOne(roleQuery);

                    if (role != null) {
                        UserRole userRole = new UserRole();
                        userRole.setUserId(userId);
                        userRole.setRoleId(role.getId());
                        userRole.setCreateTime(new java.util.Date());
                        userRoleService.save(userRole);
                    } else {
                        log.warn("角色不存在: {}", roleName);
                    }
                }
            } else {
                userRoleService.remove(new QueryWrapper<UserRole>().eq("user_id", userId));
            }

            log.info("用户角色分配成功，用户ID: {}, 分配角色数: {}", userId, roleNames != null ? roleNames.size() : 0);
            return Result.success("用户角色分配成功");
        } catch (Exception e) {
            log.error("分配用户角色失败: {}", e.getMessage(), e);
            return Result.fail("分配用户角色失败: " + e.getMessage());
        }
    }

    /**
     * Admin login endpoint.
     * Authenticates an admin user with plaintext password and returns their permissions, roles, and a token.
     *
     * @param user login credentials
     * @return result with user info and token
     */
    @PostMapping("/admin/login")
    public Result<Map<String, Object>> adminLogin(@RequestBody User user) {
        log.info("Received admin login request for username: {}", user.getUsername());

        // Find user by username
        User dbUser = userService.getOne(new QueryWrapper<User>()
                .eq("username", user.getUsername()));

        if (dbUser == null) {
            log.warn("Admin login failed: user not found: {}", user.getUsername());
            return Result.fail("用户名或密码错误");
        }

        // Verify password (plaintext comparison)
        if (user.getPassword() == null
                || !user.getPassword().equals(dbUser.getPassword())) {
            log.warn("Admin login failed: incorrect password for username: {}", user.getUsername());
            return Result.fail("用户名或密码错误");
        }

        // Check if user has admin role
        List<Role> userRoles = userRoleService.getRolesByUserId(dbUser.getId());
        boolean isAdmin = userRoles.stream()
                .anyMatch(role -> "ADMIN".equals(role.getRoleName()) ||
                           "SUPER_ADMIN".equals(role.getRoleName()) ||
                           "CONTENT_ADMIN".equals(role.getRoleName()) ||
                           "USER_ADMIN".equals(role.getRoleName()) ||
                           "SYSTEM_ADMIN".equals(role.getRoleName()));

        if (!isAdmin) {
            log.warn("Admin login failed: user does not have admin privileges: {}", user.getUsername());
            return Result.fail("用户没有管理员权限");
        }

        log.info("Admin user logged in successfully: {}", user.getUsername());

        // Get user permissions
        List<UserPermission> permissions = userPermissionService.getPermissionsByUserId(dbUser.getId());

        // Update last login time
        dbUser.setLastLoginTime(new java.util.Date());
        userService.updateById(dbUser);

        // Return user info, permissions, roles, and real JWT token
        Map<String, Object> result = new HashMap<>();
        result.put("user", dbUser);
        result.put("permissions", permissions);
        result.put("roles", userRoles);
        result.put("token", jwtUtil.generateToken(dbUser.getUsername()));

        return Result.success("管理员登录成功", result);
    }
}

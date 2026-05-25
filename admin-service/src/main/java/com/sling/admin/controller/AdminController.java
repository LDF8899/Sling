package com.sling.admin.controller;

import com.sling.admin.entity.AdminUser;
import com.sling.admin.service.AdminUserService;
import com.sling.common.security.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminUserService adminUserService;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public AdminController(AdminUserService adminUserService,
                           JwtUtil jwtUtil,
                           PasswordEncoder passwordEncoder) {
        this.adminUserService = adminUserService;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/profile/{username}")
    public ResponseEntity<AdminUser> getAdminProfile(@PathVariable String username) {
        AdminUser user = adminUserService.findByUsername(username);
        if (user != null) {
            user.setPassword(null);
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> adminLogin(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        AdminUser user = adminUserService.findByUsername(loginRequest.getUsername());
        if (user == null || user.getStatus() == null || user.getStatus() != 1) {
            return ResponseEntity.badRequest().body(new LoginResponse(false, "用户名或密码错误", null, null));
        }

        String stored = user.getPassword();
        boolean matched;
        if (stored != null && stored.startsWith("$2")) {
            matched = passwordEncoder.matches(loginRequest.getPassword(), stored);
        } else {
            matched = loginRequest.getPassword() != null && loginRequest.getPassword().equals(stored);
            if (matched) {
                adminUserService.changePassword(user.getAdminId(), passwordEncoder.encode(loginRequest.getPassword()));
            }
        }

        if (matched) {
            adminUserService.updateLastLoginInfo(user.getAdminId(), getClientIp(request));
            String token = jwtUtil.generateToken(user.getUsername());
            user.setPassword(null);
            return ResponseEntity.ok(new LoginResponse(true, "登录成功", token, user));
        }
        return ResponseEntity.badRequest().body(new LoginResponse(false, "用户名或密码错误", null, null));
    }

    private String getClientIp(HttpServletRequest request) {
        String xfor = request.getHeader("X-Forwarded-For");
        if (xfor != null && !xfor.isEmpty() && !"unknown".equalsIgnoreCase(xfor)) {
            int idx = xfor.indexOf(",");
            return idx > 0 ? xfor.substring(0, idx).trim() : xfor;
        }
        String xip = request.getHeader("X-Real-IP");
        if (xip != null && !xip.isEmpty() && !"unknown".equalsIgnoreCase(xip)) {
            return xip;
        }
        return request.getRemoteAddr();
    }

    public static class LoginRequest {
        private String username;
        private String password;
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class LoginResponse {
        private boolean success;
        private String message;
        private String token;
        private AdminUser user;
        public LoginResponse(boolean success, String message, String token, AdminUser user) {
            this.success = success; this.message = message; this.token = token; this.user = user;
        }
        public boolean isSuccess() { return success; }
        public void setSuccess(boolean success) { this.success = success; }
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
        public String getToken() { return token; }
        public void setToken(String token) { this.token = token; }
        public AdminUser getUser() { return user; }
        public void setUser(AdminUser user) { this.user = user; }
    }
}

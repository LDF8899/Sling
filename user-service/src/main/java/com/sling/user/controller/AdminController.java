package com.sling.user.controller;

import com.sling.user.entity.AdminUser;
import com.sling.user.service.AdminUserService;
import com.sling.common.security.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Admin controller for user-service admin features.
 * Handles admin profile retrieval and admin login.
 *
 * NOTE: The AdminUser, AdminRole, AdminUserRole, and AdminOperationLog entities and their
 * services/mappers exist in BOTH user-service and admin-service. In user-service, they support
 * admin features within the user-service context (e.g., admin login). The authoritative admin
 * management is in admin-service.
 */
@Slf4j
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminUserService adminUserService;

    private final JwtUtil jwtUtil;

    public AdminController(AdminUserService adminUserService,
                           JwtUtil jwtUtil) {
        this.adminUserService = adminUserService;
        this.jwtUtil = jwtUtil;
    }

    /**
     * Get admin profile by username.
     *
     * @param username the admin username
     * @return admin user entity or 404
     */
    @GetMapping("/profile/{username}")
    public ResponseEntity<AdminUser> getAdminProfile(@PathVariable String username) {
        AdminUser user = adminUserService.findByUsername(username);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Admin login endpoint.
     * Authenticates an admin user with plaintext password verification and returns a JWT token.
     *
     * @param loginRequest login credentials
     * @return login response with token
     */
    @PostMapping("/login")
    public ResponseEntity<?> adminLogin(@RequestBody LoginRequest loginRequest) {
        log.info("Admin login attempt for username: {}", loginRequest.getUsername());

        AdminUser user = adminUserService.findByUsername(loginRequest.getUsername());
        if (user != null && loginRequest.getPassword() != null
                && loginRequest.getPassword().equals(user.getPassword())) {
            log.info("Admin login successful for username: {}", loginRequest.getUsername());
            return ResponseEntity.ok(new LoginResponse(true, "Login successful",
                    jwtUtil.generateToken(loginRequest.getUsername())));
        } else {
            log.warn("Admin login failed for username: {}", loginRequest.getUsername());
            return ResponseEntity.badRequest().body(new LoginResponse(false, "Invalid credentials", null));
        }
    }

    /**
     * Login request DTO.
     */
    public static class LoginRequest {
        private String username;
        private String password;

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    /**
     * Login response DTO.
     */
    public static class LoginResponse {
        private boolean success;
        private String message;
        private String token;

        public LoginResponse(boolean success, String message, String token) {
            this.success = success;
            this.message = message;
            this.token = token;
        }

        public boolean isSuccess() { return success; }
        public void setSuccess(boolean success) { this.success = success; }
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
        public String getToken() { return token; }
        public void setToken(String token) { this.token = token; }
    }
}

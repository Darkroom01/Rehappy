package com.rehappy.controller;

import com.rehappy.model.User;
import com.rehappy.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Operation(summary = "회원가입", description = "일반 사용자 및 의료진 회원가입을 처리합니다.")
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(
            @RequestBody @Parameter(description = "회원가입 요청 정보") User user,
            @RequestParam @Parameter(description = "의료진 여부") boolean isDoctor) {
        User registeredUser = userService.registerUser(user, isDoctor);
        return ResponseEntity.ok(registeredUser);
    }

    @Operation(summary = "로그인", description = "로그인 후 JWT 토큰을 반환합니다.")
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestParam @Parameter(description = "사용자 이메일") String email,
            @RequestParam @Parameter(description = "사용자 비밀번호") String password) {
        try {
            String token = userService.login(email, password);
            return ResponseEntity.ok(token);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("서버 오류가 발생했습니다.");
        }
    }
}

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

    @Operation(
            summary = "회원가입",
            description = "일반 사용자 및 의료진 회원가입을 처리합니다. 'isDoctor' 플래그를 사용해 의료진 여부를 구분하며, 이메일, 비밀번호, 이름을 입력받습니다. " +
                    "의료진일 경우 병원 이름과 면허 번호를 추가로 입력받을 수 있습니다. (현재는 사용하지 않음). " +
                    "회원가입 후 기본 프로필이 자동으로 생성됩니다."
    )
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(
            @RequestBody @Parameter(description = "회원가입 요청 정보 (이메일, 비밀번호, 이름)") User user,
            @RequestParam @Parameter(description = "의료진 여부 플래그") boolean isDoctor,
            @RequestParam @Parameter (description = "프로필 사진 타입") int profilePictureType) {
        User registeredUser = userService.registerUser(user, isDoctor, profilePictureType);
        return ResponseEntity.ok(registeredUser);
    }

    @Operation(
            summary = "로그인",
            description = "사용자가 이메일과 비밀번호를 입력해 로그인하고, JWT 토큰을 반환합니다."
    )
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestParam @Parameter(description = "사용자 이메일 주소") String email,
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

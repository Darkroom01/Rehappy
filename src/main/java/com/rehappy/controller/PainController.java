package com.rehappy.controller;

import com.rehappy.model.Pain;
import com.rehappy.service.PainService;
import com.rehappy.service.UserService;
import com.rehappy.Util.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pains")
public class PainController {

    private final PainService painService;
    private final JwtUtil jwtUtil;
    private final UserService userService;

    public PainController(PainService painService, JwtUtil jwtUtil, UserService userService) {
        this.painService = painService;
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    @Operation(summary = "통증 기록 작성", description = "사용자가 자신의 통증 기록을 저장합니다.")
    @PostMapping
    public ResponseEntity<?> createPain(
            @RequestBody Pain pain,
            @RequestHeader("Authorization") String token) {
        try {
            // JWT에서 이메일 추출
            String email = jwtUtil.extractEmail(token.replace("Bearer ", ""));
            // 이메일로 User ID 조회
            Long userId = userService.getUserIdByEmail(email);

            pain.setUserId(userId); // 작성자 설정
            Pain savedPain = painService.savePain(pain);
            return ResponseEntity.ok(savedPain);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("토큰 검증 실패: " + e.getMessage());
        }
    }

    @Operation(summary = "통증 기록 조회", description = "사용자가 자신의 통증 기록을 조회합니다.")
    @GetMapping
    public ResponseEntity<?> getPains(
            @RequestHeader("Authorization") String token) {
        try {
            // JWT에서 이메일 추출
            String email = jwtUtil.extractEmail(token.replace("Bearer ", ""));
            // 이메일로 User ID 조회
            Long userId = userService.getUserIdByEmail(email);

            List<Pain> pains = painService.getPainsByUserId(userId);
            return ResponseEntity.ok(pains);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("토큰 검증 실패: " + e.getMessage());
        }
    }
}

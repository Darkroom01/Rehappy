package com.rehappy.controller;

import com.rehappy.model.Pain;
import com.rehappy.service.OpenAiService;
import com.rehappy.service.PainService;
import com.rehappy.service.UserService;
import com.rehappy.Util.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@SecurityRequirement(name = "BearerAuth")
@RequestMapping("/api/reports")
public class PainReportController {

    private final PainService painService;
    private final JwtUtil jwtUtil;
    private final UserService userService;
    private final OpenAiService openAiService;

    public PainReportController(PainService painService, JwtUtil jwtUtil, UserService userService, OpenAiService openAiService) {
        this.painService = painService;
        this.jwtUtil = jwtUtil;
        this.userService = userService;
        this.openAiService = openAiService;
    }

    @Operation(summary = "통증 보고서 생성", description = "통증 기록을 바탕으로 보고서 생성")
    @PostMapping
    public ResponseEntity<?> generateReport(@RequestHeader("Authorization") String token) {
        try {
            // 사용자 인증 및 데이터 조회
            String email = jwtUtil.extractEmail(token.replace("Bearer ", ""));
            Long userId = userService.getUserIdByEmail(email);
            List<Pain> pains = painService.getPainsByUserId(userId);

            // ChatGPT 프롬프트 생성
            String prompt = createPromptFromPains(pains, email);

            // OpenAI API 호출을 통한 보고서 생성
            String report = openAiService.generateChatGptResponse(prompt); // 메서드 이름 수정

            // 보고서 반환
            return ResponseEntity.ok(report);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("보고서 생성 중 오류가 발생했습니다: " + e.getMessage());
        }
    }

    private String createPromptFromPains(List<Pain> pains, String userEmail) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("다음은 사용자의 통증 기록입니다. 이를 기반으로 맞춤형 통증 관리 보고서를 생성해 주세요.\n");
        prompt.append("사용자 이메일: ").append(userEmail).append("\n\n");
        prompt.append("통증 기록:\n");

        for (Pain pain : pains) {
            prompt.append("- 날짜: ").append(pain.getPainDate()).append(", 시간: ").append(pain.getPainTime()).append("\n");
            prompt.append("  강도: ").append(pain.getIntensity()).append(", 위치: ").append(pain.getLocation()).append("\n");
            prompt.append("  양상: ").append(pain.getPattern() != null ? pain.getPattern() : "정보 없음").append("\n");
            prompt.append("  지속 시간: ").append(pain.getDuration() != null ? pain.getDuration() : "정보 없음").append("\n");
            prompt.append("  악화 요인: ").append(pain.getAggravatingFactors() != null ? pain.getAggravatingFactors() : "정보 없음").append("\n");
            prompt.append("  완화 요인: ").append(pain.getRelievingFactors() != null ? pain.getRelievingFactors() : "정보 없음").append("\n");
            prompt.append("  치료 반응: ").append(pain.getTreatmentResponse() != null ? pain.getTreatmentResponse() : "정보 없음").append("\n\n");
        }

        prompt.append("사용자에게 통증 관리 팁, 치료 방향성, 악화 요인을 줄이는 방법 등을 포함한 보고서를 작성해 주세요.");
        return prompt.toString();
    }
}

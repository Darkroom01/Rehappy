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
import java.util.Map;
import java.util.stream.Collectors;

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

        // 의료진을 위한 요약 정보 추가
        prompt.append("다음은 의료진을 위한 통증 요약 정보입니다:\n");
        prompt.append("- 통증 기록의 총 개수: ").append(pains.size()).append("건\n");

        // 가장 빈번한 통증 부위 찾기
        Map<String, Long> locationCounts = pains.stream()
                .collect(Collectors.groupingBy(Pain::getLocation, Collectors.counting()));
        String mostFrequentLocation = locationCounts.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("정보 없음");

        prompt.append("- 가장 빈번한 통증 부위: ").append(mostFrequentLocation).append("\n");

        // 평균 통증 강도 계산
        double averageIntensity = pains.stream()
                .mapToInt(Pain::getIntensity)
                .average()
                .orElse(0.0);
        prompt.append("- 평균 통증 강도: ").append(String.format("%.1f", averageIntensity)).append(" (10점 만점)\n");

        // 기타 참고 사항
        prompt.append("- 의료진이 참고할 만한 추가적인 주요 통증 패턴과 특징:\n");
        prompt.append("  - 환자가 자주 언급한 통증 양상 및 특징.\n");
        prompt.append("  - 악화 요인과 완화 요인 간의 관련성을 파악하여 치료 방향을 제안해 주세요.\n\n");

        // 보고서 요청 마무리
        prompt.append("위 정보를 바탕으로 사용자에게 통증 관리 팁, 치료 방향성, 악화 요인을 줄이는 방법 등을 포함한 종합적인 보고서를 작성해 주세요.");

        return prompt.toString();
    }

}

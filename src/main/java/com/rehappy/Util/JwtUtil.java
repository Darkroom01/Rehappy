package com.rehappy.Util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256); // 랜덤 비밀 키 생성
    private final long validityInMilliseconds = 3600000; // 1시간 (단위: 밀리초)

    // JWT 생성
    public String generateToken(String email, String role) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + validityInMilliseconds);

        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(secretKey)
                .compact();
    }

    // JWT에서 클레임 추출
    public Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // 토큰 유효성 검증
    public boolean validateToken(String token) {
        try {
            extractClaims(token); // 클레임 추출 시 유효성 검증 포함
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // 이메일 추출
    public String extractEmail(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject(); // 이메일은 JWT의 Subject로 저장됨
    }
}

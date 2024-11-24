package com.rehappy.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role; // "USER" 또는 "DOCTOR"

    // 의료진 전용 필드 (필요 시 사용)
    private String licenseNumber;
    private String hospitalName;
}

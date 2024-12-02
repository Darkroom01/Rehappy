package com.rehappy.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileDto {
    private Long id;
    private String name;

    public ProfileDto(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}

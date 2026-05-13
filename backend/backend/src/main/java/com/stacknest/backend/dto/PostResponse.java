package com.stacknest.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class PostResponse {
    private Long id;
    private String title;
    private String content;
    private String imageUrl;
    private String authorUsername;
    private String communityName;
    private String communitySlug;
    private LocalDateTime createdAt;
}

package com.stacknest.backend.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PostRequest {
    private String title;
    private String content;
    private String imageUrl;
    private String authorUsername;
    private String communityName;
    private String communitySlug;
    private LocalDateTime createdAt;
}
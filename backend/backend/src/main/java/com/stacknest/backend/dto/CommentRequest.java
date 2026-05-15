package com.stacknest.backend.dto;

import lombok.Data;

@Data
public class CommentRequest {
    private Long postId;
    private String content;
}
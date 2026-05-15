package com.stacknest.backend.dto;

import lombok.Data;

@Data
public class VoteRequest {
    private Long postId;
    private Integer value;
}
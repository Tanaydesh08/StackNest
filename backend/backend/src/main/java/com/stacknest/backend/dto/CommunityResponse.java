package com.stacknest.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CommunityResponse {
    private Long id;
    private String name;
    private String slug;
    private String description;
    private String creatorUsername;
}

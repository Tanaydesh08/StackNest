package com.stacknest.backend.controller;

import com.stacknest.backend.dto.CommunityRequest;
import com.stacknest.backend.dto.CommunityResponse;
import com.stacknest.backend.service.CommunityService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/communities")
@RequiredArgsConstructor
public class CommunityController {
    private final CommunityService communityService;

    @PostMapping
    public CommunityResponse createCommunity(@RequestBody CommunityRequest request, @RequestHeader("Authorization") String authHeader){
        return communityService.createCommunity(request, authHeader);
    }

    @GetMapping
    public List<CommunityResponse> getAllCommunities(){
        return communityService.getAllCommunities();
    }

    @GetMapping("/{slug}")
    public CommunityResponse getCommunityBySlug(@PathVariable String slug){
        return communityService.getCommunityBySlug(slug);
    }
}

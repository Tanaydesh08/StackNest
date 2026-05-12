package com.stacknest.backend.service;

import com.stacknest.backend.dto.CommunityRequest;
import com.stacknest.backend.dto.CommunityResponse;
import com.stacknest.backend.entity.Community;
import com.stacknest.backend.entity.User;
import com.stacknest.backend.repository.CommunityRepository;
import com.stacknest.backend.repository.UserRepository;
import com.stacknest.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommunityService {
    private final CommunityRepository communityRepository;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public CommunityResponse createCommunity(CommunityRequest request, String authHeader){
        String token = jwtUtil.extractTokenFromHeader(authHeader);
        String email = jwtUtil.extractEmail(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        if (communityRepository.existsByName(request.getName())){
            throw new RuntimeException("Community already exists");
        }
        String slug = request.getName().toLowerCase().replace(" ", "-");

        Community community = Community.builder()
                .name(request.getName())
                .slug(slug)
                .description(request.getDescription())
                .creator(user).build();

        communityRepository.save(community);

        return mapToResponse(community);
    }
    public List<CommunityResponse> getAllCommunities(){
        return communityRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public CommunityResponse getCommunityBySlug(String slug){
        Community community = communityRepository.findBySlug(slug)
                .orElseThrow( () -> new RuntimeException("Community Not Found"));

        return mapToResponse(community);
    }

    private CommunityResponse mapToResponse(Community community){
        return CommunityResponse.builder()
                .id(community.getId())
                .name(community.getName())
                .slug(community.getSlug())
                .description(community.getDescription())
                .creatorUsername(community.getCreator().getUsername())
                .build();
    }
}

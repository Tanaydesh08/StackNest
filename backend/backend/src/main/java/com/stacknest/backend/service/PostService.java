package com.stacknest.backend.service;

import com.stacknest.backend.dto.PostRequest;
import com.stacknest.backend.dto.PostResponse;
import com.stacknest.backend.entity.Community;
import com.stacknest.backend.entity.Post;
import com.stacknest.backend.entity.User;
import com.stacknest.backend.repository.CommunityRepository;
import com.stacknest.backend.repository.PostRepository;
import com.stacknest.backend.repository.UserRepository;
import com.stacknest.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final CommunityRepository communityRepository;
    private final JwtUtil jwtUtil;

    public PostResponse createPost(PostRequest request, String authHeader){
        String token = jwtUtil.extractTokenFromHeader(authHeader);
        String email = jwtUtil.extractEmail(token);

        User user =  userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Community community = communityRepository.findBySlug(request.getCommunitySlug())
                .orElseThrow(() -> new RuntimeException("Community not found"));

        Post post = Post.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .imageURL(request.getImageUrl())
                .createdAt(LocalDateTime.now())
                .author(user)
                .community(community).build();

        postRepository.save(post);

        return mapToResponse(post);
    }
    public List<PostResponse> getAllPosts(){
        return postRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
    public PostResponse getPostById(Long id){
        Post post =  postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not Found"));
        return mapToResponse(post);
    }
    public List<PostResponse> getPostByCommunity(String slug){
        Community community = communityRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("community not found"));

        return postRepository
                .findByCommunityOrderByCreatedAtDesc(community)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
    private PostResponse mapToResponse(Post post){
        return PostResponse.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .imageUrl(post.getImageURL())
                .authorUsername(post.getAuthor().getUsername())
                .communityName(post.getCommunity().getName())
                .communitySlug(post.getCommunity().getSlug())
                .createdAt(post.getCreatedAt())
                .build();
    }
}
package com.stacknest.backend.controller;

import com.stacknest.backend.dto.PostRequest;
import com.stacknest.backend.dto.PostResponse;
import com.stacknest.backend.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    @PostMapping
    public PostResponse createPost(@RequestBody PostRequest postRequest, @RequestHeader("Authorization") String authHeader){
        return postService.createPost(postRequest, authHeader);
    }

    @GetMapping
    public List<PostResponse> getAllPosts(){
        return postService.getAllPosts();
    }

    @GetMapping("/{id}")
    public PostResponse getPostById(@PathVariable Long id){
        return postService.getPostById(id);
    }

    @GetMapping("/community/{slug}")
    public List<PostResponse> getPostByCommunity(@PathVariable String slug){
        return postService.getPostByCommunity(slug);
    }
}
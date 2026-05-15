package com.stacknest.backend.controller;

import com.stacknest.backend.dto.CommentRequest;
import com.stacknest.backend.dto.CommentResponse;
import com.stacknest.backend.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @PostMapping
    public CommentResponse addComment(@RequestBody CommentRequest request,
                                      @RequestHeader("Authorization") String authHeader){
        return commentService.addComment(request, authHeader);
    }

    @GetMapping("/post/{postId}")
    public List<CommentResponse> getCommentsByPost(@PathVariable Long postId){
        return commentService.getCommentByPost(postId);
    }
}

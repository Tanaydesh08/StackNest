package com.stacknest.backend.service;

import com.stacknest.backend.dto.CommentRequest;
import com.stacknest.backend.dto.CommentResponse;
import com.stacknest.backend.entity.Comment;
import com.stacknest.backend.entity.Post;
import com.stacknest.backend.entity.User;
import com.stacknest.backend.repository.CommentRepository;
import com.stacknest.backend.repository.PostRepository;
import com.stacknest.backend.repository.UserRepository;
import com.stacknest.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public CommentResponse addComment(CommentRequest request, String authHeader){
        String token = jwtUtil.extractTokenFromHeader(authHeader);
        String email = jwtUtil.extractEmail(token);
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User Not Found"));
        Post post = postRepository.findById(request.getPostId()).orElseThrow(() -> new RuntimeException("Post Not Found"));
        Comment comment = Comment.builder()
                .content(request.getContent())
                .createdAt(LocalDateTime.now())
                .author(user)
                .post(post)
                .build();
        commentRepository.save(comment);

        return mapToResponse(comment);
    }
    public List<CommentResponse> getCommentByPost(Long postId){
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post Not Found"));

        return commentRepository
                .findByPostOrderByCreatedAtDesc(post)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
    private CommentResponse mapToResponse(Comment comment){
        return CommentResponse.builder()
                .id(comment.getId())
                .authorUsername(comment.getAuthor().getUsername())
                .content(comment.getContent())
                .postId(comment.getPost().getId())
                .createdAt(comment.getCreatedAt()).build();
    }
}
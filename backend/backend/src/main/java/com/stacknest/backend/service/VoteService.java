package com.stacknest.backend.service;

import com.stacknest.backend.dto.VoteRequest;
import com.stacknest.backend.entity.Post;
import com.stacknest.backend.entity.User;
import com.stacknest.backend.entity.Vote;
import com.stacknest.backend.repository.PostRepository;
import com.stacknest.backend.repository.UserRepository;
import com.stacknest.backend.repository.VoteRepository;
import com.stacknest.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VoteService {
    private final VoteRepository voteRepository;
    private final UserRepository userRepository;
    private  final PostRepository postRepository;
    private final JwtUtil jwtUtil;

    public String vote(VoteRequest voteRequest, String authHeader){
        String token = jwtUtil.extractTokenFromHeader(authHeader);
        String email = jwtUtil.extractEmail(token);

        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        Post post = postRepository.findById(voteRequest.getPostId()).orElseThrow(() -> new RuntimeException("Post not found"));

        Vote existingVote = voteRepository.findByUserAndPost(user, post).orElse(null);

        if (existingVote !=null){
            if (existingVote.getValue().equals(voteRequest.getValue())){
                voteRepository.delete(existingVote);
                return "Vote removed";
            }
            existingVote.setValue(voteRequest.getValue());
            voteRepository.save(existingVote);

            return "Vote updated";
        }
        Vote vote = Vote.builder()
                .user(user)
                .post(post)
                .value(voteRequest.getValue()).build();

        voteRepository.save(vote);

        return "Vote added";
    }
}
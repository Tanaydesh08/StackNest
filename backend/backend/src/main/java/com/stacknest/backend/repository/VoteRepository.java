package com.stacknest.backend.repository;

import com.stacknest.backend.entity.Post;
import com.stacknest.backend.entity.User;
import com.stacknest.backend.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VoteRepository extends JpaRepository<Vote, Long> {
    Optional<Vote> findByUserAndPost(User user, Post post);
}

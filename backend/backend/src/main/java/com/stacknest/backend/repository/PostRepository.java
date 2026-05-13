package com.stacknest.backend.repository;

import com.stacknest.backend.entity.Community;
import com.stacknest.backend.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByCommunityOrderByCreatedAtDesc(Community community);
    List<Post> findAllByOrderByCreatedAtDesc();
}
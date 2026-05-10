package com.stacknest.backend.repository;

import com.stacknest.backend.entity.Comment;
import com.stacknest.backend.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPost(Post post);
}
package com.stacknest.backend.repository;

import com.stacknest.backend.entity.Community;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommunityRepository extends JpaRepository<Community, Long> {
    Optional<Community> findBySlug(String slug);

    boolean existsBySlug(String slug);

    boolean existsByName(String name);
}
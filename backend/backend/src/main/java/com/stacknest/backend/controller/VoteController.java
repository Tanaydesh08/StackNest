package com.stacknest.backend.controller;

import com.stacknest.backend.dto.VoteRequest;
import com.stacknest.backend.service.VoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/votes")
@RequiredArgsConstructor
public class VoteController {
    private final VoteService voteService;

    @PostMapping
    public String vote(@RequestBody VoteRequest request, @RequestHeader("Authorization") String authhead){
        return voteService.vote(request, authhead);
    }
}
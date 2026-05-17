package com.stacknest.backend.controller;

import com.stacknest.backend.service.UploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/upload")
@RequiredArgsConstructor
public class UploadController {
    private final UploadService uploadService;
    @PostMapping
    public Map<String, String> uploadImage(@RequestParam("file")MultipartFile file){
        String imageUrl = uploadService.uploadImage(file);

        return Map.of("imageUrl", imageUrl);
    }
}
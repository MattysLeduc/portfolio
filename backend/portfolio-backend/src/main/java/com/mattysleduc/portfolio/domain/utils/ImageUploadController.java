package com.mattysleduc.portfolio.domain.utils;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/images")
@CrossOrigin(origins = "*")
public class ImageUploadController {

    private final FileStorageService fileStorageService;

    public ImageUploadController(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadImage(
            @RequestParam("file") MultipartFile file
    ) {
        String imageUrl = fileStorageService.storeImage(file);
        
        Map<String, String> response = new HashMap<>();
        response.put("imageUrl", imageUrl);
        response.put("message", "Image uploaded successfully");
        
        return ResponseEntity.ok(response);
    }
}

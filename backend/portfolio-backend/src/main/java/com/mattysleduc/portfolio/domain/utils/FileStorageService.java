package com.mattysleduc.portfolio.domain.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
public class FileStorageService {

    private final Path imageStoragePath;
    private static final List<String> ALLOWED_IMAGE_TYPES = Arrays.asList(
            "image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"
    );
    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    public FileStorageService(@Value("${app.image.storage:uploads/images}") String imageStorageDir) {
        Path primaryPath = Paths.get(imageStorageDir).toAbsolutePath().normalize();
        this.imageStoragePath = ensureWritableDirectory(primaryPath);
    }

    private Path ensureWritableDirectory(Path primaryPath) {
        try {
            Files.createDirectories(primaryPath);
            return primaryPath;
        } catch (IOException e) {
            Path fallback = Paths.get(System.getProperty("java.io.tmpdir"), "uploads", "images")
                    .toAbsolutePath()
                    .normalize();
            try {
                Files.createDirectories(fallback);
                return fallback;
            } catch (IOException ex) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, 
                        "Unable to create image storage directory", ex);
            }
        }
    }

    public String storeImage(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "File is required");
        }

        // Validate file size
        if (file.getSize() > MAX_FILE_SIZE) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
                    "File size exceeds maximum allowed size of 5MB");
        }

        // Validate content type
        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_IMAGE_TYPES.contains(contentType.toLowerCase())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
                    "Only image files (JPEG, PNG, GIF, WEBP) are allowed");
        }

        // Generate unique filename
        String originalFilename = file.getOriginalFilename();
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        String filename = UUID.randomUUID().toString() + extension;

        try {
            Path targetPath = imageStoragePath.resolve(filename);
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);
            
            // Return the relative path that can be used in URLs
            return "/uploads/images/" + filename;
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, 
                    "Failed to store file", e);
        }
    }

    public void deleteImage(String imageUrl) {
        if (imageUrl == null || imageUrl.isEmpty()) {
            return;
        }

        try {
            // Extract filename from URL
            String filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
            Path filePath = imageStoragePath.resolve(filename);
            
            if (Files.exists(filePath)) {
                Files.delete(filePath);
            }
        } catch (IOException e) {
            // Log error but don't throw exception for delete failures
            System.err.println("Failed to delete image: " + imageUrl);
        }
    }

    public boolean isValidImageUrl(String url) {
        if (url == null || url.isEmpty()) {
            return false;
        }
        return url.startsWith("/uploads/images/") || 
               url.startsWith("http://") || 
               url.startsWith("https://");
    }
}

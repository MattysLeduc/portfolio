package com.mattysleduc.portfolio.domain.resumesubdomain.business_layer;

import com.mattysleduc.portfolio.domain.resumesubdomain.presentation_layer.ResumeInfoResponseModel;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Instant;

@Service
public class ResumeServiceImpl implements ResumeService {

    private final Path storagePath;

    public ResumeServiceImpl(@Value("${app.resume.storage:uploads/resumes}") String storageDir) {
        Path primaryPath = Paths.get(storageDir).toAbsolutePath().normalize();
        this.storagePath = ensureWritableDirectory(primaryPath);
    }

    private Path ensureWritableDirectory(Path primaryPath) {
        try {
            Files.createDirectories(primaryPath);
            return primaryPath;
        } catch (IOException e) {
            Path fallback = Paths.get(System.getProperty("java.io.tmpdir"), "uploads", "resumes")
                    .toAbsolutePath()
                    .normalize();
            try {
                Files.createDirectories(fallback);
                return fallback;
            } catch (IOException ex) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to create resume storage directory", ex);
            }
        }
    }

    @Override
    public ResumeInfoResponseModel uploadResume(String language, MultipartFile file) {
        String lang = normalizeLanguage(language);
        if (file == null || file.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Resume file is required");
        }
        if (file.getContentType() != null && !file.getContentType().equalsIgnoreCase("application/pdf")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only PDF files are allowed");
        }

        Path target = storagePath.resolve(getFileName(lang));
        try {
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
            return buildInfo(lang, target);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to store resume", e);
        }
    }

    @Override
    public ResumeInfoResponseModel getResumeInfo(String language) {
        String lang = normalizeLanguage(language);
        Path target = storagePath.resolve(getFileName(lang));
        if (!Files.exists(target)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Resume not found");
        }
        return buildInfo(lang, target);
    }

    @Override
    public Resource getResumeFile(String language) {
        String lang = normalizeLanguage(language);
        Path target = storagePath.resolve(getFileName(lang));
        if (!Files.exists(target)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Resume not found");
        }
        return new FileSystemResource(target);
    }

    private ResumeInfoResponseModel buildInfo(String lang, Path target) {
        try {
            String fileName = target.getFileName().toString();
            long size = Files.size(target);
            String updatedAt = Instant.ofEpochMilli(Files.getLastModifiedTime(target).toMillis()).toString();
            return new ResumeInfoResponseModel(lang, fileName, size, updatedAt);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to read resume info", e);
        }
    }

    private String normalizeLanguage(String language) {
        String lang = language == null ? "en" : language.trim().toLowerCase();
        if (!lang.equals("en") && !lang.equals("fr")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid language. Use en or fr");
        }
        return lang;
    }

    private String getFileName(String lang) {
        return "resume_" + lang + ".pdf";
    }
}

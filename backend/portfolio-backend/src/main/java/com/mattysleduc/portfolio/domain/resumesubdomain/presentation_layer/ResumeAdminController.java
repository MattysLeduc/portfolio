package com.mattysleduc.portfolio.domain.resumesubdomain.presentation_layer;

import com.mattysleduc.portfolio.domain.resumesubdomain.business_layer.ResumeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/admin/resume")
public class ResumeAdminController {

    private final ResumeService service;

    public ResumeAdminController(ResumeService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<ResumeInfoResponseModel> getResumeInfo(@RequestParam(value = "lang", required = false) String lang) {
        return ResponseEntity.ok(service.getResumeInfo(lang));
    }

    @PostMapping("/upload")
    public ResponseEntity<ResumeInfoResponseModel> uploadResume(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "lang", required = false) String lang) {
        return ResponseEntity.ok(service.uploadResume(lang, file));
    }
}

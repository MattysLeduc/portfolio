package com.mattysleduc.portfolio.domain.resumesubdomain.presentation_layer;

import com.mattysleduc.portfolio.domain.resumesubdomain.business_layer.ResumeService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/resume")
public class ResumePublicController {

    private final ResumeService service;

    public ResumePublicController(ResumeService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<Resource> getResume(@RequestParam(value = "lang", required = false) String lang) {
        Resource file = service.getResumeFile(lang);
        String fileName = "resume_" + (lang == null ? "en" : lang) + ".pdf";
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileName + "\"")
                .body(file);
    }
}

package com.mattysleduc.portfolio.domain.experiencesubdomain.presentation_layer;

import com.mattysleduc.portfolio.domain.experiencesubdomain.business_layer.ExperienceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/public/experiences")
public class ExperiencePublicController {

    private final ExperienceService service;

    public ExperiencePublicController(ExperienceService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<ExperienceResponseModel>> getExperiences() {
        return ResponseEntity.ok(service.getPublicExperiences());
    }
}

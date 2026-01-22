package com.mattysleduc.portfolio.domain.experiencesubdomain.presentation_layer;

import com.mattysleduc.portfolio.domain.experiencesubdomain.business_layer.ExperienceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/experiences")
public class ExperienceAdminController {

    private final ExperienceService service;

    public ExperienceAdminController(ExperienceService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<ExperienceResponseModel>> getAll() {
        return ResponseEntity.ok(service.getAllExperiences());
    }

    @PostMapping
    public ResponseEntity<ExperienceResponseModel> create(@RequestBody ExperienceRequestModel model) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.createExperience(model));
    }

    @PutMapping("/{experienceId}")
    public ResponseEntity<ExperienceResponseModel> update(@PathVariable String experienceId,
                                                          @RequestBody ExperienceRequestModel model) {
        return ResponseEntity.ok(service.updateExperience(experienceId, model));
    }

    @DeleteMapping("/{experienceId}")
    public ResponseEntity<Void> delete(@PathVariable String experienceId) {
        service.deleteExperience(experienceId);
        return ResponseEntity.noContent().build();
    }
}

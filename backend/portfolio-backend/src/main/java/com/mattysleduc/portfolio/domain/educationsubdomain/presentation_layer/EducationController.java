package com.mattysleduc.portfolio.domain.educationsubdomain.presentation_layer;

import com.mattysleduc.portfolio.domain.educationsubdomain.business_layer.EducationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/education")
public class EducationController {

    private final EducationService service;

    public EducationController(EducationService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<EducationResponseModel>> getAll() {
        return ResponseEntity.ok(service.getAllEducation());
    }

    @GetMapping("/{educationId}")
    public ResponseEntity<EducationResponseModel> getById(@PathVariable String educationId) {
        return ResponseEntity.ok(service.getEducationById(educationId));
    }

    @PostMapping
    public ResponseEntity<EducationResponseModel> create(@RequestBody EducationRequestModel model) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.createEducation(model));
    }

    @PutMapping("/{educationId}")
    public ResponseEntity<EducationResponseModel> update(
            @PathVariable String educationId,
            @RequestBody EducationRequestModel model) {
        return ResponseEntity.ok(service.updateEducation(educationId, model));
    }

    @DeleteMapping("/{educationId}")
    public ResponseEntity<Void> delete(@PathVariable String educationId) {
        service.deleteEducation(educationId);
        return ResponseEntity.noContent().build();
    }
}

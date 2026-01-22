package com.mattysleduc.portfolio.domain.projectsubdomain.presentation_layer;

import com.mattysleduc.portfolio.domain.projectsubdomain.business_layer.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/projects")
public class ProjectController {

    private final ProjectService service;

    public ProjectController(ProjectService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponseModel>> getAll() {
        return ResponseEntity.ok(service.getAllProjects());
    }

    @GetMapping("/featured")
    public ResponseEntity<List<ProjectResponseModel>> getFeatured() {
        return ResponseEntity.ok(service.getFeaturedProjects());
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<ProjectResponseModel> getById(@PathVariable String projectId) {
        return ResponseEntity.ok(service.getProjectById(projectId));
    }

    @PostMapping
    public ResponseEntity<ProjectResponseModel> create(@RequestBody ProjectRequestModel model) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.createProject(model));
    }

    @PutMapping("/{projectId}")
    public ResponseEntity<ProjectResponseModel> update(
            @PathVariable String projectId,
            @RequestBody ProjectRequestModel model) {
        return ResponseEntity.ok(service.updateProject(projectId, model));
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<Void> delete(@PathVariable String projectId) {
        service.deleteProject(projectId);
        return ResponseEntity.noContent().build();
    }
}

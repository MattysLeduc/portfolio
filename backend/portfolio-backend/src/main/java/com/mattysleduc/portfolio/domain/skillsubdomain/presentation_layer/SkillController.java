package com.mattysleduc.portfolio.domain.skillsubdomain.presentation_layer;

import com.mattysleduc.portfolio.domain.skillsubdomain.business_layer.SkillService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/skills")
public class SkillController {

    private final SkillService service;

    public SkillController(SkillService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<SkillResponseModel>> getAll() {
        return ResponseEntity.ok(service.getAllSkills());
    }

    @GetMapping("/{skillId}")
    public ResponseEntity<SkillResponseModel> getById(@PathVariable String skillId) {
        return ResponseEntity.ok(service.getSkillById(skillId));
    }

    @PostMapping
    public ResponseEntity<SkillResponseModel> create(@RequestBody SkillRequestModel model) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.createSkill(model));
    }

    @PutMapping("/{skillId}")
    public ResponseEntity<SkillResponseModel> update(
            @PathVariable String skillId,
            @RequestBody SkillRequestModel model) {
        return ResponseEntity.ok(service.updateSkill(skillId, model));
    }

    @DeleteMapping("/{skillId}")
    public ResponseEntity<Void> delete(@PathVariable String skillId) {
        service.deleteSkill(skillId);
        return ResponseEntity.noContent().build();
    }
}

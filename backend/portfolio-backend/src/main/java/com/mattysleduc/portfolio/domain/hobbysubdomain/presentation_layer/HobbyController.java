package com.mattysleduc.portfolio.domain.hobbysubdomain.presentation_layer;

import com.mattysleduc.portfolio.domain.hobbysubdomain.business_layer.HobbyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/hobbies")
public class HobbyController {

    private final HobbyService service;

    public HobbyController(HobbyService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<HobbyResponseModel>> getAll() {
        return ResponseEntity.ok(service.getAllHobbies());
    }

    @GetMapping("/{hobbyId}")
    public ResponseEntity<HobbyResponseModel> getById(@PathVariable String hobbyId) {
        return ResponseEntity.ok(service.getHobbyById(hobbyId));
    }

    @PostMapping
    public ResponseEntity<HobbyResponseModel> create(@RequestBody HobbyRequestModel model) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.createHobby(model));
    }

    @PutMapping("/{hobbyId}")
    public ResponseEntity<HobbyResponseModel> update(
            @PathVariable String hobbyId,
            @RequestBody HobbyRequestModel model) {
        return ResponseEntity.ok(service.updateHobby(hobbyId, model));
    }

    @DeleteMapping("/{hobbyId}")
    public ResponseEntity<Void> delete(@PathVariable String hobbyId) {
        service.deleteHobby(hobbyId);
        return ResponseEntity.noContent().build();
    }
}

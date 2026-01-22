package com.mattysleduc.portfolio.domain.testimonialsubdomain.presentation_layer;

import com.mattysleduc.portfolio.domain.testimonialsubdomain.business_layer.TestimonialService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/testimonials")
public class TestimonialAdminController {

    private final TestimonialService service;

    public TestimonialAdminController(TestimonialService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<TestimonialResponseModel>> getAll() {
        return ResponseEntity.ok(service.getAllTestimonials());
    }

    @GetMapping("/pending")
    public ResponseEntity<List<TestimonialResponseModel>> getPending() {
        return ResponseEntity.ok(service.getPendingTestimonials());
    }

    @PostMapping("/{testimonialId}/approve")
    public ResponseEntity<TestimonialResponseModel> approve(@PathVariable String testimonialId) {
        return ResponseEntity.ok(service.approveTestimonial(testimonialId));
    }

    @PostMapping("/{testimonialId}/reject")
    public ResponseEntity<TestimonialResponseModel> reject(@PathVariable String testimonialId,
                                                           @RequestBody RejectRequestModel request) {
        return ResponseEntity.ok(service.rejectTestimonial(testimonialId, request.getReason()));
    }

    @DeleteMapping("/{testimonialId}")
    public ResponseEntity<Void> delete(@PathVariable String testimonialId) {
        service.deleteTestimonial(testimonialId);
        return ResponseEntity.noContent().build();
    }
}

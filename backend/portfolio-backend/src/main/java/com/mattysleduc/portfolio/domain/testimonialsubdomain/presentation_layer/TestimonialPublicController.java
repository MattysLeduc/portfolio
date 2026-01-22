package com.mattysleduc.portfolio.domain.testimonialsubdomain.presentation_layer;

import com.mattysleduc.portfolio.domain.testimonialsubdomain.business_layer.TestimonialService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public/testimonials")
public class TestimonialPublicController {

    private final TestimonialService service;

    public TestimonialPublicController(TestimonialService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<TestimonialResponseModel>> getApproved() {
        return ResponseEntity.ok(service.getApprovedTestimonials());
    }

    @PostMapping
    public ResponseEntity<TestimonialResponseModel> submit(@RequestBody TestimonialRequestModel model) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.submitTestimonial(model));
    }
}

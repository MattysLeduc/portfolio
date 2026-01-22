package com.mattysleduc.portfolio.domain.testimonialsubdomain.data_access_layer;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TestimonialRepository extends JpaRepository<Testimonial, Integer> {
    Testimonial findByTestimonialIdentifier_TestimonialId(String testimonialId);
    List<Testimonial> findByStatus(TestimonialStatus status);
}

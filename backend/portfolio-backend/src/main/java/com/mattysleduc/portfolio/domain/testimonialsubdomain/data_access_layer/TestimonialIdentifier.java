package com.mattysleduc.portfolio.domain.testimonialsubdomain.data_access_layer;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
public class TestimonialIdentifier {

    private String testimonialId;

    public TestimonialIdentifier() {
        this.testimonialId = UUID.randomUUID().toString();
    }
}

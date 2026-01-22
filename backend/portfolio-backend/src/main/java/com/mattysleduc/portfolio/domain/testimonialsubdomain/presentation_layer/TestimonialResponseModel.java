package com.mattysleduc.portfolio.domain.testimonialsubdomain.presentation_layer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TestimonialResponseModel {
    private String testimonialId;
    private String authorName;
    private String authorTitle;
    private String authorImage;
    private String content;
    private Integer rating;
    private OffsetDateTime createdAt;
    private String status;
    private String rejectionReason;
}

package com.mattysleduc.portfolio.domain.testimonialsubdomain.presentation_layer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TestimonialRequestModel {
    private String authorName;
    private String authorTitle;
    private String authorTitleEn;
    private String authorTitleFr;
    private String authorImage;
    private String content;
    private String contentEn;
    private String contentFr;
    private Integer rating;
    private String company;
}

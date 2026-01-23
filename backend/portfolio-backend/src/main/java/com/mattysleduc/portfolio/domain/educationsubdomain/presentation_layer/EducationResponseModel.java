package com.mattysleduc.portfolio.domain.educationsubdomain.presentation_layer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EducationResponseModel {
    private String educationId;
    private String degree;
    private String degreeEn;
    private String degreeFr;
    private String institution;
    private String institutionEn;
    private String institutionFr;
    private String locationEn;
    private String locationFr;
    private String description;
    private String descriptionEn;
    private String descriptionFr;
    private LocalDate startDate;
    private LocalDate endDate;
    private String period;
    private String gpa;
    private String type;
}

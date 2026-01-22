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
    private String degreeEn;
    private String degreeFr;
    private String institutionEn;
    private String institutionFr;
    private String locationEn;
    private String locationFr;
    private String descriptionEn;
    private String descriptionFr;
    private LocalDate startDate;
    private LocalDate endDate;
}

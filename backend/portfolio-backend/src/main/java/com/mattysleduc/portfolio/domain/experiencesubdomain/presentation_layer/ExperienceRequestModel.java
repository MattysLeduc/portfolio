package com.mattysleduc.portfolio.domain.experiencesubdomain.presentation_layer;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ExperienceRequestModel {
    private String title;
    private String company;
    private String location;
    private String titleEn;
    private String titleFr;
    private String companyEn;
    private String companyFr;
    private String locationEn;
    private String locationFr;
    private LocalDate startDate;
    private LocalDate endDate;
    private boolean current;
    private String description;
    private String descriptionEn;
    private String descriptionFr;
    private String responsibilitiesEn;
    private String responsibilitiesFr;
}

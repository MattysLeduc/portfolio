package com.mattysleduc.portfolio.domain.experiencesubdomain.presentation_layer;

import lombok.Builder;
import lombok.Value;

import java.time.LocalDate;
import java.util.List;

@Value
@Builder
public class ExperienceResponseModel {
    String experienceId;
    String title;
    String titleEn;
    String titleFr;
    String company;
    String companyEn;
    String companyFr;
    String location;
    String locationEn;
    String locationFr;
    LocalDate startDate;
    LocalDate endDate;
    boolean current;
    String period;
    String description;
    String descriptionEn;
    String descriptionFr;
    List<String> achievements;
    String responsibilities;
    String responsibilitiesEn;
    String responsibilitiesFr;
}

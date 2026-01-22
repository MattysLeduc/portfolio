package com.mattysleduc.portfolio.domain.experiencesubdomain.presentation_layer;

import lombok.Builder;
import lombok.Value;

import java.time.LocalDate;

@Value
@Builder
public class ExperienceResponseModel {
    String experienceId;
    String title;
    String company;
    String location;
    LocalDate startDate;
    LocalDate endDate;
    boolean current;
    String description;
}

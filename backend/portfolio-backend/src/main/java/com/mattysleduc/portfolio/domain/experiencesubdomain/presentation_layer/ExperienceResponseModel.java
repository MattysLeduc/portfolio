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
    String company;
    String location;
    LocalDate startDate;
    LocalDate endDate;
    boolean current;
    String period;
    String description;
    List<String> achievements;
    String responsibilities;
}

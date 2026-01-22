package com.mattysleduc.portfolio.domain.experiencesubdomain.presentation_layer;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ExperienceRequestModel {
    private String title;
    private String company;
    private String location;
    private LocalDate startDate;
    private LocalDate endDate;
    private boolean current;
    private String description;
}

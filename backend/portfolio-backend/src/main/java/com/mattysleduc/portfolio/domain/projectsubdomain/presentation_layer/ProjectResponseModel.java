package com.mattysleduc.portfolio.domain.projectsubdomain.presentation_layer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProjectResponseModel {
    private String projectId;
    private String title;
    private String nameEn;
    private String nameFr;
    private String description;
    private String descriptionEn;
    private String descriptionFr;
    private String imageUrl;
    private List<String> tech;
    private String technologies;
    private String github;
    private String repoUrl;
    private String live;
    private String demoUrl;
    private boolean featured;
}

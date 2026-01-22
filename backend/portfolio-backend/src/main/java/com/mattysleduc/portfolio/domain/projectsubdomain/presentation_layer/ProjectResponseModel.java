package com.mattysleduc.portfolio.domain.projectsubdomain.presentation_layer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProjectResponseModel {
    private String projectId;
    private String nameEn;
    private String nameFr;
    private String descriptionEn;
    private String descriptionFr;
    private String imageUrl;
    private String repoUrl;
    private String demoUrl;
    private boolean featured;
}

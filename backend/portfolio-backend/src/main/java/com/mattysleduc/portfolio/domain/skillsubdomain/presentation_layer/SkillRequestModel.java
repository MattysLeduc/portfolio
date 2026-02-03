package com.mattysleduc.portfolio.domain.skillsubdomain.presentation_layer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SkillRequestModel {
    private String name;
    private String description;
    private String nameEn;
    private String nameFr;
    private String descriptionEn;
    private String descriptionFr;
    private String category;
    private Integer level;
}

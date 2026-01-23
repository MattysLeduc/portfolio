package com.mattysleduc.portfolio.domain.skillsubdomain.presentation_layer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SkillResponseModel {
    private String skillId;
    private String name;
    private String description;
    private String category;
    private Integer level;
}

package com.mattysleduc.portfolio.domain.hobbysubdomain.presentation_layer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HobbyRequestModel {
    private String nameEn;
    private String nameFr;
    private String descriptionEn;
    private String descriptionFr;
    private String iconUrl;
}

package com.mattysleduc.portfolio.domain.hobbysubdomain.mapping_layer;

import com.mattysleduc.portfolio.domain.hobbysubdomain.data_access_layer.Hobby;
import com.mattysleduc.portfolio.domain.hobbysubdomain.presentation_layer.HobbyResponseModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface HobbyResponseMapper {

    @Mapping(source = "hobby.hobbyIdentifier.hobbyId", target = "hobbyId")
    @Mapping(source = "hobby.nameEn", target = "nameEn")
    @Mapping(source = "hobby.nameFr", target = "nameFr")
    @Mapping(source = "hobby.descriptionEn", target = "descriptionEn")
    @Mapping(source = "hobby.descriptionFr", target = "descriptionFr")
    @Mapping(source = "hobby.iconUrl", target = "iconUrl")
    HobbyResponseModel toResponseModel(Hobby hobby);
}

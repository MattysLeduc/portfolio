package com.mattysleduc.portfolio.domain.hobbysubdomain.mapping_layer;

import com.mattysleduc.portfolio.domain.hobbysubdomain.data_access_layer.Hobby;
import com.mattysleduc.portfolio.domain.hobbysubdomain.presentation_layer.HobbyRequestModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface HobbyRequestMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "hobbyIdentifier",
            expression = "java(new com.mattysleduc.portfolio.domain.hobbysubdomain.data_access_layer.HobbyIdentifier())")
    @Mapping(source = "hobbyRequestModel.nameEn", target = "nameEn")
    @Mapping(source = "hobbyRequestModel.nameFr", target = "nameFr")
    @Mapping(source = "hobbyRequestModel.descriptionEn", target = "descriptionEn")
    @Mapping(source = "hobbyRequestModel.descriptionFr", target = "descriptionFr")
    @Mapping(source = "hobbyRequestModel.iconUrl", target = "iconUrl")
    Hobby toEntity(HobbyRequestModel hobbyRequestModel);
}

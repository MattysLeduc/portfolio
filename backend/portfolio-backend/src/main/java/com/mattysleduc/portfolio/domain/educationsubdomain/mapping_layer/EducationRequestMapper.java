package com.mattysleduc.portfolio.domain.educationsubdomain.mapping_layer;

import com.mattysleduc.portfolio.domain.educationsubdomain.data_access_layer.Education;
import com.mattysleduc.portfolio.domain.educationsubdomain.presentation_layer.EducationRequestModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface EducationRequestMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "educationIdentifier",
            expression = "java(new com.mattysleduc.portfolio.domain.educationsubdomain.data_access_layer.EducationIdentifier())")
    @Mapping(source = "model.degreeEn", target = "degreeEn")
    @Mapping(source = "model.degreeFr", target = "degreeFr")
    @Mapping(source = "model.institutionEn", target = "institutionEn")
    @Mapping(source = "model.institutionFr", target = "institutionFr")
    @Mapping(source = "model.locationEn", target = "locationEn")
    @Mapping(source = "model.locationFr", target = "locationFr")
    @Mapping(source = "model.descriptionEn", target = "descriptionEn")
    @Mapping(source = "model.descriptionFr", target = "descriptionFr")
    @Mapping(source = "model.startDate", target = "startDate")
    @Mapping(source = "model.endDate", target = "endDate")
    Education toEntity(EducationRequestModel model);
}

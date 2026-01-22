package com.mattysleduc.portfolio.domain.educationsubdomain.mapping_layer;

import com.mattysleduc.portfolio.domain.educationsubdomain.data_access_layer.Education;
import com.mattysleduc.portfolio.domain.educationsubdomain.presentation_layer.EducationResponseModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface EducationResponseMapper {

    @Mapping(source = "education.educationIdentifier.educationId", target = "educationId")
    @Mapping(source = "education.degreeEn", target = "degreeEn")
    @Mapping(source = "education.degreeFr", target = "degreeFr")
    @Mapping(source = "education.institutionEn", target = "institutionEn")
    @Mapping(source = "education.institutionFr", target = "institutionFr")
    @Mapping(source = "education.locationEn", target = "locationEn")
    @Mapping(source = "education.locationFr", target = "locationFr")
    @Mapping(source = "education.descriptionEn", target = "descriptionEn")
    @Mapping(source = "education.descriptionFr", target = "descriptionFr")
    @Mapping(source = "education.startDate", target = "startDate")
    @Mapping(source = "education.endDate", target = "endDate")
    EducationResponseModel toResponseModel(Education education);
}

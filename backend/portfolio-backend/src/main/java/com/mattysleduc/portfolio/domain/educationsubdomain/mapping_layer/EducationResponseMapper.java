package com.mattysleduc.portfolio.domain.educationsubdomain.mapping_layer;

import com.mattysleduc.portfolio.domain.educationsubdomain.data_access_layer.Education;
import com.mattysleduc.portfolio.domain.educationsubdomain.presentation_layer.EducationResponseModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface EducationResponseMapper {

    @Mapping(source = "education.educationIdentifier.educationId", target = "educationId")
    @Mapping(source = "education.degreeEn", target = "degreeEn")
    @Mapping(source = "education.degreeFr", target = "degreeFr")
    @Mapping(source = "education.degreeEn", target = "degree")
    @Mapping(source = "education.institutionEn", target = "institutionEn")
    @Mapping(source = "education.institutionFr", target = "institutionFr")
    @Mapping(source = "education.institutionEn", target = "institution")
    @Mapping(source = "education.locationEn", target = "locationEn")
    @Mapping(source = "education.locationFr", target = "locationFr")
    @Mapping(source = "education.descriptionEn", target = "descriptionEn")
    @Mapping(source = "education.descriptionFr", target = "descriptionFr")
    @Mapping(source = "education.descriptionEn", target = "description")
    @Mapping(source = "education.startDate", target = "startDate")
    @Mapping(source = "education.endDate", target = "endDate")
    @Mapping(source = "education", target = "period", qualifiedByName = "formatPeriod")
    @Mapping(source = "education.gpa", target = "gpa")
    @Mapping(source = "education.type", target = "type")
    EducationResponseModel toResponseModel(Education education);
    
    @Named("formatPeriod")
    default String formatPeriod(Education education) {
        if (education.getStartDate() == null) {
            return "";
        }
        String period = education.getStartDate().getYear() + " - ";
        if (education.getEndDate() != null) {
            period += education.getEndDate().getYear();
        }
        return period;
    }
}

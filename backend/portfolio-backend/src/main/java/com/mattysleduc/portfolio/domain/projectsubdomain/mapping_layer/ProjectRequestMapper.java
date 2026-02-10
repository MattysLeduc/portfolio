package com.mattysleduc.portfolio.domain.projectsubdomain.mapping_layer;

import com.mattysleduc.portfolio.domain.projectsubdomain.data_access_layer.Project;
import com.mattysleduc.portfolio.domain.projectsubdomain.presentation_layer.ProjectRequestModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProjectRequestMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "projectIdentifier",
            expression = "java(new com.mattysleduc.portfolio.domain.projectsubdomain.data_access_layer.ProjectIdentifier())")
    @Mapping(source = "model.nameEn", target = "nameEn")
    @Mapping(source = "model.nameFr", target = "nameFr")
    @Mapping(source = "model.descriptionEn", target = "descriptionEn")
    @Mapping(source = "model.descriptionFr", target = "descriptionFr")
    @Mapping(source = "model.imageUrl", target = "imageUrl")
    @Mapping(source = "model.technologies", target = "technologies")
    @Mapping(source = "model.repoUrl", target = "repoUrl")
    @Mapping(source = "model.demoUrl", target = "demoUrl")
    @Mapping(source = "model.featured", target = "featured")
    Project toEntity(ProjectRequestModel model);
}

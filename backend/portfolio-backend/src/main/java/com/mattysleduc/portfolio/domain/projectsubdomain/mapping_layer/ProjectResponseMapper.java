package com.mattysleduc.portfolio.domain.projectsubdomain.mapping_layer;

import com.mattysleduc.portfolio.domain.projectsubdomain.data_access_layer.Project;
import com.mattysleduc.portfolio.domain.projectsubdomain.presentation_layer.ProjectResponseModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProjectResponseMapper {

    @Mapping(source = "project.projectIdentifier.projectId", target = "projectId")
    @Mapping(source = "project.nameEn", target = "nameEn")
    @Mapping(source = "project.nameFr", target = "nameFr")
    @Mapping(source = "project.descriptionEn", target = "descriptionEn")
    @Mapping(source = "project.descriptionFr", target = "descriptionFr")
    @Mapping(source = "project.imageUrl", target = "imageUrl")
    @Mapping(source = "project.repoUrl", target = "repoUrl")
    @Mapping(source = "project.demoUrl", target = "demoUrl")
    @Mapping(source = "project.featured", target = "featured")
    ProjectResponseModel toResponseModel(Project project);
}

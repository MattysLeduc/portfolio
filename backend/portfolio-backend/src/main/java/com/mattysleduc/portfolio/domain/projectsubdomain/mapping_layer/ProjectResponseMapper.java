package com.mattysleduc.portfolio.domain.projectsubdomain.mapping_layer;

import com.mattysleduc.portfolio.domain.projectsubdomain.data_access_layer.Project;
import com.mattysleduc.portfolio.domain.projectsubdomain.presentation_layer.ProjectResponseModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.Arrays;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ProjectResponseMapper {

    @Mapping(source = "project.projectIdentifier.projectId", target = "projectId")
    @Mapping(source = "project.nameEn", target = "nameEn")
    @Mapping(source = "project.nameFr", target = "nameFr")
    @Mapping(source = "project.nameEn", target = "title")
    @Mapping(source = "project.nameEn", target = "description")
    @Mapping(source = "project.descriptionEn", target = "descriptionEn")
    @Mapping(source = "project.descriptionFr", target = "descriptionFr")
    @Mapping(source = "project.imageUrl", target = "imageUrl")
    @Mapping(source = "project.technologies", target = "technologies")
    @Mapping(source = "project.technologies", target = "tech", qualifiedByName = "technologiesToList")
    @Mapping(source = "project.repoUrl", target = "repoUrl")
    @Mapping(source = "project.repoUrl", target = "github")
    @Mapping(source = "project.demoUrl", target = "demoUrl")
    @Mapping(source = "project.demoUrl", target = "live")
    @Mapping(source = "project.featured", target = "featured")
    ProjectResponseModel toResponseModel(Project project);
    
    @Named("technologiesToList")
    default List<String> technologiesToList(String technologies) {
        if (technologies == null || technologies.isEmpty()) {
            return List.of();
        }
        return Arrays.asList(technologies.split(",\\s*"));
    }
}

package com.mattysleduc.portfolio.domain.projectsubdomain.business_layer;

import com.mattysleduc.portfolio.domain.projectsubdomain.presentation_layer.ProjectRequestModel;
import com.mattysleduc.portfolio.domain.projectsubdomain.presentation_layer.ProjectResponseModel;

import java.util.List;

public interface ProjectService {
    List<ProjectResponseModel> getAllProjects();
    List<ProjectResponseModel> getFeaturedProjects();
    ProjectResponseModel getProjectById(String projectId);
    ProjectResponseModel createProject(ProjectRequestModel model);
    ProjectResponseModel updateProject(String projectId, ProjectRequestModel model);
    void deleteProject(String projectId);
}

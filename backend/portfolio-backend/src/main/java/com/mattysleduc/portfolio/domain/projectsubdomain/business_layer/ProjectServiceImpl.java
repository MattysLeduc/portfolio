package com.mattysleduc.portfolio.domain.projectsubdomain.business_layer;

import com.mattysleduc.portfolio.domain.projectsubdomain.data_access_layer.Project;
import com.mattysleduc.portfolio.domain.projectsubdomain.data_access_layer.ProjectIdentifier;
import com.mattysleduc.portfolio.domain.projectsubdomain.data_access_layer.ProjectRepository;
import com.mattysleduc.portfolio.domain.projectsubdomain.mapping_layer.ProjectRequestMapper;
import com.mattysleduc.portfolio.domain.projectsubdomain.mapping_layer.ProjectResponseMapper;
import com.mattysleduc.portfolio.domain.projectsubdomain.presentation_layer.ProjectRequestModel;
import com.mattysleduc.portfolio.domain.projectsubdomain.presentation_layer.ProjectResponseModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository repository;
    private final ProjectResponseMapper responseMapper;
    private final ProjectRequestMapper requestMapper;

    public ProjectServiceImpl(ProjectRepository repository,
                              ProjectResponseMapper responseMapper,
                              ProjectRequestMapper requestMapper) {
        this.repository = repository;
        this.responseMapper = responseMapper;
        this.requestMapper = requestMapper;
    }

    @Override
    public List<ProjectResponseModel> getAllProjects() {
        return repository.findAll()
                .stream()
                .map(responseMapper::toResponseModel)
                .toList();
    }

    @Override
    public List<ProjectResponseModel> getFeaturedProjects() {
        return repository.findByFeaturedTrue()
                .stream()
                .map(responseMapper::toResponseModel)
                .toList();
    }

    @Override
    public ProjectResponseModel getProjectById(String projectId) {
        Project project = repository.findProjectByProjectIdentifier_ProjectId(projectId);
        return responseMapper.toResponseModel(project);
    }

    @Override
    public ProjectResponseModel createProject(ProjectRequestModel model) {
        Project project = requestMapper.toEntity(model);
        project.setProjectIdentifier(new ProjectIdentifier());
        return responseMapper.toResponseModel(repository.save(project));
    }

    @Override
    public ProjectResponseModel updateProject(String projectId, ProjectRequestModel model) {
        Project project = repository.findProjectByProjectIdentifier_ProjectId(projectId);

        project.setNameEn(model.getNameEn());
        project.setNameFr(model.getNameFr());
        project.setDescriptionEn(model.getDescriptionEn());
        project.setDescriptionFr(model.getDescriptionFr());
        project.setImageUrl(model.getImageUrl());
        project.setTechnologies(model.getTechnologies());
        project.setRepoUrl(model.getRepoUrl());
        project.setDemoUrl(model.getDemoUrl());
        project.setFeatured(model.isFeatured());

        return responseMapper.toResponseModel(repository.save(project));
    }

    @Override
    public void deleteProject(String projectId) {
        Project project = repository.findProjectByProjectIdentifier_ProjectId(projectId);
        repository.delete(project);
    }
}

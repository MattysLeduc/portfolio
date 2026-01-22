package com.mattysleduc.portfolio.domain.projectsubdomain.data_access_layer;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Integer> {
    Project findProjectByProjectIdentifier_ProjectId(String projectId);
    List<Project> findByFeaturedTrue();
}

package com.mattysleduc.portfolio.domain.experiencesubdomain.data_access_layer;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ExperienceRepository extends JpaRepository<Experience, Integer> {
	Experience findByExperienceIdentifier_ExperienceId(String experienceId);
}

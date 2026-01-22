package com.mattysleduc.portfolio.domain.educationsubdomain.data_access_layer;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EducationRepository extends JpaRepository<Education, Integer> {
    Education findEducationByEducationIdentifier_EducationId(String educationId);
}

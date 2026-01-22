package com.mattysleduc.portfolio.domain.experiencesubdomain.business_layer;

import com.mattysleduc.portfolio.domain.experiencesubdomain.presentation_layer.ExperienceRequestModel;
import com.mattysleduc.portfolio.domain.experiencesubdomain.presentation_layer.ExperienceResponseModel;

import java.util.List;

public interface ExperienceService {
    List<ExperienceResponseModel> getPublicExperiences();

    // Admin operations
    List<ExperienceResponseModel> getAllExperiences();
    ExperienceResponseModel createExperience(ExperienceRequestModel model);
    ExperienceResponseModel updateExperience(String experienceId, ExperienceRequestModel model);
    void deleteExperience(String experienceId);
}

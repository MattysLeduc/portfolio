package com.mattysleduc.portfolio.domain.educationsubdomain.business_layer;

import com.mattysleduc.portfolio.domain.educationsubdomain.presentation_layer.EducationRequestModel;
import com.mattysleduc.portfolio.domain.educationsubdomain.presentation_layer.EducationResponseModel;

import java.util.List;

public interface EducationService {
    List<EducationResponseModel> getAllEducation();
    EducationResponseModel getEducationById(String educationId);
    EducationResponseModel createEducation(EducationRequestModel model);
    EducationResponseModel updateEducation(String educationId, EducationRequestModel model);
    void deleteEducation(String educationId);
}

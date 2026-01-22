package com.mattysleduc.portfolio.domain.educationsubdomain.business_layer;

import com.mattysleduc.portfolio.domain.educationsubdomain.data_access_layer.Education;
import com.mattysleduc.portfolio.domain.educationsubdomain.data_access_layer.EducationIdentifier;
import com.mattysleduc.portfolio.domain.educationsubdomain.data_access_layer.EducationRepository;
import com.mattysleduc.portfolio.domain.educationsubdomain.mapping_layer.EducationRequestMapper;
import com.mattysleduc.portfolio.domain.educationsubdomain.mapping_layer.EducationResponseMapper;
import com.mattysleduc.portfolio.domain.educationsubdomain.presentation_layer.EducationRequestModel;
import com.mattysleduc.portfolio.domain.educationsubdomain.presentation_layer.EducationResponseModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EducationServiceImpl implements EducationService {

    private final EducationRepository repository;
    private final EducationResponseMapper responseMapper;
    private final EducationRequestMapper requestMapper;

    public EducationServiceImpl(EducationRepository repository,
                                EducationResponseMapper responseMapper,
                                EducationRequestMapper requestMapper) {
        this.repository = repository;
        this.responseMapper = responseMapper;
        this.requestMapper = requestMapper;
    }

    @Override
    public List<EducationResponseModel> getAllEducation() {
        return repository.findAll()
                .stream()
                .map(responseMapper::toResponseModel)
                .toList();
    }

    @Override
    public EducationResponseModel getEducationById(String educationId) {
        Education education = repository.findEducationByEducationIdentifier_EducationId(educationId);
        return responseMapper.toResponseModel(education);
    }

    @Override
    public EducationResponseModel createEducation(EducationRequestModel model) {
        Education education = requestMapper.toEntity(model);
        education.setEducationIdentifier(new EducationIdentifier());
        return responseMapper.toResponseModel(repository.save(education));
    }

    @Override
    public EducationResponseModel updateEducation(String educationId, EducationRequestModel model) {
        Education education = repository.findEducationByEducationIdentifier_EducationId(educationId);

        education.setDegreeEn(model.getDegreeEn());
        education.setDegreeFr(model.getDegreeFr());
        education.setInstitutionEn(model.getInstitutionEn());
        education.setInstitutionFr(model.getInstitutionFr());
        education.setLocationEn(model.getLocationEn());
        education.setLocationFr(model.getLocationFr());
        education.setDescriptionEn(model.getDescriptionEn());
        education.setDescriptionFr(model.getDescriptionFr());
        education.setStartDate(model.getStartDate());
        education.setEndDate(model.getEndDate());

        return responseMapper.toResponseModel(repository.save(education));
    }

    @Override
    public void deleteEducation(String educationId) {
        Education education = repository.findEducationByEducationIdentifier_EducationId(educationId);
        repository.delete(education);
    }
}

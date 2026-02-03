package com.mattysleduc.portfolio.domain.experiencesubdomain.business_layer;

import com.mattysleduc.portfolio.domain.experiencesubdomain.data_access_layer.Experience;
import com.mattysleduc.portfolio.domain.experiencesubdomain.data_access_layer.ExperienceIdentifier;
import com.mattysleduc.portfolio.domain.experiencesubdomain.data_access_layer.ExperienceRepository;
import com.mattysleduc.portfolio.domain.experiencesubdomain.presentation_layer.ExperienceRequestModel;
import com.mattysleduc.portfolio.domain.experiencesubdomain.presentation_layer.ExperienceResponseModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExperienceServiceImpl implements ExperienceService {

    private final ExperienceRepository repository;

    public ExperienceServiceImpl(ExperienceRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<ExperienceResponseModel> getPublicExperiences() {
        return repository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public List<ExperienceResponseModel> getAllExperiences() {
        return repository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public ExperienceResponseModel createExperience(ExperienceRequestModel model) {
        Experience entity = new Experience();
        apply(model, entity);
        if (entity.getExperienceIdentifier() == null) {
            entity.setExperienceIdentifier(ExperienceIdentifier.create());
        }
        return toResponse(repository.save(entity));
    }

    @Override
    public ExperienceResponseModel updateExperience(String experienceId, ExperienceRequestModel model) {
        Experience entity = repository.findByExperienceIdentifier_ExperienceId(experienceId);
        if (entity == null) {
            throw new IllegalArgumentException("Experience not found: " + experienceId);
        }
        apply(model, entity);
        return toResponse(repository.save(entity));
    }

    @Override
    public void deleteExperience(String experienceId) {
        Experience entity = repository.findByExperienceIdentifier_ExperienceId(experienceId);
        if (entity == null) {
            throw new IllegalArgumentException("Experience not found: " + experienceId);
        }
        repository.delete(entity);
    }

    private ExperienceResponseModel toResponse(Experience entity) {
        if (entity.getExperienceIdentifier() == null) {
            entity.setExperienceIdentifier(ExperienceIdentifier.create());
        }
        
        // Format period
        String period = "";
        if (entity.getStartDate() != null) {
            period = entity.getStartDate().getYear() + " - ";
            if (entity.isCurrent()) {
                period += "Present";
            } else if (entity.getEndDate() != null) {
                period += entity.getEndDate().getYear();
            }
        }
        
        // Parse achievements from responsibilities (English by default)
        java.util.List<String> achievements = null;
        if (entity.getResponsibilitiesEn() != null && !entity.getResponsibilitiesEn().isEmpty()) {
            achievements = java.util.Arrays.asList(entity.getResponsibilitiesEn().split("\\n"));
        }
        
        return ExperienceResponseModel.builder()
                .experienceId(entity.getExperienceIdentifier().getExperienceId())
            .title(entity.getTitleEn())
            .titleEn(entity.getTitleEn())
            .titleFr(entity.getTitleFr())
            .company(entity.getCompanyEn())
            .companyEn(entity.getCompanyEn())
            .companyFr(entity.getCompanyFr())
            .location(entity.getLocationEn())
            .locationEn(entity.getLocationEn())
            .locationFr(entity.getLocationFr())
                .startDate(entity.getStartDate())
                .endDate(entity.getEndDate())
                .current(entity.isCurrent())
                .period(period)
            .description(entity.getDescriptionEn())
            .descriptionEn(entity.getDescriptionEn())
            .descriptionFr(entity.getDescriptionFr())
                .achievements(achievements)
            .responsibilities(entity.getResponsibilitiesEn())
            .responsibilitiesEn(entity.getResponsibilitiesEn())
            .responsibilitiesFr(entity.getResponsibilitiesFr())
                .build();
    }

    private void apply(ExperienceRequestModel model, Experience entity) {
        String titleEn = model.getTitleEn() != null ? model.getTitleEn() : model.getTitle();
        String titleFr = model.getTitleFr() != null ? model.getTitleFr() : model.getTitle();
        String companyEn = model.getCompanyEn() != null ? model.getCompanyEn() : model.getCompany();
        String companyFr = model.getCompanyFr() != null ? model.getCompanyFr() : model.getCompany();
        String locationEn = model.getLocationEn() != null ? model.getLocationEn() : model.getLocation();
        String locationFr = model.getLocationFr() != null ? model.getLocationFr() : model.getLocation();
        String descriptionEn = model.getDescriptionEn() != null ? model.getDescriptionEn() : model.getDescription();
        String descriptionFr = model.getDescriptionFr() != null ? model.getDescriptionFr() : model.getDescription();

        entity.setTitleEn(titleEn);
        entity.setTitleFr(titleFr);
        entity.setCompanyEn(companyEn);
        entity.setCompanyFr(companyFr);
        entity.setLocationEn(locationEn);
        entity.setLocationFr(locationFr);
        entity.setStartDate(model.getStartDate());
        entity.setEndDate(model.getEndDate());
        entity.setCurrent(model.isCurrent());
        entity.setDescriptionEn(descriptionEn);
        entity.setDescriptionFr(descriptionFr);
        if (model.getResponsibilitiesEn() != null) {
            entity.setResponsibilitiesEn(model.getResponsibilitiesEn());
        }
        if (model.getResponsibilitiesFr() != null) {
            entity.setResponsibilitiesFr(model.getResponsibilitiesFr());
        }
    }
}

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
        
        // Parse achievements from responsibilities
        java.util.List<String> achievements = null;
        if (entity.getResponsibilities() != null && !entity.getResponsibilities().isEmpty()) {
            achievements = java.util.Arrays.asList(entity.getResponsibilities().split("\\n"));
        }
        
        return ExperienceResponseModel.builder()
                .experienceId(entity.getExperienceIdentifier().getExperienceId())
                .title(entity.getTitle())
                .company(entity.getCompany())
                .location(entity.getLocation())
                .startDate(entity.getStartDate())
                .endDate(entity.getEndDate())
                .current(entity.isCurrent())
                .period(period)
                .description(entity.getDescription())
                .achievements(achievements)
                .responsibilities(entity.getResponsibilities())
                .build();
    }

    private void apply(ExperienceRequestModel model, Experience entity) {
        entity.setTitle(model.getTitle());
        entity.setCompany(model.getCompany());
        entity.setLocation(model.getLocation());
        entity.setStartDate(model.getStartDate());
        entity.setEndDate(model.getEndDate());
        entity.setCurrent(model.isCurrent());
        entity.setDescription(model.getDescription());
    }
}

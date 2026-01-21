package com.mattysleduc.portfolio.domain.skillsubdomain.business_layer;

import com.mattysleduc.portfolio.domain.skillsubdomain.data_access_layer.Skill;
import com.mattysleduc.portfolio.domain.skillsubdomain.data_access_layer.SkillIdentifier;
import com.mattysleduc.portfolio.domain.skillsubdomain.data_access_layer.SkillRepository;
import com.mattysleduc.portfolio.domain.skillsubdomain.mapping_layer.SkillRequestMapper;
import com.mattysleduc.portfolio.domain.skillsubdomain.mapping_layer.SkillResponseMapper;
import com.mattysleduc.portfolio.domain.skillsubdomain.presentation_layer.SkillRequestModel;
import com.mattysleduc.portfolio.domain.skillsubdomain.presentation_layer.SkillResponseModel;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class SkillServiceImpl implements SkillService {

    private final SkillRepository repository;
    private final SkillResponseMapper responseMapper;
    private final SkillRequestMapper requestMapper;

    public SkillServiceImpl(SkillRepository repository,
                            SkillResponseMapper responseMapper,
                            SkillRequestMapper requestMapper) {
        this.repository = repository;
        this.responseMapper = responseMapper;
        this.requestMapper = requestMapper;
    }

    @Override
    public List<SkillResponseModel> getAllSkills() {
        return repository.findAll()
                .stream()
                .map(responseMapper::toResponseModel)
                .toList();
    }

    @Override
    public SkillResponseModel getSkillById(String skillId) {
        Skill skill = repository.findSkillBySkillIdentifier_SkillId(skillId);
        return responseMapper.toResponseModel(skill);
    }

    @Override
    public SkillResponseModel createSkill(SkillRequestModel model) {
        Skill skill = requestMapper.toEntity(model);
        skill.setSkillIdentifier(new SkillIdentifier());
        return responseMapper.toResponseModel(repository.save(skill));
    }

    @Override
    public SkillResponseModel updateSkill(String skillId, SkillRequestModel model) {
        Skill skill = repository.findSkillBySkillIdentifier_SkillId(skillId);

        skill.setName(model.getName());
        skill.setDescription(model.getDescription());
        return responseMapper.toResponseModel(repository.save(skill));
    }

    @Override
    public void deleteSkill(String skillId) {
        Skill skill = repository.findSkillBySkillIdentifier_SkillId(skillId);
        repository.delete(skill);
    }
}
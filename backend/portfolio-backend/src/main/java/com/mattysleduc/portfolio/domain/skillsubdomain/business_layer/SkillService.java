package com.mattysleduc.portfolio.domain.skillsubdomain.business_layer;

import com.mattysleduc.portfolio.domain.skillsubdomain.presentation_layer.SkillRequestModel;
import com.mattysleduc.portfolio.domain.skillsubdomain.presentation_layer.SkillResponseModel;

import java.util.List;

public interface SkillService {
    List<SkillResponseModel> getAllSkills();
    SkillResponseModel getSkillById(String skillId);
    SkillResponseModel createSkill(SkillRequestModel model);
    SkillResponseModel updateSkill(String skillId, SkillRequestModel model);
    void deleteSkill(String skillId);
}

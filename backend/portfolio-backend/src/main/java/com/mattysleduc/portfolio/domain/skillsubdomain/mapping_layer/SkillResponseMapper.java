package com.mattysleduc.portfolio.domain.skillsubdomain.mapping_layer;

import com.mattysleduc.portfolio.domain.skillsubdomain.data_access_layer.Skill;
import com.mattysleduc.portfolio.domain.skillsubdomain.presentation_layer.SkillResponseModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SkillResponseMapper {

    @Mapping(source = "skill.skillIdentifier.skillId", target = "skillId")
    @Mapping(source = "skill.name", target = "name")
    @Mapping(source = "skill.description", target = "description")
    SkillResponseModel toResponseModel(Skill skill);
}

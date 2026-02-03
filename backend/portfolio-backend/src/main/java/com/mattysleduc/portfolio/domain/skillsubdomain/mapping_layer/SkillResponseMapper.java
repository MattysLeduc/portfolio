package com.mattysleduc.portfolio.domain.skillsubdomain.mapping_layer;

import com.mattysleduc.portfolio.domain.skillsubdomain.data_access_layer.Skill;
import com.mattysleduc.portfolio.domain.skillsubdomain.presentation_layer.SkillResponseModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SkillResponseMapper {

    @Mapping(source = "skill.skillIdentifier.skillId", target = "skillId")
    @Mapping(source = "skill.nameEn", target = "name")
    @Mapping(source = "skill.descriptionEn", target = "description")
    @Mapping(source = "skill.nameEn", target = "nameEn")
    @Mapping(source = "skill.nameFr", target = "nameFr")
    @Mapping(source = "skill.descriptionEn", target = "descriptionEn")
    @Mapping(source = "skill.descriptionFr", target = "descriptionFr")
    @Mapping(source = "skill.category", target = "category")
    @Mapping(source = "skill.level", target = "level")
    SkillResponseModel toResponseModel(Skill skill);
}

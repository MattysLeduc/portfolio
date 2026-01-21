package com.mattysleduc.portfolio.domain.skillsubdomain.mapping_layer;

import com.mattysleduc.portfolio.domain.skillsubdomain.data_access_layer.Skill;
import com.mattysleduc.portfolio.domain.skillsubdomain.presentation_layer.SkillRequestModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SkillRequestMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "skillIdentifier",
            expression = "java(new com.mattysleduc.portfolio.domain.skillsubdomain.data_access_layer.SkillIdentifier())")
    @Mapping(source = "skillRequestModel.name", target = "name")
    @Mapping(source = "skillRequestModel.description", target = "description")
    Skill toEntity(SkillRequestModel skillRequestModel);
}

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
    @Mapping(source = "skillRequestModel.nameEn", target = "nameEn")
    @Mapping(source = "skillRequestModel.nameFr", target = "nameFr")
    @Mapping(source = "skillRequestModel.descriptionEn", target = "descriptionEn")
    @Mapping(source = "skillRequestModel.descriptionFr", target = "descriptionFr")
    @Mapping(source = "skillRequestModel.category", target = "category")
    @Mapping(source = "skillRequestModel.level", target = "level")
    Skill toEntity(SkillRequestModel skillRequestModel);
}

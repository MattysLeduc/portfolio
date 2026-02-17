package com.mattysleduc.portfolio.domain.personalinfosubdomain.mapping_layer;

import com.mattysleduc.portfolio.domain.personalinfosubdomain.data_access_layer.PersonalInfo;
import com.mattysleduc.portfolio.domain.personalinfosubdomain.presentation_layer.PersonalInfoResponseModel;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PersonalInfoResponseMapper {
    PersonalInfoResponseModel toResponseModel(PersonalInfo entity);
}

package com.mattysleduc.portfolio.domain.personalinfosubdomain.mapping_layer;

import com.mattysleduc.portfolio.domain.personalinfosubdomain.data_access_layer.PersonalInfo;
import com.mattysleduc.portfolio.domain.personalinfosubdomain.presentation_layer.PersonalInfoRequestModel;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PersonalInfoRequestMapper {
    PersonalInfo toEntity(PersonalInfoRequestModel model);
}

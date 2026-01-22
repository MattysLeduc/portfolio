package com.mattysleduc.portfolio.domain.contactsubdomain.mapping_layer;

import com.mattysleduc.portfolio.domain.contactsubdomain.data_access_layer.ContactInfo;
import com.mattysleduc.portfolio.domain.contactsubdomain.presentation_layer.ContactInfoRequestModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ContactInfoRequestMapper {

    @Mapping(target = "id", ignore = true)
    ContactInfo toEntity(ContactInfoRequestModel model);
}

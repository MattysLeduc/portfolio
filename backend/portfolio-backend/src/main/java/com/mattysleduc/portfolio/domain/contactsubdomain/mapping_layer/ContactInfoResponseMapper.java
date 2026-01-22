package com.mattysleduc.portfolio.domain.contactsubdomain.mapping_layer;

import com.mattysleduc.portfolio.domain.contactsubdomain.data_access_layer.ContactInfo;
import com.mattysleduc.portfolio.domain.contactsubdomain.presentation_layer.ContactInfoResponseModel;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ContactInfoResponseMapper {

    ContactInfoResponseModel toResponseModel(ContactInfo entity);
}

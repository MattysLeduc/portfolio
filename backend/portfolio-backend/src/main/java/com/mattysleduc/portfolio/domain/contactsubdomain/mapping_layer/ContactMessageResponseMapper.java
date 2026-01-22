package com.mattysleduc.portfolio.domain.contactsubdomain.mapping_layer;

import com.mattysleduc.portfolio.domain.contactsubdomain.data_access_layer.ContactMessage;
import com.mattysleduc.portfolio.domain.contactsubdomain.presentation_layer.ContactMessageResponseModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ContactMessageResponseMapper {

    @Mapping(source = "entity.contactMessageIdentifier.messageId", target = "messageId")
    ContactMessageResponseModel toResponseModel(ContactMessage entity);
}

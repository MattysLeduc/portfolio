package com.mattysleduc.portfolio.domain.contactsubdomain.mapping_layer;

import com.mattysleduc.portfolio.domain.contactsubdomain.data_access_layer.ContactMessage;
import com.mattysleduc.portfolio.domain.contactsubdomain.presentation_layer.ContactMessageRequestModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ContactMessageRequestMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "contactMessageIdentifier",
            expression = "java(new com.mattysleduc.portfolio.domain.contactsubdomain.data_access_layer.ContactMessageIdentifier())")
    @Mapping(source = "model.name", target = "name")
    @Mapping(source = "model.email", target = "email")
    @Mapping(source = "model.subject", target = "subject")
    @Mapping(source = "model.message", target = "message")
    @Mapping(target = "createdAt", expression = "java(java.time.OffsetDateTime.now())")
    @Mapping(target = "read", constant = "false")
    ContactMessage toEntity(ContactMessageRequestModel model);
}

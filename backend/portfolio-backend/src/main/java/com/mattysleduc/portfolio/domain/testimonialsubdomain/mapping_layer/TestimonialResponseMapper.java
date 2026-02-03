package com.mattysleduc.portfolio.domain.testimonialsubdomain.mapping_layer;

import com.mattysleduc.portfolio.domain.testimonialsubdomain.data_access_layer.Testimonial;
import com.mattysleduc.portfolio.domain.testimonialsubdomain.presentation_layer.TestimonialResponseModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TestimonialResponseMapper {

    @Mapping(source = "entity.testimonialIdentifier.testimonialId", target = "testimonialId")
    @Mapping(source = "entity.authorName", target = "authorName")
    @Mapping(source = "entity.authorName", target = "name")
    @Mapping(source = "entity.authorTitleEn", target = "authorTitle")
    @Mapping(source = "entity.authorTitleEn", target = "role")
    @Mapping(source = "entity.authorTitleEn", target = "position")
    @Mapping(source = "entity.authorTitleEn", target = "authorTitleEn")
    @Mapping(source = "entity.authorTitleFr", target = "authorTitleFr")
    @Mapping(source = "entity.company", target = "company")
    @Mapping(source = "entity.authorImage", target = "authorImage")
    @Mapping(source = "entity.contentEn", target = "content")
    @Mapping(source = "entity.contentEn", target = "message")
    @Mapping(source = "entity.contentEn", target = "contentEn")
    @Mapping(source = "entity.contentFr", target = "contentFr")
    @Mapping(source = "entity.rating", target = "rating")
    @Mapping(source = "entity.createdAt", target = "createdAt")
    @Mapping(source = "entity.status", target = "status")
    @Mapping(source = "entity.rejectionReason", target = "rejectionReason")
    TestimonialResponseModel toResponseModel(Testimonial entity);
}

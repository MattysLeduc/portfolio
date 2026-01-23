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
    @Mapping(source = "entity.authorTitle", target = "authorTitle")
    @Mapping(source = "entity.authorTitle", target = "role")
    @Mapping(source = "entity.authorTitle", target = "position")
    @Mapping(source = "entity.company", target = "company")
    @Mapping(source = "entity.authorImage", target = "authorImage")
    @Mapping(source = "entity.content", target = "content")
    @Mapping(source = "entity.content", target = "message")
    @Mapping(source = "entity.rating", target = "rating")
    @Mapping(source = "entity.createdAt", target = "createdAt")
    @Mapping(source = "entity.status", target = "status")
    @Mapping(source = "entity.rejectionReason", target = "rejectionReason")
    TestimonialResponseModel toResponseModel(Testimonial entity);
}

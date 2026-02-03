package com.mattysleduc.portfolio.domain.testimonialsubdomain.mapping_layer;

import com.mattysleduc.portfolio.domain.testimonialsubdomain.data_access_layer.Testimonial;
import com.mattysleduc.portfolio.domain.testimonialsubdomain.data_access_layer.TestimonialIdentifier;
import com.mattysleduc.portfolio.domain.testimonialsubdomain.data_access_layer.TestimonialStatus;
import com.mattysleduc.portfolio.domain.testimonialsubdomain.presentation_layer.TestimonialRequestModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TestimonialRequestMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "testimonialIdentifier",
            expression = "java(new com.mattysleduc.portfolio.domain.testimonialsubdomain.data_access_layer.TestimonialIdentifier())")
    @Mapping(source = "model.authorName", target = "authorName")
        @Mapping(source = "model.authorTitleEn", target = "authorTitleEn")
        @Mapping(source = "model.authorTitleFr", target = "authorTitleFr")
        @Mapping(source = "model.company", target = "company")
    @Mapping(source = "model.authorImage", target = "authorImage")
        @Mapping(source = "model.contentEn", target = "contentEn")
        @Mapping(source = "model.contentFr", target = "contentFr")
    @Mapping(source = "model.rating", target = "rating")
    @Mapping(target = "createdAt", expression = "java(java.time.OffsetDateTime.now())")
    @Mapping(target = "status", expression = "java(com.mattysleduc.portfolio.domain.testimonialsubdomain.data_access_layer.TestimonialStatus.PENDING)")
    @Mapping(target = "rejectionReason", ignore = true)
    Testimonial toEntity(TestimonialRequestModel model);
}

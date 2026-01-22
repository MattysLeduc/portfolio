package com.mattysleduc.portfolio.domain.testimonialsubdomain.mapping_layer;

import com.mattysleduc.portfolio.domain.testimonialsubdomain.data_access_layer.Testimonial;
import com.mattysleduc.portfolio.domain.testimonialsubdomain.presentation_layer.TestimonialResponseModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TestimonialResponseMapper {

    @Mapping(source = "entity.testimonialIdentifier.testimonialId", target = "testimonialId")
    @Mapping(source = "entity.status", target = "status")
    TestimonialResponseModel toResponseModel(Testimonial entity);
}

package com.mattysleduc.portfolio.domain.testimonialsubdomain.business_layer;

import com.mattysleduc.portfolio.domain.testimonialsubdomain.presentation_layer.RejectRequestModel;
import com.mattysleduc.portfolio.domain.testimonialsubdomain.presentation_layer.TestimonialRequestModel;
import com.mattysleduc.portfolio.domain.testimonialsubdomain.presentation_layer.TestimonialResponseModel;

import java.util.List;

public interface TestimonialService {
    List<TestimonialResponseModel> getApprovedTestimonials();
    List<TestimonialResponseModel> getPendingTestimonials();
    List<TestimonialResponseModel> getAllTestimonials();

    TestimonialResponseModel submitTestimonial(TestimonialRequestModel model);
    TestimonialResponseModel approveTestimonial(String testimonialId);
    TestimonialResponseModel rejectTestimonial(String testimonialId, String reason);
    void deleteTestimonial(String testimonialId);
}

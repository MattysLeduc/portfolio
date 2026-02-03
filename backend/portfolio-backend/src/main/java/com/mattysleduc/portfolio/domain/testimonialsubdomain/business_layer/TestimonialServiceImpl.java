package com.mattysleduc.portfolio.domain.testimonialsubdomain.business_layer;

import com.mattysleduc.portfolio.domain.testimonialsubdomain.data_access_layer.*;
import com.mattysleduc.portfolio.domain.testimonialsubdomain.mapping_layer.*;
import com.mattysleduc.portfolio.domain.testimonialsubdomain.presentation_layer.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestimonialServiceImpl implements TestimonialService {

    private final TestimonialRepository repository;
    private final TestimonialRequestMapper requestMapper;
    private final TestimonialResponseMapper responseMapper;

    public TestimonialServiceImpl(TestimonialRepository repository,
                                  TestimonialRequestMapper requestMapper,
                                  TestimonialResponseMapper responseMapper) {
        this.repository = repository;
        this.requestMapper = requestMapper;
        this.responseMapper = responseMapper;
    }

    @Override
    public List<TestimonialResponseModel> getApprovedTestimonials() {
        return repository.findByStatus(TestimonialStatus.APPROVED)
                .stream()
                .map(responseMapper::toResponseModel)
                .toList();
    }

    @Override
    public List<TestimonialResponseModel> getPendingTestimonials() {
        return repository.findByStatus(TestimonialStatus.PENDING)
                .stream()
                .map(responseMapper::toResponseModel)
                .toList();
    }

    @Override
    public List<TestimonialResponseModel> getAllTestimonials() {
        return repository.findAll().stream().map(responseMapper::toResponseModel).toList();
    }

    @Override
    public TestimonialResponseModel submitTestimonial(TestimonialRequestModel model) {
        Testimonial entity = requestMapper.toEntity(model);
        applyBilingualFallbacks(model, entity);
        return responseMapper.toResponseModel(repository.save(entity));
    }

    @Override
    public TestimonialResponseModel approveTestimonial(String testimonialId) {
        Testimonial entity = repository.findByTestimonialIdentifier_TestimonialId(testimonialId);
        entity.setStatus(TestimonialStatus.APPROVED);
        entity.setRejectionReason(null);
        return responseMapper.toResponseModel(repository.save(entity));
    }

    @Override
    public TestimonialResponseModel rejectTestimonial(String testimonialId, String reason) {
        Testimonial entity = repository.findByTestimonialIdentifier_TestimonialId(testimonialId);
        entity.setStatus(TestimonialStatus.REJECTED);
        entity.setRejectionReason(reason);
        return responseMapper.toResponseModel(repository.save(entity));
    }

    @Override
    public void deleteTestimonial(String testimonialId) {
        Testimonial entity = repository.findByTestimonialIdentifier_TestimonialId(testimonialId);
        repository.delete(entity);
    }

    private void applyBilingualFallbacks(TestimonialRequestModel model, Testimonial entity) {
        String contentEn = model.getContentEn() != null ? model.getContentEn() : model.getContent();
        String contentFr = model.getContentFr() != null ? model.getContentFr() : model.getContent();
        String titleEn = model.getAuthorTitleEn() != null ? model.getAuthorTitleEn() : model.getAuthorTitle();
        String titleFr = model.getAuthorTitleFr() != null ? model.getAuthorTitleFr() : model.getAuthorTitle();

        if (contentEn != null) {
            entity.setContentEn(contentEn);
        }
        if (contentFr != null) {
            entity.setContentFr(contentFr);
        }
        if (titleEn != null) {
            entity.setAuthorTitleEn(titleEn);
        }
        if (titleFr != null) {
            entity.setAuthorTitleFr(titleFr);
        }
        if (model.getCompany() != null) {
            entity.setCompany(model.getCompany());
        }
    }
}

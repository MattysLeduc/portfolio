package com.mattysleduc.portfolio.domain.resumesubdomain.business_layer;

import com.mattysleduc.portfolio.domain.resumesubdomain.presentation_layer.ResumeInfoResponseModel;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface ResumeService {
    ResumeInfoResponseModel uploadResume(String language, MultipartFile file);
    ResumeInfoResponseModel getResumeInfo(String language);
    Resource getResumeFile(String language);
}

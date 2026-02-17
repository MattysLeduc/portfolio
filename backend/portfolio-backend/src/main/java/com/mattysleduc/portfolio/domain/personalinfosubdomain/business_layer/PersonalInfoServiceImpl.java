package com.mattysleduc.portfolio.domain.personalinfosubdomain.business_layer;

import com.mattysleduc.portfolio.domain.personalinfosubdomain.data_access_layer.PersonalInfo;
import com.mattysleduc.portfolio.domain.personalinfosubdomain.data_access_layer.PersonalInfoRepository;
import com.mattysleduc.portfolio.domain.personalinfosubdomain.mapping_layer.PersonalInfoRequestMapper;
import com.mattysleduc.portfolio.domain.personalinfosubdomain.mapping_layer.PersonalInfoResponseMapper;
import com.mattysleduc.portfolio.domain.personalinfosubdomain.presentation_layer.PersonalInfoRequestModel;
import com.mattysleduc.portfolio.domain.personalinfosubdomain.presentation_layer.PersonalInfoResponseModel;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class PersonalInfoServiceImpl implements PersonalInfoService {

    private final PersonalInfoRepository repository;
    private final PersonalInfoResponseMapper responseMapper;
    private final PersonalInfoRequestMapper requestMapper;

    public PersonalInfoServiceImpl(PersonalInfoRepository repository,
                                   PersonalInfoResponseMapper responseMapper,
                                   PersonalInfoRequestMapper requestMapper) {
        this.repository = repository;
        this.responseMapper = responseMapper;
        this.requestMapper = requestMapper;
    }

    @Override
    public PersonalInfoResponseModel getPersonalInfo() {
        // Always retrieve record with ID=1
        PersonalInfo info = repository.findById(1)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Personal info not found"));
        
        return responseMapper.toResponseModel(info);
    }

    @Override
    public PersonalInfoResponseModel updatePersonalInfo(PersonalInfoRequestModel model) {
        // Always update record with ID=1
        PersonalInfo info = repository.findById(1)
                .orElse(new PersonalInfo());
        
        // If creating new, set ID to 1
        if (info.getId() == null) {
            info.setId(1);
        }
        
        info.setNameEn(model.getNameEn());
        info.setNameFr(model.getNameFr());
        info.setTaglineEn(model.getTaglineEn());
        info.setTaglineFr(model.getTaglineFr());
        info.setHeroWelcomeEn(model.getHeroWelcomeEn());
        info.setHeroWelcomeFr(model.getHeroWelcomeFr());
        info.setGithubUrl(model.getGithubUrl());
        info.setLinkedinUrl(model.getLinkedinUrl());
        info.setTwitterUrl(model.getTwitterUrl());
        info.setEmail(model.getEmail());
        info.setContactMessageEn(model.getContactMessageEn());
        info.setContactMessageFr(model.getContactMessageFr());
        info.setResumeEnUrl(model.getResumeEnUrl());
        info.setResumeFrUrl(model.getResumeFrUrl());
        
        return responseMapper.toResponseModel(repository.save(info));
    }
}

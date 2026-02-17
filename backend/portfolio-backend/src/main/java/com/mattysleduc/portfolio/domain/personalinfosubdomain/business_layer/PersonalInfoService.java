package com.mattysleduc.portfolio.domain.personalinfosubdomain.business_layer;

import com.mattysleduc.portfolio.domain.personalinfosubdomain.presentation_layer.PersonalInfoRequestModel;
import com.mattysleduc.portfolio.domain.personalinfosubdomain.presentation_layer.PersonalInfoResponseModel;

public interface PersonalInfoService {
    PersonalInfoResponseModel getPersonalInfo();
    PersonalInfoResponseModel updatePersonalInfo(PersonalInfoRequestModel model);
}

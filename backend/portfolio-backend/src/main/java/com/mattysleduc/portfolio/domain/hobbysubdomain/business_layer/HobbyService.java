package com.mattysleduc.portfolio.domain.hobbysubdomain.business_layer;

import com.mattysleduc.portfolio.domain.hobbysubdomain.presentation_layer.HobbyRequestModel;
import com.mattysleduc.portfolio.domain.hobbysubdomain.presentation_layer.HobbyResponseModel;

import java.util.List;

public interface HobbyService {
    List<HobbyResponseModel> getAllHobbies();
    HobbyResponseModel getHobbyById(String hobbyId);
    HobbyResponseModel createHobby(HobbyRequestModel model);
    HobbyResponseModel updateHobby(String hobbyId, HobbyRequestModel model);
    void deleteHobby(String hobbyId);
}

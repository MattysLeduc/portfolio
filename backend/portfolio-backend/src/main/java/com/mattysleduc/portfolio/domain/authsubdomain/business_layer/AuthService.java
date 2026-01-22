package com.mattysleduc.portfolio.domain.authsubdomain.business_layer;

import com.mattysleduc.portfolio.domain.authsubdomain.presentation_layer.AuthRequestModel;
import com.mattysleduc.portfolio.domain.authsubdomain.presentation_layer.AuthResponseModel;

public interface AuthService {
    AuthResponseModel login(AuthRequestModel request);
}

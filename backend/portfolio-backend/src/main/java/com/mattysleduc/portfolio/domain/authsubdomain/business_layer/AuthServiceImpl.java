package com.mattysleduc.portfolio.domain.authsubdomain.business_layer;

import com.mattysleduc.portfolio.domain.authsubdomain.config.JwtService;
import com.mattysleduc.portfolio.domain.authsubdomain.presentation_layer.AuthRequestModel;
import com.mattysleduc.portfolio.domain.authsubdomain.presentation_layer.AuthResponseModel;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthServiceImpl(AuthenticationManager authenticationManager, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @Override
    public AuthResponseModel login(AuthRequestModel request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token = jwtService.generateToken(userDetails);

        return new AuthResponseModel(token, userDetails.getUsername(), userDetails.getAuthorities());
    }
}

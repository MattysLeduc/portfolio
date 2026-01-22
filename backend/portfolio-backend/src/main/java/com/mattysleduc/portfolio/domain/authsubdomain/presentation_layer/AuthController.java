package com.mattysleduc.portfolio.domain.authsubdomain.presentation_layer;

import com.mattysleduc.portfolio.domain.authsubdomain.business_layer.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseModel> login(@RequestBody AuthRequestModel request) {
        return ResponseEntity.ok(authService.login(request));
    }
}

package com.mattysleduc.portfolio.domain.personalinfosubdomain.presentation_layer;

import com.mattysleduc.portfolio.domain.personalinfosubdomain.business_layer.PersonalInfoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/public/personal-info")
@CrossOrigin(origins = "*")
public class PersonalInfoController {

    private final PersonalInfoService service;

    public PersonalInfoController(PersonalInfoService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<PersonalInfoResponseModel> getPersonalInfo() {
        return ResponseEntity.ok(service.getPersonalInfo());
    }
}

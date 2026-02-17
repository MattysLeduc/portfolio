package com.mattysleduc.portfolio.domain.personalinfosubdomain.presentation_layer;

import com.mattysleduc.portfolio.domain.personalinfosubdomain.business_layer.PersonalInfoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/personal-info")
@CrossOrigin(origins = "*")
public class PersonalInfoAdminController {

    private final PersonalInfoService service;

    public PersonalInfoAdminController(PersonalInfoService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<PersonalInfoResponseModel> getPersonalInfo() {
        return ResponseEntity.ok(service.getPersonalInfo());
    }

    @PutMapping
    public ResponseEntity<PersonalInfoResponseModel> updatePersonalInfo(@RequestBody PersonalInfoRequestModel model) {
        return ResponseEntity.ok(service.updatePersonalInfo(model));
    }
}

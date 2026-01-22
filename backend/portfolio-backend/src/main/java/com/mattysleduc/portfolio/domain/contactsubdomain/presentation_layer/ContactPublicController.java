package com.mattysleduc.portfolio.domain.contactsubdomain.presentation_layer;

import com.mattysleduc.portfolio.domain.contactsubdomain.business_layer.ContactService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public/contact")
public class ContactPublicController {

    private final ContactService service;

    public ContactPublicController(ContactService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<ContactInfoResponseModel> getContactInfo() {
        return ResponseEntity.ok(service.getContactInfo());
    }

    @PostMapping("/messages")
    public ResponseEntity<ContactMessageResponseModel> submitMessage(@RequestBody ContactMessageRequestModel model) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.submitMessage(model));
    }
}

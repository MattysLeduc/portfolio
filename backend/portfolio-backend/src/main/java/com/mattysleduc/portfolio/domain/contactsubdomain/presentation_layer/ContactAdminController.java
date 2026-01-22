package com.mattysleduc.portfolio.domain.contactsubdomain.presentation_layer;

import com.mattysleduc.portfolio.domain.contactsubdomain.business_layer.ContactService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/contact")
public class ContactAdminController {

    private final ContactService service;

    public ContactAdminController(ContactService service) {
        this.service = service;
    }

    @GetMapping("/info")
    public ResponseEntity<ContactInfoResponseModel> getContactInfo() {
        return ResponseEntity.ok(service.getContactInfo());
    }

    @PutMapping("/info")
    public ResponseEntity<ContactInfoResponseModel> updateContactInfo(@RequestBody ContactInfoRequestModel model) {
        return ResponseEntity.ok(service.updateContactInfo(model));
    }

    @GetMapping("/messages")
    public ResponseEntity<List<ContactMessageResponseModel>> getAllMessages() {
        return ResponseEntity.ok(service.getAllMessages());
    }

    @PutMapping("/messages/{messageId}/read")
    public ResponseEntity<ContactMessageResponseModel> markMessageAsRead(@PathVariable String messageId) {
        return ResponseEntity.ok(service.markMessageAsRead(messageId));
    }

    @DeleteMapping("/messages/{messageId}")
    public ResponseEntity<Void> deleteMessage(@PathVariable String messageId) {
        service.deleteMessage(messageId);
        return ResponseEntity.noContent().build();
    }
}

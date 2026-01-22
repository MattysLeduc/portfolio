package com.mattysleduc.portfolio.domain.contactsubdomain.data_access_layer;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
public class ContactMessageIdentifier {

    private String messageId;

    public ContactMessageIdentifier() {
        this.messageId = UUID.randomUUID().toString();
    }
}

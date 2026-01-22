package com.mattysleduc.portfolio.domain.contactsubdomain.presentation_layer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ContactMessageResponseModel {
    private String messageId;
    private String name;
    private String email;
    private String subject;
    private String message;
    private OffsetDateTime createdAt;
    private boolean read;
}

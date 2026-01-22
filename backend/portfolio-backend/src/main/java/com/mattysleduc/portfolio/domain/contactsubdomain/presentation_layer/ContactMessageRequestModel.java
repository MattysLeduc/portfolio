package com.mattysleduc.portfolio.domain.contactsubdomain.presentation_layer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ContactMessageRequestModel {
    private String name;
    private String email;
    private String subject;
    private String message;
}

package com.mattysleduc.portfolio.domain.contactsubdomain.presentation_layer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ContactInfoRequestModel {
    private String email;
    private String phone;
    private String address;
    private String linkedin;
    private String github;
    private String website;
}

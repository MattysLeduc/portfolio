package com.mattysleduc.portfolio.domain.educationsubdomain.data_access_layer;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
public class EducationIdentifier {

    private String educationId;

    public EducationIdentifier() {
        this.educationId = UUID.randomUUID().toString();
    }
}

package com.mattysleduc.portfolio.domain.experiencesubdomain.data_access_layer;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ExperienceIdentifier {
    private String experienceId;

    public static ExperienceIdentifier create() {
        return new ExperienceIdentifier(UUID.randomUUID().toString());
    }
}

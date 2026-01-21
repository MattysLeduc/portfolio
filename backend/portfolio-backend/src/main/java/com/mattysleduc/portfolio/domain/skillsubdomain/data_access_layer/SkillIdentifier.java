package com.mattysleduc.portfolio.domain.skillsubdomain.data_access_layer;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
public class SkillIdentifier {

    private String skillId;

    public SkillIdentifier() {
        this.skillId = UUID.randomUUID().toString();
    }
}

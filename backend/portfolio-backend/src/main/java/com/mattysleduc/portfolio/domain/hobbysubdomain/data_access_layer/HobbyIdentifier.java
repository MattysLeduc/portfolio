package com.mattysleduc.portfolio.domain.hobbysubdomain.data_access_layer;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
public class HobbyIdentifier {

    private String hobbyId;

    public HobbyIdentifier() {
        this.hobbyId = UUID.randomUUID().toString();
    }
}

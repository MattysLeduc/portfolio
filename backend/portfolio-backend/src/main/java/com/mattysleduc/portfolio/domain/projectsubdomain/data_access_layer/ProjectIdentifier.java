package com.mattysleduc.portfolio.domain.projectsubdomain.data_access_layer;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
public class ProjectIdentifier {

    private String projectId;

    public ProjectIdentifier() {
        this.projectId = UUID.randomUUID().toString();
    }
}

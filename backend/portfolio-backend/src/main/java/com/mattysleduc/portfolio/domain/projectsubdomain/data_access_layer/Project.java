package com.mattysleduc.portfolio.domain.projectsubdomain.data_access_layer;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "projects")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Embedded
    private ProjectIdentifier projectIdentifier;

    private String nameEn;
    private String nameFr;
    private String descriptionEn;
    private String descriptionFr;
    private String imageUrl;
    private String repoUrl;
    private String demoUrl;
    private boolean featured;
}

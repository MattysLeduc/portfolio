package com.mattysleduc.portfolio.domain.skillsubdomain.data_access_layer;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "skills")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Embedded
    private SkillIdentifier skillIdentifier;

    private String nameEn;
    private String nameFr;
    private String descriptionEn;
    private String descriptionFr;
    private String category;
    private Integer level;
}


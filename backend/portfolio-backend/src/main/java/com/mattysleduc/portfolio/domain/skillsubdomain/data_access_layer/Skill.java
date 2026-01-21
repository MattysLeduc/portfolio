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

    private String name;
    private String description;
}


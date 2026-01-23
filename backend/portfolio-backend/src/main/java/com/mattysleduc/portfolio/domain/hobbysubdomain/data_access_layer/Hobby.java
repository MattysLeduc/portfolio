package com.mattysleduc.portfolio.domain.hobbysubdomain.data_access_layer;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "hobbies")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Hobby {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Embedded
    private HobbyIdentifier hobbyIdentifier;

    private String nameEn;
    private String nameFr;
    private String descriptionEn;
    private String descriptionFr;
    private String icon;
    private String iconUrl;
}

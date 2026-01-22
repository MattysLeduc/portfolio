package com.mattysleduc.portfolio.domain.educationsubdomain.data_access_layer;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "education")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Embedded
    private EducationIdentifier educationIdentifier;

    private String degreeEn;
    private String degreeFr;
    private String institutionEn;
    private String institutionFr;
    private String locationEn;
    private String locationFr;
    private String descriptionEn;
    private String descriptionFr;

    private LocalDate startDate;
    private LocalDate endDate;
}

package com.mattysleduc.portfolio.domain.experiencesubdomain.data_access_layer;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "experiences")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Embedded
    @AttributeOverride(name = "experienceId", column = @Column(name = "experience_id"))
    private ExperienceIdentifier experienceIdentifier;

    private String titleEn;
    private String titleFr;
    private String companyEn;
    private String companyFr;
    private String locationEn;
    private String locationFr;
    private LocalDate startDate;
    private LocalDate endDate;
    private boolean current;

    @Column(length = 2000)
    private String descriptionEn;
    private String descriptionFr;

    @Column(length = 3000)
    private String responsibilitiesEn;

    @Column(length = 3000)
    private String responsibilitiesFr;

    @PrePersist
    public void ensureIdentifier() {
        if (experienceIdentifier == null) {
            experienceIdentifier = ExperienceIdentifier.create();
        }
    }
}

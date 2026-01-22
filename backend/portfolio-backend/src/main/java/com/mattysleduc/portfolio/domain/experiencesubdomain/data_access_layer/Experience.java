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

    private String title;
    private String company;
    private String location;
    private LocalDate startDate;
    private LocalDate endDate;
    private boolean current;

    @Column(length = 2000)
    private String description;

    @PrePersist
    public void ensureIdentifier() {
        if (experienceIdentifier == null) {
            experienceIdentifier = ExperienceIdentifier.create();
        }
    }
}

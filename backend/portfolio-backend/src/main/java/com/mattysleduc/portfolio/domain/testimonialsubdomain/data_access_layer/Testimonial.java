package com.mattysleduc.portfolio.domain.testimonialsubdomain.data_access_layer;

import jakarta.persistence.*;
import lombok.*;

import java.time.OffsetDateTime;

@Entity
@Table(name = "testimonials")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Testimonial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Embedded
    private TestimonialIdentifier testimonialIdentifier;

    private String authorName;
    private String authorTitle;
    private String authorImage;
    @Column(length = 2000)
    private String content;
    private Integer rating;

    private OffsetDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private TestimonialStatus status;
    private String rejectionReason;
}

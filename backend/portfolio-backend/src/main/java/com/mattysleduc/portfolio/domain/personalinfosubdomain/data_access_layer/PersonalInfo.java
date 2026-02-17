package com.mattysleduc.portfolio.domain.personalinfosubdomain.data_access_layer;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "personal_info")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PersonalInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // Hero Section
    private String nameEn;
    private String nameFr;
    private String taglineEn;
    private String taglineFr;
    private String heroWelcomeEn;
    private String heroWelcomeFr;
    
    // Social Links
    private String githubUrl;
    private String linkedinUrl;
    private String twitterUrl;
    private String email;
    
    // Contact Section
    @Column(length = 1000)
    private String contactMessageEn;
    @Column(length = 1000)
    private String contactMessageFr;
    
    // Resume URLs
    @Column(length = 500)
    private String resumeEnUrl;
    @Column(length = 500)
    private String resumeFrUrl;
}

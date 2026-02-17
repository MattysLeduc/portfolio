package com.mattysleduc.portfolio.domain.personalinfosubdomain.presentation_layer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PersonalInfoRequestModel {
    private String nameEn;
    private String nameFr;
    private String taglineEn;
    private String taglineFr;
    private String heroWelcomeEn;
    private String heroWelcomeFr;
    private String githubUrl;
    private String linkedinUrl;
    private String twitterUrl;
    private String email;
    private String contactMessageEn;
    private String contactMessageFr;
    private String resumeEnUrl;
    private String resumeFrUrl;
}

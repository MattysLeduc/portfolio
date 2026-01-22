package com.mattysleduc.portfolio.domain.contactsubdomain.data_access_layer;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "contact_info")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContactInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String email;
    private String phone;
    private String address;
    private String linkedin;
    private String github;
    private String website;
}

package com.mattysleduc.portfolio.domain.contactsubdomain.data_access_layer;

import jakarta.persistence.*;
import lombok.*;

import java.time.OffsetDateTime;

@Entity
@Table(name = "contact_messages")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContactMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Embedded
    private ContactMessageIdentifier contactMessageIdentifier;

    private String name;
    private String email;
    private String subject;
    @Column(length = 2000)
    private String message;

    private OffsetDateTime createdAt;
    private boolean read;
}

package com.mattysleduc.portfolio.domain.contactsubdomain.data_access_layer;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Integer> {
    ContactMessage findContactMessageByContactMessageIdentifier_MessageId(String messageId);
}

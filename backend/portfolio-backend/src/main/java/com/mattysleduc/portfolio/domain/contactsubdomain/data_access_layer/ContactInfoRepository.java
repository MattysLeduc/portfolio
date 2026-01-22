package com.mattysleduc.portfolio.domain.contactsubdomain.data_access_layer;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactInfoRepository extends JpaRepository<ContactInfo, Integer> {
}

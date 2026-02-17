package com.mattysleduc.portfolio.domain.personalinfosubdomain.data_access_layer;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonalInfoRepository extends JpaRepository<PersonalInfo, Integer> {
}

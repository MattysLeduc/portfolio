package com.mattysleduc.portfolio.domain.hobbysubdomain.data_access_layer;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HobbyRepository extends JpaRepository<Hobby, Integer> {
    Hobby findHobbyByHobbyIdentifier_HobbyId(String hobbyId);
}

package com.mattysleduc.portfolio.domain.skillsubdomain.data_access_layer;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SkillRepository extends JpaRepository<Skill, Integer> {
    Skill findSkillBySkillIdentifier_SkillId(String skillId);
}

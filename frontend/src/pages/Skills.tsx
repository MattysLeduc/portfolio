import { useState, useEffect } from 'react';
import { getAllSkills } from '../features/skills/api/getAllSkills';
import type { SkillResponseModel } from '../features/skills/models/SkillResponseModel';

const Skills = () => {
  const [skills, setSkills] = useState<SkillResponseModel[]>([]);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const data = await getAllSkills();
      setSkills(data);
    } catch (error) {
      console.error('Failed to load skills', error);
    }
  };

  return (
    <div className="skills-page">
      <h1>Skills</h1>
      <div className="skills-grid">
        {skills.map((skill) => (
          <div key={skill.skillId} className="skill-card">
            <h3>{skill.name}</h3>
            <p className="skill-category">{skill.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;

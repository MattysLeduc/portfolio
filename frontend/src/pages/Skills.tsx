import { useState, useEffect } from 'react';
import { publicAPI } from '../shared/api/api';
import { useLanguage } from '../context/LanguageContext';

const Skills = () => {
  const [skills, setSkills] = useState<any[]>([]);
  const { language } = useLanguage();

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const response = await publicAPI.getSkills();
      setSkills(response.data.data);
    } catch (error) {
      console.error('Failed to load skills', error);
    }
  };

  return (
    <div className="skills-page">
      <h1>Skills</h1>
      <div className="skills-grid">
        {skills.map((skill) => (
          <div key={skill.id} className="skill-card">
            <h3>{language === 'en' ? skill.nameEn : skill.nameFr}</h3>
            <p className="skill-category">{skill.category}</p>
            <div className="skill-progress">
              <div
                className="skill-progress-bar"
                style={{ width: `${skill.proficiencyLevel}%` }}
              />
            </div>
            <p>{language === 'en' ? skill.descriptionEn : skill.descriptionFr}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;

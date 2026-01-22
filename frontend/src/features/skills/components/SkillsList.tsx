import { useEffect, useState } from 'react';
import { getAllSkills } from '../api/getAllSkills';
import type { SkillResponseModel } from '../models/SkillResponseModel';

export const SkillsList: React.FC = () => {
  const [skills, setSkills] = useState<SkillResponseModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getAllSkills();
        setSkills(data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (loading) return <div>Loading skills...</div>;

  return (
    <div className="skills-grid">
      {skills.map((skill) => (
        <div key={skill.id} className="skill-card">
          <h3>{skill.nameEn}</h3>
          <p className="skill-category">{skill.category}</p>
          <div className="skill-proficiency">
            <div className="proficiency-bar" style={{ width: `${skill.proficiencyLevel}%` }}></div>
          </div>
          <span className="proficiency-text">{skill.proficiencyLevel}%</span>
        </div>
      ))}
    </div>
  );
};

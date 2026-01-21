import { useEffect, useState } from 'react';
import { portfolioService } from '../../../shared/api/portfolioService';

export const SkillsList: React.FC = () => {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await portfolioService.getSkills();
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
          <h3>{skill.name}</h3>
          <p className="skill-category">{skill.category}</p>
          <div className="skill-proficiency">
            <div className="proficiency-bar" style={{ width: `${skill.proficiency}%` }}></div>
          </div>
          <span className="proficiency-text">{skill.proficiency}%</span>
        </div>
      ))}
    </div>
  );
};

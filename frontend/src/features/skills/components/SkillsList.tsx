import { useEffect, useState } from "react";
import { getAllSkills } from "../api/getAllSkills";
import type { SkillResponseModel } from "../models/SkillResponseModel";

export const SkillsList: React.FC = () => {
  const [skills, setSkills] = useState<SkillResponseModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getAllSkills();
        setSkills(data);
      } catch (error) {
        // Handle error silently
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
        <div key={skill.skillId} className="skill-card">
          <h3>{skill.name}</h3>
          <div className="skill-proficiency"></div>
          <span className="proficiency-text">{skill.description}</span>
        </div>
      ))}
    </div>
  );
};

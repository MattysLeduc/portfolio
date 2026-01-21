import { useEffect, useState } from 'react';
import { portfolioService } from '../../../shared/api/portfolioService';

export const ExperienceTimeline: React.FC = () => {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data = await portfolioService.getExperiences();
        setExperiences(data);
      } catch (error) {
        console.error('Error fetching experiences:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  if (loading) return <div>Loading experiences...</div>;

  return (
    <div className="timeline">
      {experiences.map((exp, index) => (
        <div key={exp.id} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
          <div className="timeline-content">
            <h3>{exp.positionEn}</h3>
            <p className="company">{exp.companyEn}</p>
            <p className="dates">{new Date(exp.startDate).toLocaleDateString()} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}</p>
            <p>{exp.descriptionEn}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

import { useEffect, useState } from 'react';
import { portfolioService } from '../../../shared/api/portfolioService';

export const EducationList: React.FC = () => {
  const [education, setEducation] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const data = await portfolioService.getEducation();
        setEducation(data);
      } catch (error) {
        console.error('Error fetching education:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  if (loading) return <div>Loading education...</div>;

  return (
    <div className="education-list">
      {education.map((edu) => (
        <div key={edu.id} className="education-card">
          <h3>{edu.schoolEn}</h3>
          <p className="degree">{edu.degreeEn} in {edu.fieldEn}</p>
          <p className="date">{new Date(edu.graduationYear).getFullYear()}</p>
          {edu.descriptionEn && <p className="description">{edu.descriptionEn}</p>}
        </div>
      ))}
    </div>
  );
};

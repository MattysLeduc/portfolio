import { useEffect, useState } from 'react';
import { getAllEducation } from '../api/getAllEducation';
import type { EducationResponseModel } from '../models/EducationResponseModel';

export const EducationList: React.FC = () => {
  const [education, setEducation] = useState<EducationResponseModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const data = await getAllEducation();
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
        <div key={edu.educationId} className="education-card">
          <h3>{edu.institutionEn}</h3>
          <p className="degree">{edu.degreeEn}</p>
          <p className="date">{edu.startDate} - {edu.endDate || 'Present'}</p>
          {edu.descriptionEn && <p className="description">{edu.descriptionEn}</p>}
        </div>
      ))}
    </div>
  );
};

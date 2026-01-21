import { useState, useEffect } from 'react';
import { publicAPI } from '../shared/api/api';
import { useLanguage } from '../context/LanguageContext';

const Experience = () => {
  const [experiences, setExperiences] = useState<any[]>([]);
  const { language } = useLanguage();

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      const response = await publicAPI.getWorkExperiences();
      setExperiences(response.data.data);
    } catch (error) {
      console.error('Failed to load experiences', error);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(language === 'en' ? 'en-US' : 'fr-FR', {
      year: 'numeric',
      month: 'long',
    });
  };

  return (
    <div className="experience-page">
      <h1>Work Experience</h1>
      <div className="timeline">
        {experiences.map((exp) => (
          <div key={exp.id} className="timeline-item">
            <h3>{language === 'en' ? exp.positionEn : exp.positionFr}</h3>
            <h4>{language === 'en' ? exp.companyEn : exp.companyFr}</h4>
            <p className="date">
              {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
            </p>
            <p className="location">{exp.location}</p>
            <p>{language === 'en' ? exp.descriptionEn : exp.descriptionFr}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;

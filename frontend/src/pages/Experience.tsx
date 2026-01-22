import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioService } from '../shared/api/portfolioService';
import type { Experience } from '../features/experience/models/Experience';

const Experience = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const { language } = useLanguage();

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      const data = await portfolioService.getWorkExperiences();
      setExperiences(data);
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
          <div key={exp.experienceId} className="timeline-item">
            <h3>{exp.title}</h3>
            <h4>{exp.company}</h4>
            <p className="date">
              {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
            </p>
            <p className="location">{exp.location}</p>
            <p>{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;

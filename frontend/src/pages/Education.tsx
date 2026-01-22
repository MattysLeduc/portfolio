import { useState, useEffect } from 'react';
import { getAllEducation } from '../features/education/api/getAllEducation';
import type { EducationResponseModel } from '../features/education/models/EducationResponseModel';
import { useLanguage } from '../context/LanguageContext';
import { portfolioService } from '../shared/api/portfolioService';

const Education = () => {
  const [education, setEducation] = useState<EducationResponseModel[]>([]);
  const { language, t } = useLanguage();

  useEffect(() => {
    loadEducation();
  }, []);

  const loadEducation = async () => {
    try {
      const data = await getAllEducation();
      setEducation(data);
    } catch (error) {
      console.error('Failed to load education', error);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(language === 'en' ? 'en-US' : 'fr-FR', {
      year: 'numeric',
      month: 'long',
    });
  };

  const downloadCV = async () => {
    try {
      const response = await portfolioService.downloadResume(language);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `CV-${language}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Failed to download CV', error);
    }
  };

  return (
    <div className="education-page">
      <h1>{t('education')}</h1>
      <button onClick={downloadCV} className="btn-primary">{t('downloadCV')}</button>
      <div className="timeline">
        {education.map((edu) => (
          <div key={edu.educationId} className="timeline-item">
            <h3>{language === 'en' ? edu.degreeEn : edu.degreeFr}</h3>
            <h4>{language === 'en' ? edu.institutionEn : edu.institutionFr}</h4>
            <p className="date">
              {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}
            </p>
            <p className="location">{language === 'en' ? edu.locationEn : edu.locationFr}</p>
            <p>{language === 'en' ? edu.descriptionEn : edu.descriptionFr}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;

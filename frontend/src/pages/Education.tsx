import { useState, useEffect } from 'react';
import { publicAPI } from '../shared/api/api';
import { useLanguage } from '../context/LanguageContext';

const Education = () => {
  const [education, setEducation] = useState<any[]>([]);
  const { language, t } = useLanguage();

  useEffect(() => {
    loadEducation();
  }, []);

  const loadEducation = async () => {
    try {
      const response = await publicAPI.getEducation();
      setEducation(response.data.data);
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
      const response = await publicAPI.downloadResume(language);
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
          <div key={edu.id} className="timeline-item">
            <h3>{language === 'en' ? edu.degreeEn : edu.degreeFr}</h3>
            <h4>{language === 'en' ? edu.institutionEn : edu.institutionFr}</h4>
            <p className="date">
              {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}
            </p>
            <p className="location">{edu.location}</p>
            <p>{language === 'en' ? edu.descriptionEn : edu.descriptionFr}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;

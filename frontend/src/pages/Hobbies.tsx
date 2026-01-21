import { useState, useEffect } from 'react';
import { publicAPI } from '../shared/api/api';
import { useLanguage } from '../context/LanguageContext';

const Hobbies = () => {
  const [hobbies, setHobbies] = useState<any[]>([]);
  const { language } = useLanguage();

  useEffect(() => {
    loadHobbies();
  }, []);

  const loadHobbies = async () => {
    try {
      const response = await publicAPI.getHobbies();
      setHobbies(response.data.data);
    } catch (error) {
      console.error('Failed to load hobbies', error);
    }
  };

  return (
    <div className="hobbies-page">
      <h1>Hobbies</h1>
      <div className="hobbies-grid">
        {hobbies.map((hobby) => (
          <div key={hobby.id} className="hobby-card">
            {hobby.iconUrl && <img src={hobby.iconUrl} alt={hobby.nameEn} />}
            <h3>{language === 'en' ? hobby.nameEn : hobby.nameFr}</h3>
            <p>{language === 'en' ? hobby.descriptionEn : hobby.descriptionFr}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hobbies;

import { useState, useEffect } from 'react';
import { getAllHobbies } from '../features/hobbies/api/getAllHobbies';
import type { HobbyResponseModel } from '../features/hobbies/models/HobbyResponseModel';
import { useLanguage } from '../context/LanguageContext';

const Hobbies = () => {
  const [hobbies, setHobbies] = useState<HobbyResponseModel[]>([]);
  const { language } = useLanguage();

  useEffect(() => {
    loadHobbies();
  }, []);

  const loadHobbies = async () => {
    try {
      const data = await getAllHobbies();
      setHobbies(data);
    } catch (error) {
      console.error('Failed to load hobbies', error);
    }
  };

  return (
    <div className="hobbies-page">
      <h1>Hobbies</h1>
      <div className="hobbies-grid">
        {hobbies.map((hobby) => (
          <div key={hobby.hobbyId} className="hobby-card">
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

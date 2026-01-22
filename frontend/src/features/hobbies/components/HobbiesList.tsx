import { useEffect, useState } from 'react';
import { getAllHobbies } from '../api/getAllHobbies';
import type { HobbyResponseModel } from '../models/HobbyResponseModel';

export const HobbiesList: React.FC = () => {
  const [hobbies, setHobbies] = useState<HobbyResponseModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHobbies = async () => {
      try {
        const data = await getAllHobbies();
        setHobbies(data);
      } catch (error) {
        console.error('Error fetching hobbies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHobbies();
  }, []);

  if (loading) return <div>Loading hobbies...</div>;

  return (
    <div className="hobbies-grid">
      {hobbies.map((hobby) => (
        <div key={hobby.hobbyId} className="hobby-card">
          {hobby.iconUrl && <img src={hobby.iconUrl} alt={hobby.nameEn} className="hobby-icon" />}
          <h3>{hobby.nameEn}</h3>
          <p>{hobby.descriptionEn}</p>
        </div>
      ))}
    </div>
  );
};

import { useEffect, useState } from 'react';
import { portfolioService } from '../../../shared/api/portfolioService';

export const HobbiesList: React.FC = () => {
  const [hobbies, setHobbies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHobbies = async () => {
      try {
        const data = await portfolioService.getHobbies();
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
        <div key={hobby.id} className="hobby-card">
          {hobby.iconUrl && <img src={hobby.iconUrl} alt={hobby.name} className="hobby-icon" />}
          <h3>{hobby.name}</h3>
          <p>{hobby.description}</p>
        </div>
      ))}
    </div>
  );
};

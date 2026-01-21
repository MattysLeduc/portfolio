import { ExperienceTimeline } from '../components/ExperienceTimeline';
import './ExperiencePage.css';

export const ExperiencePage: React.FC = () => {
  return (
    <div className="page experience-page">
      <div className="container">
        <h1>My Experience</h1>
        <ExperienceTimeline />
      </div>
    </div>
  );
};

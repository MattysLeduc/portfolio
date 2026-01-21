import { SkillsList } from '../components/SkillsList';
import './SkillsPage.css';

export const SkillsPage: React.FC = () => {
  return (
    <div className="page skills-page">
      <div className="container">
        <h1>My Skills</h1>
        <SkillsList />
      </div>
    </div>
  );
};

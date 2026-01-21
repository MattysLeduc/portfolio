import { ProjectsList } from '../components/ProjectsList';
import './ProjectsPage.css';

export const ProjectsPage: React.FC = () => {
  return (
    <div className="page projects-page">
      <div className="container">
        <h1>My Projects</h1>
        <ProjectsList />
      </div>
    </div>
  );
};

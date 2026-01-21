import { EducationList } from '../components/EducationList';
import './EducationPage.css';

export const EducationPage: React.FC = () => {
  return (
    <div className="page education-page">
      <div className="container">
        <h1>My Education</h1>
        <EducationList />
      </div>
    </div>
  );
};

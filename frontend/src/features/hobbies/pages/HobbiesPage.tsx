import { HobbiesList } from '../components/HobbiesList';
import './HobbiesPage.css';

export const HobbiesPage: React.FC = () => {
  return (
    <div className="page hobbies-page">
      <div className="container">
        <h1>My Hobbies</h1>
        <HobbiesList />
      </div>
    </div>
  );
};

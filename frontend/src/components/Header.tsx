import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import './Header.css';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();


  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">Portfolio</Link>

          <nav className="nav">
            <Link to="/">{t('home')}</Link>
            <Link to="/skills">{t('skills')}</Link>
            <Link to="/projects">{t('projects')}</Link>
            <Link to="/experience">{t('experience')}</Link>
            <Link to="/education">{t('education')}</Link>
            <Link to="/hobbies">{t('hobbies')}</Link>
            <Link to="/testimonials">{t('testimonials')}</Link>
            <Link to="/contact">{t('contact')}</Link>
          </nav>

          <div className="header-actions">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'fr')}
              className="language-select"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>

            <Link to="/admin" className="btn-admin">{t('admin')}</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

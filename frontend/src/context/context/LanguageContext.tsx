import { createContext, useContext, type ReactNode, useState, useEffect } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    'home': 'Home',
    'skills': 'Skills',
    'projects': 'Projects',
    'experience': 'Experience',
    'education': 'Education',
    'hobbies': 'Hobbies',
    'testimonials': 'Testimonials',
    'contact': 'Contact',
    'admin': 'Admin Panel',
    'login': 'Login',
    'logout': 'Logout',
    'language': 'Language',
    'welcome': 'Welcome',
    'featured_projects': 'Featured Projects',
  },
  fr: {
    'home': 'Accueil',
    'skills': 'Compétences',
    'projects': 'Projets',
    'experience': 'Expérience',
    'education': 'Éducation',
    'hobbies': 'Loisirs',
    'testimonials': 'Témoignages',
    'contact': 'Contact',
    'admin': 'Panneau Admin',
    'login': 'Connexion',
    'logout': 'Déconnexion',
    'language': 'Langue',
    'welcome': 'Bienvenue',
    'featured_projects': 'Projets Vedettes',
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const storedLanguage = (localStorage.getItem('language') as Language) || 'en';
    setLanguageState(storedLanguage);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

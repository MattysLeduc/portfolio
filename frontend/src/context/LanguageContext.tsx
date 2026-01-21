import { createContext, useContext, useState, type ReactNode } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    home: 'Home',
    about: 'About',
    skills: 'Skills',
    projects: 'Projects',
    experience: 'Experience',
    education: 'Education',
    hobbies: 'Hobbies',
    testimonials: 'Testimonials',
    contact: 'Contact',
    downloadCV: 'Download CV',
    login: 'Login',
    logout: 'Logout',
    admin: 'Admin',
    dashboard: 'Dashboard',
    submit: 'Submit',
    send: 'Send',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    subject: 'Subject',
    company: 'Company',
    position: 'Position',
  },
  fr: {
    home: 'Accueil',
    about: 'À propos',
    skills: 'Compétences',
    projects: 'Projets',
    experience: 'Expérience',
    education: 'Éducation',
    hobbies: 'Loisirs',
    testimonials: 'Témoignages',
    contact: 'Contact',
    downloadCV: 'Télécharger CV',
    login: 'Connexion',
    logout: 'Déconnexion',
    admin: 'Admin',
    dashboard: 'Tableau de bord',
    submit: 'Soumettre',
    send: 'Envoyer',
    cancel: 'Annuler',
    save: 'Enregistrer',
    delete: 'Supprimer',
    edit: 'Modifier',
    add: 'Ajouter',
    name: 'Nom',
    email: 'Email',
    message: 'Message',
    subject: 'Sujet',
    company: 'Entreprise',
    position: 'Poste',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
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

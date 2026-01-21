import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './features/home/pages/HomePage';
import { SkillsPage } from './features/skills/pages/SkillsPage';
import { ProjectsPage } from './features/projects/pages/ProjectsPage';
import { ExperiencePage } from './features/experience/pages/ExperiencePage';
import { EducationPage } from './features/education/pages/EducationPage';
import { HobbiesPage } from './features/hobbies/pages/HobbiesPage';
import { TestimonialsPage } from './features/testimonials/pages/TestimonialsPage';
import { ContactPage } from './features/contact/pages/ContactPage';

// Admin
import { AdminLayout } from './features/admin/layouts/AdminLayout';
import { AdminDashboardPage } from './features/admin/pages/AdminDashboardPage';
import { AdminSkillsPage } from './features/admin/pages/AdminSkillsPage';

import './App.css';

function App() {
  return (
    <LanguageProvider>
      <div className="app-shell">
        <div className="app-aurora app-aurora-1" aria-hidden="true" />
        <div className="app-aurora app-aurora-2" aria-hidden="true" />
        <BrowserRouter>
          <Header />
          <main className="app-container">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/education" element={<EducationPage />} />
              <Route path="/hobbies" element={<HobbiesPage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboardPage />} />
                <Route path="skills" element={<AdminSkillsPage />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </div>
    </LanguageProvider>
  );
}

export default App;

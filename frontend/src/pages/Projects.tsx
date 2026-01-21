import { useState, useEffect } from 'react';
import { publicAPI } from '../shared/api/api';
import { useLanguage } from '../context/LanguageContext';

const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const { language } = useLanguage();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await publicAPI.getProjects();
      setProjects(response.data.data);
    } catch (error) {
      console.error('Failed to load projects', error);
    }
  };

  return (
    <div className="projects-page">
      <h1>Projects</h1>
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            {project.imageUrl && (
              <img src={project.imageUrl} alt={language === 'en' ? project.titleEn : project.titleFr} />
            )}
            <h3>{language === 'en' ? project.titleEn : project.titleFr}</h3>
            <p>{language === 'en' ? project.descriptionEn : project.descriptionFr}</p>
            {project.technologies && (
              <div className="technologies">
                {project.technologies.split(',').map((tech: string, index: number) => (
                  <span key={index} className="tech-tag">{tech.trim()}</span>
                ))}
              </div>
            )}
            <div className="project-links">
              {project.projectUrl && (
                <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                  View Project
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;

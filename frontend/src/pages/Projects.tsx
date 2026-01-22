import { useState, useEffect } from 'react';
import { getAllProjects } from '../features/projects/api/getAllProjects';
import type { ProjectResponseModel } from '../features/projects/models/ProjectResponseModel';
import { useLanguage } from '../context/LanguageContext';

const Projects = () => {
  const [projects, setProjects] = useState<ProjectResponseModel[]>([]);
  const { language } = useLanguage();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getAllProjects();
      setProjects(data);
    } catch (error) {
      console.error('Failed to load projects', error);
    }
  };

  return (
    <div className="projects-page">
      <h1>Projects</h1>
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.projectId} className="project-card">
            {project.imageUrl && (
              <img src={project.imageUrl} alt={language === 'en' ? project.nameEn : project.nameFr} />
            )}
            <h3>{language === 'en' ? project.nameEn : project.nameFr}</h3>
            <p>{language === 'en' ? project.descriptionEn : project.descriptionFr}</p>
            <div className="project-links">
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  View Project
                </a>
              )}
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
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

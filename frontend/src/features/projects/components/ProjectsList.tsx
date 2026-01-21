import { useEffect, useState } from 'react';
import { portfolioService } from '../../../shared/api/portfolioService';

export const ProjectsList: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await portfolioService.getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div>Loading projects...</div>;

  return (
    <div className="projects-grid">
      {projects.map((project) => (
        <div key={project.id} className="project-card">
          <img src={project.imageUrl} alt={project.title} className="project-image" />
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="project-tech">
            {project.technologies?.split(',').map((tech: string) => (
              <span key={tech} className="tech-tag">{tech.trim()}</span>
            ))}
          </div>
          <div className="project-links">
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live</a>}
            {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>}
          </div>
        </div>
      ))}
    </div>
  );
};
